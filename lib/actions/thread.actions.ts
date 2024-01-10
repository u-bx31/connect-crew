"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import Community from "../models/crew.model";
import Crew from "../models/crew.model";

interface Props {
	author: string;
	text: string;
	crewId: string | null;
	path: string;
}
interface RepostedProps {
	author: string;
	text: string;
	crewId: string | null;
	threadId: string | null;
	path: string;
}
interface CommentProps {
	threadId: string;
	commentText: string;
	userId: string;
	path: string;
}
interface LikesProps {
	threadId: string;
	userId: string;
	path: string;
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
	ConnectionToDb();
	try {
		const skipAmount = (pageNumber - 1) * pageSize;

		const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
			.sort({ createdAt: "desc" })
			.skip(skipAmount)
			.limit(pageSize)
			.populate({ path: "author", model: User })
			.populate({
				path: "crew",
				model: Crew,
			})
			.populate({
				path: "children",
				populate: {
					path: "author",
					model: User,
					select: "_id image name parentId",
				},
			})
			.populate({
				path: "reposted.originalThreadId",
				model: Thread,
				select: "_id text author crew createdAt",
				populate:[
					{
						path : 'author',
						model : User,
						select: "_id image name ",
					},
					{
						path : 'crew',
						model : Crew,
					}
				]
			})

		const totalPostsCount = await Thread.countDocuments({
			parentId: { $in: [null, undefined] },
		});

		const posts = await postsQuery.exec();

		const isNext = totalPostsCount > skipAmount + posts.length;

		return { posts, isNext };
	} catch (error: any) {
		throw new Error(`Failed to fetch all the threads :${error.message}`);
	}
}

export async function createPost({
	text,
	author,
	crewId,
	path,
	repostedInfo,
}: Props & { repostedInfo?: { originalThreadId: string } }) {
	ConnectionToDb();
	try {
		//search for crew by crewID
		const CrewIdObject = await Crew.findOne({ id: crewId }, { _id: 1 });

		const threadData = new Thread({
			text,
			author,
			crew: CrewIdObject,
		});

		if (repostedInfo) {
			threadData.reposted = {
				originalThreadId: repostedInfo.originalThreadId,
				repostedBy: author,
				date: Date.now(),
			};
		}

		const createdThread = await Thread.create(threadData);

		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		if (CrewIdObject) {
			// Update Community model
			await Crew.findByIdAndUpdate(CrewIdObject, {
				$push: { threads: createdThread._id },
			});
		}

		// revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to create/update thread: ${error.message}`);
	}
}

export async function fetchThreadById(id: string) {
	ConnectionToDb();
	try {
		//do crew section
		const thread = Thread.findById(id)
			.populate({
				path: "author",
				model: User,
				select: "_id id image name",
			})
			.populate({
				path: "crew",
				model: Crew,
				select: "_id id name image",
			}) // Populate the community field with _id and name
			.populate({
				path: "children",
				populate: [
					{
						path: "author",
						model: User,
						select: "_id id name image parentId",
					},
					{
						path: "children",
						model: Thread,
						populate: {
							path: "author",
							model: User,
							select: "_id id name image parentId",
						},
					},
				],
			}).populate({
				path: "reposted.originalThreadId",
				model: Thread,
				select: "_id text author crew createdAt",
				populate:[
					{
						path : 'author',
						model : User,
						select: "_id image name ",
					},
					{
						path : 'crew',
						model : Crew
					}
				]
			})
			.exec();

		return thread;
	} catch (error: any) {
		throw new Error(`Failed to fetch thread post :${error.message}`);
	}
}

export async function addCommentToThread({
	threadId,
	commentText,
	userId,
	path,
}: CommentProps) {
	ConnectionToDb();

	try {
		const originalThread = await Thread.findById(threadId);

		if (!originalThread) throw new Error("Thread not found");

		const commentThread = new Thread({
			text: commentText,
			author: userId,
			parentId: threadId,
		});

		const savedThreadComment = await commentThread.save();

		originalThread.children.push(savedThreadComment._id);

		await originalThread.save();

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to add comment to a thread :${error.message}`);
	}
}
export async function addLikesToThread({ threadId, userId, path }: LikesProps) {
	ConnectionToDb();

	try {
		const user = await User.findOne({ id: userId });
		if (!user) {
			throw new Error("This user not found");
		}

		const thread = await Thread.findById(threadId);
		if (!thread) {
			throw new Error("Thread not found");
		}

		// Check if the user already exists in the likes array
		const userIndex = thread.likes.findIndex((like: any) =>
			like.userId.equals(user._id)
		);

		if (userIndex !== -1) {
			// If the user exists, remove them from the likes array
			thread.likes.splice(userIndex, 1);
		} else {
			// If the user doesn't exist, add them to the likes array
			thread.likes.push({ userId: user._id });
		}

		await thread.save(); // Save the updated thread document

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to add like to a thread :${error.message}`);
	}
}

//connection to mongodb function
const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to connect to mongoDB :${error.message}`);
	}
};

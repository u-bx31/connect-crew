"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface Props {
	author: string;
	text: string;
	crewId: string | null;
	path: string;
}
interface CommentProps {
	threadId: string;
	commentsText: string;
	userId: string;
	path: string;
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
			})
			.exec();

		return thread;
	} catch (error: any) {
		throw new Error(`Failed to fetch thread post :${error.message}`);
	}
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
				path: "children",
				populate: {
					path: "author",
					model: User,
					select: "_id image name parentId",
				},
			});

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

export async function createPost({ text, author, crewId, path }: Props) {
	ConnectionToDb();
	try {
		const createdThread = await Thread.create({
			text,
			author,
			crew: null,
		});

		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to create/update thread :${error.message}`);
	}
}

export async function addCommentToThread({
	threadId,
	commentsText,
	userId,
	path,
}: CommentProps) {
	ConnectionToDb();

	try {
		
	} catch (error: any) {
		throw new Error(`Failed to add comment to a thread :${error.message}`);
	}
}


//connection to mongodb function
const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to create/update thread :${error.message}`);
	}
};

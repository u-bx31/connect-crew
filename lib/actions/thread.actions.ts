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
export async function fetchThreadById(id:string) {
	try {
		connectToDB();

		//do crew section
		const thread = Thread.findById(id).populate({
			path : 'author',
			model : User,
			select : '_id id image name'
		}).populate(
			{
				path : 'children',
				populate : [
					{
						path: 'author',
						model : User,
						select : '_id id name image parentId'
					},
					{
						path: 'children',
						model : Thread,
						populate : {
							path : 'author',
							model : User,
							select : '_id id name image parentId'
						}
					}
				]
			},
		).exec();

		return thread;

	} catch (error: any) {
		throw new Error(`Failed to create/update thread :${error.message}`);
	}
	
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
	try {
		connectToDB();

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

			const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

			const posts = await postsQuery.exec();

			const isNext = totalPostsCount > skipAmount + posts.length;

			return { posts , isNext};

	} catch (error: any) {
		throw new Error(`Failed to create/update thread :${error.message}`);
	}
}

export async function createNewPost({ text, author, crewId, path }: Props) {
	try {
		connectToDB();

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

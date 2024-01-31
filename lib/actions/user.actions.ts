"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import Crew from "../models/crew.model";

interface props {
	userId: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	path: string;
}
interface SearchProps {
	userId: string;
	searchString: string;
	pageNumber: number;
	pageSize: number;
	sortBy: SortOrder;
}

export async function fetchUser(userId: string) {
	ConnectionToDb();
	try {
		return await User.findOne({ id: userId }).populate({
			path: "crews",
			model: Crew,
		});
	} catch (error: any) {
		throw new Error(`Failed to fetch user :${error.message}`);
	}
}

export async function UpdateUser({
	userId,
	username,
	name,
	bio,
	image,
	path,
}: props): Promise<void> {
	ConnectionToDb();
	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{ upsert: true }
		);
		if (path == "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user :${error.message}`);
	}
}

export async function fetchUserPosts(userId: string) {
	connectToDB();

	try {
		const threads = await User.findOne({ id: userId }).populate({
			path: "threads",
			model: Thread,
			populate: [
				{
					path: "crew",
					model: Crew,
					select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
				},
				{
					path: "children",
					model: Thread,
					populate: {
						path: "author",
						model: User,
						select: "name image id",
					},
					
				},
				{
					path: "reposted.originalThreadId",
					model: Thread,
					select: "_id text author crew createdAt",
					populate: [
						{
							path: "author",
							model: User,
							select: "_id image name ",
						},
						{
							path : 'crew',
							model : Crew,
						}
					],
				},
				
			],
			match: { parentId: { $exists: false } },
		});
		return threads;
	} catch (error: any) {
		throw new Error("Failed to fetch user Posts");
	}
}

export async function searchForUsers({
	userId,
	searchString = "",
	pageNumber = 1,
	pageSize = 20,
	sortBy = "desc",
}: SearchProps) {
	ConnectionToDb();
	try {
		const skipAmount = (pageNumber - 1) * pageSize;

		const regex = new RegExp(searchString, "i");

		const query: FilterQuery<typeof User> = {
			id: { $ne: userId },
		};

		if (searchString.trim() === "") {
			query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
		}
		const sortOption = { createdAt: sortBy };

		const usersQuery = User.find(query)
			.sort(sortOption)
			.skip(skipAmount)
			.limit(pageSize);

		const totalUsersCount = await User.countDocuments(query);

		const Users = await usersQuery.exec();

		const isNext = totalUsersCount > skipAmount + Users.length;

		return { Users, isNext };
	} catch (error: any) {
		throw new Error(`Failed to search for users : ${error.message}`);
	}
}

//user replies get all the thread that have parentId != ''

export async function getUserReplies(userId: string) {
	ConnectionToDb();
	try {
		const userThreads = await User.findOne({ id: userId });
		if (userThreads) {
			const userWithPopulatedThreads = await User.populate(userThreads, {
				path: "threads",
				model: Thread,
				populate :
					{
						path : 'parentId',
						model : Thread,
						select : '_id author',
						populate : {
							path : 'author',
							model : User,
							select : '_id username image'
						}
					},
				match: { parentId: { $ne: null } }, // Additional match condition for the 'threads'
			});
			return userWithPopulatedThreads
		}else{
			return []
		}
	} catch (error) {
		console.error("Error fetching replies: ", error);
		throw error;
	}
}

export async function getActivity(userId: string) {
	ConnectionToDb();
	try {
		const userThreads = await Thread.find({ author: userId });

		// Collect all the child thread ids (replies) from the 'children' field of each user thread
		const childThreadIds = userThreads.reduce((acc, userThread) => {
			return acc.concat(userThread.children);
		}, []);

		const replies = await Thread.find({
			_id: { $in: childThreadIds },
			author: { $ne: userId }, // Exclude threads authored by the same user
		}).populate({
			path: "author",
			model: User,
			select: "name image _id",
		});

		return replies;
	} catch (error) {
		console.error("Error fetching replies: ", error);
		throw error;
	}
}

const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to connect to mongoDB :${error.message}`);
	}
};

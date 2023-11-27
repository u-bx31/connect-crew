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

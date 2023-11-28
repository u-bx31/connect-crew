import * as z from "zod";

export const ThreadValidation = z.object({
	thread: z
		.string()
		.min(5, { message: "Post can not be empty Minimum 5 characters" }),
	accountId: z.string(),
});

export const CommentValidation = z.object({
	post: z
		.string()
		.min(5, { message: "Post can not be empty Minimum 5 characters" }),
	createdBy: z.string(),
});

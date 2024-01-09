import * as z from "zod";

export const ThreadValidation = z.object({
	thread: z
		.string()
		.min(1, { message: "Post can not be empty Minimum 5 characters" }),
	accountId: z.string(),
});

export const CommentValidation = z.object({
	thread: z
		.string()
		.min(1, { message: "Post can not be empty Minimum 5 characters" }),
});

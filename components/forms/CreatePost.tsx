"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createPost } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";

interface Props {
	userId: string;
	threadId?: string;
}
const CreatePost = ({ userId, threadId }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const { organization } = useOrganization();
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof ThreadValidation>>({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: "",
			accountId: userId,
		},
	});

	const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
		setLoading(true);
		let thread = threadId
			? {
					author: userId,
					text: values.thread,
					crewId: organization ? organization.id : null,
					path: pathname,
					repostedInfo: {
						originalThreadId: threadId || "",
					},
			  }
			: {
					author: userId,
					text: values.thread,
					crewId: organization ? organization.id : null,
					path: pathname,
			  };
		await createPost(thread).then((res) => {
			router.push("/");
			setLoading(false);
		});
	};
	return (
		<Form {...form}>
			<form
				className="mt-10 flex flex-col justify-start gap-10"
				onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
								<Textarea rows={15} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="bg-primary-500"
					loading={loading}
					disabled={loading}>
					Post Thread
				</Button>
			</form>
		</Form>
	);
};

export default CreatePost;

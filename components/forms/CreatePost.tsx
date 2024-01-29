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
import { toast } from "@/components/ui/use-toast";
import Tiptap from "../tiptap/TipTap";

interface Props {
	userId: string;
	threadId?: string;
}
const CreatePost = ({ userId, threadId }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const { organization } = useOrganization();
	const [loading, setLoading] = useState<boolean>(false);
	const [content, setContent] = useState("");
	const [clearContentFlag, setClearContentFlag] = useState(false);
	const [error, setError] = useState(false);

	const onSubmit = async () => {
		setLoading(true);
		let thread = threadId
			? {
					author: userId,
					text: content,
					crewId: organization ? organization.id : null,
					path: pathname,
					repostedInfo: {
						originalThreadId: threadId || "",
					},
			  }
			: {
					author: userId,
					text: content,
					crewId: organization ? organization.id : null,
					path: pathname,
			  };
		if (content !== "<p></p>" && content != "") {
			await createPost(thread).then((res) => {
				router.push("/");
				toast({
					title: "thread created sucessfuly",
					icon: true,
					variant: "success",
				});
				setLoading(false);
			});
		} else {
			setLoading(false);
			setError(true);
		}
	};
	return (
		<div className="mt-10 flex flex-col justify-start gap-10">
			<Tiptap
				content={content}
				setContent={setContent}
				clearContentFlag={clearContentFlag}
				setClearContentFlag={setClearContentFlag}
				error={error}
			/>

			<Button
				type="button"
				className="bg-primary-500"
				loading={loading}
				onClick={() => onSubmit()}
				disabled={loading}>
				Post Thread
			</Button>
		</div>
	);
};

export default CreatePost;

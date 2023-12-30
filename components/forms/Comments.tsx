"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";


interface Props {
  threadId : string,
  currentUserImg : string,
  currentUserId : string
}

const Comments = ({threadId , currentUserImg , currentUserId}: Props) => {

  const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof CommentValidation>>({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread({
      userId : currentUserId,
      commentText : values.thread,
      threadId  : threadId,
      path : pathname,
    })
    form.reset();
	};

	return(
    <Form {...form}>
    <form
      className="comment-form"
      onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className="flex flex-row w-full items-center gap-3">
            <FormLabel>
             <Image 
                src={currentUserImg}
                alt="Image"
                width={48}
                height={48}
                className="rounded-full object-cover"
             />
            </FormLabel>
            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
              <Input className="!mt-0 " type='text' placeholder="comments" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <button type="submit" className="bg-primary-500 comment-form_btn">
        Reply
      </button>
    </form>
  </Form>
  );
};

export default Comments;

"use client";

import { addLikesToThread } from "@/lib/actions/thread.actions";
import { Heart } from "@/public/assets";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Likes = ({
	threadId,
	userId,
	likes,
	state,
}: {
	threadId: string;
	userId: string;
	state: boolean;
	likes: number;
}) => {
	const [activ, setActiv] = useState<boolean>(state);
	const [count, setCount] = useState<number>(likes);
	const { push } = useRouter();
	const handleLikes = async (threadId: string, userId: string) => {
		if (!userId) {
			push("/sign-in");
		} else {
			setActiv(!activ);
			if (count > 0 && activ && userId) {
				setCount(count - 1);
			} else {
				setCount(count + 1);
			}
			await addLikesToThread({
				threadId: threadId,
				userId: userId,
				path: "/",
			});
		}
	};
	return (
		<div className="h-10 flex flex-col gap-y-1 items-center ">
			<button onClick={() => handleLikes(threadId, userId)}>
				<Heart className={`w-6 h-6 stroke-white ${activ && "fill-white"}`} />
			</button>
			{count > 0 && (
				<span className="text-xsmall-regular text-white">
					{count <= 200 ? count : "200+"} Likes
				</span>
			)}
		</div>
	);
};

export default Likes;

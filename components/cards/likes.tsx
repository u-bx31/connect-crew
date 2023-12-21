"use client";

import { addLikesToThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useState } from "react";



const Likes = ({threadId, userId}:{threadId : string , userId : string}) => {
	const [activ, setActiv] = useState<boolean>(false);
	const [count, setCount] = useState<number>(0);

	const handleLikes = async (threadId: string, userId: string) => {
		setActiv(!activ);

		if (activ) {
			setCount(count + 1);
		}
		await addLikesToThread({
			threadId: threadId,
			userId: userId,
			path: '/',
		});
	};
	return (
		<button onClick={() => handleLikes(threadId, userId)}>
			<Image
				src="/assets/heart-gray.svg"
				alt="heart"
				width={24}
				height={24}
				className="object-contain"
			/>
		</button>
	);
};

export default Likes;

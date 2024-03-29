"use client";

import { addLikesToThread } from "@/lib/actions/thread.actions";
import { Heart } from "@/public/assets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Likes = ({
	threadId,
	user,
	userId,
	likes,
	user_Id,
	lk,
	isOnBorded,
}: {
	threadId: string;
	userId: string;
	user?: any;
	likes: number;
	user_Id: string;
	isOnBorded?: boolean;
	lk: any;
}) => {
	const [activ, setActiv] = useState<boolean>(false);
	const [count, setCount] = useState<number>(likes);
	const { push } = useRouter();

	useEffect(() => {
		try {
			const threadLIke = lk.filter((items: any) => user_Id === items);
			if (threadLIke.length > 0 && threadLIke[0] === user_Id) {
				setActiv(true);
			} else {
				setActiv(false);
			}
		} catch (error) {
			console.error("Error in useEffect of likes:", error);
		}
	}, [, userId]);

	const handleLikes = async () => {
		console.log('likes',userId);
		if (!userId) {
			push("/sign-in");
		}
		if (user && !isOnBorded) {
			push("/onboarding");
		}
		if (userId) {
			setActiv(!activ);
			setCount(activ ? count - 1 : count + 1);

			await addLikesToThread({
				threadId: threadId,
				userId: userId,
				path: "/",
			});
		}
	};

	return (
		<div className="h-10 flex flex-col gap-y-1 items-center">
			<button onClick={handleLikes}>
				<Heart
					className={`w-6 h-6 stroke-white ${activ ? "fill-white" : "fill-none"}`}
				/>
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

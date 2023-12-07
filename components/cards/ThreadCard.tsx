import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
	id: string;
	createdAt: string;
	author: {
		id: string;
		name: string;
		image: string;
	};
	content: string;
	parentId: string | null;
	currentUser: string;
	crew: {
		id: string;
		name: string;
		image: string;
	} | null;
	comments: {
		author: {
			image: string;
		};
	}[];
	isComment?: boolean;
	isCurrentThread?: boolean;
}

const ThreadCard = ({
	id,
	currentUser,
	content,
	comments,
	crew,
	author,
	createdAt,
	parentId,
	isComment,
	isCurrentThread,
}: Props) => {
	return (
		<article
			className={`flex flex-col w-full rounded-md ${
				isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
			}`}>
			<div className="flex items-start justify-between">
				<div className="flex w-full flex-1 flex-row gap-4">
					<div className="flex flex-col items-center">
						<Link href={`/profile/${author.id}`} className="relative h-11 w-11">
							<Image
								src={author.image}
								alt="user_community_image"
								fill
								className="cursor-pointer rounded-full"
							/>
						</Link>

						<div className="thread-card_bar" />
					</div>

					<div className="flex w-full flex-col">
						<Link href={`/profile/${author.id}`} className="w-fit">
							<h4 className="cursor-pointer text-base-semibold text-light-1">
								{author.name}
							</h4>
							<p className="text-small-regular text-gray-400">
								{formatDateString(createdAt)}
							</p>
						</Link>

						<p className="mt-2 text-small-regular text-light-2">{content}</p>

						<div className={`${isComment && "mb-4"} mt-5 flex flex-col gap-3`}>
							<div className="flex gap-3.5">
								<Image
									src="/assets/heart-gray.svg"
									alt="heart"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
								<Link href={`/thread/${id}`}>
									{!isCurrentThread && (
										<Image
											src="/assets/reply.svg"
											alt="heart"
											width={24}
											height={24}
											className="cursor-pointer object-contain"
										/>
									)}
								</Link>
								<Image
									src="/assets/repost.svg"
									alt="heart"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
								<Image
									src="/assets/share.svg"
									alt="heart"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
							</div>
						</div>
						{ comments.length > 0 && (
							<Link href={`/thread/${id}`}>
								<p className="mb-3 text-subtle-medium text-gray-1">
									{comments.length} repl{comments.length > 1 ? "ies" : "y"}
								</p>
							</Link>
						)}
					</div>
				</div>
				{/* todo : delete && logos */}
			</div>
				{!isComment && crew && (
					<Link className="mt-5 flex items-center" href={`/crews/${crew.id}`}>
						<Image
							src={crew.image}
							alt="img"
							width={14}
							height={14}
							className="mr-1 object-cover rounded-full"
						/>
						<p className="text-subtle-medium text-gray-1">{crew.name} crew</p>
					</Link>
				)}
		</article>
	);
};

export default ThreadCard;

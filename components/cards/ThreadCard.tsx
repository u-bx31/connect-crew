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
	const displayedAuthors = new Set();
	const undisplayedAuthors = [];
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

					<div className="flex w-full flex-col gap-y-3">
						<Link href={`/profile/${author.id}`} className="w-fit">
							<h4 className="cursor-pointer text-base-semibold text-light-1">
								{author.name}
							</h4>
							<p className="text-small-regular text-gray-400">
								{formatDateString(createdAt)}
							</p>
							{!isComment && crew && (
								<Link className="flex items-center" href={`/crews/${crew.id}`}>
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
						</Link>

						<p className="text-small-regular text-light-2">{content}</p>

						<div className={`flex flex-col gap-3`}>
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
						<div className={`flex flex-row -space-x-3 mb-2 ${comments.length > 0 ? 'block' : "hidden"}`}>
							{comments.slice(0, 3).map((comment, index) => {
								const author = comment.author;

								// Check if the author has already been displayed
								if (!displayedAuthors.has(author)) {
									// If not, add the author to the displayed set and display the comment
									displayedAuthors.add(author);

									return (
										<div key={index} className={`w-7 h-7 rounded-full`}>
											<Image
												src={author.image}
												alt={`user_${index}`}
												width={28}
												height={28}
												className="rounded-full object-contain"
											/>
										</div>
									);
								}

								// If the author has already been displayed, add the author to the undisplayed array
								undisplayedAuthors.push(author);

								// If the author has already been displayed, return null or an empty fragment
								return null;
							})}
							{comments.length > 3 && (
								<Link
									href={`/thread/${id}`}
									className="w-7 h-7 flex items-center justify-center bg-gray-300  text-white rounded-full">
									<p className="text-subtle-medium text-gray-1">
										+ {comments.length - 3}
									</p>
								</Link>
							)}
						</div>
					</div>
				</div>
				{/* todo : delete */}
			</div>
		</article>
	);
};

export default ThreadCard;

import { fetchUserPosts, getUserReplies } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";
import { fetchCrewPosts } from "@/lib/actions/crew.actions";

interface Props {
	currentUserId: string;
	accountId: string;
	accountType: string;
	currentUserInfo : any,
}

const ThreadsTab = async ({ currentUserId, currentUserInfo , accountId , accountType }: Props) => {
	let response: any;
	if (accountType === "Crew") {
		response = await fetchCrewPosts(accountId);
	} else if(accountType == 'User') {
		response = await fetchUserPosts(accountId);
	}
	else {
		response = await getUserReplies(accountId);
	}
	return (
		<section className="mt-9 flex flex-col gap-10">
			{response?.threads.map((thread: any) => {
				let state;
				if (thread.likes.length > 0) {
					state = thread?.likes.map(
						(item: any) => currentUserInfo === item.userId.toString()
					);
				}
				return (
					<ThreadCard
						key={thread._id.toString()}
						id={thread._id.toString()}
						currentUser={currentUserInfo}
						parentId={thread.parentId}
						content={thread.text}
						author={
							accountType === "User" || accountType === "UserReplies"
								? { name: response.name, image: response.image, id: response.id }
								: {
										name: thread.author.name,
										image: thread.author.image,
										id: thread.author.id,
								  }
						}
						isLiked={state}
						lk={thread.likes}
						likes={thread.likes.length}
						crew={accountType === "User" && thread.crew}
						createdAt={thread.createdAt}
						comments={thread.children}
						reposted={thread?.reposted.originalThreadId} 
					/>
				);
			})}
			{response?.threads.length == 0 &&
				<h1 className="no-result text-center">No threads founded ...</h1>
			}
		</section>
	);
};

export default ThreadsTab;

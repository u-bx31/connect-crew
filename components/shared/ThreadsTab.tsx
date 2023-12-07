import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";
import { fetchCrewPosts } from "@/lib/actions/crew.actions";

interface Props {
	currentUserId: string;
	accountId: string;
	accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
	let response: any;
	if(accountType === 'Crew'){
		response = await fetchCrewPosts(accountId);
	}
	else{
		response = await fetchUserPosts(accountId);
	}
	return (
		<section className="mt-9 flex flex-col gap-10">
			{response.threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUser={currentUserId}
					parentId={thread.parentId}
					content={thread.text}
					author={
						accountType === "User"
							? { name: response.name, image: response.image, id: response.id }
							: {
									name: thread.author.name,
									image: thread.author.image,
									id: thread.author.id,
							  }
					}
					crew={null}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			))}
		</section>
	);
};

export default ThreadsTab;

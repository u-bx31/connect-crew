import ThreadCard from "@/components/cards/ThreadCard";
import CreatePost from "@/components/forms/CreatePost";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
	const user = await currentUser();
	if (!user) return null;
	const userInfo = await fetchUser(user.id);
	const thread = await fetchThreadById(params?.id);

	if (!userInfo?.onboarded) redirect("/onboarding");

	return (
		<div className="flex flex-col">
			<h1 className="head-text">Repost a thread</h1>
			<ThreadCard
				key={thread._id.toString()}
				id={thread._id.toString()}
				currentUser={userInfo}
				content={thread.text}
				crew={thread.crew}
				author={thread.author}
				createdAt={thread.createdAt}
				parentId={thread.parentId}
				isRpostedThread
				isCurrentThread
			/>
			<CreatePost userId={userInfo._id.toString()} threadId={thread._id.toString()} />
		</div>
	);
}

export default page;

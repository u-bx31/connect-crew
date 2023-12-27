import ThreadCard from "@/components/cards/ThreadCard";
import Comments from "@/components/forms/Comments";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Thread Section | ConnectCrew",
};

const Page = async ({ params }: { params: { id: string } }) => {
	//verify if we have thread id
	if (!params.id) return null;

	//verify if we have user
	const user = await currentUser();
	if (!user) return null;

	//verify if user is onborded
	const userInfo = await fetchUser(user?.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	//get thread info by fetching with param id
	const thread = await fetchThreadById(params?.id);

	let state;
	if (thread.likes.length > 0) {
		state = thread.likes.map(
			(item: any) => userInfo?._id === item.userId.toString()
		);
	}
	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id.toString()}
					id={thread._id.toString()}
					currentUser={userInfo}
					content={thread.text}
					crew={thread.crew}
					author={thread.author}
					isLiked={state}
					likes={thread.likes.length}
					createdAt={thread.createdAt}
					comments={thread.children}
					parentId={thread.parentId}
					isCurrentThread
				/>
			</div>
			<div className=" mt-7">
				<Comments
					threadId={thread._id.toString()}
					currentUserImg={userInfo?.image}
					currentUserId={userInfo?._id.toString()}
				/>
			</div>
			<div className=" mt-10">
				{thread?.children.map((items: any) => {
					let state;
					if (items.likes.length > 0) {
						state = items.likes.map(
							(item: any) => userInfo._id === item.userId.toString()
						);
					}
					return (
						<ThreadCard
							key={items._id.toString()}
							id={items._id.toString()}
							currentUser={userInfo}
							content={items.text}
							crew={items.crew}
							author={items.author}
							isLiked={state}
							likes={items.likes.length}
							createdAt={items.createdAt}
							comments={items.children}
							parentId={items.parentId}
							isComment
						/>
					);
				})}
			</div>
		</section>
	);
};

export default Page;

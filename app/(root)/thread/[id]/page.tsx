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
	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUser={user?.id || ""}
					content={thread.text}
					crew={thread.crew}
					author={thread.author}
					createdAt={thread.createdAt}
					comments={thread.children}
					parentId={thread.parentId}
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
					return (
						<ThreadCard
							key={items._id}
							id={items._id}
							currentUser={user?.id || ""}
							content={items.text}
							crew={items.crew}
							author={items.author}
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

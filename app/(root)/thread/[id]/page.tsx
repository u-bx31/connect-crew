import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async({ params }: { params: { id: string } }) => {
	//verify if we have thread id 
	if(!params.id) return null

	//verify if we have user
  const user = await currentUser();
	if(!user) return null

	//verify if user is onborded
  const userInfo = await fetchUser(user?.id) 
	if(!userInfo?.onboarded) redirect('/onboarding')

	//get thread info by fetching with param id 
	const thread = await fetchThreadById(params?.id);
	return (
		<section className="relative">
			<div className="">
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
		</section>
	);
};

export default Page;

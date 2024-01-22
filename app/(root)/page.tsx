import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {done} from 'nprogress';

export default async function Home() {
	const response = await fetchPosts(1, 30);
	if(response) done()
	// console.log("Response:", response.posts);

	const user = await currentUser();

	const userInfo = await fetchUser(user?.id || "");
	const onBoarded = userInfo?.onboarded;
	if (user && !onBoarded) redirect("/onboarding");
	return (
		<>
			<h1 className="text-white">Home</h1>
			<section className="mt-9 flex flex-col gap-10">
				{response.posts.length == 0 ? (
					<p className="no-result">No posts found .</p>
				) : (
					<>
						{response?.posts?.map((post) => {
							let state;
							if (post.likes.length > 0) {
								state = post.likes.map((item: any) => {
									return userInfo?._id === item.userId;
								});
							}
							return (
								<ThreadCard
									key={post._id.toString()}
									id={post._id.toString()}
									userAvaible={user ? true : false}
									currentUser={userInfo}
									content={post.text}
									crew={post.crew}
									author={post.author}
									createdAt={post.createdAt}
									comments={post.children}
									parentId={post.parentId}
									isLiked={state}
									lk={post.likes}
									userOnBoarded={onBoarded}
									likes={post.likes.length}
									reposted={post?.reposted.originalThreadId} 
								/>
							);
						})}
					</>
				)}
			</section>
		</>
	);
}

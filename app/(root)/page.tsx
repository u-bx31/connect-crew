import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
	const response = await fetchPosts(1, 30);
	// console.log("Response:", response.posts);
	
	const user = await currentUser();

	const userInfo = await fetchUser(user?.id || '')

	return (
		<>
			<h1 className="text-white">Home</h1>
			<section className="mt-9 flex flex-col gap-10">
				{response.posts.length == 0 ? (
					<p className="no-result">No posts found .</p>
				) : (
					<>
						{response?.posts?.map((post) => {
							let state
							if(post.likes.length > 0){
								state = post.likes.map((item:any) => userInfo._id === item.userId.toString())
							}
							return (
								<ThreadCard
									key={post._id.toString()}
									id={post._id.toString()}
									currentUser={userInfo}
									content={post.text}
									crew={post.crew}
									author={post.author}
									createdAt={post.createdAt}
									comments={post.children}
									parentId={post.parentId}
									isLiked={state}
									likes = {post.likes.length}
								/>
							);
						})}
					</>
				)}
			</section>
		</>
	);
}

import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const response = await fetchPosts(1, 30);
	const user = await currentUser();

	return (
		<>
			<h1 className="text-white">Home</h1>
			<section className="mt-9 flex flex-col gap-10">
				{response.posts.length == 0 ? (
					<p className="no-result">No posts found...</p>
				) : (
					<>
						{response.posts.map((post) => {
							return (
								<ThreadCard
									key={post._id}
									id={post._id}
									currentUser={user?.id || ""}
									content={post.text}
									crew={post.crew}
									author={post.author}
									createdAt={post.createdAt}
									comments={post.children}
									parentId={post.parentId}
								/>
							);
						})}
					</>
				)}
			</section>
		</>
	);
}

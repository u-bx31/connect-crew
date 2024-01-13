import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
	params: { id: string };
};
export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// fetch data
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id || '');
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];
	return {
		title: `${userInfo.name} Activity`,
		description: `${userInfo.name} Activity in ${process.env.NEXT_PUBLIC_APP_NAME} App`,
		openGraph: {
			title: `${userInfo.name} Activity`,
			description: `${userInfo.name} Activity in ${process.env.NEXT_PUBLIC_APP_NAME}`,
			images: ['/connectCrew_img.jpg', ...previousImages],
		},
	};
}

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/onboarding");
	const activity = await getActivity(userInfo._id);
	return (
		<>
			<h1 className="head-text">Activity</h1>

			<section className="mt-10 flex flex-col gap-5">
				{activity.length > 0 ? (
					<>
						{activity.map((activity) => (
							<Link key={activity._id} href={`/thread/${activity.parentId}`}>
								<article className="activity-card">
									<Image
										src={activity.author.image}
										alt="user_logo"
										width={20}
										height={20}
										className="rounded-full object-cover"
									/>
									<p className="!text-small-regular text-light-1">
										<span className="mr-1 text-primary-500">{activity.author.name}</span>{" "}
										replied to your thread
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<p className="no-result">No activity yet</p>
				)}
			</section>
		</>
	);
}

export default Page;

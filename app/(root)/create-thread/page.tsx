import CreatePost from "@/components/forms/CreatePost";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: `Create new thread | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: "Create new thread",
	openGraph : {
		images : '/connectCrew_img.jpg'
	}
};

async function page() {
	const user = await currentUser();
	if (!user) return null;
	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	return (
		<>
			<h1 className="head-text">Create Post </h1>
			<CreatePost userId={userInfo._id.toString()} />
		</>
	);
}

export default page;

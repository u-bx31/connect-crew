import UserCard from "@/components/cards/UserCard";
import { fetchUser, searchForUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {

  //verify if we have user
	const user = await currentUser();
	if (!user) return null;

	//verify if user is onborded
	const userInfo = await fetchUser(user?.id);
	if (!userInfo?.onboarded) redirect("/onboarding");  


	return (
		<section> 
			<h1 className="head-text mb-10">Search</h1>
        <div className="mt-14 flex flex-col gap-9">
        </div>

		</section>
	);
};

export default Page;

import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
	//verify if we have thread id
	if (!params.id) return null;

	//verify if we have user
	const user = await currentUser();
	if (!user) return null;

	//verify if user is onborded
	const userInfo = await fetchUser(params.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	return (
		<section>
			<h1 className="head-text">Profile</h1>
			<ProfileHeader
				accountId={userInfo.id}
				authUserId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				imgUrl={userInfo.image}
				bio={userInfo.bio}
			/>

			<div className="mt-9">
				<Tabs defaultValue="threads" className="w-full">
					<TabsList className="tab p-0">
						{profileTabs.map((tab) => {
							return (
								<TabsTrigger key={tab.label} value={tab.value} className="tab">
									<Image
										src={tab.icon}
										alt={tab.label}
										width={24}
										height={24}
										className="object-contain"
									/>
									<p className="max-sm:hidden">{tab.label}</p>
									{tab.label === "Threads" && (
										<p className="ml-1 rounded-full bg-primary-500 px-4 py-1 !text-tiny-medium text-light-2">
											{userInfo?.threads?.length}
										</p>
									)}
								</TabsTrigger>
							);
						})}
					</TabsList>
					{profileTabs.map((tab:any) => {
						return (
							<TabsContent
								key={`content-${tab.label}`}
								value={tab.value}
								className="w-full text-light-1">
								<ThreadsTab
									currentUserId={user?.id}
									accountId={userInfo.id}
									accountType="User"
								/>
							</TabsContent>
						);
					})}
				</Tabs>
			</div>
		</section>
	);
};

export default Page;

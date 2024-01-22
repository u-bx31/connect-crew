import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import {start,done} from 'nprogress';
type Props = {
  params: { id: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const userInfo = await fetchUser(params.id);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: `${userInfo.name} Profile`,
    description: `${userInfo.name} profile in ${process.env.NEXT_PUBLIC_APP_NAME}`,
		openGraph : {
			title : `${userInfo.name} Profile`,	
			description: `${userInfo.name} profile in ${process.env.NEXT_PUBLIC_APP_NAME}`,
			images: [userInfo.image, ...previousImages],
		},
  }
}


const Page = async ({ params }: { params: { id: string } }) => {
	//verify if we have thread id
	if (!params.id) return null;

	//verify if we have user
	const user = await currentUser();
	if (!user) return null;

	//verify if user is onborded
	const userInfo = await fetchUser(params.id);
	if(userInfo.id) done();
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
								<TabsTrigger key={tab.label} value={tab.value} disabled={tab.value == 'tagged' } className={`tab`}>
									<Image
										src={tab.icon}
										alt={tab.label}
										width={24}
										height={24}
										className={`object-contain`}
									/>
									<p className="max-sm:hidden">{tab.label}</p>
									
								</TabsTrigger>
							);
						})}
					</TabsList>
					<TabsContent
						value={'threads'}
						className="w-full text-light-1">
						<ThreadsTab
							currentUserId={user?.id}
							currentUserInfo={userInfo}
							accountId={userInfo.id}
							accountType="User"
						/>
					</TabsContent>
					<TabsContent
						value={'replies'}
						className="w-full text-light-1">
						<ThreadsTab
							currentUserId={user?.id}
							currentUserInfo={userInfo}
							accountId={userInfo?.id}
							accountType="UserReplies"
						/>
					</TabsContent>
					<TabsContent
						value={'tagged'}
						className="w-full text-light-1">
						<ThreadsTab
							currentUserId={user?.id}
							currentUserInfo={userInfo}
							accountId={userInfo.id}
							accountType="User"
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default Page;

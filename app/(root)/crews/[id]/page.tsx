import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { crewTabs } from "@/constants";

import UserCard from "@/components/cards/UserCard";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchCrewDetails } from "@/lib/actions/crew.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const crewDetails = await fetchCrewDetails(params.id);

  const userInfo = await fetchUser(user.id || '');

  return (
    <section>
      <ProfileHeader
        accountId={crewDetails.createdBy.id}
        authUserId={user.id}
        name={crewDetails.name}
        username={crewDetails.username}
        imgUrl={crewDetails.image}
        bio={crewDetails.bio}
        type='Crew'
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab p-0'>
            {crewTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-full bg-primary-500 px-4 py-1 !text-tiny-medium text-light-2'>
                    {crewDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='threads' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              currentUserInfo = {userInfo}
              accountId={crewDetails._id}
              accountType='Crew'
            />
          </TabsContent>

          <TabsContent value='members' className='mt-9 w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {crewDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imageUrl={member.image}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value='requests' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              currentUserInfo = {userInfo}
              accountId={crewDetails._id}
              accountType='Crew'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
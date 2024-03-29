import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";
// import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCrews} from "@/lib/actions/crew.actions";
import CrewCard from "@/components/cards/crewsCard";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Crew | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: `Display all the Crew on ${process.env.NEXT_PUBLIC_APP_NAME}`,
	openGraph : {
		images : '/connectCrew_img.jpg'
	}
};

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCrews({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-5'>
        {/* <Searchbar routeType='crews' /> */}
      </div>

      <section className='mt-9 flex flex-wrap gap-4 items-center justify-center'>
        {result.crews.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.crews.map((crew) => (
              <CrewCard
                key={crew.id}
                id={crew.id}
                name={crew.name}
                username={crew.username}
                imgUrl={crew.image}
                bio={crew.bio}
                members={crew.members}
              />
            ))}
          </>
        )}
      </section>

      {/* <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </>
  );
}

export default Page;
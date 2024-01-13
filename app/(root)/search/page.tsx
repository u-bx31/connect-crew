import UserCard from "@/components/cards/UserCard";
import { fetchUser, searchForUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: `Search | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: `Search for all the users that using ${process.env.NEXT_PUBLIC_APP_NAME}`,
	openGraph : {
		images : '/connectCrew_img.jpg'
	}
};

const Page = async () => {

  //verify if we have user
	const user = await currentUser();
	if (!user) return null;

	//verify if user is onborded
	const userInfo = await fetchUser(user?.id);
	if (!userInfo?.onboarded) redirect("/onboarding");  


  const response = await searchForUsers({
		userId: user?.id,
		pageNumber: 1,
		pageSize: 20,
		searchString: "",
		sortBy: "desc",
	})

	return (
		<section> 
			<h1 className="head-text mb-10">Search</h1>

        <div className="mt-14 flex flex-col gap-9">

          {
            response.Users.length === 0 ? <p className="no-result">No Users Found</p>:
            <>
              {response.Users.map((user : any)=>{
                  return(
                    <UserCard
                      key={user.id}
                      id={user.id}
                      imageUrl={user.image}
                      username ={user.username}
                      name={user.name}
                      personType='User'
                    />
                  )
              })}
            </>
          }


        </div>

		</section>
	);
};

export default Page;

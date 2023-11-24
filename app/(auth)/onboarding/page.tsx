import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const Onboarding = async() => {
    const user = await currentUser();
    const userInfo = {}

    const userData = {
        id : user?.id,
        objectId : userInfo?._id,
        username : userInfo?.username || user?.username,
        name : userInfo?.name || user?.firstName,
        bio : userInfo?.bio || '' ,
        image : userInfo?.image || user?.imageUrl ,

    }
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-1">
        Complete your profile now to join ConnectCrew
      </p>
      <section className="mt-9 bg-white rounded-md p-10">
        <AccountProfile user={userData} btnTitle='continue' />
      </section>
    </main>
  );
};

export default Onboarding;

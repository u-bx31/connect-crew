import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: `Sign-in | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: `Sign-in to your account `,
};
const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;

import { Metadata } from "next";
import SignUpComp from "./_components/SignUpComponent";

export const metadata: Metadata = {
	title: `Create new account | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: `Creating new account to join our ${process.env.NEXT_PUBLIC_APP_NAME} app`,
};

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUpComp />
    </div>
  );
};

export default SignUpPage;

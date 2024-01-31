import { Metadata } from "next";
import SignInComp from "./_components/SignInComponent";
export const metadata: Metadata = {
	title: `Sign-in | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: `Sign-in to your account `,
};
const SignInPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
				<SignInComp />
		</div>
	);
};

export default SignInPage;

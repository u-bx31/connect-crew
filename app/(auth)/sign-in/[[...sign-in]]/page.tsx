import { SignIn } from "@clerk/nextjs";
const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;

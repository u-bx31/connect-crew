import Image from "next/image";

import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-row justify-between w-full shadow-sm p-3 ">
        <h1>connectCrew</h1>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </main>
  );
}

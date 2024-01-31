import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
	title: "Home | ConnectCrew",
	description: "Generated by create next app",
	openGraph: {
		images: "/connectCrew_img.jpg",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<TopBar />
			<NextTopLoader showSpinner={false} />
			<main className="flex flex-row">
				<LeftSideBar />
				<section className="main-container">
					<div className="w-full max-w-4xl">{children}</div>
				</section>
				{/* <RightSideBar /> */}
				<Toaster />
			</main>
			<BottomBar />
		</div>
	);
}

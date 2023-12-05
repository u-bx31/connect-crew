import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/css/globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Home | ConnectCrew",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ClerkProvider>
				<Head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
				</Head>
				<body className={inter.className} suppressHydrationWarning={true}>
					<TopBar />
					<main className="flex flex-row">
						<LeftSideBar />
						<section className="main-container">
							<div className="w-full max-w-4xl">{children}</div>
						</section>
						<RightSideBar />
					</main>
					<BottomBar />
				</body>
			</ClerkProvider>
		</html>
	);
}

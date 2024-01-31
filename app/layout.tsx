import { Inter } from "next/font/google";
import "./style/css/globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<ClerkProvider>
				<body className={inter.className} suppressHydrationWarning={true}>
					{children}
				</body>
			</ClerkProvider>
		</html>
	);
}

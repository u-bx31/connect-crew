import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Authentication",
	description: `Authentication in ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={`bg-auth-background bg-cover bg-center bg-gray-950 bg-no-repeat w-100 `}>
			{children}
		</div>
	);
}

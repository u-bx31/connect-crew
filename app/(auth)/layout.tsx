import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/css/globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body suppressHydrationWarning={true}
          className={`${inter.className} bg-auth-background bg-cover bg-center bg-gray-950 bg-no-repeat w-100 `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

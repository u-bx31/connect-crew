"use client";
import {
	SignOutButton,
	SignedIn,
	OrganizationSwitcher,
	useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TopBar = () => {
	const { isSignedIn } = useAuth();
	const { push } = useRouter();
	return (
		<nav className="topbar">
			<Link href="/" className="flex items-center gap-4">
				<Image alt="logo" src="/logo.svg" width={50} height={50} />
				<h1 className="text-heading3-bold text-light-1 max-xs:hidden">
					connectCrew
				</h1>
			</Link>
			<div className="flex items-center gap-1">
				{!isSignedIn && (
					<Button variant={'custom'} onClick={() => push("/sign-in")}>
						Sign In
					</Button>
				)}
				<div className="block md:hidden">
					<SignedIn>
						<SignOutButton>
							<div className="flex cursor-pointer">
								<Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
							</div>
						</SignOutButton>
					</SignedIn>
				</div>
				<OrganizationSwitcher
					appearance={{
						baseTheme: dark,
						elements: {
							organizationSwitcherTrigger: "py-2 px-4",
						},
					}}
				/>
			</div>
		</nav>
	);
};

export default TopBar;

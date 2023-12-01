"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
const LeftSideBar = ({ activity }: { activity: number }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { userId } = useAuth();
	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				{sidebarLinks.map((elm, index) => {
					const isActive =
						(pathname.includes(elm.route) && elm.route.length > 1) ||
						pathname === elm.route;

					if (elm.route === "/profile") elm.route = `${elm.route}/${userId}`;
					const ico = elm.route === "/activity" ? true : false;
					return (
						<Link
							key={index}
							href={elm.route}
							className={`leftsidebar_link ${isActive && "bg-primary-500"}`}>
							<div className="relative">
								<Image src={elm.imgURL} alt={elm.label} height={24} width={24} />
								{ico && (
									<span className="absolute -bottom-2 -right-2 h-5 w-5 text-small-regular flex items-center justify-center bg-red-500 rounded-full text-white">{activity}</span>
								)}
							</div>
							<p className="text-light-1 max-lg:hidden">{elm.label}</p>
						</Link>
					);
				})}
			</div>
			<div className="mt-10 px-6">
				<SignedIn>
					<SignOutButton
						signOutCallback={() => {
							router.push("/sign-in");
						}}>
						<div className="flex cursor-pointer gap-4 p-4">
							<Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
							<p className="text-light-1 max-lg:hidden">Log-out</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
};

export default LeftSideBar;

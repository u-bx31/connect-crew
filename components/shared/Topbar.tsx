import {
    SignOutButton,
    SignedIn,
    OrganizationSwitcher,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  return (
    <nav className="topbar bg-sky-800">
      <Link href="/" className="flex items-center gap-4">
        <Image alt="logo" src={"/assets/vector.svg"} width={50} height={50} />
        <h1 className="text-heading3-bold text-light-1 max-xs:hidden">
          connectCrew
        </h1>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
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

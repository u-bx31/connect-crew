'use client'
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((elm, index) => {
          const isActive =
            (pathname.includes(elm.route) && elm.route.length > 1) ||
            pathname === elm.route;
          return (
            <Link
              key={index}
              href={elm.route}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image src={elm.imgURL} alt={elm.label} height={24} width={24} />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">{elm.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;

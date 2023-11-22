import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
const LeftSideBar = () => {
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((elm,index) => {
          return (
            <Link key={index} href={elm.route} className="flex flex-row gap-1">
              <Image src={elm.imgURL} alt={elm.label} height={24} width={24} />
              <p className="text-white">{elm.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSideBar;

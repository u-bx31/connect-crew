'use client'
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonTemp from "./skeleton";
interface Props{
  id : string;
  authorId : string;
  authorName : string;
  authorImage : string;
  text : string;
  createdAt : string;
  crewId : string | null;
  crewImage : string ;
  crewName : string;
}

const RepostedThreadCard = ({id,authorId,authorName,text,authorImage,createdAt,crewId,crewImage,crewName}:Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(id){
      setLoading(false)
    }
  },[id])
  if(loading){
    return <Link href={'#'} className="p-2 border border-gray-600 rounded-md">
      <SkeletonTemp />
    </Link>
  }
	return (
		<Link href={`/thread/${id}`} className="p-2 border border-dark-4 rounded-md">
			<div className="flex gap-2">
				<div className="flex flex-col items-center">
					<Link
						href={`/profile/${authorId}`}
						className={`relative h-10 w-10 `}>
						<Image
							src={authorImage}
							alt="user_community_image"
							fill
							className="cursor-pointer rounded-full"
						/>
					</Link>
					<div className="thread-card_bar" />
				</div>
				<div className="flex w-full flex-col gap-y-3">
					<Link
						href={`/profile/${authorId}`}
						className="w-fit">
						<h4 className="cursor-pointer text-small-semibold text-light-1">
							{authorName}
						</h4>
						<p className="text-xsmall-regular text-gray-400">
							{formatDateString(createdAt)}
						</p>
						{crewId && (
							<Link className="flex items-center" href={`/crews/${crewId}`}>
								<Image
									src={crewImage}
									alt="img"
									width={12}
									height={12}
									className="mr-1 object-cover rounded-full"
								/>
								<p className="text-subtle-medium text-gray-1">
									{crewName} crew
								</p>
							</Link>
						)}
					</Link>
					<p className="text-small-regular text-light-2">
						{text}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default RepostedThreadCard;

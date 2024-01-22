"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {start,done} from 'nprogress';


interface Props {
	key: string;
	id: string;
	imageUrl: string;
	username: string;
	name: string;
	personType: string;
}

const UserCard = ({ key, id, imageUrl, username, name, personType }: Props) => {
	const { push } = useRouter();
	const handleView = ()=>{
		push(`/profile/${id}`)
		start();
		setTimeout(() => {
			done()
		}, 10000);

	}
	return (
		<div className="user-card">
			<div className="user-card_avatar">
				<Image
					src={imageUrl}
					width={48}
					height={48}
					className="rounded-full !object-cover !h-100"
					alt="logo"
				/>
				<div className="flex-1 text-ellipsis">
					<h4 className="text-body-semibold text-light-1">{name}</h4>
					<p className="text-small-medium text-gray-1">@{username}</p>
				</div>
			</div>
			<Button className="user-card_btn" onClick={handleView}>
				View
			</Button>
		</div>
	);
};

export default UserCard;

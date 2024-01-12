"use client";
import Image from "next/image";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { Copy, Facebook, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { X } from "@/public/assets";

const ShareCard = ({ threadId }: { threadId: string }) => {
	const shareableLink = `${process.env.NEXT_PUBLIC_TEST_URL}/thread/${threadId}`;

	const handleTwitterShare = () => {
		const tweetText = "Check out this awesome thread!"; // Replace with your own tweet text
		const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
			shareableLink
		)}&text=${encodeURIComponent(tweetText)}`;
		window.open(twitterUrl, "_blank");
	};

	const handleFacebookShare = () => {
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			shareableLink
		)}`;
		window.open(facebookUrl, "_blank");
	};

	const handleInstagramShare = () => {
		const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
			shareableLink
		)}`;
		window.open(instagramUrl, "_blank");
	};
	const handleCopy = () => {
		navigator.clipboard.writeText(shareableLink);
	};
	return (
		<Dialog>
			<DialogTrigger className="bg-transparent pt-1">
				<Image
					src="/assets/share.svg"
					alt="share"
					width={24}
					height={24}
					className="object-contain"
				/>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-row gap-2 w-100 my-2">
					<button onClick={handleFacebookShare} className="flex items-center justify-center w-full bg-blue-700 p-3 rounded-md">
						<Facebook className="w-6 h-6 stroke-white stroke-[1.5px]" />
					</button>
					<button onClick={handleTwitterShare} className="flex items-center justify-center w-full bg-dark-3 p-3 rounded-md ">
						<X className="w-6 h-6 stroke-white stroke-[1px]" />
					</button>
				</div>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input id="link" defaultValue={shareableLink} readOnly />
					</div>
					<Button type="button" size="sm" className="px-3" onClick={handleCopy}>
						<span className="sr-only">Copy</span>
						<Copy className="h-4 w-4" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ShareCard;

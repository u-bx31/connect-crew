"use client";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-100 h-screen flex flex-col items-center justify-center bg-dark-3">
			<h1 className="text-9xl text-blue-700 font-bold">404</h1>
			<p className="pt-2 pb-8 text-4xl text-white font-semibold">
				Page Not Found ...
			</p>
			<Link href={'/'} className="text-blue-600 text-lg flex flex-row items-center gap-2 hover:text-blue-500 transition-all ease-in">
				<ArrowLeftCircle className="w-4 h-4 stroke-blue-600" />
				Back to home page
			</Link>
		</div>
	);
}

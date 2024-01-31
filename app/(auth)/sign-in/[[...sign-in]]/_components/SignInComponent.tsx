"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const SignInComp = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, [SignIn]);
	return (
		<>
			{loading && <Loader2 className="w-10 h-10 stroke-white animate-spin" />}
			<SignIn />
		</>
	);
};

export default SignInComp;

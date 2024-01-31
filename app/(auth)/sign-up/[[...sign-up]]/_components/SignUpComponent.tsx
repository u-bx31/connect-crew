"use client";

import { useEffect, useState } from "react";
import { SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const SignUpComp = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, [SignUp]);
	return (
		<>
			{loading && <Loader2 className="w-10 h-10 stroke-white animate-spin" />}
			<SignUp />
		</>
	);
};

export default SignUpComp;

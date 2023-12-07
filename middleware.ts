import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
	debug : true,
	// "/" will be accessible to all users
	publicRoutes: ["/"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

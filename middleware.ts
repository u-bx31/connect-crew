import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/","/api/webhook/clerk"],
	ignoredRoutes: ["/api/webhook/clerk"],
});

// Stop Middleware running on static files
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

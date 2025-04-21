import { clerkMiddleware } from "@clerk/nextjs/server";

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api/webhook*"];

const isPublic = (path: string) => {
  return publicPaths.find(x => 
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  );
};

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes and protected routes
    '/(api|trpc|dashboard|chat|summarize)(.*)',
  ],
}; 
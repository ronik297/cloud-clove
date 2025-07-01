import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	// const sessionCookie = getSessionCookie(request);

	// if (!sessionCookie) {
	// 	return NextResponse.redirect(new URL("/sign-in", request.url));
	// }
 
	return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
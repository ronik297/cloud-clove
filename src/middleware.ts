import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function getMiddlewareSession(req: NextRequest) {
  const { data: session } = await axios.get("/api/auth/get-session", {
    baseURL: req.nextUrl.origin,
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  return session;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const url = request.url;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const session = await getMiddlewareSession(request);

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/sign-")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
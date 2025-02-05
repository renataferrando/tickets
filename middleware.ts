import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const session = await getSession(req, response);
  const role = session?.user?.role;
  const url = req.nextUrl.pathname;

  const protectedRoutes = {
    "/my-events": ["Admin"], 
    "/events": ["Admin", "User"], 
    "/add-event": ["Admin"]
  };

  const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
    url.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  const unauthorizedRoute = Object.entries(protectedRoutes).find(
    ([route, allowedRoles]) =>
      url.startsWith(route) && !allowedRoles.includes(role)
  );

  if (unauthorizedRoute) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/editor/:path*", "/events", "/my-events"],
};

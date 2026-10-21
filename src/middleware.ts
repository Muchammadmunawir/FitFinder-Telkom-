import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("fitfinder_session")?.value;

  let session: { id?: number; role?: string; email?: string } | null = null;
  if (sessionCookie) {
    try {
      session = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      session = null;
    }
  }

  const isStudentRoute = pathname.startsWith("/student");
  const isOwnerRoute = pathname.startsWith("/owner");
  const isAuthRoute = pathname.startsWith("/auth");

  // 1. Protect Student Routes
  if (isStudentRoute) {
    if (!session) {
      const loginUrl = new URL("/auth/login-student", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "student") {
      // Owner trying to access student portal -> redirect to owner dashboard
      return NextResponse.redirect(new URL("/owner/dashboard", request.url));
    }
  }

  // 2. Protect Owner Routes
  if (isOwnerRoute) {
    if (!session) {
      const loginUrl = new URL("/auth/login-owner", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "owner") {
      // Student trying to access owner portal -> redirect back to student home
      return NextResponse.redirect(new URL("/student/home", request.url));
    }
  }

  // 3. Prevent logged-in users from visiting auth login/register pages
  if (isAuthRoute && session) {
    if (session.role === "student") {
      return NextResponse.redirect(new URL("/student/home", request.url));
    }
    if (session.role === "owner") {
      return NextResponse.redirect(new URL("/owner/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/owner/:path*",
    "/auth/:path*",
  ],
};

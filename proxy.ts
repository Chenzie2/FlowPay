import { auth } from "@/auth";

export const proxy = auth((request) => {
  const isLoggedIn = !!request.auth;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/send",
    "/receive",
    "/transactions",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(
      new URL("/login", request.nextUrl),
    );
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/send/:path*",
    "/receive/:path*",
    "/transactions/:path*",
  ],
};
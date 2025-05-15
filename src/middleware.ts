import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/admin/:path*",
  ],
}; 
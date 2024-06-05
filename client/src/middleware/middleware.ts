// middleware.ts
// import { isAuthenticated } from "@/Utils/Auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes = ["/settings", "/dashboard", "/profile"]; // add your protected routes here

// export default function middleware(req: NextRequest) {
//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
import { NextRequest, NextResponse } from "next/server"

import { getCookieSS } from "./helpers/cookieHelpersSS"

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login"]

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname
	let origin = req.nextUrl.origin
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)

	// 3. Decrypt the session from the cookie
	const cookie = req.cookies.get("accessToken")

	// 5. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !cookie) {
		return NextResponse.redirect(`${origin}/login`)
	}

	// 6. Redirect to /dashboard if the user is authenticated
	if (
		isPublicRoute &&
		cookie &&
		!req.nextUrl.pathname.startsWith("/dashboard")
	) {
		return NextResponse.redirect(`${origin}/dashboard`)
	}

	return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/((?!.swa).*)"]
}

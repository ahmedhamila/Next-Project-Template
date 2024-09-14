import { NextRequest, NextResponse } from "next/server"

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login"]

export default function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname

	// 2. Check if the current route is protected or public
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)

	// 3. Fetch the cookie from the request
	const cookie = req.cookies.get("accessToken") || null
	console.log("Path:", path)
	console.log("Cookie:", cookie)
	// 4. Redirect to /login if the user is not authenticated and trying to access a protected route
	if (isProtectedRoute && !cookie) {
		return NextResponse.redirect(new URL("/login", req.nextUrl))
	}

	// 5. Redirect to /dashboard if the user is authenticated and trying to access a public route
	if (isPublicRoute && cookie) {
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
	}

	return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/((?!.swa).*)"]
}

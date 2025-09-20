import { type NextRequest, NextResponse } from "next/server"

function verifyToken(token: string): { userId: string; email: string; role: string; exp: number } | null {
  try {
    const decoded = JSON.parse(atob(token))
    if (decoded.exp <= Date.now()) {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Protect customer dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}

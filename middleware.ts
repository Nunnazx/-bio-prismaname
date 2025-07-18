import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // For now, allow all requests to pass through
  // In a real implementation, you'd check authentication here
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
}
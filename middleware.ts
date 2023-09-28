import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Auth Pages
const authPages = ['/login'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Get Header
  const token = request.cookies.get('auth_token')?.value;
  // response.cookies.delete('auth_token');
  console.log('TOKEN', token);
  if (token && authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  if (!token && !authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return response;
}

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  matcher: ['/admin/:path*', '/login'],
};

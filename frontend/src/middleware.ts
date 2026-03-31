import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/shipments', '/matching', '/profile'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated by looking for the auth cookie
  const userCookie = request.cookies.get('shipshare_user');
  const isAuthenticated = !!userCookie?.value;
  
  // If trying to access protected route without auth, redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  
  // If trying to access auth routes while authenticated, redirect to dashboard
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/shipments/:path*',
    '/matching/:path*',
    '/profile/:path*',
    '/auth/login',
    '/auth/signup',
  ],
};

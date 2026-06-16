import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('sb-access-token')?.value;
  const refreshToken = request.cookies.get('sb-refresh-token')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const response = NextResponse.next();
  if (refreshToken) {
    response.cookies.set('sb-refresh-token', refreshToken, {
      path: '/', httpOnly: true, sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/shipments/:path*'],
};

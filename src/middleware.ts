import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = request.cookies.has('userId'); // checks cookie set by client

  // Block access to /signin and /signup if already logged in
  if ((pathname === '/signin' || pathname === '/signup') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to signin and signup
export const config = {
  matcher: ['/signin', '/signup'],
};

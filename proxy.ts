import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const publicRoutes = ['/login'];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(path);
  const token = request.cookies.get('npbos_session')?.value;
  const jwtSecret = process.env.JWT_SECRET;

  // If no session exists, guard non-public routes.
  if (!token) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // If secret is missing in runtime env, treat session as invalid.
  if (!jwtSecret) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  let isAuthenticated = false;
  try {
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    isAuthenticated = true;
  } catch {
    isAuthenticated = false;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

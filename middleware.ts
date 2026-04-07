import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-fallback-key-for-npbos');

const publicRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for static files, API routes (if any public ones exist), and Next.js internals
  if (
    path.startsWith('/_next') || 
    path.startsWith('/favicon.ico') ||
    path.includes('.') // public files like .css, .png
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(path);
  const token = request.cookies.get('npbos_session')?.value;

  // Let's verify the token securely if it exists
  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (err) {
      // Invalid or expired token
      isAuthenticated = false;
    }
  }

  // Redirect to login if user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if logged in user tries to access /login
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

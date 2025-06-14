import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin page
  if (request.nextUrl.pathname === '/admin') {
    const token = request.cookies.get('admin-token');
    
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Check if the request is for the login page
  if (request.nextUrl.pathname === '/login') {
    const token = request.cookies.get('admin-token');
    
    // If already logged in, redirect to admin
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/login']
};
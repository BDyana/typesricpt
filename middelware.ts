import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Define route access rules
  const roleAccessRules = {
    ADMIN: [
      '/dashboard',
      '/dashboard/products',
      '/dashboard/categories',
      '/dashboard/coupons',
      '/dashboard/store-banners',
      '/dashboard/customers',
      '/dashboard/farmers',
      '/dashboard/our-staff',
      '/dashboard/orders',
    ],
    FARMER: [
      '/dashboard/my-routes',
      '/dashboard/my-products',
      '/dashboard/my-customers',
    ],
    USER: ['/dashboard/orders'],
    MODERATOR: ['/dashboard/customers', '/dashboard/farmers'],
  };

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check if current path is allowed for user's role
  const userRole = token.role as keyof typeof roleAccessRules;
  const allowedPaths = roleAccessRules[userRole] || [];

  const isPathAllowed = allowedPaths.some((allowedPath) =>
    path.startsWith(allowedPath),
  );

  // If path is not allowed, redirect to not-found or unauthorized page
  if (!isPathAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/dashboard/:path*'],
};

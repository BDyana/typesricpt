import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = {
  admin: {
    paths: [
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
    role: 'ADMIN',
  },
  farmer: {
    paths: [
      '/dashboard/my-routes',
      '/dashboard/my-products',
      '/dashboard/my-customers',
    ],
    role: 'FARMER',
  },
  user: {
    paths: ['/dashboard/orders', '/checkout', '/profile'],
    role: 'USER',
  },
  moderator: {
    paths: ['/dashboard/customers', '/dashboard/farmers'],
    role: 'MODERATOR',
  },
};

// Helper function to check if a path requires authentication but not a specific role
const COMMON_ROUTES = ['/cart', '/checkout', '/profile'];

// Helper function to check if a path is protected
const isProtectedPath = (pathname: string) => {
  // Check if the path matches any protected route
  return Object.values(PROTECTED_ROUTES).some(({ paths }) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`)),
  );
};

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    const matchesPath = (path: string) => {
      return pathname === path || pathname.startsWith(`${path}/`);
    };

    // If the path is not protected, allow access without authentication
    if (!isProtectedPath(pathname) && !COMMON_ROUTES.some(matchesPath)) {
      return NextResponse.next();
    }

    // From here on, we know it's a protected path, so check for authentication
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const { role } = token;
    if (!role) {
      return NextResponse.redirect(new URL('/not-found', req.url));
    }

    // Check each type of protected route
    for (const [key, { paths, role: requiredRole }] of Object.entries(
      PROTECTED_ROUTES,
    )) {
      const isProtectedRoute = paths.some(matchesPath);
      if (isProtectedRoute && role !== requiredRole) {
        return NextResponse.redirect(new URL('/not-found', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only check authorization for protected routes
        const isProtectedPath = Object.values(PROTECTED_ROUTES)
          .flatMap((route) => route.paths)
          .concat(COMMON_ROUTES)
          .some((path) => req.nextUrl.pathname.startsWith(path));

        // If it's not a protected path, always return true
        if (!isProtectedPath) {
          return true;
        }

        // Otherwise, check for valid token and role
        return !!token && (token.role === 'ADMIN' || token.role === 'USER');
      },
    },
  },
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cart',
    '/checkout/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.|register|login).*)',
  ],
};

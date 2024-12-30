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
const COMMON_ROUTES = ['/your-cart', '/checkout'];

// Helper function to check if a path is protected
const isProtectedPath = (pathname: string) => {
  return Object.values(PROTECTED_ROUTES).some(({ paths }) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`)),
  );
};

// Helper function to check if path is in common routes
const isCommonProtectedPath = (pathname: string) => {
  return COMMON_ROUTES.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
};

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If the path is not protected and not in common routes, allow access
    if (!isProtectedPath(pathname) && !isCommonProtectedPath(pathname)) {
      return NextResponse.next();
    }

    // Check for authentication
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const { role } = token;
    if (!role) {
      return NextResponse.redirect(new URL('/not-found', req.url));
    }

    // For common protected routes, any authenticated user can access
    if (isCommonProtectedPath(pathname)) {
      return NextResponse.next();
    }

    // Check role-specific routes
    for (const { paths, role: requiredRole } of Object.values(
      PROTECTED_ROUTES,
    )) {
      const isProtectedRoute = paths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`),
      );
      if (isProtectedRoute && role !== requiredRole) {
        return NextResponse.redirect(new URL('/not-found', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // For non-protected paths, always authorize
        if (!isProtectedPath(pathname) && !isCommonProtectedPath(pathname)) {
          return true;
        }

        // For protected paths, require proper authentication
        if (isCommonProtectedPath(pathname)) {
          return !!token; // Any authenticated user can access common routes
        }

        // For role-specific routes, check both token and role
        return (
          !!token &&
          (token.role === 'ADMIN' ||
            token.role === 'USER' ||
            token.role === 'FARMER' ||
            token.role === 'MODERATOR')
        );
      },
    },
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/your-cart',
    '/checkout/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.|register|login).*)',
  ],
};

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Routes that only require authentication (no role check)
const AUTH_ONLY_ROUTES = ['/cart', '/checkout', '/profile'];

// Define routes that need role-based protection
interface ProtectedRouteConfig {
  paths: string[];
}

const ROLE_PROTECTED_ROUTES: Record<string, ProtectedRouteConfig> = {
  ADMIN: {
    paths: [
      '/dashboard/products',
      '/dashboard/categories',
      '/dashboard/coupons',
      '/dashboard/store-banners',
      '/dashboard/customers',
      '/dashboard/farmers',
      '/dashboard/our-staff',
      '/dashboard/orders',
    ],
  },
  MODERATOR: {
    paths: ['/dashboard/customers', '/dashboard/farmers'],
  },
  FARMER: {
    paths: [
      '/dashboard/my-routes',
      '/dashboard/my-products',
      '/dashboard/my-customers',
    ],
  },
};

// Get all role-protected paths
const getRoleProtectedPaths = (): string[] => {
  return Object.values(ROLE_PROTECTED_ROUTES).flatMap(({ paths }) => paths);
};

// Helper to get all paths for a role
const getAllowedPathsForRole = (role: string): string[] => {
  const roleHierarchy: Record<string, string[]> = {
    ADMIN: ['ADMIN', 'MODERATOR', 'FARMER'],
    MODERATOR: ['MODERATOR'],
    FARMER: ['FARMER'],
  };

  return (
    roleHierarchy[role]?.reduce((paths: string[], r) => {
      return [...paths, ...(ROLE_PROTECTED_ROUTES[r]?.paths || [])];
    }, []) || []
  );
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if the current path needs any protection
    const needsRoleCheck = getRoleProtectedPaths().some((protectedPath) =>
      path.startsWith(protectedPath),
    );
    const needsAuth = AUTH_ONLY_ROUTES.some((authPath) =>
      path.startsWith(authPath),
    );

    // If path doesn't need any protection, allow access
    if (!needsRoleCheck && !needsAuth) {
      return NextResponse.next();
    }

    // If user is not logged in, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    // If path only needs authentication, allow access
    if (!needsRoleCheck) {
      return NextResponse.next();
    }

    // Check role-based access for protected paths
    const userRole = token.role as string;
    if (!userRole) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const allowedPaths = getAllowedPathsForRole(userRole);
    const isAllowed = allowedPaths.some((allowedPath) =>
      path.startsWith(allowedPath),
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Allow all paths by default
    },
  },
);

export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/cart',
    '/checkout',
    '/profile',
    // Catch all routes except public assets and auth pages
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.|register|login).*)',
  ],
};

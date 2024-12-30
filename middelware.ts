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
    paths: ['/dashboard/orders'],
    role: 'USER',
  },
  moderator: {
    paths: ['/dashboard/customers', '/dashboard/farmers'],
    role: 'MODERATOR',
  },
};

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    // console.log('------------------------');
    // console.log('Current pathname:', pathname);
    // console.log('Token:', req.nextauth.token);

    const matchesPath = (path: string) => {
      const isMatch = pathname === path || pathname.startsWith(`${path}/`);
      // console.log(`Checking path ${path}:`, isMatch);
      return isMatch;
    };

    // Check admin routes first
    const isAdminRoute = PROTECTED_ROUTES.admin.paths.some(matchesPath);
    // console.log('Is admin route:', isAdminRoute);

    // Check user routes
    const isUserRoute = PROTECTED_ROUTES.user.paths.some(matchesPath);
    // console.log('Is user route:', isUserRoute);

    // If it's not a protected route at all, allow access
    if (!isAdminRoute && !isUserRoute) {
      // console.log('Not a protected route, allowing access');
      return NextResponse.next();
    }

    if (!req.nextauth.token) {
      // console.log('No token found, redirecting to register');
      return NextResponse.redirect(new URL('/register', req.url));
    }

    const { role } = req.nextauth.token;
    console.log('User role:', role);

    if (!role) {
      // console.log('No role found, redirecting to not-found');
      return NextResponse.redirect(new URL('/not-found', req.url));
    }

    // Handle admin routes
    if (isAdminRoute) {
      console.log('Checking admin access...');
      if (role !== PROTECTED_ROUTES.admin.role) {
        // console.log('User is not admin, redirecting to not-found');
        return NextResponse.redirect(new URL('/not-found', req.url));
      }
      console.log('Admin access granted');
    }

    // Handle user routes
    if (isUserRoute && role !== PROTECTED_ROUTES.user.role) {
      // console.log('Invalid user role, redirecting to not-found');
      return NextResponse.redirect(new URL('/not-found', req.url));
    }

    // console.log('Access granted, proceeding to route');
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const isAuthorized =
          !!token && (token.role === 'ADMIN' || token.role === 'USER');
        // console.log('Authorization check:', isAuthorized, 'Token:', token);
        return isAuthorized;
      },
    },
  },
);

// Make sure the matcher includes the path you're trying to protect
export const config = {
  matcher: [
    // Include specific paths you want to protect
    '/dashboard/:path*', // This will match all paths under /admin
    // Exclude paths you don't want to protect
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.|register|login).*)',
  ],
};

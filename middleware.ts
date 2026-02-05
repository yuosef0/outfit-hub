import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/auth/callback', '/auth/callback-handler'];
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith('/auth/'));

  // Get the authenticated user (more secure than getSession)
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // If no user and trying to access protected route, redirect to login
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If user is authenticated, check role-based access
  if (user) {
    // Try to get user role from database
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no rows

    // If user doesn't exist in database yet (e.g., during OAuth flow), allow access
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user role:', error);
    }

    const userRole = userData?.role || 'customer';

    // Merchant routes - only merchants can access
    if (pathname.startsWith('/merchant')) {
      if (userRole !== 'merchant') {
        // Customer trying to access merchant area - redirect to customer home
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // If logged in and trying to access login page, redirect to appropriate dashboard
    if (pathname === '/login') {
      if (userRole === 'merchant') {
        return NextResponse.redirect(new URL('/merchant/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};

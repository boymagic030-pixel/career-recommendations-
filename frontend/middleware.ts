import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    // Define public routes (no auth required)
    const isPublicRoute =
        pathname === '/' ||
        pathname === '/login' ||
        pathname === '/register' ||
        pathname === '/about' ||
        pathname === '/contact' ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('favicon.ico') ||
        pathname.endsWith('.svg') ||
        pathname.endsWith('.png') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.jpeg');

    // If there's no token and the path is completely private, redirect to login
    if (!authToken && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If authenticated user tries to visit login/register, redirect them to dashboard/assessment
    if (authToken && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/assessment', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Run middleware on every route except static Next.js assets
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

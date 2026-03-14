import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully'
    });

    // Clear the auth cookie by expiring it
    response.cookies.set('auth_token', '', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        sameSite: 'lax',
    });

    return response;
}

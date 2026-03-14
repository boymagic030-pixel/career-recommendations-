import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // In a real application, you would verify against a database here.
        // For this demo, we accept any non-empty email and password.
        if (email && password) {
            const response = NextResponse.json({
                success: true,
                message: 'Logged in successfully'
            });

            // Set a secure HTTP-only cookie
            response.cookies.set('auth_token', 'demo_authorized_user_token', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
            });

            return response;
        }

        return NextResponse.json({
            success: false,
            message: 'Invalid credentials. Please enter any email and password to test.'
        }, { status: 401 });

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error occurred' }, { status: 500 });
    }
}

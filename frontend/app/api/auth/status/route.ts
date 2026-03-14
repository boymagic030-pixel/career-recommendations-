import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    return NextResponse.json({ isAuthenticated: !!token });
}

import { NextRequest, NextResponse } from 'next/server';
import { pathSpecificQuestions, defaultQuestions } from '@/data/assessmentQuestions';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const targetPath: string = body?.targetPath || 'science';

        // Pick the correct stream-specific static questions
        const questions = pathSpecificQuestions[targetPath] ?? defaultQuestions;

        return NextResponse.json({
            success: true,
            questions,
        });
    } catch {
        // Even if parsing request fails, return safe default questions
        return NextResponse.json({
            success: true,
            questions: defaultQuestions,
            fallback: true,
        });
    }
}

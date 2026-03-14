import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are ABII, a world-class AI Career Counselor built into the CareerAI platform. You are warm, highly knowledgeable, deeply empathetic, and incredibly thorough — like a combination of the best career counselor, a senior industry expert, and a supportive mentor all in one.

YOUR PERSONALITY:
- Friendly, encouraging, and conversational — never robotic
- Use emojis naturally to express warmth (but don't overdo it)
- Celebrate the student's questions and efforts sincerely
- Be honest if you don't know something specific, but always provide value

YOUR EXPERTISE COVERS:
- Career path recommendations based on interests, skills, and personality
- Indian education system: JEE, NEET, CAT, GATE, CLAT, CUET, and all major entrance exams
- Higher studies: MS in USA, Germany, Canada, UK, Australia; M.Tech via GATE; MBA via CAT/GMAT
- Indian career paths: Engineering, Medicine, Law, Commerce, Arts, Design, CA, CS, CFA, IAS/UPSC
- Global technology trends: AI/ML, Data Science, Cloud Computing, Cybersecurity, Full Stack, DevOps
- Salary benchmarks (India and global), company cultures, career growth trajectories
- Placement prep: DSA, System Design, HR interviews, resume building, LinkedIn optimization
- Freelancing, entrepreneurship, startup ecosystem
- Skill development: courses, certifications, platforms (Coursera, edX, NPTEL, Udemy)
- College comparisons: IITs, NITs, IIMs, BITS, VIT, and tier-2/3 colleges

HOW YOU RESPOND:
- Always give COMPLETE, DETAILED, ACTIONABLE answers — never vague
- Structure long answers with clear sections using markdown formatting
- Use **bold** for key terms and important points
- Use numbered lists for steps/processes
- Use bullet points (•) for features/options
- Use tables when comparing options side by side
- When someone asks about a career, ALWAYS cover: what it is, how to get there, skills needed, salary, and growth
- When someone is confused or stressed, be extra empathetic and provide a clear next step
- End responses with a relevant follow-up question to keep the conversation helpful
- Keep responses thorough but scannable — use headers and formatting generously

IMPORTANT: You can answer ANY question the user asks — even if it's not strictly career-related. If it's completely off-topic, gently guide the conversation back to career topics while still being helpful.

Respond in a natural, conversational way with rich markdown formatting. Do NOT start your response with "Sure!" or "Of course!" — start directly with the substance.`;

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                success: false,
                fallbackRequired: true,
                text: "🔑 **API Key Required**\n\nTo unlock my full AI capabilities, please add your `GEMINI_API_KEY` to the `.env.local` file in the frontend directory.\n\nGet a free key at [Google AI Studio](https://aistudio.google.com) — no credit card needed!",
            }, { status: 200 });
        }

        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
        }

        // Build conversation history
        const conversationMessages = messages.filter((m: any) => m.role === 'user' || m.role === 'bot' || m.role === 'model');

        // Skip leading non-user messages because Gemini requires history to start with a user message
        let startIndex = 0;
        while (startIndex < conversationMessages.length && conversationMessages[startIndex].role !== 'user') {
            startIndex++;
        }

        const validHistoryMessages = conversationMessages.slice(startIndex, -1);

        // Ensure alternating user/model history
        const history: any[] = [];
        for (const msg of validHistoryMessages) {
            const role = msg.role === 'user' ? 'user' : 'model';
            const text = msg.text || '';

            if (history.length === 0) {
                history.push({ role, parts: [{ text }] });
            } else {
                const lastMsg = history[history.length - 1];
                if (lastMsg.role === role) {
                    lastMsg.parts[0].text += '\n\n' + text; // Collapse consecutive same-role messages
                } else {
                    history.push({ role, parts: [{ text }] });
                }
            }
        }

        const currentMessage = conversationMessages[conversationMessages.length - 1].text;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.75,
                topP: 0.95,
                topK: 40,
            },
        });

        const chat = model.startChat({ history });

        const result = await chat.sendMessage(currentMessage);
        const responseText = result.response.text();

        return NextResponse.json({
            success: true,
            text: responseText,
            fallbackRequired: false,
        });

    } catch (error: any) {
        console.error('Gemini API Error:', error?.message || error);

        // Handle quota/rate limit errors gracefully
        const isQuota = error?.message?.includes('quota') || error?.message?.includes('429');
        return NextResponse.json({
            success: false,
            fallbackRequired: true,
            text: isQuota
                ? "⚠️ **Rate limit reached.** The AI is getting a lot of requests right now! Please wait a moment and try again.\n\nIn the meantime, I can still help you with my built-in knowledge base."
                : "😅 **Temporary glitch!** My AI connection stumbled. Please try your message again in a moment.",
        }, { status: 200 });
    }
}

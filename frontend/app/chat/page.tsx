'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Sparkles, User, Brain, Briefcase, TrendingUp,
    GraduationCap, HelpCircle, RotateCcw, Lightbulb,
    Globe, DollarSign, BookOpen, Star, Zap, Copy, Check,
    ChevronDown, MessageCircle, Cpu, Code2, Shield,
} from 'lucide-react';
import { Navbar } from '@/components';
import styles from './page.module.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface Message {
    id: number;
    role: 'user' | 'bot';
    text: string;
    time: string;
    quickReplies?: string[];
    isStreaming?: boolean;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function getTime() {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

/* ─── Markdown Renderer ──────────────────────────────────────────────────────── */
function renderMarkdown(text: string): string {
    return text
        // Code blocks (```lang\ncode\n```)
        .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
            `<pre class="codeBlock"><code class="lang-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`)
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="inlineCode">$1</code>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="mdH3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="mdH2">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="mdH1">$1</h1>')
        // Bold + Italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Tables
        .replace(/(\|.+\|\n)+/g, renderTable)
        // Ordered lists
        .replace(/((?:^\d+\. .+\n?)+)/gm, (m) =>
            '<ol class="mdOl">' + m.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('') + '</ol>')
        // Unordered lists (-, *, •)
        .replace(/((?:^[-*•] .+\n?)+)/gm, (m) =>
            '<ul class="mdUl">' + m.trim().split('\n').map(l => `<li>${l.replace(/^[-*•] /, '')}</li>`).join('') + '</ul>')
        // Horizontal rule
        .replace(/^---+$/gm, '<hr class="mdHr" />')
        // Line breaks
        .replace(/\n\n/g, '</p><p class="mdP">')
        .replace(/\n/g, '<br/>');
}

function escapeHtml(str: string) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderTable(tableStr: string): string {
    const rows = tableStr.trim().split('\n').filter(r => r.trim());
    if (rows.length < 2) return tableStr;
    const headers = rows[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
    const bodyRows = rows.slice(2).map(row =>
        '<tr>' + row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    ).join('');
    return `<div class="tableWrap"><table class="mdTable"><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
}

/* ─── Static fallback brain ──────────────────────────────────────────────────── */
function staticFallback(input: string): { text: string; quickReplies?: string[] } {
    const t = input.toLowerCase();

    if (/^(hi|hello|hey|namaste|good\s*(morning|evening|afternoon))/.test(t)) {
        const h = new Date().getHours();
        const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
        return {
            text: `${g}! 👋 I'm **ABII**, your AI Career Counselor.\n\nI'm here to help you with:\n- 🎯 **Career exploration & recommendations**\n- 📚 **Courses, certifications & learning paths**\n- 💰 **Salary data & industry insights**\n- 🏛️ **College admissions & entrance exams**\n- 🌍 **Higher studies abroad (MS/MBA/PhD)**\n- 💼 **Placement prep & interview strategies**\n\nWhat's on your mind today? I'm all ears! 😊`,
            quickReplies: ['What career suits me?', 'Top skills in 2026', 'How to crack JEE/NEET?', 'MS abroad guide'],
        };
    }

    if (/(salary|pay|income|lpa|ctc|earn|package)/.test(t)) {
        return {
            text: `## 💰 Salary Overview — India 2026\n\n| Career | Fresher | Mid (3-5yr) | Senior (7+yr) |\n|---|---|---|---|\n| 🤖 ML/AI Engineer | ₹8-15 LPA | ₹20-40 LPA | ₹45-90 LPA |\n| 💻 Software Engineer | ₹5-12 LPA | ₹15-30 LPA | ₹30-60 LPA |\n| 🎯 Product Manager | ₹10-18 LPA | ₹25-45 LPA | ₹50-1Cr+ |\n| 📊 Data Analyst | ₹4-9 LPA | ₹12-22 LPA | ₹22-40 LPA |\n| 🎨 UX Designer | ₹5-10 LPA | ₹14-25 LPA | ₹25-45 LPA |\n| ☁️ Cloud/DevOps | ₹7-14 LPA | ₹18-35 LPA | ₹35-70 LPA |\n| 🔐 Cybersecurity | ₹6-12 LPA | ₹15-28 LPA | ₹28-55 LPA |\n\n**FAANG India salaries** can be 3-5x higher for senior roles!\n\nWhich specific role would you like deeper salary data for?`,
            quickReplies: ['Software Engineer salary', 'Data Science salary', 'Product Manager salary', 'FAANG packages'],
        };
    }

    if (/(coding|programming|software|developer|tech|computer)/.test(t)) {
        return {
            text: `## 💻 Top Tech Career Paths in 2026\n\n1. **Software Engineer** — Build products at scale. ₹5-60 LPA\n2. **Machine Learning Engineer** — Build AI models. ₹8-90 LPA\n3. **Full Stack Developer** — Frontend + Backend. ₹6-45 LPA\n4. **DevOps/Cloud Engineer** — Automate & deploy. ₹7-55 LPA\n5. **Cybersecurity Analyst** — Protect systems. ₹6-50 LPA\n\n### 🗺️ Starter Roadmap:\n- Master **Python or JavaScript** first\n- Learn **Data Structures & Algorithms**\n- Build **3-5 real projects** (GitHub portfolio)\n- Practice **200+ LeetCode** problems\n- Contribute to **open source**\n\nWhich of these paths excites you most?`,
            quickReplies: ['Full Stack roadmap', 'ML/AI roadmap', 'FAANG preparation', 'Best coding courses'],
        };
    }

    return {
        text: `🤔 Great question! I can help you with that.\n\nHere are some popular topics I cover:\n\n- 🎯 **Career paths** — "What career suits me?"\n- 📚 **Learning** — "How to become a Data Scientist?"\n- 💰 **Salaries** — "What does a PM earn?"\n- 🏛️ **Admissions** — "How to get into IIT?"\n- 🌍 **Abroad** — "MS in USA vs Germany?"\n- 💼 **Jobs** — "How to crack placements?"\n\nCould you rephrase or pick a topic? I want to give you the most helpful answer! 😊`,
        quickReplies: ['Career paths for me', 'Skills in demand 2026', 'Salary insights', 'Higher studies guide'],
    };
}

/* ─── Suggestions ────────────────────────────────────────────────────────────── */
const SUGGESTIONS = [
    { text: 'What career suits me?', icon: Briefcase },
    { text: 'Top skills in demand 2026', icon: TrendingUp },
    { text: 'How to become a Data Scientist?', icon: Brain },
    { text: 'Compare CSE vs IT', icon: HelpCircle },
    { text: 'MS in USA or Germany?', icon: Globe },
    { text: 'Crack FAANG interviews', icon: Code2 },
    { text: 'Software Engineer salary', icon: DollarSign },
    { text: 'Best free courses online', icon: BookOpen },
    { text: 'JEE/NEET preparation tips', icon: GraduationCap },
    { text: 'Freelancing guide 2026', icon: Cpu },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([{
        id: 0, role: 'bot', time: getTime(),
        text: `Hey! 👋 I'm **ABII**, your AI Career Counselor — powered by Google Gemini.\n\nI can answer **any question** about careers, education, salaries, courses, interviews, study abroad, and much more. I give detailed, structured answers with real data.\n\nTry asking me something — or pick one of the suggestions below! 🚀`,
        quickReplies: ['What career suits me?', 'Top skills in 2026', 'MS abroad guide', 'Placement prep tips'],
    }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesAreaRef = useRef<HTMLDivElement>(null);

    /* Auto-scroll */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    /* Auto-resize textarea */
    useEffect(() => {
        const ta = inputRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 140) + 'px';
    }, [input]);

    /* Copy message */
    const copyMessage = async (id: number, text: string) => {
        const plain = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,3} /g, '');
        await navigator.clipboard.writeText(plain).catch(() => { });
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    /* Send message */
    const send = useCallback(async (text: string) => {
        if (!text.trim() || isTyping) return;
        const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: getTime() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        /* Try Gemini API first */
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text })),
                }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data?.success && !data.fallbackRequired) {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        role: 'bot',
                        text: data.text,
                        time: getTime(),
                    }]);
                    setIsTyping(false);
                    return;
                }
                // API returned a fallback message (e.g. no key) — still show it
                if (data?.text) {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        role: 'bot',
                        text: data.text,
                        time: getTime(),
                    }]);
                    setIsTyping(false);
                    return;
                }
            }
        } catch { /* network error — fall through to static */ }

        /* Static fallback */
        await new Promise(r => setTimeout(r, 900 + Math.random() * 800));
        const { text: botText, quickReplies } = staticFallback(text.trim());
        setMessages(prev => [...prev, {
            id: Date.now() + 1, role: 'bot',
            text: botText, time: getTime(), quickReplies,
        }]);
        setIsTyping(false);
    }, [isTyping, messages]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
    };

    const clearChat = () => {
        setMessages([{
            id: Date.now(), role: 'bot', time: getTime(),
            text: 'Chat cleared! 🧹 What would you like to explore next?',
            quickReplies: ['Career paths', 'Skills in 2026', 'Salary insights', 'College guide'],
        }]);
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.chatContainer}>

                    {/* ── Header ─────────────────────────────────────────── */}
                    <motion.div
                        className={styles.chatHeader}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.headerOrb} />
                        <div className={styles.headerLeft}>
                            <div className={styles.avatarWrap}>
                                <div className={styles.chatAvatar}>
                                    <Sparkles size={26} />
                                </div>
                                <div className={styles.onlinePing} />
                            </div>
                            <div>
                                <h1 className={styles.chatTitle}>
                                    ABII <span className={styles.gradientText}>AI Counselor</span>
                                </h1>
                                <div className={styles.onlineStatus}>
                                    <div className={styles.onlineDot} />
                                    Online • Powered by Gemini AI
                                </div>
                            </div>
                        </div>
                        <div className={styles.headerRight}>
                            <div className={styles.modelBadge}>
                                <Sparkles size={11} /> Gemini 1.5 Flash
                            </div>
                            <button className={styles.clearBtn} onClick={clearChat} title="Clear chat">
                                <RotateCcw size={14} />
                                <span>Clear</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* ── Suggestions (shown only at start) ─────────────── */}
                    <AnimatePresence>
                        {messages.length <= 1 && (
                            <motion.div
                                className={styles.suggestions}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className={styles.suggestLabel}>
                                    <Lightbulb size={13} /> Try asking:
                                </p>
                                <div className={styles.suggestGrid}>
                                    {SUGGESTIONS.map((s, i) => (
                                        <motion.button
                                            key={i}
                                            className={styles.suggestChip}
                                            onClick={() => send(s.text)}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.25 + i * 0.04 }}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <s.icon size={12} />
                                            {s.text}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Messages ───────────────────────────────────────── */}
                    <div className={styles.messagesArea} ref={messagesAreaRef}>
                        <AnimatePresence initial={false}>
                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgRowUser : styles.msgRowBot}`}
                                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {/* Avatar */}
                                    <div className={`${styles.msgAvatar} ${msg.role === 'bot' ? styles.botAvatar : styles.userAvatar}`}>
                                        {msg.role === 'bot' ? <Sparkles size={15} /> : <User size={15} />}
                                    </div>

                                    <div className={styles.msgContent}>
                                        {/* Bubble */}
                                        {msg.role === 'bot' ? (
                                            <div className={`${styles.bubble} ${styles.botBubble}`}>
                                                <div
                                                    className={styles.mdContent}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `<p class="mdP">${renderMarkdown(msg.text)}</p>`
                                                    }}
                                                />
                                                {/* Copy button for bot messages */}
                                                <button
                                                    className={styles.copyBtn}
                                                    onClick={() => copyMessage(msg.id, msg.text)}
                                                    title="Copy message"
                                                >
                                                    {copied === msg.id
                                                        ? <><Check size={11} /> Copied!</>
                                                        : <><Copy size={11} /> Copy</>
                                                    }
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={`${styles.bubble} ${styles.userBubble}`}>
                                                {msg.text}
                                            </div>
                                        )}

                                        {/* Quick reply chips */}
                                        {msg.role === 'bot' && msg.quickReplies && (
                                            <div className={styles.quickReplies}>
                                                {msg.quickReplies.map((qr, qi) => (
                                                    <button
                                                        key={qi}
                                                        className={styles.quickReplyChip}
                                                        onClick={() => send(qr)}
                                                    >
                                                        {qr}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <span className={`${styles.msgTime} ${msg.role === 'user' ? styles.msgTimeUser : ''}`}>
                                            {msg.time}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing indicator */}
                        <AnimatePresence>
                            {isTyping && (
                                <motion.div
                                    className={`${styles.msgRow} ${styles.msgRowBot}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className={`${styles.msgAvatar} ${styles.botAvatar}`}>
                                        <Sparkles size={15} />
                                    </div>
                                    <div className={styles.typingBubble}>
                                        <span /><span /><span />
                                        <span className={styles.typingLabel}>ABII is thinking...</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* ── Input ──────────────────────────────────────────── */}
                    <div className={styles.inputArea}>
                        <div className={styles.inputCard}>
                            <textarea
                                ref={inputRef}
                                className={styles.textInput}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask me anything about careers, skills, colleges, salaries..."
                                rows={1}
                                disabled={isTyping}
                                maxLength={1000}
                            />
                            <div className={styles.inputActions}>
                                <span className={`${styles.charCount} ${input.length > 800 ? styles.charWarn : ''}`}>
                                    {input.length}/1000
                                </span>
                                <motion.button
                                    className={`${styles.sendBtn} ${(!input.trim() || isTyping) ? styles.sendBtnDisabled : ''}`}
                                    onClick={() => send(input)}
                                    disabled={!input.trim() || isTyping}
                                    whileHover={input.trim() && !isTyping ? { scale: 1.1 } : {}}
                                    whileTap={input.trim() && !isTyping ? { scale: 0.9 } : {}}
                                >
                                    <Send size={17} />
                                </motion.button>
                            </div>
                        </div>
                        <p className={styles.inputHint}>
                            <Zap size={11} />
                            <kbd>Enter</kbd> to send &nbsp;·&nbsp; <kbd>Shift+Enter</kbd> for new line
                            &nbsp;·&nbsp; Powered by Gemini AI ✨
                        </p>
                    </div>

                </div>
            </main>
        </>
    );
}

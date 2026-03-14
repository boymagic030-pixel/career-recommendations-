'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
    {
        q: "What is CareerAI and how does it work?",
        a: "CareerAI is an intelligent career guidance platform that uses advanced AI, including Google Gemini, to analyze your skills, interests, and personality. It matches you with suitable career paths and provides custom learning roadmaps."
    },
    {
        q: "Is the career assessment free?",
        a: "Yes! Our core career assessment and basic pathways are completely free for students. We believe high-quality career guidance should be accessible to everyone."
    },
    {
        q: "Can the AI really help me write a resume?",
        a: "Absolutely. Our AI-Powered Builder auto-optimizes your descriptions using action verbs and industry-standard keywords so your resume becomes ATS-friendly and stands out to recruiters."
    },
    {
        q: "How accurate is the recommendation engine?",
        a: "Our engine is trained on thousands of career profiles, industry trends, and salary databases. While no system is perfect, our recommendations provide highly accurate starting points and reliable data."
    },
    {
        q: "Is my data and assessment secure?",
        a: "We use strict end-to-end encryption to store your information. You can read our Data Protection policy and Privacy Policy links in the footer for detailed security practices."
    }
];

export default function FAQPage() {
    return (
        <>
            <Navbar />
            <main style={{ padding: '8rem 1.5rem 4rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <HelpCircle size={28} color="#6366f1" />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '3rem' }}>Everything you need to know about CareerAI, our assessments, and how we help you find the right path.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {FAQS.map((faq, i) => (
                                <motion.div 
                                    key={i}
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-xl)',
                                        padding: '1.5rem',
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {faq.q}
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}

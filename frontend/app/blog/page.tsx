'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const POSTS = [
    {
        title: "The Top 5 AI Careers to Pursue in 2027",
        date: "March 10, 2026",
        category: "Industry Trends",
        desc: "Artificial intelligence is reshaping the global job market. From Prompt Engineering to Core ML development, explore where the opportunities lie."
    },
    {
        title: "How to Build an ATS-Friendly Resume",
        date: "February 24, 2026",
        category: "Career Advice",
        desc: "Over 75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. Learn the keywords and structures you need to bypass the bots."
    },
    {
        title: "Should You Consider a Master's Degree Abroad?",
        date: "February 12, 2026",
        category: "Education",
        desc: "Weighing the pros and cons of studying in the US, Germany, and the UK as an international student. Exploring scholarships, visas, and ROIs."
    },
    {
        title: "Breaking into Tech without a CS Degree",
        date: "January 28, 2026",
        category: "Tech Careers",
        desc: "You do not always need a computer science degree to land a job as a developer or designer. We've collected the best bootcamps and certifications to pivot smoothly."
    }
];

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main style={{ padding: '8rem 1.5rem 4rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <BookOpen size={28} color="#6366f1" />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text-primary)' }}>CareerAI Blog</h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '3rem', fontSize: '1.1rem' }}>Latest insights on careers, technology trends, and education strategies.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {POSTS.map((post, i) => (
                                <motion.div 
                                    key={i}
                                    style={{
                                        background: 'var(--bg-card-solid)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-xl)',
                                        padding: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        transition: 'all 0.3s'
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5, borderColor: 'var(--accent-primary)', boxShadow: 'var(--shadow-lg)' }}
                                >
                                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                                        {post.category} • {post.date}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {post.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', flex: 1 }}>
                                        {post.desc}
                                    </p>
                                    <Link href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '1.5rem', textDecoration: 'none' }}>
                                        Read Article <ArrowRight size={14} color="var(--accent-primary)" />
                                    </Link>
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

'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import { Shield } from 'lucide-react';

export default function DataProtectionPage() {
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
                            <Shield size={28} color="#6366f1" />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text-primary)' }}>Data Protection Policy</h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>Last updated: March 2026</p>

                        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>1. Introduction</h2>
                                <p>At CareerAI, we take your privacy and data protection seriously. This policy explains how we collect, process, and protect your personal information in accordance with global data protection regulations.</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>2. Data Collection</h2>
                                <p>We only collect data necessary to provide you with accurate career recommendations and personalized roadmaps. This includes your assessment answers, profile details, and usage analytics.</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
                                <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                                    <li>To personalize your career recommendations and learning pathways.</li>
                                    <li>To improve our AI algorithms.</li>
                                    <li>To communicate with you regarding your account and career goals.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>4. Data Security</h2>
                                <p>We implement state-of-the-art encryption and continuous monitoring to ensure your data is safe against unauthorized access or breaches. We do not sell your data to third parties.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}

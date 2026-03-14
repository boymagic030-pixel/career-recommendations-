'use client';

import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import { AlignLeft } from 'lucide-react';

export default function PlagiarismPolicyPage() {
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
                        <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <AlignLeft size={28} color="#ef4444" />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text-primary)' }}>Plagiarism Policy</h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>Last updated: March 2026</p>

                        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Our Stance on Academic Integrity</h2>
                                <p>CareerAI believes deeply in original work, ethical learning, and honesty in professional representation. This policy applies to all materials created, generated, or submitted through our platform.</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Resume Builder Guidelines</h2>
                                <p>Our AI-powered resume builder generates optimized wording, but it is the user's explicit responsibility to ensure that all generated experiences, skill tags, and outcomes represent genuine accomplishments and abilities. Presenting false credentials or copying descriptions of projects you did not contribute to constitutes misrepresentation.</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>For Educators & Counselors</h2>
                                <p>Users distributing, reusing, or republishing CareerAI course contents, learning pathways, and test materials without proper attribution or permission violates our Terms of Service.</p>
                            </section>

                            <section>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Reporting Violations</h2>
                                <p>We take active measures to monitor unauthorized scraping or redistributing of our AI datasets. If you believe your copyright or original work has been plagiarized inside our platform by another user or in a shared artifact, please contact our legal team at contact@careerai.edu.</p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}

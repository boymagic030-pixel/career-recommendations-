'use client';

import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import styles from '../privacy/page.module.css'; // Reusing privacy CSS

export default function TermsOfServicePage() {
    return (
        <div className={styles.main}>
            <Navbar />
            
            <div className={styles.container}>
                <motion.div 
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className={styles.badge}>
                        <FileText size={14} /> Agreements
                    </span>
                    <h1 className={styles.title}>
                        Terms of <span className={styles.gradientText}>Service</span>
                    </h1>
                    <p className={styles.lastUpdated}>Last Updated: January 2026</p>
                </motion.div>

                <motion.div 
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2>1. Agreement to Terms</h2>
                    <p>By accessing or using CareerAI, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. These terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and CareerAI.</p>

                    <h2>2. Intellectual Property Rights</h2>
                    <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us, and are protected by copyright laws.</p>

                    <h2>3. User Representations</h2>
                    <p>By using the Site, you represent and warrant that:</p>
                    <ul>
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information.</li>
                        <li>You are essentially of legal age to form a binding contract and are not a minor.</li>
                        <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                    </ul>

                    <h2>4. Submissions and AI Output</h2>
                    <p>When you use the AI chat counselor or the resume builder, you retain the rights to the data you provide. However, you acknowledge that AI generates responses that may not always be 100% accurate or perfectly tailored. Reliance on advice provided by the AI is strictly at your own risk. The outputs should be used as general career guidance, not definitive directives.</p>

                    <h2>5. Site Management</h2>
                    <p>We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions or any portion thereof.</p>

                    <h2>6. Modifications and Interruptions</h2>
                    <p>We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors.</p>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    );
}

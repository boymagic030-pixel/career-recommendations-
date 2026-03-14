'use client';

import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import styles from '../privacy/page.module.css'; // Reusing privacy CSS

export default function CookiePolicyPage() {
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
                        <FileText size={14} /> Compliance
                    </span>
                    <h1 className={styles.title}>
                        Cookie <span className={styles.gradientText}>Policy</span>
                    </h1>
                    <p className={styles.lastUpdated}>Last Updated: January 2026</p>
                </motion.div>

                <motion.div 
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2>1. What Are Cookies</h2>
                    <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>

                    <h2>2. How We Use Cookies</h2>
                    <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
                    
                    <h2>3. The Cookies We Set</h2>
                    <ul>
                        <li><strong>Account related cookies:</strong> If you create an account with us, we will use cookies for the management of the signup process and general administration.</li>
                        <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.</li>
                        <li><strong>Forms related cookies:</strong> When you submit data through a form such as those found on assessment pages or comment forms, cookies may be set to remember your user details for future correspondence.</li>
                        <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience (like saving your Dark/Light theme option), we use cookies to recall your preferences.</li>
                    </ul>

                    <h2>4. Third Party Cookies</h2>
                    <p>In some special cases, we also use cookies provided by trusted third parties. For example, our site might use analytics to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.</p>

                    <h2>5. Disabling Cookies</h2>
                    <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Therefore, it is strongly recommended that you do not disable cookies across CareerAI's platforms.</p>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    );
}

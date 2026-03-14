'use client';

import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

export default function PrivacyPolicyPage() {
    return (
        <div className={styles.main}>
            <Navbar />
            
            <div className={styles.container}>
                <motion.div 
                    className={styles.header}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <span className={styles.badge}>
                        <Shield size={14} /> Legal Data
                    </span>
                    <h1 className={styles.title}>
                        Privacy <span className={styles.gradientText}>Policy</span>
                    </h1>
                    <p className={styles.lastUpdated}>Last Updated: January 2026</p>
                </motion.div>

                <motion.div 
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2>1. Information We Collect</h2>
                    <p>At CareerAI, accessible from our domains and mobile applications, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CareerAI and how we use it. We collect information you provide directly to us when you create an account, complete our career assessments, or interact with our AI counselor.</p>
                    <ul>
                        <li><strong>Personal Identification Info:</strong> Name, email address, phone number</li>
                        <li><strong>Academic & Career Data:</strong> Education level, target fields, test scores</li>
                        <li><strong>Usage Data:</strong> How you interact with our website, pages visited, diagnostic data</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect in various ways, including to:</p>
                    <ul>
                        <li>Compute matched career pathways and provide specialized learning plans.</li>
                        <li>Provide, operate, and maintain our website.</li>
                        <li>Improve, personalize, and expand our platform.</li>
                        <li>Develop new features using aggregate ML assessment data.</li>
                        <li>Communicate with you for customer service or updates regarding your account.</li>
                    </ul>

                    <h2>3. Data Handling & Security</h2>
                    <p>CareerAI follows a standard procedure in safeguarding your data. We use modern encryption methods, access controls, and serverless infrastructures to prevent unauthorized access. However, no method of transmission over the internet, or method of electronic storage is 100% secure.</p>

                    <h2>4. Cookies and Web Beacons</h2>
                    <p>Like any other website, CareerAI uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other tracking technologies. For more, refer to our <a href="/cookies">Cookies Policy</a>.</p>

                    <h2>5. Your Privacy Rights</h2>
                    <p>Depending on your location, you may have rights under data privacy laws (like the GDPR or CCPA). These include the right to access, delete, or modify your personal data. If you have any inquiries, or you wish to claim your rights, you can reach out to our DPO.</p>

                    <h2>6. Contact Us</h2>
                    <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to <a href="/contact">contact us</a>. Our team built this project at St. Joseph College of Engineering, and we care about ethical computing.</p>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    );
}

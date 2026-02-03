'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    MapPin,
    Phone,
    ArrowUpRight
} from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = {
    product: [
        { label: 'Career Assessment', href: '/assessment' },
        { label: 'Explore Careers', href: '/careers' },
        { label: 'AI Counselor', href: '/chat' },
        { label: 'Skill Analysis', href: '/skills' },
        { label: 'Learning Paths', href: '/learning' },
    ],
    resources: [
        { label: 'Career Guides', href: '/resources' },
        { label: 'Industry Reports', href: '/resources/reports' },
        { label: 'Video Tutorials', href: '/resources/videos' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: '/faq' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about#team' },
        { label: 'Careers', href: '/careers-at-careerai' },
        { label: 'Contact', href: '/contact' },
        { label: 'Press Kit', href: '/press' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Data Protection', href: '/data-protection' },
    ],
};

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section */}
                <div className={styles.topSection}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <div className={styles.logoIcon}>
                                <Sparkles size={20} />
                            </div>
                            <span className={styles.logoText}>CareerAI</span>
                        </Link>
                        <p className={styles.brandDescription}>
                            Empowering students and professionals to make informed career decisions
                            through AI-powered guidance and personalized recommendations.
                        </p>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <Mail size={16} />
                                <span>contact@careerai.edu</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone size={16} />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className={styles.contactItem}>
                                <MapPin size={16} />
                                <span>St. Joseph College of Engineering, Chennai</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.linksGrid}>
                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Product</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.product.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Resources</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.resources.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Company</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>Legal</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className={styles.newsletter}>
                    <div className={styles.newsletterContent}>
                        <h3 className={styles.newsletterTitle}>Stay Updated</h3>
                        <p className={styles.newsletterText}>
                            Get the latest career insights, new features, and tips delivered to your inbox.
                        </p>
                    </div>
                    <form className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.newsletterInput}
                        />
                        <motion.button
                            type="submit"
                            className={styles.newsletterBtn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Subscribe
                            <ArrowUpRight size={16} />
                        </motion.button>
                    </form>
                </div>

                {/* Bottom Section */}
                <div className={styles.bottomSection}>
                    <div className={styles.copyright}>
                        <p>© {currentYear} CareerAI. All rights reserved.</p>
                        <p className={styles.attribution}>
                            Built with ❤️ by Group 12 - Department of AI & Data Science,
                            St. Joseph College of Engineering
                        </p>
                    </div>

                    <div className={styles.socialLinks}>
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                whileHover={{ y: -3, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={social.label}
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

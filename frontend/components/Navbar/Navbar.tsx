'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Menu,
    X,
    Home,
    Compass,
    MessageCircle,
    BookOpen,
    Info,
    Phone,
    User,
    LogIn
} from 'lucide-react';
import { ThemeToggle } from '@/components';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/careers', label: 'Explore Careers', icon: Compass },
    { href: '/assessment', label: 'Assessment', icon: Sparkles },
    { href: '/chat', label: 'AI Counselor', icon: MessageCircle },
    { href: '/resources', label: 'Resources', icon: BookOpen },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.navInner}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <motion.div
                            className={styles.logoIcon}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Sparkles size={20} />
                        </motion.div>
                        <span className={styles.logoText}>CareerAI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={styles.navLinks}>
                        {navLinks.slice(0, 5).map((link) => (
                            <Link key={link.href} href={link.href} className={styles.navLink}>
                                <motion.span
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {link.label}
                                </motion.span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className={styles.navActions}>
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        <Link href="/login" className={styles.loginBtn}>
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                        <Link href="/assessment">
                            <motion.button
                                className={styles.ctaBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Sparkles size={16} />
                                Start Free Assessment
                            </motion.button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className={styles.mobileToggle}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.mobileMenuInner}>
                            {/* Theme Toggle in Mobile Menu */}
                            <div className={styles.mobileThemeRow}>
                                <span>Theme</span>
                                <ThemeToggle />
                            </div>

                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={styles.mobileLink}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <link.icon size={20} />
                                        <span>{link.label}</span>
                                    </Link>
                                </motion.div>
                            ))}

                            <div className={styles.mobileCta}>
                                <Link href="/login" className={styles.mobileLoginBtn}>
                                    <User size={18} />
                                    Login / Sign Up
                                </Link>
                                <Link href="/assessment" className={styles.mobileCtaBtn}>
                                    <Sparkles size={18} />
                                    Start Free Assessment
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

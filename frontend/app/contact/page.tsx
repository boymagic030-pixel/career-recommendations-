'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
    Clock,
    CheckCircle2,
    ArrowRight,
    Github,
    Twitter,
    Linkedin,
    Instagram,
    HelpCircle,
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        value: 'contact@careerai.edu',
        description: 'Send us an email anytime!',
        action: 'mailto:contact@careerai.edu',
    },
    {
        icon: Phone,
        title: 'Call Us',
        value: '+91 98765 43210',
        description: 'Mon-Fri from 9am to 5pm',
        action: 'tel:+919876543210',
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        value: 'St. Joseph College of Engineering',
        description: 'Chennai, Tamil Nadu, India',
        action: '#',
    },
    {
        icon: Clock,
        title: 'Working Hours',
        value: '9:00 AM - 5:00 PM',
        description: 'Monday to Friday (IST)',
        action: null,
    },
];

const faqs = [
    {
        question: 'How do I get started with CareerAI?',
        answer: 'Simply click on "Start Free Assessment" and create your account. The assessment takes about 15-20 minutes and you\'ll receive your personalized career recommendations immediately.',
    },
    {
        question: 'Is CareerAI really free for students?',
        answer: 'Yes! CareerAI is completely free for students. We believe that career guidance should be accessible to everyone regardless of their financial situation.',
    },
    {
        question: 'How accurate are the career recommendations?',
        answer: 'Our AI model has achieved a 95% accuracy rate based on user feedback. We continuously improve our algorithms based on real outcomes and user satisfaction.',
    },
    {
        question: 'Can I retake the assessment?',
        answer: 'Absolutely! You can retake the assessment anytime as your interests and skills evolve. We encourage periodic retakes to track your growth.',
    },
    {
        question: 'Is my data safe and private?',
        answer: 'Your privacy is our priority. All data is encrypted and we never share your personal information with third parties without your explicit consent.',
    },
    {
        question: 'How can I contact support?',
        answer: 'You can reach us via email, phone, or by filling out the contact form on this page. We typically respond within 24 hours on business days.',
    },
];

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <>
            <Navbar />

            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />

                    <div className={styles.container}>
                        <motion.div
                            className={styles.heroContent}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className={styles.badge}>
                                <MessageCircle size={14} />
                                Contact Us
                            </span>
                            <h1 className={styles.heroTitle}>
                                Get in Touch
                                <br />
                                <span className={styles.gradientText}>We&apos;re Here to Help</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Have questions about CareerAI? Want to provide feedback or need support?
                                We&apos;d love to hear from you. Reach out and we&apos;ll respond as soon as possible.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className={styles.infoSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.infoGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.title}
                                    href={info.action || undefined}
                                    className={styles.infoCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className={styles.infoIcon}>
                                        <info.icon size={22} />
                                    </div>
                                    <h3 className={styles.infoTitle}>{info.title}</h3>
                                    <p className={styles.infoValue}>{info.value}</p>
                                    <p className={styles.infoDescription}>{info.description}</p>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Contact Form & Map Section */}
                <section className={styles.formSection}>
                    <div className={styles.container}>
                        <div className={styles.formGrid}>
                            {/* Contact Form */}
                            <motion.div
                                className={styles.formWrapper}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                            >
                                <div className={styles.formHeader}>
                                    <h2 className={styles.formTitle}>Send Us a Message</h2>
                                    <p className={styles.formSubtitle}>
                                        Fill out the form below and we&apos;ll get back to you within 24 hours.
                                    </p>
                                </div>

                                {isSubmitted ? (
                                    <motion.div
                                        className={styles.successMessage}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className={styles.successIcon}>
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h3>Message Sent Successfully!</h3>
                                        <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                                        <button
                                            className={styles.resetBtn}
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="name" className={styles.label}>Full Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    required
                                                    className={styles.input}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="email" className={styles.label}>Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    required
                                                    className={styles.input}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="subject" className={styles.label}>Subject</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className={styles.select}
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="support">Technical Support</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="careers">Careers at CareerAI</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="message" className={styles.label}>Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us how we can help you..."
                                                required
                                                rows={5}
                                                className={styles.textarea}
                                            />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            className={styles.submitBtn}
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className={styles.spinner} />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Message
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </motion.div>

                            {/* Social & Additional Info */}
                            <motion.div
                                className={styles.sideContent}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={fadeInUp}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {/* Quick Connect */}
                                <div className={styles.sideCard}>
                                    <h3 className={styles.sideCardTitle}>Connect With Us</h3>
                                    <p className={styles.sideCardText}>
                                        Follow us on social media for updates, career tips, and more.
                                    </p>
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
                                                <social.icon size={20} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className={styles.sideCard}>
                                    <h3 className={styles.sideCardTitle}>Quick Links</h3>
                                    <ul className={styles.quickLinks}>
                                        <li>
                                            <Link href="/assessment">
                                                <ArrowRight size={16} />
                                                Start Assessment
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/careers">
                                                <ArrowRight size={16} />
                                                Explore Careers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/about">
                                                <ArrowRight size={16} />
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/faq">
                                                <ArrowRight size={16} />
                                                FAQ
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Response Time */}
                                <div className={styles.responseCard}>
                                    <Clock size={20} />
                                    <div>
                                        <h4>Average Response Time</h4>
                                        <p>Within 24 hours on business days</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className={styles.faqSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.badge}>
                                <HelpCircle size={14} />
                                FAQ
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Frequently Asked
                                <br />
                                <span className={styles.gradientText}>Questions</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.faqGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.faqCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.6, delay: index * 0.08 }}
                                >
                                    <h3 className={styles.faqQuestion}>{faq.question}</h3>
                                    <p className={styles.faqAnswer}>{faq.answer}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.ctaCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={styles.ctaOrb1} />
                            <div className={styles.ctaOrb2} />

                            <div className={styles.ctaContent}>
                                <h2 className={styles.ctaTitle}>
                                    Ready to Start Your
                                    <br />
                                    <span className={styles.gradientText}>Career Journey?</span>
                                </h2>
                                <p className={styles.ctaSubtitle}>
                                    Don&apos;t wait! Take our free assessment and discover careers
                                    that match your unique profile.
                                </p>
                                <Link href="/assessment">
                                    <motion.button
                                        className={styles.ctaButton}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Sparkles size={18} />
                                        Start Free Assessment
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

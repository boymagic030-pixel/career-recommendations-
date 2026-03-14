'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Play, ExternalLink, Download, Star, Eye, Clock,
    Search, Filter, X, ChevronRight, ArrowRight, Sparkles,
    Video, Newspaper, FolderDown, Link2, Book, Share2,
    GraduationCap, Code2, BarChart3, Palette, Briefcase,
    Globe, ShieldCheck, Cpu, TrendingUp, Youtube, FileText,
    BookMarked, CheckCircle2, Users, Zap, RotateCcw,
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface Resource {
    id: string;
    type: 'video' | 'article' | 'ebook' | 'download' | 'link';
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    thumbnailBg: string;
    badgeColor: string;
    duration: string;
    views: string;
    rating: string;
    tags: string[];
    url?: string;
    videoUrl?: string;
    featured?: boolean;
}

interface LearningPath {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    steps: string[];
    duration: string;
    level: string;
    resourceCount: number;
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const RESOURCES: Resource[] = [
    /* ── Videos ── */
    {
        id: 'v1', type: 'video', title: 'How to Choose the Right Career Path',
        description: 'A comprehensive guide to understanding your strengths and aligning them with career opportunities in 2026.',
        category: 'Career Planning', thumbnail: '🎬', thumbnailBg: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        badgeColor: '#ef4444', duration: '15 min', views: '12.5K', rating: '4.9',
        tags: ['career', 'planning', 'beginner'],
        videoUrl: 'https://www.youtube.com/embed/nuHkHqp_G0Q', featured: true,
    },
    {
        id: 'v2', type: 'video', title: 'Data Science Career Roadmap 2026',
        description: 'Step-by-step guide to becoming a data scientist from scratch — tools, skills, and certifications.',
        category: 'Technology', thumbnail: '🤖', thumbnailBg: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
        badgeColor: '#ef4444', duration: '22 min', views: '18.7K', rating: '4.9',
        tags: ['data science', 'ml', 'ai', 'coding'],
        videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30', featured: true,
    },
    {
        id: 'v3', type: 'video', title: 'Soft Skills That Make You Stand Out',
        description: 'Learn the interpersonal and communication skills that employers value most in today\'s workplace.',
        category: 'Soft Skills', thumbnail: '🗣️', thumbnailBg: 'linear-gradient(135deg,#ec4899,#f97316)',
        badgeColor: '#ef4444', duration: '18 min', views: '9.8K', rating: '4.6',
        tags: ['soft skills', 'communication', 'career'],
        videoUrl: 'https://www.youtube.com/embed/qp0HIF3SfI4',
    },
    {
        id: 'v4', type: 'video', title: 'Top Career Options in Science (PCB/PCM) 2026',
        description: 'Explore the best emerging and traditional career paths for science students beyond Medicine and Engineering.',
        category: 'Science Stream', thumbnail: '🔬', thumbnailBg: 'linear-gradient(135deg,#0ea5e9,#2563eb)',
        badgeColor: '#ef4444', duration: '14 min', views: '45.2K', rating: '4.8',
        tags: ['science', 'pcb', 'pcm', 'neet', 'jee'],
        videoUrl: 'https://www.youtube.com/embed/6OLPL5p0fMg',
    },
    {
        id: 'v5', type: 'video', title: 'Highest Paying Commerce Careers',
        description: 'A deep dive into CA, CS, CFA, Actuarial Science, and the most lucrative commerce careers in India.',
        category: 'Commerce Stream', thumbnail: '📈', thumbnailBg: 'linear-gradient(135deg,#10b981,#059669)',
        badgeColor: '#ef4444', duration: '16 min', views: '38.5K', rating: '4.9',
        tags: ['commerce', 'ca', 'cfa', 'finance'], featured: true,
        videoUrl: 'https://www.youtube.com/embed/yD8UMYi32K0',
    },
    {
        id: 'v6', type: 'video', title: 'Why Arts & Humanities is the Future',
        description: 'Discover dynamic careers in Arts and Humanities: Design, Psychology, Law, Mass Communication, and more.',
        category: 'Arts & Humanities', thumbnail: '🎨', thumbnailBg: 'linear-gradient(135deg,#f59e0b,#d97706)',
        badgeColor: '#ef4444', duration: '12 min', views: '29.1K', rating: '4.7',
        tags: ['arts', 'humanities', 'design', 'psychology'],
        videoUrl: 'https://www.youtube.com/embed/iG9CE55wbtY',
    },
    {
        id: 'v7', type: 'video', title: 'How to Crack FAANG Coding Interviews',
        description: 'Insider tips from ex-Googlers on DSA preparation, system design, and behavioral interview strategies.',
        category: 'Interview Prep', thumbnail: '💻', thumbnailBg: 'linear-gradient(135deg,#6366f1,#06b6d4)',
        badgeColor: '#ef4444', duration: '28 min', views: '72.3K', rating: '4.9',
        tags: ['coding', 'interview', 'faang', 'dsa'],
        videoUrl: 'https://www.youtube.com/embed/GySzJXbJrXY', featured: true,
    },
    {
        id: 'v8', type: 'video', title: 'MS in USA vs Germany - Complete Guide',
        description: 'A thorough comparison of pursuing a Master\'s degree in the USA vs Germany — costs, ROI, and quality of life.',
        category: 'Higher Studies', thumbnail: '🌍', thumbnailBg: 'linear-gradient(135deg,#a855f7,#6366f1)',
        badgeColor: '#ef4444', duration: '20 min', views: '33.8K', rating: '4.8',
        tags: ['ms', 'usa', 'germany', 'higher studies', 'abroad'],
        videoUrl: 'https://www.youtube.com/embed/iNJdPyoqt8U',
    },
    {
        id: 'v9', type: 'video', title: 'Complete Engineering Career Guide 2026',
        description: 'Explore all branches of engineering — CSE, ECE, Mechanical, Civil — and pick the best fit for your skills and goals.',
        category: 'Engineering', thumbnail: '⚙️', thumbnailBg: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
        badgeColor: '#ef4444', duration: '25 min', views: '61.4K', rating: '4.8',
        tags: ['engineering', 'cse', 'ece', 'mechanical', 'career'],
        videoUrl: 'https://www.youtube.com/embed/I4Z1OXry-dI',
    },
    {
        id: 'v10', type: 'video', title: 'How to Crack CAT & Get into IIMs',
        description: 'A complete MBA preparation strategy — from CAT syllabus and books to GD/PI tips from IIM alumni.',
        category: 'MBA & Business', thumbnail: '🎓', thumbnailBg: 'linear-gradient(135deg,#f97316,#ef4444)',
        badgeColor: '#ef4444', duration: '30 min', views: '89.2K', rating: '4.9',
        tags: ['mba', 'cat', 'iim', 'management', 'exam'], featured: true,
        videoUrl: 'https://www.youtube.com/embed/rE3j_RHkqJc',
    },
    {
        id: 'v11', type: 'video', title: 'UPSC Civil Services Strategy for Beginners',
        description: 'A step-by-step roadmap for cracking UPSC CSE — syllabus breakdown, optional subject selection, and daily study plan.',
        category: 'Government Jobs', thumbnail: '🏛️', thumbnailBg: 'linear-gradient(135deg,#22c55e,#0ea5e9)',
        badgeColor: '#ef4444', duration: '35 min', views: '1.2M', rating: '4.9',
        tags: ['upsc', 'ias', 'civil services', 'government', 'exam'], featured: true,
        videoUrl: 'https://www.youtube.com/embed/F_IlCBNqTOU',
    },
    {
        id: 'v12', type: 'video', title: 'Digital Marketing Career — Full Roadmap',
        description: 'Learn SEO, Google Ads, social media marketing, analytics, and content strategy to launch your digital marketing career.',
        category: 'Digital Marketing', thumbnail: '📱', thumbnailBg: 'linear-gradient(135deg,#ec4899,#f97316)',
        badgeColor: '#ef4444', duration: '20 min', views: '41.5K', rating: '4.7',
        tags: ['digital marketing', 'seo', 'social media', 'ads'],
        videoUrl: 'https://www.youtube.com/embed/bixR-KIJKYM',
    },
    {
        id: 'v13', type: 'video', title: 'UI/UX Design Career — Getting Started in 2026',
        description: 'Your complete guide to becoming a UI/UX designer — tools (Figma), portfolio tips, and how to land your first design job.',
        category: 'Design', thumbnail: '🎨', thumbnailBg: 'linear-gradient(135deg,#06b6d4,#a855f7)',
        badgeColor: '#ef4444', duration: '18 min', views: '52.7K', rating: '4.8',
        tags: ['ux', 'ui', 'figma', 'design', 'product design'],
        videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    },
    {
        id: 'v14', type: 'video', title: 'AWS Cloud Fundamentals & Career Path',
        description: 'Understand cloud computing, AWS core services, and the certifications you need to build a high-paying cloud career.',
        category: 'Cloud & DevOps', thumbnail: '☁️', thumbnailBg: 'linear-gradient(135deg,#f59e0b,#ef4444)',
        badgeColor: '#ef4444', duration: '22 min', views: '47.3K', rating: '4.8',
        tags: ['aws', 'cloud', 'devops', 'certification', 'tech'],
        videoUrl: 'https://www.youtube.com/embed/a9__D53WsMs',
    },
    {
        id: 'v15', type: 'video', title: 'How to Start a Startup — From Idea to Launch',
        description: 'Practical advice from successful founders on validating your idea, building an MVP, and getting your first customers.',
        category: 'Entrepreneurship', thumbnail: '🚀', thumbnailBg: 'linear-gradient(135deg,#10b981,#f97316)',
        badgeColor: '#ef4444', duration: '27 min', views: '78.4K', rating: '4.9',
        tags: ['startup', 'entrepreneurship', 'business', 'founder', 'mvp'], featured: true,
        videoUrl: 'https://www.youtube.com/embed/ZoqgAy3h4OM',
    },
    {
        id: 'v16', type: 'video', title: 'Psychology & Behavioral Science Careers',
        description: 'Discover careers in clinical, organizational, educational, and sports psychology — skills, paths, and earning potential.',
        category: 'Psychology', thumbnail: '🧠', thumbnailBg: 'linear-gradient(135deg,#d946ef,#6366f1)',
        badgeColor: '#ef4444', duration: '16 min', views: '26.1K', rating: '4.7',
        tags: ['psychology', 'mental health', 'behavioral science', 'counseling'],
        videoUrl: 'https://www.youtube.com/embed/vo4pMVb0R6M',
    },
    {
        id: 'v17', type: 'video', title: 'Finance Career Guide: Investment Banking to FinTech',
        description: 'Navigate the finance world — from investment banking and wealth management to the booming FinTech startup ecosystem.',
        category: 'Finance', thumbnail: '💰', thumbnailBg: 'linear-gradient(135deg,#22c55e,#06b6d4)',
        badgeColor: '#ef4444', duration: '24 min', views: '55.9K', rating: '4.9',
        tags: ['finance', 'investment banking', 'fintech', 'cfa', 'banking'], featured: true,
        videoUrl: 'https://www.youtube.com/embed/3eSc_3GsKSA',
    },
    /* ── Articles ── */
    {
        id: 'a1', type: 'article', title: 'Top 10 Highest Paying Careers in India 2026',
        description: 'Discover the most lucrative career paths in India with salary insights, growth potential, and required qualifications.',
        category: 'Salary Insights', thumbnail: '📊', thumbnailBg: 'linear-gradient(135deg,#22c55e,#06b6d4)',
        badgeColor: '#3b82f6', duration: '8 min read', views: '25.3K', rating: '4.8',
        tags: ['salary', 'india', 'career'], featured: true,
        url: 'https://www.ambitionbox.com/salaries',
    },
    {
        id: 'a2', type: 'article', title: 'How to Ace Your Technical Interview',
        description: 'Expert tips and strategies for cracking coding interviews at top tech companies like Google, Amazon, and Microsoft.',
        category: 'Interview Prep', thumbnail: '💡', thumbnailBg: 'linear-gradient(135deg,#06b6d4,#6366f1)',
        badgeColor: '#3b82f6', duration: '12 min read', views: '31.4K', rating: '4.9',
        tags: ['interview', 'tech', 'coding', 'faang'],
        url: 'https://www.freecodecamp.org/news/coding-interviews-for-dummies-5e048933b82b/',
    },
    {
        id: 'a3', type: 'article', title: 'How to Build a Strong Engineering Portfolio',
        description: 'Step-by-step guide on creating projects that genuinely stand out to tech recruiters and hiring managers.',
        category: 'Career Advice', thumbnail: '📝', thumbnailBg: 'linear-gradient(135deg,#f43f5e,#fb923c)',
        badgeColor: '#3b82f6', duration: '10 min read', views: '45.2K', rating: '4.8',
        tags: ['portfolio', 'engineering', 'projects', 'github'],
        url: 'https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio/',
    },
    {
        id: 'a4', type: 'article', title: 'Mastering the STAR Method for Behavioral Interviews',
        description: 'A complete guide to answering behavioral questions effectively using the Situation-Task-Action-Result framework.',
        category: 'Interview Prep', thumbnail: '🌟', thumbnailBg: 'linear-gradient(135deg,#8b5cf6,#d946ef)',
        badgeColor: '#3b82f6', duration: '15 min read', views: '88.5K', rating: '4.9',
        tags: ['interview', 'star', 'behavioral', 'hr'],
        url: 'https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique',
    },
    {
        id: 'a5', type: 'article', title: 'The Ultimate Guide to Tech Internships 2026',
        description: 'Everything you need to know about preparing for, applying to, and landing tech internships at top companies.',
        category: 'Career Planning', thumbnail: '💼', thumbnailBg: 'linear-gradient(135deg,#2dd4bf,#3b82f6)',
        badgeColor: '#3b82f6', duration: '20 min read', views: '112.4K', rating: '4.9',
        tags: ['internship', 'tech', 'career', 'planning'], featured: true,
        url: 'https://simplify.jobs/blog/',
    },
    {
        id: 'a6', type: 'article', title: 'Freelancing in 2026: Skills, Platforms & Income',
        description: 'A complete breakdown of the best freelancing skills, platforms, and strategies to earn while you learn.',
        category: 'Freelancing', thumbnail: '🚀', thumbnailBg: 'linear-gradient(135deg,#eab308,#ef4444)',
        badgeColor: '#3b82f6', duration: '14 min read', views: '58.7K', rating: '4.7',
        tags: ['freelance', 'income', 'upwork', 'fiverr'],
        url: 'https://www.upwork.com/resources/beginners-guide-to-freelancing',
    },
    /* ── eBooks ── */
    {
        id: 'e1', type: 'ebook', title: 'Python for Everybody (PY4E)',
        description: 'A complete introduction to programming in Python, designed for absolute beginners. Free PDF from Dr. Chuck.',
        category: 'Programming', thumbnail: '🐍', thumbnailBg: 'linear-gradient(135deg,#0ea5e9,#2563eb)',
        badgeColor: '#8b5cf6', duration: '250 Pages', views: '185.3K', rating: '4.9',
        tags: ['python', 'programming', 'beginner', 'free'], featured: true,
        url: 'https://www.py4e.com/book.pdf',
    },
    {
        id: 'e2', type: 'ebook', title: 'System Design Interview – Insider Guide',
        description: 'Step-by-step framework to confidently approach any system design question at top tech companies.',
        category: 'Interview Prep', thumbnail: '🏗️', thumbnailBg: 'linear-gradient(135deg,#f59e0b,#ef4444)',
        badgeColor: '#8b5cf6', duration: '210 Pages', views: '112.8K', rating: '4.8',
        tags: ['system design', 'interview', 'architecture'],
        url: 'https://github.com/donnemartin/system-design-primer',
    },
    {
        id: 'e3', type: 'ebook', title: 'Deep Learning (Goodfellow et al.)',
        description: 'The definitive textbook on Deep Learning, covering mathematical and conceptual background comprehensively.',
        category: 'AI & Machine Learning', thumbnail: '🧠', thumbnailBg: 'linear-gradient(135deg,#10b981,#3b82f6)',
        badgeColor: '#8b5cf6', duration: '800 Pages', views: '350.2K', rating: '4.9',
        tags: ['deep learning', 'ai', 'neural networks', 'math'],
        url: 'https://www.deeplearningbook.org/',
    },
    {
        id: 'e4', type: 'ebook', title: 'Eloquent JavaScript – 4th Edition',
        description: 'A modern introduction to JavaScript, diving deep into the language, browser, Node.js and everything in between.',
        category: 'Web Development', thumbnail: '🟨', thumbnailBg: 'linear-gradient(135deg,#eab308,#f97316)',
        badgeColor: '#8b5cf6', duration: '400 Pages', views: '290.1K', rating: '4.9',
        tags: ['javascript', 'web', 'frontend', 'programming'],
        url: 'https://eloquentjavascript.net/Eloquent_JavaScript.pdf',
    },
    {
        id: 'e5', type: 'ebook', title: 'Mathematics for Machine Learning',
        description: 'The fundamental mathematical tools (Linear Algebra, Calculus, Stats) needed to truly understand ML algorithms.',
        category: 'Mathematics', thumbnail: '📐', thumbnailBg: 'linear-gradient(135deg,#ec4899,#f43f5e)',
        badgeColor: '#8b5cf6', duration: '400 Pages', views: '95.5K', rating: '4.9',
        tags: ['math', 'ml', 'linear algebra', 'statistics'],
        url: 'https://mml-book.github.io/book/mml-book.pdf',
    },
    {
        id: 'e6', type: 'ebook', title: 'Operating Systems: Three Easy Pieces',
        description: 'A comprehensive OS guide covering virtualization, concurrency, and persistence. Used at top universities worldwide.',
        category: 'Core CS', thumbnail: '⚙️', thumbnailBg: 'linear-gradient(135deg,#6366f1,#a855f7)',
        badgeColor: '#8b5cf6', duration: '700 Pages', views: '222.4K', rating: '4.8',
        tags: ['os', 'core cs', 'systems', 'computer science'],
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    },
    /* ── Downloads ── */
    {
        id: 'd1', type: 'download', title: 'ATS-Optimized Resume Template Pack',
        description: 'Premium ATS-friendly resume templates for freshers and experienced professionals. 5 professionally designed layouts.',
        category: 'Templates', thumbnail: '📄', thumbnailBg: 'linear-gradient(135deg,#f97316,#f59e0b)',
        badgeColor: '#22c55e', duration: 'PDF + DOCX', views: '8.2K', rating: '4.7',
        tags: ['resume', 'template', 'ats', 'job'],
        url: '#',
    },
    {
        id: 'd2', type: 'download', title: 'Career Planning Workbook',
        description: 'A 30-page interactive workbook to map your career goals, identify skill gaps, and create an actionable plan.',
        category: 'Worksheets', thumbnail: '📘', thumbnailBg: 'linear-gradient(135deg,#6366f1,#06b6d4)',
        badgeColor: '#22c55e', duration: 'PDF', views: '5.6K', rating: '4.8',
        tags: ['career', 'planning', 'goals', 'worksheet'],
        url: '#',
    },
    {
        id: 'd3', type: 'download', title: 'DSA Cheatsheet – 150 Patterns',
        description: 'The ultimate data structures & algorithms quick-reference sheet. Master all patterns for coding interviews.',
        category: 'Interview Prep', thumbnail: '🗂️', thumbnailBg: 'linear-gradient(135deg,#ef4444,#f97316)',
        badgeColor: '#22c55e', duration: 'PDF', views: '45.1K', rating: '4.9',
        tags: ['dsa', 'coding', 'algorithms', 'cheatsheet'], featured: true,
        url: '#',
    },
    {
        id: 'd4', type: 'download', title: 'Entrance Exam Calendar 2026',
        description: 'Complete schedule of JEE, NEET, CAT, GATE, CLAT, CUET, and all major entrance exams for 2026.',
        category: 'Exam Schedule', thumbnail: '📅', thumbnailBg: 'linear-gradient(135deg,#06b6d4,#10b981)',
        badgeColor: '#22c55e', duration: 'PDF', views: '22.8K', rating: '4.8',
        tags: ['exam', 'jee', 'neet', 'cat', 'gate', 'schedule'],
        url: '#',
    },
    /* ── Links ── */
    {
        id: 'l1', type: 'link', title: 'LeetCode – Master Coding Problems',
        description: 'The best platform for practicing DSA problems and preparing for coding interviews at top tech companies.',
        category: 'Practice Platform', thumbnail: '💻', thumbnailBg: 'linear-gradient(135deg,#eab308,#f97316)',
        badgeColor: '#8b5cf6', duration: 'Free + Premium', views: '50K+', rating: '4.8',
        tags: ['coding', 'dsa', 'interview', 'practice'],
        url: 'https://leetcode.com', featured: true,
    },
    {
        id: 'l2', type: 'link', title: 'Coursera – Free University Courses',
        description: 'Access thousands of free courses with financial aid from Stanford, MIT, Google, IBM, and 200+ universities.',
        category: 'Learning Platform', thumbnail: '🎓', thumbnailBg: 'linear-gradient(135deg,#22c55e,#6366f1)',
        badgeColor: '#8b5cf6', duration: 'Free with Aid', views: '100K+', rating: '4.9',
        tags: ['courses', 'free', 'certification', 'university'],
        url: 'https://www.coursera.org',
    },
    {
        id: 'l3', type: 'link', title: 'LinkedIn Learning – Professional Skills',
        description: 'Expert-led video courses from industry professionals. Business, tech, creative, and leadership skills.',
        category: 'Learning Platform', thumbnail: '💼', thumbnailBg: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
        badgeColor: '#8b5cf6', duration: '1 Month Free', views: '75K+', rating: '4.7',
        tags: ['linkedin', 'professional', 'courses', 'skills'],
        url: 'https://www.linkedin.com/learning/',
    },
    {
        id: 'l4', type: 'link', title: 'Internshala – Internship & Jobs Portal',
        description: "India's biggest internship platform. Find paid internships, fresher jobs, and skill-based trainings.",
        category: 'Job Portal', thumbnail: '🔍', thumbnailBg: 'linear-gradient(135deg,#10b981,#06b6d4)',
        badgeColor: '#8b5cf6', duration: 'Free', views: '200K+', rating: '4.8',
        tags: ['internship', 'jobs', 'india', 'freshers'], featured: true,
        url: 'https://internshala.com',
    },
];

const LEARNING_PATHS: LearningPath[] = [
    {
        id: 'lp1', title: 'Full-Stack Developer', icon: Code2,
        description: 'From HTML basics to deploying production apps with React, Node.js, and databases.',
        gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        steps: ['HTML, CSS, JavaScript Fundamentals', 'React & Next.js Frontend', 'Node.js & Express Backend', 'Databases (SQL + MongoDB)', 'Deployment & DevOps Basics'],
        duration: '8-12 months', level: 'Beginner → Advanced', resourceCount: 14,
    },
    {
        id: 'lp2', title: 'Data Science & AI', icon: BarChart3,
        description: 'Master Python, statistics, machine learning, and land a job in the highest-paying field.',
        gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)',
        steps: ['Python + NumPy + Pandas', 'Statistics & Probability', 'Machine Learning (Scikit-learn)', 'Deep Learning (TensorFlow/PyTorch)', 'ML Deployment & MLOps'],
        duration: '10-15 months', level: 'Beginner → Advanced', resourceCount: 18,
    },
    {
        id: 'lp3', title: 'Product Manager', icon: Briefcase,
        description: 'Learn product thinking, data analysis, and stakeholder management to lead product teams.',
        gradient: 'linear-gradient(135deg,#f97316,#eab308)',
        steps: ['Product Thinking & Design', 'Understanding Users (UX Research)', 'Data Analysis (SQL + Analytics)', 'Roadmapping & Prioritization', 'PM Interview Preparation'],
        duration: '6-9 months', level: 'Intermediate', resourceCount: 12,
    },
    {
        id: 'lp4', title: 'UX/UI Designer', icon: Palette,
        description: 'Design stunning, user-centred digital products and build a portfolio that gets you hired.',
        gradient: 'linear-gradient(135deg,#06b6d4,#10b981)',
        steps: ['Design Fundamentals & Theory', 'Figma & Prototyping', 'UX Research & User Testing', 'Design Systems & Handoff', 'Building Your Portfolio'],
        duration: '6-9 months', level: 'Beginner → Intermediate', resourceCount: 10,
    },
];

const TABS = [
    { id: 'all', label: 'All', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'article', label: 'Articles', icon: Newspaper },
    { id: 'ebook', label: 'eBooks', icon: Book },
    { id: 'download', label: 'Downloads', icon: FolderDown },
    { id: 'link', label: 'External Links', icon: Link2 },
];

const TYPE_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    video: { label: 'Video', icon: Play, color: '#ef4444' },
    article: { label: 'Article', icon: FileText, color: '#3b82f6' },
    ebook: { label: 'eBook', icon: BookMarked, color: '#8b5cf6' },
    download: { label: 'Download', icon: Download, color: '#22c55e' },
    link: { label: 'External Link', icon: ExternalLink, color: '#f97316' },
};

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function getYtThumb(embedUrl: string): string {
    const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    // hqdefault: real videos return 480×360, unavailable videos return 120×90 grey placeholder
    // This makes it detectable via img.naturalWidth <= 120 in onLoad
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
}

/* ─── Variants ───────────────────────────────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
    const [expandedPath, setExpandedPath] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    /* Filtered resources */
    const filtered = useMemo(() => {
        let list = RESOURCES;
        if (activeTab !== 'all') list = list.filter(r => r.type === activeTab);
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                r.category.toLowerCase().includes(q) ||
                r.tags.some(t => t.includes(q))
            );
        }
        return list;
    }, [activeTab, searchQuery]);

    const counts = useMemo(() => {
        const c: Record<string, number> = { all: RESOURCES.length };
        RESOURCES.forEach(r => { c[r.type] = (c[r.type] || 0) + 1; });
        return c;
    }, []);

    const handleResourceAction = (resource: Resource) => {
        if (resource.type === 'video' && resource.videoUrl) {
            setSelectedVideo({ url: resource.videoUrl, title: resource.title });
        } else if (resource.url && resource.url !== '#') {
            window.open(resource.url, '_blank', 'noopener');
        }
    };

    const handleCopy = async (url: string, id: string) => {
        try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const getActionLabel = (type: string) => {
        const map: Record<string, string> = {
            video: 'Watch Now', article: 'Read Article',
            ebook: 'Open eBook', download: 'Download', link: 'Visit Site',
        };
        return map[type] ?? 'View';
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>

                {/* ── Hero ───────────────────────────────────────────────────── */}
                <section className={styles.hero}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroOrb3} />
                    <div className={styles.container}>
                        <motion.div
                            className={styles.heroContent}
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75 }}
                        >
                            <span className={styles.heroBadge}>
                                <BookOpen size={14} /> Resource Library
                            </span>
                            <h1 className={styles.heroTitle}>
                                Everything You Need to{' '}
                                <span className={styles.gradientText}>Succeed</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Curated videos, articles, eBooks, templates, and tools — 100% free for students.
                                Explore {RESOURCES.length}+ handpicked resources.
                            </p>

                            {/* Search bar */}
                            <div className={styles.searchWrap}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    placeholder="Search resources, topics, skills..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button className={styles.searchClear} onClick={() => setSearchQuery('')}>
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Stats bar ──────────────────────────────────────────────── */}
                <section className={styles.statsBar}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.statsGrid}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {[
                                { icon: Video, label: 'Videos', value: counts.video ?? 0 },
                                { icon: Newspaper, label: 'Articles', value: counts.article ?? 0 },
                                { icon: Book, label: 'eBooks', value: counts.ebook ?? 0 },
                                { icon: FolderDown, label: 'Downloads', value: counts.download ?? 0 },
                                { icon: Link2, label: 'Useful Links', value: counts.link ?? 0 },
                            ].map((s, i) => (
                                <div key={i} className={styles.statItem}>
                                    <s.icon size={18} className={styles.statIcon} />
                                    <span className={styles.statValue}>{s.value}</span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Learning Paths ─────────────────────────────────────────── */}
                <section className={styles.pathsSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.sectionBadge}><Zap size={13} /> Learning Paths</span>
                            <h2 className={styles.sectionTitle}>Guided Career Roadmaps</h2>
                            <p className={styles.sectionSubtitle}>
                                Follow curated step-by-step paths designed by industry experts.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.pathsGrid}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true }} variants={stagger}
                        >
                            {LEARNING_PATHS.map(path => (
                                <motion.div key={path.id} variants={fadeUp} className={styles.pathCard}>
                                    <div className={styles.pathHeader} style={{ background: path.gradient }}>
                                        <path.icon size={28} />
                                        <div>
                                            <h3 className={styles.pathTitle}>{path.title}</h3>
                                            <div className={styles.pathMeta}>
                                                <span><Clock size={12} />{path.duration}</span>
                                                <span><TrendingUp size={12} />{path.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.pathBody}>
                                        <p className={styles.pathDesc}>{path.description}</p>
                                        <button
                                            className={styles.pathToggleBtn}
                                            onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                                        >
                                            {expandedPath === path.id ? 'Hide' : 'Show'} Roadmap
                                            <ChevronRight size={15}
                                                style={{ transform: expandedPath === path.id ? 'rotate(90deg)' : 'none', transition: '0.2s' }}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {expandedPath === path.id && (
                                                <motion.ol
                                                    className={styles.pathSteps}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {path.steps.map((step, i) => (
                                                        <li key={i} className={styles.pathStep}>
                                                            <CheckCircle2 size={15} />
                                                            {step}
                                                        </li>
                                                    ))}
                                                </motion.ol>
                                            )}
                                        </AnimatePresence>
                                        <div className={styles.pathFooter}>
                                            <span className={styles.pathResourceCount}>
                                                <BookOpen size={13} />{path.resourceCount} resources included
                                            </span>
                                            <button className={styles.pathStartBtn}>
                                                Start Path <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Filter Tabs ─────────────────────────────────────────────── */}
                <section className={styles.tabsSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.tabBar}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <tab.icon size={15} />
                                    {tab.label}
                                    <span className={styles.tabCount}>{counts[tab.id] ?? 0}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Resources Grid ─────────────────────────────────────────── */}
                <section className={styles.contentSection}>
                    <div className={styles.container}>
                        {searchQuery && (
                            <p className={styles.searchInfo}>
                                <Filter size={14} />
                                Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''} for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                            </p>
                        )}

                        <AnimatePresence mode="wait">
                            {filtered.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    className={styles.emptyState}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <Search size={48} className={styles.emptyIcon} />
                                    <h3>No resources found</h3>
                                    <p>Try a different search term or browse by category.</p>
                                    <button className={styles.resetBtn} onClick={() => { setSearchQuery(''); setActiveTab('all'); }}>
                                        <RotateCcw size={14} /> Reset Filters
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeTab + searchQuery}
                                    className={styles.resourceGrid}
                                    initial="hidden" animate="visible" variants={stagger}
                                >
                                    {filtered.map(resource => {
                                        const meta = TYPE_META[resource.type];
                                        const Icon = meta.icon;
                                        return (
                                            <motion.div
                                                key={resource.id}
                                                className={styles.resourceCard}
                                                variants={fadeUp}
                                                whileHover={{ y: -6 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                {/* Thumbnail */}
                                                <div
                                                    className={styles.resourceThumb}
                                                    style={{ background: resource.thumbnailBg }}
                                                    onClick={() => handleResourceAction(resource)}
                                                >
                                                    {resource.type === 'video' && resource.videoUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={getYtThumb(resource.videoUrl)}
                                                            alt={resource.title}
                                                            className={styles.thumbYt}
                                                            loading="lazy"
                                                            onLoad={(e) => {
                                                                const img = e.target as HTMLImageElement;
                                                                // YouTube returns a 120×90 grey placeholder for unavailable videos
                                                                // mqdefault placeholder is also 320×180 but with specific grey content
                                                                // Hide if it's clearly the default placeholder (naturalWidth is the fallback grey)
                                                                if (img.naturalWidth <= 120) {
                                                                    img.style.display = 'none';
                                                                }
                                                            }}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    ) : null}
                                                    {/* Always render emoji as fallback beneath the img */}
                                                    <span className={styles.thumbEmoji}>{resource.thumbnail}</span>
                                                    <span className={styles.typeBadge} style={{ background: meta.color }}>
                                                        <Icon size={11} />
                                                        {meta.label}
                                                    </span>
                                                    <span className={styles.durationBadge}>{resource.duration}</span>
                                                    {resource.type === 'video' && (
                                                        <div className={styles.playOverlay}>
                                                            <div className={styles.playBtn}>
                                                                <Play size={22} fill="white" />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {resource.featured && (
                                                        <span className={styles.featuredBadge}>
                                                            <Star size={10} fill="currentColor" /> Featured
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Body */}
                                                <div className={styles.resourceBody}>
                                                    <span className={styles.resourceCategory}>{resource.category}</span>
                                                    <h3 className={styles.resourceTitle}>{resource.title}</h3>
                                                    <p className={styles.resourceDesc}>{resource.description}</p>

                                                    {/* Tags */}
                                                    <div className={styles.tagRow}>
                                                        {resource.tags.slice(0, 3).map(t => (
                                                            <span key={t} className={styles.tag}>#{t}</span>
                                                        ))}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className={styles.resourceFooter}>
                                                        <div className={styles.metaLeft}>
                                                            <span><Eye size={12} />{resource.views}</span>
                                                            <span><Star size={12} className={styles.starIcon} />{resource.rating}</span>
                                                        </div>
                                                        <div className={styles.actions}>
                                                            <button
                                                                className={styles.copyBtn}
                                                                title="Copy link"
                                                                onClick={() => handleCopy(resource.url || window.location.href, resource.id)}
                                                            >
                                                                {copied === resource.id
                                                                    ? <CheckCircle2 size={15} style={{ color: '#22c55e' }} />
                                                                    : <Share2 size={15} />
                                                                }
                                                            </button>
                                                            <button
                                                                className={styles.actionBtn}
                                                                onClick={() => handleResourceAction(resource)}
                                                            >
                                                                {getActionLabel(resource.type)}
                                                                <ArrowRight size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* ── CTA ────────────────────────────────────────────────────── */}
                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.ctaCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={styles.ctaOrb1} />
                            <div className={styles.ctaOrb2} />
                            <div className={styles.ctaInner}>
                                <span className={styles.ctaBadge}><Sparkles size={14} /> Free AI Assessment</span>
                                <h2 className={styles.ctaTitle}>
                                    Want Personalized{' '}
                                    <span className={styles.gradientText}>Career Guidance?</span>
                                </h2>
                                <p className={styles.ctaSubtitle}>
                                    Take our AI-powered assessment and get career recommendations,
                                    skill gap analysis, and a custom roadmap in under 15 minutes.
                                </p>
                                <div className={styles.ctaButtons}>
                                    <Link href="/assessment">
                                        <motion.button
                                            className={styles.ctaPrimary}
                                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        >
                                            <Sparkles size={17} /> Take Free Assessment <ArrowRight size={17} />
                                        </motion.button>
                                    </Link>
                                    <Link href="/chat">
                                        <motion.button
                                            className={styles.ctaSecondary}
                                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        >
                                            Chat with Aria AI
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* ── Video Modal ─────────────────────────────────────────────── */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            className={styles.modalBox}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className={styles.modalHead}>
                                <div className={styles.modalHeadLeft}>
                                    <Youtube size={18} className={styles.ytIcon} />
                                    <h3 className={styles.modalTitle}>{selectedVideo.title}</h3>
                                </div>
                                <button className={styles.closeBtn} onClick={() => setSelectedVideo(null)}>
                                    <X size={22} />
                                </button>
                            </div>
                            <div className={styles.videoWrap}>
                                <iframe
                                    src={selectedVideo.url + '?autoplay=1'}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

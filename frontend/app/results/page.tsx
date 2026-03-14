'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Target,
    TrendingUp,
    DollarSign,
    ArrowRight,
    Sparkles,
    Brain,
    Award,
    BookOpen,
    Clock,
    Star,
    Zap,
    Info,
    Briefcase,
    Users,
    Globe,
    Layers,
    MonitorPlay,
    Search,
    MessageSquare,
    ExternalLink,
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import { careersData } from '@/data/careers';
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

// Overview data
const overviewStats = [
    { label: 'Assessment Score', value: '87%', icon: '🎯', change: '+12%', color: '#6366f1' },
    { label: 'Careers Matched', value: '15', icon: '💼', change: '+5', color: '#8b5cf6' },
    { label: 'Skills Analyzed', value: '24', icon: '⚡', change: '+8', color: '#06b6d4' },
    { label: 'Profile Strength', value: '92%', icon: '🛡️', change: '+15%', color: '#22c55e' },
];

// Platform data per career category
interface Platform {
    name: string;
    url: string;
    type: 'learning' | 'jobs' | 'community' | 'freelance';
    icon: string;
    description: string;
    badge?: string;
}

const platformsByCategory: Record<string, Platform[]> = {
    Technology: [
        { name: 'Coursera', url: 'https://coursera.org', type: 'learning', icon: '🎓', description: 'World-class tech courses from top universities', badge: 'Top Pick' },
        { name: 'LeetCode', url: 'https://leetcode.com', type: 'community', icon: '💡', description: 'Practice coding & prepare for tech interviews' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '💼', description: 'Network with professionals & find tech roles', badge: 'Hot' },
        { name: 'Naukri.com', url: 'https://naukri.com', type: 'jobs', icon: '🏢', description: "India's largest job portal for tech professionals" },
        { name: 'Udemy', url: 'https://udemy.com', type: 'learning', icon: '📚', description: 'Affordable courses on every tech skill' },
        { name: 'GitHub', url: 'https://github.com', type: 'community', icon: '🐙', description: 'Showcase your projects & contribute to open source' },
        { name: 'TopTal', url: 'https://toptal.com', type: 'freelance', icon: '⚡', description: 'Elite freelance network for top tech talent' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', type: 'community', icon: '🔧', description: 'Q&A community for developers worldwide' },
    ],
    Business: [
        { name: 'Coursera Business', url: 'https://coursera.org/business', type: 'learning', icon: '🎓', description: 'MBA-level courses from top business schools', badge: 'Top Pick' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '💼', description: 'Connect with business leaders & find roles', badge: 'Hot' },
        { name: 'Indeed', url: 'https://indeed.co.in', type: 'jobs', icon: '🔍', description: 'Millions of business & management job listings' },
        { name: 'Naukri.com', url: 'https://naukri.com', type: 'jobs', icon: '🏢', description: 'Leading job portal for business professionals' },
        { name: 'edX', url: 'https://edx.org', type: 'learning', icon: '📖', description: 'Business & management programs from MIT, Harvard' },
        { name: 'Internshala', url: 'https://internshala.com', type: 'jobs', icon: '🌱', description: 'Internships & fresher jobs for early careers' },
        { name: 'Glassdoor', url: 'https://glassdoor.co.in', type: 'community', icon: '💬', description: 'Company reviews, salaries & interview insights' },
        { name: 'IIM Jobs', url: 'https://iimjobs.com', type: 'jobs', icon: '🏆', description: 'Premium jobs for management professionals' },
    ],
    Creative: [
        { name: 'Behance', url: 'https://behance.net', type: 'community', icon: '🎨', description: 'Showcase your design portfolio to the world', badge: 'Top Pick' },
        { name: 'Dribbble', url: 'https://dribbble.com', type: 'community', icon: '🏀', description: 'Discover & connect with top designers globally', badge: 'Hot' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '💼', description: 'Find creative director & UX roles' },
        { name: 'Upwork', url: 'https://upwork.com', type: 'freelance', icon: '💻', description: 'Freelance design, writing & creative projects' },
        { name: 'Fiverr', url: 'https://fiverr.com', type: 'freelance', icon: '💡', description: 'Offer creative services globally' },
        { name: 'Skillshare', url: 'https://skillshare.com', type: 'learning', icon: '✏️', description: 'Creative courses on design, illustration & more' },
        { name: 'Canva Design School', url: 'https://designschool.canva.com', type: 'learning', icon: '🖌️', description: 'Free design fundamentals & branding courses' },
        { name: 'Adshuffle', url: 'https://99designs.com', type: 'freelance', icon: '🎯', description: 'Creative marketplace connecting designers & clients' },
    ],
    Healthcare: [
        { name: 'Practo', url: 'https://practo.com/jobs', type: 'jobs', icon: '🏥', description: 'Healthcare job listings across India', badge: 'Top Pick' },
        { name: 'Naukri MedWanted', url: 'https://naukri.com', type: 'jobs', icon: '💊', description: 'Medical & healthcare jobs on India\'s top portal' },
        { name: 'AIIMS Career', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '🔬', description: 'Government & top hospital postings' },
        { name: 'Medscape', url: 'https://medscape.com', type: 'community', icon: '📋', description: 'Clinical resources, news & CME for medical pros' },
        { name: 'Coursera Health', url: 'https://coursera.org', type: 'learning', icon: '🎓', description: 'Public health, medicine & nursing certifications', badge: 'Hot' },
        { name: 'WHO Learning', url: 'https://extranet.who.int/openepi', type: 'learning', icon: '🌍', description: 'WHO-certified public health training programs' },
        { name: 'Doximity', url: 'https://doximity.com', type: 'community', icon: '👩‍⚕️', description: 'Professional network for medical practitioners' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '💼', description: 'Healthcare networking & job opportunities' },
    ],
    Engineering: [
        { name: 'NPTEL', url: 'https://nptel.ac.in', type: 'learning', icon: '🎓', description: 'Free engineering courses from IITs & IISc', badge: 'Top Pick' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '💼', description: 'Engineering roles across all sectors', badge: 'Hot' },
        { name: 'Naukri.com', url: 'https://naukri.com', type: 'jobs', icon: '🏢', description: 'Engineering & core sector job listings' },
        { name: 'Indeed', url: 'https://indeed.co.in', type: 'jobs', icon: '🔍', description: 'Government & private engineering jobs' },
        { name: 'Coursera Engineering', url: 'https://coursera.org', type: 'learning', icon: '📐', description: 'Professional engineering certifications' },
        { name: 'ResearchGate', url: 'https://researchgate.net', type: 'community', icon: '🔬', description: 'Engineering research network & paper sharing' },
        { name: 'Internshala', url: 'https://internshala.com', type: 'jobs', icon: '🌱', description: 'Engineering internships for fresh graduates' },
        { name: 'AutoCAD Training', url: 'https://autodesk.com/education', type: 'learning', icon: '📏', description: 'Autodesk certified CAD & design training' },
    ],
    Science: [
        { name: 'ResearchGate', url: 'https://researchgate.net', type: 'community', icon: '🔬', description: 'Global network for scientists & researchers', badge: 'Top Pick' },
        { name: 'Academia.edu', url: 'https://academia.edu', type: 'community', icon: '📄', description: 'Share research papers & academic work' },
        { name: 'CSIR Careers', url: 'https://csir.res.in', type: 'jobs', icon: '🏛️', description: 'Research positions at CSIR labs across India', badge: 'Hot' },
        { name: 'Coursera Science', url: 'https://coursera.org', type: 'learning', icon: '🎓', description: 'Data science, bioinformatics & research methods' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs', type: 'jobs', icon: '💼', description: 'Research & science professional opportunities' },
        { name: 'Kaggle', url: 'https://kaggle.com', type: 'community', icon: '🧠', description: 'Data science competitions & datasets' },
        { name: 'Nature Careers', url: 'https://nature.com/naturecareers', type: 'jobs', icon: '🌿', description: 'International science & research positions' },
        { name: 'edX Science', url: 'https://edx.org', type: 'learning', icon: '📖', description: 'University-level science certifications' },
    ],
};

const platformTypeConfig = {
    learning: { label: 'Learning', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', icon: '📚' },
    jobs: { label: 'Jobs', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', icon: '💼' },
    community: { label: 'Community', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', icon: '👥' },
    freelance: { label: 'Freelance', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '⚡' },
};

const globalPlatformCategories = [
    {
        title: 'Job Portals',
        icon: '💼',
        color: '#22c55e',
        platforms: [
            { name: 'LinkedIn', url: 'https://linkedin.com/jobs', desc: 'Global professional network & jobs' },
            { name: 'Naukri.com', url: 'https://naukri.com', desc: "India's #1 job portal" },
            { name: 'Indeed', url: 'https://indeed.co.in', desc: 'Millions of listings across all sectors' },
            { name: 'Internshala', url: 'https://internshala.com', desc: 'Best for freshers & internships' },
            { name: 'Glassdoor', url: 'https://glassdoor.co.in', desc: 'Salaries, reviews & company insights' },
            { name: 'Shine.com', url: 'https://shine.com', desc: 'Jobs across industries in India' },
        ],
    },
    {
        title: 'Learning Platforms',
        icon: '🎓',
        color: '#6366f1',
        platforms: [
            { name: 'Coursera', url: 'https://coursera.org', desc: 'University-backed certifications' },
            { name: 'edX', url: 'https://edx.org', desc: 'MIT, Harvard & top uni programs' },
            { name: 'Udemy', url: 'https://udemy.com', desc: 'Affordable skill-based courses' },
            { name: 'NPTEL', url: 'https://nptel.ac.in', desc: 'Free IIT/IISc courses' },
            { name: 'Skillshare', url: 'https://skillshare.com', desc: 'Creative & professional courses' },
            { name: 'LinkedIn Learning', url: 'https://linkedin.com/learning', desc: 'Business & tech skill paths' },
        ],
    },
    {
        title: 'Freelance & Gig',
        icon: '⚡',
        color: '#f59e0b',
        platforms: [
            { name: 'Upwork', url: 'https://upwork.com', desc: 'Top freelance marketplace worldwide' },
            { name: 'Fiverr', url: 'https://fiverr.com', desc: 'Offer services starting at ₹400' },
            { name: 'Freelancer.com', url: 'https://freelancer.in', desc: 'Bid on global projects' },
            { name: 'Toptal', url: 'https://toptal.com', desc: 'Elite freelancers, premium rates' },
            { name: '99designs', url: 'https://99designs.com', desc: 'Creative & design freelancing' },
            { name: 'Truelancer', url: 'https://truelancer.com', desc: 'Indian freelance marketplace' },
        ],
    },
    {
        title: 'Communities & Networks',
        icon: '👥',
        color: '#06b6d4',
        platforms: [
            { name: 'Reddit', url: 'https://reddit.com/r/cscareerquestions', desc: 'Career advice from real professionals' },
            { name: 'Discord Servers', url: 'https://discord.com', desc: 'Join career-specific Discord communities' },
            { name: 'GitHub', url: 'https://github.com', desc: 'Open source contributions & portfolio' },
            { name: 'Stack Overflow', url: 'https://stackoverflow.com', desc: 'Q&A for technical professionals' },
            { name: 'Quora', url: 'https://quora.com', desc: 'Career Q&A & industry insights' },
            { name: 'Medium', url: 'https://medium.com', desc: 'Read & publish thought leadership' },
        ],
    },
];

// Top career matches
const topMatches = [
    {
        id: 1,
        rank: 1,
        title: 'Data Scientist',
        icon: '📊',
        category: 'Technology',
        match: 94,
        salary: '₹8-25 LPA',
        growth: 'Very High',
        description: 'Analyze complex data using statistical methods and machine learning to drive business decisions.',
        whyMatch: 'Strong analytical skills, Python proficiency, and interest in problem-solving align perfectly.',
    },
    {
        id: 2,
        rank: 2,
        title: 'Machine Learning Engineer',
        icon: '🤖',
        category: 'Technology',
        match: 91,
        salary: '₹10-35 LPA',
        growth: 'Very High',
        description: 'Build and deploy machine learning models at scale for real-world applications and AI systems.',
        whyMatch: 'Mathematical aptitude, programming skills, and curiosity about AI make this an excellent match.',
    },
    {
        id: 3,
        rank: 3,
        title: 'Software Engineer',
        icon: '💻',
        category: 'Technology',
        match: 88,
        salary: '₹6-30 LPA',
        growth: 'High',
        description: 'Design, develop, and maintain software applications for various platforms and industries.',
        whyMatch: 'Logical thinking, coding skills, and team collaboration abilities are strong indicators.',
    },
    {
        id: 4,
        rank: 4,
        title: 'Product Manager',
        icon: '🎯',
        category: 'Business',
        match: 82,
        salary: '₹12-35 LPA',
        growth: 'High',
        description: 'Lead product development from ideation to launch, balancing user needs with business goals.',
        whyMatch: 'Leadership qualities, strategic thinking, and communication skills match well.',
    },
    {
        id: 5,
        rank: 5,
        title: 'UX Researcher',
        icon: '🔍',
        category: 'Creative',
        match: 78,
        salary: '₹6-18 LPA',
        growth: 'Growing',
        description: 'Conduct user research to inform design decisions and improve user experience across products.',
        whyMatch: 'Empathy, analytical mindset, and interest in human behavior are key strengths.',
    },
];

// Skills data 
const skillsData = [
    { name: 'Analytical Thinking', value: 92, color: '#6366f1' },
    { name: 'Problem Solving', value: 88, color: '#8b5cf6' },
    { name: 'Programming', value: 85, color: '#a855f7' },
    { name: 'Communication', value: 78, color: '#06b6d4' },
    { name: 'Mathematics', value: 90, color: '#22c55e' },
    { name: 'Creativity', value: 72, color: '#ec4899' },
    { name: 'Leadership', value: 70, color: '#f97316' },
    { name: 'Technical Writing', value: 65, color: '#eab308' },
];

// Personality (Big Five)
const personality = [
    { trait: 'Openness', score: 85, color: '#6366f1' },
    { trait: 'Conscientious', score: 78, color: '#22c55e' },
    { trait: 'Extraversion', score: 62, color: '#f97316' },
    { trait: 'Agreeable', score: 88, color: '#06b6d4' },
    { trait: 'Stability', score: 75, color: '#8b5cf6' },
];

// Skill gaps
const skillGaps = [
    { name: 'Deep Learning', level: 'Beginner', gap: 'high', icon: '🧠' },
    { name: 'Cloud Computing (AWS)', level: 'Beginner', gap: 'high', icon: '☁️' },
    { name: 'Data Visualization', level: 'Intermediate', gap: 'medium', icon: '📈' },
    { name: 'SQL & Databases', level: 'Intermediate', gap: 'medium', icon: '🗄️' },
    { name: 'Python Libraries', level: 'Advanced', gap: 'low', icon: '🐍' },
    { name: 'Statistics', level: 'Advanced', gap: 'low', icon: '📐' },
];

// Course recommendations
const courses = [
    {
        name: 'Machine Learning Specialization',
        provider: 'Coursera · Andrew Ng',
        duration: '3 months',
        rating: '4.9',
        icon: '🎓',
    },
    {
        name: 'AWS Cloud Practitioner',
        provider: 'Amazon Web Services',
        duration: '6 weeks',
        rating: '4.7',
        icon: '☁️',
    },
    {
        name: 'Data Science with Python',
        provider: 'edX · MIT',
        duration: '4 months',
        rating: '4.8',
        icon: '🐍',
    },
    {
        name: 'Deep Learning Fundamentals',
        provider: 'fast.ai',
        duration: '7 weeks',
        rating: '4.9',
        icon: '🧠',
    },
];

// Timeline
const timeline = [
    {
        title: 'Foundation Building',
        period: 'Month 1-3',
        description: 'Complete Python mastery, learn core ML concepts, build 3 portfolio projects. Focus on NumPy, Pandas, Scikit-learn.',
        color: '#6366f1',
    },
    {
        title: 'Advanced Skills',
        period: 'Month 4-6',
        description: 'Deep dive into Deep Learning, NLP, and Computer Vision. Build end-to-end ML pipelines and deploy models.',
        color: '#8b5cf6',
    },
    {
        title: 'Cloud & DevOps',
        period: 'Month 7-9',
        description: 'Learn AWS/GCP, Docker, Kubernetes. Get cloud certification. Build scalable data infrastructure.',
        color: '#06b6d4',
    },
    {
        title: 'Career Launch',
        period: 'Month 10-12',
        description: 'Build a strong portfolio, contribute to open source, network with professionals, and apply to top companies.',
        color: '#22c55e',
    },
];

export default function ResultsPage() {
    const [showWhy, setShowWhy] = useState<number | null>(null);
    const [matches, setMatches] = useState(topMatches);
    const [stats, setStats] = useState(overviewStats);
    const [userSkillsData, setUserSkillsData] = useState(skillsData);
    const [userSkillGaps, setUserSkillGaps] = useState(skillGaps);

    useEffect(() => {
        const savedData = localStorage.getItem('careerAssessment');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);

                setStats(prev => {
                    const newStats = [...prev];
                    newStats[0].value = `${data.score}%`;
                    return newStats;
                });

                let filteredCareers = careersData;
                if (data.personalInfo?.targetPath) {
                    const target = data.personalInfo.targetPath;
                    const mappedCategory = target === 'engineering' ? 'Technology' :
                        target === 'business' ? 'Business' :
                            target === 'creative' ? 'Creative' :
                                target === 'medical' ? 'Healthcare' : 'Technology';

                    filteredCareers = careersData.filter(c => c.category === mappedCategory);
                }

                if (filteredCareers.length === 0) filteredCareers = careersData;

                if (data.skillRatings) {
                    const skillKeys = Object.keys(data.skillRatings);
                    const colorPalette = ['#6366f1', '#8b5cf6', '#a855f7', '#06b6d4', '#22c55e', '#ec4899', '#f97316', '#eab308'];
                    
                    const dynamicSkills = skillKeys.map((key, i) => {
                        const name = key.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                        const percentage = (data.skillRatings[key] / 5) * 100;
                        return { name, value: percentage, color: colorPalette[i % colorPalette.length] };
                    });
                    
                    if (dynamicSkills.length > 0) {
                        setUserSkillsData([...dynamicSkills].sort((a, b) => b.value - a.value));
                        
                        const strongSkills = dynamicSkills.filter(s => s.value >= 80).map(s => s.name);
                        
                        const gaps = dynamicSkills
                            .filter(s => s.value <= 60)
                            .map((s, i) => ({
                                name: s.name,
                                level: s.value <= 40 ? 'Beginner' : 'Intermediate',
                                gap: s.value <= 40 ? 'high' : 'medium',
                                icon: s.value <= 40 ? '🎯' : '📈'
                            }));
                            
                        if (gaps.length > 0) setUserSkillGaps(gaps.slice(0, 4));

                        const newMatches = filteredCareers.slice(0, 5).map((c, index) => {
                            let whyStr = `Based on your chosen path and assessment score of ${data.score}%, ${c.title} aligns strongly with your profile.`;
                            // Give explicit reasoning
                            if (strongSkills.length > 0) {
                                whyStr += ` Your strong rating (${strongSkills[0]} at 4/5 or 5/5) indicates you have the core foundational traits necessary for this role.`;
                            }
                            if (gaps.length > 0) {
                                whyStr += ` Focus on improving your ${gaps[0].name.toLowerCase()} skills to become a top candidate.`;
                            }
                            
                            return {
                                id: parseInt(c.id),
                                rank: index + 1,
                                title: c.title,
                                icon: c.icon,
                                category: c.category,
                                match: Math.max(50, Math.round(c.match * ((data.score || 80) / 100))),
                                salary: c.salary,
                                growth: c.growth,
                                description: c.description,
                                whyMatch: whyStr,
                            };
                        }).sort((a, b) => b.match - a.match);

                        if (newMatches.length > 0) setMatches(newMatches);
                    }
                } else {
                    const newMatches = filteredCareers.slice(0, 5).map((c, index) => ({
                        id: parseInt(c.id),
                        rank: index + 1,
                        title: c.title,
                        icon: c.icon,
                        category: c.category,
                        match: Math.max(50, Math.round(c.match * ((data.score || 80) / 100))),
                        salary: c.salary,
                        growth: c.growth,
                        description: c.description,
                        whyMatch: `Based on your chosen path and assessment score of ${data.score}%, ${c.title} aligns strongly with your profile.`,
                    })).sort((a, b) => b.match - a.match);

                    if (newMatches.length > 0) setMatches(newMatches);
                }

            } catch (e) {
                console.error("Error reading assessment data", e);
            }
        }
    }, []);

    const circumference = 2 * Math.PI * 33; // radius = 33

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
                                <BarChart3 size={14} />
                                Your Results Dashboard
                            </span>
                            <h1 className={styles.heroTitle}>
                                Your Career
                                <br />
                                <span className={styles.gradientText}>Analysis Report</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Based on your comprehensive assessment, our AI has analyzed your skills,
                                interests, and personality to find your perfect career matches.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Overview Cards */}
                <section className={styles.overviewSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.overviewGrid}
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.overviewCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div
                                        className={styles.overviewCardIcon}
                                        style={{ background: `${stat.color}15` }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div className={styles.overviewCardLabel}>{stat.label}</div>
                                    <div className={styles.overviewCardValue}>{stat.value}</div>
                                    <span className={`${styles.overviewCardChange} ${styles.changePositive}`}>
                                        <TrendingUp size={12} />
                                        {stat.change}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Top Career Matches */}
                <section className={styles.matchesSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.sectionBadge}>
                                <Target size={14} />
                                Top Matches
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Your Best <span className={styles.gradientText}>Career Matches</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                AI-ranked careers that best align with your unique profile, skills, and aspirations.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.matchesGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            {matches.map((career) => (
                                <motion.div
                                    key={career.id}
                                    className={styles.matchCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className={styles.matchRank}>{career.rank}</div>
                                    <div className={styles.matchIcon}>{career.icon}</div>
                                    <h3 className={styles.matchTitle}>{career.title}</h3>
                                    <div className={styles.matchCategory}>{career.category}</div>
                                    <p className={styles.matchDescription}>{career.description}</p>

                                    <div className={styles.matchScoreBar}>
                                        <div className={styles.matchScoreLabel}>
                                            <span>Match Score</span>
                                            <span>{career.match}%</span>
                                        </div>
                                        <div className={styles.progressTrack}>
                                            <motion.div
                                                className={styles.progressFill}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${career.match}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.3 }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.matchMeta}>
                                        <div className={styles.metaItem}>
                                            <DollarSign size={12} />
                                            <span>{career.salary}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <TrendingUp size={12} />
                                            <span>{career.growth}</span>
                                        </div>
                                    </div>

                                    {showWhy === career.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '0.75rem',
                                                background: 'var(--bg-option-active)',
                                                border: '1px solid var(--border-accent)',
                                                marginBottom: '1rem',
                                                fontSize: 'var(--text-sm)',
                                                color: 'var(--text-secondary)',
                                                lineHeight: '1.6',
                                            }}
                                        >
                                            <strong style={{ color: 'var(--accent-primary)' }}>Why this match: </strong>
                                            {career.whyMatch}
                                        </motion.div>
                                    )}

                                    <div className={styles.matchActions}>
                                        <Link href={`/careers/${career.id}`} style={{ flex: 1 }}>
                                            <button className={styles.viewDetailsBtn}>
                                                View Details
                                                <ArrowRight size={14} />
                                            </button>
                                        </Link>
                                        <button
                                            className={styles.whyBtn}
                                            onClick={() => setShowWhy(showWhy === career.id ? null : career.id)}
                                        >
                                            <Info size={14} />
                                            Why?
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Platform Suggestions Section */}
                <section className={styles.platformSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.sectionBadge}>
                                <Globe size={14} />
                                Platform Hub
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Suggested <span className={styles.gradientText}>Platforms</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Curated learning platforms, job portals, and communities tailored to your top career matches.
                            </p>
                        </motion.div>

                        {/* Per-Career Platform Cards */}
                        <motion.div
                            className={styles.platformCareerGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={staggerContainer}
                        >
                            {matches.slice(0, 3).map((career) => {
                                const availablePlatforms =
                                    platformsByCategory[career.category] ||
                                    platformsByCategory['Technology'];
                                return (
                                    <motion.div
                                        key={career.id}
                                        className={styles.platformCareerCard}
                                        variants={fadeInUp}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className={styles.platformCareerHeader}>
                                            <span className={styles.platformCareerIcon}>{career.icon}</span>
                                            <div>
                                                <div className={styles.platformCareerTitle}>{career.title}</div>
                                                <div className={styles.platformCareerMeta}>
                                                    <span style={{ color: 'var(--accent-primary)' }}>{career.match}% match</span>
                                                    &nbsp;·&nbsp;
                                                    <span style={{ color: 'var(--text-muted)' }}>{career.category}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.platformTypeFilters}>
                                            {(['learning', 'jobs', 'community', 'freelance'] as const).map((type) => {
                                                const cfg = platformTypeConfig[type];
                                                const count = availablePlatforms.filter(p => p.type === type).length;
                                                if (count === 0) return null;
                                                return (
                                                    <span
                                                        key={type}
                                                        className={styles.platformTypePill}
                                                        style={{ color: cfg.color, background: cfg.bg }}
                                                    >
                                                        {cfg.icon} {cfg.label} ({count})
                                                    </span>
                                                );
                                            })}
                                        </div>

                                        <div className={styles.platformList}>
                                            {availablePlatforms.map((platform, pIdx) => {
                                                const cfg = platformTypeConfig[platform.type];
                                                return (
                                                    <motion.a
                                                        key={pIdx}
                                                        href={platform.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.platformItem}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: pIdx * 0.05 }}
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <span className={styles.platformItemEmoji}>{platform.icon}</span>
                                                        <div className={styles.platformItemInfo}>
                                                            <div className={styles.platformItemName}>
                                                                {platform.name}
                                                                {platform.badge && (
                                                                    <span
                                                                        className={styles.platformBadge}
                                                                        style={{ background: cfg.bg, color: cfg.color }}
                                                                    >
                                                                        {platform.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className={styles.platformItemDesc}>{platform.description}</div>
                                                        </div>
                                                        <div className={styles.platformItemRight}>
                                                            <span
                                                                className={styles.platformTypeBadge}
                                                                style={{ color: cfg.color, background: cfg.bg }}
                                                            >
                                                                {cfg.label}
                                                            </span>
                                                            <ExternalLink size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                                        </div>
                                                    </motion.a>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Global Platform Hub */}
                        <motion.div
                            className={styles.globalPlatformHub}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className={styles.globalHubHeader}>
                                <Layers size={20} />
                                <h3 className={styles.globalHubTitle}>Complete Platform Directory</h3>
                                <p className={styles.globalHubSubtitle}>All platforms organized by category to supercharge your career journey</p>
                            </div>

                            <div className={styles.globalHubGrid}>
                                {globalPlatformCategories.map((cat, catIdx) => (
                                    <motion.div
                                        key={catIdx}
                                        className={styles.globalHubCategory}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: catIdx * 0.1 }}
                                    >
                                        <div
                                            className={styles.globalHubCatHeader}
                                            style={{ borderColor: cat.color + '40' }}
                                        >
                                            <span className={styles.globalHubCatIcon}
                                                style={{ background: cat.color + '18', color: cat.color }}
                                            >
                                                {cat.icon}
                                            </span>
                                            <span className={styles.globalHubCatTitle} style={{ color: cat.color }}>
                                                {cat.title}
                                            </span>
                                        </div>
                                        <div className={styles.globalHubPlatformList}>
                                            {cat.platforms.map((p, pIdx) => (
                                                <a
                                                    key={pIdx}
                                                    href={p.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.globalHubPlatformItem}
                                                >
                                                    <div>
                                                        <div className={styles.globalHubPlatformName}>{p.name}</div>
                                                        <div className={styles.globalHubPlatformDesc}>{p.desc}</div>
                                                    </div>
                                                    <ExternalLink size={12} style={{ color: cat.color, flexShrink: 0, opacity: 0.7 }} />
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Detailed Analysis */}
                <section className={styles.analysisSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.sectionBadge}>
                                <Brain size={14} />
                                Deep Analysis
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Your <span className={styles.gradientText}>Detailed Profile</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                A comprehensive breakdown of your skills, personality traits, and aptitude scores.
                            </p>
                        </motion.div>

                        <div className={styles.analysisGrid}>
                            {/* Skills Radar */}
                            <motion.div
                                className={styles.analysisCard}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className={styles.analysisCardHeader}>
                                    <div className={styles.analysisCardIcon}>
                                        <Zap size={20} />
                                    </div>
                                    <h3 className={styles.analysisCardTitle}>Skills Assessment</h3>
                                </div>

                                <div className={styles.radarChart}>
                                    {userSkillsData.map((skill) => (
                                        <div key={skill.name} className={styles.skillRow}>
                                            <span className={styles.skillName}>{skill.name}</span>
                                            <div className={styles.skillBar}>
                                                <motion.div
                                                    className={styles.skillFill}
                                                    style={{ background: skill.color }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.value}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.2, delay: 0.2 }}
                                                />
                                            </div>
                                            <span className={styles.skillValue}>{skill.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Personality */}
                            <motion.div
                                className={styles.analysisCard}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className={styles.analysisCardHeader}>
                                    <div className={styles.analysisCardIcon}>
                                        <Users size={20} />
                                    </div>
                                    <h3 className={styles.analysisCardTitle}>Personality Profile (Big Five)</h3>
                                </div>

                                <div className={styles.personalityGrid}>
                                    {personality.map((item) => {
                                        const offset = circumference - (item.score / 100) * circumference;
                                        return (
                                            <div key={item.trait} className={styles.personalityItem}>
                                                <div className={styles.personalityRing}>
                                                    <svg className={styles.personalityRingSvg} viewBox="0 0 80 80">
                                                        <circle
                                                            className={styles.personalityRingBg}
                                                            cx="40"
                                                            cy="40"
                                                            r="33"
                                                        />
                                                        <motion.circle
                                                            className={styles.personalityRingFill}
                                                            cx="40"
                                                            cy="40"
                                                            r="33"
                                                            stroke={item.color}
                                                            strokeDasharray={circumference}
                                                            initial={{ strokeDashoffset: circumference }}
                                                            whileInView={{ strokeDashoffset: offset }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.5, delay: 0.3 }}
                                                        />
                                                    </svg>
                                                    <span className={styles.personalityScore}>{item.score}%</span>
                                                </div>
                                                <span className={styles.personalityLabel}>{item.trait}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Skill Gap Analysis */}
                <section className={styles.skillGapSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.sectionBadge}>
                                <Award size={14} />
                                Growth Path
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Skill Gap <span className={styles.gradientText}>Analysis</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Identify missing skills and get personalized course recommendations to bridge the gap.
                            </p>
                        </motion.div>

                        <div className={styles.skillGapGrid}>
                            {/* Skill Gaps */}
                            <motion.div
                                className={styles.skillGapCard}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className={styles.skillGapHeader}>
                                    <div className={styles.skillGapIcon}>
                                        <Target size={20} />
                                    </div>
                                    <h3 className={styles.skillGapTitle}>Skills to Develop</h3>
                                </div>

                                {userSkillGaps.map((gap, i) => (
                                    <motion.div
                                        key={gap.name}
                                        className={styles.gapItem}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className={styles.gapItemLeft}>
                                            <div className={styles.gapItemIcon}>{gap.icon}</div>
                                            <div>
                                                <div className={styles.gapItemName}>{gap.name}</div>
                                                <div className={styles.gapItemLevel}>{gap.level}</div>
                                            </div>
                                        </div>
                                        <span
                                            className={`${styles.gapBadge} ${gap.gap === 'high'
                                                ? styles.gapHigh
                                                : gap.gap === 'medium'
                                                    ? styles.gapMedium
                                                    : styles.gapLow
                                                }`}
                                        >
                                            {gap.gap === 'high' ? 'Needs Work' : gap.gap === 'medium' ? 'Improving' : 'Strong'}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Course Recommendations */}
                            <motion.div
                                className={styles.skillGapCard}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className={styles.skillGapHeader}>
                                    <div className={styles.skillGapIcon}>
                                        <BookOpen size={20} />
                                    </div>
                                    <h3 className={styles.skillGapTitle}>Recommended Courses</h3>
                                </div>

                                {courses.map((course, i) => (
                                    <motion.div
                                        key={course.name}
                                        className={styles.courseItem}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className={styles.courseIcon}>{course.icon}</div>
                                        <div className={styles.courseInfo}>
                                            <div className={styles.courseName}>{course.name}</div>
                                            <div className={styles.courseProvider}>{course.provider}</div>
                                            <div className={styles.courseMeta}>
                                                <span>
                                                    <Clock size={12} />
                                                    {course.duration}
                                                </span>
                                                <span>
                                                    <Star size={12} />
                                                    {course.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Action Plan Timeline */}
                <section className={styles.actionSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.sectionHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.sectionBadge}>
                                <Briefcase size={14} />
                                Action Plan
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Your <span className={styles.gradientText}>Career Roadmap</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Follow this personalized 12-month plan to reach your career goals step by step.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.timelineCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={styles.timeline}>
                                {timeline.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.timelineItem}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 }}
                                    >
                                        <div
                                            className={styles.timelineDot}
                                            style={{ background: item.color }}
                                        >
                                            <div className={styles.timelineDotInner} />
                                        </div>
                                        <div className={styles.timelineTitle}>{item.title}</div>
                                        <div className={styles.timelinePeriod}>{item.period}</div>
                                        <p className={styles.timelineDescription}>{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
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
                                    Ready to Take
                                    <br />
                                    <span className={styles.gradientText}>The Next Step?</span>
                                </h2>
                                <p className={styles.ctaSubtitle}>
                                    Talk to our AI Career Counselor for personalized guidance
                                    and get answers to all your career questions.
                                </p>
                                <Link href="/chat">
                                    <motion.button
                                        className={styles.ctaButton}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Sparkles size={18} />
                                        Chat with AI Counselor
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

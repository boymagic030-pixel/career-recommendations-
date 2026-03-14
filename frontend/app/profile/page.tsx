'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Settings, BookmarkCheck, History, Shield, Bell,
    Trash2, Camera, Sparkles, Star, Edit3, Download,
    BarChart3, TrendingUp, Target, Zap, Brain, Award,
    ArrowRight, CheckCircle2, Circle, Clock, DollarSign,
    BookOpen, MessageCircle, Globe, LogOut, ChevronRight,
    Code2, BarChart, Layers, Plus, RefreshCw, Eye, Lock,
    Mail, Phone, MapPin, GraduationCap, Briefcase, CalendarDays,
    Copy, AlignLeft, Link as LinkIcon, Heart, Flag, Route,
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface Assessment {
    title: string; date: string; score: number; icon: string; type: string;
}
interface SavedCareer {
    id: number; title: string; icon: string; category: string; match: number; salary: string;
}
interface Skill { name: string; value: number; color: string; }
interface Goal { id: number; text: string; done: boolean; deadline: string; }
interface Activity { day: string; count: number; }

/* ─── Mock Data ──────────────────────────────────────────────────────────────── */
const ASSESSMENTS: Assessment[] = [
    { title: 'Full Career Assessment', date: 'Feb 20, 2026', score: 87, icon: '🎯', type: 'Career' },
    { title: 'Aptitude Test', date: 'Feb 15, 2026', score: 92, icon: '🧮', type: 'Aptitude' },
    { title: 'Personality Assessment', date: 'Feb 10, 2026', score: 85, icon: '🧠', type: 'Personality' },
    { title: 'Interest Inventory', date: 'Jan 28, 2026', score: 90, icon: '💡', type: 'Interest' },
];

const SAVED_CAREERS: SavedCareer[] = [
    { id: 1, title: 'Data Scientist', icon: '📊', category: 'Technology', match: 94, salary: '₹8-25 LPA' },
    { id: 2, title: 'ML Engineer', icon: '🤖', category: 'Technology', match: 91, salary: '₹10-35 LPA' },
    { id: 3, title: 'Software Engineer', icon: '💻', category: 'Technology', match: 88, salary: '₹6-30 LPA' },
    { id: 4, title: 'Product Manager', icon: '🎯', category: 'Business', match: 82, salary: '₹12-35 LPA' },
];

const SKILLS: Skill[] = [
    { name: 'Analytical Thinking', value: 92, color: '#6366f1' },
    { name: 'Problem Solving', value: 88, color: '#8b5cf6' },
    { name: 'Programming', value: 85, color: '#a855f7' },
    { name: 'Communication', value: 78, color: '#06b6d4' },
    { name: 'Mathematics', value: 90, color: '#22c55e' },
    { name: 'Creativity', value: 72, color: '#ec4899' },
    { name: 'Leadership', value: 70, color: '#f97316' },
    { name: 'Technical Writing', value: 65, color: '#eab308' },
];

const INITIAL_GOALS: Goal[] = [
    { id: 1, text: 'Complete Machine Learning on Coursera', done: true, deadline: 'Mar 31, 2026' },
    { id: 2, text: 'Solve 150 LeetCode problems', done: false, deadline: 'Apr 30, 2026' },
    { id: 3, text: 'Build a Data Science portfolio project', done: false, deadline: 'May 15, 2026' },
    { id: 4, text: 'Earn AWS Cloud Practitioner cert', done: false, deadline: 'Jun 30, 2026' },
    { id: 5, text: 'Apply to 10 summer internships', done: true, deadline: 'Mar 10, 2026' },
];

const ROADMAP = [
    { title: 'Foundation', period: 'Month 1–3', desc: 'Python, NumPy, Pandas, basic ML concepts', color: '#6366f1', done: true },
    { title: 'ML & Stats', period: 'Month 4–6', desc: 'Scikit-learn, statistics, model evaluation', color: '#8b5cf6', done: true },
    { title: 'Deep Learning', period: 'Month 7–9', desc: 'TensorFlow, PyTorch, NLP, Computer Vision', color: '#06b6d4', done: false },
    { title: 'Cloud & MLOps', period: 'Month 10–12', desc: 'AWS, Docker, Kubernetes, CI/CD pipelines', color: '#22c55e', done: false },
];

// Fake 8-week activity heatmap (Mon→Sun columns)
const ACTIVITY: Activity[] = [
    ...[3, 5, 2, 6, 4, 1, 0, 2, 7, 5, 3, 4, 2, 1, 5, 3, 6, 4, 7, 2, 0, 0, 2, 4, 6, 5, 3, 1].map((count, i) => ({
        day: `W${Math.floor(i / 7) + 1}-D${i % 7 + 1}`, count,
    }))
];

const SIDEBAR = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'assessments', label: 'Assessment History', icon: History },
    { id: 'saved', label: 'Saved Careers', icon: BookmarkCheck },
    { id: 'goals', label: 'Goals & Roadmap', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
];

/* ─── Ring Chart ─────────────────────────────────────────────────────────────── */
function RingChart({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
    const r = (size - 12) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (value / 100) * circ;
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-subtle)" strokeWidth={8} />
            <motion.circle
                cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={color} strokeWidth={8}
                strokeDasharray={`${circ}`}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: circ - dash }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            />
        </svg>
    );
}

/* ─── Spider Chart ───────────────────────────────────────────────────────────── */
function SpiderChart({ skills, size = 260 }: { skills: Skill[]; size?: number }) {
    if (!skills || skills.length === 0) return null;
    const center = size / 2;
    const radius = size * 0.35;
    const levels = [20, 40, 60, 80, 100];
    
    return (
        <svg width={size} height={size} style={{ overflow: 'visible', margin: '0 auto', display: 'block' }}>
            {levels.map(level => {
                const r = radius * (level / 100);
                const points = skills.map((_, i) => {
                    const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
                    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                }).join(' ');
                return <polygon key={level} points={points} fill="none" stroke="var(--border-subtle)" strokeWidth="1" />;
            })}
            
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
                const x2 = center + radius * Math.cos(angle);
                const y2 = center + radius * Math.sin(angle);
                
                const labelRadius = radius + 25;
                const labelX = center + labelRadius * Math.cos(angle);
                const labelY = center + labelRadius * Math.sin(angle);
                
                return (
                    <g key={i}>
                        <line x1={center} y1={center} x2={x2} y2={y2} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
                        <text 
                            x={labelX} y={labelY} 
                            fontSize="11" 
                            fontWeight="600"
                            textAnchor="middle" 
                            dominantBaseline="middle"
                            fill="var(--text-secondary)"
                        >
                            {skill.name.split(' ')[0]}
                        </text>
                    </g>
                );
            })}
            
            <motion.polygon 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ transformOrigin: 'center' }}
                points={skills.map((s, i) => {
                    const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
                    const val = Math.max(15, s.value);
                    const r = radius * (val / 100);
                    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                }).join(' ')}
                fill="rgba(99, 102, 241, 0.25)"
                stroke="#6366f1"
                strokeWidth="2"
            />
            
            {skills.map((s, i) => {
                const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
                const val = Math.max(15, s.value);
                const r = radius * (val / 100);
                const cx = center + r * Math.cos(angle);
                const cy = center + r * Math.sin(angle);
                return (
                    <motion.circle 
                        key={`dot-${i}`}
                        initial={{ r: 0 }}
                        animate={{ r: 4.5 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        cx={cx}
                        cy={cy}
                        fill="#8b5cf6"
                        stroke="#fff"
                        strokeWidth="1.5"
                    />
                );
            })}
        </svg>
    );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
    const [savedCareers, setSavedCareers] = useState<SavedCareer[]>(SAVED_CAREERS);
    const [newGoal, setNewGoal] = useState('');
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        publicProfile: false,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Pradeep Kumar S', email: 'pradeep.kumar@sjce.ac.in',
        college: 'St. Joseph College of Engineering',
        department: 'AI & Data Science', year: '3rd Year',
        phone: '+91 98765 43210', location: 'Bangalore, India',
        dreamRole: 'Data Scientist', targetIndustry: 'Technology / AI',
        graduation: 'May 2027', linkedin: 'linkedin.com/in/pradeepkumar',
    });

    /* Load assessment from localStorage */
    const [latestScore, setLatestScore] = useState(87);
    const [userSkills, setUserSkills] = useState(SKILLS);
    
    useEffect(() => {
        try {
            const d = JSON.parse(localStorage.getItem('careerAssessment') || '{}');
            if (d?.score) setLatestScore(d.score);
            if (d?.skillRatings) {
                 const skillKeys = Object.keys(d.skillRatings);
                 const colorPalette = ['#6366f1', '#8b5cf6', '#a855f7', '#06b6d4', '#22c55e', '#ec4899', '#f97316', '#eab308'];
                 
                 const dynamicSkills = skillKeys.map((key, i) => {
                     const name = key.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                     const percentage = (d.skillRatings[key] / 5) * 100;
                     return { name, value: percentage, color: colorPalette[i % colorPalette.length] };
                 });
                 if (dynamicSkills.length > 0) setUserSkills(dynamicSkills);
            }
        } catch { }
    }, []);

    const toggleGoal = (id: number) =>
        setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
    const removeCareer = (id: number) =>
        setSavedCareers(prev => prev.filter(c => c.id !== id));
    const addGoal = () => {
        if (!newGoal.trim()) return;
        setGoals(prev => [...prev, { id: Date.now(), text: newGoal.trim(), done: false, deadline: 'TBD' }]);
        setNewGoal('');
    };
    const toggleSetting = (k: string) =>
        setSettings(prev => ({ ...prev, [k]: !prev[k as keyof typeof settings] }));

    const completedGoals = goals.filter(g => g.done).length;
    const profileStrength = Math.round(
        (Object.values(profileData).filter(Boolean).length / Object.keys(profileData).length) * 100
    );

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* ── Hero banner ────────────────────────────────────────── */}
                <section className={styles.hero}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.container}>
                        <motion.div
                            className={styles.heroContent}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Avatar */}
                            <div className={styles.avatarWrap}>
                                <div className={styles.avatar}>
                                    <span className={styles.avatarInitials}>
                                        {profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </span>
                                    <button className={styles.avatarEditBtn} title="Change photo">
                                        <Camera size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.heroInfo}>
                                <h1 className={styles.profileName}>
                                    {profileData.name.split(' ')[0]}{' '}
                                    <span className={styles.gradientText}>{profileData.name.split(' ').slice(1).join(' ')}</span>
                                </h1>
                                <p className={styles.profileEmail}>{profileData.email}</p>
                                <div className={styles.heroBadges}>
                                    <span className={styles.heroBadge}><Sparkles size={12} /> Premium Member</span>
                                    <span className={styles.heroBadge}><Star size={12} /> {ASSESSMENTS.length} Assessments</span>
                                    <span className={styles.heroBadge}><GraduationCap size={12} /> {profileData.department}</span>
                                </div>
                            </div>
                            {/* Quick stats */}
                            <div className={styles.heroStats}>
                                <div className={styles.heroStat}>
                                    <span className={styles.heroStatVal}>{latestScore}%</span>
                                    <span className={styles.heroStatLabel}>Last Score</span>
                                </div>
                                <div className={styles.heroStatDiv} />
                                <div className={styles.heroStat}>
                                    <span className={styles.heroStatVal}>{savedCareers.length}</span>
                                    <span className={styles.heroStatLabel}>Saved</span>
                                </div>
                                <div className={styles.heroStatDiv} />
                                <div className={styles.heroStat}>
                                    <span className={styles.heroStatVal}>{completedGoals}/{goals.length}</span>
                                    <span className={styles.heroStatLabel}>Goals Done</span>
                                </div>
                                <div className={styles.heroStatDiv} />
                                <div className={styles.heroStat}>
                                    <span className={styles.heroStatVal}>{profileStrength}%</span>
                                    <span className={styles.heroStatLabel}>Profile</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Layout ─────────────────────────────────────────────── */}
                <section className={styles.body}>
                    <div className={styles.container}>
                        <div className={styles.layout}>

                            {/* ── Sidebar ──────────────────────────────────── */}
                            <motion.aside
                                className={styles.sidebar}
                                initial={{ opacity: 0, x: -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.sidebarCard}>
                                    {SIDEBAR.map(s => (
                                        <button
                                            key={s.id}
                                            className={`${styles.sidebarLink} ${activeSection === s.id ? styles.sidebarActive : ''}`}
                                            onClick={() => setActiveSection(s.id)}
                                        >
                                            <s.icon size={16} />
                                            <span>{s.label}</span>
                                            {activeSection === s.id && <ChevronRight size={14} className={styles.sidebarArrow} />}
                                        </button>
                                    ))}
                                    <div className={styles.sidebarDivider} />
                                    <button className={styles.logoutBtn}>
                                        <LogOut size={16} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </motion.aside>

                            {/* ── Main ───────────────────────────────────────── */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    className={styles.main2}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >

                                    {/* ══ DASHBOARD ══════════════════════════════ */}
                                    {activeSection === 'dashboard' && (
                                        <div className={styles.dashGrid}>
                                            {/* Score ring cards */}
                                            <div className={styles.ringsRow}>
                                                {[
                                                    { label: 'Assessment Score', value: latestScore, color: '#6366f1', sub: 'Latest result' },
                                                    { label: 'Profile Strength', value: profileStrength, color: '#22c55e', sub: 'Complete your info' },
                                                    { label: 'Goals Progress', value: Math.round((completedGoals / goals.length) * 100), color: '#f59e0b', sub: `${completedGoals}/${goals.length} done` },
                                                    { label: 'Top Match Score', value: SAVED_CAREERS[0].match, color: '#ec4899', sub: SAVED_CAREERS[0].title },
                                                ].map((ring, i) => (
                                                    <motion.div
                                                        key={ring.label}
                                                        className={styles.ringCard}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        whileHover={{ y: -4 }}
                                                    >
                                                        <div className={styles.ringWrap}>
                                                            <RingChart value={ring.value} color={ring.color} size={80} />
                                                            <span className={styles.ringVal} style={{ color: ring.color }}>{ring.value}%</span>
                                                        </div>
                                                        <div className={styles.ringLabel}>{ring.label}</div>
                                                        <div className={styles.ringSub}>{ring.sub}</div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Skills Radar & Bars */}
                                            <motion.div
                                                className={styles.card}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Zap size={17} /> Skills Radar Analysis</div>
                                                    <Link href="/assessment">
                                                        <button className={styles.cardAction}><RefreshCw size={13} /> Retake</button>
                                                    </Link>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 1fr', gap: '2rem', alignItems: 'center' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <SpiderChart skills={userSkills.slice(0, 8)} />
                                                    </div>
                                                    <div className={styles.skillsList} style={{ flex: 1.5 }}>
                                                        {userSkills.map((s, i) => (
                                                            <div key={s.name} className={styles.skillRow}>
                                                                <span className={styles.skillName} title={s.name}>{s.name}</span>
                                                                <div className={styles.skillTrack}>
                                                                    <motion.div
                                                                        className={styles.skillFill}
                                                                        style={{ background: s.color }}
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${s.value}%` }}
                                                                        transition={{ duration: 1.2, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
                                                                    />
                                                                </div>
                                                                <span className={styles.skillVal} style={{ color: s.color }}>{s.value.toFixed(0)}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Activity Heatmap */}
                                            <motion.div
                                                className={styles.card}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><CalendarDays size={17} /> Activity (8 weeks)</div>
                                                </div>
                                                <div className={styles.heatmap}>
                                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                                                        <span key={d} className={styles.heatmapDay}>{d}</span>
                                                    ))}
                                                    {ACTIVITY.map((a, i) => (
                                                        <div
                                                            key={i}
                                                            className={styles.heatCell}
                                                            title={`${a.count} activities`}
                                                            style={{
                                                                background: a.count === 0
                                                                    ? 'var(--border-subtle)'
                                                                    : `rgba(99,102,241,${Math.min(a.count / 7, 1)})`,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <div className={styles.heatLegend}>
                                                    <span>Less</span>
                                                    {[0.15, 0.35, 0.55, 0.75, 0.95].map(o => (
                                                        <div key={o} className={styles.heatLegendCell} style={{ background: `rgba(99,102,241,${o})` }} />
                                                    ))}
                                                    <span>More</span>
                                                </div>
                                            </motion.div>

                                            {/* Quick Actions */}
                                            <motion.div
                                                className={styles.card}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.35 }}
                                            >
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Zap size={17} /> Quick Actions</div>
                                                </div>
                                                <div className={styles.quickActions}>
                                                    {[
                                                        { icon: Sparkles, label: 'Take Assessment', href: '/assessment', color: '#6366f1' },
                                                        { icon: MessageCircle, label: 'Chat with Aria', href: '/chat', color: '#8b5cf6' },
                                                        { icon: BookOpen, label: 'Browse Resources', href: '/resources', color: '#06b6d4' },
                                                        { icon: Globe, label: 'Explore Careers', href: '/careers', color: '#22c55e' },
                                                        { icon: BarChart3, label: 'View Results', href: '/results', color: '#f59e0b' },
                                                        { icon: Download, label: 'Download Report', href: '/results', color: '#ec4899' },
                                                    ].map(a => (
                                                        <Link key={a.label} href={a.href}>
                                                            <motion.button
                                                                className={styles.quickAction}
                                                                whileHover={{ scale: 1.04 }}
                                                                whileTap={{ scale: 0.96 }}
                                                                style={{ '--qa-color': a.color } as React.CSSProperties}
                                                            >
                                                                <a.icon size={18} style={{ color: a.color }} />
                                                                <span>{a.label}</span>
                                                                <ArrowRight size={13} className={styles.qaArrow} />
                                                            </motion.button>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            {/* Continue Your Journey */}
                                            <motion.div
                                                className={styles.card}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Target size={17} /> Continue Your Journey</div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    <Link href="/pathway">
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', flexShrink: 0 }}>
                                                                <Route size={22} color="#6366f1" />
                                                            </div>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <h4 style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-primary)', fontWeight: 600 }}>Learning Pathways</h4>
                                                                <p style={{ margin: '0.25rem 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Resume your personalized roadmaps to achieve your dream career.</p>
                                                            </div>
                                                            <ArrowRight size={18} color="var(--accent-primary)" />
                                                        </div>
                                                    </Link>
                                                    <Link href="/resources">
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', flexShrink: 0 }}>
                                                                <BookOpen size={22} color="#22c55e" />
                                                            </div>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <h4 style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-primary)', fontWeight: 600 }}>Tutor Video Resources</h4>
                                                                <p style={{ margin: '0.25rem 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Continue watching curated tutorials and expert breakdowns.</p>
                                                            </div>
                                                            <ArrowRight size={18} color="var(--accent-primary)" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* ══ PROFILE INFO ══════════════════════════ */}
                                    {activeSection === 'profile' && (
                                        <div className={styles.sectionStack}>
                                            <div className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><User size={17} /> Personal Information</div>
                                                    <button className={styles.cardAction} onClick={() => setIsEditing(!isEditing)}>
                                                        <Edit3 size={13} /> {isEditing ? 'Save' : 'Edit'}
                                                    </button>
                                                </div>
                                                <div className={styles.infoGrid}>
                                                    {[
                                                        { icon: User, label: 'Full Name', key: 'name' },
                                                        { icon: Mail, label: 'Email', key: 'email' },
                                                        { icon: Phone, label: 'Phone', key: 'phone' },
                                                        { icon: MapPin, label: 'Location', key: 'location' },
                                                        { icon: GraduationCap, label: 'College', key: 'college' },
                                                        { icon: BookOpen, label: 'Department', key: 'department' },
                                                        { icon: CalendarDays, label: 'Year', key: 'year' },
                                                        { icon: CalendarDays, label: 'Graduation', key: 'graduation' },
                                                    ].map(({ icon: Icon, label, key }) => (
                                                        <div key={key} className={styles.infoItem}>
                                                            <Icon size={14} className={styles.infoIcon} />
                                                            <div>
                                                                <span className={styles.infoLabel}>{label}</span>
                                                                {isEditing ? (
                                                                    <input
                                                                        className={styles.infoInput}
                                                                        value={profileData[key as keyof typeof profileData]}
                                                                        onChange={e => setProfileData(p => ({ ...p, [key]: e.target.value }))}
                                                                    />
                                                                ) : (
                                                                    <span className={styles.infoValue}>{profileData[key as keyof typeof profileData]}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Briefcase size={17} /> Career Goals</div>
                                                    <button className={styles.cardAction} onClick={() => setIsEditing(!isEditing)}>
                                                        <Edit3 size={13} /> {isEditing ? 'Save' : 'Edit'}
                                                    </button>
                                                </div>
                                                <div className={styles.infoGrid}>
                                                    {[
                                                        { icon: Target, label: 'Dream Role', key: 'dreamRole' },
                                                        { icon: Globe, label: 'Target Industry', key: 'targetIndustry' },
                                                        { icon: MapPin, label: 'Preferred Location', key: 'location' },
                                                        { icon: Layers, label: 'LinkedIn', key: 'linkedin' },
                                                    ].map(({ icon: Icon, label, key }) => (
                                                        <div key={key} className={styles.infoItem}>
                                                            <Icon size={14} className={styles.infoIcon} />
                                                            <div>
                                                                <span className={styles.infoLabel}>{label}</span>
                                                                {isEditing ? (
                                                                    <input
                                                                        className={styles.infoInput}
                                                                        value={profileData[key as keyof typeof profileData]}
                                                                        onChange={e => setProfileData(p => ({ ...p, [key]: e.target.value }))}
                                                                    />
                                                                ) : (
                                                                    <span className={styles.infoValue}>{profileData[key as keyof typeof profileData]}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ══ ASSESSMENT HISTORY ════════════════════ */}
                                    {activeSection === 'assessments' && (
                                        <div className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <div className={styles.cardTitle}><History size={17} /> Assessment History</div>
                                                <Link href="/assessment">
                                                    <button className={styles.cardAction}><Sparkles size={13} /> New Assessment</button>
                                                </Link>
                                            </div>
                                            <div className={styles.assessList}>
                                                {ASSESSMENTS.map((a, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className={styles.assessItem}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <div className={styles.assessLeft}>
                                                            <span className={styles.assessIcon}>{a.icon}</span>
                                                            <div>
                                                                <div className={styles.assessTitle}>{a.title}</div>
                                                                <div className={styles.assessDate}><Clock size={11} /> {a.date}</div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.assessRight}>
                                                            <div className={styles.assessScore} style={{ color: a.score >= 85 ? '#22c55e' : '#f59e0b' }}>
                                                                <RingChart value={a.score} color={a.score >= 85 ? '#22c55e' : '#f59e0b'} size={48} />
                                                                <span className={styles.assessScoreNum}>{a.score}%</span>
                                                            </div>
                                                            <Link href="/results">
                                                                <button className={styles.viewBtn}><Eye size={13} /> View</button>
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* ══ SAVED CAREERS ═════════════════════════ */}
                                    {activeSection === 'saved' && (
                                        <div className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <div className={styles.cardTitle}><BookmarkCheck size={17} /> Saved Careers</div>
                                                <span className={styles.cardBadge}>{savedCareers.length} saved</span>
                                            </div>
                                            {savedCareers.length === 0 ? (
                                                <div className={styles.emptyState}>
                                                    <BookmarkCheck size={40} opacity={.3} />
                                                    <p>No saved careers yet.</p>
                                                    <Link href="/careers"><button className={styles.cardAction}>Explore Careers</button></Link>
                                                </div>
                                            ) : (
                                                <div className={styles.savedList}>
                                                    {savedCareers.map((c, i) => (
                                                        <motion.div
                                                            key={c.id}
                                                            className={styles.savedItem}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.08 }}
                                                            layout
                                                        >
                                                            <span className={styles.savedIcon}>{c.icon}</span>
                                                            <div className={styles.savedInfo}>
                                                                <div className={styles.savedTitle}>{c.title}</div>
                                                                <div className={styles.savedMeta}>
                                                                    <span>{c.category}</span>
                                                                    <span><DollarSign size={11} />{c.salary}</span>
                                                                </div>
                                                            </div>
                                                            <div className={styles.savedActions}>
                                                                <span className={styles.matchBadge}>
                                                                    <Star size={12} /> {c.match}%
                                                                </span>
                                                                <Link href={`/careers/${c.id}`}>
                                                                    <button className={styles.viewBtn}><Eye size={13} /></button>
                                                                </Link>
                                                                <button className={styles.removeBtn} onClick={() => removeCareer(c.id)}>
                                                                    <Trash2 size={13} />
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ══ GOALS & ROADMAP ════════════════════════ */}
                                    {activeSection === 'goals' && (
                                        <div className={styles.sectionStack}>
                                            {/* Goals */}
                                            <div className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Target size={17} /> My Goals</div>
                                                    <span className={styles.cardBadge}>{completedGoals}/{goals.length}</span>
                                                </div>
                                                {/* Progress bar */}
                                                <div className={styles.goalsProgress}>
                                                    <div className={styles.goalsProgressTrack}>
                                                        <motion.div
                                                            className={styles.goalsProgressFill}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(completedGoals / goals.length) * 100}%` }}
                                                            transition={{ duration: 1.2, ease: 'easeOut' }}
                                                        />
                                                    </div>
                                                    <span className={styles.goalsProgressLabel}>
                                                        {Math.round((completedGoals / goals.length) * 100)}% complete
                                                    </span>
                                                </div>
                                                {/* Goal list */}
                                                <div className={styles.goalsList}>
                                                    {goals.map((g, i) => (
                                                        <motion.div
                                                            key={g.id}
                                                            className={`${styles.goalItem} ${g.done ? styles.goalDone : ''}`}
                                                            initial={{ opacity: 0, x: -16 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.07 }}
                                                            layout
                                                        >
                                                            <button className={styles.goalCheckbox} onClick={() => toggleGoal(g.id)}>
                                                                {g.done
                                                                    ? <CheckCircle2 size={20} style={{ color: '#22c55e' }} />
                                                                    : <Circle size={20} style={{ color: 'var(--text-muted)' }} />
                                                                }
                                                            </button>
                                                            <div className={styles.goalText}>{g.text}</div>
                                                            <div className={styles.goalDeadline}><Clock size={11} /> {g.deadline}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                {/* Add goal */}
                                                <div className={styles.addGoalRow}>
                                                    <input
                                                        className={styles.addGoalInput}
                                                        placeholder="Add a new goal..."
                                                        value={newGoal}
                                                        onChange={e => setNewGoal(e.target.value)}
                                                        onKeyDown={e => e.key === 'Enter' && addGoal()}
                                                    />
                                                    <button className={styles.addGoalBtn} onClick={addGoal}>
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Roadmap timeline */}
                                            <div className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><TrendingUp size={17} /> Career Roadmap</div>
                                                </div>
                                                <div className={styles.timeline}>
                                                    {ROADMAP.map((step, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={styles.timelineItem}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.12 }}
                                                        >
                                                            <div className={styles.timelineDot} style={{ borderColor: step.color, background: step.done ? step.color : 'transparent' }}>
                                                                {step.done && <CheckCircle2 size={10} color="#fff" />}
                                                            </div>
                                                            <div className={styles.timelineLine} style={{ background: step.done ? step.color : 'var(--border-subtle)' }} />
                                                            <div className={styles.timelineBody}>
                                                                <div className={styles.timelineHeader}>
                                                                    <span className={styles.timelineTitle} style={{ color: step.color }}>{step.title}</span>
                                                                    <span className={styles.timelinePeriod}>{step.period}</span>
                                                                    {step.done && <span className={styles.donePill}>✓ Done</span>}
                                                                </div>
                                                                <p className={styles.timelineDesc}>{step.desc}</p>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ══ SETTINGS ══════════════════════════════ */}
                                    {activeSection === 'settings' && (
                                        <div className={styles.sectionStack}>
                                            <div className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Bell size={17} /> Notifications</div>
                                                </div>
                                                {[
                                                    { key: 'emailNotifications', title: 'Email Notifications', desc: 'Career updates and assessment reminders via email' },
                                                    { key: 'pushNotifications', title: 'Push Notifications', desc: 'Browser notifications for important updates' },
                                                ].map(s => (
                                                    <div key={s.key} className={styles.settingRow}>
                                                        <div>
                                                            <div className={styles.settingTitle}>{s.title}</div>
                                                            <div className={styles.settingDesc}>{s.desc}</div>
                                                        </div>
                                                        <button
                                                            className={`${styles.toggle} ${settings[s.key as keyof typeof settings] ? styles.toggleOn : ''}`}
                                                            onClick={() => toggleSetting(s.key)}
                                                        >
                                                            <div className={styles.toggleDot} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.card}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.cardTitle}><Shield size={17} /> Privacy</div>
                                                </div>
                                                <div className={styles.settingRow}>
                                                    <div>
                                                        <div className={styles.settingTitle}>Public Profile</div>
                                                        <div className={styles.settingDesc}>Let other students see your career profile and achievements</div>
                                                    </div>
                                                    <button
                                                        className={`${styles.toggle} ${settings.publicProfile ? styles.toggleOn : ''}`}
                                                        onClick={() => toggleSetting('publicProfile')}
                                                    >
                                                        <div className={styles.toggleDot} />
                                                    </button>
                                                </div>

                                                <div className={styles.dangerZone}>
                                                    <h3 className={styles.dangerTitle}>⚠️ Danger Zone</h3>
                                                    <p className={styles.dangerDesc}>Deleting your account is permanent. All data will be removed.</p>
                                                    <button className={styles.dangerBtn}>
                                                        <Trash2 size={14} /> Delete Account
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

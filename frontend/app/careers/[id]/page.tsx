'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Bookmark,
    BookmarkCheck,
    Briefcase,
    Building2,
    DollarSign,
    GraduationCap,
    TrendingUp,
    CheckCircle2,
    BookOpen,
    Star,
    Sparkles,
    Clock,
    ThumbsUp,
    ThumbsDown,
    Building,
    LineChart
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import { getCareerById, Career } from '@/data/careers';
import styles from './page.module.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function CareerDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const [career, setCareer] = useState<Career | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const data = getCareerById(params.id);
        if (data) {
            setCareer(data);
            // Simulate fetching bookmark status from local storage
            const bookmarksStr = localStorage.getItem('careerBookmarks');
            if (bookmarksStr) {
                const bookmarks = JSON.parse(bookmarksStr);
                setIsBookmarked(bookmarks.includes(data.id));
            }
        }
    }, [params.id]);

    const toggleBookmark = () => {
        if (!career) return;
        const newStatus = !isBookmarked;
        setIsBookmarked(newStatus);

        const bookmarksStr = localStorage.getItem('careerBookmarks');
        let bookmarks = bookmarksStr ? JSON.parse(bookmarksStr) : [];
        if (newStatus) {
            bookmarks.push(career.id);
        } else {
            bookmarks = bookmarks.filter((id: string) => id !== career.id);
        }
        localStorage.setItem('careerBookmarks', JSON.stringify(bookmarks));
    };

    if (!mounted) return null;

    if (!career) {
        return (
            <>
                <Navbar />
                <main className={styles.main}>
                    <div className={styles.notFound}>
                        <Briefcase size={64} style={{ opacity: 0.5 }} />
                        <h1>Career Not Found</h1>
                        <p>We couldn't find the career path you're looking for.</p>
                        <Link href="/careers" className={styles.backLink} style={{ marginTop: '2rem' }}>
                            <ArrowLeft size={16} /> Back to Careers
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero / Header Section */}
                <section className={styles.hero}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />

                    <div className={styles.container}>
                        <motion.div
                            className={styles.heroContent}
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <button onClick={() => router.back()} className={styles.backLink}>
                                <ArrowLeft size={16} /> Back to Explorer
                            </button>

                            <div className={styles.headerTop}>
                                <div className={styles.titleArea}>
                                    <div className={styles.iconWrapper}>
                                        {career.icon}
                                    </div>
                                    <div>
                                        <div className={styles.categoryBadge}>{career.category}</div>
                                        <h1 className={styles.careerTitle}>{career.title}</h1>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Star size={14} color="#fbbf24" fill="#fbbf24" />
                                                {career.match}% Match
                                            </span>
                                            {career.trending && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981' }}>
                                                    <TrendingUp size={14} /> Trending Role
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}
                                    onClick={toggleBookmark}
                                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Career"}
                                >
                                    {isBookmarked ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
                                </button>
                            </div>

                            {/* Key Stats Grid */}
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}><DollarSign size={20} /></div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statLabel}>Avg. Starting Salary</span>
                                        <span className={styles.statValue}>{career.salary}</span>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}><TrendingUp size={20} /></div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statLabel}>Growth Potential</span>
                                        <span className={styles.statValue}>{career.growth}</span>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}><GraduationCap size={20} /></div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statLabel}>Min. Education</span>
                                        <span className={styles.statValue}>{career.education}</span>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}><BookOpen size={20} /></div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statLabel}>Field/Industry</span>
                                        <span className={styles.statValue}>{career.category}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className={styles.contentSection}>
                    <div className={styles.container}>
                        <div className={styles.contentGrid}>
                            {/* Main Details (Left Col) */}
                            <motion.div
                                className={styles.mainCol}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className={styles.sectionCard}>
                                    <h2 className={styles.sectionTitle}>
                                        <Briefcase size={22} /> About the Role
                                    </h2>
                                    <p className={styles.sectionText}>{career.about}</p>
                                </div>

                                <div className={styles.sectionCard}>
                                    <h2 className={styles.sectionTitle}>
                                        <CheckCircle2 size={22} /> Key Responsibilities
                                    </h2>
                                    <ul className={styles.list}>
                                        {career.responsibilities.map((resp, i) => (
                                            <li key={i} className={styles.listItem}>
                                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.sectionCard}>
                                    <h2 className={styles.sectionTitle}>
                                        <Sparkles size={22} /> Required Skills
                                    </h2>
                                    <div className={styles.skillsContainer}>
                                        {career.skills.map((skill, i) => (
                                            <span key={i} className={styles.skillTag}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {career.dayInLife && career.dayInLife.length > 0 && (
                                    <div className={styles.sectionCard}>
                                        <h2 className={styles.sectionTitle}>
                                            <Clock size={22} /> A Day in the Life
                                        </h2>
                                        <div className={styles.timeline}>
                                            {career.dayInLife.map((item, i) => (
                                                <div key={i} className={styles.timelineItem} style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '1rem', position: 'relative', paddingBottom: '1.5rem' }}>
                                                    <div style={{ position: 'absolute', left: '-5px', top: '0', height: '8px', width: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>{item.time}</span>
                                                    <p style={{ margin: 0, color: 'var(--text-primary)' }}>{item.activity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(career.pros || career.cons) && (
                                    <div className={styles.prosConsGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        {career.pros && (
                                            <div className={styles.sectionCard} style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                                                <h2 className={styles.sectionTitle} style={{ color: '#10b981' }}>
                                                    <ThumbsUp size={22} /> Pros
                                                </h2>
                                                <ul className={styles.list}>
                                                    {career.pros.map((pro, i) => (
                                                        <li key={i} className={styles.listItem}>
                                                            <CheckCircle2 size={16} color="#10b981" style={{minWidth: '16px'}} />
                                                            <span>{pro}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {career.cons && (
                                            <div className={styles.sectionCard} style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                                                <h2 className={styles.sectionTitle} style={{ color: '#ef4444' }}>
                                                    <ThumbsDown size={22} /> Cons
                                                </h2>
                                                <ul className={styles.list}>
                                                    {career.cons.map((con, i) => (
                                                        <li key={i} className={styles.listItem}>
                                                            <div style={{minWidth: '4px', height: '4px', borderRadius: '50%', background: '#ef4444', marginTop: '8px'}}></div>
                                                            <span>{con}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Sidebar (Right Col) */}
                            <motion.div
                                className={styles.sideCol}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className={styles.sectionCard}>
                                    <h2 className={styles.sectionTitle}>
                                        <Building2 size={22} /> Top Institutes
                                    </h2>
                                    <p className={styles.sectionText} style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                        Best colleges and universities in India offering programs related to this career path:
                                    </p>
                                    <div className={styles.collegeList}>
                                        {career.topColleges.map((college, i) => (
                                            <div key={i} className={styles.collegeItem}>
                                                <div className={styles.collegeInfo}>
                                                    <span className={styles.collegeName}>{college.name}</span>
                                                    <span className={styles.collegeLocation}>{college.location}</span>
                                                </div>
                                                <span className={styles.collegeRanking}>{college.ranking}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {career.salaryGrowth && career.salaryGrowth.length > 0 && (
                                    <div className={styles.sectionCard}>
                                        <h2 className={styles.sectionTitle}>
                                            <LineChart size={22} /> Salary Growth
                                        </h2>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {career.salaryGrowth.map((growth, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{growth.level}</span>
                                                    <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{growth.range}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {career.topRecruiters && career.topRecruiters.length > 0 && (
                                    <div className={styles.sectionCard}>
                                        <h2 className={styles.sectionTitle}>
                                            <Building size={22} /> Top Recruiters
                                        </h2>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {career.topRecruiters.map((recruiter, i) => (
                                                <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.85rem' }}>
                                                    {recruiter}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className={`${styles.sectionCard} ${styles.assessmentCard}`} style={{ background: 'linear-gradient(145deg, rgba(88,28,135,0.1) 0%, rgba(30,58,138,0.1) 100%)', borderColor: 'rgba(139,92,246,0.3)' }}>
                                    <h2 className={styles.sectionTitle} style={{ color: 'var(--text-primary)' }}>
                                        Not quite sure?
                                    </h2>
                                    <p className={styles.sectionText} style={{ marginBottom: '1.5rem' }}>
                                        See if {career.title} is truly the right fit for your skills and personality.
                                    </p>
                                    <Link href="/assessment" style={{ display: 'block' }}>
                                        <button className={styles.skillTag} style={{ width: '100%', padding: '0.75rem', background: 'var(--accent-primary)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                            Take Career Assessment <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

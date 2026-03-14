'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Briefcase,
    TrendingUp,
    DollarSign,
    GraduationCap,
    ArrowRight,
    Star,
    Bookmark,
    BookmarkCheck,
    X,
    ChevronDown,
    Sparkles,
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import { careersData, Career } from '@/data/careers';
import styles from './page.module.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};



const categories = ['All', 'Technology', 'Business', 'Creative', 'Healthcare', 'Engineering', 'Science'];
const growthFilters = ['All', 'Very High', 'High', 'Medium', 'Growing', 'Stable'];
const educationFilters = ['All', "Bachelor's Degree", "Master's Preferred", "Master's/Doctorate", 'Doctorate', "Bachelor's/MBA"];

export default function CareersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGrowth, setSelectedGrowth] = useState('All');
    const [selectedEducation, setSelectedEducation] = useState('All');
    const [sortBy, setSortBy] = useState('match');
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarked, setBookmarked] = useState<string[]>([]);
    const [showTrendingOnly, setShowTrendingOnly] = useState(false);

    const filteredCareers = useMemo(() => {
        let result = careersData;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (career) =>
                    career.title.toLowerCase().includes(query) ||
                    career.description.toLowerCase().includes(query) ||
                    career.skills.some((skill) => skill.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            result = result.filter((career) => career.category === selectedCategory);
        }

        // Growth filter
        if (selectedGrowth !== 'All') {
            result = result.filter((career) => career.growth === selectedGrowth);
        }

        // Education filter
        if (selectedEducation !== 'All') {
            result = result.filter((career) => career.education === selectedEducation);
        }

        // Trending filter
        if (showTrendingOnly) {
            result = result.filter((career) => career.trending);
        }

        // Sorting
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case 'match':
                    return b.match - a.match;
                case 'salary':
                    return parseInt(b.salary.split('-')[1]) - parseInt(a.salary.split('-')[1]);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [searchQuery, selectedCategory, selectedGrowth, selectedEducation, sortBy, showTrendingOnly]);

    const toggleBookmark = (id: string) => {
        setBookmarked((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedGrowth('All');
        setSelectedEducation('All');
        setShowTrendingOnly(false);
    };

    const hasActiveFilters =
        searchQuery || selectedCategory !== 'All' || selectedGrowth !== 'All' || selectedEducation !== 'All' || showTrendingOnly;

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
                                <Briefcase size={14} />
                                Career Explorer
                            </span>
                            <h1 className={styles.heroTitle}>
                                Explore 500+ Career
                                <br />
                                <span className={styles.gradientText}>Opportunities</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Browse through our comprehensive database of careers across
                                various industries. Find the perfect match for your skills and interests.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Search & Filter Section */}
                <section className={styles.filterSection}>
                    <div className={styles.container}>
                        <div className={styles.searchRow}>
                            <div className={styles.searchBox}>
                                <Search size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search careers, skills, or keywords..."
                                    className={styles.searchInput}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className={styles.clearSearch}>
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <button
                                className={`${styles.filterToggle} ${showFilters ? styles.filterActive : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={18} />
                                Filters
                                <ChevronDown size={16} className={showFilters ? styles.rotated : ''} />
                            </button>
                        </div>

                        {/* Filter Panel */}
                        {showFilters && (
                            <motion.div
                                className={styles.filterPanel}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.filterGroup}>
                                    <label className={styles.filterLabel}>Category</label>
                                    <div className={styles.filterTags}>
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                className={`${styles.filterTag} ${selectedCategory === cat ? styles.filterTagActive : ''}`}
                                                onClick={() => setSelectedCategory(cat)}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.filterGroup}>
                                    <label className={styles.filterLabel}>Growth Potential</label>
                                    <div className={styles.filterTags}>
                                        {growthFilters.map((growth) => (
                                            <button
                                                key={growth}
                                                className={`${styles.filterTag} ${selectedGrowth === growth ? styles.filterTagActive : ''}`}
                                                onClick={() => setSelectedGrowth(growth)}
                                            >
                                                {growth}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.filterRow}>
                                    <div className={styles.filterGroup}>
                                        <label className={styles.filterLabel}>Education Level</label>
                                        <select
                                            value={selectedEducation}
                                            onChange={(e) => setSelectedEducation(e.target.value)}
                                            className={styles.filterSelect}
                                        >
                                            {educationFilters.map((edu) => (
                                                <option key={edu} value={edu}>{edu}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={styles.filterGroup}>
                                        <label className={styles.filterLabel}>Sort By</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className={styles.filterSelect}
                                        >
                                            <option value="match">Best Match</option>
                                            <option value="salary">Highest Salary</option>
                                            <option value="title">Alphabetical</option>
                                        </select>
                                    </div>

                                    <div className={styles.filterGroup}>
                                        <label className={styles.filterLabel}>&nbsp;</label>
                                        <button
                                            className={`${styles.trendingToggle} ${showTrendingOnly ? styles.trendingActive : ''}`}
                                            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                                        >
                                            <TrendingUp size={16} />
                                            Trending Only
                                        </button>
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <button className={styles.clearFilters} onClick={clearFilters}>
                                        <X size={16} />
                                        Clear All Filters
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {/* Results Count */}
                        <div className={styles.resultsInfo}>
                            <span>
                                Showing <strong>{filteredCareers.length}</strong> careers
                                {hasActiveFilters && ' (filtered)'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Careers Grid */}
                <section className={styles.careersSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.careersGrid}
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {filteredCareers.map((career) => (
                                <motion.div
                                    key={career.id}
                                    className={styles.careerCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -8 }}
                                >
                                    {career.trending && (
                                        <span className={styles.trendingBadge}>
                                            <TrendingUp size={12} />
                                            Trending
                                        </span>
                                    )}

                                    <button
                                        className={`${styles.bookmarkBtn} ${bookmarked.includes(career.id) ? styles.bookmarked : ''}`}
                                        onClick={() => toggleBookmark(career.id)}
                                    >
                                        {bookmarked.includes(career.id) ? (
                                            <BookmarkCheck size={18} />
                                        ) : (
                                            <Bookmark size={18} />
                                        )}
                                    </button>

                                    <div className={styles.careerIcon}>{career.icon}</div>

                                    <div className={styles.careerCategory}>{career.category}</div>

                                    <h3 className={styles.careerTitle}>{career.title}</h3>

                                    <p className={styles.careerDescription}>{career.description}</p>

                                    <div className={styles.careerMeta}>
                                        <div className={styles.metaItem}>
                                            <DollarSign size={14} />
                                            <span>{career.salary}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <GraduationCap size={14} />
                                            <span>{career.education}</span>
                                        </div>
                                    </div>

                                    <div className={styles.careerSkills}>
                                        {career.skills.slice(0, 3).map((skill) => (
                                            <span key={skill} className={styles.skillTag}>{skill}</span>
                                        ))}
                                        {career.skills.length > 3 && (
                                            <span className={styles.skillMore}>+{career.skills.length - 3}</span>
                                        )}
                                    </div>

                                    <div className={styles.careerFooter}>
                                        <div className={styles.matchScore}>
                                            <Star size={14} />
                                            <span>{career.match}% Match</span>
                                        </div>
                                        <Link href={`/careers/${career.id}`}>
                                            <button className={styles.viewBtn}>
                                                View Details
                                                <ArrowRight size={14} />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredCareers.length === 0 && (
                            <div className={styles.noResults}>
                                <div className={styles.noResultsIcon}>🔍</div>
                                <h3>No careers found</h3>
                                <p>Try adjusting your search or filters</p>
                                <button className={styles.clearFiltersBtn} onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        )}
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
                                    Not Sure Which Career
                                    <br />
                                    <span className={styles.gradientText}>Is Right For You?</span>
                                </h2>
                                <p className={styles.ctaSubtitle}>
                                    Take our AI-powered assessment to get personalized career
                                    recommendations based on your unique profile.
                                </p>
                                <Link href="/assessment">
                                    <motion.button
                                        className={styles.ctaButton}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Sparkles size={18} />
                                        Take Free Assessment
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

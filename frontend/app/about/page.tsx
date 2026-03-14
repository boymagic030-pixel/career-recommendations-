'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Target,
    Users,
    Heart,
    Shield,
    Zap,
    Award,
    BookOpen,
    Lightbulb,
    TrendingUp,
    Globe,
    Code,
    Brain,
    Database,
    ArrowRight,
    Linkedin,
    Mail,
    GraduationCap,
} from 'lucide-react';
import { Navbar, Footer, AnimatedCounter } from '@/components';
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

const values = [
    {
        icon: Target,
        title: 'Precision',
        description: 'We strive for accuracy in every recommendation, ensuring students receive guidance that truly matches their potential.',
    },
    {
        icon: Heart,
        title: 'Empathy',
        description: 'We understand the stress of career decisions and design our platform with compassion and user-friendliness.',
    },
    {
        icon: Shield,
        title: 'Trust',
        description: 'Your data privacy is paramount. We maintain the highest security standards and never compromise your information.',
    },
    {
        icon: Zap,
        title: 'Innovation',
        description: 'We continuously improve our AI algorithms and features to provide cutting-edge career guidance solutions.',
    },
];

const team = [
    {
        name: 'Meganathan N',
        role: 'Team Lead & ML Engineer',
        dept: 'AI & Data Science',
        avatar: '/team/meganathan.jpg',
        description: 'Leading the development of AI recommendation algorithms and system architecture.',
        skills: ['Machine Learning', 'Python', 'FastAPI'],
        linkedin: '#',
    },
    {
        name: 'Mithreshwaran G',
        role: 'Full Stack Developer',
        dept: 'AI & Data Science',
        avatar: '/team/mithreshwaran.jpg',
        description: 'Building the frontend experience and backend API infrastructure.',
        skills: ['Next.js', 'React', 'Node.js'],
        linkedin: '#',
    },
    {
        name: 'Pradeep Kumar S',
        role: 'Data Scientist',
        dept: 'AI & Data Science',
        avatar: '/team/pradeep.jpg',
        description: 'Analyzing career data and optimizing recommendation accuracy.',
        skills: ['Data Analysis', 'SQL', 'Deep Learning'],
        linkedin: '#',
    },
];

const mentor = {
    name: 'Ms. Priyanka R',
    role: 'Project Mentor',
    avatar: '/team/priyanka.jpg',
    description: 'Guiding the team with expertise in AI/ML and software development best practices.',
};

const techStack = [
    { name: 'Next.js', category: 'Frontend', icon: '⚛️' },
    { name: 'Python', category: 'Backend', icon: '🐍' },
    { name: 'FastAPI', category: 'API', icon: '⚡' },
    { name: 'PostgreSQL', category: 'Database', icon: '🗄️' },
    { name: 'OpenAI GPT', category: 'AI', icon: '🤖' },
    { name: 'TensorFlow', category: 'ML', icon: '🧠' },
];

const milestones = [
    { year: '2025', title: 'Project Inception', description: 'Initial concept and research phase began' },
    { year: '2025', title: 'Development Start', description: 'Core platform development initiated' },
    { year: '2026', title: 'Beta Launch', description: 'Initial testing with student groups' },
    { year: '2026', title: 'Full Release', description: 'Public launch and continuous improvement' },
];

const stats = [
    { value: 50000, suffix: '+', label: 'Students Helped' },
    { value: 500, suffix: '+', label: 'Careers Mapped' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 24, suffix: '/7', label: 'AI Availability' },
];

export default function AboutPage() {
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
                                <Sparkles size={14} />
                                About CareerAI
                            </span>
                            <h1 className={styles.heroTitle}>
                                Empowering Futures Through
                                <br />
                                <span className={styles.gradientText}>Intelligent Career Guidance</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                We're on a mission to democratize career guidance by leveraging
                                artificial intelligence to help every student discover their ideal
                                career path, regardless of their background or resources.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className={styles.missionSection}>
                    <div className={styles.container}>
                        <div className={styles.missionGrid}>
                            <motion.div
                                className={styles.missionContent}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={fadeInUp}
                                transition={{ duration: 0.6 }}
                            >
                                <span className={styles.badge}>
                                    <Target size={14} />
                                    Our Mission
                                </span>
                                <h2 className={styles.sectionTitle}>
                                    Bridging the Gap Between
                                    <br />
                                    <span className={styles.gradientText}>Potential & Opportunity</span>
                                </h2>
                                <p className={styles.missionText}>
                                    Career selection is one of the most critical decisions in a person's life,
                                    yet many students lack access to proper guidance. Traditional counseling is
                                    expensive, time-consuming, and often provides generic advice that doesn't
                                    account for individual uniqueness.
                                </p>
                                <p className={styles.missionText}>
                                    CareerAI was born from the realization that AI can democratize access to
                                    personalized career guidance. By analyzing skills, interests, personality
                                    traits, and market trends, we provide recommendations that are tailored to
                                    each individual's unique profile.
                                </p>
                            </motion.div>

                            <motion.div
                                className={styles.missionStats}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={staggerContainer}
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        className={styles.missionStatCard}
                                        variants={fadeInUp}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                    >
                                        <div className={styles.missionStatValue}>
                                            <AnimatedCounter
                                                value={stat.value}
                                                suffix={stat.suffix}
                                                duration={2}
                                                delay={0.3 + index * 0.1}
                                            />
                                        </div>
                                        <div className={styles.missionStatLabel}>{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className={styles.valuesSection}>
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
                                <Heart size={14} />
                                Our Values
                            </span>
                            <h2 className={styles.sectionTitle}>
                                The Principles That
                                <br />
                                <span className={styles.gradientText}>Guide Us</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.valuesGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    className={styles.valueCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className={styles.valueIcon}>
                                        <value.icon size={24} />
                                    </div>
                                    <h3 className={styles.valueTitle}>{value.title}</h3>
                                    <p className={styles.valueDescription}>{value.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section className={styles.teamSection} id="team">
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
                                <Users size={14} />
                                Our Team
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Meet the Minds Behind
                                <br />
                                <span className={styles.gradientText}>CareerAI</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                A passionate team of students from St. Joseph College of Engineering,
                                Department of AI & Data Science, dedicated to transforming career guidance.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.teamGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            {team.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    className={styles.teamCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className={styles.teamBadgeTop}>{member.dept}</div>
                                    <div className={styles.teamAvatar}>
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            width={80}
                                            height={80}
                                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                                            onError={(e: any) => {
                                                e.currentTarget.style.display = 'none';
                                                
                                                // Create initial letter placeholder if image fails to load
                                                const fallbackSpan = document.createElement('span');
                                                fallbackSpan.style.color = 'white';
                                                fallbackSpan.innerText = member.name.charAt(0);
                                                e.currentTarget.parentElement?.appendChild(fallbackSpan);
                                            }}
                                        />
                                    </div>
                                    <h3 className={styles.teamName}>{member.name}</h3>
                                    <span className={styles.teamRole}>{member.role}</span>
                                    <p className={styles.teamDescription}>{member.description}</p>
                                    
                                    <div className={styles.teamSkillsList}>
                                        {member.skills.map(skill => (
                                            <span key={skill} className={styles.skillTagSmall}>{skill}</span>
                                        ))}
                                    </div>

                                    <a href={member.linkedin} className={styles.teamSocial}>
                                        <Linkedin size={18} />
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Mentor */}
                        <motion.div
                            className={styles.mentorSection}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className={styles.mentorHeading}>Project Mentor</h3>
                            <div className={styles.mentorCard}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className={styles.teamBadgeTop}>Faculty Mentor</div>
                                    <div className={styles.mentorAvatar}>
                                        <Image
                                            src={mentor.avatar}
                                            alt={mentor.name}
                                            width={64}
                                            height={64}
                                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                                            onError={(e: any) => {
                                                e.currentTarget.style.display = 'none';
                                                
                                                // Create initial letter placeholder if image fails to load
                                                const fallbackSpan = document.createElement('span');
                                                fallbackSpan.style.color = 'white';
                                                fallbackSpan.innerText = mentor.name.charAt(0);
                                                e.currentTarget.parentElement?.appendChild(fallbackSpan);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.mentorInfo}>
                                    <h4 className={styles.mentorName}>{mentor.name}</h4>
                                    <span className={styles.mentorRole}>{mentor.role}</span>
                                    <p className={styles.mentorDescription}>{mentor.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Technology Section */}
                <section className={styles.techSection}>
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
                                <Code size={14} />
                                Technology
                            </span>
                            <h2 className={styles.sectionTitle}>
                                Powered by Modern
                                <br />
                                <span className={styles.gradientText}>Technology Stack</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.techGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                        >
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    className={styles.techCard}
                                    variants={fadeInUp}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className={styles.techIcon}>{tech.icon}</span>
                                    <h4 className={styles.techName}>{tech.name}</h4>
                                    <span className={styles.techCategory}>{tech.category}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Institution Section */}
                <section className={styles.institutionSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.institutionCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={styles.institutionIcon}>
                                <GraduationCap size={32} />
                            </div>
                            <h2 className={styles.institutionTitle}>
                                St. Joseph College of Engineering
                            </h2>
                            <p className={styles.institutionDept}>
                                Department of Artificial Intelligence & Data Science
                            </p>
                            <p className={styles.institutionText}>
                                This project is developed as part of our academic curriculum,
                                combining theoretical knowledge with practical application to
                                create a solution that can make a real difference in students' lives.
                            </p>
                            <div className={styles.institutionBadge}>
                                <Award size={16} />
                                Group 12 - Final Year Project
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
                                    Ready to Discover Your
                                    <br />
                                    <span className={styles.gradientText}>Perfect Career?</span>
                                </h2>
                                <p className={styles.ctaSubtitle}>
                                    Join thousands of students who have already found their
                                    ideal career path with CareerAI.
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

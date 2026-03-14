'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Map, Target, Play, Database, Server, Component,
    ChevronDown, Star, CheckCircle, Brain, Rocket, Code,
    Calculator, Stethoscope, Landmark, PenTool
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function PathwayVisualizerPage() {
    const [selectedPath, setSelectedPath] = useState('fullstack');

    const pathways = [
        { id: 'fullstack', label: 'Full-Stack Developer', icon: Component },
        { id: 'data', label: 'Data Scientist', icon: Database },
        { id: 'ca', label: 'Chartered Accountant', icon: Calculator },
        { id: 'doctor', label: 'Doctor (MBBS)', icon: Stethoscope },
        { id: 'upsc', label: 'UPSC Civil Services', icon: Landmark },
        { id: 'uiux', label: 'UI/UX Designer', icon: PenTool }
    ];

    const timelineData = {
        fullstack: [
            {
                id: 1,
                title: 'HTML, CSS, & Javascript Fundamentals',
                time: 'Months 1-2',
                desc: 'Master the core languages of the web. Learn DOM manipulation, modern ES6+ syntax, flexbox, and CSS grid to create responsive layouts.',
                icon: Code,
                milestone: false,
                skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Git Basics']
            },
            {
                id: 2,
                title: 'Frontend Frameworks (React)',
                time: 'Months 3-4',
                desc: 'Dive into component-based architecture. Learn state management (Hooks, Redux) and routing to build dynamic Single Page Applications (SPAs).',
                icon: Component,
                milestone: true,
                skills: ['React.js', 'Next.js', 'Tailwind CSS', 'State Management']
            },
            {
                id: 3,
                title: 'Backend Development (Node & API)',
                time: 'Months 5-6',
                desc: 'Transition to the server side. Create RESTful APIs or GraphQL endpoints, handle user authentication, and manage server logic.',
                icon: Server,
                milestone: false,
                skills: ['Node.js', 'Express', 'REST API', 'JWT Auth']
            },
            {
                id: 4,
                title: 'Database Management',
                time: 'Months 7-8',
                desc: 'Learn how to securely store, query, and manage application data using both relational (SQL) and non-relational (NoSQL) databases.',
                icon: Database,
                milestone: true,
                skills: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Redis']
            },
            {
                id: 5,
                title: 'Build & Deploy Full Projects',
                time: 'Months 9-10',
                desc: 'Meld frontend and backend. Deploy applications using platforms like Vercel or AWS, learn CI/CD pipelines, and finalize your portfolio.',
                icon: Rocket,
                milestone: true,
                skills: ['Docker', 'AWS/Vercel', 'CI/CD', 'System Design']
            }
        ],
        data: [
            {
                id: 1,
                title: 'Python & Statistical Math',
                time: 'Months 1-3',
                desc: 'Learn Python programming, probability, linear algebra, and basic statistics necessary for advanced data analysis.',
                icon: Code,
                milestone: false,
                skills: ['Python', 'Statistics', 'Pandas', 'NumPy']
            },
            {
                id: 2,
                title: 'Data Visualization & SQL',
                time: 'Months 4-5',
                desc: 'Query large datasets using advanced SQL and present findings through visualization tools.',
                icon: Target,
                milestone: true,
                skills: ['SQL', 'Tableau', 'Matplotlib', 'Seaborn']
            },
            {
                id: 3,
                title: 'Machine Learning Basics',
                time: 'Months 6-8',
                desc: 'Implement supervised and unsupervised learning algorithms using Scikit-Learn.',
                icon: Brain,
                milestone: true,
                skills: ['Scikit-Learn', 'Regression', 'Clustering', 'Classification']
            },
            {
                id: 4,
                title: 'Deep Learning & Advanced ML',
                time: 'Months 9-10',
                desc: 'Dive into neural networks, PyTorch/TensorFlow, and handle real-world big data problems.',
                icon: Server,
                milestone: false,
                skills: ['PyTorch', 'TensorFlow', 'Neural Networks', 'NLP']
            },
            {
                id: 5,
                title: 'End-to-End Data Projects',
                time: 'Months 11-12',
                desc: 'Build recommendation engines or predictive models, deploy via APIs, and showcase results.',
                icon: Rocket,
                milestone: true,
                skills: ['Model Deployment', 'Docker', 'FastAPI', 'MLOps']
            }
        ],
        ca: [
            {
                id: 1,
                title: 'CA Foundation Preparation',
                time: 'Post 12th (6 Months)',
                desc: 'Start with the entry-level exam. Focus on accounting principles, business laws, quantitative aptitude, and business economics.',
                icon: Code,
                milestone: false,
                skills: ['Accounting Basics', 'Business Law', 'Quantitative Aptitude']
            },
            {
                id: 2,
                title: 'CA Intermediate (Group 1 & 2)',
                time: 'Year 1-2',
                desc: 'Clear the intermediate level. Dive deep into corporate laws, taxation (Direct & Indirect), and financial management.',
                icon: Target,
                milestone: true,
                skills: ['Taxation', 'Corporate Law', 'Costing', 'Auditing Basics']
            },
            {
                id: 3,
                title: 'Articleship Training',
                time: 'Year 2-5 (3 Years)',
                desc: 'Get hands-on practical experience under a practicing Chartered Accountant. Apply theoretical knowledge to real-world corporate scenarios.',
                icon: Component,
                milestone: false,
                skills: ['Practical Auditing', 'IT Systems Training', 'Soft Skills', 'Client Management']
            },
            {
                id: 4,
                title: 'CA Final Examination',
                time: 'Year 5',
                desc: 'The final hurdle. Master advanced financial reporting, strategic financial management, and advanced auditing ethics.',
                icon: Brain,
                milestone: true,
                skills: ['Advanced Financial Reporting', 'Strategic Law', 'Direct/Indirect Tax Laws']
            },
            {
                id: 5,
                title: 'Registration as a Member',
                time: 'Year 5+',
                desc: 'Clear the exam, complete your GMCS & Advanced ITT, and register as an Associate Chartered Accountant (ACA).',
                icon: Rocket,
                milestone: true,
                skills: ['Qualified CA', 'Practice Setup', 'Corporate Finance', 'Consulting']
            }
        ],
        doctor: [
            {
                id: 1,
                title: 'NEET Preparation & Clearance',
                time: 'Classes 11-12 (2 Years)',
                desc: 'Prepare rigorously for the National Eligibility cum Entrance Test. Master Physics, Chemistry, and Biology (Zoology & Botany).',
                icon: Target,
                milestone: true,
                skills: ['Biology', 'Physics', 'Chemistry', 'Time Management']
            },
            {
                id: 2,
                title: 'MBBS Pre-Clinical Phase',
                time: 'Year 1 & 2',
                desc: 'Enter medical college. Study Anatomy, Physiology, and Biochemistry heavily via lectures and cadaver dissections.',
                icon: Brain,
                milestone: false,
                skills: ['Anatomy', 'Physiology', 'Medical Ethics', 'Biochemistry']
            },
            {
                id: 3,
                title: 'Para-Clinical & Clinical Subjects',
                time: 'Year 3 & 4',
                desc: 'Learn Pathology, Microbiology, Pharmacology. Begin clinical rotations in hospital wards observing patients.',
                icon: Component,
                milestone: false,
                skills: ['Pathology', 'Pharmacology', 'Patient History Taking', 'Diagnostics']
            },
            {
                id: 4,
                title: 'Final MBBS Exam & Compulsory Internship',
                time: 'Year 5 & 5.5',
                desc: 'Pass final medical exams covering Surgery, Medicine, OBG. Complete a 1-year rotating internship across hospital departments.',
                icon: Code,
                milestone: true,
                skills: ['General Medicine', 'Surgery', 'Pediatrics', 'On-ground Treatment']
            },
            {
                id: 5,
                title: 'NEET-PG & Specialization (MD/MS)',
                time: 'Year 6+',
                desc: 'Clear the postgraduate entrance and spend 3 years specializing (e.g., Cardiology, Neurology, Orthopedics).',
                icon: Rocket,
                milestone: true,
                skills: ['Specialized Surgery', 'Advanced Therapy', 'Medical Research']
            }
        ],
        upsc: [
            {
                id: 1,
                title: 'Foundational Knowledge & NCERTs',
                time: 'Months 1-3',
                desc: 'Build your base by reading NCERTs from Class 6 to 12. Focus on History, Geography, Polity, and basic economy.',
                icon: Code,
                milestone: false,
                skills: ['Reading Habit', 'Indian History', 'Geography', 'Civics']
            },
            {
                id: 2,
                title: 'Standard Reference Books & News',
                time: 'Months 4-7',
                desc: 'Shift to standard books (Laxmikanth, Spectrum). Start reading "The Hindu" or "Indian Express" daily for current affairs.',
                icon: Component,
                milestone: false,
                skills: ['Polity', 'Current Affairs', 'Note Making', 'Critical Analysis']
            },
            {
                id: 3,
                title: 'Optional Subject Preparation',
                time: 'Months 8-10',
                desc: 'Choose your optional subject carefully and complete its syllabus. Optional accounts for 500 marks in Mains.',
                icon: Brain,
                milestone: true,
                skills: ['Subject Specialization', 'Answer Writing', 'In-depth Research']
            },
            {
                id: 4,
                title: 'Prelims Mock Tests & Revision',
                time: 'Months 11-12',
                desc: 'Attempt 50+ mock tests. Analyze mistakes, revise heavily, and practice CSAT (Aptitude) to qualify the Prelims tier.',
                icon: Target,
                milestone: true,
                skills: ['MCQ Solving', 'Elimination Techniques', 'Aptitude & Logic']
            },
            {
                id: 5,
                title: 'Mains Answer Writing & Interview',
                time: 'Months 13-16',
                desc: 'Post-prelims, write daily Mains answers. Give essays and ethics tests. If cleared, attend mock interviews for the Personality Test.',
                icon: Rocket,
                milestone: true,
                skills: ['Articulate Writing', 'Ethics & Integrity', 'Interview Presentation', 'Public Speaking']
            }
        ],
        uiux: [
            {
                id: 1,
                title: 'Design Principles & Theory',
                time: 'Months 1-2',
                desc: 'Learn visual hierarchy, color theory, typography, and layout. Understand the difference between UI (visuals) and UX (experience/logic).',
                icon: Server,
                milestone: false,
                skills: ['Color Theory', 'Typography', 'Visual Hierarchy', 'Design Psychology']
            },
            {
                id: 2,
                title: 'Mastering Design Tools (Figma)',
                time: 'Months 3-4',
                desc: 'Learn Figma inside out. Master components, auto-layout, variants, and interactive prototyping.',
                icon: Code,
                milestone: true,
                skills: ['Figma', 'Auto-Layout', 'Prototyping', 'Design Systems']
            },
            {
                id: 3,
                title: 'UX Research & Wireframing',
                time: 'Months 5-6',
                desc: 'Conduct user research, create personas, map user journeys, and draw low-fidelity wireframes to solve real user problems.',
                icon: Brain,
                milestone: false,
                skills: ['User Research', 'Wireframing', 'Empathy Mapping', 'Information Architecture']
            },
            {
                id: 4,
                title: 'High-Fidelity UI & Interactions',
                time: 'Months 7-8',
                desc: 'Turn wireframes into pixel-perfect mockups. Apply micro-interactions and animations to delight the user.',
                icon: Target,
                milestone: false,
                skills: ['Micro-interactions', 'Accessibility (a11y)', 'Mobile Design', 'Web Design']
            },
            {
                id: 5,
                title: 'Portfolio Building & Handoff',
                time: 'Months 9-10',
                desc: 'Create 2-3 massive case studies for your portfolio on Behance/Dribbble. Learn how to hand off designs to developers.',
                icon: Rocket,
                milestone: true,
                skills: ['Portfolio Creation', 'Case Studies', 'Developer Handoff', 'Client Pitching']
            }
        ]
    };

    const currentTimeline = timelineData[selectedPath as keyof typeof timelineData] || timelineData.fullstack;

    return (
        <>
            <Navbar />
            
            <main className={styles.main}>
                <div className={styles.heroOrb1} />
                <div className={styles.heroOrb2} />

                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <motion.div 
                            className={styles.heroContent}
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <span className={styles.badge}>
                                <Map size={14} /> Interactive Visualizer
                            </span>
                            <h1 className={styles.heroTitle}>
                                Career <span className={styles.gradientText}>Pathways</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Explore visual roadmaps. See exactly what skills to learn, in what order, and how long to expect before hitting your major milestones.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className={styles.pathwaySection}>
                    <div className={styles.container}>
                        
                        {/* Track Selection */}
                        <motion.div 
                            className={styles.pathwaySelector}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {pathways.map(path => {
                                const Icon = path.icon;
                                return (
                                    <button
                                        key={path.id}
                                        className={`${styles.pathBtn} ${selectedPath === path.id ? styles.active : ''}`}
                                        onClick={() => setSelectedPath(path.id)}
                                    >
                                        <Icon size={16} /> {path.label}
                                    </button>
                                );
                            })}
                        </motion.div>

                        {/* Interactive Timeline Graph */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selectedPath}
                                className={styles.timelineContainer}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                                variants={staggerContainer}
                            >
                                <div className={styles.timelineLine}></div>

                                {currentTimeline.map((node, i) => {
                                    const isLeft = i % 2 === 0;
                                    const NodeIcon = node.icon;
                                    
                                    return (
                                        <motion.div 
                                            key={node.id} 
                                            className={`${styles.timelineNode} ${isLeft ? styles.nodeLeft : styles.nodeRight}`}
                                            variants={fadeInUp}
                                        >
                                            <div className={`${styles.nodeConnector}`}>
                                                {node.milestone ? <Star size={18} color="var(--success)" /> : <span>{i+1}</span>}
                                            </div>

                                            <div className={`${styles.nodeContent} ${node.milestone ? styles.milestone : ''}`}>
                                                <div className={styles.nodeHeader}>
                                                    <h3 className={styles.nodeTitle}>{node.title}</h3>
                                                    <span className={styles.nodeTime}>{node.time}</span>
                                                </div>
                                                <p className={styles.nodeDesc}>{node.desc}</p>
                                                <div className={styles.nodeSkills}>
                                                    {node.skills.map((skill, idx) => (
                                                        <span key={idx} className={styles.skillTag}>
                                                            <CheckCircle size={12} /> {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                            </motion.div>
                        </AnimatePresence>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

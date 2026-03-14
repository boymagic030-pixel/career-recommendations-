'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, Download, Briefcase, GraduationCap, 
    Award, Star, Sparkles, Wand2, Plus, Trash2, Edit3, 
    Mail, Phone, MapPin, Globe
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

interface Education {
    id: string;
    degree: string;
    school: string;
    year: string;
    score: string;
}

interface Experience {
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
}

export default function ResumeBuilderPage() {
    const [personalInfo, setPersonalInfo] = useState({
        fullName: 'Alex Doe',
        title: 'Computer Science Student',
        email: 'alex.doe@example.com',
        phone: '+91 9876543210',
        location: 'Chennai, India',
        linkedin: 'linkedin.com/in/alexdoe',
        summary: 'Motivated and detail-oriented Computer Science student with a passion for building scalable web applications. Strong foundation in data structures and algorithms, with hands-on experience in React and Node.js.'
    });

    const [education, setEducation] = useState<Education[]>([
        { id: '1', degree: 'B.Tech Computer Science', school: 'St. Joseph College of Engineering', year: '2023 - 2027', score: 'CGPA: 8.5' }
    ]);

    const [experience, setExperience] = useState<Experience[]>([
        { id: '1', title: 'Frontend Developer Intern', company: 'TechNova Solutions', duration: 'May 2025 - Aug 2025', description: 'Developed interactive UI components using React and Framer Motion. Improved website performance by 15% through lazy loading and code splitting.' }
    ]);

    const [skills, setSkills] = useState('React, Next.js, Node.js, Python, Java, SQL, Git');

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    };

    const addEducation = () => {
        setEducation([...education, { id: Date.now().toString(), degree: '', school: '', year: '', score: '' }]);
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
    };

    const removeEducation = (id: string) => {
        setEducation(education.filter(edu => edu.id !== id));
    };

    const addExperience = () => {
        setExperience([...experience, { id: Date.now().toString(), title: '', company: '', duration: '', description: '' }]);
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const removeExperience = (id: string) => {
        setExperience(experience.filter(exp => exp.id !== id));
    };

    const handlePrint = () => {
        window.print();
    };

    // AI Optimize Simulation
    const [isOptimizing, setIsOptimizing] = useState(false);
    
    const triggerAIOptimization = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            setPersonalInfo(prev => ({
                ...prev,
                summary: 'Results-driven Computer Science undergraduate specializing in full-stack web development. Proven ability to architect and deliver scalable React/Node.js applications with a focus on UX and performance optimization. Recognized for analytical problem-solving and rapid adaptation to emerging technologies.'
            }));
            
            if (experience.length > 0) {
                const updatedExp = [...experience];
                updatedExp[0].description = '• Engineered highly responsive UI components utilizing React and Framer Motion, enhancing user engagement.\n• Spearheaded performance optimization initiatives, achieving a 15% reduction in load times via strategic implementation of lazy loading and code splitting.\n• Collaborated closely with cross-functional teams in an Agile environment.';
                setExperience(updatedExp);
            }
            
            setIsOptimizing(false);
        }, 1500);
    };

    return (
        <>
            <Navbar />
            
            <main className={styles.main}>
                <div className={styles.heroOrb1} />
                <div className={styles.heroOrb2} />

                {/* Header */}
                <section className={`${styles.hero} hide-on-print`}>
                    <div className={styles.container}>
                        <motion.div 
                            className={styles.heroContent}
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <span className={styles.badge}>
                                <Sparkles size={14} /> AI-Powered Builder
                            </span>
                            <h1 className={styles.heroTitle}>
                                Resume / <span className={styles.gradientText}>CV Builder</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Create an ATS-friendly, professional resume in minutes. Let our AI optimize your descriptions for maximum impact.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Builder Layout */}
                <section className={styles.builderSection}>
                    <div className={styles.container}>
                        <div className={styles.builderGrid}>
                            
                            {/* Editor Sidebar */}
                            <motion.div 
                                className={`${styles.formSidebar} hide-on-print`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {/* Personal Info */}
                                <div>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.sectionIcon}><Edit3 size={18} /></div>
                                        <h3 className={styles.sectionTitle}>Personal Details</h3>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Full Name</label>
                                        <input type="text" name="fullName" className={styles.input} value={personalInfo.fullName} onChange={handlePersonalInfoChange} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Target Title</label>
                                        <input type="text" name="title" className={styles.input} value={personalInfo.title} onChange={handlePersonalInfoChange} />
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Email</label>
                                            <input type="email" name="email" className={styles.input} value={personalInfo.email} onChange={handlePersonalInfoChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Phone</label>
                                            <input type="tel" name="phone" className={styles.input} value={personalInfo.phone} onChange={handlePersonalInfoChange} />
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Location</label>
                                            <input type="text" name="location" className={styles.input} value={personalInfo.location} onChange={handlePersonalInfoChange} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>LinkedIn / Portfolio</label>
                                            <input type="text" name="linkedin" className={styles.input} value={personalInfo.linkedin} onChange={handlePersonalInfoChange} />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Professional Summary</label>
                                        <textarea name="summary" className={styles.textarea} value={personalInfo.summary} onChange={handlePersonalInfoChange} rows={4} />
                                    </div>
                                </div>

                                {/* Education */}
                                <div>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.sectionIcon}><GraduationCap size={18} /></div>
                                        <h3 className={styles.sectionTitle}>Education</h3>
                                    </div>
                                    <AnimatePresence>
                                        {education.map((edu, index) => (
                                            <motion.div 
                                                key={edu.id} 
                                                className={styles.itemCard}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <div className={styles.itemCardHeader}>
                                                    <span className={styles.itemCardTitle}>Institution #{index + 1}</span>
                                                    <button className={styles.deleteBtn} onClick={() => removeEducation(edu.id)}><Trash2 size={14} /></button>
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <input type="text" placeholder="Degree / Course" className={styles.input} value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <input type="text" placeholder="School / University" className={styles.input} value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
                                                </div>
                                                <div className={styles.row}>
                                                    <div className={styles.formGroup}>
                                                        <input type="text" placeholder="Year (e.g. 2023-2027)" className={styles.input} value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} />
                                                    </div>
                                                    <div className={styles.formGroup}>
                                                        <input type="text" placeholder="CGPA / %" className={styles.input} value={edu.score} onChange={(e) => updateEducation(edu.id, 'score', e.target.value)} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    <button className={styles.addButton} onClick={addEducation}>
                                        <Plus size={16} /> Add Education
                                    </button>
                                </div>

                                {/* Experience */}
                                <div>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.sectionIcon}><Briefcase size={18} /></div>
                                        <h3 className={styles.sectionTitle}>Experience / Projects</h3>
                                    </div>
                                    <AnimatePresence>
                                        {experience.map((exp, index) => (
                                            <motion.div 
                                                key={exp.id} 
                                                className={styles.itemCard}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <div className={styles.itemCardHeader}>
                                                    <span className={styles.itemCardTitle}>Role #{index + 1}</span>
                                                    <button className={styles.deleteBtn} onClick={() => removeExperience(exp.id)}><Trash2 size={14} /></button>
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <input type="text" placeholder="Job Title / Project Name" className={styles.input} value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} />
                                                </div>
                                                <div className={styles.row}>
                                                    <div className={styles.formGroup}>
                                                        <input type="text" placeholder="Company / Org" className={styles.input} value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                                                    </div>
                                                    <div className={styles.formGroup}>
                                                        <input type="text" placeholder="Duration (e.g. May 2025 - Aug 2025)" className={styles.input} value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <textarea placeholder="Description / Outcomes" className={styles.textarea} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={3} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    <button className={styles.addButton} onClick={addExperience}>
                                        <Plus size={16} /> Add Experience
                                    </button>
                                </div>

                                {/* Skills */}
                                <div>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.sectionIcon}><Star size={18} /></div>
                                        <h3 className={styles.sectionTitle}>Skills</h3>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Comma-separated skills</label>
                                        <textarea className={styles.textarea} value={skills} onChange={(e) => setSkills(e.target.value)} rows={3} placeholder="React, Python, Communication, UI/UX" />
                                    </div>
                                </div>

                            </motion.div>

                            {/* Live Preview Area */}
                            <motion.div 
                                className={styles.previewArea}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {/* Toolbar */}
                                <div className={`${styles.previewToolbar} hide-on-print`}>
                                    <div>
                                        <h3 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Live Preview</h3>
                                    </div>
                                    <div className={styles.toolbarActions}>
                                        <button 
                                            className={`${styles.actionBtn} ${styles.primary}`} 
                                            onClick={triggerAIOptimization}
                                            disabled={isOptimizing}
                                        >
                                            {isOptimizing ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                    <Sparkles size={16} />
                                                </motion.div>
                                            ) : (
                                                <><Sparkles size={16} /> AI Optimize</>
                                            )}
                                        </button>
                                        <button className={styles.actionBtn} onClick={handlePrint}>
                                            <Download size={16} /> Export PDF
                                        </button>
                                    </div>
                                </div>

                                {/* A4 Paper Preview */}
                                <div className={styles.resumePaper} id="print-area">
                                    <div className={styles.resumeHeader}>
                                        <h1 className={styles.rName}>{personalInfo.fullName || 'Your Name'}</h1>
                                        <div className={styles.rTitle}>{personalInfo.title || 'Your Target Role'}</div>
                                        <div className={styles.rContact}>
                                            {personalInfo.email && <span><Mail size={12} /> {personalInfo.email}</span>}
                                            {personalInfo.phone && <span><Phone size={12} /> {personalInfo.phone}</span>}
                                            {personalInfo.location && <span><MapPin size={12} /> {personalInfo.location}</span>}
                                            {personalInfo.linkedin && <span><Globe size={12} /> {personalInfo.linkedin}</span>}
                                        </div>
                                    </div>

                                    {personalInfo.summary && (
                                        <div className={styles.rSection}>
                                            <h2 className={styles.rSectionTitle}>Professional Summary</h2>
                                            <p className={styles.rSummary}>{personalInfo.summary}</p>
                                        </div>
                                    )}

                                    {education.length > 0 && education.some(e => e.school || e.degree) && (
                                        <div className={styles.rSection}>
                                            <h2 className={styles.rSectionTitle}>Education</h2>
                                            {education.filter(e => e.school || e.degree).map(edu => (
                                                <div key={edu.id} className={styles.rItem}>
                                                    <div className={styles.rItemHeader}>
                                                        <span className={styles.rItemTitle}>{edu.degree}</span>
                                                        <span className={styles.rItemDate}>{edu.year}</span>
                                                    </div>
                                                    <div className={styles.rItemSub}>{edu.school} {edu.score ? `| ${edu.score}` : ''}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {experience.length > 0 && experience.some(e => e.title || e.company) && (
                                        <div className={styles.rSection}>
                                            <h2 className={styles.rSectionTitle}>Experience</h2>
                                            {experience.filter(e => e.title || e.company).map(exp => (
                                                <div key={exp.id} className={styles.rItem}>
                                                    <div className={styles.rItemHeader}>
                                                        <span className={styles.rItemTitle}>{exp.title}</span>
                                                        <span className={styles.rItemDate}>{exp.duration}</span>
                                                    </div>
                                                    <div className={styles.rItemSub}>{exp.company}</div>
                                                    {exp.description && (
                                                        <div className={styles.rItemDesc}>
                                                            {exp.description.split('\n').map((line, i) => (
                                                                <div key={i}>{line}</div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {skills && (
                                        <div className={styles.rSection}>
                                            <h2 className={styles.rSectionTitle}>Skills</h2>
                                            <div className={styles.rSkills}>
                                                {skills.split(',').map((skill, index) => (
                                                    <span key={index} className={styles.rSkillBadge}>{skill.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* AI Suggestion Toast */}
                                <div className={`${styles.aiSuggestion} hide-on-print`}>
                                    <div className={styles.aiIcon}>
                                        <Sparkles size={20} />
                                    </div>
                                    <div className={styles.aiContent}>
                                        <h4>AI Recommendation</h4>
                                        <p>Your resume looks great! For ATS (Applicant Tracking Systems) optimization, use action verbs like 'Engineered', 'Spearheaded', and 'Optimized' at the beginning of your bullet points. Click <strong>AI Optimize</strong> to auto-enhance your descriptions.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            
            {/* Global print styles to hide UI during export */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: portrait;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .hide-on-print {
                        display: none !important;
                    }
                    nav, footer, header {
                        display: none !important;
                    }
                    /* Reset everything around the print area to let it flow naturally */
                    html, body, main, div {
                        height: auto !important;
                        overflow: visible !important;
                    }
                    #print-area {
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 15mm 20mm !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        background: white !important;
                        color: black !important;
                        page-break-after: auto;
                    }
                    /* ATS Clean Typography */
                    #print-area * {
                        font-family: Arial, Helvetica, sans-serif !important;
                    }
                    #print-area h1,
                    #print-area h2, 
                    #print-area .rSectionTitle {
                        color: #000 !important;
                        border-bottom-color: #000 !important;
                    }
                    #print-area h2 {
                        margin-top: 15px !important;
                        padding-bottom: 5px !important;
                    }
                    /* Ensure items don't break awkwardly across pages */
                    .rItem {
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </>
    );
}

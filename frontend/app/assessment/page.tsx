'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Clock,
    Target,
    Brain,
    Heart,
    Wrench,
    CheckCircle2,
    ArrowRight,
    RotateCcw,
    Home,
    Loader2,
    SkipForward,
    XCircle,
    Lightbulb,
    Trophy,
    AlertCircle,
    FlaskConical,
    TrendingUp,
    Palette,
    Hammer,
    BookOpen,
    RefreshCw,
} from 'lucide-react';
import { Navbar } from '@/components';
import { AptitudeQuestion, pathSpecificQuestions, defaultQuestions, interestQuestionsByStream, InterestQuestion } from '@/data/assessmentQuestions';
import styles from './page.module.css';

// Assessment sections
// Order: welcome(0) → personal(1) → interests(2) → skills(3) → aptitude(4) → results(5)
const sections = [
    { id: 'welcome', title: 'Welcome', icon: Sparkles },
    { id: 'personal', title: 'Personal Info', icon: Target },
    { id: 'interests', title: 'Interests', icon: Heart },
    { id: 'skills', title: 'Skills', icon: Wrench },
    { id: 'aptitude', title: 'Aptitude', icon: Brain },
    { id: 'results', title: 'Results', icon: Trophy },
];

// Stream info config
const streamConfig: Record<string, { label: string; icon: React.ElementType; color: string; gradient: string; description: string }> = {
    science: {
        label: 'Science & Technology',
        icon: FlaskConical,
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        description: 'Physics, Chemistry, Biology, Computer Science, Engineering & Medicine'
    },
    commerce: {
        label: 'Commerce & Business',
        icon: TrendingUp,
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        description: 'Accounting, Finance, Marketing, Economics & Management'
    },
    arts: {
        label: 'Arts & Humanities',
        icon: Palette,
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        description: 'Literature, Fine Arts, Journalism, Psychology & Social Sciences'
    },
    vocational: {
        label: 'Vocational & Skill-Based',
        icon: Hammer,
        color: '#3b82f6',
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        description: 'Trades, Hospitality, IT Hardware, Construction & Applied Skills'
    }
};

const skillsList = [
    { id: 'problem_solving', name: 'Problem Solving', category: 'Analytical' },
    { id: 'communication', name: 'Communication', category: 'Interpersonal' },
    { id: 'programming', name: 'Programming', category: 'Technical' },
    { id: 'creativity', name: 'Creativity', category: 'Creative' },
    { id: 'leadership', name: 'Leadership', category: 'Management' },
    { id: 'teamwork', name: 'Teamwork', category: 'Interpersonal' },
    { id: 'data_analysis', name: 'Data Analysis', category: 'Technical' },
    { id: 'writing', name: 'Writing', category: 'Communication' },
    { id: 'critical_thinking', name: 'Critical Thinking', category: 'Analytical' },
    { id: 'presentation', name: 'Presentation', category: 'Communication' },
];

interface QuestionResult {
    question: AptitudeQuestion;
    userAnswer: string | null;
    isCorrect: boolean;
    skipped: boolean;
}

export default function AssessmentPage() {
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});
    const [personalInfo, setPersonalInfo] = useState({ name: '', age: '', education: '', targetPath: '' });
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [dynamicInterestQuestions, setDynamicInterestQuestions] = useState<InterestQuestion[]>([]);

    // Aptitude specific states
    const [aptitudeQuestions, setAptitudeQuestions] = useState<AptitudeQuestion[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
    const [aptitudeAnswers, setAptitudeAnswers] = useState<Record<number, string>>({});
    const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Collapsible review states
    const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isStarted && currentSection < sections.length - 1 && !showResults) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isStarted, currentSection, showResults]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Toggle a review card open/closed
    const toggleReview = (id: number) => {
        setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Generate aptitude questions using API route
    const generateAptitudeQuestions = useCallback(async (path?: string) => {
        const targetPath = path || personalInfo.targetPath;
        setIsLoadingQuestions(true);
        setApiError(null);

        try {
            const response = await fetch('/api/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ targetPath }),
            });

            const data = await response.json();

            if (data.success && data.questions) {
                const randomizedQuestions = data.questions.map((q: AptitudeQuestion) => ({
                    ...q,
                    options: [...q.options].sort(() => Math.random() - 0.5)
                }));
                setAptitudeQuestions(randomizedQuestions);
            } else {
                throw new Error('Failed to load questions');
            }
        } catch (error) {
            console.error('Error generating questions:', error);
            setApiError('Using stream-specific backup questions.');

            // Fallback: use stream-specific static questions
            const fallbackSet = pathSpecificQuestions[targetPath] || defaultQuestions;
            const randomizedQuestions = fallbackSet.map((q) => ({
                ...q,
                options: [...q.options].sort(() => Math.random() - 0.5)
            }));
            setAptitudeQuestions(randomizedQuestions);
        } finally {
            setIsLoadingQuestions(false);
        }
    }, [personalInfo.targetPath]);

    const handleAnswer = (questionId: number, answerId: string) => {
        setAnswers((prev) => ({ ...prev, [`q${questionId}`]: answerId }));
    };

    const handleAptitudeAnswer = (questionId: number, answerId: string) => {
        setAptitudeAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    };

    const handleSkillRating = (skillId: string, rating: number) => {
        setSkillRatings((prev) => ({ ...prev, [skillId]: rating }));
    };

    const getProgress = () => {
        const totalSections = sections.length - 2; // Exclude welcome and results
        return ((currentSection - 1) / totalSections) * 100;
    };

    const nextInterestQuestion = () => {
        if (currentQuestion < dynamicInterestQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(0);
            setCurrentSection(3); // Move to Skills (section 3)
        }
    };

    const prevInterestQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (currentSection > 1) {
            setCurrentSection(currentSection - 1);
        }
    };

    const nextAptitudeQuestion = () => {
        if (currentQuestion < aptitudeQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResults();
        }
    };

    const skipAptitudeQuestion = () => {
        const currentQ = aptitudeQuestions[currentQuestion];
        if (currentQ && !aptitudeAnswers[currentQ.id]) {
            setAptitudeAnswers((prev) => ({ ...prev, [currentQ.id]: '__skipped__' }));
        }
        nextAptitudeQuestion();
    };

    const prevAptitudeQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            setCurrentSection(3); // Back to Skills (section 3)
        }
    };

    // Replace a single aptitude question with a different one from the pool
    const changeAptitudeQuestion = async (questionIndex: number) => {
        const targetPath = personalInfo.targetPath;
        try {
            const response = await fetch('/api/generate-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetPath }),
            });
            const data = await response.json();
            if (data.success && data.questions) {
                // Find a question not already in current set
                const currentIds = aptitudeQuestions.map(q => q.id);
                const pool: typeof aptitudeQuestions = data.questions;
                const available = pool.filter(q => !currentIds.includes(q.id));
                if (available.length > 0) {
                    const replacement = available[Math.floor(Math.random() * available.length)];
                    const shuffledReplacement = {
                        ...replacement,
                        options: [...replacement.options].sort(() => Math.random() - 0.5)
                    };
                    setAptitudeQuestions(prev => {
                        const updated = [...prev];
                        updated[questionIndex] = shuffledReplacement;
                        return updated;
                    });
                    // Clear any previous answer for that slot
                    setAptitudeAnswers(prev => {
                        const updated = { ...prev };
                        delete updated[aptitudeQuestions[questionIndex].id];
                        return updated;
                    });
                }
            }
        } catch {
            // silently ignore
        }
    };

    const calculateResults = () => {
        const results: QuestionResult[] = aptitudeQuestions.map((q) => {
            const userAnswer = aptitudeAnswers[q.id];
            const skipped = !userAnswer || userAnswer === '__skipped__';
            const isCorrect = !skipped && userAnswer === q.correctAnswer;

            return {
                question: q,
                userAnswer: skipped ? null : userAnswer,
                isCorrect,
                skipped
            };
        });

        const correctCount = results.filter(r => r.isCorrect).length;
        const totalScore = Math.round((correctCount / results.length) * 100);

        try {
            localStorage.setItem('careerAssessment', JSON.stringify({
                personalInfo,
                answers,
                skillRatings,
                score: totalScore
            }));
        } catch (error) {
            console.error('Failed to save assessment results', error);
        }

        setQuestionResults(results);
        setShowResults(true);
        setCurrentSection(5);
    };

    const startAssessment = () => {
        setIsStarted(true);
        setCurrentSection(1);
    };

    const handlePersonalNext = () => {
        if (personalInfo.name && personalInfo.age && personalInfo.education && personalInfo.targetPath) {
            const baseQs = interestQuestionsByStream[personalInfo.targetPath] || interestQuestionsByStream['science'];
            const randomizedQs = baseQs.map(q => ({
                ...q,
                options: [...q.options].sort(() => Math.random() - 0.5)
            }));
            setDynamicInterestQuestions(randomizedQs);
            setCurrentSection(2); // Go to Interests
            setCurrentQuestion(0);
        }
    };

    const handleSkillsNext = () => {
        setCurrentSection(4); // Move to Aptitude (section 4)
        setCurrentQuestion(0);
        generateAptitudeQuestions();
    };

    const restartAssessment = () => {
        setCurrentSection(0);
        setCurrentQuestion(0);
        setAnswers({});
        setAptitudeAnswers({});
        setSkillRatings({});
        setPersonalInfo({ name: '', age: '', education: '', targetPath: '' });
        setTimeElapsed(0);
        setIsStarted(false);
        setAptitudeQuestions([]);
        setDynamicInterestQuestions([]);
        setQuestionResults([]);
        setShowResults(false);
        setExpandedReviews({});
        setApiError(null);
    };

    const getScorePercentage = () => {
        if (questionResults.length === 0) return 0;
        const correct = questionResults.filter(r => r.isCorrect).length;
        return Math.round((correct / questionResults.length) * 100);
    };

    const getScoreMessage = () => {
        const percentage = getScorePercentage();
        if (percentage >= 80) return { text: 'Excellent!', color: '#22c55e' };
        if (percentage >= 60) return { text: 'Good Job!', color: '#6366f1' };
        if (percentage >= 40) return { text: 'Keep Practicing!', color: '#f59e0b' };
        return { text: 'Need Improvement', color: '#ef4444' };
    };

    const activeStream = streamConfig[personalInfo.targetPath];

    return (
        <>
            <Navbar />

            <main className={styles.main}>
                {/* Progress Header */}
                {isStarted && currentSection > 0 && currentSection < sections.length - 1 && !showResults && (
                    <motion.div
                        className={styles.progressHeader}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className={styles.progressInner}>
                            <div className={styles.progressInfo}>
                                <span className={styles.sectionLabel}>
                                    {(() => {
                                        const IconComponent = sections[currentSection]?.icon;
                                        return IconComponent ? <IconComponent size={16} /> : null;
                                    })()}
                                    {sections[currentSection]?.title}
                                    {currentSection === 4 && aptitudeQuestions.length > 0 && (
                                        <span className={styles.questionCounter}>
                                            ({currentQuestion + 1}/{aptitudeQuestions.length})
                                        </span>
                                    )}
                                    {currentSection === 2 && dynamicInterestQuestions.length > 0 && (
                                        <span className={styles.questionCounter}>
                                            ({currentQuestion + 1}/{dynamicInterestQuestions.length})
                                        </span>
                                    )}
                                    {/* Stream Badge */}
                                    {activeStream && (
                                        <span
                                            className={styles.streamBadge}
                                            style={{ background: activeStream.gradient }}
                                        >
                                            <activeStream.icon size={11} />
                                            {activeStream.label}
                                        </span>
                                    )}
                                </span>
                                <span className={styles.timer}>
                                    <Clock size={14} />
                                    {formatTime(timeElapsed)}
                                </span>
                            </div>
                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getProgress()}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className={styles.container}>
                    <AnimatePresence mode="wait">
                        {/* Welcome Screen */}
                        {currentSection === 0 && (
                            <motion.div
                                key="welcome"
                                className={styles.welcomeScreen}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.welcomeOrb1} />
                                <div className={styles.welcomeOrb2} />

                                <div className={styles.welcomeContent}>
                                    <motion.div
                                        className={styles.welcomeIcon}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                    >
                                        <Sparkles size={40} />
                                    </motion.div>

                                    <h1 className={styles.welcomeTitle}>
                                        Career Discovery
                                        <br />
                                        <span className={styles.gradientText}>Assessment</span>
                                    </h1>

                                    <p className={styles.welcomeText}>
                                        Welcome to your personalized career assessment! This comprehensive
                                        test will analyze your interests, aptitude, and skills based on
                                        your chosen stream to recommend the best career paths for you.
                                    </p>

                                    {/* Stream Cards */}
                                    <div className={styles.streamCardsRow}>
                                        {Object.entries(streamConfig).map(([key, stream]) => (
                                            <div key={key} className={styles.streamPreviewCard} style={{ '--stream-color': stream.color } as React.CSSProperties}>
                                                <div className={styles.streamPreviewIcon} style={{ background: stream.gradient }}>
                                                    <stream.icon size={18} />
                                                </div>
                                                <span>{stream.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.welcomeDetails}>
                                        <div className={styles.detailCard}>
                                            <Clock size={20} />
                                            <span>15-20 minutes</span>
                                        </div>
                                        <div className={styles.detailCard}>
                                            <Target size={20} />
                                            <span>4 Sections</span>
                                        </div>
                                        <div className={styles.detailCard}>
                                            <Brain size={20} />
                                            <span>AI Powered</span>
                                        </div>
                                    </div>

                                    <div className={styles.welcomeTips}>
                                        <h3>Tips for best results:</h3>
                                        <ul>
                                            <li><CheckCircle2 size={16} /> Answer honestly - there are no right or wrong answers for interests</li>
                                            <li><CheckCircle2 size={16} /> Aptitude questions are stream-specific — read carefully</li>
                                            <li><CheckCircle2 size={16} /> Find a quiet place without distractions</li>
                                            <li><CheckCircle2 size={16} /> You can skip aptitude questions if stuck</li>
                                        </ul>
                                    </div>

                                    <motion.button
                                        className={styles.startBtn}
                                        onClick={startAssessment}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Sparkles size={18} />
                                        Begin Assessment
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Personal Info Section */}
                        {currentSection === 1 && (
                            <motion.div
                                key="personal"
                                className={styles.questionScreen}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={styles.questionCard}>
                                    <div className={styles.questionHeader}>
                                        <span className={styles.questionNumber}>Step 1 of 4</span>
                                        <h2 className={styles.questionTitle}>Tell us about yourself</h2>
                                        <p className={styles.questionSubtitle}>
                                            This helps us personalize your career recommendations
                                        </p>
                                    </div>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Full Name</label>
                                            <input
                                                type="text"
                                                value={personalInfo.name}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                                placeholder="Enter your name"
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Age</label>
                                            <input
                                                type="number"
                                                value={personalInfo.age}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                                                placeholder="Your age"
                                                className={styles.input}
                                                min={15}
                                                max={50}
                                            />
                                        </div>
                                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                                            <label className={styles.label}>Current Education Level</label>
                                            <select
                                                value={personalInfo.education}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, education: e.target.value })}
                                                className={styles.select}
                                            >
                                                <option value="">Select your education level</option>
                                                <option value="high_school">High School / +2</option>
                                                <option value="undergraduate">Undergraduate (Bachelor&apos;s)</option>
                                                <option value="graduate">Graduate (Master&apos;s)</option>
                                                <option value="doctorate">Doctorate / PhD</option>
                                                <option value="working">Working Professional</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                                            <label className={styles.label}>Stream of Study</label>
                                            <div className={styles.streamSelectGrid}>
                                                {Object.entries(streamConfig).map(([key, stream]) => (
                                                    <motion.div
                                                        key={key}
                                                        className={`${styles.streamSelectCard} ${personalInfo.targetPath === key ? styles.streamSelectActive : ''}`}
                                                        onClick={() => setPersonalInfo({ ...personalInfo, targetPath: key })}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        style={{
                                                            '--stream-gradient': stream.gradient,
                                                            '--stream-color': stream.color
                                                        } as React.CSSProperties}
                                                    >
                                                        <div
                                                            className={styles.streamSelectIcon}
                                                            style={{ background: personalInfo.targetPath === key ? stream.gradient : undefined }}
                                                        >
                                                            <stream.icon size={22} />
                                                        </div>
                                                        <div className={styles.streamSelectInfo}>
                                                            <strong>{stream.label}</strong>
                                                            <span>{stream.description}</span>
                                                        </div>
                                                        {personalInfo.targetPath === key && (
                                                            <CheckCircle2 size={20} className={styles.streamCheckIcon} />
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.navigationButtons}>
                                        <button className={styles.navBtn} onClick={() => setCurrentSection(0)}>
                                            <ChevronLeft size={18} />
                                            Back
                                        </button>
                                        <motion.button
                                            className={styles.nextBtn}
                                            onClick={handlePersonalNext}
                                            disabled={!personalInfo.name || !personalInfo.age || !personalInfo.education || !personalInfo.targetPath}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Continue
                                            <ChevronRight size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Interest Questions */}
                        {currentSection === 2 && dynamicInterestQuestions.length > 0 && (
                            <motion.div
                                key={`interest-${currentQuestion}`}
                                className={styles.questionScreen}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={styles.questionCard}>
                                    {/* Stream Banner */}
                                    {activeStream && (
                                        <div className={styles.streamBanner} style={{ background: activeStream.gradient }}>
                                            <activeStream.icon size={16} />
                                            <span>{activeStream.label} — Interest Questions</span>
                                        </div>
                                    )}

                                    <div className={styles.questionHeader}>
                                        <div className={styles.questionMeta}>
                                            <span className={styles.questionNumber}>
                                                Question {currentQuestion + 1} of {dynamicInterestQuestions.length}
                                            </span>
                                            <span className={styles.categoryBadge}>Interests</span>
                                        </div>
                                        <h2 className={styles.questionTitle}>
                                            {dynamicInterestQuestions[currentQuestion]?.question}
                                        </h2>
                                    </div>

                                    {/* Mini progress dots */}
                                    <div className={styles.questionDots}>
                                        {dynamicInterestQuestions.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`${styles.questionDot} ${i === currentQuestion ? styles.questionDotActive : ''} ${answers[`q${dynamicInterestQuestions[i]?.id}`] ? styles.questionDotDone : ''}`}
                                            />
                                        ))}
                                    </div>

                                    <div className={styles.optionsGrid}>
                                        {dynamicInterestQuestions[currentQuestion]?.options.map((option) => (
                                            <motion.button
                                                key={option.id}
                                                className={`${styles.optionCard} ${answers[`q${dynamicInterestQuestions[currentQuestion].id}`] === option.id
                                                    ? styles.optionSelected
                                                    : ''
                                                    }`}
                                                onClick={() => handleAnswer(dynamicInterestQuestions[currentQuestion].id, option.id)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className={styles.optionIcon}>{option.icon}</span>
                                                <span className={styles.optionText}>{option.text}</span>
                                                {answers[`q${dynamicInterestQuestions[currentQuestion].id}`] === option.id && (
                                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className={styles.navigationButtons}>
                                        <button className={styles.navBtn} onClick={prevInterestQuestion}>
                                            <ChevronLeft size={18} />
                                            Previous
                                        </button>
                                        <motion.button
                                            className={styles.nextBtn}
                                            onClick={nextInterestQuestion}
                                            disabled={!answers[`q${dynamicInterestQuestions[currentQuestion].id}`]}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {currentQuestion < dynamicInterestQuestions.length - 1 ? 'Next' : 'Continue to Skills'}
                                            <ChevronRight size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Skills Section — now section 3 (before Aptitude) */}
                        {currentSection === 3 && (
                            <motion.div
                                key="skills"
                                className={styles.questionScreen}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={styles.questionCard + ' ' + styles.skillsCard}>
                                    <div className={styles.questionHeader}>
                                        <span className={styles.questionNumber}>Step 3 of 4</span>
                                        <h2 className={styles.questionTitle}>Rate Your Skills</h2>
                                        <p className={styles.questionSubtitle}>
                                            Rate your proficiency in the following skills (1 = Beginner, 5 = Expert)
                                        </p>
                                    </div>

                                    <div className={styles.skillsGrid}>
                                        {skillsList.map((skill) => (
                                            <div key={skill.id} className={styles.skillRow}>
                                                <div className={styles.skillInfo}>
                                                    <span className={styles.skillName}>{skill.name}</span>
                                                    <span className={styles.skillCategory}>{skill.category}</span>
                                                </div>
                                                <div className={styles.ratingButtons}>
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <motion.button
                                                            key={rating}
                                                            className={`${styles.ratingBtn} ${skillRatings[skill.id] === rating ? styles.ratingActive : ''
                                                                }`}
                                                            onClick={() => handleSkillRating(skill.id, rating)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            {rating}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.navigationButtons}>
                                        <button className={styles.navBtn} onClick={() => {
                                            setCurrentSection(2);
                                            setCurrentQuestion(dynamicInterestQuestions.length - 1);
                                        }}>
                                            <ChevronLeft size={18} />
                                            Previous
                                        </button>
                                        <motion.button
                                            className={styles.submitBtn}
                                            onClick={handleSkillsNext}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Brain size={18} />
                                            Continue to Aptitude
                                            <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Aptitude Questions — now section 4 */}
                        {currentSection === 4 && (
                            <motion.div
                                key={`aptitude-${currentQuestion}`}
                                className={styles.questionScreen}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                {isLoadingQuestions ? (
                                    <div className={styles.loadingCard}>
                                        {activeStream && (
                                            <div className={styles.loadingStreamIcon} style={{ background: activeStream.gradient }}>
                                                <activeStream.icon size={28} />
                                            </div>
                                        )}
                                        <Loader2 size={40} className={styles.spinner} />
                                        <h3>Generating {activeStream?.label} Questions...</h3>
                                        <p>Our AI is creating personalized aptitude questions for your stream</p>
                                    </div>
                                ) : aptitudeQuestions.length > 0 ? (
                                    <div className={styles.questionCard}>
                                        {/* Stream Banner */}
                                        {activeStream && (
                                            <div className={styles.streamBanner} style={{ background: activeStream.gradient }}>
                                                <activeStream.icon size={16} />
                                                <span>{activeStream.label} — Aptitude Test</span>
                                            </div>
                                        )}

                                        {apiError && (
                                            <div className={styles.apiError}>
                                                <AlertCircle size={16} />
                                                {apiError}
                                            </div>
                                        )}

                                        <div className={styles.questionHeader}>
                                            <div className={styles.questionMeta}>
                                                <span className={styles.questionNumber}>
                                                    Question {currentQuestion + 1} of {aptitudeQuestions.length}
                                                </span>
                                                <span className={styles.categoryBadge}>
                                                    {aptitudeQuestions[currentQuestion]?.category}
                                                </span>
                                            </div>
                                            <div className={styles.questionTitleRow}>
                                                <h2 className={styles.questionTitle}>
                                                    {aptitudeQuestions[currentQuestion]?.question}
                                                </h2>
                                                {/* Change this question button */}
                                                {!aptitudeAnswers[aptitudeQuestions[currentQuestion]?.id] && (
                                                    <motion.button
                                                        className={styles.changeQuestionBtn}
                                                        onClick={() => changeAptitudeQuestion(currentQuestion)}
                                                        whileHover={{ scale: 1.05, rotate: 15 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        title="Get a different question"
                                                    >
                                                        <RefreshCw size={15} />
                                                        Change
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mini progress dots */}
                                        <div className={styles.questionDots}>
                                            {aptitudeQuestions.map((q, i) => (
                                                <div
                                                    key={i}
                                                    className={`${styles.questionDot} ${i === currentQuestion ? styles.questionDotActive : ''} ${aptitudeAnswers[q.id] && aptitudeAnswers[q.id] !== '__skipped__' ? styles.questionDotDone : ''} ${aptitudeAnswers[q.id] === '__skipped__' ? styles.questionDotSkipped : ''}`}
                                                />
                                            ))}
                                        </div>

                                        <div className={styles.optionsGridSimple}>
                                            {aptitudeQuestions[currentQuestion]?.options.map((option) => (
                                                <motion.button
                                                    key={option.id}
                                                    className={`${styles.optionCardSimple} ${aptitudeAnswers[aptitudeQuestions[currentQuestion].id] === option.id
                                                        ? styles.optionSelected
                                                        : ''
                                                        }`}
                                                    onClick={() => handleAptitudeAnswer(aptitudeQuestions[currentQuestion].id, option.id)}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className={styles.optionLetter}>{option.id.toUpperCase()}</span>
                                                    <span className={styles.optionText}>{option.text}</span>
                                                    {aptitudeAnswers[aptitudeQuestions[currentQuestion].id] === option.id && (
                                                        <CheckCircle2 size={18} className={styles.checkIcon} />
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className={styles.navigationButtons}>
                                            <button className={styles.navBtn} onClick={prevAptitudeQuestion}>
                                                <ChevronLeft size={18} />
                                                Previous
                                            </button>
                                            <div className={styles.rightButtons}>
                                                <button
                                                    className={styles.skipBtn}
                                                    onClick={skipAptitudeQuestion}
                                                >
                                                    <SkipForward size={16} />
                                                    Skip
                                                </button>
                                                <motion.button
                                                    className={styles.nextBtn}
                                                    onClick={nextAptitudeQuestion}
                                                    disabled={!aptitudeAnswers[aptitudeQuestions[currentQuestion]?.id]}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {currentQuestion < aptitudeQuestions.length - 1 ? 'Next' : 'Finish'}
                                                    <ChevronRight size={18} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </motion.div>
                        )}



                        {/* Results Screen */}
                        {showResults && currentSection === 5 && (
                            <motion.div
                                key="results"
                                className={styles.resultsScreen}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.resultsContainer}>
                                    {/* Stream Summary Banner */}
                                    {activeStream && (
                                        <motion.div
                                            className={styles.resultStreamBanner}
                                            style={{ background: activeStream.gradient }}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <activeStream.icon size={20} />
                                            <div>
                                                <strong>{personalInfo.name}&apos;s Assessment Complete</strong>
                                                <span>Stream: {activeStream.label}</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Score Summary */}
                                    <div className={styles.scoreCard}>
                                        <div className={styles.scoreHeader}>
                                            <Trophy size={32} style={{ color: getScoreMessage().color }} />
                                            <h2>{getScoreMessage().text}</h2>
                                        </div>

                                        <div className={styles.scoreCircle}>
                                            <svg viewBox="0 0 100 100">
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    fill="none"
                                                    stroke="var(--border-subtle)"
                                                    strokeWidth="8"
                                                />
                                                <motion.circle
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    fill="none"
                                                    stroke={getScoreMessage().color}
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${2 * Math.PI * 45}`}
                                                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                                                    animate={{
                                                        strokeDashoffset: 2 * Math.PI * 45 * (1 - getScorePercentage() / 100)
                                                    }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            <div className={styles.scoreValue}>
                                                <span>{getScorePercentage()}%</span>
                                                <small>Score</small>
                                            </div>
                                        </div>

                                        <div className={styles.scoreStats}>
                                            <div className={styles.scoreStat}>
                                                <CheckCircle2 size={20} style={{ color: '#22c55e' }} />
                                                <span>{questionResults.filter(r => r.isCorrect).length}</span>
                                                <small>Correct</small>
                                            </div>
                                            <div className={styles.scoreStat}>
                                                <XCircle size={20} style={{ color: '#ef4444' }} />
                                                <span>{questionResults.filter(r => !r.isCorrect && !r.skipped).length}</span>
                                                <small>Wrong</small>
                                            </div>
                                            <div className={styles.scoreStat}>
                                                <SkipForward size={20} style={{ color: '#f59e0b' }} />
                                                <span>{questionResults.filter(r => r.skipped).length}</span>
                                                <small>Skipped</small>
                                            </div>
                                        </div>

                                        <div className={styles.timeCompleted}>
                                            <Clock size={16} />
                                            <span>Completed in {formatTime(timeElapsed)}</span>
                                        </div>
                                    </div>

                                    {/* Question Review — Collapsible */}
                                    <div className={styles.reviewSection}>
                                        <div className={styles.reviewSectionHeader}>
                                            <h3 className={styles.reviewTitle}>
                                                <BookOpen size={20} />
                                                Question Review
                                            </h3>
                                            <div className={styles.reviewActions}>
                                                <button
                                                    className={styles.expandAllBtn}
                                                    onClick={() => {
                                                        const allOpen: Record<number, boolean> = {};
                                                        questionResults.forEach((r) => { allOpen[r.question.id] = true; });
                                                        setExpandedReviews(allOpen);
                                                    }}
                                                >
                                                    Expand All
                                                </button>
                                                <button
                                                    className={styles.expandAllBtn}
                                                    onClick={() => setExpandedReviews({})}
                                                >
                                                    Collapse All
                                                </button>
                                            </div>
                                        </div>

                                        <div className={styles.reviewList}>
                                            {questionResults.map((result, index) => (
                                                <motion.div
                                                    key={result.question.id}
                                                    className={`${styles.reviewCard} ${result.isCorrect ? styles.reviewCorrect : result.skipped ? styles.reviewSkipped : styles.reviewWrong}`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    {/* Collapsible Header */}
                                                    <button
                                                        className={styles.reviewCollapseHeader}
                                                        onClick={() => toggleReview(result.question.id)}
                                                        aria-expanded={!!expandedReviews[result.question.id]}
                                                    >
                                                        <div className={styles.reviewHeaderLeft}>
                                                            <span className={styles.reviewNumber}>Q{index + 1}</span>
                                                            <span className={styles.reviewCategory}>{result.question.category}</span>
                                                            <p className={styles.reviewQuestionPreview}>
                                                                {result.question.question.length > 70
                                                                    ? result.question.question.slice(0, 70) + '…'
                                                                    : result.question.question}
                                                            </p>
                                                        </div>
                                                        <div className={styles.reviewHeaderRight}>
                                                            {result.isCorrect ? (
                                                                <CheckCircle2 size={20} className={styles.reviewIconCorrect} />
                                                            ) : result.skipped ? (
                                                                <SkipForward size={20} className={styles.reviewIconSkipped} />
                                                            ) : (
                                                                <XCircle size={20} className={styles.reviewIconWrong} />
                                                            )}
                                                            <motion.div
                                                                animate={{ rotate: expandedReviews[result.question.id] ? 180 : 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <ChevronDown size={18} className={styles.reviewChevron} />
                                                            </motion.div>
                                                        </div>
                                                    </button>

                                                    {/* Collapsible Body */}
                                                    <AnimatePresence>
                                                        {expandedReviews[result.question.id] && (
                                                            <motion.div
                                                                className={styles.reviewBody}
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                            >
                                                                <p className={styles.reviewQuestion}>{result.question.question}</p>

                                                                <div className={styles.reviewAnswers}>
                                                                    {result.userAnswer && !result.skipped && (
                                                                        <div className={`${styles.reviewAnswer} ${result.isCorrect ? styles.answerCorrect : styles.answerWrong}`}>
                                                                            <span>Your answer:</span>
                                                                            <strong>
                                                                                {result.question.options.find(o => o.id === result.userAnswer)?.text}
                                                                            </strong>
                                                                        </div>
                                                                    )}
                                                                    {result.skipped && (
                                                                        <div className={`${styles.reviewAnswer} ${styles.answerSkipped}`}>
                                                                            <SkipForward size={14} />
                                                                            <span>You skipped this question</span>
                                                                        </div>
                                                                    )}
                                                                    {!result.isCorrect && (
                                                                        <div className={`${styles.reviewAnswer} ${styles.answerCorrect}`}>
                                                                            <span>Correct answer:</span>
                                                                            <strong>
                                                                                {result.question.options.find(o => o.id === result.question.correctAnswer)?.text}
                                                                            </strong>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className={styles.reviewExplanation}>
                                                                    <h4>Explanation:</h4>
                                                                    <p>{result.question.explanation}</p>
                                                                </div>

                                                                <div className={styles.reviewTip}>
                                                                    <Lightbulb size={16} />
                                                                    <div>
                                                                        <strong>Tip:</strong>
                                                                        <p>{result.question.tip}</p>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className={styles.resultsActions}>
                                        <Link href="/results" style={{ width: '100%' }}>
                                            <motion.button
                                                className={styles.fullReportBtn}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{ width: '100%', marginBottom: '1rem' }}
                                            >
                                                <Target size={18} />
                                                View Full Career Report
                                            </motion.button>
                                        </Link>
                                        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                            <Link href="/" style={{ flex: 1 }}>
                                                <button className={styles.homeBtn} style={{ width: '100%' }}>
                                                    <Home size={18} />
                                                    Back to Home
                                                </button>
                                            </Link>
                                            <motion.button
                                                className={styles.retryBtn}
                                                onClick={restartAssessment}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{ flex: 1 }}
                                            >
                                                <RotateCcw size={18} />
                                                Try Again
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}

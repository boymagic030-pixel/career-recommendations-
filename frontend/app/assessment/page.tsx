'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    ChevronLeft,
    ChevronRight,
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
    AlertCircle
} from 'lucide-react';
import { Navbar } from '@/components';
import styles from './page.module.css';

// Assessment sections
const sections = [
    { id: 'welcome', title: 'Welcome', icon: Sparkles },
    { id: 'personal', title: 'Personal Info', icon: Target },
    { id: 'interests', title: 'Interests', icon: Heart },
    { id: 'aptitude', title: 'Aptitude', icon: Brain },
    { id: 'skills', title: 'Skills', icon: Wrench },
    { id: 'results', title: 'Results', icon: Trophy },
];

// Sample interest questions
const interestQuestions = [
    {
        id: 1,
        question: 'Which activity excites you the most?',
        options: [
            { id: 'a', text: 'Solving complex mathematical problems', icon: '🧮' },
            { id: 'b', text: 'Creating art, music, or designs', icon: '🎨' },
            { id: 'c', text: 'Helping people solve their problems', icon: '🤝' },
            { id: 'd', text: 'Analyzing data and finding patterns', icon: '📊' },
        ],
    },
    {
        id: 2,
        question: 'In a group project, you usually prefer to:',
        options: [
            { id: 'a', text: 'Lead and organize the team', icon: '👥' },
            { id: 'b', text: 'Come up with creative ideas', icon: '💡' },
            { id: 'c', text: 'Handle the technical aspects', icon: '⚙️' },
            { id: 'd', text: 'Ensure everyone is comfortable', icon: '❤️' },
        ],
    },
    {
        id: 3,
        question: 'What type of environment do you prefer?',
        options: [
            { id: 'a', text: 'Fast-paced and dynamic', icon: '🚀' },
            { id: 'b', text: 'Structured and organized', icon: '📋' },
            { id: 'c', text: 'Creative and flexible', icon: '🌈' },
            { id: 'd', text: 'Calm and supportive', icon: '🌿' },
        ],
    },
    {
        id: 4,
        question: 'What drives you the most?',
        options: [
            { id: 'a', text: 'Financial success and stability', icon: '💰' },
            { id: 'b', text: 'Making a positive impact', icon: '🌍' },
            { id: 'c', text: 'Personal growth and learning', icon: '📚' },
            { id: 'd', text: 'Recognition and achievement', icon: '🏆' },
        ],
    },
    {
        id: 5,
        question: 'How do you prefer to learn new things?',
        options: [
            { id: 'a', text: 'Reading and research', icon: '📖' },
            { id: 'b', text: 'Hands-on experimentation', icon: '🔬' },
            { id: 'c', text: 'Watching videos and demos', icon: '🎬' },
            { id: 'd', text: 'Discussion with others', icon: '💬' },
        ],
    },
];

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

interface AptitudeQuestion {
    id: number;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
    tip: string;
    category: string;
}

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
    const [personalInfo, setPersonalInfo] = useState({ name: '', age: '', education: '' });
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    // Aptitude specific states
    const [aptitudeQuestions, setAptitudeQuestions] = useState<AptitudeQuestion[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
    const [aptitudeAnswers, setAptitudeAnswers] = useState<Record<number, string>>({});
    const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

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

    // Generate aptitude questions using API route
    const generateAptitudeQuestions = useCallback(async () => {
        setIsLoadingQuestions(true);
        setApiError(null);

        try {
            const response = await fetch('/api/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success && data.questions) {
                setAptitudeQuestions(data.questions);
                if (data.fallback) {
                    setApiError('Using backup questions. AI generation temporarily unavailable.');
                }
            } else {
                throw new Error('Failed to load questions');
            }
        } catch (error) {
            console.error('Error generating questions:', error);
            setApiError('Failed to generate questions. Using backup questions.');

            // Fallback questions if API fails
            setAptitudeQuestions([
                {
                    id: 1,
                    question: 'If 5 workers can complete a task in 12 days, how many days will 10 workers take?',
                    options: [
                        { id: 'a', text: '6 days' },
                        { id: 'b', text: '24 days' },
                        { id: 'c', text: '8 days' },
                        { id: 'd', text: '10 days' }
                    ],
                    correctAnswer: 'a',
                    explanation: 'This is an inverse proportion problem. More workers = less time. If 5 workers take 12 days, then 10 workers (double the workers) will take half the time: 12 ÷ 2 = 6 days.',
                    tip: 'For work problems, remember: Workers × Days = Constant work. So W1 × D1 = W2 × D2.',
                    category: 'Numerical'
                },
                {
                    id: 2,
                    question: 'Complete the pattern: 2, 6, 12, 20, __',
                    options: [
                        { id: 'a', text: '28' },
                        { id: 'b', text: '30' },
                        { id: 'c', text: '32' },
                        { id: 'd', text: '24' }
                    ],
                    correctAnswer: 'b',
                    explanation: 'The pattern shows differences increasing by 2: 6-2=4, 12-6=6, 20-12=8. Next difference is 10, so 20+10=30.',
                    tip: 'Look for patterns in the differences between consecutive numbers.',
                    category: 'Pattern'
                },
                {
                    id: 3,
                    question: 'Which word is most similar to "INNOVATIVE"?',
                    options: [
                        { id: 'a', text: 'Traditional' },
                        { id: 'b', text: 'Creative' },
                        { id: 'c', text: 'Boring' },
                        { id: 'd', text: 'Simple' }
                    ],
                    correctAnswer: 'b',
                    explanation: 'Innovative means introducing new ideas or methods. Creative also means having the ability to create or think of new things.',
                    tip: 'For synonym questions, think about the core meaning and find the option with the closest meaning.',
                    category: 'Verbal'
                },
                {
                    id: 4,
                    question: 'If all roses are flowers and some flowers fade quickly, which statement is definitely true?',
                    options: [
                        { id: 'a', text: 'All roses fade quickly' },
                        { id: 'b', text: 'Some roses may fade quickly' },
                        { id: 'c', text: 'No roses fade quickly' },
                        { id: 'd', text: 'All flowers are roses' }
                    ],
                    correctAnswer: 'b',
                    explanation: 'Since roses are a subset of flowers, and some flowers fade quickly, it\'s possible (but not certain) that some roses are among those that fade quickly.',
                    tip: 'In logical reasoning, be careful with words like "all", "some", and "none". Only choose what must be true.',
                    category: 'Logical'
                },
                {
                    id: 5,
                    question: 'A train travels 240 km in 4 hours. What is its speed in m/s?',
                    options: [
                        { id: 'a', text: '16.67 m/s' },
                        { id: 'b', text: '60 m/s' },
                        { id: 'c', text: '24 m/s' },
                        { id: 'd', text: '6.67 m/s' }
                    ],
                    correctAnswer: 'a',
                    explanation: 'Speed = 240 km ÷ 4 hours = 60 km/h. To convert to m/s: 60 × (1000/3600) = 60 × (5/18) = 16.67 m/s.',
                    tip: 'To convert km/h to m/s, multiply by 5/18. To convert m/s to km/h, multiply by 18/5.',
                    category: 'Numerical'
                },
                {
                    id: 6,
                    question: 'Find the next number: 3, 9, 27, 81, __',
                    options: [
                        { id: 'a', text: '162' },
                        { id: 'b', text: '243' },
                        { id: 'c', text: '189' },
                        { id: 'd', text: '324' }
                    ],
                    correctAnswer: 'b',
                    explanation: 'Each number is multiplied by 3: 3×3=9, 9×3=27, 27×3=81, 81×3=243.',
                    tip: 'Check if the pattern involves multiplication or division before looking at addition/subtraction.',
                    category: 'Pattern'
                },
                {
                    id: 7,
                    question: 'Choose the word that is opposite in meaning to "ABUNDANT"',
                    options: [
                        { id: 'a', text: 'Plentiful' },
                        { id: 'b', text: 'Scarce' },
                        { id: 'c', text: 'Sufficient' },
                        { id: 'd', text: 'Ample' }
                    ],
                    correctAnswer: 'b',
                    explanation: 'Abundant means existing in large quantities. Scarce means insufficient or inadequate, which is the opposite.',
                    tip: 'For antonym questions, identify the core meaning first, then find its direct opposite.',
                    category: 'Verbal'
                },
                {
                    id: 8,
                    question: 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?',
                    options: [
                        { id: 'a', text: 'Father' },
                        { id: 'b', text: 'Uncle' },
                        { id: 'c', text: 'Grandfather' },
                        { id: 'd', text: 'Brother' }
                    ],
                    correctAnswer: 'b',
                    explanation: 'A is B\'s brother, B is C\'s sister (so A is also C\'s sibling), C is D\'s father. Therefore, A is D\'s uncle.',
                    tip: 'Draw a family tree diagram to visualize relationships clearly.',
                    category: 'Logical'
                },
                {
                    id: 9,
                    question: 'What is 15% of 80?',
                    options: [
                        { id: 'a', text: '10' },
                        { id: 'b', text: '12' },
                        { id: 'c', text: '15' },
                        { id: 'd', text: '8' }
                    ],
                    correctAnswer: 'b',
                    explanation: '15% of 80 = (15/100) × 80 = 0.15 × 80 = 12.',
                    tip: 'Quick method: 10% of 80 = 8, 5% = 4. So 15% = 8 + 4 = 12.',
                    category: 'Numerical'
                },
                {
                    id: 10,
                    question: 'If APPLE is coded as ELPPA, how would ORANGE be coded?',
                    options: [
                        { id: 'a', text: 'EGNARO' },
                        { id: 'b', text: 'ORANGE' },
                        { id: 'c', text: 'NRGAEO' },
                        { id: 'd', text: 'EGRANO' }
                    ],
                    correctAnswer: 'a',
                    explanation: 'The pattern is reversing the word. ORANGE reversed is EGNARO.',
                    tip: 'In coding questions, first identify the pattern by comparing the original with the coded version.',
                    category: 'Pattern'
                }
            ]);
        } finally {
            setIsLoadingQuestions(false);
        }
    }, []);

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
        if (currentQuestion < interestQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(0);
            setCurrentSection(3); // Move to aptitude
            generateAptitudeQuestions();
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
            // Calculate results
            calculateResults();
        }
    };

    const skipAptitudeQuestion = () => {
        // Mark as skipped and move to next
        const currentQ = aptitudeQuestions[currentQuestion];
        if (currentQ && !aptitudeAnswers[currentQ.id]) {
            // If no answer selected, mark as skipped
            setAptitudeAnswers((prev) => ({ ...prev, [currentQ.id]: '__skipped__' }));
        }
        nextAptitudeQuestion();
    };

    const prevAptitudeQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            setCurrentSection(2); // Back to interests
            setCurrentQuestion(interestQuestions.length - 1);
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

        setQuestionResults(results);
        setShowResults(true);
        setCurrentSection(5); // Move to results section
    };

    const startAssessment = () => {
        setIsStarted(true);
        setCurrentSection(1);
    };

    const handlePersonalNext = () => {
        if (personalInfo.name && personalInfo.age && personalInfo.education) {
            setCurrentSection(2);
            setCurrentQuestion(0);
        }
    };

    const handleSkillsNext = () => {
        setCurrentSection(3); // Move to aptitude
        setCurrentQuestion(0);
        generateAptitudeQuestions();
    };

    const restartAssessment = () => {
        setCurrentSection(0);
        setCurrentQuestion(0);
        setAnswers({});
        setAptitudeAnswers({});
        setSkillRatings({});
        setPersonalInfo({ name: '', age: '', education: '' });
        setTimeElapsed(0);
        setIsStarted(false);
        setAptitudeQuestions([]);
        setQuestionResults([]);
        setShowResults(false);
    };

    const getScorePercentage = () => {
        const correct = questionResults.filter(r => r.isCorrect).length;
        return Math.round((correct / questionResults.length) * 100);
    };

    const getScoreMessage = () => {
        const percentage = getScorePercentage();
        if (percentage >= 80) return { text: 'Excellent!', color: '#22c55e' };
        if (percentage >= 60) return { text: 'Good Job!', color: '#3b82f6' };
        if (percentage >= 40) return { text: 'Keep Practicing!', color: '#f59e0b' };
        return { text: 'Need Improvement', color: '#ef4444' };
    };

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
                                    {currentSection === 3 && aptitudeQuestions.length > 0 && (
                                        <span className={styles.questionCounter}>
                                            ({currentQuestion + 1}/{aptitudeQuestions.length})
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
                                        test will analyze your interests, aptitude, and skills
                                        to recommend the best career paths for you.
                                    </p>

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
                                            <li><CheckCircle2 size={16} /> Answer honestly - there are no right or wrong answers</li>
                                            <li><CheckCircle2 size={16} /> Find a quiet place without distractions</li>
                                            <li><CheckCircle2 size={16} /> Take your time, don&apos;t rush</li>
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
                                    </div>

                                    <div className={styles.navigationButtons}>
                                        <button className={styles.navBtn} onClick={() => setCurrentSection(0)}>
                                            <ChevronLeft size={18} />
                                            Back
                                        </button>
                                        <motion.button
                                            className={styles.nextBtn}
                                            onClick={handlePersonalNext}
                                            disabled={!personalInfo.name || !personalInfo.age || !personalInfo.education}
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
                        {currentSection === 2 && (
                            <motion.div
                                key={`interest-${currentQuestion}`}
                                className={styles.questionScreen}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={styles.questionCard}>
                                    <div className={styles.questionHeader}>
                                        <span className={styles.questionNumber}>
                                            Question {currentQuestion + 1} of {interestQuestions.length}
                                        </span>
                                        <h2 className={styles.questionTitle}>
                                            {interestQuestions[currentQuestion]?.question}
                                        </h2>
                                    </div>

                                    <div className={styles.optionsGrid}>
                                        {interestQuestions[currentQuestion]?.options.map((option) => (
                                            <motion.button
                                                key={option.id}
                                                className={`${styles.optionCard} ${answers[`q${interestQuestions[currentQuestion].id}`] === option.id
                                                    ? styles.optionSelected
                                                    : ''
                                                    }`}
                                                onClick={() => handleAnswer(interestQuestions[currentQuestion].id, option.id)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className={styles.optionIcon}>{option.icon}</span>
                                                <span className={styles.optionText}>{option.text}</span>
                                                {answers[`q${interestQuestions[currentQuestion].id}`] === option.id && (
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
                                            disabled={!answers[`q${interestQuestions[currentQuestion].id}`]}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {currentQuestion < interestQuestions.length - 1 ? 'Next' : 'Continue'}
                                            <ChevronRight size={18} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Aptitude Questions */}
                        {currentSection === 3 && (
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
                                        <Loader2 size={48} className={styles.spinner} />
                                        <h3>Generating Questions...</h3>
                                        <p>Our AI is creating personalized aptitude questions for you</p>
                                    </div>
                                ) : aptitudeQuestions.length > 0 ? (
                                    <div className={styles.questionCard}>
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
                                            <h2 className={styles.questionTitle}>
                                                {aptitudeQuestions[currentQuestion]?.question}
                                            </h2>
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
                                                    whileHover={{ scale: 1.02 }}
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

                        {/* Skills Section */}
                        {currentSection === 4 && (
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
                                        <span className={styles.questionNumber}>Final Step</span>
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
                                        <button className={styles.navBtn} onClick={() => setCurrentSection(3)}>
                                            <ChevronLeft size={18} />
                                            Previous
                                        </button>
                                        <motion.button
                                            className={styles.submitBtn}
                                            onClick={handleSkillsNext}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Sparkles size={18} />
                                            Get My Results
                                            <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                </div>
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

                                    {/* Question Review */}
                                    <div className={styles.reviewSection}>
                                        <h3 className={styles.reviewTitle}>
                                            <Lightbulb size={20} />
                                            Question Review
                                        </h3>

                                        <div className={styles.reviewList}>
                                            {questionResults.map((result, index) => (
                                                <motion.div
                                                    key={result.question.id}
                                                    className={`${styles.reviewCard} ${result.isCorrect ? styles.reviewCorrect : result.skipped ? styles.reviewSkipped : styles.reviewWrong}`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <div className={styles.reviewHeader}>
                                                        <span className={styles.reviewNumber}>Q{index + 1}</span>
                                                        <span className={styles.reviewCategory}>{result.question.category}</span>
                                                        {result.isCorrect ? (
                                                            <CheckCircle2 size={20} className={styles.reviewIconCorrect} />
                                                        ) : result.skipped ? (
                                                            <SkipForward size={20} className={styles.reviewIconSkipped} />
                                                        ) : (
                                                            <XCircle size={20} className={styles.reviewIconWrong} />
                                                        )}
                                                    </div>

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
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className={styles.resultsActions}>
                                        <Link href="/">
                                            <button className={styles.homeBtn}>
                                                <Home size={18} />
                                                Back to Home
                                            </button>
                                        </Link>
                                        <motion.button
                                            className={styles.retryBtn}
                                            onClick={restartAssessment}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <RotateCcw size={18} />
                                            Try Again
                                        </motion.button>
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

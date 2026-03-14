'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    Sparkles,
    ArrowRight,
    ChevronDown,
    BookOpen,
    Briefcase,
    TrendingUp,
    Clock,
    DollarSign,
    Star,
    Beaker,
    PieChart,
    Palette,
    Wrench,
    CheckCircle,
    Award,
    MapPin,
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

// Animation variants
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

// ─── STREAM DATA ────────────────────────────────────────────────────────────

type StreamKey = 'science' | 'commerce' | 'arts' | 'vocational';

interface CareerPath {
    title: string;
    icon: string;
    duration: string;
    salary: string;
    demand: 'High' | 'Very High' | 'Medium' | 'Growing' | 'Stable';
    description: string;
    entranceExams: string[];
    topColleges: string[];
    skills: string[];
    subPaths?: string[];
}

interface StreamData {
    id: StreamKey;
    name: string;
    tagline: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    description: string;
    eligibility: string;
    subjects: string[];
    careerPaths: CareerPath[];
}

const streamsData: StreamData[] = [
    {
        id: 'science',
        name: 'Science',
        tagline: 'For the Curious & Analytical Minds',
        icon: Beaker,
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        description:
            'The Science stream opens doors to some of the most in-demand and highest-paying careers. If you have a passion for logical thinking, problem-solving, and innovation, this is your path.',
        eligibility: 'Completed 12th with Physics, Chemistry, Maths/Biology',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
        careerPaths: [
            {
                title: 'B.Tech / B.E. (Engineering)',
                icon: '⚙️',
                duration: '4 years',
                salary: '₹4-25 LPA',
                demand: 'Very High',
                description:
                    'Pursue engineering in Computer Science, Mechanical, Electronics, Civil, or other branches. One of the most popular choices after 12th Science with Maths.',
                entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'State CETs'],
                topColleges: ['IITs', 'NITs', 'BITS Pilani', 'VIT', 'SRM University'],
                skills: ['Problem Solving', 'Mathematics', 'Programming', 'Analytical Thinking'],
                subPaths: ['Computer Science', 'Mechanical', 'Electronics', 'Civil', 'AI & ML', 'Data Science'],
            },
            {
                title: 'MBBS / BDS (Medicine)',
                icon: '🏥',
                duration: '5.5 years (MBBS) / 5 years (BDS)',
                salary: '₹6-30 LPA',
                demand: 'Very High',
                description:
                    'Become a doctor or dentist. Highly respected and rewarding career with immense social impact. Requires Biology in 12th.',
                entranceExams: ['NEET UG', 'AIIMS (merged with NEET)', 'JIPMER (merged with NEET)'],
                topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'Maulana Azad Medical College', 'KEM Mumbai'],
                skills: ['Biology', 'Empathy', 'Dedication', 'Communication'],
                subPaths: ['General Medicine', 'Surgery', 'Pediatrics', 'Dermatology', 'Cardiology', 'Orthopedics'],
            },
            {
                title: 'B.Sc. (Bachelor of Science)',
                icon: '🔬',
                duration: '3 years',
                salary: '₹3-12 LPA',
                demand: 'Medium',
                description:
                    'A versatile degree covering Physics, Chemistry, Biology, Mathematics, Computer Science, and more. Great foundation for research or higher studies.',
                entranceExams: ['CUET', 'University-specific entrance exams'],
                topColleges: ['St. Stephens', 'Hindu College', 'Loyola College', 'Christ University', 'Presidency College'],
                skills: ['Research', 'Analytical Thinking', 'Laboratory Skills', 'Scientific Writing'],
                subPaths: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'Data Science'],
            },
            {
                title: 'B.Pharm (Pharmacy)',
                icon: '💊',
                duration: '4 years',
                salary: '₹3-10 LPA',
                demand: 'High',
                description:
                    'Study pharmaceutical sciences, drug development, and healthcare. Growing demand in pharmaceutical industry.',
                entranceExams: ['GPAT', 'State-level pharmacy entrance exams'],
                topColleges: ['NIPER', 'ICT Mumbai', 'Jamia Hamdard', 'Manipal College of Pharmacy'],
                skills: ['Chemistry', 'Biology', 'Attention to Detail', 'Patient Care'],
            },
            {
                title: 'B.Arch (Architecture)',
                icon: '🏛️',
                duration: '5 years',
                salary: '₹4-15 LPA',
                demand: 'Medium',
                description:
                    'Design and plan buildings, urban spaces, and structures. Combines creativity with engineering principles.',
                entranceExams: ['NATA', 'JEE Main (Paper 2)'],
                topColleges: ['IIT Kharagpur', 'SPA Delhi', 'CEPT Ahmedabad', 'NIT Trichy'],
                skills: ['Design Thinking', 'Mathematics', 'Creativity', 'AutoCAD'],
            },
            {
                title: 'BCA (Computer Applications)',
                icon: '💻',
                duration: '3 years',
                salary: '₹3-12 LPA',
                demand: 'High',
                description:
                    'Focus on programming, software development, and IT. A great alternative to B.Tech for tech enthusiasts.',
                entranceExams: ['CUET', 'IPU CET', 'KIITEE'],
                topColleges: ['Christ University', 'Symbiosis', 'Loyola College', 'Presidency University'],
                skills: ['Programming', 'Logical Thinking', 'Database Management', 'Web Development'],
            },
            {
                title: 'NDA (National Defence Academy)',
                icon: '🎖️',
                duration: '3 years + Pre-commission Training',
                salary: '₹8-12 LPA (Initial)',
                demand: 'Stable',
                description:
                    'Join the Indian Army, Navy, or Air Force as an officer. A highly respected career of valor and discipline for PCM students.',
                entranceExams: ['NDA & NA Exam (UPSC)'],
                topColleges: ['National Defence Academy, Pune'],
                skills: ['Leadership', 'Physical Fitness', 'Discipline', 'Strategic Thinking'],
                subPaths: ['Army', 'Navy', 'Air Force'],
            },
            {
                title: 'Commercial Pilot / Aviation',
                icon: '✈️',
                duration: '18-24 months (Flying Training)',
                salary: '₹15-30 LPA',
                demand: 'Growing',
                description:
                    'Train to become a commercial airline pilot. Requires Physics and Mathematics in 12th. High initial investment but very rewarding.',
                entranceExams: ['Aviation Medicals', 'DGCA Exams', 'Flying School Entrances'],
                topColleges: ['IGRUA', 'NFTI', 'Madhya Pradesh Flying Club'],
                skills: ['Aviation Knowledge', 'Quick Decision Making', 'Communication', 'Technical Proficiency'],
            },
        ],
    },
    {
        id: 'commerce',
        name: 'Commerce',
        tagline: 'For Business & Finance Enthusiasts',
        icon: PieChart,
        color: '#06b6d4',
        gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        description:
            'The Commerce stream is ideal for students interested in business, finance, accounting, and economics. It offers a wide range of professional and entrepreneurial career options.',
        eligibility: 'Completed 12th with Commerce (Accounts, Economics, Business Studies)',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Informatics Practices'],
        careerPaths: [
            {
                title: 'Chartered Accountancy (CA)',
                icon: '📊',
                duration: '4-5 years (after 12th)',
                salary: '₹7-30 LPA',
                demand: 'Very High',
                description:
                    'One of the most prestigious career paths in commerce. CAs handle auditing, taxation, financial planning, and consultation for businesses.',
                entranceExams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
                topColleges: ['ICAI (Institute of Chartered Accountants of India)'],
                skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis', 'Attention to Detail'],
                subPaths: ['Audit & Assurance', 'Taxation', 'Corporate Finance', 'Forensic Accounting'],
            },
            {
                title: 'B.Com (Bachelor of Commerce)',
                icon: '💼',
                duration: '3 years',
                salary: '₹3-10 LPA',
                demand: 'High',
                description:
                    'A foundational degree covering accounting, finance, business law, and economics. Great stepping stone for CA, MBA, or other professional courses.',
                entranceExams: ['CUET', 'DU JAT', 'IPU CET'],
                topColleges: ['SRCC', 'Hindu College', 'Christ University', 'St. Xaviers', 'Narsee Monjee'],
                skills: ['Accounting', 'Business Acumen', 'Communication', 'Excel'],
                subPaths: ['B.Com Honours', 'B.Com in Banking', 'B.Com in Taxation', 'B.Com in Finance'],
            },
            {
                title: 'BBA (Business Administration)',
                icon: '🎯',
                duration: '3 years',
                salary: '₹4-12 LPA',
                demand: 'High',
                description:
                    'Learn management principles, marketing, HR, and entrepreneurship. Excellent preparation for MBA aspirants.',
                entranceExams: ['IPMAT', 'DU JAT', 'NPAT', 'SET'],
                topColleges: ['IIM Indore (IPM)', 'Christ University', 'NMIMS', 'Symbiosis', 'SP Jain'],
                skills: ['Leadership', 'Communication', 'Strategic Thinking', 'Team Management'],
                subPaths: ['Marketing', 'Finance', 'Human Resources', 'Operations', 'Entrepreneurship'],
            },
            {
                title: 'Company Secretary (CS)',
                icon: '📋',
                duration: '3-4 years',
                salary: '₹5-18 LPA',
                demand: 'Medium',
                description:
                    'Specialize in corporate governance, legal compliance, and company law. An essential profession for businesses.',
                entranceExams: ['CS Foundation', 'CS Executive', 'CS Professional'],
                topColleges: ['ICSI (Institute of Company Secretaries of India)'],
                skills: ['Corporate Law', 'Compliance', 'Governance', 'Legal Drafting'],
            },
            {
                title: 'CMA (Cost & Management Accountant)',
                icon: '🧮',
                duration: '3-4 years',
                salary: '₹5-20 LPA',
                demand: 'Growing',
                description:
                    'Focus on cost accounting, financial management, and strategic business decisions. Valued in manufacturing and consulting sectors.',
                entranceExams: ['CMA Foundation', 'CMA Intermediate', 'CMA Final'],
                topColleges: ['ICMAI (Institute of Cost Accountants of India)'],
                skills: ['Cost Accounting', 'Financial Management', 'Strategic Planning', 'Analytics'],
            },
            {
                title: 'B.Com + CFA (Finance)',
                icon: '💹',
                duration: '3-4 years',
                salary: '₹6-25 LPA',
                demand: 'High',
                description:
                    'Combine a commerce degree with the globally recognized CFA certification for a prestigious career in investment banking and financial analysis.',
                entranceExams: ['CFA Level 1, 2, 3'],
                topColleges: ['CFA Institute (Global)', 'Top B-Schools for B.Com'],
                skills: ['Financial Modeling', 'Investment Analysis', 'Portfolio Management', 'Valuation'],
            },
            {
                title: 'Actuarial Science',
                icon: '📈',
                duration: '3-5 years',
                salary: '₹10-35 LPA',
                demand: 'Very High',
                description:
                    'Assess financial risks using mathematics, statistics, and financial theory. Highly sought after in insurance and banking.',
                entranceExams: ['ACET (Actuarial Common Entrance Test)'],
                topColleges: ['Institute of Actuaries of India (IAI)'],
                skills: ['Advanced Mathematics', 'Statistics', 'Risk Management', 'Data Analysis'],
                subPaths: ['Life Insurance', 'General Insurance', 'Health Insurance', 'Pensions'],
            },
            {
                title: 'Bachelor of Hotel Management (BHM)',
                icon: '🏨',
                duration: '3-4 years',
                salary: '₹4-12 LPA',
                demand: 'High',
                description:
                    'Manage hotels, resorts, and tourism businesses. Great for extroverts with a passion for hospitality.',
                entranceExams: ['NCHM JEE', 'State Level Hotel Management Exams'],
                topColleges: ['IHM Pusa', 'IHM Mumbai', 'Welcomgroup Graduate School'],
                skills: ['Communication', 'Hospitality', 'Management', 'Problem Solving'],
                subPaths: ['Food & Beverage', 'Front Office', 'Housekeeping', 'Sales & Marketing'],
            },
        ],
    },
    {
        id: 'arts',
        name: 'Arts / Humanities',
        tagline: 'For Creative & Socially Aware Minds',
        icon: Palette,
        color: '#ec4899',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        description:
            'The Arts stream is for students who are passionate about creativity, society, languages, literature, and social sciences. It leads to diverse and fulfilling careers.',
        eligibility: 'Completed 12th with Arts/Humanities subjects',
        subjects: ['History', 'Political Science', 'Geography', 'Psychology', 'Sociology', 'English Literature'],
        careerPaths: [
            {
                title: 'BA LLB (Law)',
                icon: '⚖️',
                duration: '5 years (Integrated)',
                salary: '₹5-30 LPA',
                demand: 'Very High',
                description:
                    'An integrated law degree combining humanities with legal studies. Leads to careers as an advocate, corporate lawyer, or judge.',
                entranceExams: ['CLAT', 'AILET', 'LSAT India', 'MH CET Law'],
                topColleges: ['NLU Delhi', 'NALSAR Hyderabad', 'NLU Bangalore', 'NUJS Kolkata', 'NLIU Bhopal'],
                skills: ['Critical Thinking', 'Argumentation', 'Legal Research', 'Communication'],
                subPaths: ['Corporate Law', 'Criminal Law', 'Constitutional Law', 'International Law', 'Cyber Law'],
            },
            {
                title: 'BA (Hons) in Psychology',
                icon: '🧠',
                duration: '3 years',
                salary: '₹3-15 LPA',
                demand: 'Growing',
                description:
                    'Study human behavior, cognition, and mental health. Growing demand in counseling, corporate HR, and clinical psychology.',
                entranceExams: ['CUET', 'University entrance exams', 'Jamia entrance'],
                topColleges: ['Lady Shri Ram College', 'Jesus & Mary College', 'Christ University', 'Fergusson College'],
                skills: ['Empathy', 'Research', 'Active Listening', 'Analytical Thinking'],
                subPaths: ['Clinical Psychology', 'Counseling', 'Industrial Psychology', 'Child Psychology'],
            },
            {
                title: 'BA in Journalism & Mass Communication',
                icon: '📰',
                duration: '3 years',
                salary: '₹3-15 LPA',
                demand: 'High',
                description:
                    'Prepare for a career in media, broadcasting, content creation, and public relations. Exciting and dynamic career path.',
                entranceExams: ['IIMC Entrance', 'IPU CET', 'CUET', 'Xavier\'s Entrance'],
                topColleges: ['IIMC', 'AJK MCRC (Jamia)', 'Xavier\'s Mumbai', 'Symbiosis', 'Asian College of Journalism'],
                skills: ['Writing', 'Communication', 'Research', 'Digital Media'],
                subPaths: ['Print Journalism', 'Broadcast Journalism', 'Digital Media', 'Public Relations', 'Advertising'],
            },
            {
                title: 'B.Des (Design)',
                icon: '🎨',
                duration: '4 years',
                salary: '₹4-18 LPA',
                demand: 'High',
                description:
                    'Study design thinking, visual communication, product design, and user experience. Perfect for creative thinkers.',
                entranceExams: ['UCEED', 'NID DAT', 'NIFT Entrance', 'CEED'],
                topColleges: ['NID Ahmedabad', 'NIFT Delhi', 'IDC IIT Bombay', 'Srishti Institute'],
                skills: ['Creativity', 'Visual Thinking', 'Sketching', 'Design Software'],
                subPaths: ['UI/UX Design', 'Product Design', 'Fashion Design', 'Graphic Design', 'Interior Design'],
            },
            {
                title: 'BA in Political Science / UPSC Prep',
                icon: '🏛️',
                duration: '3+ years',
                salary: '₹6-20 LPA (Govt.)',
                demand: 'Stable',
                description:
                    'A popular path for aspiring civil servants. Study political science, public administration, and governance for UPSC and state PSC exams.',
                entranceExams: ['UPSC CSE', 'State PSC', 'SSC CGL'],
                topColleges: ['St. Stephens', 'Hindu College', 'Presidency College', 'Loyola College'],
                skills: ['Current Affairs', 'Essay Writing', 'General Knowledge', 'Ethics'],
                subPaths: ['IAS', 'IPS', 'IFS', 'State Civil Services'],
            },
            {
                title: 'BA in Social Work',
                icon: '🤝',
                duration: '3 years',
                salary: '₹3-10 LPA',
                demand: 'Growing',
                description:
                    'Work towards social change and community development. Rewarding career in NGOs, government agencies, and international organizations.',
                entranceExams: ['CUET', 'TISS BAT'],
                topColleges: ['TISS Mumbai', 'Delhi School of Social Work', 'Loyola College', 'Madras School of Social Work'],
                skills: ['Empathy', 'Community Engagement', 'Research', 'Counseling'],
            },
            {
                title: 'Bachelor of Fine Arts (BFA)',
                icon: '🖌️',
                duration: '3-4 years',
                salary: '₹3-15 LPA',
                demand: 'Growing',
                description:
                    'Specialized degree for visual and performing arts. Ideal for students talented in painting, sculpture, music, or dance.',
                entranceExams: ['Institute specific tests (e.g. BHU UET)'],
                topColleges: ['College of Art Delhi', 'Sir JJ School of Art', 'BHU', 'Kala Bhavana'],
                skills: ['Creativity', 'Aesthetics', 'Technique', 'Patience'],
                subPaths: ['Painting', 'Sculpture', 'Applied Art', 'Photography'],
            },
            {
                title: 'Foreign Languages / Translation',
                icon: '🌍',
                duration: '3 years (BA) or Diplomas',
                salary: '₹4-18 LPA',
                demand: 'High',
                description:
                    'Mastering a foreign language (French, German, Japanese, Spanish) opens doors in embassies, MNCs, and translation agencies.',
                entranceExams: ['JNU Entrance', 'EFLU Entrance', 'CUET'],
                topColleges: ['JNU', 'EFLU Hyderabad', 'Delhi University', 'Max Mueller Bhavan'],
                skills: ['Fluency', 'Cultural Knowledge', 'Interpretation', 'Writing'],
                subPaths: ['Translator', 'Interpreter', 'Embassy Roles', 'Tourism'],
            },
        ],
    },
    {
        id: 'vocational',
        name: 'Vocational / Skill-Based',
        tagline: 'For Practical & Hands-on Learners',
        icon: Wrench,
        color: '#f97316',
        gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
        description:
            'Vocational courses focus on practical skills and job-readiness. They offer shorter durations, lower costs, and direct pathways to employment in growing industries.',
        eligibility: 'Completed 10th or 12th (varies by course)',
        subjects: ['Practical Training', 'Industry Skills', 'Workshop', 'On-the-job Training'],
        careerPaths: [
            {
                title: 'ITI (Industrial Training Institute)',
                icon: '🔧',
                duration: '1-2 years',
                salary: '₹2-8 LPA',
                demand: 'High',
                description:
                    'Get hands-on training in trades like electrician, fitter, welder, mechanic, and more. High demand in manufacturing and construction sectors.',
                entranceExams: ['State-level ITI entrance exams'],
                topColleges: ['Government ITIs', 'State Industrial Training Departments'],
                skills: ['Technical Skills', 'Hand Skills', 'Safety Awareness', 'Blueprint Reading'],
                subPaths: ['Electrician', 'Fitter', 'Welder', 'Computer Hardware', 'Plumbing', 'Automotive'],
            },
            {
                title: 'Diploma in Engineering',
                icon: '🏗️',
                duration: '3 years',
                salary: '₹3-10 LPA',
                demand: 'High',
                description:
                    'A polytechnic diploma provides practical engineering knowledge. Can lead to direct employment or lateral entry into B.Tech.',
                entranceExams: ['State Polytechnic entrance exams', 'JEECUP'],
                topColleges: ['Government Polytechnics', 'BTE Polytechnics'],
                skills: ['Technical Drawing', 'Practical Engineering', 'Problem Solving', 'Machinery Operation'],
                subPaths: ['Mechanical', 'Electrical', 'Civil', 'Computer Science', 'Electronics'],
            },
            {
                title: 'Diploma in Hotel Management',
                icon: '🏨',
                duration: '3 years',
                salary: '₹3-12 LPA',
                demand: 'High',
                description:
                    'Train in hospitality, food & beverage management, and hotel operations. A booming industry with international opportunities.',
                entranceExams: ['NCHMCT JEE', 'State-level entrance exams'],
                topColleges: ['IHM Mumbai', 'IHM Delhi', 'IHM Hyderabad', 'Welcome Group School'],
                skills: ['Hospitality', 'Customer Service', 'Culinary Skills', 'Management'],
                subPaths: ['Front Office', 'Food & Beverage', 'Housekeeping', 'Culinary Arts', 'Event Management'],
            },
            {
                title: 'Diploma in Nursing / ANM / GNM',
                icon: '🩺',
                duration: '2-3 years',
                salary: '₹2-8 LPA',
                demand: 'Very High',
                description:
                    'Healthcare is one of the fastest growing sectors. Trained nurses are in high demand both in India and abroad.',
                entranceExams: ['State Nursing entrance exams', 'AIIMS Nursing'],
                topColleges: ['RAK College of Nursing', 'CMC Vellore', 'AIIMS Nursing', 'Government Nursing Colleges'],
                skills: ['Patient Care', 'Medical Knowledge', 'Empathy', 'Emergency Response'],
                subPaths: ['ANM', 'GNM', 'B.Sc Nursing', 'Specialization Courses'],
            },
            {
                title: 'Animation & Multimedia',
                icon: '🎬',
                duration: '1-3 years',
                salary: '₹3-15 LPA',
                demand: 'Growing',
                description:
                    'Learn 2D/3D animation, VFX, graphic design, and multimedia production. India\'s animation industry is rapidly growing.',
                entranceExams: ['Institute-specific entrance tests'],
                topColleges: ['Arena Animation', 'MAAC', 'Frameboxx', 'Whistling Woods', 'DSK Supinfogames'],
                skills: ['Animation Software', 'Creativity', 'Storytelling', 'Visual Design'],
                subPaths: ['2D Animation', '3D Animation', 'VFX', 'Game Design', 'Motion Graphics'],
            },
            {
                title: 'Digital Marketing & Web Development',
                icon: '🌐',
                duration: '6 months - 1 year',
                salary: '₹3-15 LPA',
                demand: 'Very High',
                description:
                    'Short-term courses with high employability. Learn SEO, social media marketing, web development, and e-commerce.',
                entranceExams: ['No entrance exam (Certification-based)'],
                topColleges: ['Google Digital Garage', 'NIIT', 'Aptech', 'UpGrad', 'Coursera Certifications'],
                skills: ['SEO', 'Social Media', 'HTML/CSS', 'Google Ads', 'Analytics'],
                subPaths: ['SEO Specialist', 'Social Media Manager', 'Web Developer', 'Content Marketer', 'E-commerce Manager'],
            },
            {
                title: 'Paramedical Courses (Diploma)',
                icon: '🚑',
                duration: '1-2 years',
                salary: '₹2-6 LPA',
                demand: 'Very High',
                description:
                    'Become an allied healthcare professional like an X-Ray technician, MLT, or Dialysis technician.',
                entranceExams: ['State Paramedical exams'],
                topColleges: ['State Medical Colleges', 'Private Paramedical Institutes'],
                skills: ['Patient Handling', 'Medical Equipment Operation', 'Attention to Detail'],
                subPaths: ['DMLT', 'Radiology', 'Dialysis Technology', 'Optometry'],
            },
            {
                title: 'Fitness Trainer / Nutritionist',
                icon: '💪',
                duration: '6 months - 1 year',
                salary: '₹3-12 LPA',
                demand: 'Growing',
                description:
                    'Turn your passion for fitness into a career. Obtain certifications to work in gyms, sports teams, or as an independent consultant.',
                entranceExams: ['None (Certification based)'],
                topColleges: ['Gold\'s Gym Fitness Institute', 'K11 Academy', 'ISSA'],
                skills: ['Physical Fitness', 'Anatomy Knowledge', 'Motivation', 'Dietary Planning'],
                subPaths: ['Personal Trainer', 'Yoga Instructor', 'Dietician/Nutritionist'],
            },
        ],
    },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SuggestionsPage() {
    const [activeStream, setActiveStream] = useState<StreamKey>('science');
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const currentStream = streamsData.find((s) => s.id === activeStream)!;

    const toggleExpand = (key: string) => {
        setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const getDemandColor = (demand: string) => {
        switch (demand) {
            case 'Very High': return '#22c55e';
            case 'High': return '#06b6d4';
            case 'Medium': return '#f59e0b';
            case 'Growing': return '#8b5cf6';
            case 'Stable': return '#64748b';
            default: return '#6366f1';
        }
    };

    return (
        <>
            <Navbar />

            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroOrb1} />
                    <div className={styles.heroOrb2} />
                    <div className={styles.heroOrb3} />

                    <div className={styles.container}>
                        <motion.div
                            className={styles.heroContent}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className={styles.badge}>
                                <GraduationCap size={14} />
                                Career Guidance after 12th
                            </span>
                            <h1 className={styles.heroTitle}>
                                What to do
                                <br />
                                <span className={styles.gradientText}>After 12th?</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Confused about your career path? Explore comprehensive suggestions based on your
                                educational stream — Science, Commerce, Arts, or Vocational courses.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stream Selector */}
                <section className={styles.streamSelector}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.streamTabs}
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {streamsData.map((stream) => {
                                const StreamIcon = stream.icon;
                                return (
                                    <motion.button
                                        key={stream.id}
                                        className={`${styles.streamTab} ${activeStream === stream.id ? styles.streamTabActive : ''}`}
                                        onClick={() => setActiveStream(stream.id)}
                                        variants={fadeInUp}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.97 }}
                                        style={
                                            activeStream === stream.id
                                                ? { '--tab-color': stream.color, '--tab-gradient': stream.gradient } as React.CSSProperties
                                                : { '--tab-color': stream.color } as React.CSSProperties
                                        }
                                    >
                                        <div className={styles.streamTabIcon}>
                                            <StreamIcon size={22} />
                                        </div>
                                        <div className={styles.streamTabInfo}>
                                            <span className={styles.streamTabName}>{stream.name}</span>
                                            <span className={styles.streamTabTagline}>{stream.tagline}</span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Stream Overview */}
                <AnimatePresence mode="wait">
                    <motion.section
                        key={activeStream}
                        className={styles.streamOverview}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.container}>
                            <div className={styles.overviewCard} style={{ '--stream-color': currentStream.color, '--stream-gradient': currentStream.gradient } as React.CSSProperties}>
                                <div className={styles.overviewGlow} />
                                <div className={styles.overviewContent}>
                                    <div className={styles.overviewHeader}>
                                        <div className={styles.overviewIcon} style={{ background: currentStream.gradient }}>
                                            <currentStream.icon size={28} color="#fff" />
                                        </div>
                                        <div>
                                            <h2 className={styles.overviewTitle}>{currentStream.name} Stream</h2>
                                            <p className={styles.overviewTagline}>{currentStream.tagline}</p>
                                        </div>
                                    </div>
                                    <p className={styles.overviewDescription}>{currentStream.description}</p>

                                    <div className={styles.overviewMeta}>
                                        <div className={styles.overviewMetaItem}>
                                            <BookOpen size={16} />
                                            <span><strong>Eligibility:</strong> {currentStream.eligibility}</span>
                                        </div>
                                        <div className={styles.overviewMetaItem}>
                                            <Award size={16} />
                                            <span><strong>Key Subjects:</strong> {currentStream.subjects.join(', ')}</span>
                                        </div>
                                        <div className={styles.overviewMetaItem}>
                                            <Briefcase size={16} />
                                            <span><strong>Career Paths:</strong> {currentStream.careerPaths.length}+ options available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </AnimatePresence>

                {/* Career Paths Grid */}
                <section className={styles.pathsSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge} style={{ '--badge-color': currentStream.color } as React.CSSProperties}>
                                <Sparkles size={14} />
                                Top Career Paths
                            </span>
                            <h2 className={styles.sectionTitle}>
                                After 12th <span className={styles.gradientText}>{currentStream.name}</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Explore the best career options, entrance exams, top colleges, and salary expectations.
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStream}
                                className={styles.pathsGrid}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={staggerContainer}
                            >
                                {currentStream.careerPaths.map((path, index) => {
                                    const cardKey = `${activeStream}-${index}`;
                                    const isExpanded = expandedCards[cardKey];

                                    return (
                                        <motion.div
                                            key={cardKey}
                                            className={`${styles.pathCard} ${isExpanded ? styles.pathCardExpanded : ''}`}
                                            variants={fadeInUp}
                                            transition={{ duration: 0.5 }}
                                            layout
                                        >
                                            {/* Card Header */}
                                            <div className={styles.pathCardHeader}>
                                                <div className={styles.pathIcon}>{path.icon}</div>
                                                <div className={styles.pathHeaderInfo}>
                                                    <h3 className={styles.pathTitle}>{path.title}</h3>
                                                    <div className={styles.pathQuickMeta}>
                                                        <span className={styles.pathDuration}>
                                                            <Clock size={12} /> {path.duration}
                                                        </span>
                                                        <span
                                                            className={styles.pathDemand}
                                                            style={{ color: getDemandColor(path.demand), borderColor: getDemandColor(path.demand) }}
                                                        >
                                                            <TrendingUp size={12} /> {path.demand} Demand
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className={styles.pathDescription}>{path.description}</p>

                                            {/* Salary */}
                                            <div className={styles.pathSalary}>
                                                <DollarSign size={16} />
                                                <span>Expected Salary: <strong>{path.salary}</strong></span>
                                            </div>

                                            {/* Skills */}
                                            <div className={styles.pathSkills}>
                                                {path.skills.map((skill) => (
                                                    <span key={skill} className={styles.skillTag} style={{ '--stream-color': currentStream.color } as React.CSSProperties}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Expandable Details */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        className={styles.pathDetails}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {/* Entrance Exams */}
                                                        <div className={styles.detailBlock}>
                                                            <h4 className={styles.detailTitle}>
                                                                <BookOpen size={16} /> Entrance Exams
                                                            </h4>
                                                            <div className={styles.detailList}>
                                                                {path.entranceExams.map((exam) => (
                                                                    <span key={exam} className={styles.detailChip}>
                                                                        <CheckCircle size={12} /> {exam}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Top Colleges */}
                                                        <div className={styles.detailBlock}>
                                                            <h4 className={styles.detailTitle}>
                                                                <MapPin size={16} /> Top Colleges
                                                            </h4>
                                                            <div className={styles.detailList}>
                                                                {path.topColleges.map((college) => (
                                                                    <span key={college} className={styles.detailChip}>
                                                                        <Star size={12} /> {college}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Sub Paths */}
                                                        {path.subPaths && (
                                                            <div className={styles.detailBlock}>
                                                                <h4 className={styles.detailTitle}>
                                                                    <ArrowRight size={16} /> Specializations
                                                                </h4>
                                                                <div className={styles.subPathsList}>
                                                                    {path.subPaths.map((sp) => (
                                                                        <span key={sp} className={styles.subPathTag} style={{ '--stream-color': currentStream.color } as React.CSSProperties}>
                                                                            {sp}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Expand Button */}
                                            <button className={styles.expandBtn} onClick={() => toggleExpand(cardKey)}>
                                                <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                                                <ChevronDown size={16} className={isExpanded ? styles.rotated : ''} />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
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
                                    Still Confused About
                                    <br />
                                    <span className={styles.gradientText}>Your Career Path?</span>
                                </h2>
                                <p className={styles.ctaSubtitle}>
                                    Take our AI-powered aptitude assessment to discover careers perfectly matched
                                    to your personality, skills, and interests.
                                </p>
                                <div className={styles.ctaButtons}>
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
                                    <Link href="/careers">
                                        <motion.button
                                            className={styles.ctaButtonSecondary}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Briefcase size={18} />
                                            Explore All Careers
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

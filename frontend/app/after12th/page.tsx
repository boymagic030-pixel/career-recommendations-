'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FlaskConical, TrendingUp, Palette, GraduationCap, Briefcase, ArrowRight,
  ChevronDown, ChevronUp, BookOpen, Award, Clock, IndianRupee, Users, Star,
  CheckCircle2, Lightbulb, Target, Rocket, Search, Globe, Code, Heart,
  Building2, Microscope, Calculator, Music, Pen, Gavel, ShieldCheck, Plane
} from 'lucide-react';
import { Navbar, Footer } from '@/components';
import styles from './page.module.css';

/* ─── Animation Variants ─── */
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

/* ─── Stream Data ─── */
type CourseItem = {
  name: string;
  duration: string;
  salary: string;
  demand: 'High' | 'Very High' | 'Medium';
  icon: React.ElementType;
  description: string;
  topColleges: string[];
  examRequired: string[];
  skills: string[];
};

type StreamData = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ElementType;
  tagline: string;
  overview: string;
  totalOptions: number;
  categories: {
    label: string;
    icon: React.ElementType;
    courses: CourseItem[];
  }[];
  careerOutlook: { title: string; avg: string; growth: string }[];
  tips: string[];
};

const streams: StreamData[] = [
  /* ─── SCIENCE ─── */
  {
    id: 'science',
    label: 'Science Stream',
    emoji: '🔬',
    color: '#6366f1',
    gradientFrom: '#6366f1',
    gradientTo: '#8b5cf6',
    icon: FlaskConical,
    tagline: 'Explore the universe of infinite possibilities',
    overview: 'Science stream opens doors to some of the most prestigious and high-paying careers in engineering, medicine, research, and technology. With PCM or PCB, you have access to 150+ undergraduate programs across India and abroad.',
    totalOptions: 150,
    categories: [
      {
        label: 'Engineering & Technology',
        icon: Code,
        courses: [
          {
            name: 'B.Tech / B.E.',
            duration: '4 Years',
            salary: '₹4–25 LPA',
            demand: 'Very High',
            icon: Code,
            description: 'Bachelor of Technology in specializations like CS, IT, ECE, Mechanical, Civil, Chemical, and more. Gateway to core tech and software industries.',
            topColleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore'],
            examRequired: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CETs'],
            skills: ['Programming', 'Math', 'Problem Solving', 'Engineering Fundamentals']
          },
          {
            name: 'B.Arch (Architecture)',
            duration: '5 Years',
            salary: '₹4–15 LPA',
            demand: 'Medium',
            icon: Building2,
            description: 'Study the art and science of designing buildings. Combines creativity with technical knowledge of structures, materials, and urban planning.',
            topColleges: ['IIT Roorkee', 'SPA Delhi', 'NIT Calicut', 'CEPT Ahmedabad'],
            examRequired: ['JEE Main Paper 2 (B.Arch)', 'NATA', 'State CETs'],
            skills: ['Creativity', 'Spatial Thinking', 'CAD', 'Mathematics']
          },
        ]
      },
      {
        label: 'Medical & Health Sciences',
        icon: Heart,
        courses: [
          {
            name: 'MBBS',
            duration: '5.5 Years',
            salary: '₹8–30 LPA',
            demand: 'Very High',
            icon: Heart,
            description: 'The most prestigious medical degree. Become a licensed doctor and specialize further in surgery, pediatrics, cardiology, and 50+ other fields.',
            topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'MAMC Delhi', 'KMC Manipal'],
            examRequired: ['NEET UG'],
            skills: ['Biology', 'Chemistry', 'Empathy', 'Critical Thinking']
          },
          {
            name: 'BDS (Dental Surgery)',
            duration: '5 Years',
            salary: '₹4–12 LPA',
            demand: 'High',
            icon: ShieldCheck,
            description: 'Comprehensive study of dental health, oral surgery, and cosmetic dentistry. Option to open own dental clinic or work in hospitals.',
            topColleges: ['Maulana Azad Dental', 'Manipal Dental', 'SRM Dental College'],
            examRequired: ['NEET UG'],
            skills: ['Biology', 'Chemistry', 'Manual Dexterity', 'Attention to Detail']
          },
          {
            name: 'B.Pharm (Pharmacy)',
            duration: '4 Years',
            salary: '₹3–10 LPA',
            demand: 'High',
            icon: Microscope,
            description: 'Study drug development, pharmacology, and healthcare. Career opportunities in pharma companies, hospitals, and research labs.',
            topColleges: ['JSS College of Pharmacy', 'Manipal College of Pharmacy', 'Bombay College of Pharmacy'],
            examRequired: ['GPAT', 'State Pharmacy CETs'],
            skills: ['Chemistry', 'Biology', 'Analytical Skills', 'Research Aptitude']
          },
          {
            name: 'BSc Nursing',
            duration: '4 Years',
            salary: '₹3–8 LPA',
            demand: 'Very High',
            icon: Heart,
            description: 'Professional nursing education covering patient care, medical procedures, and healthcare management. Huge demand in India and abroad.',
            topColleges: ['AIIMS Delhi', 'CMC Vellore', 'PGIMER Chandigarh'],
            examRequired: ['NEET', 'State Nursing Entrance Tests'],
            skills: ['Compassion', 'Biology', 'Practical Skills', 'Communication']
          },
        ]
      },
      {
        label: 'Pure Sciences & Research',
        icon: Microscope,
        courses: [
          {
            name: 'BSc (Physics / Chemistry / Math / Biology)',
            duration: '3 Years',
            salary: '₹2–8 LPA (↑ with PG)',
            demand: 'Medium',
            icon: Microscope,
            description: 'Deep dive into your favourite science. Best pursued with MSc, PhD, or integrated programs for top research and academic careers.',
            topColleges: ['IISc Bangalore', 'IIT JAM Colleges', 'Delhi University', 'TIFR', 'Christ University'],
            examRequired: ['IIT JAM', 'CUET', 'University-specific tests'],
            skills: ['Analytical Thinking', 'Math', 'Lab Skills', 'Research Mindset']
          },
          {
            name: 'BS-MS Dual Degree (5 Year)',
            duration: '5 Years',
            salary: '₹4–20 LPA',
            demand: 'High',
            icon: Star,
            description: 'Elite integrated dual degree at IISER, IIT, or NISER. Combines undergrad + postgrad research. Best for students who love pure science and want to pursue PhD.',
            topColleges: ['IISER Pune', 'IISER Kolkata', 'NISER Bhubaneswar', 'IIT (BS programs)'],
            examRequired: ['IISER Aptitude Test', 'KVPY SX', 'JEE Advanced'],
            skills: ['Strong Fundamentals', 'Research Passion', 'Mathematics', 'Independent Thinking']
          },
        ]
      },
      {
        label: 'Defence & Government',
        icon: ShieldCheck,
        courses: [
          {
            name: 'NDA (National Defence Academy)',
            duration: '3 Years (NDA) + Training',
            salary: '₹5–15 LPA (Grade pay)',
            demand: 'High',
            icon: ShieldCheck,
            description: 'Join Army, Navy, or Air Force through the prestigious NDA exam. Serve the nation while pursuing a degree from JNU in partnership.',
            topColleges: ['NDA Khadakwasla', 'Naval Academy Ezhimala', 'AFA Hyderabad'],
            examRequired: ['NDA Exam (UPSC)', 'SSB Interview'],
            skills: ['Physical Fitness', 'Leadership', 'Mathematics', 'General Awareness']
          },
        ]
      }
    ],
    careerOutlook: [
      { title: 'Software Engineer', avg: '₹8–25 LPA', growth: '25% (2024–30)' },
      { title: 'Doctor / Surgeon', avg: '₹12–50 LPA', growth: '18% annually' },
      { title: 'Data Scientist', avg: '₹10–30 LPA', growth: '36% (fastest growing)' },
      { title: 'Aerospace Engineer', avg: '₹6–20 LPA', growth: '8% globally' },
    ],
    tips: [
      'Start JEE/NEET preparation by Class 11 — 2 years makes a huge difference',
      'Focus on NCERT first, then move to reference books (HC Verma, DC Pandey)',
      'Explore IISER and NISER if you love research over engineering',
      'Keep your options open — consider BSc + MSc if ranks don\'t go as planned',
      'Participate in olympiads (Physics, Chemistry, Math, Biology) to boost your profile',
    ]
  },

  /* ─── COMMERCE ─── */
  {
    id: 'commerce',
    label: 'Commerce Stream',
    emoji: '📊',
    color: '#10b981',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    icon: TrendingUp,
    tagline: 'Build the financial and business world of tomorrow',
    overview: 'Commerce stream offers a wide spectrum of career options in finance, banking, accounting, entrepreneurship, and law. With rising demand for financial literacy and business acumen, commerce graduates are among the most employable.',
    totalOptions: 120,
    categories: [
      {
        label: 'Finance & Accounting',
        icon: Calculator,
        courses: [
          {
            name: 'CA (Chartered Accountancy)',
            duration: '4–5 Years',
            salary: '₹6–40 LPA',
            demand: 'Very High',
            icon: Calculator,
            description: 'One of India\'s most respected professional certifications. CA handles auditing, taxation, and corporate finance. Extremely high earning potential — Big 4 firms pay ₹15–30 LPA to freshers.',
            topColleges: ['ICAI (All India)', 'N/A — Self Study + Coaching'],
            examRequired: ['CA Foundation', 'CA Inter', 'CA Final (ICAI)'],
            skills: ['Accounting', 'Taxation Law', 'Audit', 'Financial Reporting', 'MS Excel']
          },
          {
            name: 'B.Com (Bachelor of Commerce)',
            duration: '3 Years',
            salary: '₹2.5–8 LPA',
            demand: 'High',
            icon: TrendingUp,
            description: 'Versatile undergraduate degree covering accounting, economics, and business. Best used as a foundation for CA, MBA, CMA, or CS. Many colleges offer B.Com (Hons) for deeper specialization.',
            topColleges: ['SRCC Delhi', 'Loyola Chennai', 'Christ University', 'Presidency Kolkata'],
            examRequired: ['CUET', 'College-specific tests', 'DU JAT'],
            skills: ['Accounting', 'Economics', 'Business Communication', 'Tally/ERP']
          },
          {
            name: 'BBA / BMS',
            duration: '3 Years',
            salary: '₹3–10 LPA',
            demand: 'High',
            icon: Briefcase,
            description: 'Bachelor of Business Administration / Management Studies. Focuses on management, marketing, HR and entrepreneurship. Direct path to MBA from top B-schools.',
            topColleges: ['DU (SRCC, Hans Raj)', 'Symbiosis Pune', 'Christ University', 'NMIMS Mumbai'],
            examRequired: ['CUET', 'IPMAT (for IIM Indore IPM)', 'College tests'],
            skills: ['Leadership', 'Communication', 'Teamwork', 'Business Acumen']
          },
          {
            name: 'CMA (Cost Management Accountant)',
            duration: '3–4 Years',
            salary: '₹5–25 LPA',
            demand: 'High',
            icon: Calculator,
            description: 'Professional qualification by ICMAI. Focuses on cost accounting, management accounting, and financial strategy. High demand in manufacturing, banking, and government.',
            topColleges: ['ICMAI (All India)', 'Coaching institutes across India'],
            examRequired: ['CMA Foundation', 'CMA Inter', 'CMA Final'],
            skills: ['Cost Accounting', 'Strategic Finance', 'Data Analysis', 'Business Law']
          },
        ]
      },
      {
        label: 'Law & Corporate',
        icon: Gavel,
        courses: [
          {
            name: 'BA LLB / BBA LLB (Integrated Law)',
            duration: '5 Years',
            salary: '₹4–20 LPA (↑↑ with experience)',
            demand: 'High',
            icon: Gavel,
            description: 'Five-year integrated law degree combining arts/business with legal education. Opens doors to corporate law, litigation, judiciary, and human rights organizations.',
            topColleges: ['NLU Delhi (NLS)', 'NLU Bangalore', 'NALSAR Hyderabad', 'Symbiosis Law', 'Amity Law School'],
            examRequired: ['CLAT', 'AILET', 'LSAT India'],
            skills: ['Logical Reasoning', 'Research', 'Communication', 'Critical Thinking']
          },
          {
            name: 'CS (Company Secretary)',
            duration: '2–4 Years',
            salary: '₹4–15 LPA',
            demand: 'Medium',
            icon: Briefcase,
            description: 'Professional qualification by ICSI. Ensures corporate governance and legal compliance. Every listed company needs a CS. Excellent for those interested in corporate law without a full law degree.',
            topColleges: ['ICSI (All India)'],
            examRequired: ['CS Foundation', 'CS Executive', 'CS Professional'],
            skills: ['Company Law', 'Corporate Governance', 'Communication', 'Legal Research']
          },
        ]
      },
      {
        label: 'Economics & Analytics',
        icon: TrendingUp,
        courses: [
          {
            name: 'BA / BSc Economics (Hons)',
            duration: '3 Years',
            salary: '₹3–12 LPA (↑ with PG)',
            demand: 'High',
            icon: TrendingUp,
            description: 'Study microeconomics, macroeconomics, econometrics, and public policy. Gateway to civil services (IAS/IES), RBI, World Bank, IMF, and top MBA programs.',
            topColleges: ['Delhi School of Economics', 'JNU', 'SRCC', 'Presidency Kolkata', 'Madras Christian College'],
            examRequired: ['CUET', 'DSE Entrance', 'University-specific tests'],
            skills: ['Statistical Analysis', 'Mathematical Modeling', 'Research', 'Policy Thinking']
          },
        ]
      },
      {
        label: 'Banking & Finance',
        icon: Building2,
        courses: [
          {
            name: 'B.Com (Banking & Insurance)',
            duration: '3 Years',
            salary: '₹3–9 LPA',
            demand: 'High',
            icon: Building2,
            description: 'Specialized commerce degree covering banking operations, insurance principles, and financial services. Directly prepares you for PSU bank recruitment exams.',
            topColleges: ['Mumbai University Colleges', 'Pune University', 'Kolkata Colleges'],
            examRequired: ['University Merit / State CETs'],
            skills: ['Banking Operations', 'Insurance', 'Risk Management', 'Finance']
          },
        ]
      }
    ],
    careerOutlook: [
      { title: 'Chartered Accountant', avg: '₹12–35 LPA', growth: '20% (strong demand)' },
      { title: 'Investment Banker', avg: '₹15–50 LPA', growth: '15% from 2024' },
      { title: 'Financial Analyst', avg: '₹6–18 LPA', growth: '23% (global)' },
      { title: 'Corporate Lawyer', avg: '₹8–40 LPA', growth: '12% annually' },
    ],
    tips: [
      'CA is one of the best ROI qualifications — start Foundation immediately after 12th',
      'B.Com from SRCC or Loyola + CA/MBA = outstanding career trajectory',
      'CLAT for law requires reasoning & English — start preparation from Class 11',
      'IPM at IIM Indore/Rohtak directly admits 12th passouts — highly competitive',
      'CFA (global) after graduation massively boosts finance career prospects',
    ]
  },

  /* ─── ARTS / HUMANITIES ─── */
  {
    id: 'arts',
    label: 'Arts & Humanities',
    emoji: '🎨',
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    icon: Palette,
    tagline: 'Shape culture, society, and human expression',
    overview: 'Often underestimated, arts and humanities lead to high-impact careers in civil services (IAS/IPS), journalism, design, education, psychology, social work, and creative industries. India needs compassionate leaders, designers, and thinkers.',
    totalOptions: 100,
    categories: [
      {
        label: 'Civil Services & Government',
        icon: ShieldCheck,
        courses: [
          {
            name: 'BA (Political Science / History / Geography)',
            duration: '3 Years',
            salary: '₹2–8 LPA (↑↑↑ with UPSC)',
            demand: 'Very High',
            icon: ShieldCheck,
            description: 'Foundation for UPSC Civil Services (IAS, IPS, IFS). Humanities graduates dominate UPSC toppers list. Best combination is History + Political Science + Geography as majors.',
            topColleges: ['St. Stephen\'s Delhi', 'Presidency Kolkata', 'Loyola Chennai', 'JNU', 'DU colleges'],
            examRequired: ['CUET', 'University Merit'],
            skills: ['Reading & Writing', 'Critical Thinking', 'Current Affairs', 'Essay Writing']
          },
          {
            name: 'UPSC Preparation (After Graduation)',
            duration: '1–3 Years Prep',
            salary: '₹7–18 LPA (as IAS/IPS)',
            demand: 'Very High',
            icon: Award,
            description: 'Start BA with UPSC as the target. The prestigious civil services exam allows any graduate to appear. 12th with humanities gives an early advantage in optional subjects.',
            topColleges: ['Self-study + Coaching (Drishti, Vision IAS, Forum)'],
            examRequired: ['UPSC CSE Prelims', 'UPSC CSE Mains', 'Interview'],
            skills: ['GS Knowledge', 'Writing', 'Analysis', 'Ethical Reasoning', 'Current Affairs']
          },
        ]
      },
      {
        label: 'Design & Creative Arts',
        icon: Palette,
        courses: [
          {
            name: 'B.Des (Bachelor of Design)',
            duration: '4 Years',
            salary: '₹4–20 LPA',
            demand: 'Very High',
            icon: Palette,
            description: 'Study graphic design, UX/UI, fashion, industrial, or communication design. NID and NIFT are India\'s premier design institutes. Designers are the most sought-after creatives in the digital economy.',
            topColleges: ['NID Ahmedabad', 'NIFT Delhi', 'MIT Institute of Design', 'Srishti Manipal', 'Pearl Academy'],
            examRequired: ['NID DAT', 'UCEED (IITs)', 'NIFT Entrance', 'CEED (PG)'],
            skills: ['Creativity', 'Sketching', 'Design Thinking', 'Software (Adobe, Figma)']
          },
          {
            name: 'BFA (Fine Arts)',
            duration: '4 Years',
            salary: '₹2–10 LPA',
            demand: 'Medium',
            icon: Palette,
            description: 'Professional degree in painting, sculpture, printmaking, or applied arts. Leads to careers in illustration, animation, art direction, and academia.',
            topColleges: ['Sir J.J. School of Art Mumbai', 'Banaras Hindu University', 'Kala Bhavan Shantiniketan'],
            examRequired: ['Portfolio-based admission', 'University tests'],
            skills: ['Visual Art', 'Creativity', 'Portfolio Creation', 'Art History']
          },
          {
            name: 'B.Sc. Animation & VFX',
            duration: '3–4 Years',
            salary: '₹3–15 LPA',
            demand: 'High',
            icon: Star,
            description: 'Create world-class animation, visual effects, and 3D graphics. Bollywood, OTT platforms, gaming, and advertising are booming markets for animators.',
            topColleges: ['Arena Animation', 'Maac', 'Frameboxx', 'DSK Supinfocom', 'MIT ADT University'],
            examRequired: ['Portfolio test', 'College-specific tests'],
            skills: ['2D/3D Animation', 'Adobe Suite', 'Maya', 'Blender', 'Storytelling']
          },
        ]
      },
      {
        label: 'Mass Media & Journalism',
        icon: Globe,
        courses: [
          {
            name: 'BA Mass Communication / Journalism',
            duration: '3 Years',
            salary: '₹3–12 LPA',
            demand: 'High',
            icon: Globe,
            description: 'Study journalism, broadcast media, digital content, and public relations. Digital revolution has created massive opportunities in content creation, OTT, and social media.',
            topColleges: ['IIMC Delhi', 'AJK MCRC Jamia', 'Symbiosis Pune', 'Xavier Institute Mumbai (XAVIERS)'],
            examRequired: ['IIMC Entrance', 'University tests', 'CUET'],
            skills: ['Writing', 'Speaking', 'Video Editing', 'Social Media', 'Research']
          },
        ]
      },
      {
        label: 'Psychology & Social Sciences',
        icon: Users,
        courses: [
          {
            name: 'BA / BSc Psychology',
            duration: '3 Years',
            salary: '₹3–12 LPA (↑ with PG)',
            demand: 'High',
            icon: Users,
            description: 'Study human behavior, mental health, and cognitive processes. India faces a massive mental health crisis — clinical psychologists, counselors, and therapists are in extreme demand.',
            topColleges: ['Delhi University', 'Christ University', 'Fergusson College Pune', 'Presidency University'],
            examRequired: ['CUET', 'University Merit'],
            skills: ['Empathy', 'Active Listening', 'Research', 'Communication', 'Statistical Analysis']
          },
          {
            name: 'BA Social Work (BSW)',
            duration: '3 Years',
            salary: '₹2–7 LPA',
            demand: 'Medium',
            icon: Heart,
            description: 'Work with NGOs, government bodies, and communities to create social change. Excellent for students driven by purpose and social impact over salary.',
            topColleges: ['TISS Mumbai', 'Delhi School of Social Work', 'Loyola Chennai'],
            examRequired: ['TISS NET', 'University tests'],
            skills: ['Empathy', 'Communication', 'Community Organizing', 'Research']
          },
        ]
      },
      {
        label: 'Language & Literature',
        icon: Pen,
        courses: [
          {
            name: 'BA English / Hindi Literature (Hons)',
            duration: '3 Years',
            salary: '₹2–8 LPA (↑ with specialization)',
            demand: 'Medium',
            icon: Pen,
            description: 'Study language, literature, linguistics, and communication. Opens careers in content writing, editing, teaching, civil services, and corporate communication.',
            topColleges: ['St. Stephen\'s', 'Miranda House', 'Jadavpur University', 'JNU'],
            examRequired: ['CUET', 'University Merit'],
            skills: ['Writing', 'Critical Reading', 'Research', 'Communication', 'Analysis']
          },
        ]
      },
    ],
    careerOutlook: [
      { title: 'IAS / IPS Officer', avg: '₹7–18 LPA + perks', growth: 'Lifetime security' },
      { title: 'UX/UI Designer', avg: '₹5–22 LPA', growth: '33% growth by 2030' },
      { title: 'Clinical Psychologist', avg: '₹4–15 LPA', growth: 'Rapidly growing field' },
      { title: 'Content Creator / Journalist', avg: '₹3–20 LPA', growth: 'Digital boom' },
    ],
    tips: [
      'Arts is India\'s best-kept secret — 60% of IAS toppers come from humanities background',
      'Start UPSC preparation early — read The Hindu newspaper daily from Class 12',
      'NID/NIFT design entrance requires a portfolio — start building from Class 11',
      'Psychology + MBA HR or Clinical is an extremely lucrative combination',
      'Learn a digital skill (Canva, video editing, coding) regardless of your main degree',
    ]
  }
];

/* ─── Comparison Data ─── */
const comparisonData = [
  { aspect: 'Top Entrance Exams', science: 'JEE, NEET, NDA', commerce: 'CLAT, IPMAT, CA, CUET', arts: 'CLAT, IIMC, NID, UCEED' },
  { aspect: 'Avg Starting Salary', science: '₹3–8 LPA', commerce: '₹2.5–7 LPA', arts: '₹2–6 LPA' },
  { aspect: 'Highest Potential', science: '₹30–80 LPA (Tech/Medical)', commerce: '₹20–60 LPA (Finance/Law)', arts: '₹15–40 LPA (IAS/Design)' },
  { aspect: 'Study Difficulty', science: '★★★★★', commerce: '★★★★☆', arts: '★★★☆☆' },
  { aspect: 'Abroad Opportunities', science: 'Excellent (STEM visas)', commerce: 'Very Good (Finance)', arts: 'Good (Design, Allied)' },
  { aspect: 'Entrepreneurship', science: '★★★★☆', commerce: '★★★★★', arts: '★★★★☆' },
];

export default function After12thPage() {
  const [activeStream, setActiveStream] = useState('science');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentStream = streams.find(s => s.id === activeStream)!;

  const toggleCourse = (id: string) => {
    setExpandedCourse(prev => (prev === id ? null : id));
  };

  const filteredCategories = currentStream.categories.map(cat => ({
    ...cat,
    courses: cat.courses.filter(c =>
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.courses.length > 0);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Background Orbs */}
        <div className={styles.orb1} style={{ background: `radial-gradient(circle, ${currentStream.gradientFrom}22, transparent)` }} />
        <div className={styles.orb2} style={{ background: `radial-gradient(circle, ${currentStream.gradientTo}18, transparent)` }} />

        {/* ─── Hero ─── */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <motion.div
              className={styles.heroContent}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span className={styles.heroBadge} variants={fadeInUp}>
                <GraduationCap size={16} />
                After 12th Guide
              </motion.span>

              <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
                What To Do{' '}
                <span
                  className={styles.gradientText}
                  style={{ backgroundImage: `linear-gradient(135deg, ${currentStream.gradientFrom}, ${currentStream.gradientTo})` }}
                >
                  After 12th?
                </span>
              </motion.h1>

              <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
                Explore detailed, stream-specific career paths, top courses, entrance exams, salary insights, and expert tips — all in one place.
              </motion.p>

              {/* Stream Switcher */}
              <motion.div className={styles.streamSwitcher} variants={fadeInUp}>
                {streams.map(s => {
                  const StreamIcon = s.icon;
                  return (
                    <button
                      key={s.id}
                      className={`${styles.streamBtn} ${activeStream === s.id ? styles.streamBtnActive : ''}`}
                      onClick={() => { setActiveStream(s.id); setExpandedCourse(null); setSearchQuery(''); }}
                      style={activeStream === s.id ? {
                        background: `linear-gradient(135deg, ${s.gradientFrom}, ${s.gradientTo})`,
                        borderColor: s.gradientFrom,
                        boxShadow: `0 4px 20px ${s.gradientFrom}40`
                      } : {}}
                    >
                      <StreamIcon size={18} />
                      <span>{s.emoji} {s.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Stream Overview ─── */}
        <section className={styles.overviewSection}>
          <div className={styles.container}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStream}
                className={styles.overviewGrid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.overviewCard}>
                  <div className={styles.overviewIcon} style={{ background: `linear-gradient(135deg, ${currentStream.gradientFrom}, ${currentStream.gradientTo})` }}>
                    <span style={{ fontSize: '2.5rem' }}>{currentStream.emoji}</span>
                  </div>
                  <div>
                    <h2 className={styles.overviewTitle}>{currentStream.label}</h2>
                    <p className={styles.overviewTagline} style={{ color: currentStream.gradientFrom }}>{currentStream.tagline}</p>
                    <p className={styles.overviewText}>{currentStream.overview}</p>
                    <div className={styles.overviewStat}>
                      <span className={styles.overviewStatNum} style={{ color: currentStream.gradientFrom }}>{currentStream.totalOptions}+</span>
                      <span className={styles.overviewStatLabel}>Career Pathways Available</span>
                    </div>
                  </div>
                </div>

                {/* Career Outlook Pills */}
                <div className={styles.outlookCard}>
                  <h3 className={styles.outlookTitle}><TrendingUp size={18} /> Top Career Outlook</h3>
                  <div className={styles.outlookGrid}>
                    {currentStream.careerOutlook.map(career => (
                      <div key={career.title} className={styles.outlookItem}>
                        <div className={styles.outlookName}>{career.title}</div>
                        <div className={styles.outlookDetails}>
                          <span className={styles.outlookSalary}><IndianRupee size={12} />{career.avg.replace('₹','')}</span>
                          <span className={styles.outlookGrowth}><Rocket size={12} />{career.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Courses Section ─── */}
        <section className={styles.coursesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge} style={{ borderColor: `${currentStream.gradientFrom}44`, color: currentStream.gradientFrom }}>
                <BookOpen size={14} /> Courses & Degrees
              </span>
              <h2 className={styles.sectionTitle}>Explore Your Options</h2>
              <p className={styles.sectionSubtitle}>Tap any course to see full details — entrance exams, top colleges, skills required, and more.</p>

              {/* Search */}
              <div className={styles.searchBar}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={`Search courses in ${currentStream.label}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeStream + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {filteredCategories.map((cat, catIdx) => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={catIdx} className={styles.categoryBlock}>
                      <div className={styles.categoryHeader}>
                        <div className={styles.categoryIcon} style={{ background: `${currentStream.gradientFrom}20`, color: currentStream.gradientFrom }}>
                          <CatIcon size={20} />
                        </div>
                        <h3 className={styles.categoryTitle}>{cat.label}</h3>
                      </div>

                      <motion.div className={styles.courseGrid} variants={staggerContainer} initial="hidden" animate="visible">
                        {cat.courses.map((course) => {
                          const courseId = `${catIdx}-${course.name}`;
                          const isExpanded = expandedCourse === courseId;
                          const CourseIcon = course.icon;

                          return (
                            <motion.div
                              key={course.name}
                              className={`${styles.courseCard} ${isExpanded ? styles.courseCardExpanded : ''}`}
                              variants={fadeInUp}
                              style={isExpanded ? { borderColor: `${currentStream.gradientFrom}60` } : {}}
                            >
                              {/* Course Header */}
                              <div className={styles.courseCardHeader} onClick={() => toggleCourse(courseId)}>
                                <div className={styles.courseCardLeft}>
                                  <div className={styles.courseCardIcon} style={{ background: `${currentStream.gradientFrom}20`, color: currentStream.gradientFrom }}>
                                    <CourseIcon size={22} />
                                  </div>
                                  <div>
                                    <h4 className={styles.courseName}>{course.name}</h4>
                                    <div className={styles.courseMeta}>
                                      <span className={styles.metaBadge}><Clock size={11} />{course.duration}</span>
                                      <span className={styles.metaBadge} style={{ color: course.demand === 'Very High' ? '#10b981' : '#f59e0b' }}>
                                        <TrendingUp size={11} />{course.demand} Demand
                                      </span>
                                      <span className={styles.metaBadge} style={{ color: currentStream.gradientFrom }}>
                                        <IndianRupee size={11} />{course.salary.replace('₹','')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.expandBtn} style={{ color: currentStream.gradientFrom }}>
                                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                              </div>

                              {/* Expanded Details */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    className={styles.courseDetails}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                  >
                                    <p className={styles.courseDesc}>{course.description}</p>

                                    <div className={styles.courseDetailsGrid}>
                                      {/* Exams */}
                                      <div className={styles.detailBlock}>
                                        <div className={styles.detailBlockTitle}><Target size={14} /> Entrance Exams</div>
                                        <ul className={styles.detailList}>
                                          {course.examRequired.map(e => <li key={e}><CheckCircle2 size={12} style={{ color: currentStream.gradientFrom }} />{e}</li>)}
                                        </ul>
                                      </div>

                                      {/* Colleges */}
                                      <div className={styles.detailBlock}>
                                        <div className={styles.detailBlockTitle}><Award size={14} /> Top Colleges</div>
                                        <ul className={styles.detailList}>
                                          {course.topColleges.map(c => <li key={c}><CheckCircle2 size={12} style={{ color: currentStream.gradientFrom }} />{c}</li>)}
                                        </ul>
                                      </div>

                                      {/* Skills */}
                                      <div className={styles.detailBlock}>
                                        <div className={styles.detailBlockTitle}><Lightbulb size={14} /> Key Skills Needed</div>
                                        <div className={styles.skillTags}>
                                          {course.skills.map(sk => (
                                            <span key={sk} className={styles.skillTag} style={{ background: `${currentStream.gradientFrom}15`, color: currentStream.gradientFrom, borderColor: `${currentStream.gradientFrom}30` }}>
                                              {sk}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    <div className={styles.courseActions}>
                                      <Link href="/assessment">
                                        <button className={styles.assessBtn} style={{ background: `linear-gradient(135deg, ${currentStream.gradientFrom}, ${currentStream.gradientTo})` }}>
                                          <Sparkle size={14} /> Check if this suits you
                                          <ArrowRight size={14} />
                                        </button>
                                      </Link>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </div>
                  );
                })}

                {filteredCategories.length === 0 && (
                  <div className={styles.emptyState}>
                    <Search size={48} opacity={0.2} />
                    <p>No courses found for "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Expert Tips ─── */}
        <section className={styles.tipsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge} style={{ borderColor: `${currentStream.gradientFrom}44`, color: currentStream.gradientFrom }}>
                <Star size={14} /> Expert Tips
              </span>
              <h2 className={styles.sectionTitle}>Pro Tips for {currentStream.label}</h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStream + 'tips'}
                className={styles.tipsGrid}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                {currentStream.tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    className={styles.tipCard}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className={styles.tipNumber} style={{ color: currentStream.gradientFrom }}>0{i + 1}</span>
                    <p className={styles.tipText}>{tip}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Stream Comparison Table ─── */}
        <section className={styles.comparisonSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <Target size={14} /> Stream Comparison
              </span>
              <h2 className={styles.sectionTitle}>Science vs Commerce vs Arts</h2>
              <p className={styles.sectionSubtitle}>Make an informed choice by comparing key aspects of each stream.</p>
            </div>

            <div className={styles.comparisonTableWrapper}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th><span>🔬</span> Science</th>
                    <th><span>📊</span> Commerce</th>
                    <th><span>🎨</span> Arts</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                      <td className={styles.aspectCell}>{row.aspect}</td>
                      <td style={{ color: '#818cf8' }}>{row.science}</td>
                      <td style={{ color: '#34d399' }}>{row.commerce}</td>
                      <td style={{ color: '#fbbf24' }}>{row.arts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.ctaCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.ctaOrb} />
              <GraduationCap size={48} className={styles.ctaIcon} />
              <h2 className={styles.ctaTitle}>Still Confused? Let AI Decide For You</h2>
              <p className={styles.ctaSubtitle}>
                Take our free 15-minute AI-powered career assessment and get a personalized recommendation based on your interests, aptitude, and personality.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/assessment">
                  <motion.button className={styles.ctaPrimaryBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Rocket size={18} /> Start Free Assessment <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/careers">
                  <motion.button className={styles.ctaSecondaryBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Globe size={16} /> Explore All Careers
                  </motion.button>
                </Link>
              </div>
              <div className={styles.ctaFeatures}>
                <span><CheckCircle2 size={14} /> 100% Free</span>
                <span><Clock size={14} /> 15–20 Minutes</span>
                <span><ShieldCheck size={14} /> Private & Secure</span>
                <span><Plane size={14} /> India + Abroad Options</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// tiny inline icon component for the button
function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 3l1.5 5h5l-4 3 1.5 5-4-3-4 3 1.5-5-4-3h5z"/>
    </svg>
  );
}

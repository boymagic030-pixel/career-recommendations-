'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  Award,
  GraduationCap,
  Briefcase,
  LineChart,
  Lightbulb,
  Star,
  ChevronRight,
  Play,
} from 'lucide-react';
import { Navbar, Footer, AnimatedCounter } from '@/components';
import styles from './page.module.css';

// Lazy load heavy components
const ParticleBackground = dynamic(
  () => import('@/components/effects/ParticleBackground/ParticleBackground'),
  { ssr: false }
);

// Data
const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our advanced machine learning algorithms analyze your skills, interests, and personality to provide highly accurate career recommendations.',
    color: '#6366f1',
  },
  {
    icon: Target,
    title: 'Personalized Matching',
    description: 'Get career suggestions tailored specifically to your unique profile, not generic advice that applies to everyone.',
    color: '#8b5cf6',
  },
  {
    icon: TrendingUp,
    title: 'Skill Gap Analysis',
    description: 'Identify exactly what skills you need to develop and get personalized learning paths to achieve your career goals.',
    color: '#a855f7',
  },
  {
    icon: MessageCircle,
    title: '24/7 AI Counselor',
    description: 'Get instant answers to your career questions anytime with our GPT-powered AI career counselor chatbot.',
    color: '#06b6d4',
  },
  {
    icon: BookOpen,
    title: 'Rich Career Database',
    description: 'Explore 500+ careers with detailed information including requirements, salaries, growth potential, and day-in-the-life descriptions.',
    color: '#ec4899',
  },
  {
    icon: Users,
    title: 'Mentorship Network',
    description: 'Connect with industry professionals and alumni who can guide you on your career journey.',
    color: '#f97316',
  },
];

const stats = [
  { value: 50000, suffix: '+', label: 'Students Guided' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 500, suffix: '+', label: 'Careers Mapped' },
  { value: 95, suffix: '%', label: 'Accuracy Rate' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Take the Assessment',
    description: 'Complete our comprehensive career assessment covering your interests, aptitude, personality, and skills. It takes about 15-20 minutes.',
    icon: GraduationCap,
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Our AI engine processes your responses using advanced ML algorithms to identify patterns and match you with suitable careers.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Get Recommendations',
    description: 'Receive a detailed report with your top career matches, skill gap analysis, and personalized learning paths.',
    icon: Briefcase,
  },
  {
    step: '04',
    title: 'Plan & Grow',
    description: 'Use our tools and AI counselor to create an action plan, track progress, and achieve your career goals.',
    icon: LineChart,
  },
];

const testimonials = [
  {
    content: "CareerAI completely changed my perspective on career choices. I was confused between engineering and medicine, but the assessment helped me realize my true calling is in data science.",
    author: 'Arun Kumar',
    role: 'B.Tech Student, VIT Chennai',
    avatar: 'AK',
  },
  {
    content: "The AI counselor is amazing! I could ask questions at midnight before my career decision deadline, and it provided thoughtful, personalized advice that really helped.",
    author: 'Priya Sharma',
    role: 'MBA Student, IIM Bangalore',
    avatar: 'PS',
  },
  {
    content: "The skill gap analysis was eye-opening. It showed me exactly what I needed to learn for my dream role as a Product Manager and even suggested specific courses.",
    author: 'Rahul Menon',
    role: 'Software Developer, Infosys',
    avatar: 'RM',
  },
];

const careerCategories = [
  { name: 'Technology', count: 120, icon: '💻' },
  { name: 'Healthcare', count: 85, icon: '🏥' },
  { name: 'Business', count: 95, icon: '📊' },
  { name: 'Creative', count: 70, icon: '🎨' },
  { name: 'Science', count: 65, icon: '🔬' },
  { name: 'Education', count: 45, icon: '📚' },
];

const faqs = [
  {
    question: 'Is CareerAI really free for students?',
    answer: 'Yes! CareerAI is completely free for students. We believe career guidance should be accessible to everyone, regardless of their financial situation.',
  },
  {
    question: 'How accurate are the career recommendations?',
    answer: 'Our AI model has a 95% accuracy rate based on feedback from users who found their recommended careers to be highly relevant. We continuously improve our algorithms based on real outcomes.',
  },
  {
    question: 'How long does the assessment take?',
    answer: 'The complete assessment takes about 15-20 minutes. You can pause and resume at any time, and your progress is automatically saved.',
  },
  {
    question: 'Can I retake the assessment?',
    answer: 'Absolutely! We encourage retaking the assessment periodically as your skills and interests evolve. You can compare results over time in your dashboard.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take data privacy seriously. All your information is encrypted, and we never share your personal data with third parties without your consent.',
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      <Navbar />
      <ParticleBackground />

      <main className={styles.main}>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className={styles.hero}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          {/* Gradient Orbs */}
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />

          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Sparkles size={14} />
              <span>AI-Powered Career Guidance • Free for Students</span>
            </motion.div>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover Your
              <br />
              <span className={styles.gradientText}>Perfect Career Path</span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform your future with AI-powered career recommendations.
              Take our comprehensive assessment and discover careers that
              match your skills, interests, and personality.
            </motion.p>

            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link href="/assessment">
                <motion.button
                  className={styles.primaryBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={18} />
                  Start Free Assessment
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/careers">
                <motion.button
                  className={styles.secondaryBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={16} />
                  Explore Careers
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className={styles.heroTrust}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className={styles.trustAvatars}>
                {['S', 'A', 'P', 'R', 'M'].map((letter, i) => (
                  <div key={i} className={styles.trustAvatar}>{letter}</div>
                ))}
              </div>
              <div className={styles.trustText}>
                <div className={styles.trustStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span>Trusted by 50,000+ students across India</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Icons */}
          <div className={styles.floatingIcons}>
            <motion.div
              className={`${styles.floatingIcon} ${styles.icon1}`}
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Brain size={28} />
            </motion.div>
            <motion.div
              className={`${styles.floatingIcon} ${styles.icon2}`}
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Target size={28} />
            </motion.div>
            <motion.div
              className={`${styles.floatingIcon} ${styles.icon3}`}
              animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Lightbulb size={28} />
            </motion.div>
            <motion.div
              className={`${styles.floatingIcon} ${styles.icon4}`}
              animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <TrendingUp size={28} />
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.statsGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={styles.statValue}>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                      delay={0.3 + index * 0.1}
                    />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.sectionBadge}>
                <Zap size={14} />
                Features
              </span>
              <h2 className={styles.sectionTitle}>
                Everything You Need for
                <br />
                <span className={styles.gradientText}>Career Success</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Our comprehensive platform combines cutting-edge AI technology with
                deep career expertise to guide you towards your ideal career path.
              </p>
            </motion.div>

            <motion.div
              className={styles.featuresGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={styles.featureCard}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div
                    className={styles.featureIcon}
                    style={{ '--feature-color': feature.color } as React.CSSProperties}
                  >
                    <feature.icon size={28} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.sectionBadge}>
                <Lightbulb size={14} />
                Process
              </span>
              <h2 className={styles.sectionTitle}>
                How CareerAI
                <br />
                <span className={styles.gradientText}>Works For You</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Our streamlined process makes career discovery simple,
                data-driven, and personalized to your unique profile.
              </p>
            </motion.div>

            <motion.div
              className={styles.stepsGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={styles.stepCard}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className={styles.stepNumber}>{step.step}</div>
                  <div className={styles.stepIcon}>
                    <step.icon size={24} />
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {index < howItWorks.length - 1 && (
                    <div className={styles.stepConnector}>
                      <ChevronRight size={20} />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Career Categories Preview */}
        <section className={styles.categoriesSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.sectionBadge}>
                <Briefcase size={14} />
                Explore
              </span>
              <h2 className={styles.sectionTitle}>
                Explore Career
                <br />
                <span className={styles.gradientText}>Categories</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Browse through our comprehensive database of 500+ careers
                across various industries and fields.
              </p>
            </motion.div>

            <motion.div
              className={styles.categoriesGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {careerCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className={styles.categoryCard}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryCount}>{category.count}+ Careers</p>
                  <ArrowRight size={18} className={styles.categoryArrow} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className={styles.categoriesCta}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/careers">
                <motion.button
                  className={styles.secondaryBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View All Careers
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.sectionBadge}>
                <Users size={14} />
                Testimonials
              </span>
              <h2 className={styles.sectionTitle}>
                What Students Are
                <br />
                <span className={styles.gradientText}>Saying About Us</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Join thousands of students who have found their ideal career
                path with CareerAI's intelligent guidance.
              </p>
            </motion.div>

            <motion.div
              className={styles.testimonialsGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  className={styles.testimonialCard}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className={styles.testimonialStars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>{testimonial.avatar}</div>
                    <div className={styles.testimonialInfo}>
                      <span className={styles.testimonialName}>{testimonial.author}</span>
                      <span className={styles.testimonialRole}>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.sectionBadge}>
                <MessageCircle size={14} />
                FAQ
              </span>
              <h2 className={styles.sectionTitle}>
                Frequently Asked
                <br />
                <span className={styles.gradientText}>Questions</span>
              </h2>
            </motion.div>

            <motion.div
              className={styles.faqGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className={styles.faqCard}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </motion.div>
              ))}
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
                  Join 50,000+ students who have already found their ideal career path.
                  Start your free assessment today and unlock your potential.
                </p>
                <div className={styles.ctaActions}>
                  <Link href="/assessment">
                    <motion.button
                      className={styles.ctaPrimaryBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles size={18} />
                      Start Free Assessment
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </div>
                <div className={styles.ctaFeatures}>
                  <div className={styles.ctaFeature}>
                    <CheckCircle2 size={16} />
                    <span>100% Free</span>
                  </div>
                  <div className={styles.ctaFeature}>
                    <Clock size={16} />
                    <span>Takes 15-20 mins</span>
                  </div>
                  <div className={styles.ctaFeature}>
                    <Shield size={16} />
                    <span>Data Protected</span>
                  </div>
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

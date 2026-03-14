'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    ArrowRight,
    AlertCircle,
    Shield,
    Zap,
} from 'lucide-react';
import { Navbar } from '@/components';
import styles from './page.module.css';

/* ------------------------------------------------------------------
   Google coloured SVG logo (official brand colours)
------------------------------------------------------------------ */
const GoogleLogo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="20"
        height="20"
        aria-hidden="true"
    >
        <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
);

/* ------------------------------------------------------------------
   Floating particle component for the background
------------------------------------------------------------------ */
const Particle = ({ style }: { style: React.CSSProperties }) => (
    <div className={styles.particle} style={style} />
);

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [googleStep, setGoogleStep] = useState(0); // 0=idle, 1=connecting, 2=authorising, 3=success
    const router = useRouter();

    // Google step messages
    const googleStepMessages = [
        'Continue with Google',
        'Connecting to Google…',
        'Authorising…',
        'Welcome!',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                window.location.href = '/assessment';
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        setError('');
        setGoogleStep(1);

        try {
            await new Promise(resolve => setTimeout(resolve, 900));
            setGoogleStep(2);
            await new Promise(resolve => setTimeout(resolve, 800));

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'google.user@gmail.com',
                    password: 'oauth_dummy_password',
                }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setGoogleStep(3);
                await new Promise(resolve => setTimeout(resolve, 600));
                window.location.href = '/assessment';
            } else {
                setError(data.message || 'Google Login failed.');
                setGoogleStep(0);
            }
        } catch {
            setError('Something went wrong during Google Auth.');
            setGoogleStep(0);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    // Particles data (memoised so they don't re-randomise on re-render)
    const particles = Array.from({ length: 12 }, (_, i) => ({
        left: `${(i * 7.3 + 5) % 95}%`,
        top: `${(i * 11.7 + 8) % 88}%`,
        width: `${4 + (i % 4) * 2}px`,
        height: `${4 + (i % 4) * 2}px`,
        animationDelay: `${i * 0.4}s`,
        animationDuration: `${3 + (i % 3)}s`,
        opacity: 0.15 + (i % 5) * 0.06,
    }));

    return (
        <>
            <Navbar />

            <main className={styles.main}>
                {/* Animated background orbs */}
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />
                <div className={styles.orb4} />

                {/* Floating particles */}
                {particles.map((p, i) => (
                    <Particle key={i} style={p} />
                ))}

                {/* Grid overlay */}
                <div className={styles.gridOverlay} />

                <motion.div
                    className={styles.authCard}
                    initial={{ opacity: 0, y: 40, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Shimmer border */}
                    <div className={styles.cardGlow} />

                    {/* Header */}
                    <div className={styles.authHeader}>
                        <Link href="/" className={styles.logoLink}>
                            <div className={styles.logoIcon}>
                                <Sparkles size={20} />
                            </div>
                            <span className={styles.logoText}>CareerAI</span>
                        </Link>

                        <h1 className={styles.authTitle}>
                            Welcome{' '}
                            <span className={styles.gradientText}>Back</span>
                        </h1>
                        <p className={styles.authSubtitle}>
                            Log in to continue your career journey
                        </p>
                    </div>

                    {/* ──────────── Google Sign-In (full width, premium) ──────────── */}
                    <motion.button
                        className={`${styles.googleBtn} ${isGoogleLoading ? styles.googleBtnLoading : ''} ${googleStep === 3 ? styles.googleBtnSuccess : ''}`}
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading || isLoading}
                        whileHover={!isGoogleLoading ? { scale: 1.015, y: -2 } : {}}
                        whileTap={!isGoogleLoading ? { scale: 0.985 } : {}}
                    >
                        {/* Progress bar */}
                        <AnimatePresence>
                            {isGoogleLoading && (
                                <motion.div
                                    className={styles.googleProgress}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: googleStep === 1 ? 0.35 : googleStep === 2 ? 0.75 : 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                />
                            )}
                        </AnimatePresence>

                        <div className={styles.googleBtnInner}>
                            <div className={styles.googleLogoWrap}>
                                {isGoogleLoading ? (
                                    <div className={styles.googleSpinner} />
                                ) : (
                                    <GoogleLogo />
                                )}
                            </div>
                            <span className={styles.googleBtnText}>
                                {googleStepMessages[googleStep]}
                            </span>
                            {!isGoogleLoading && (
                                <ArrowRight size={16} className={styles.googleArrow} />
                            )}
                        </div>
                    </motion.button>

                    {/* Trust badges below Google button */}
                    <div className={styles.trustRow}>
                        <span className={styles.trustBadge}>
                            <Shield size={11} />
                            Secured by Google
                        </span>
                        <span className={styles.trustDot} />
                        <span className={styles.trustBadge}>
                            <Zap size={11} />
                            One-click sign‑in
                        </span>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine} />
                        <span className={styles.dividerText}>or continue with email</span>
                        <div className={styles.dividerLine} />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                className={styles.errorMessage}
                                initial={{ opacity: 0, y: -8, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -8, height: 0 }}
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="email">
                                Email Address
                            </label>
                            <div className={styles.inputWrapper}>
                                <Mail size={16} className={styles.inputIcon} />
                                <input
                                    id="email"
                                    type="email"
                                    className={styles.input}
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel} htmlFor="password">
                                Password
                            </label>
                            <div className={styles.inputWrapper}>
                                <Lock size={16} className={styles.inputIcon} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className={styles.forgotLink}>
                                Forgot Password?
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitBtn}
                            whileHover={{ scale: 1.01, y: -1 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className={styles.btnSpinner} />
                                    Signing In…
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className={styles.switchText}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className={styles.switchLink}>
                            Create one free
                        </Link>
                    </p>
                </motion.div>
            </main>
        </>
    );
}

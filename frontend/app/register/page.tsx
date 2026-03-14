'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Mail,
    Lock,
    Eye,
    EyeOff,
    UserPlus,
    ArrowRight,
    AlertCircle,
    User,
    CheckCircle,
    KeyRound,
    Zap
} from 'lucide-react';
import { Navbar } from '@/components';
import styles from './page.module.css';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (!pass) return { score: 0, label: '', width: '0%', color: 'transparent' };

        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[a-z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (pass.length < 8) score = Math.min(score, 2);

        switch (score) {
            case 0:
            case 1:
            case 2: return { score, label: 'Weak', width: '33%', color: '#ef4444' };
            case 3:
            case 4: return { score, label: 'Medium', width: '66%', color: '#eab308' };
            case 5: return { score, label: 'Strong', width: '100%', color: '#22c55e' };
            default: return { score: 0, label: '', width: '0%', color: 'transparent' };
        }
    };

    const strength = getPasswordStrength(password);

    const handleGeneratePassword = () => {
        const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowers = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let newPassword = '';
        newPassword += uppers[Math.floor(Math.random() * uppers.length)];
        newPassword += lowers[Math.floor(Math.random() * lowers.length)];
        newPassword += numbers[Math.floor(Math.random() * numbers.length)];
        newPassword += specials[Math.floor(Math.random() * specials.length)];

        const allChars = uppers + lowers + numbers + specials;
        for (let i = 4; i < 12; i++) {
            newPassword += allChars[Math.floor(Math.random() * allChars.length)];
        }

        newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');

        setPassword(newPassword);
        setConfirmPassword(newPassword);
        setShowPassword(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!agreeTerms) {
            setError('Please agree to the Terms of Service.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess('Account created! Redirecting...');
                // Force a hard navigation to apply middleware completely
                window.location.href = '/assessment';
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className={styles.main}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />

                <motion.div
                    className={styles.authCard}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Header */}
                    <div className={styles.authHeader}>
                        <Link href="/" className={styles.logoLink}>
                            <div className={styles.logoIcon}>
                                <Sparkles size={20} />
                            </div>
                            <span className={styles.logoText}>CareerAI</span>
                        </Link>
                        <h1 className={styles.authTitle}>
                            Create Your <span className={styles.gradientText}>Account</span>
                        </h1>
                        <p className={styles.authSubtitle}>
                            Join thousands of students discovering their dream careers
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className={styles.socialButtons}>
                        <button className={styles.socialBtn}>
                            <span className={styles.socialIcon}>🔵</span>
                            Google
                        </button>
                        <button className={styles.socialBtn}>
                            <span className={styles.socialIcon}>⚫</span>
                            GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine} />
                        <span className={styles.dividerText}>or register with email</span>
                        <div className={styles.dividerLine} />
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            className={styles.errorMessage}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginBottom: '1rem' }}
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    {/* Success */}
                    {success && (
                        <motion.div
                            className={styles.successMessage}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginBottom: '1rem' }}
                        >
                            <CheckCircle size={16} />
                            {success}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.nameRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>First Name</label>
                                <div className={styles.inputWrapper}>
                                    <User size={16} className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Last Name</label>
                                <div className={styles.inputWrapper}>
                                    <User size={16} className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Email Address</label>
                            <div className={styles.inputWrapper}>
                                <Mail size={16} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.labelRow}>
                                <label className={styles.inputLabel}>Password</label>
                                <button
                                    type="button"
                                    className={styles.generateBtn}
                                    onClick={handleGeneratePassword}
                                >
                                    <Zap size={14} />
                                    Suggest Strong Password
                                </button>
                            </div>
                            <div className={styles.inputWrapper}>
                                <Lock size={16} className={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="Min. 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {password && (
                                <div className={styles.passwordStrength}>
                                    <div className={styles.strengthBarContainer}>
                                        <motion.div
                                            className={styles.strengthBar}
                                            initial={{ width: 0 }}
                                            animate={{ width: strength.width, backgroundColor: strength.color }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <span className={styles.strengthLabel} style={{ color: strength.color }}>
                                        {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Confirm Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={16} className={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            I agree to the Terms of Service and Privacy Policy
                        </label>

                        <motion.button
                            type="submit"
                            className={styles.submitBtn}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isLoading}
                        >
                            <UserPlus size={18} />
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            <ArrowRight size={16} />
                        </motion.button>
                    </form>

                    <p className={styles.switchText}>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.switchLink}>
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </main>
        </>
    );
}

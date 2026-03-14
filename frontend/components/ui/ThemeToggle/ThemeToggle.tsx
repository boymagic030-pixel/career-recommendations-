'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className={styles.toggle} aria-label="Toggle theme">
                <div className={styles.iconPlaceholder} />
            </button>
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            className={styles.toggle}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className={styles.iconWrapper}>
                {isDark ? (
                    <Sun size={18} className={styles.icon} />
                ) : (
                    <Moon size={18} className={styles.icon} />
                )}
            </div>
        </button>
    );
}

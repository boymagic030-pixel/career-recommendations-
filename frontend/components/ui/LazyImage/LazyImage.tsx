'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from './LazyImage.module.css';

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
    fallbackSrc?: string;
}

export default function LazyImage({
    src,
    alt,
    fallbackSrc = '/placeholder.png',
    className,
    ...props
}: LazyImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={`${styles.container} ${className || ''}`}>
            {isLoading && <div className={styles.skeleton} />}
            <Image
                src={error ? fallbackSrc : src}
                alt={alt}
                className={`${styles.image} ${isLoading ? styles.loading : styles.loaded}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setError(true);
                    setIsLoading(false);
                }}
                {...props}
            />
        </div>
    );
}

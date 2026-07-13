import React, { useState, useEffect } from 'react';

/**
 * ScrollToTop Component
 * A premium floating button with an SVG scroll-depth progress ring that
 * smoothly scrolls the viewport back to the top when clicked.
 */
export default function ScrollToTop() {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling past 200px
            setVisible(window.scrollY > 200);

            // Compute scroll progress percentage
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                const percent = (window.scrollY / scrollHeight) * 100;
                setScrollPercent(percent);
            } else {
                setScrollPercent(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // SVG Circular dimensions
    const radius = 18;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * radius; // ~113.1
    const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(240, 252, 247, 0.85)', // Light TanaOgi mint surface
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 107, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 9999,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                pointerEvents: visible ? 'all' : 'none',
                transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s',
                boxShadow: '0 10px 30px -5px rgba(0, 107, 94, 0.15)',
                padding: 0,
                outline: 'none',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(240, 252, 247, 0.98)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(240, 252, 247, 0.85)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
        >
            <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'rotate(-90deg)',
                }}
            >
                {/* Background Circle */}
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(0, 107, 94, 0.08)"
                    strokeWidth={strokeWidth}
                />
                {/* Foreground Progress Circle */}
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    fill="transparent"
                    stroke="#b32000" // Brand terracotta accent
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 0.1s ease',
                    }}
                />
            </svg>
            <span
                className="material-symbols-outlined"
                style={{
                    fontSize: '20px',
                    color: '#006b5e', // Brand dark green
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                arrow_upward
            </span>
        </button>
    );
}

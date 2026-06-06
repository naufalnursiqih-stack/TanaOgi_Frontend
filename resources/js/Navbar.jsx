import React, { useState, useEffect } from 'react';

/**
 * Shared Navbar Component — Tana Ogi
 */
export default function Navbar({
    activePage = '',
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateJournal,
}) {
    const [scrolled, setScrolled] = useState(false);

    // State untuk animasi ganti-mengganti tulisan
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect untuk menangani rotasi teks cinematic bergantian
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Mulai efek transisi blur/hide
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
                setFade(false); // Kembalikan ke kondisi normal (show)
            }, 400); // Durasi transisi blur sesuai spesifikasi HTML sebelumnya
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { label: 'Destinations', key: 'destinations', action: onNavigateDestinations },
        { label: 'Experiences', key: 'experiences', action: onNavigateExperiences },
        { label: 'Culture', key: 'culture', action: onNavigateCulture },
        { label: 'Journal', key: 'journal', action: onNavigateJournal },
    ];

    const isActive = (key) => activePage === key;

    const linkStyle = (key) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: isActive(key) ? 700 : 500,
        color: isActive(key) ? '#b32000' : 'rgba(19,30,27,0.7)',
        textDecoration: 'none',
        borderBottom: isActive(key) ? '2px solid #b32000' : '2px solid transparent',
        paddingBottom: '4px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    });

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 50,
            backgroundColor: scrolled ? 'rgba(240,252,247,0.95)' : 'rgba(240,252,247,0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.07)' : '0 4px 30px rgba(0,0,0,0.02)',
            transition: 'all 0.4s ease',
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: scrolled ? '12px 64px' : '20px 64px',
                maxWidth: '1440px',
                margin: '0 auto',
                transition: 'padding 0.4s ease',
            }}>
                {/* Brand Logo & Title Wrapper */}
                <div
                    onClick={onNavigateHome}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        flexShrink: 0,
                    }}
                >
                    <img
                        src="/logo TanaOgi.png"
                        alt="Logo Tana Ogi"
                        style={{
                            width: '42px',
                            height: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                    <span
                        style={{
                            fontFamily: font,
                            fontSize: '28px',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: '#b32000',
                            minWidth: '160px',
                            display: 'inline-block',
                            opacity: fade ? 0 : 1,
                            filter: fade ? 'blur(10px)' : 'blur(0px)',
                            transform: fade ? 'scale(0.96)' : 'scale(1)',
                            transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease',
                        }}
                    >
                        {titles[currentIndex]}
                    </span>
                </div>

                {/* Nav Links */}
                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    {navLinks.map(({ label, key, action }) => (
                        <a
                            key={key}
                            href="#"
                            onClick={e => { e.preventDefault(); if (action) action(); }}
                            style={linkStyle(key)}
                            onMouseEnter={e => {
                                if (!isActive(key)) e.currentTarget.style.color = '#b32000';
                            }}
                            onMouseLeave={e => {
                                if (!isActive(key)) e.currentTarget.style.color = 'rgba(19,30,27,0.7)';
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <button
                        onClick={onNavigateLogin}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: font,
                            fontSize: '16px',
                            fontWeight: 500,
                            color: 'rgba(19,30,27,0.7)',
                            padding: 0,
                            transition: 'color 0.3s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#b32000'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(19,30,27,0.7)'}
                    >
                        Masuk
                    </button>
                    <button
                        onClick={onNavigateRegister}
                        style={{
                            border: '1.5px solid #b32000',
                            color: '#b32000',
                            padding: '8px 28px',
                            borderRadius: '9999px',
                            fontFamily: font,
                            fontSize: '14px',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#b32000';
                            e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#b32000';
                        }}
                    >
                        Daftar
                    </button>
                </div>
            </nav>
        </header>
    );
}
import React, { useState, useEffect } from 'react';

/**
 * Shared Navbar Component — Tana Ogi (Default)
 */
export default function Navbar({
    activePage = '',
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateAdmin,
    onNavigateDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateJournal,
    isHeroTheme = false, // Atribut pendeteksi halaman utama
    currentUser = null,
    onLogout,
}) {
    const [scrolled, setScrolled] = useState(false);
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
                setFade(false);
            }, 400);
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

    // Menentukan warna teks link menu (Putih bersih jika di awal home page)
    const getDynamicTextColor = (key) => {
        if (isHeroTheme && !scrolled) return '#ffffff';
        if (isActive(key)) return '#b32000';
        return 'rgba(19,30,27,0.7)';
    };

    const linkStyle = (key) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: (isHeroTheme && !scrolled) ? 500 : (isActive(key) ? 700 : 500),
        color: getDynamicTextColor(key),
        textDecoration: 'none',
        borderBottom: (isActive(key) && (!isHeroTheme || scrolled)) ? '2px solid #b32000' : '2px solid transparent',
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
            // Jika di awal home, background dipaksa transparan total tanpa blur
            backgroundColor: isHeroTheme && !scrolled ? 'transparent' : 'rgba(240,252,247,0.95)',
            backdropFilter: isHeroTheme && !scrolled ? 'none' : 'blur(20px)',
            WebkitBackdropFilter: isHeroTheme && !scrolled ? 'none' : 'blur(20px)',
            borderBottom: isHeroTheme && !scrolled ? 'none' : '1px solid rgba(19,30,27,0.06)',
            boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.05)' : 'none',
            transition: 'all 0.4s ease',
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: scrolled ? '14px 64px' : '24px 64px',
                maxWidth: '1440px',
                margin: '0 auto',
                transition: 'padding 0.4s ease',
            }}>
                {/* Bagian Kiri: Logo & Nama Brand */}
                <div
                    onClick={onNavigateHome}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                >
                    <img
                        src="/logo TanaOgi.png"
                        alt="Logo Tana Ogi"
                        style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain'
                        }}
                    />
                    <span
                        style={{
                            fontFamily: font,
                            fontSize: '24px',
                            fontWeight: 700,
                            letterSpacing: '-0.01em',
                            color: isHeroTheme && !scrolled ? '#ffffff' : '#b32000',
                            opacity: fade ? 0 : 1,
                            filter: fade ? 'blur(8px)' : 'blur(0px)',
                            transform: fade ? 'scale(0.97)' : 'scale(1)',
                            transition: 'color 0.4s, opacity 0.4s, filter 0.4s, transform 0.4s',
                        }}
                    >
                        {titles[currentIndex]}
                    </span>
                </div>

                {/* Bagian Tengah: Menu Navigasi */}
                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    {navLinks.map(({ label, key, action }) => (
                        <a
                            key={key}
                            href="#"
                            onClick={e => { e.preventDefault(); if (action) action(); }}
                            style={linkStyle(key)}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = isHeroTheme && !scrolled ? 'rgba(255,255,255,0.7)' : '#b32000';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = getDynamicTextColor(key);
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Bagian Kanan: Akses Tombol / User Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {currentUser ? (
                        /* Logged-in state: show user avatar + name + logout */
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #F5401B, #FF9900)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontFamily: font,
                                fontWeight: 700,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                flexShrink: 0,
                            }}>
                                {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                            </div>
                            <span style={{
                                fontFamily: font,
                                fontSize: '14px',
                                fontWeight: 600,
                                color: isHeroTheme && !scrolled ? '#ffffff' : '#131e1b',
                                maxWidth: '120px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                transition: 'color 0.3s',
                            }}>
                                {currentUser.name}
                            </span>
                            <button
                                onClick={onLogout}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: isHeroTheme && !scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(19,30,27,0.5)',
                                    padding: '4px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#b32000';
                                    e.currentTarget.style.backgroundColor = 'rgba(179,32,0,0.08)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = isHeroTheme && !scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(19,30,27,0.5)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                                title="Logout"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                            </button>
                        </div>
                    ) : (
                        /* Guest state: show login + register buttons */
                        <>
                            <button
                                onClick={onNavigateLogin}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: font,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color: isHeroTheme && !scrolled ? '#ffffff' : 'rgba(19,30,27,0.7)',
                                    padding: 0,
                                    transition: 'color 0.3s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = isHeroTheme && !scrolled ? 'rgba(255,255,255,0.7)' : '#b32000'}
                                onMouseLeave={e => e.currentTarget.style.color = isHeroTheme && !scrolled ? '#ffffff' : 'rgba(19,30,27,0.7)'}
                            >
                                Masuk
                            </button>
                            <button
                                onClick={onNavigateRegister}
                                style={{
                                    border: isHeroTheme && !scrolled ? '1px solid #ffffff' : '1.5px solid #b32000',
                                    color: isHeroTheme && !scrolled ? '#ffffff' : '#b32000',
                                    padding: '8px 24px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    if (isHeroTheme && !scrolled) {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.color = '#000000';
                                    } else {
                                        e.currentTarget.style.backgroundColor = '#b32000';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = isHeroTheme && !scrolled ? '#ffffff' : '#b32000';
                                }}
                            >
                                Daftar
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
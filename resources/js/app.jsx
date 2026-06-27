import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import DestinationsPage from './DestinationsPage';
import AllDestinationsPage from './AllDestinationsPage';
import ExperiencesPage from './ExperiencesPage';
import CulturePage from './CulturePage';
import JournalPage from './JournalPage';
import DestinationDetailPage from './DestinationDetailPage';
import DriversPage from './DriversPage';
import Preloader from './Preloader';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';
import ErrorPage from './ErrorPage';


/**
 * Shared Navbar Component — Tana Ogi (Default)
 */
function Navbar({
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
                            {currentUser.avatar ? (
                                <img
                                    src={currentUser.avatar}
                                    alt={currentUser.name}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        flexShrink: 0,
                                        border: '1.5px solid #b32000'
                                    }}
                                />
                            ) : (
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
                            )}
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
/**
 * HomePage Component
 */
function HomePage({ onNavigateRegister, onNavigateLogin, onNavigateDestinations, onNavigateAllDestinations, onNavigateExperiences, onNavigateCulture, onNavigateJournal, currentUser, onLogout }) {
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20 * 0.2;
            const y = (e.clientY / window.innerHeight - 0.5) * 20 * 0.2;
            setParallax({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleExploreClick = (e) => {
        e.preventDefault();
        if (onNavigateDestinations) onNavigateDestinations();
    };

    const handleDestinationsClick = (e) => {
        e.preventDefault();
        if (onNavigateAllDestinations) onNavigateAllDestinations();
    };

    const font = "'Plus Jakarta Sans', sans-serif";

    return (
        <>
            {/* Menggunakan Navbar Default baru */}
            <Navbar
                activePage="home"
                isHeroTheme={true}
                onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            {/* Hero Section */}
            <main className="relative h-screen w-full overflow-hidden flex items-end z-10">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                        <source src="/final-web2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 hero-gradient" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%)' }}></div>
                </div>

                {/* Hero Content Base */}
                <div className="relative z-10 w-full px-margin-desktop pb-16 flex justify-between items-end">

                    {/* Left Column Content */}
                    <div className="max-w-2xl flex flex-col gap-5">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3">
                            <div className="w-[20px] h-[2px] bg-[#23F7DB]"></div>
                            <span style={{
                                fontFamily: font,
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: '#23F7DB',
                                textTransform: 'uppercase'
                            }}>Pariwisata Sulawesi Selatan</span>
                        </div>

                        {/* Headline */}
                        <div className="overflow-hidden">
                            <h1
                                className="text-white select-none transition-transform duration-75 ease-out"
                                style={{
                                    fontFamily: font,
                                    fontSize: '56px',
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em',
                                    transform: `translate(${parallax.x}px, ${parallax.y}px)`
                                }}
                            >
                                Jelajahi<br />
                                <span className="text-gradient-sunset" style={{ background: 'linear-gradient(45deg, #F5401B, #FF9900)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Keajaiban</span><br />
                                Sulawesi Selatan
                            </h1>
                        </div>

                        {/* Subheadline */}
                        <p style={{
                            fontFamily: font,
                            fontSize: '15px',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.75)',
                            maxWidth: '32rem'
                        }}>
                            Temukan keindahan alam dan budaya yang tak terlupakan di jantung Nusantara.
                        </p>

                        {/* Stats Pills */}
                        <div className="flex gap-3 pt-1">
                            <div className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
                                <span className="material-symbols-outlined" style={{ color: '#23F7DB', fontSize: '16px' }}>explore</span>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <span style={{ fontFamily: font, fontWeight: 700, color: '#23F7DB' }}>9+</span>
                                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Destinasi</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
                                <span className="material-symbols-outlined" style={{ color: '#23F7DB', fontSize: '16px' }}>location_on</span>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <span style={{ fontFamily: font, fontWeight: 700, color: '#23F7DB' }}>24</span>
                                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Kabupaten/Kota</span>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex items-center gap-4 pt-3">
                            <button
                                onClick={handleExploreClick}
                                className="transition-all hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: '#F5401B',
                                    color: '#ffffff',
                                    paddingLeft: '24px',
                                    paddingRight: '24px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>play_arrow</span>
                                Explore Now
                            </button>
                            <button
                                onClick={handleDestinationsClick}
                                className="transition-all hover:bg-white/10 active:scale-95"
                                style={{
                                    border: '1px solid rgba(255,255,255,0.6)',
                                    color: '#ffffff',
                                    paddingLeft: '24px',
                                    paddingRight: '24px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                Lihat Destinasi
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Scroll Indicator */}
                    <div className="hidden md:flex flex-col items-center gap-3 mb-4">
                        <span
                            className="select-none"
                            style={{
                                writingMode: 'vertical-lr',
                                fontFamily: font,
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.5)'
                            }}
                        >Scroll</span>
                        <div className="relative w-[1px] h-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}>
                            <div className="absolute top-0 left-0 w-full h-1/2 animate-scroll" style={{ backgroundColor: '#23F7DB' }}></div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

/**
 * App Wrapper
 */
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [transitioning, setTransitioning] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [showLoader, setShowLoader] = useState(true);

    // Auth State
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('auth_user');
        try {
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    // Kept redirect state to return to protected page after successful login
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 3200);
        return () => clearTimeout(timer);
    }, []);

    const lockedPages = ['register'];

    useEffect(() => {
        const body = document.body;
        if (lockedPages.includes(currentPage)) {
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
        } else {
            body.style.overflow = '';
            body.style.height = '';
        }
        return () => {
            body.style.overflow = '';
            body.style.height = '';
        };
    }, [currentPage]);

    const handleLoginSuccess = (user, token) => {
        setCurrentUser(user);
        if (redirectAfterLogin) {
            const { page, destData } = redirectAfterLogin;
            setRedirectAfterLogin(null);
            navigateTo(page, destData);
        } else {
            navigateTo('home');
        }
    };

    const handleRegisterSuccess = (user, token) => {
        setCurrentUser(user);
        navigateTo('home');
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                await fetch('/api/v1/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
            } catch (e) {
                console.error("Logout request failed:", e);
            }
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setCurrentUser(null);
        navigateTo('home');
    };

    const navigateTo = (page, destData = null) => {
        // Protected pages: destination-detail and drivers
        const protectedPages = ['destination-detail', 'drivers'];

        if (protectedPages.includes(page) && !currentUser) {
            // Save destination data if navigating to detail, so we can return to it
            setRedirectAfterLogin({ page, destData });

            // Redirect to login page instead
            page = 'login';
            destData = null;
        }

        const pagesWithLoader = ['destinations', 'all-destinations', 'destination-detail', 'login', 'register', 'drivers'];

        if (pagesWithLoader.includes(page)) {
            setShowLoader(true);
            setTimeout(() => {
                if (destData) setSelectedDestination(destData);
                setCurrentPage(page);
                window.scrollTo(0, 0);
            }, 400);

            setTimeout(() => {
                setShowLoader(false);
            }, 1500);
        } else {
            setTransitioning(true);
            setTimeout(() => {
                if (destData) {
                    setSelectedDestination(destData);
                }
                setCurrentPage(page);
                window.scrollTo(0, 0);
                setTransitioning(false);
            }, 250);
        }
    };

    return (
        <>
            <Preloader active={showLoader} />
            <div style={{
                opacity: transitioning ? 0 : 1,
                transition: 'opacity 0.25s ease',
            }}>
                {currentPage === 'home' && (
                    <HomePage
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateAllDestinations={() => navigateTo('all-destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'register' && (
                    <RegisterPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onRegisterSuccess={handleRegisterSuccess}
                    />
                )}
                {currentPage === 'login' && (
                    <LoginPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateAdmin={() => setCurrentPage('admin-login')}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}
                {currentPage === 'admin-login' && (
                    <AdminLoginPage 
                    onNavigateBack={() => setCurrentPage('login')}
                    onLoginSuccess={() => setCurrentPage('admin-dashboard')} />
                    )}
                {currentPage === 'destinations' && (
                    <DestinationsPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateAllDestinations={() => navigateTo('all-destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        onNavigateDestinationDetail={(dest) => navigateTo('destination-detail', dest)}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'all-destinations' && (
                    <AllDestinationsPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        onNavigateDestinationDetail={(dest) => navigateTo('destination-detail', dest)}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'experiences' && (
                    <ExperiencesPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'culture' && (
                    <CulturePage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateAllDestinations={() => navigateTo('all-destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateJournal={() => navigateTo('journal')}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'journal' && (
                    <JournalPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateAllDestinations={() => navigateTo('all-destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'destination-detail' && (
                    <DestinationDetailPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateAllDestinations={() => navigateTo('all-destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        onNavigateDrivers={() => navigateTo('drivers')}
                        destination={selectedDestination || {}}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'drivers' && (
                    <DriversPage
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                    />
                )}
                {currentPage === 'admin-dashboard' && (
                    <AdminDashboard 
                        adminName="Naufal" 
                        onLogout={() => setCurrentPage('login')} 
                    />
                )}
                {!['home', 'register', 'login', 'admin-login', 'destinations', 'all-destinations', 'experiences', 'culture', 'journal', 'destination-detail', 'drivers', 'admin-dashboard'].includes(currentPage) && (
                    <ErrorPage
                        errorCode={404}
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                    />
                )}
            </div>
        </>
    );
}

export default App;

const container = document.getElementById('root') || document.getElementById('app');
if (container && !container.__reactRootContainer) {
    const root = createRoot(container);
    container.__reactRootContainer = root;
    root.render(<App />);
}

const errorContainer = document.getElementById('error-root');
if (errorContainer && !errorContainer.__reactRootContainer) {
    const code = errorContainer.getAttribute('data-code') || 404;
    const root = createRoot(errorContainer);
    errorContainer.__reactRootContainer = root;
    root.render(
        <ErrorPage 
            errorCode={code} 
            onNavigateHome={() => window.location.href = '/'}
            onNavigateLogin={() => window.location.href = '/login'} 
        />
    );
}
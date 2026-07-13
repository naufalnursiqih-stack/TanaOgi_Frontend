import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ScrollToTop from './ScrollToTop';
import DestinationsPage from './DestinationsPage';
import AllDestinationsPage from './AllDestinationsPage';
import ExperiencesPage from './ExperiencesPage';
import CulturePage from './CulturePage';
import JournalPage from './JournalPage';
import DestinationDetailPage from './DestinationDetailPage';
import DriversPage from './DriversPage';
import SupportPageLayout from './SupportPageLayout';
import { supportPages } from './supportPages';
import Preloader from './Preloader';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';
import ErrorPage from './ErrorPage';
import WishlistSidebar from './WishlistSidebar';


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
    const isTransparent = isHeroTheme && !scrolled;
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
        if (isTransparent) return '#ffffff';
        if (isActive(key)) return '#b32000';
        return 'rgba(19,30,27,0.7)';
    };

    const linkStyle = (key) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: isTransparent ? 500 : (isActive(key) ? 700 : 500),
        color: getDynamicTextColor(key),
        textDecoration: 'none',
        borderBottom: (isActive(key) && !isTransparent) ? '2px solid #b32000' : '2px solid transparent',
        paddingBottom: '4px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    });

    return (
        <header 
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 50,
                backgroundColor: isTransparent ? 'transparent' : 'rgba(240,252,247,0.95)',
                backdropFilter: isTransparent ? 'none' : 'blur(20px)',
                WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px)',
                borderBottom: isTransparent ? 'none' : '1px solid rgba(19,30,27,0.06)',
                boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.4s ease',
            }}
        >
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
                            color: isTransparent ? '#ffffff' : '#b32000',
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
                                e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.7)' : '#b32000';
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
                                color: isTransparent ? '#ffffff' : '#131e1b',
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
                                    color: isTransparent ? 'rgba(255,255,255,0.7)' : 'rgba(19,30,27,0.5)',
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
                                    e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.7)' : 'rgba(19,30,27,0.5)';
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
                                    color: isTransparent ? '#ffffff' : 'rgba(19,30,27,0.7)',
                                    padding: 0,
                                    transition: 'color 0.3s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.7)' : '#b32000'}
                                onMouseLeave={e => e.currentTarget.style.color = isTransparent ? '#ffffff' : 'rgba(19,30,27,0.7)'}
                            >
                                Masuk
                            </button>
                            <button
                                onClick={onNavigateRegister}
                                style={{
                                    border: isTransparent ? '1px solid #ffffff' : '1.5px solid #b32000',
                                    color: isTransparent ? '#ffffff' : '#b32000',
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
                                    if (isTransparent) {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.color = '#000000';
                                    } else {
                                        e.currentTarget.style.backgroundColor = '#b32000';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = isTransparent ? '#ffffff' : '#b32000';
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
const stories = [
    {
        title: "Kabut Suci Toraja",
        poem: "Gagahnya pegunungan Toraja, berselimut kabut menembus cakrawala. Tanah para raja, tempat arwah bermukim di tebing-tebing batu sakral, menjaga warisan leluhur yang tak lekang oleh waktu."
    },
    {
        title: "Labirin Purba Rammang-Rammang",
        poem: "Menjaga rahasia masa purba di sela-sela hijau sawah dan sunyinya sungai Pute. Labirin batu karst tertua kedua di dunia, tegak berdiri merajut kesunyian alam Celebes."
    },
    {
        title: "Dendang Ombak & Phinisi",
        poem: "Ombak Bulukumba mencium pasir putih Bira, tempat para pelaut tangguh Bugis-Makassar memahat kapal Phinisi. Perahu legendaris pembelah samudra, simbol keberanian yang tak pernah padam."
    },
    {
        title: "Tebing Appalarang yang Kokoh",
        poem: "Tebing Appalarang berdiri kokoh menantang deburan ombak membiru. Saksi bisu keindahan pesisir yang tiada duanya, tempat karang dan laut bersatu dalam simfoni abadi."
    },
    {
        title: "Ketenangan Danau Tempe",
        poem: "Danau Tempe yang berkilau, saksi kehidupan di atas air terapung. Tempat harmoni nelayan berdendang bersama burung-burung migran di bawah lembayung senja yang tenang."
    }
];

function HomePage({ onNavigateRegister, onNavigateLogin, onNavigateDestinations, onNavigateAllDestinations, onNavigateExperiences, onNavigateCulture, onNavigateJournal, currentUser, onLogout, wishlistCount, onWishlistToggle }) {
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [viewportMouse, setViewportMouse] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isInside, setIsInside] = useState(false);

    // Story states
    const activeStoryIndexRef = React.useRef(0);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const [storyFade, setStoryFade] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [cardPosition, setCardPosition] = useState({ top: '20%', left: '68%' });

    // Handle random movement and rotation every 3.5 seconds
    useEffect(() => {
        if (isExpanded) return;

        const interval = setInterval(() => {
            setStoryFade(true);
            setTimeout(() => {
                const isMobile = window.innerWidth < 1024;
                let randomTop, randomLeft;

                if (isMobile) {
                    // Mobile safe range: upper-middle center/left
                    randomTop = Math.floor(Math.random() * 25) + 15;  // 15% to 40%
                    randomLeft = Math.floor(Math.random() * 35) + 10; // 10% to 45%
                } else {
                    // Desktop safe quadrants: randomly choose one of three quadrants
                    const quadrants = [
                        // Quadrant 1: High Left (very high up on the left, well above "Jelajahi")
                        { minTop: 15, maxTop: 24, minLeft: 10, maxLeft: 28 },
                        // Quadrant 2: High Center (high center, above the headline text block)
                        { minTop: 15, maxTop: 28, minLeft: 46, maxLeft: 60 },
                        // Quadrant 3: Right Side (entire right-middle side column, completely safe)
                        { minTop: 15, maxTop: 68, minLeft: 64, maxLeft: 78 }
                    ];
                    
                    const q = quadrants[Math.floor(Math.random() * quadrants.length)];
                    randomTop = Math.floor(Math.random() * (q.maxTop - q.minTop)) + q.minTop;
                    randomLeft = Math.floor(Math.random() * (q.maxLeft - q.minLeft)) + q.minLeft;
                }
                
                setCardPosition({
                    top: `${randomTop}%`,
                    left: `${randomLeft}%`
                });

                const nextIndex = (activeStoryIndexRef.current + 1) % stories.length;
                activeStoryIndexRef.current = nextIndex;
                setActiveStoryIndex(nextIndex);
                setStoryFade(false);
            }, 300);
        }, 3800); // 3.8s total loop (3.5s displaying + 0.3s transitioning)

        return () => clearInterval(interval);
    }, [isExpanded]);

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            setViewportMouse({ x: e.clientX, y: e.clientY });

            const heroElement = document.getElementById('hero-section');
            if (heroElement) {
                const rect = heroElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePos({ x, y });

                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    setIsInside(true);
                } else {
                    setIsInside(false);
                }
            }

            const px = (e.clientX / window.innerWidth - 0.5) * 20 * 0.2;
            const py = (e.clientY / window.innerHeight - 0.5) * 20 * 0.2;
            setParallax({ x: px, y: py });
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    const handleExploreClick = (e) => {
        e.preventDefault();
        if (onNavigateDestinations) onNavigateDestinations();
    };

    const handleDestinationsClick = (e) => {
        e.preventDefault();
        if (onNavigateAllDestinations) onNavigateAllDestinations();
    };

    const handleCardClick = (e) => {
        if (!isExpanded) {
            setIsExpanded(true);
        }
    };

    const handleCloseCard = (e) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    const font = "'Plus Jakarta Sans', sans-serif";

    return (
        <>
            <style>{`
                @keyframes modalSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

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
                wishlistCount={wishlistCount}
                onWishlistToggle={onWishlistToggle}
            />

            {/* Hero Section */}
            <main
                id="hero-section"
                className="relative h-screen w-full overflow-hidden flex items-end z-10"
                style={{ cursor: isInside ? 'none' : 'auto' }}
            >
                {/* Background Video */}
                <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 12}px, 0) scale(1.08)`,
                            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                    >
                        <source src="/final-web2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 hero-gradient" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%)' }}></div>
                </div>

                {/* Interactive Spotlight Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
                    style={{
                        opacity: isInside ? 1 : 0,
                        background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, rgba(35, 247, 219, 0.14) 0%, rgba(245, 64, 27, 0.04) 50%, rgba(0,0,0,0) 100%)`,
                    }}
                />

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
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
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
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
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

                    {/* Floating Story Card */}
                    <div
                        onClick={handleCardClick}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="flex flex-col gap-2 p-5 rounded-2xl border border-white/10 backdrop-blur-md select-none cursor-pointer"
                        style={{
                            position: 'absolute',
                            top: cardPosition.top,
                            left: cardPosition.left,
                            zIndex: 30,
                            width: '290px',
                            boxSizing: 'border-box',
                            backgroundColor: 'rgba(0, 0, 0, 0.45)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            transform: `translate(${parallax.x * -0.3}px, ${parallax.y * -0.3}px)`,
                            transition: 'left 0.8s cubic-bezier(0.25, 1, 0.5, 1), top 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                    >
                        <div 
                            style={{
                                opacity: storyFade ? 0 : 1,
                                transition: 'opacity 0.25s ease-in-out'
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="animate-ping rounded-full w-2 h-2 bg-[#23F7DB]"></span>
                                <span style={{
                                    fontFamily: font,
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    color: '#23F7DB',
                                    textTransform: 'uppercase'
                                }}>Senandung Celebes</span>
                            </div>
                            
                            <h3 style={{
                                fontFamily: font,
                                fontSize: '16px',
                                fontWeight: 700,
                                color: '#ffffff',
                                lineHeight: 1.3
                            }}>
                                {stories[activeStoryIndex].title}
                            </h3>
                            
                            {!isExpanded ? (
                                <p style={{
                                    fontFamily: font,
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.7)',
                                    lineHeight: 1.4,
                                    marginTop: '6px'
                                }}>
                                    Klik untuk meraba kisah alam...
                                </p>
                            ) : (
                                <>
                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '13px',
                                        color: 'rgba(255,255,255,0.9)',
                                        lineHeight: 1.6,
                                        marginTop: '10px',
                                        fontStyle: 'italic'
                                    }}>
                                        "{stories[activeStoryIndex].poem}"
                                    </p>
                                    <button 
                                        onClick={handleCloseCard}
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                        className="text-[#23F7DB] hover:underline text-xs mt-3 font-bold text-left block border-none bg-transparent p-0 cursor-pointer"
                                    >
                                        Tutup Kisah
                                    </button>
                                </>
                            )}
                        </div>
                    </div>


                </div>
            </main>

            {/* Custom Cursor Follower */}
            {isInside && (
                <div
                    className="hidden md:block pointer-events-none fixed z-[9999] rounded-full"
                    style={{
                        left: 0,
                        top: 0,
                        width: isHovering ? '60px' : '24px',
                        height: isHovering ? '60px' : '24px',
                        border: isHovering ? '2px solid #F5401B' : '2px solid #23F7DB',
                        boxShadow: isHovering ? '0 0 20px rgba(245, 64, 19, 0.6)' : '0 0 15px rgba(35, 247, 219, 0.4)',
                        backgroundColor: isHovering ? 'rgba(245, 64, 19, 0.08)' : 'rgba(35, 247, 219, 0.05)',
                        transform: `translate3d(calc(${viewportMouse.x}px - 50%), calc(${viewportMouse.y}px - 50%), 0)`,
                        transition: 'width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s, background-color 0.25s, box-shadow 0.25s, transform 0.08s ease-out',
                    }}
                />
            )}
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

    // Wishlist State & LocalStorage Persistence
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('tanaogi_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });
    const [wishlistOpen, setWishlistOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('tanaogi_wishlist', JSON.stringify(wishlist));
        } catch (e) {
            console.error("Failed to save wishlist:", e);
        }
    }, [wishlist]);

    const toggleWishlist = (dest) => {
        setWishlist(prev => {
            const exists = prev.find(x => x.id === dest.id);
            if (exists) {
                return prev.filter(x => x.id !== dest.id);
            } else {
                return [...prev, { 
                    id: dest.id, 
                    title: dest.title || dest.name, 
                    region: dest.region, 
                    image: dest.image || dest.heroImage, 
                    note: '' 
                }];
            }
        });
    };

    const updateWishlistNote = (id, note) => {
        setWishlist(prev => prev.map(x => x.id === id ? { ...x, note } : x));
    };

    const isInWishlist = (id) => wishlist.some(x => x.id === id);
    const removeWishlistItem = (id) => setWishlist(prev => prev.filter(x => x.id !== id));

    const wishlistProps = {
        wishlistCount: wishlist.length,
        onWishlistToggle: () => setWishlistOpen(true),
        onToggleWishlist: toggleWishlist,
        isInWishlist: isInWishlist
    };
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

        const pagesWithLoader = ['home', 'experiences', 'culture', 'journal', 'destinations', 'all-destinations', 'destination-detail', 'login', 'register', 'drivers', 'travel-guide', 'sustainability', 'about', 'press-kit', 'privacy', 'terms'];

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

    const supportNavProps = {
        onNavigateTravelGuide: () => navigateTo('travel-guide'),
        onNavigateSustainability: () => navigateTo('sustainability'),
        onNavigateAbout: () => navigateTo('about'),
        onNavigatePressKit: () => navigateTo('press-kit'),
        onNavigatePrivacyPolicy: () => navigateTo('privacy'),
        onNavigateTerms: () => navigateTo('terms'),
    };

    return (
        <>
            <Preloader active={showLoader} />
            <ScrollToTop />
            <WishlistSidebar
                isOpen={wishlistOpen}
                onClose={() => setWishlistOpen(false)}
                wishlist={wishlist}
                onRemoveItem={removeWishlistItem}
                onUpdateNote={updateWishlistNote}
                onExploreItem={(item) => navigateTo('destination-detail', item)}
            />
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
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
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
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        {...wishlistProps}
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
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        {...wishlistProps}
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
                        onNavigateDestinationDetail={(dest) => navigateTo('destination-detail', dest)}
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
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
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
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
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
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
                        {...supportNavProps}
                        destination={selectedDestination || {}}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
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
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
                    />
                )}
                {supportPages[currentPage] && (
                    <SupportPageLayout
                        pageKey={currentPage}
                        content={supportPages[currentPage]}
                        onNavigateHome={() => navigateTo('home')}
                        onNavigateLogin={() => navigateTo('login')}
                        onNavigateRegister={() => navigateTo('register')}
                        onNavigateDestinations={() => navigateTo('destinations')}
                        onNavigateExperiences={() => navigateTo('experiences')}
                        onNavigateCulture={() => navigateTo('culture')}
                        onNavigateJournal={() => navigateTo('journal')}
                        {...supportNavProps}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        wishlistCount={wishlist.length}
                        onWishlistToggle={() => setWishlistOpen(true)}
                    />
                )}
                {currentPage === 'admin-dashboard' && (
                    <AdminDashboard 
                        adminName="Naufal" 
                        onLogout={() => setCurrentPage('login')} 
                    />
                )}
                {!['home', 'register', 'login', 'admin-login', 'destinations', 'all-destinations', 'experiences', 'culture', 'journal', 'destination-detail', 'drivers', 'travel-guide', 'sustainability', 'about', 'press-kit', 'privacy', 'terms', 'admin-dashboard'].includes(currentPage) && (
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

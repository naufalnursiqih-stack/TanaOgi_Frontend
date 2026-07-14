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

import SupportPageLayout from './SupportPageLayout';
import { supportPages } from './supportPages';
import Preloader from './Preloader';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';
import ErrorPage from './ErrorPage';
import WishlistSidebar from './WishlistSidebar';
import PendingPaymentModal from './PendingPaymentModal';


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
    wishlistCount = 0,
    onWishlistToggle,
}) {
    const [scrolled, setScrolled] = useState(false);
    const isTransparent = isHeroTheme && !scrolled;
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const font = "'Plus Jakarta Sans', sans-serif";
    const [historyOpen, setHistoryOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [pendingBooking, setPendingBooking] = useState(null); // booking to pay

    useEffect(() => {
        if (historyOpen && currentUser) {
            const token = localStorage.getItem('auth_token');
            if (!token) return;
            setLoadingBookings(true);
            fetch('/api/v1/bookings', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.bookings) {
                    setBookings(data.bookings);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingBookings(false));
        }
    }, [historyOpen, currentUser]);

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
                    {/* Floating Wishlist Button */}
                    <div 
                        onClick={onWishlistToggle}
                        style={{
                            position: 'relative',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.15)' : '#e4f0ed',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.08)';
                            e.currentTarget.style.backgroundColor = (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.25)' : 'rgba(245, 64, 27, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.15)' : '#e4f0ed';
                        }}
                        title="Destinasi Impian"
                    >
                        <span 
                            className="material-symbols-outlined" 
                            style={{ 
                                color: (isTransparent && isHeroTheme) ? '#ffffff' : '#f5401b',
                                fontSize: '22px' 
                            }}
                        >
                            favorite
                        </span>
                        {wishlistCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                backgroundColor: '#f5401b',
                                color: '#ffffff',
                                fontSize: '9px',
                                fontWeight: 800,
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid ' + ((isTransparent && isHeroTheme) ? '#131e1b' : '#ffffff'),
                                boxShadow: '0 4px 10px rgba(245, 64, 27,0.3)',
                                transition: 'all 0.3s ease'
                            }}>
                                {wishlistCount}
                            </span>
                        )}
                    </div>

                    {/* Floating Booking History Button */}
                    {currentUser && (
                        <div style={{ position: 'relative' }}>
                            <div 
                                onClick={() => setHistoryOpen(!historyOpen)}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.15)' : '#e4f0ed',
                                    border: historyOpen ? '1.5px solid #f5401b' : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                    e.currentTarget.style.backgroundColor = (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.25)' : 'rgba(245, 64, 27, 0.1)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.backgroundColor = (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.15)' : '#e4f0ed';
                                }}
                                title="Riwayat Pemesanan"
                            >
                                <span 
                                    className="material-symbols-outlined" 
                                    style={{ 
                                        color: (isTransparent && isHeroTheme) ? '#ffffff' : '#0f1a17',
                                        fontSize: '22px' 
                                    }}
                                >
                                    history
                                </span>
                            </div>

                            {/* History Dropdown Card */}
                            {historyOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '52px',
                                    right: '0',
                                    width: '320px',
                                    maxHeight: '420px',
                                    overflowY: 'auto',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    border: '1.5px solid #e4f0ed',
                                    boxShadow: '0 16px 45px -10px rgba(15, 26, 23, 0.18)',
                                    zIndex: 9999,
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(15, 26, 23, 0.08)', paddingBottom: '8px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f1a17', fontFamily: font }}>Riwayat Pemesanan</span>
                                        <span 
                                            onClick={() => setHistoryOpen(false)}
                                            className="material-symbols-outlined" 
                                            style={{ fontSize: '18px', color: 'rgba(15, 26, 23, 0.4)', cursor: 'pointer' }}
                                        >
                                            close
                                        </span>
                                    </div>

                                    {loadingBookings ? (
                                        <div style={{ padding: '20px 0', textAlign: 'center', color: 'rgba(15, 26, 23, 0.5)', fontSize: '12px', fontFamily: font }}>
                                            Memuat data...
                                        </div>
                                    ) : bookings.length === 0 ? (
                                        <div style={{ padding: '30px 0', textAlign: 'center', color: 'rgba(15, 26, 23, 0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontFamily: font }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'rgba(15, 26, 23, 0.3)' }}>receipt_long</span>
                                            <span style={{ fontSize: '12px' }}>Belum ada riwayat transaksi.</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {bookings.map((booking, idx) => (
                                                <div 
                                                    key={idx}
                                                    style={{
                                                        padding: '10px 12px',
                                                        borderRadius: '10px',
                                                        backgroundColor: '#e4f0ed',
                                                        border: '1px solid rgba(15, 26, 23, 0.05)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '4px',
                                                        fontSize: '11px',
                                                        fontFamily: font
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontWeight: 800, color: '#0f1a17', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {booking.destination?.title || booking.destination_slug || 'Destinasi Wisata'}
                                                        </span>
                                                        <span style={{ 
                                                            fontWeight: 800, 
                                                            fontSize: '9px',
                                                            color: '#0f1a17',
                                                            backgroundColor: booking.payment_status === 'paid' ? '#23f7db' : 'rgba(245, 64, 27, 0.15)',
                                                            padding: '2px 6px',
                                                            borderRadius: '4px'
                                                        }}>
                                                            {booking.payment_status === 'paid' ? 'LUNAS' : 'PENDING'}
                                                        </span>
                                                    </div>
                                                    <div style={{ color: 'rgba(15, 26, 23, 0.6)', display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>Tanggal:</span>
                                                        <span style={{ fontWeight: 600 }}>{booking.visit_date}</span>
                                                    </div>
                                                    <div style={{ color: 'rgba(15, 26, 23, 0.6)', display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>Pengunjung:</span>
                                                        <span style={{ fontWeight: 600 }}>{booking.pax_count} Pax</span>
                                                    </div>
                                                    {booking.total_amount_web > 0 && (
                                                        <div style={{ color: '#f5401b', display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px dashed rgba(15,26,23,0.1)', paddingTop: '4px', marginTop: '2px' }}>
                                                            <span>Total Web:</span>
                                                            <span>Rp {parseInt(booking.total_amount_web).toLocaleString('id-ID')}</span>
                                                        </div>
                                                    )}
                                                    {booking.payment_status === 'pending' && booking.total_amount_web > 0 && (
                                                        <button
                                                            onClick={() => { setHistoryOpen(false); setPendingBooking(booking); }}
                                                            style={{
                                                                marginTop: '6px',
                                                                width: '100%',
                                                                padding: '8px',
                                                                borderRadius: '8px',
                                                                border: 'none',
                                                                background: 'linear-gradient(135deg, #f5401b, #e03010)',
                                                                color: '#ffffff',
                                                                fontSize: '11px',
                                                                fontWeight: 700,
                                                                cursor: 'pointer',
                                                                fontFamily: font,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '5px',
                                                                boxShadow: '0 2px 8px rgba(245, 64, 27,0.3)',
                                                            }}
                                                        >
                                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>credit_card</span>
                                                            Lunasi Sekarang
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pending Payment Modal */}
                    {pendingBooking && (
                        <PendingPaymentModal
                            booking={pendingBooking}
                            onClose={() => setPendingBooking(null)}
                            onPaymentSuccess={(bookingId) => {
                                setBookings(prev => prev.map(b =>
                                    b.id === bookingId ? { ...b, payment_status: 'paid' } : b
                                ));
                                setPendingBooking(null);
                            }}
                        />
                    )}

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
        poem: "Gagahnya pegunungan Toraja, berselimut kabut menembus cakrawala. Tanah para raja, tempat arwah bermukim di tebing-tebing batu sakral, menjaga warisan leluhur yang tak lekang oleh waktu.",
        hotspot: { top: '22%', left: '48%' },
    },
    {
        title: "Labirin Purba Rammang-Rammang",
        poem: "Menjaga rahasia masa purba di sela-sela hijau sawah dan sunyinya sungai Pute. Labirin batu karst tertua kedua di dunia, tegak berdiri merajut kesunyian alam Celebes.",
        hotspot: { top: '30%', left: '55%' },
    },
    {
        title: "Dendang Ombak & Phinisi",
        poem: "Ombak Bulukumba mencium pasir putih Bira, tempat para pelaut tangguh Bugis-Makassar memahat kapal Phinisi. Perahu legendaris pembelah samudra, simbol keberanian yang tak pernah padam.",
        hotspot: { top: '50%', left: '60%' },
    },
    {
        title: "Tebing Appalarang yang Kokoh",
        poem: "Tebing Appalarang berdiri kokoh menantang deburan ombak membiru. Saksi bisu keindahan pesisir yang tiada duanya, tempat karang dan laut bersatu dalam simfoni abadi.",
        hotspot: { top: '38%', left: '58%' },
    },
    {
        title: "Ketenangan Danau Tempe",
        poem: "Danau Tempe yang berkilau, saksi kehidupan di atas air terapung. Tempat harmoni nelayan berdendang bersama burung-burung migran di bawah lembayung senja yang tenang.",
        hotspot: { top: '45%', left: '52%' },
    }
];

function HomePage({ onNavigateRegister, onNavigateLogin, onNavigateDestinations, onNavigateAllDestinations, onNavigateExperiences, onNavigateCulture, onNavigateJournal, currentUser, onLogout, wishlistCount, onWishlistToggle }) {
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [viewportMouse, setViewportMouse] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isInside, setIsInside] = useState(false);

    // Story states
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isStoryHovered, setIsStoryHovered] = useState(false);
    const hotspotColor = isStoryHovered ? '#23F7DB' : '#FFFFFF';
    const [isHotspotHovered, setIsHotspotHovered] = useState(false);
    const videoRef = React.useRef(null);
    const activeStory = stories[activeStoryIndex];

    const syncStoryToVideo = (event) => {
        const { currentTime, duration } = event.currentTarget;
        if (!Number.isFinite(duration) || duration <= 0) return;

        const segmentDuration = duration / stories.length;
        const nextIndex = Math.min(Math.floor(currentTime / segmentDuration), stories.length - 1);
        setActiveStoryIndex((currentIndex) => {
            if (currentIndex !== nextIndex) {
                // Story berganti: tutup card detail agar tidak ghost ke story berikutnya
                setIsExpanded(false);
                setIsStoryHovered(false);
            }
            return nextIndex;
        });
    };

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

    const handleHotspotClick = (e) => {
        e.stopPropagation();
        if (!isExpanded) {
            setIsExpanded(true);
            setIsStoryHovered(true);
            videoRef.current?.pause();
        } else {
            setIsExpanded(false);
            videoRef.current?.play().catch(() => {});
        }
    };

    const handleCloseCard = (e) => {
        e.stopPropagation();
        setIsExpanded(false);
        videoRef.current?.play().catch(() => {});
    };

    const handleStoryLeave = () => {
        setIsHovering(false);
        setIsHotspotHovered(false);
        // isExpanded tetap terbuka meski mouse leave
        // user harus klik lagi untuk menutup detail
    };

    const font = "'Plus Jakarta Sans', sans-serif";

    return (
        <>
            <style>{`
                @keyframes modalSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
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
                @keyframes hotspotPulse {
                    0%, 100% {
                        box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3);
                    }
                    50% {
                        box-shadow: 0 0 0 8px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.4);
                    }
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
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedMetadata={syncStoryToVideo}
                        onTimeUpdate={syncStoryToVideo}
                        className="w-full h-full object-cover"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 12}px, 0) scale(1.08)`,
                            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                    >
                        <source src="/TanaOgi_Video.mp4" type="video/mp4" />
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

                    {/* ── HOTSPOT: lingkaran kecil → 3-fold connector → lingkaran besar ── */}
                    {/*
                        GEOMETRI (semua relatif ke titik kiri-atas container):
                        - Small dot:   top:0,   left:0,  size:14×14  → center = (7, 7)
                        - SVG anchor:  top:7px, left:7px (center small dot), overflow:visible
                          Line1 H: (0,0)→(48,0)    horizontal kanan
                          Line2 V: (48,0)→(48,-58)  vertikal naik
                          Line3 H: (48,-58)→(108,-58) horizontal kanan
                        - Large circle center: (7+108, 7-58) = (115, -51) dari container
                          size:52×52 → top-left: (115-26, -51-26) = (89, -77)
                        - Detail card: left dari large circle right edge → (89+52+12=153, -77)
                    */}
                    <div
                        style={{
                            position: 'absolute',
                            top: activeStory.hotspot.top,
                            left: activeStory.hotspot.left,
                            zIndex: 30,
                            transform: `translate(${parallax.x * -0.3}px, ${parallax.y * -0.3}px)`,
                            transition: 'left 0.6s ease, top 0.6s ease, transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                        onMouseEnter={() => { setIsHovering(true); setIsHotspotHovered(true); }}
                        onMouseLeave={() => { setIsHovering(false); setIsHotspotHovered(false); }}
                    >
                        {/* ── 1. Dot kecil (origin, 8×8px) ── */}
                        {/*
                            Geometri baru (sesuai gambar referensi):
                            Dot center: (4, 4) relatif container
                            SVG anchor: top:4px left:4px
                              L1 H: (0,0)→(55,0)       kanan 55px
                              L2 V: (55,0)→(55,-65)    naik 65px
                              L3 H: (55,-65)→(140,-65) kanan 85px
                            Large circle center: (4+140, 4-65)=(144,-61)
                            Large circle 36×36 → top-left: (144-18=126, -61-18=-79)
                            Card: left = 126+36+10 = 172, top = -79+18-card_mid ≈ -100
                        */}
                        <div
                            onClick={handleHotspotClick}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                border: `1.5px solid ${isExpanded ? '#23F7DB' : '#ffffff'}`,
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                zIndex: 4,
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: isExpanded
                                    ? '0 0 0 3px rgba(35, 247, 219,0.2), 0 0 10px rgba(35, 247, 219,0.5)'
                                    : '0 0 0 2px rgba(255,255,255,0.15)',
                                animation: !isExpanded ? 'hotspotPulse 2.8s ease-in-out infinite' : 'none',
                            }}
                        />

                        {/* ── 2. SVG 3-fold connector (tipis, sesuai gambar) ── */}
                        <svg
                            style={{
                                position: 'absolute',
                                top: '4px',
                                left: '4px',
                                overflow: 'visible',
                                pointerEvents: 'none',
                                zIndex: 2,
                            }}
                            width="0"
                            height="0"
                        >
                            {/* L1: horizontal kanan 0→55 di y=0 */}
                            <line x1="0" y1="0" x2="55" y2="0"
                                stroke={isExpanded ? '#23F7DB' : 'rgba(255,255,255,0.85)'}
                                strokeWidth="1.5"
                                strokeLinecap="square"
                                style={{ transition: 'stroke 0.3s' }}
                            />
                            {/* L2: vertikal naik 0→-65 di x=55 */}
                            <line x1="55" y1="0" x2="55" y2="-65"
                                stroke={isExpanded ? '#23F7DB' : 'rgba(255,255,255,0.85)'}
                                strokeWidth="1.5"
                                strokeLinecap="square"
                                style={{ transition: 'stroke 0.3s' }}
                            />
                            {/* L3: horizontal kanan 55→140 di y=-65 */}
                            <line x1="55" y1="-65" x2="140" y2="-65"
                                stroke={isExpanded ? '#23F7DB' : 'rgba(255,255,255,0.85)'}
                                strokeWidth="1.5"
                                strokeLinecap="square"
                                style={{ transition: 'stroke 0.3s' }}
                            />
                        </svg>

                        {/* ── 3. Lingkaran besar (36×36, kosong — hanya visual) ── */}
                        {/* center=(144,-61) → top-left=(126,-79) */}
                        <div
                            onClick={handleHotspotClick}
                            style={{
                                position: 'absolute',
                                top: '-79px',
                                left: '126px',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: `2px solid ${isExpanded ? '#23F7DB' : '#ffffff'}`,
                                backgroundColor: 'rgba(255,255,255,0.06)',
                                cursor: 'pointer',
                                transition: 'border-color 0.3s, box-shadow 0.3s, background-color 0.3s',
                                boxShadow: isExpanded
                                    ? '0 0 0 4px rgba(35, 247, 219,0.15), 0 0 16px rgba(35, 247, 219,0.3)'
                                    : '0 0 0 3px rgba(255,255,255,0.1)',
                                zIndex: 4,
                            }}
                        />

                        {/* ── 4. Preview card — muncul saat hover (sebelum klik) ── */}
                        {isHotspotHovered && !isExpanded && (
                            <div
                                onClick={handleHotspotClick}
                                style={{
                                    position: 'absolute',
                                    top: '-100px',
                                    left: '172px',
                                    width: '256px',
                                    backgroundColor: 'rgba(5, 10, 8, 0.78)',
                                    backdropFilter: 'blur(14px)',
                                    WebkitBackdropFilter: 'blur(14px)',
                                    borderRadius: '14px',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    padding: '14px 16px',
                                    boxSizing: 'border-box',
                                    boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                                    animation: 'modalSlideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                                    zIndex: 5,
                                    cursor: 'pointer',
                                }}
                            >
                                {/* Badge header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <span style={{
                                        display: 'block',
                                        width: '5px',
                                        height: '5px',
                                        borderRadius: '50%',
                                        backgroundColor: '#23F7DB',
                                        flexShrink: 0,
                                    }} />
                                    <span style={{
                                        fontFamily: font,
                                        fontSize: '9px',
                                        fontWeight: 700,
                                        letterSpacing: '0.14em',
                                        color: '#23F7DB',
                                        textTransform: 'uppercase',
                                    }}>
                                        Senandung Celebes
                                    </span>
                                </div>
                                {/* Judul */}
                                <h3 style={{
                                    fontFamily: font,
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    lineHeight: 1.3,
                                    margin: '0 0 8px 0',
                                }}>
                                    {activeStory.title}
                                </h3>
                                {/* Hint klik */}
                                <p style={{
                                    fontFamily: font,
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.5)',
                                    lineHeight: 1.5,
                                    margin: 0,
                                    fontStyle: 'italic',
                                }}>
                                    Klik untuk meraba kisah alam...
                                </p>
                            </div>
                        )}

                        {/* ── 5. Detail card — muncul setelah klik (full poem) ── */}
                        {isExpanded && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-100px',
                                    left: '172px',
                                    width: '256px',
                                    backgroundColor: 'rgba(5, 10, 8, 0.78)',
                                    backdropFilter: 'blur(14px)',
                                    WebkitBackdropFilter: 'blur(14px)',
                                    borderRadius: '14px',
                                    border: '1px solid rgba(35, 247, 219,0.22)',
                                    padding: '14px 16px',
                                    boxSizing: 'border-box',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
                                    animation: 'modalSlideUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                                    zIndex: 5,
                                }}
                            >
                                {/* Badge header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <span style={{
                                        display: 'block',
                                        width: '5px',
                                        height: '5px',
                                        borderRadius: '50%',
                                        backgroundColor: '#23F7DB',
                                        flexShrink: 0,
                                    }} />
                                    <span style={{
                                        fontFamily: font,
                                        fontSize: '9px',
                                        fontWeight: 700,
                                        letterSpacing: '0.14em',
                                        color: '#23F7DB',
                                        textTransform: 'uppercase',
                                    }}>
                                        Senandung Celebes
                                    </span>
                                </div>
                                {/* Judul */}
                                <h3 style={{
                                    fontFamily: font,
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    lineHeight: 1.3,
                                    margin: '0 0 8px 0',
                                }}>
                                    {activeStory.title}
                                </h3>
                                {/* Puisi */}
                                <p style={{
                                    fontFamily: font,
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.82)',
                                    lineHeight: 1.65,
                                    fontStyle: 'italic',
                                    margin: 0,
                                }}>
                                    "{activeStory.poem}"
                                </p>
                                {/* Tombol tutup */}
                                <button
                                    onClick={handleCloseCard}
                                    style={{
                                        marginTop: '12px',
                                        color: '#23F7DB',
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        fontFamily: font,
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        opacity: 0.8,
                                        display: 'block',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                                >
                                    ✕ Tutup Kisah
                                </button>
                            </div>
                        )}
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
const navigablePages = new Set([
    'home', 'register', 'login', 'admin-login', 'admin-dashboard',
    'destinations', 'all-destinations', 'experiences', 'culture', 'journal',
    'destination-detail', 'drivers', 'travel-guide', 'sustainability', 'about',
    'press-kit', 'privacy', 'terms',
]);

const pageFromLocation = () => {
    const page = window.location.hash.slice(1);

    return navigablePages.has(page) ? page : 'home';
};

const urlForPage = (page) => page === 'home'
    ? `${window.location.pathname}${window.location.search}`
    : `${window.location.pathname}${window.location.search}#${page}`;

function App() {
    const [currentPage, setCurrentPage] = useState(pageFromLocation);
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

    useEffect(() => {
        if (!window.history.state?.page) {
            window.history.replaceState({ page: currentPage, destination: null }, '', urlForPage(currentPage));
        }

        const handlePopState = (event) => {
            const state = event.state;
            const page = navigablePages.has(state?.page) ? state.page : pageFromLocation();

            setSelectedDestination(state?.destination ?? null);
            setCurrentPage(page);
            setShowLoader(false);
            window.scrollTo(0, 0);
        };

        window.addEventListener('popstate', handlePopState);

        return () => window.removeEventListener('popstate', handlePopState);
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
        const protectedPages = ['destination-detail'];

        if (protectedPages.includes(page) && !currentUser) {
            // Save destination data if navigating to detail, so we can return to it
            setRedirectAfterLogin({ page, destData });

            // Redirect to login page instead
            page = 'login';
            destData = null;
        }

        window.history.pushState(
            { page, destination: destData },
            '',
            urlForPage(page),
        );

        const pagesWithLoader = ['home', 'experiences', 'culture', 'journal', 'destinations', 'all-destinations', 'destination-detail', 'login', 'register', 'travel-guide', 'sustainability', 'about', 'press-kit', 'privacy', 'terms'];

        if (pagesWithLoader.includes(page)) {
            setShowLoader(true);
            setTimeout(() => {
                setSelectedDestination(destData);
                setCurrentPage(page);
                window.scrollTo(0, 0);
            }, 400);

            setTimeout(() => {
                setShowLoader(false);
            }, 1500);
        } else {
            setTransitioning(true);
            setTimeout(() => {
                setSelectedDestination(destData);
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
                        onNavigateAdmin={() => navigateTo('admin-login')}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}
                {currentPage === 'admin-login' && (
                    <AdminLoginPage 
                    onNavigateBack={() => navigateTo('login')}
                    onLoginSuccess={() => navigateTo('admin-dashboard')} />
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
                        {...supportNavProps}
                        destination={selectedDestination || {}}
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
                        onLogout={() => navigateTo('login')} 
                    />
                )}
                {!['home', 'register', 'login', 'admin-login', 'destinations', 'all-destinations', 'experiences', 'culture', 'journal', 'destination-detail', 'travel-guide', 'sustainability', 'about', 'press-kit', 'privacy', 'terms', 'admin-dashboard'].includes(currentPage) && (
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

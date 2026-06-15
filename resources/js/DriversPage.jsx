import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DriversPage({
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateJournal,
    currentUser,
    onLogout
}) {
    const [scrolled, setScrolled] = useState(false);
    const optionsRef = useRef(null);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for cinematic reveals
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal-anim');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const handleScrollToOptions = (e) => {
        e.preventDefault();
        optionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const navItems = ['Destinations', 'Experiences', 'Culture', 'Journal'];

    const handleNavClick = (item) => {
        if (item === 'Destinations' && onNavigateDestinations) onNavigateDestinations();
        else if (item === 'Experiences' && onNavigateExperiences) onNavigateExperiences();
        else if (item === 'Culture' && onNavigateCulture) onNavigateCulture();
        else if (item === 'Journal' && onNavigateJournal) onNavigateJournal();
    };

    return (
        <div style={{ backgroundColor: '#f0fcf7', color: '#131e1b', fontFamily: font, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <Navbar
                activePage="drivers"
                onNavigateHome={onNavigateHome}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            <main style={{ paddingTop: 0 }}>
                {/* Hero Section */}
                <section style={{ position: 'relative', height: '870px', width: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <img
                            alt="Professional driver services in South Sulawesi"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvp5lMl-q4IXs0pnOOBlpkjduNchZzG2Av7AB6gDieWsbams_cvoNXZibI263lFmsGUcR09Wsn__w-5i1zS3MvLGcLV2Gqodne_hd2aKsYBqEKgyFoS2a7FsB-2OWDromtIF1mpJJq8g3DZ_wd58OHIlczXEl8AYZNTwvzM_f-8riD5S-OlgXal7qEVh_2k5T5NmlKvJHF9YDeF33dXSp3cbmx-yQUIhyyPrbzxSHsJMbsyrrm-gKqx1WBXh9KzjiHgCG6cKiNi3k"
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(240,252,247,0.92) 0%, rgba(240,252,247,0.5) 50%, transparent 100%)' }}></div>
                    </div>

                    <div style={{ position: 'relative', zIndex: 10, padding: '0 64px', maxWidth: '800px' }}>
                        <span style={{
                            fontFamily: font,
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: '#b32000',
                            display: 'block',
                            marginBottom: '20px'
                        }}>
                            Layanan Pengemudi Premium
                        </span>
                        <h1 style={{
                            fontFamily: font,
                            fontSize: '64px',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            color: '#131e1b',
                            marginBottom: '20px',
                            margin: '0 0 20px 0'
                        }}>
                            Perjalanan<br />
                            <span style={{ color: '#b32000' }}>Tanpa</span> Batas
                        </h1>
                        <p style={{
                            fontFamily: font,
                            fontSize: '18px',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: '#5c4039',
                            maxWidth: '480px',
                            marginBottom: '36px'
                        }}>
                            Jelajahi keajaiban Sulawesi Selatan dengan kenyamanan penuh bersama pengemudi lokal kami yang berpengalaman.
                        </p>
                        <a
                            onClick={handleScrollToOptions}
                            href="#options"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#b32000',
                                color: '#ffffff',
                                padding: '16px 36px',
                                borderRadius: '9999px',
                                fontFamily: font,
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px -5px rgba(179, 32, 0, 0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#8d1700';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#b32000';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Mulai Eksplorasi
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_downward</span>
                        </a>
                    </div>
                </section>

                {/* Trust Section */}
                <section style={{ padding: '72px 64px', backgroundColor: '#e4f1eb' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
                        {[
                            {
                                icon: 'verified_user',
                                title: 'Pengemudi Bersertifikat',
                                desc: 'Standar keamanan tertinggi dengan pelatihan profesional berkelanjutan.'
                            },
                            {
                                icon: 'directions_car',
                                title: 'Kendaraan Premium',
                                desc: 'Armada terawat, bersih, dan dilengkapi fasilitas kenyamanan modern.'
                            },
                            {
                                icon: 'location_city',
                                title: 'Wawasan Lokal',
                                desc: 'Lebih dari sekadar supir, mereka adalah pemandu yang memahami setiap sudut Sulawesi.'
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="reveal-anim"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    borderLeft: '3px solid rgba(179,32,0,0.25)',
                                    paddingLeft: '24px',
                                    transitionDelay: `${i * 100}ms`
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#b32000', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                                <h3 style={{ fontFamily: font, fontSize: '22px', fontWeight: 700, color: '#131e1b', margin: 0 }}>{item.title}</h3>
                                <p style={{ fontFamily: font, fontSize: '16px', color: '#5c4039', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Booking Options */}
                <section ref={optionsRef} id="options" style={{ padding: '80px 64px', backgroundColor: '#f0fcf7' }}>
                    <div className="reveal-anim" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px auto' }}>
                        <h2 style={{ fontFamily: font, fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em', color: '#131e1b', marginBottom: '16px' }}>
                            Pilih Layanan Anda
                        </h2>
                        <div style={{ width: '56px', height: '4px', background: 'linear-gradient(90deg, #F5401B, #23F7DB)', borderRadius: '9999px', margin: '0 auto 16px auto' }}></div>
                        <p style={{ fontFamily: font, fontSize: '17px', color: '#5c4039', lineHeight: 1.6, margin: 0 }}>
                            Setiap perjalanan dirancang untuk memenuhi standar eksklusivitas dan ketepatan waktu Anda.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

                        {/* Option 1: Point Transfer */}
                        <div
                            className="reveal-anim"
                            style={{
                                gridColumn: 'span 4',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '20px',
                                height: '500px',
                                cursor: 'pointer',
                                boxShadow: '0 20px 40px -10px rgba(0,64,50,0.1)',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(179,32,0,0.2)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,64,50,0.1)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                                <img
                                    alt="Antar-Jemput Saja"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1qLZudpnlUEGp8GjMOBsyzQt2d_a3WI1N9l11-D_xmyaU5S2ailanQ3koQOVt3YScYRscqtCxcezs6Hin88Amw6wPW5kw-56qwBOKauLcwgmtDx9_3WOOPtEQI3jWN9OY7r5EGUzGaURGkXb2YlG1a2ik4P12VRtTB3q05VGldM0Q7MiBCmg9ElquVmmbKkKW9iCorwUq97XuhM4AyVIt2xBR_g11djHOV1gNLLnAi4_pV1gnuXQT-jKdfa6nCHy1PKDoeeRhtr0"
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px', zIndex: 10 }}>
                                <span style={{
                                    display: 'inline-block',
                                    backgroundColor: '#23F7DB',
                                    color: '#00201b',
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    marginBottom: '10px'
                                }}>
                                    POINT TO POINT
                                </span>
                                <h3 style={{ fontFamily: font, fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: '0 0 10px 0', lineHeight: 1.2 }}>
                                    Antar-Jemput Saja
                                </h3>
                                <p style={{ fontFamily: font, fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '16px' }}>
                                    Transfer bandara atau perjalanan satu arah antar kota dengan kenyamanan VIP.
                                </p>
                                <button
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#b32000',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '9999px',
                                        padding: '12px 0',
                                        fontFamily: font,
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'background-color 0.3s'
                                    }}
                                    onClick={() => window.open('https://wa.me/628123456789?text=Halo%20Tana%20Ogi,%20saya%20ingin%20memesan%20Driver%20untuk%20paket%20Antar-Jemput%20Saja', '_blank')}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8d1700'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b32000'}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>chat</span>
                                    Pesan via WhatsApp
                                </button>
                            </div>
                        </div>

                        {/* Option 2: Full Day (Main Feature) */}
                        <div
                            className="reveal-anim"
                            style={{
                                gridColumn: 'span 8',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '20px',
                                height: '500px',
                                cursor: 'pointer',
                                boxShadow: '0 20px 40px -10px rgba(0,64,50,0.1)',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                transitionDelay: '100ms'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(179,32,0,0.2)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.07)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,64,50,0.1)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                                <img
                                    alt="Full Day Exploration"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxIm7cgqd2j5u7LYDwtHcA2o3mpNDrOJrDaTl2sAiyhjPipY4X6HKB35iAMg5dgeOxGHjRsLyxbwhZ2C6WfsLic3HckwNTcDlr53bYXR6bMhrjfLmBrEo9Ajh2M5ps0Wq5BGVvtYFY7kBwxZu3o0XWGszbECiR5u7i2aBAdeNqh7VzaKOlaLEC7APXwGIblnpNrNT3Xi-H_QvasO8eicqV-W1wuEOG-rU8_eKnIjtuw8CJvQO61uNRgD-MnGdXnnR_VN7KXokK45w"
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}></div>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px', zIndex: 10, maxWidth: '600px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(90deg, #F5401B, #23F7DB)',
                                    color: '#ffffff',
                                    padding: '5px 14px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px'
                                }}>
                                    ⭐ POPULAR CHOICE
                                </span>
                                <h3 style={{ fontFamily: font, fontSize: '40px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                                    Full Day (12 Jam)
                                </h3>
                                <p style={{ fontFamily: font, fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '20px' }}>
                                    Eksplorasi satu hari penuh di dalam kabupaten/kota pilihan Anda. Fleksibilitas total untuk rencana perjalanan pribadi Anda.
                                </p>
                                <button
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#b32000',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '9999px',
                                        padding: '14px 32px',
                                        fontFamily: font,
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 24px rgba(179,32,0,0.35)',
                                        transition: 'background-color 0.3s'
                                    }}
                                    onClick={() => window.open('https://wa.me/628123456789?text=Halo%20Tana%20Ogi,%20saya%20ingin%20memesan%20Driver%20untuk%20paket%20Full%20Day%2012%20Jam', '_blank')}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8d1700'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b32000'}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>chat</span>
                                    Pesan via WhatsApp
                                </button>
                            </div>
                        </div>

                        {/* Option 3: Multi-Day */}
                        <div
                            className="reveal-anim"
                            style={{
                                gridColumn: 'span 12',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '20px',
                                height: '420px',
                                cursor: 'pointer',
                                boxShadow: '0 20px 40px -10px rgba(0,64,50,0.1)',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                transitionDelay: '200ms'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(179,32,0,0.2)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,64,50,0.1)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                                <img
                                    alt="Multi-Day Road Trips"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVyTs1xWoamGyB-zYsEG3idZ_e7apOdOyBqMvbRh7TdOCFse2_QIp16yyKsnbyaZxXVkicE9lFl0FirRBib9aqG82tOorMHCUp_bH9EsyxKtvOJw__dHyz4fifKPRFiE2MIb01CKzY5bVl4HBYgZFHZcxWKGmnCxQ17eGB66XdrGCejnOhDY1LEJzECO2Ez9eMwSItkjcai85QwvSktmIu-d-RZb-VghCS5qeE2RYt9KO68UeAooH6okHsQJmdNhPO7bB4ItDxkR0"
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}></div>
                            </div>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px 48px', zIndex: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
                                    <div style={{ maxWidth: '640px' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            backgroundColor: '#23F7DB',
                                            color: '#00201b',
                                            padding: '4px 12px',
                                            borderRadius: '9999px',
                                            fontFamily: font,
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            marginBottom: '12px'
                                        }}>
                                            EPIC JOURNEY
                                        </span>
                                        <h3 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, color: '#ffffff', margin: '0 0 10px 0', lineHeight: 1.2 }}>
                                            Multi-Day Exploration
                                        </h3>
                                        <p style={{ fontFamily: font, fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
                                            Paket perjalanan jarak jauh dan menginap. Sempurna untuk ekspedisi lintas provinsi atau road-trip budaya yang mendalam.
                                        </p>
                                    </div>
                                    <button
                                        style={{
                                            flexShrink: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            backgroundColor: '#b32000',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '9999px',
                                            padding: '16px 36px',
                                            fontFamily: font,
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            boxShadow: '0 8px 24px rgba(179,32,0,0.35)',
                                            transition: 'background-color 0.3s'
                                        }}
                                        onClick={() => window.open('https://wa.me/628123456789?text=Halo%20Tana%20Ogi,%20saya%20ingin%20memesan%20Driver%20untuk%20paket%20Multi-Day%20Exploration', '_blank')}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8d1700'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b32000'}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>chat</span>
                                        Hubungi Kami
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Info Note */}
                <section style={{ padding: '32px 64px 64px 64px', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '16px',
                        padding: '20px 28px',
                        maxWidth: '680px',
                        textAlign: 'left',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#006b5e', flexShrink: 0 }}>info</span>
                        <p style={{ fontFamily: font, fontSize: '15px', color: '#5c4039', lineHeight: 1.6, margin: 0 }}>
                            Setiap klik tombol di atas akan membuka percakapan WhatsApp dengan pesan yang sudah terisi otomatis untuk memudahkan Anda melakukan pemesanan.
                        </p>
                    </div>
                </section>
            </main>

            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
            />

        </div>
    );
}

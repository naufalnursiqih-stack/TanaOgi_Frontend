import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';

export default function JournalPage({
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateDestinations,
    onNavigateAllDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateTravelGuide,
    onNavigateSustainability,
    onNavigateAbout,
    onNavigatePressKit,
    onNavigatePrivacyPolicy,
    onNavigateTerms,
    currentUser,
    onLogout,
}) {
    const [scrolled, setScrolled] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkStyle = (active = false) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: active ? 700 : 500,
        color: active ? '#b32000' : 'rgba(19,30,27,0.7)',
        textDecoration: 'none',
        borderBottom: active ? '2px solid #b32000' : 'none',
        paddingBottom: active ? '4px' : '0',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    });

    const articles = [
        {
            id: 1,
            category: 'WARISAN & BUDAYA',
            title: 'Jiwa dalam Biji Kopi: Menemukan Warisan Kopi Toraja',
            desc: 'Di balik cangkir kopi terbaik dunia, tersimpan ratusan tahun tradisi yang hidup di lereng tinggi pegunungan Toraja.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABynOH4E87kaDmgVulSOiHu84Ko1jrkG5rCCW-AHHVftDwatTNzG4zNQ8nuxRy3FXSK1IX5nU38JJxSTFD8K05qK5jIICHaR5tH-94qatIfckIB-oXW9-qfRWrPnImUURs3YeW7c0aTE9EwmaPH-662ipZ0TazDHyluLEMfdp9jzA-XGOuaPMBeba_zAxkgssvTrA7RfLuc_x5lO-R1DK9TEIDJy5HVHt4VaywW_EbdVzDOUP2PVTpgveLA6HRPdg9wMLIV1IwwVY',
            offset: false,
        },
        {
            id: 2,
            category: 'ARSITEKTUR',
            title: 'Tertulis dalam Kayu: Membaca Geometri Rumah Tongkonan',
            desc: 'Setiap garis, warna, dan ukiran menyimpan kisah tentang leluhur dan alam semesta di jantung Tana Toraja.',
            image: 'foto-ornamen-ukiran-tongkonan.webp',
            offset: true,
        },
        {
            id: 3,
            category: 'JIWA MARITIM',
            title: 'Pelaut Terakhir Nusantara: Kisah di Atas Kapal Phinisi',
            desc: 'Sepekan bersama para pembuat kapal legendaris di Bira, di mana samudra adalah rumah sekaligus guru.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKtEqM_g13pOb7icU8XDn1IQ8PHQ4s0HgoSk4wyAklSR4m_TsF6WJV2xs2ygz449nT6iMy97pgW2iEyZi0XZ2Dy1dds6zHmNBcbZbmNBoyS0d9a3PaYxaREYky9JKls0HGVBhSlNb3tHS7fQpqS4tcZBzsicpoZ97Ve7OhYbtyqLq5kI2HGPIrNS630OrTfJ7LUr9fWe-4-E1si64hX1zst5qqUmkm4c_QRUeOpdyTp7Qy-7jfDPQZjCaTgexqpkgLowzxkN-CriY',
            offset: false,
        },
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setTimeout(() => {
            setSubscribed(false);
            setEmail('');
        }, 3000);
    };

    return (
        <div style={{ fontFamily: font, backgroundColor: '#f0fcf7', color: '#131e1b', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar
                activePage="journal"
                onNavigateHome={onNavigateHome}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={() => { }}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            <main>

                {/* â”€â”€ Hero Section â”€â”€ */}
                <section style={{ position: 'relative', height: '80vh', width: '100%', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <img
                            alt="Landscape Sulawesi - Kabut Pagi di Atas Lembah Karst Maros"
                            src="/sulawesi.jpg"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 50%, rgba(19,30,27,0.8) 100%)',
                        }} />
                    </div>

                    <div style={{
                        position: 'relative', zIndex: 10,
                        height: '100%', display: 'flex', flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '0 64px 80px',
                        maxWidth: '1440px', margin: '0 auto',
                    }}>
                        <div style={{ maxWidth: '720px' }}>
                            <span 
                                className="hover-aesthetic"
                                style={{
                                    fontFamily: font, fontSize: '12px', fontWeight: 700,
                                    letterSpacing: '0.20em', textTransform: 'uppercase',
                                    color: '#00dfc5', display: 'block', marginBottom: '8px',
                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.5s ease, color 0.5s ease',
                                }}
                            >EDITORIAL FEATURE</span>
                            <h1 
                                className="hover-aesthetic"
                                style={{
                                    fontFamily: font, fontSize: 'clamp(40px, 6vw, 64px)',
                                    fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em',
                                    color: '#ffffff', marginBottom: '24px',
                                    textShadow: '0 4px 24px rgba(0,0,0,0.4)',
                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.5s ease, color 0.5s ease',
                                }}
                            >
                                Jurnal: Kisah-Kisah dari Tanah Leluhur
                            </h1>
                            <p 
                                className="hover-aesthetic"
                                style={{
                                    fontFamily: font, fontSize: '18px', lineHeight: 1.6,
                                    color: 'rgba(255,255,255,0.9)', maxWidth: '560px',
                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.5s ease, color 0.5s ease',
                                }}
                            >
                                Selami jiwa Sulawesi dari katedral karst Maros hingga ukiran sakral Toraja yang menyimpan ribuan tahun sejarah.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Featured Article ── */}
                <ScrollReveal>
                <section style={{ padding: '80px 64px', maxWidth: '1440px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '24px',
                        alignItems: 'center',
                    }}>
                        {/* Image */}
                        <div style={{ gridColumn: 'span 7', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
                            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                                <img
                                    alt="Formasi Karst Maros-Pangkep saat Golden Hour"
                                    src="hutankarsmaros.jpg"
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'cover',
                                        transition: 'transform 0.7s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div style={{
                                    position: 'absolute', top: '24px', left: '24px',
                                }}>
                                    <span style={{
                                        backgroundColor: '#b32000', color: '#ffffff',
                                        padding: '6px 16px', borderRadius: '9999px',
                                        fontFamily: font, fontSize: '10px', fontWeight: 700,
                                        letterSpacing: '0.20em', textTransform: 'uppercase',
                                    }}>KISAH TERBARU</span>
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ width: '48px', height: '4px', backgroundColor: '#006b5e', marginBottom: '24px' }} />
                            <h2 style={{
                                fontFamily: font, fontSize: '32px', fontWeight: 700,
                                lineHeight: 1.2, letterSpacing: '-0.02em',
                                color: '#131e1b', marginBottom: '24px',
                            }}>
                                Kabut Pagi & Batu Purba: Perjalanan Menembus Lembah Karst
                            </h2>
                            <p style={{
                                fontFamily: font, fontSize: '16px', lineHeight: 1.6,
                                color: '#5c4039', marginBottom: '48px',
                            }}>
                                Temukan para penjaga bisu Maros-Pangkep. Penjelajah utama kami membawa Anda menembus bilik-bilik tersembunyi lanskap karst terluas kedua di dunia, di mana seni prasejarah bertemu dengan keajaiban geologi.
                            </p>
                            <a
                                href="#"
                                onClick={e => e.preventDefault()}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '12px',
                                    fontFamily: font, fontWeight: 700, fontSize: '14px',
                                    letterSpacing: '0.10em', textTransform: 'uppercase',
                                    color: '#b32000', textDecoration: 'none',
                                    transition: 'gap 0.3s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.gap = '20px'}
                                onMouseLeave={e => e.currentTarget.style.gap = '12px'}
                            >
                                BACA SELENGKAPNYA
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>
                </ScrollReveal>

                {/* ── Cultural Chronicles Grid ── */}
                <ScrollReveal>
                <section style={{ padding: '80px 64px', backgroundColor: '#eaf6f1' }}>
                    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
                        {/* Section header */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-end', marginBottom: '80px',
                        }}>
                            <div>
                                <h3 style={{
                                    fontFamily: font, fontSize: '32px', fontWeight: 700,
                                    letterSpacing: '-0.02em', color: '#131e1b', marginBottom: '4px',
                                }}>Kronik Budaya</h3>
                                <p style={{ fontFamily: font, fontSize: '16px', color: '#5c4039' }}>
                                    Menjelajahi permadani warisan Sulawesi Selatan yang kaya dan penuh makna.
                                </p>
                            </div>
                            <div className="hidden md:flex" style={{ gap: '12px' }}>
                                {['chevron_left', 'chevron_right'].map(icon => (
                                    <button
                                        key={icon}
                                        style={{
                                            padding: '8px', borderRadius: '50%',
                                            border: '1px solid #916f68', backgroundColor: 'transparent',
                                            cursor: 'pointer', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            transition: 'background-color 0.3s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d9e5e0'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cards grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '24px',
                            alignItems: 'start',
                        }}>
                            {articles.map((article, i) => (
                                <article
                                    key={article.id}
                                    style={{
                                        backgroundColor: '#f0fcf7',
                                        padding: '12px',
                                        borderRadius: '16px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s ease',
                                        marginTop: i === 1 ? '32px' : '0',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '12px', marginBottom: '24px' }}>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            style={{
                                                width: '100%', height: '100%', objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                    </div>
                                    <div style={{ padding: '0 12px 24px' }}>
                                        <span style={{
                                            fontFamily: font, fontSize: '12px', fontWeight: 700,
                                            letterSpacing: '0.20em', textTransform: 'uppercase',
                                            color: '#006b5e', display: 'block', marginBottom: '12px',
                                        }}>{article.category}</span>
                                        <h4
                                            style={{
                                                fontFamily: font, fontSize: '24px', fontWeight: 700,
                                                lineHeight: 1.25, color: '#131e1b', marginBottom: '16px',
                                                transition: 'color 0.3s ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#b32000'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#131e1b'}
                                        >{article.title}</h4>
                                        <p style={{
                                            fontFamily: font, fontSize: '16px', lineHeight: 1.6,
                                            color: '#5c4039',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}>{article.desc}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                </ScrollReveal>

                {/* ── Newsletter / Join the Journal Section ── */}
                <ScrollReveal>
                <section style={{ padding: '80px 64px', maxWidth: '1440px', margin: '0 auto' }}>
                    <div style={{
                        position: 'relative',
                        borderRadius: '32px',
                        padding: '60px 80px',
                        overflow: 'hidden',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr',
                        alignItems: 'center',
                        gap: '64px',
                        backgroundColor: '#150d0c', // Deep luxurious dark-teak charcoal
                        border: '1px solid rgba(230, 189, 181, 0.08)',
                        boxShadow: '0 35px 70px -15px rgba(21, 13, 12, 0.5)',
                    }}>
                        {/* Glowing backdrop auroras */}
                        <div style={{
                            position: 'absolute', top: '-100px', left: '-100px',
                            width: '450px', height: '450px',
                            background: 'radial-gradient(circle, rgba(179,32,0,0.18) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-150px', right: '-100px',
                            width: '450px', height: '450px',
                            background: 'radial-gradient(circle, rgba(230,189,181,0.12) 0%, transparent 75%)',
                            pointerEvents: 'none',
                        }} />

                        {/* Background Ornament 1: Phinisi Ship (Bottom Left) */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: '10px',
                            width: '240px',
                            height: '240px',
                            color: 'rgba(230, 189, 181, 0.04)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}>
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}>
                                <path d="M10 70 C 30 73, 70 73, 90 70 L 85 78 L 15 78 Z" />
                                <line x1="35" y1="70" x2="35" y2="25" />
                                <line x1="65" y1="70" x2="65" y2="20" />
                                <path d="M35 28 L 15 50 L 35 55 Z" />
                                <path d="M35 32 L 20 60 L 35 62 Z" />
                                <path d="M65 23 L 45 45 L 65 50 Z" />
                                <path d="M65 27 L 50 55 L 65 57 Z" />
                                <path d="M65 20 L 85 45 L 65 48 Z" />
                            </svg>
                        </div>

                        {/* Background Ornament 2: Toraja Sun Carving - Pa'barre Allo (Top Right/Center) */}
                        <div style={{
                            position: 'absolute',
                            top: '-40px',
                            right: '30%',
                            width: '180px',
                            height: '180px',
                            color: 'rgba(230, 189, 181, 0.04)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}>
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}>
                                <circle cx="50" cy="50" r="40" />
                                <circle cx="50" cy="50" r="30" />
                                <circle cx="50" cy="50" r="10" />
                                <line x1="50" y1="10" x2="50" y2="20" />
                                <line x1="50" y1="80" x2="50" y2="90" />
                                <line x1="10" y1="50" x2="20" y2="50" />
                                <line x1="80" y1="50" x2="90" y2="50" />
                                <line x1="22" y1="22" x2="29" y2="29" />
                                <line x1="71" y1="71" x2="78" y2="78" />
                                <line x1="71" y1="29" x2="78" y2="22" />
                                <line x1="22" y1="78" x2="29" y2="71" />
                                <circle cx="50" cy="50" r="4" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Left Content */}
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#e6bdb5' }}>explore</span>
                                <span style={{
                                    fontFamily: font, fontSize: '11px', fontWeight: 700,
                                    letterSpacing: '.25em', textTransform: 'uppercase', color: '#e6bdb5',
                                }}>Eksplorasi Budaya & Sejarah</span>
                            </div>

                            <h2 style={{
                                fontFamily: font, fontSize: 'clamp(28px, 4vw, 36px)',
                                fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em',
                                color: '#ffffff', marginBottom: '16px',
                            }}>Bergabunglah dalam Perjalanan</h2>
                            
                            <p style={{
                                fontFamily: font, fontSize: '15px', lineHeight: 1.6,
                                color: 'rgba(240, 252, 247, 0.75)', margin: 0,
                            }}>
                                Berlangganan untuk mendapatkan cerita budaya bulanan, panduan destinasi tersembunyi di Nusantara, dan perspektif perjalanan eksklusif dari jantung Sulawesi.
                            </p>
                        </div>

                        {/* Right Form */}
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-symbols-outlined" style={{
                                        position: 'absolute', left: '16px', color: 'rgba(230, 189, 181, 0.4)', fontSize: '20px'
                                    }}>alternate_email</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Alamat email Anda..."
                                        required
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(230, 189, 181, 0.15)',
                                            borderRadius: '16px',
                                            color: '#ffffff',
                                            padding: '18px 16px 18px 48px',
                                            fontFamily: font,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            boxSizing: 'border-box',
                                        }}
                                        onFocus={e => {
                                            e.currentTarget.style.borderColor = '#e6bdb5';
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                            e.currentTarget.style.boxShadow = '0 0 15px rgba(230, 189, 181, 0.15)';
                                        }}
                                        onBlur={e => {
                                            e.currentTarget.style.borderColor = 'rgba(230, 189, 181, 0.15)';
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: subscribed ? '#006b5e' : '#b32000',
                                        color: '#ffffff',
                                        padding: '18px',
                                        borderRadius: '16px',
                                        fontFamily: font,
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: subscribed ? 'none' : '0 10px 24px -5px rgba(179,32,0,0.35)',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                    }}
                                    onMouseEnter={e => {
                                        if (!subscribed) {
                                            e.currentTarget.style.backgroundColor = '#d82806';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(179,32,0,0.45)';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!subscribed) {
                                            e.currentTarget.style.backgroundColor = '#b32000';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 10px 24px -5px rgba(179,32,0,0.35)';
                                        }
                                    }}
                                >
                                    {subscribed ? (
                                        <>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                                            Berhasil Berlangganan
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                                            Langganan Jurnal
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                </ScrollReveal>
            </main>

            {/* ── Footer ── */}
            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={() => { }}
                onNavigateTravelGuide={onNavigateTravelGuide}
                onNavigateSustainability={onNavigateSustainability}
                onNavigateAbout={onNavigateAbout}
                onNavigatePressKit={onNavigatePressKit}
                onNavigatePrivacyPolicy={onNavigatePrivacyPolicy}
                onNavigateTerms={onNavigateTerms}
            />
        </div>
    );
}

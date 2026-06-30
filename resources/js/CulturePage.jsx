import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CulturePage({ onNavigateHome, onNavigateLogin, onNavigateRegister, onNavigateDestinations, onNavigateExperiences, onNavigateAllDestinations, onNavigateJournal, onNavigateTravelGuide, onNavigateSustainability, onNavigateAbout, onNavigatePressKit, onNavigatePrivacyPolicy, onNavigateTerms, currentUser, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const [heroParallax, setHeroParallax] = useState(0);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setHeroParallax(window.pageYOffset * 0.1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkStyle = (active = false) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: active ? 700 : 500,
        color: active ? '#b32000' : 'rgba(19, 30, 27, 0.7)',
        textDecoration: 'none',
        borderBottom: active ? '2px solid #b32000' : 'none',
        paddingBottom: active ? '4px' : '0',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    });

    const bentoStats = [
        { icon: 'history_edu', title: '700+ Tahun', sub: 'Tradisi Lisan & Ritual' },
        { icon: 'palette', title: '4 Warna Utama', sub: 'Filosofi Hidup (Sulapa Eppa)' },
        { icon: 'landscape', title: 'Lolai & Bira', sub: 'Pusat Konservasi Budaya' },
        { icon: 'volunteer_activism', title: 'Kearifan Lokal', sub: "Siri' na pacce" },
    ];

    return (
        <div style={{ fontFamily: font, backgroundColor: '#f0fcf7', color: '#131e1b', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar
                activePage="culture"
                onNavigateHome={onNavigateHome}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={() => {}}
                onNavigateJournal={onNavigateJournal}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            <main style={{ paddingTop: 0 }}>

                {/* â”€â”€ Hero Section â”€â”€ */}
                <section style={{
                    position: 'relative',
                    height: '100vh',
                    minHeight: '700px',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <img
                            alt="Tana Toraja Tongkonan Houses at Dawn"
                            src="tanatoraja.jpg"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transform: `scale(1.05) translateY(${heroParallax}px)`,
                                transition: 'transform 0.1s linear',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(240,252,247,0.9) 100%)',
                        }} />
                    </div>

                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        padding: '0 64px',
                        maxWidth: '1000px',
                    }}>
                        <span style={{
                            fontFamily: font,
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.20em',
                            textTransform: 'uppercase',
                            color: '#31fde1',
                            backgroundColor: 'rgba(0,107,94,0.2)',
                            backdropFilter: 'blur(12px)',
                            padding: '8px 16px',
                            borderRadius: '9999px',
                            display: 'inline-block',
                            marginBottom: '24px',
                        }}>EKSPLORASI BUDAYA</span>

                        <h1 style={{
                            fontFamily: font,
                            fontSize: 'clamp(40px, 7vw, 64px)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            color: '#ffffff',
                            marginBottom: '24px',
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}>
                            Warisan Leluhur
                        </h1>

                        <p style={{
                            fontFamily: font,
                            fontSize: '18px',
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.9)',
                            maxWidth: '640px',
                            fontStyle: 'italic',
                            borderLeft: '4px solid #b32000',
                            paddingLeft: '24px',
                            margin: 0,
                        }}>
                            "Di tanah di mana langit dan bumi berpadu, setiap ukiran kayu dan helaian kain menceritakan kisah tentang kehormatan, harmoni, dan abadi nya jiwa Sulawesi."
                        </p>
                    </div>
                </section>

                {/* â”€â”€ Section 1: The Master Shipbuilders â”€â”€ */}
                <section style={{ padding: '80px 64px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '24px',
                        alignItems: 'center',
                        maxWidth: '1440px',
                        margin: '0 auto',
                    }}>
                        {/* Image */}
                        <div style={{ gridColumn: 'span 7', position: 'relative' }}
                            className="group"
                        >
                            <div style={{
                                aspectRatio: '16/10',
                                overflow: 'hidden',
                                borderRadius: '16px',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                transition: 'transform 0.7s ease',
                            }}>
                                <img
                                    alt="Phinisi Shipbuilding at Bulukumba"
                                    src="kapalphinisi.jpg"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.7s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            {/* Decorative badge */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-8px',
                                right: '-8px',
                                backgroundColor: '#31fde1',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                display: 'none',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            }} className="md:block">
                                <span className="material-symbols-outlined" style={{ color: '#00201b' }}>sailing</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div style={{ gridColumn: 'span 5', paddingLeft: '48px' }}>
                            <span style={{
                                fontFamily: font,
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.20em',
                                textTransform: 'uppercase',
                                color: '#b32000',
                                display: 'block',
                                marginBottom: '12px',
                            }}>ARSITEKTUR LAUT</span>

                            <h2 style={{
                                fontFamily: font,
                                fontSize: '32px',
                                fontWeight: 700,
                                lineHeight: 1.2,
                                letterSpacing: '-0.02em',
                                color: '#131e1b',
                                marginBottom: '24px',
                            }}>Mahakarya Sang Pembuat Kapal</h2>

                            <p style={{
                                fontFamily: font,
                                fontSize: '16px',
                                lineHeight: 1.6,
                                color: '#5c4039',
                                marginBottom: '48px',
                            }}>
                                Phinisi bukan sekadar kapal; ia adalah mahakarya tanpa sketsa yang lahir dari intuisi para pembuat kapal legendaris di Bulukumba. Menggunakan kayu besi pilihan, setiap pasak kayu yang dipukul adalah detak jantung kejayaan maritim Nusantara yang tetap berlayar menantang zaman.
                            </p>

                            <a
                                href="#"
                                onClick={e => e.preventDefault()}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#b32000',
                                    fontFamily: font,
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    textDecoration: 'none',
                                    transition: 'gap 0.3s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.gap = '20px'}
                                onMouseLeave={e => e.currentTarget.style.gap = '12px'}
                            >
                                <span>Pelajari Teknik Tradisional</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ Section 2: Threads of Tradition â”€â”€ */}
                <section style={{ padding: '80px 0', backgroundColor: '#eaf6f1', overflow: 'hidden' }}>
                    <div style={{ padding: '0 64px', maxWidth: '1440px', margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(12, 1fr)',
                            gap: '24px',
                        }}>
                            {/* Text Card */}
                            <div style={{ gridColumn: 'span 4', order: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    padding: '48px',
                                    borderRadius: '16px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    {/* Decorative icon bg */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        padding: '16px',
                                        opacity: 0.1,
                                    }}>
                                        <span className="material-symbols-outlined" style={{
                                            fontSize: '100px',
                                            fontVariationSettings: "'FILL' 1",
                                        }}>texture</span>
                                    </div>

                                    <span style={{
                                        fontFamily: font,
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '0.20em',
                                        textTransform: 'uppercase',
                                        color: '#006b5e',
                                        display: 'block',
                                        marginBottom: '12px',
                                    }}>TENUN SUTRA</span>

                                    <h2 style={{
                                        fontFamily: font,
                                        fontSize: '32px',
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        letterSpacing: '-0.02em',
                                        color: '#131e1b',
                                        marginBottom: '24px',
                                    }}>Benang Warisan</h2>

                                    <blockquote style={{
                                        fontStyle: 'italic',
                                        color: '#5c4039',
                                        borderLeft: '2px solid #006b5e',
                                        paddingLeft: '16px',
                                        marginBottom: '24px',
                                        fontFamily: font,
                                        fontSize: '16px',
                                        lineHeight: 1.6,
                                    }}>
                                        "Sutra adalah bahasa diam yang merajut doa ibu ke dalam corak kain Lipa' Sabbe."
                                    </blockquote>

                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '16px',
                                        lineHeight: 1.6,
                                        color: '#5c4039',
                                    }}>
                                        Dengan alat tenun kayu tradisional, para perajin Bugis-Makassar menyatukan serat sutra alam menjadi motif geometris yang sarat makna filosofis. Setiap warna melambangkan strata sosial dan harapan akan kemakmuran bagi pemakainya.
                                    </p>
                                </div>
                            </div>

                            {/* Images collage */}
                            <div style={{ gridColumn: 'span 8', order: 1, display: 'flex', gap: '24px' }}>
                                {/* Main tall image */}
                                <div style={{ width: '66.67%', height: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                                    <img
                                        alt="Bugis Weaving Artisan"
                                        src="tenunbugis.jpg"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                {/* Two stacked images */}
                                <div style={{ width: '33.33%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}>
                                        <img
                                            alt="Silk weaving detail"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAFbD_vL0FELC2l_orECUj36mlOkQ7SuE4Uw2iU85vRpnCqdFzp86UGu6zAL_cZYJSXsLPxJ1SDinfYDJOPc2FYndrWLeHmPD0ChqlDjBdFh2dlbbvEN8fTuMkhNQkFWI255Mdh3c_RpvduvoZFcz_DzDF1Y8qWNAopiGJYt1dk4vazgh4rzKy-uMLUCOekcKl6ppsJ1GKdMX29HNnk-dR_fQL-Vyo62IUUWNkV8QP09aUH8uPSUQimQv5XYo4ghBQfupzElVHkgs"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        backgroundColor: '#b32000',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '24px',
                                        textAlign: 'center',
                                    }}>
                                        <p style={{
                                            color: '#ffffff',
                                            fontFamily: font,
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            letterSpacing: '0.10em',
                                            textTransform: 'uppercase',
                                            lineHeight: 1.4,
                                        }}>WARISAN DUNIA UNESCO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ Section 3: Sacred Movements â”€â”€ */}
                <section style={{ padding: '80px 64px' }}>
                    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
                        {/* Section header */}
                        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '768px', margin: '0 auto 80px' }}>
                            <span style={{
                                fontFamily: font,
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.20em',
                                textTransform: 'uppercase',
                                color: '#b32000',
                                display: 'block',
                                marginBottom: '12px',
                            }}>SENI TARI</span>

                            <h2 style={{
                                fontFamily: font,
                                fontSize: 'clamp(32px, 4vw, 40px)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                color: '#131e1b',
                                marginBottom: '16px',
                            }}>Langkah Sakral</h2>

                            <div style={{ width: '64px', height: '4px', backgroundColor: '#31fde1', margin: '0 auto 24px' }} />

                            <p style={{
                                fontFamily: font,
                                fontSize: '18px',
                                lineHeight: 1.6,
                                color: '#5c4039',
                            }}>
                                Setiap gerakan dalam tarian tradisional Sulawesi Selatan adalah penghormatan kepada leluhur dan perayaan syukur. Dari gemulainya Tari Pagelu hingga kemegahan Tari Pakarena yang agung.
                            </p>
                        </div>

                        {/* Cinematic image */}
                        <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto' }}
                            className="group"
                        >
                            <div style={{
                                aspectRatio: '21/9',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                border: '4px solid #ffffff',
                            }}>
                                <img
                                    alt="Pakarena Traditional Dance Performance"
                                    src="tariPakarena.jpg"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            {/* Hover overlay caption */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '48px',
                                borderRadius: '16px',
                                opacity: 0,
                                transition: 'opacity 0.5s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                            >
                                <h3 style={{
                                    fontFamily: font,
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    marginBottom: '4px',
                                }}>Harmoni dalam Gerak yang Lembut dan Penuh Makna</h3>
                                <p style={{ fontFamily: font, fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
                                    Tari Pakarena adalah tarian khas Sulawesi Selatan yang menampilkan gerakan lembut dan penuh makna, melambangkan kesabaran, kesetiaan, dan keindahan budaya lokal.
                                </p>
                            </div>
                        </div>

                        {/* â”€â”€ Bento Stats Grid â”€â”€ */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '24px',
                            marginTop: '80px',
                        }}>
                            {bentoStats.map((stat, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: 'rgba(255,255,255,0.8)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.4)',
                                        padding: '24px',
                                        borderRadius: '16px',
                                        textAlign: 'center',
                                        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                                        cursor: 'default',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(179,32,0,0.15)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{
                                        fontSize: '40px',
                                        color: '#b32000',
                                        marginBottom: '12px',
                                        display: 'block',
                                        fontVariationSettings: "'FILL' 1",
                                    }}>{stat.icon}</span>
                                    <h4 style={{
                                        fontFamily: font,
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#131e1b',
                                        marginBottom: '4px',
                                    }}>{stat.title}</h4>
                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '14px',
                                        color: '#5c4039',
                                        margin: 0,
                                    }}>{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* â”€â”€ Footer â”€â”€ */}
            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={() => {}}
                onNavigateJournal={onNavigateJournal}
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

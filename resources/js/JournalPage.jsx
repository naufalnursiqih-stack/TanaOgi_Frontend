import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function JournalPage({
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateDestinations,
    onNavigateAllDestinations,
    onNavigateExperiences,
    onNavigateCulture,
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
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXcaM4jwyA4Rw-Zr9gF4UCdCq946zaLySQ9i4k-_BaJGLCBahHnHMiOJ8suZsa6WRhA5Aklkv-b6FWQ2c2rwOK0ytXSp9zY4gUr9gYdr4k9AknK2k4AltDf9YvZTwUn9jlbTYBrhZR64Evq4cCsr1Ru--feqgtQc0ryV0IFZGAPKHZ-sLrVg8W45TCIVNlO-PqvMeEfRbaXgEJms2FjK-7M6RNdnMgOscRCdXAojZ9HCxV6SMmYK-IdbuRg7SBbQpLQI6ERfk',
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
                onNavigateJournal={() => {}}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            <main style={{ paddingTop: '88px' }}>

                {/* â”€â”€ Hero Section â”€â”€ */}
                <section style={{ position: 'relative', height: '80vh', width: '100%', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <img
                            alt="Landscape Sulawesi - Kabut Pagi di Atas Lembah Karst Maros"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY_vp4nnr2aXZg8bZ3dLj0-vJUblUXkMQnCqFtRF_jsLGgLhY0E_ghpbqygN67oU3X4qjyP4uHEnRG948vsF_8BHjV2VW4A3FOdZR2CLm7PqhChIULK1sWFQhD1qlDygxTxExlhOvVpOmJ6R3WfscFBD0YT2lKBWH460CYzB4nfU1lNK4aBZCXu-HZfjaJoG3XJBIPZnd-ZOKoPidqQaOnu346m5KhmQPtiMOmyLL_K317AD4MR_bmRG8wSdW2Ynq9_YPwuWxBkEw"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(19,30,27,0.8) 100%)',
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
                            <span style={{
                                fontFamily: font, fontSize: '12px', fontWeight: 700,
                                letterSpacing: '0.20em', textTransform: 'uppercase',
                                color: '#00dfc5', display: 'block', marginBottom: '8px',
                            }}>EDITORIAL FEATURE</span>
                            <h1 style={{
                                fontFamily: font, fontSize: 'clamp(40px, 6vw, 64px)',
                                fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em',
                                color: '#ffffff', marginBottom: '24px',
                                textShadow: '0 4px 24px rgba(0,0,0,0.4)',
                            }}>
                                Jurnal: Kisah-Kisah dari Tanah Leluhur
                            </h1>
                            <p style={{
                                fontFamily: font, fontSize: '18px', lineHeight: 1.6,
                                color: 'rgba(255,255,255,0.9)', maxWidth: '560px',
                            }}>
                                Selami jiwa Sulawesiâ€”dari katedral karst Maros hingga ukiran sakral Toraja yang menyimpan ribuan tahun sejarah.
                            </p>
                        </div>
                    </div>
                </section>

                {/* â”€â”€ Featured Article â”€â”€ */}
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
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKc4qjAT3ilx9wqMZNm4joMOHZsrrXHFpiPTugsb0ofCThS0R10Ziw2gHXvEkBpRPTN6ieJe2x41Vi8qxPGgfArz621P63-4-DmTxGwkwAXJoZx2YBGDfr69zt8XPvFAk6iu1QIbIKmbacJuTJw9ccW2lLQHKc6nbvHDiSd_YkoIC260iCYgyiB7iwgxVgNJbYn-mS9WKxLwCbtl3K9XzqFxJGrN_JXN_92DenbgdnqQaD6vJhAWzWQtw6RbOeX_dNUV0yIuix_wE"
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

                {/* â”€â”€ Cultural Chronicles Grid â”€â”€ */}
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

                {/* â”€â”€ Newsletter / Join the Journal Section â”€â”€ */}
                <section style={{ padding: '80px 64px', maxWidth: '1440px', margin: '0 auto' }}>
                    <div style={{
                        position: 'relative',
                        borderRadius: '24px',
                        padding: '80px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '48px',
                        /* Orange-aqua gradient with dark overlay */
                        background: 'linear-gradient(135deg, rgba(245,64,27,0.85) 0%, rgba(35,247,219,0.75) 100%), linear-gradient(180deg, rgba(30,45,40,0.55) 0%, rgba(30,45,40,0.45) 100%)',
                        backgroundColor: '#1e2d28',
                    }}>
                        {/* Decorative glow blobs */}
                        <div style={{
                            position: 'absolute', top: '-60px', right: '-60px',
                            width: '280px', height: '280px',
                            background: 'rgba(245,64,27,0.2)',
                            borderRadius: '50%', filter: 'blur(80px)',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-40px', left: '20%',
                            width: '200px', height: '200px',
                            background: 'rgba(35,247,219,0.15)',
                            borderRadius: '50%', filter: 'blur(60px)',
                        }} />

                        {/* Text */}
                        <div style={{ position: 'relative', zIndex: 10, maxWidth: '520px' }}>
                            <h2 style={{
                                fontFamily: font, fontSize: 'clamp(32px, 4vw, 40px)',
                                fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em',
                                color: '#ffffff', marginBottom: '24px',
                                textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                            }}>Bergabunglah dalam Perjalanan</h2>
                            <p style={{
                                fontFamily: font, fontSize: '18px', lineHeight: 1.6,
                                color: 'rgba(255,255,255,0.88)',
                            }}>
                                Berlangganan untuk mendapatkan cerita budaya bulanan, panduan destinasi tersembunyi di Nusantara, dan perspektif perjalanan eksklusif dari jantung Sulawesi.
                            </p>
                        </div>

                        {/* Form */}
                        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px' }}>
                            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="ALAMAT EMAIL ANDA"
                                        required
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid rgba(255,255,255,0.4)',
                                            color: '#ffffff',
                                            padding: '16px 0',
                                            fontFamily: font,
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            letterSpacing: '0.20em',
                                            outline: 'none',
                                            transition: 'border-color 0.3s',
                                            boxSizing: 'border-box',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderBottomColor = '#b32000'}
                                        onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)'}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: subscribed ? '#006b5e' : '#b32000',
                                        color: '#ffffff',
                                        padding: '16px 32px',
                                        borderRadius: '9999px',
                                        fontFamily: font,
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        letterSpacing: '0.10em',
                                        textTransform: 'uppercase',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                                    }}
                                    onMouseEnter={e => { if (!subscribed) e.currentTarget.style.backgroundColor = '#de2f08'; }}
                                    onMouseLeave={e => { if (!subscribed) e.currentTarget.style.backgroundColor = '#b32000'; }}
                                >
                                    {subscribed ? 'âœ“ SELAMAT DATANG DI JURNAL' : 'LANGGANAN JURNAL INI'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* â”€â”€ Footer â”€â”€ */}
            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={() => {}}
            />
        </div>
    );
}

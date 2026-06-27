import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DestinationsPage({ onNavigateHome, onNavigateLogin, onNavigateRegister, onNavigateAllDestinations, onNavigateExperiences, onNavigateCulture, onNavigateJournal, onNavigateDestinationDetail, currentUser, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        // Trigger hero animations after mount
        const timer = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const destinations = [
        {
            id: 1,
            colSpan: '8',
            height: '600px',
            image: '60a0e3f-1c7b-4d5a-9f8e-2b6c1e3f4d5a.jpg',
            alt: 'Tana Toraja',
            tag: 'WARISAN LELUHUR',
            title: 'Lembah Para Raja, Tana Toraja',
            desc: 'Menjelajahi arsitektur Tongkonan yang megah di balik kabut pagi Lolai yang mistis.',
            cta: 'JELAJAHI',
            glass: true,
        },
        {
            id: 2,
            colSpan: '4',
            height: '600px',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
            alt: 'Rammang-Rammang',
            tag: 'KEANEKARAGAMAN HAYATI',
            title: 'Hutan Karst Maros',
            desc: 'Labirin batu kapur tertua kedua di dunia yang menyimpan rahasia prasejarah.',
            cta: 'LIHAT DETAIL',
            glass: false,
        },
    ];

    return (
        <div style={{ fontFamily: font, backgroundColor: '#f0fcf7', color: '#131e1b' }}>

            <Navbar
                activePage="destinations"
                onNavigateHome={onNavigateHome}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={() => {}}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            {/* â”€â”€ Hero Section â”€â”€ */}
            <section style={{
                position: 'relative',
                height: '90vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Hero BG */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img
                        alt="Pantai Pasir Putih"
                        src="/pantai-pasir-putih.jpg"
                        className="w-full h-full object-cover"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: 'scale(1.05)',
                        }}
                    />
                    {/* gradient: transparent â†’ dark overlay to keep text readable */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.55) 100%)',
                    }} />
                </div>

                {/* Hero Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 64px',
                }}>
                    <span style={{
                        fontFamily: font,
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.20em',
                        textTransform: 'uppercase',
                        color: '#b32000',
                        display: 'block',
                        marginBottom: '24px',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                    }}>SULAWESI SELATAN</span>

                    <h1 style={{
                        fontFamily: font,
                        fontSize: '64px',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        color: '#131e1b',
                        maxWidth: '900px',
                        margin: '0 auto 48px',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
                        transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
                    }}>
                        Mahakarya Alam &amp; Budaya
                    </h1>

                    <p style={{
                        fontFamily: font,
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: '#5c4039',
                        maxWidth: '560px',
                        margin: '0 auto 80px',
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
                    }}>
                        Temukan harmoni antara puncak karst yang megah dan tradisi leluhur yang tak lekang oleh waktu di jantung Celebes.
                    </p>
                </div>

                {/* Bounce arrow */}
                <div style={{
                    position: 'absolute',
                    bottom: '48px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: 0.5,
                    animation: 'bounce-arrow 2s ease-in-out infinite',
                }}>
                    <span className="material-symbols-outlined" style={{ color: '#131e1b', fontSize: '32px' }}>expand_more</span>
                </div>
            </section>

            {/* â”€â”€ Featured Collection â”€â”€ */}
            <section style={{
                padding: '80px 64px',
                maxWidth: '1440px',
                margin: '0 auto',
            }}>
                {/* Section Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '80px',
                    flexWrap: 'wrap',
                    gap: '24px',
                }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h2 style={{
                            fontFamily: font,
                            fontSize: '32px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            color: '#131e1b',
                            marginBottom: '24px',
                        }}>Destinasi Pilihan: Permata Sulawesi Selatan</h2>
                        <div style={{ width: '96px', height: '4px', backgroundColor: '#006b5e', borderRadius: '9999px' }} />
                    </div>
                    <p style={{
                        fontFamily: font,
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#5c4039',
                        maxWidth: '400px',
                        lineHeight: 1.6,
                    }}>
                        Koleksi eksklusif yang dikurasi khusus untuk petualang yang menghargai kedalaman cerita dan kemegahan visual.
                    </p>
                </div>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '24px',
                }}>
                    {/* Card 1: Tana Toraja â€” col-span 8 */}
                    <div
                        className="dest-card"
                        onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail({ id: 1, title: 'Kete Kesu Village', region: 'Toraja Utara' }); }}
                        style={{
                            gridColumn: 'span 8',
                            position: 'relative',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px -12px rgba(245,64,27,0.15)',
                            height: '600px',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            alt="Tana Toraja"
                            src="/Kete-Kesu.jpg"
                            className="dest-card-img"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.7s ease',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                            opacity: 0.6,
                            transition: 'opacity 0.3s',
                        }} />
                        {/* Glass panel content */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            padding: '48px',
                            width: '100%',
                        }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                padding: '48px',
                                borderRadius: '16px',
                                maxWidth: '520px',
                            }}>
                                <span style={{
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    color: '#006b5e',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}>WARISAN LELUHUR</span>
                                <h3 style={{
                                    fontFamily: font,
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    color: '#131e1b',
                                    marginBottom: '12px',
                                }}>Lembah Para Raja, Tana Toraja</h3>
                                <p style={{
                                    fontFamily: font,
                                    fontSize: '16px',
                                    color: '#5c4039',
                                    marginBottom: '24px',
                                    lineHeight: 1.6,
                                }}>Menjelajahi arsitektur Tongkonan yang megah di balik kabut pagi Lolai yang mistis.</p>
                                <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (onNavigateDestinationDetail) onNavigateDestinationDetail({ id: 1, title: 'Kete Kesu Village', region: 'Toraja Utara' }); }} style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    color: '#b32000',
                                    textDecoration: 'none',
                                    transition: 'gap 0.3s',
                                }}>
                                    JELAJAHI <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Rammang-Rammang â€” col-span 4 */}
                    <div
                        className="dest-card"
                        onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail({ id: 2, title: 'Hutan Karst Maros', region: 'Maros' }); }}
                        style={{
                            gridColumn: 'span 4',
                            position: 'relative',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px -12px rgba(245,64,27,0.15)',
                            height: '600px',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            alt="Hutan Karst Maros"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8"
                            className="dest-card-img"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.7s ease',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                            opacity: 0.6,
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            padding: '48px',
                        }}>
                            <span style={{
                                fontFamily: font,
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.20em',
                                textTransform: 'uppercase',
                                color: '#006b5e',
                                display: 'block',
                                marginBottom: '4px',
                            }}>KEANEKARAGAMAN HAYATI</span>
                            <h3 style={{
                                fontFamily: font,
                                fontSize: '32px',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: '#ffffff',
                                marginBottom: '12px',
                            }}>Hutan Karst Maros</h3>
                            <p style={{
                                fontFamily: font,
                                fontSize: '16px',
                                color: 'rgba(255,255,255,0.8)',
                                marginBottom: '24px',
                                lineHeight: 1.6,
                             }}>Labirin batu kapur tertua kedua di dunia yang menyimpan rahasia prasejarah.</p>
                            <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (onNavigateDestinationDetail) onNavigateDestinationDetail({ id: 2, title: 'Hutan Karst Maros', region: 'Maros' }); }} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontFamily: font,
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.20em',
                                textTransform: 'uppercase',
                                color: '#31fde1',
                                textDecoration: 'none',
                                transition: 'gap 0.3s',
                            }}>
                                LIHAT DETAIL <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                            </a>
                        </div>
                    </div>
 
                    {/* Card 3: Tanjung Bira â€” col-span 12 */}
                    <div
                        className="dest-card"
                        onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail({ id: 3, title: 'Pantai Tanjung Bira', region: 'Bulukumba' }); }}
                        style={{
                            gridColumn: 'span 12',
                            position: 'relative',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px -12px rgba(245,64,27,0.15)',
                            height: '400px',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            alt="Pasir Putih Tanjung Bira"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc"
                            className="dest-card-img"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.7s ease',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.3s',
                        }}
                        className="dest-card-overlay"
                        >
                            <div style={{ textAlign: 'center', color: '#ffffff', padding: '0 20px' }}>
                                <span style={{
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '12px',
                                }}>SURGA PESISIR</span>
                                <h3 style={{
                                    fontFamily: font,
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    color: '#ffffff',
                                    marginBottom: '24px',
                                }}>Pasir Putih Tanjung Bira</h3>
                                <button style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: '#ffffff',
                                    padding: '12px 48px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.color = '#b32000';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onClick={(e) => { e.stopPropagation(); if (onNavigateDestinationDetail) onNavigateDestinationDetail({ id: 3, title: 'Pantai Tanjung Bira', region: 'Bulukumba' }); }}
                                >Rencanakan Kunjungan</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary CTA */}
                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (onNavigateAllDestinations) onNavigateAllDestinations();
                        }}
                        className="dest-plan-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '24px',
                            backgroundColor: '#b32000',
                            color: '#ffffff',
                            padding: '24px 80px',
                            borderRadius: '9999px',
                            fontFamily: font,
                            fontSize: '16px',
                            fontWeight: 700,
                            boxShadow: '0 30px 60px -12px rgba(245,64,27,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Lihat Semua Destinasi
                        <span className="material-symbols-outlined">explore</span>
                    </button>
                </div>
            </section>

            {/* â”€â”€ Editorial / Newsletter Section â”€â”€ */}
            <section style={{
                padding: '80px 0',
                backgroundColor: '#eaf6f1',
            }}>
                <div style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '0 64px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'center',
                }}>
                    {/* Image */}
                    <div>
                        <img
                            alt="Traditional Torajan Weaving"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpd489SCZCN7osEY1vPx5f5LQF0gN9GRwcwNfsNvGhpFHBhJ3FT3qBSA6KRK91qtPCi2GPbIw2eJ1DqIges9EBOg0qPttMYeH_KJgeznyFTeuH36Pdab31tHRTqkaIp2Gi81qLeKhrdljbU0RsGCLKqNaBdiqh2zA0gNn3BWCaqm_K6m_aoNGvGj-jQfI1ZsxhYrvMAXrUUHQ6w2gyj8Hkuh2h1F_eEkGcQs5EQsMta0KRvsjHYZo3-UtY1GTsfvfp8WQ2jPbsI"
                            style={{
                                width: '100%',
                                borderRadius: '16px',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        <h2 style={{
                            fontFamily: font,
                            fontSize: '32px',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: '#131e1b',
                        }}>Cerita di Balik Setiap Perjalanan</h2>

                        <p style={{
                            fontFamily: font,
                            fontSize: '18px',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: '#5c4039',
                        }}>
                            Kami percaya bahwa perjalanan bukan sekadar berpindah tempat, melainkan sebuah dialog mendalam antara diri dan tradisi yang masih bernapas.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Feature 1 */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                                <span className="material-symbols-outlined" style={{
                                    color: '#b32000',
                                    padding: '4px',
                                    backgroundColor: '#de2f08',
                                    borderRadius: '50%',
                                    fontSize: '20px',
                                    color: '#ffffff',
                                    flexShrink: 0,
                                }}>auto_awesome</span>
                                <div>
                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '0.20em',
                                        textTransform: 'uppercase',
                                        color: '#131e1b',
                                        marginBottom: '4px',
                                    }}>KURASI EKSKLUSIF</p>
                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '16px',
                                        color: '#5c4039',
                                        lineHeight: 1.6,
                                    }}>Setiap lokasi dipilih berdasarkan keaslian budaya dan keasrian alamnya.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                                <span className="material-symbols-outlined" style={{
                                    padding: '4px',
                                    backgroundColor: '#23F7DB',
                                    borderRadius: '50%',
                                    fontSize: '20px',
                                    color: '#00201b',
                                    flexShrink: 0,
                                }}>eco</span>
                                <div>
                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '0.20em',
                                        textTransform: 'uppercase',
                                        color: '#131e1b',
                                        marginBottom: '4px',
                                    }}>WISATA BERKELANJUTAN</p>
                                    <p style={{
                                        fontFamily: font,
                                        fontSize: '16px',
                                        color: '#5c4039',
                                        lineHeight: 1.6,
                                    }}>Mendukung komunitas lokal untuk menjaga ekosistem dan tradisi Toraja.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={() => {}}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
            />
        </div>
    );
}

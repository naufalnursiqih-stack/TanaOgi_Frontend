import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ExperiencesPage({ onNavigateHome, onNavigateLogin, onNavigateRegister, onNavigateDestinations, onNavigateCulture, onNavigateJournal, currentUser, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All Experiences');
    const [selectedDuration, setSelectedDuration] = useState('Duration');
    const [mapLoaded, setMapLoaded] = useState(false);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        // Simulate map loading micro-interaction
        const timer = setTimeout(() => setMapLoaded(true), 1500);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const categories = ['All Experiences', 'Adrenaline Junkie', 'Family Friendly', 'Zen & Wellness'];

    const experiences = [
        {
            id: 1,
            title: 'Sunrise Phinisi Sailing',
            duration: '4 Jam',
            durationVal: 4, // 4 hours
            capacity: '10 Orang',
            language: 'Indonesian & English',
            price: 'Rp 750.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAkussKryD2YD-eTXLCJN8WnXw5pWHIi0uKdGCXCSmLvSs9eEzAGuhx1GFjGmjM-fuEEfR1XVrSptpsXbTm_ddS3gpOZiHBI102dbCwCQPfFCevWu1-jgbZP3yGj8wfAlhIOSj5egLvWWPTM569dc4TQAWdsTetHYLsWB7btRihsKkU1BraOaA6uxB1IzxZJLExodjk-ihLvDGbR1Zt_Yxt1KD_WUhCGbUhiXTgtYUzo0B1yEoYr3zwd-829zUKwGs2ycwFizaTdU',
            badges: ['Best Seller', 'Instant Booking'],
            categories: ['Family Friendly', 'Zen & Wellness']
        },
        {
            id: 2,
            title: 'Coral Reef Snorkeling',
            duration: '2 Jam',
            durationVal: 2, // 2 hours
            capacity: '6 Orang',
            language: 'Local Guide',
            price: 'Rp 350.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAftx8ZhJ-_xPttHESA2zjq_groQzkBqa4k99UHGLJkMb-X-64bIDFKddOHpZ6Cg2vqxCkb4HNAew8h4mVGTl-OpavOPCiMuEEEZb6iurV2b8BcykuihP4paLcrcA0fFARxIxnB2XMcbix_nQCDoSMOX44M9qkmBQWxNoWWvWwCY12GYBSfsV0kjwUNWHW-mAqHLVv5nHUDjAWB2BUqCJMvm_qi3Gr6SlREhfrtv-YNL1hRPuF8nvDIutCq75XbxrR2r99-EhJOHtY',
            badges: ['Top Rated'],
            categories: ['Adrenaline Junkie', 'Family Friendly']
        },
        {
            id: 3,
            title: 'Cultural Weaver Workshop',
            duration: '3 Jam',
            durationVal: 3, // 3 hours
            capacity: '4 Orang',
            language: 'Multi-lang',
            price: 'Rp 250.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwY3_OppzLU6zTOtd5J-5i3ePLCF_ekQRRRecjVc0s888lmj_kaSQW4kO06CTi2iuKRgo7nqPoiTis1_iV8mjnHIBqRP6t7E1qki-jERxYxfpZgQa1897LrCU_gamxeM4cnyxZZ0Q865cBm5D33yI2N50zF3MqW6ubUelYICBGEyEmUx5Cgilxp3w4YeZ9EbW7MdL_AyUil0puUqMn-9ochBbgpX16PHoX2k9mHCK-jCd-kWvlheGlTzv29C0VFJgC-3wihSTreBs',
            badges: ['New'],
            categories: ['Zen & Wellness', 'Family Friendly']
        }
    ];

    // Filter logic
    const filteredExperiences = experiences.filter(exp => {
        // Category filter
        const matchesCategory = activeCategory === 'All Experiences' || exp.categories.includes(activeCategory);
        
        // Duration filter
        let matchesDuration = true;
        if (selectedDuration === 'Short (1-3 hours)') {
            matchesDuration = exp.durationVal >= 1 && exp.durationVal <= 3;
        } else if (selectedDuration === 'Half Day (4-6 hours)') {
            matchesDuration = exp.durationVal >= 4 && exp.durationVal <= 6;
        } else if (selectedDuration === 'Full Day (8+ hours)') {
            matchesDuration = exp.durationVal >= 8;
        }
        
        return matchesCategory && matchesDuration;
    });

    const navLinkStyle = (active = false) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: active ? 700 : 500,
        color: active ? '#b32000' : 'rgba(19, 30, 27, 0.7)',
        textDecoration: 'none',
        borderBottom: active ? '2px solid #b32000' : 'none',
        paddingBottom: active ? '4px' : '0',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    });

    return (
        <div style={{ fontFamily: font, backgroundColor: '#f0fcf7', color: '#131e1b', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar
                activePage="experiences"
                onNavigateHome={onNavigateHome}
                onNavigateLogin={onNavigateLogin}
                onNavigateRegister={onNavigateRegister}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={() => {}}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
                currentUser={currentUser}
                onLogout={onLogout}
            />

            {/* â”€â”€ Hero Section â”€â”€ */}
            <header style={{
                position: 'relative',
                height: '819px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img 
                        alt="Pantai Tanjung Bira" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoBf4kHVlDZhroavsqD1Bm3SQ26q4QSwXJBemvCt1h8L594u8Ck2KeErkR2WKP9cUbFvXF-KeEypRg2PWNvbZh9NRLmG9ON8MdbrTkGd_ZSGZdihARnB0rkAeHQA3CWfFXCWPvDmYaJ6Q-v9CFPutBLDkaxWf1qcZ0-2Jj4TjiE-dG1CpL_uliWNCMg1SJAdo8yjmYqn9zXT4NJQxT5hsYVETMAxItk8y3xz9OXz2G1HQuYZb9B_JP7QYaKNyTUlbnHTbHz0-juC0"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 60%, #f0fcf7 100%)'
                    }} />
                </div>
                
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '800px' }}>
                    <h1 style={{
                        fontFamily: font,
                        fontSize: '64px',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        color: '#ffffff',
                        marginBottom: '24px',
                        textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }} className="text-display-lg-mobile md:text-display-lg">
                        Pengalaman Tak Terlupakan di Tanjung Bira
                    </h1>
                    <p style={{
                        fontFamily: font,
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.95)',
                        lineHeight: 1.6,
                        margin: 0,
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}>
                        Jangan hanya berkunjung. Rasakan budayanya, nikmati petualangannya, dan ciptakan kenangan.
                    </p>
                </div>
            </header>

            {/* â”€â”€ Filter Bar Section â”€â”€ */}
            <section style={{ position: 'relative', zIndex: 20, marginTop: '-48px', padding: '0 64px' }}>
                <div className="glass-card-opaque rounded-full cinematic-shadow" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 48px',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Category Buttons */}
                    <div className="no-scrollbar" style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        paddingBottom: '4px'
                    }}>
                        {categories.map(cat => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '8px 24px',
                                        borderRadius: '9999px',
                                        backgroundColor: isActive ? '#006b5e' : 'rgba(0, 107, 94, 0.08)',
                                        border: isActive ? '1px solid #006b5e' : '1px solid rgba(0, 107, 94, 0.15)',
                                        color: isActive ? '#ffffff' : '#006b5e',
                                        fontFamily: font,
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        letterSpacing: '0.20em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                    
                    <div style={{ width: '1px', height: '32px', backgroundColor: '#e6bdb5' }} className="hidden md:block"></div>
                    
                    {/* Select Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={selectedDuration}
                            onChange={(e) => setSelectedDuration(e.target.value)}
                            style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                backgroundColor: '#eaf6f1',
                                border: 'none',
                                borderRadius: '9999px',
                                padding: '8px 48px 8px 24px',
                                fontFamily: font,
                                fontSize: '12px',
                                fontWeight: 700,
                                letterSpacing: '0.20em',
                                textTransform: 'uppercase',
                                color: '#131e1b',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="Duration">Duration</option>
                            <option value="Short (1-3 Jam)">Short (1-3 Jam)</option>
                            <option value="Half Day (4-6 Jam)">Half Day (4-6 Jam)</option>
                            <option value="Full Day (8+ Jam)">Full Day (8+ Jam)</option>
                        </select>
                        <span className="material-symbols-outlined" style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#5c4039',
                            fontSize: '20px'
                        }}>expand_more</span>
                    </div>
                </div>
            </section>

            {/* â”€â”€ Experience Catalog Grid â”€â”€ */}
            <main style={{ padding: '80px 64px', maxWidth: '1440px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '48px'
                }}>
                    {filteredExperiences.map(exp => (
                        <article 
                            key={exp.id} 
                            className="glass-card-opaque cinematic-shadow pulse-hover"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'all 0.4s ease-in-out'
                            }}
                        >
                            {/* Card Image Wrapper */}
                            <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }} className="group">
                                <img 
                                    src={exp.image} 
                                    alt={exp.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.7s ease'
                                    }}
                                />
                                {/* Badges */}
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    left: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}>
                                    {exp.badges.map(badge => {
                                        let bg = '#b32000';
                                        if (badge === 'Instant Booking' || badge === 'Top Rated') bg = '#006b5e';
                                        if (badge === 'New') bg = '#535e5c';
                                        return (
                                            <span 
                                                key={badge}
                                                style={{
                                                    backgroundColor: bg,
                                                    color: '#ffffff',
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.20em',
                                                    textTransform: 'uppercase',
                                                    padding: '6px 12px',
                                                    borderRadius: '9999px',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                                                }}
                                            >
                                                {badge}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Card Details */}
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h3 style={{
                                    fontFamily: font,
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    color: '#131e1b',
                                    margin: '0 0 12px 0'
                                }}>{exp.title}</h3>

                                {/* Quick Stats */}
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5c4039' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>schedule</span>
                                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase' }}>{exp.duration}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5c4039' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>groups</span>
                                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase' }}>{exp.capacity}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5c4039' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>translate</span>
                                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase' }}>{exp.language}</span>
                                    </div>
                                </div>

                                {/* Divider & Footer info */}
                                <div style={{
                                    marginTop: 'auto',
                                    paddingTop: '20px',
                                    borderTop: '1px solid #e6bdb5',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#5c4039' }}>Mulai dari</p>
                                        <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#b32000' }}>{exp.price}</p>
                                    </div>
                                    <button 
                                        onClick={onNavigateRegister}
                                        className="pulse-hover"
                                        style={{
                                            backgroundColor: '#b32000',
                                            color: '#ffffff',
                                            padding: '12px 28px',
                                            borderRadius: '9999px',
                                            fontFamily: font,
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            letterSpacing: '0.20em',
                                            textTransform: 'uppercase',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >Order Sekarang</button>
                                </div>
                            </div>
                        </article>
                    ))}
                    
                    {filteredExperiences.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#5c4039' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px' }}>search_off</span>
                            <p style={{ fontSize: '18px', fontWeight: 600 }}>No experiences found matching these filters.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* â”€â”€ Preparing for Adventure â”€â”€ */}
            <section style={{ backgroundColor: '#e4f1eb', padding: '80px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 64px', boxSizing: 'border-box' }}>
                    <h2 style={{
                        fontFamily: font,
                        fontSize: '36px',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#131e1b',
                        textAlign: 'center',
                        marginBottom: '64px'
                    }}>Siapkan Petualangan</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
                        {/* What's Included */}
                        <div className="glass-card-opaque cinematic-shadow" style={{
                            padding: '40px',
                            borderRadius: '16px',
                            borderLeft: '4px solid #006b5e'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#006b5e', fontSize: '36px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <h3 style={{ fontFamily: font, fontSize: '24px', fontWeight: 700, margin: 0 }}>Fasilitas termasuk</h3>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { icon: 'directions_car', text: 'Layanan antar-jemput dari hotel' },
                                    { icon: 'security', text: 'Alat keselamatan profesional & peralatan' },
                                    { icon: 'restaurant', text: 'Makan siang tradisional Bugis & minuman segar' },
                                    { icon: 'medical_services', text: 'Cakupan asuransi perjalanan' }
                                ].map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#006b5e' }}>{item.icon}</span>
                                        <span style={{ fontSize: '16px', fontWeight: 500, color: '#5c4039' }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What to Bring */}
                        <div className="glass-card-opaque cinematic-shadow" style={{
                            padding: '40px',
                            borderRadius: '16px',
                            borderLeft: '4px solid #b32000'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#b32000', fontSize: '36px', fontVariationSettings: "'FILL' 1" }}>backpack</span>
                                <h3 style={{ fontFamily: font, fontSize: '24px', fontWeight: 700, margin: 0 }}>Persiapan perjalanan</h3>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { icon: 'wb_sunny', text: 'Tabir surya & kacamata hitam' },
                                    { icon: 'checkroom', text: 'Pakaian cadangan' },
                                    { icon: 'footprint', text: 'Sepatu jalan yang nyaman' },
                                    { icon: 'payments', text: 'Uang tunai untuk pengeluaran pribadi' }
                                ].map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#b32000' }}>{item.icon}</span>
                                        <span style={{ fontSize: '16px', fontWeight: 500, color: '#5c4039' }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* â”€â”€ Map & Social Proof Section â”€â”€ */}
            <section style={{ padding: '80px 64px', maxWidth: '1440px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px' }}>
                    
                    {/* Explorer Map Card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, margin: 0 }}>Jelajahi destinasi anda</h2>
                        
                        <div style={{
                            width: '100%',
                            maxWidth: '640px',
                            margin: '0 auto',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 28px 80px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(0, 0, 0, 0.06)'
                        }}>
                            <div style={{ position: 'relative', width: '100%', paddingTop: '58%', backgroundColor: '#f7faf8' }}>
                                {!mapLoaded && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: '#f7faf8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            border: '4px solid #006b5e',
                                            borderTopColor: 'transparent',
                                            borderRadius: '50%',
                                            animation: 'bounce-arrow 1s linear infinite'
                                        }}></div>
                                    </div>
                                )}

                                <img
                                    alt="Peta Tanjung Bira"
                                    className="map-glow-hover"
                                    src="mapsbira.jpg"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: 'brightness(0.98) contrast(1.05)',
                                        transform: 'scale(1.02)'
                                    }}
                                />

                                <div style={{
                                    position: 'absolute',
                                    top: '18px',
                                    left: '18px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 14px',
                                    borderRadius: '9999px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.36)',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em'
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                                    Jelajahi Bira
                                </div>
                            </div>

                            <div style={{ padding: '28px 30px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#131e1b' }}>Tanjung Bira, Sulawesi Selatan</p>
                                    <p style={{ margin: '10px 0 0', fontSize: '14px', color: '#4f5f57', lineHeight: 1.7 }}>Temukan rute terbaik, pantai tersembunyi, dan highlights budaya lokal dalam satu tampilan peta yang bersih.</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                                    <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#f2faf7', color: '#006b5e', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pantai</div>
                                    <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#f7f7f9', color: '#3a4f5d', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Budaya</div>
                                    <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#f7f7f9', color: '#3a4f5d', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Kuliner</div>
                                    <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#f2faf7', color: '#006b5e', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Adventure</div>
                                </div>

                                <button style={{
                                    alignSelf: 'start',
                                    padding: '14px 24px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    backgroundColor: '#006b5e',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 16px 30px rgba(0, 107, 94, 0.18)'
                                }}>
                                    Mulai Jelajah
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof & Reviews */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, margin: 0 }}>Kisah Perjalanan</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                            {/* Testimonial 1 */}
                            <div className="glass-card-opaque p-md rounded-lg cinematic-shadow" style={{ padding: '24px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '2px', color: '#006b5e', marginBottom: '12px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>star</span>
                                    ))}
                                </div>
                                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#5c4039', lineHeight: 1.6, marginBottom: '20px', margin: 0 }}>
                                    "Tur menyaksikan matahari terbit di Phinisi benar-benar mengubah hidup. Menyaksikan matahari terbit di atas Laut Flores sambil menikmati kopi lokal adalah pengalaman yang sangat ajaib."
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#31fde1' }} />
                                    <div>
                                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>Sayyid Kamal Assegaf</p>
                                        <p style={{ margin: 0, fontSize: '11px', color: '#5c4039' }}>August 2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="glass-card-opaque p-md rounded-lg cinematic-shadow" style={{ padding: '24px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '2px', color: '#006b5e', marginBottom: '12px' }}>
                                    {[...Array(4)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>star</span>
                                    ))}
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>star_half</span>
                                </div>
                                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#5c4039', lineHeight: 1.6, marginBottom: '20px', margin: 0 }}>
                                    "Lokakarya tenun itu mengajari saya banyak hal tentang warisan Bugis. Alhamdulillah Pemandu kami sangat sabar dan berbakat."
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffdad3' }} />
                                    <div>
                                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>Gus Thoriq Ziyad</p>
                                        <p style={{ margin: 0, fontSize: '11px', color: '#5c4039' }}>July 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overall Rating card */}
                        <div className="glass-card-opaque cinematic-shadow" style={{
                            padding: '32px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(0,107,94,0.05)',
                            border: '1px solid rgba(0,107,94,0.15)',
                            textAlign: 'center',
                            marginTop: 'auto'
                        }}>
                            <p style={{ fontSize: '32px', fontWeight: 800, color: '#006b5e', margin: '0 0 4px 0' }}>4.9 / 5.0</p>
                            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#006b5e', opacity: 0.7, margin: '0 0 24px 0' }}>Berdasarkan 1,200+ ulasan tamu</p>
                            
                            {/* Avatars row */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img 
                                    alt="User avatar 1" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPcAXA0eYzzL17Th54MFeukGezfs_MywJXRz5voD5qJwlzolON7QnXsvc8Iq6iGZ0v0uH6SwkrlRGHVCTEVtUJl9tTHImFojRJ5RHLFMBfitcqVlU9GxXsEAFDd3NV1Ly706YkU0NRo5eeNyzkoOycCehlN4IaWkwSkqdpA15kg1Iul0UcARHS_A4CCWYdMIZV96TP6CfeBMpAAq0EXAzJy75Pya-nkOliPIyXMhPclsXTwb6IEsYM8d1iAv3sHDLozCzNOazqMZw"
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                />
                                <img 
                                    alt="User avatar 2" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1I8FrAojga6cGhmVHnpAcbLpWCCEsXXsl4oqH7SOh1JCylfSULQmP0Aimwd8nqzdXrFEJLv1FjEmB0REor0S9jKtXy3CayUY6mkutgAVgOBjfLfJKvJmS3GmhAJMkaBDq8N-rrcFLL6h2APGrmv4nqJI_yexXCZfiwYcZyLMo3eZYSclGIbbiRWK00gh_wYz2snjDrl5Xj2WKXsxoHp0FbZZIU86uRNMgYZdQrXSCRYXXafAg0Zb5N2IlCzhTT15wL6g6_Qjpr6E"
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginLeft: '-12px' }}
                                />
                                <img 
                                    alt="User avatar 3" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2JxX80OhTIoK2A2u7Sre5XN4zwGmwzhd3mu9ELafczcOIHmkfu4wgRlKScK7bMa1WRyEjt6TLqFD1jIUsCu5DFDj8hFLhioj6aUt0FPnPQZ4XLzUSQbQxw9eu1bIWOT7qJ771O6gWkCgTNDx-wpMMVw1cjCRtjjMe0jz6iltvlH-krAxkX8b9ygIhHkfUnZ1KtRdS6EYqYc9E0RWhCmBgfszjG-EDc5l6p_YwqlnApyJBO3vfERU1lbXDgiag_zMR7AGOLtLgTjc"
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginLeft: '-12px' }}
                                />
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: '#d9e5e0',
                                    border: '2px solid #ffffff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    marginLeft: '-12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: '#131e1b'
                                }}>+1k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* â”€â”€ Footer â”€â”€ */}
            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={() => {}}
                onNavigateCulture={onNavigateCulture}
                onNavigateJournal={onNavigateJournal}
            />
        </div>
    );
}

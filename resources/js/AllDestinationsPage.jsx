import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AllDestinationsPage({ onNavigateHome, onNavigateLogin, onNavigateRegister, onNavigateDestinations, onNavigateExperiences, onNavigateCulture, onNavigateJournal, onNavigateDestinationDetail, currentUser, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeRegion, setActiveRegion] = useState('Semua Wilayah');
    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter bar drag-to-scroll logic
    const filterRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - filterRef.current.offsetLeft);
        setScrollLeft(filterRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - filterRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        filterRef.current.scrollLeft = scrollLeft - walk;
    };

    const navLinkStyle = (active = false) => ({
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: active ? '#b32000' : '#5c4039',
        textDecoration: 'none',
        borderBottom: active ? '2px solid #b32000' : 'none',
        paddingBottom: active ? '4px' : '0',
        transition: 'color 0.3s',
        cursor: 'pointer',
    });

    const regions = [
        { name: 'Semua Wilayah', count: 6, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8' },
        { name: 'Toraja Utara', count: 1, image: 'https://lh3.googleusercontent.com/aida/AP1WRLvYeqrFdeRQkI8xbVEV6cMH7JOrbWRCkKLeIokvPZjE3C0Rt_Cpuu3EZPPXZHSP7NsyDJwqYBq3xbfpC8Evsj0zfYM91C0K5nH4gw3ztbX_7uTlLtptZ3KwNsdnihGdbwh05dY1uyPEOcY6ca540N0pzwYFAVw4hUU6ZBGRyeHPPA6Ga7Az_KCbMemzLl4yZmriqjNNRYNroAv0eayLwsKeh64oiv8hBdxp5OKmFkxK-2CAyjsmbB7FEQ' },
        { name: 'Bulukumba', count: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc' },
        { name: 'Maros', count: 2, image: 'https://lh3.googleusercontent.com/aida/AP1WRLuAOoMo5ZLRB3A-86TQtjsTOzYSz4VTp9k9zZ0nT-e0ahpUGZLIgDSVi9n7ImYc7VyVSLqSqj0elGRehztFNPTeaDjhGz3YEhbP60UBAdrrvwwE3wiFoeDbVyiynBzkiyfBt3fyAWIcZAmcXMB3re-hYUyl9chDZY3V5HIeGAyYrTu5uh9l8aFWjCj1rLQ4CmiQHjFFxvCH1Wc7hSlWZPg2IdbQI4-JJexQfrl5z7ORbZ1ToVwRtMwa1mc' },
        { name: 'Bone', count: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpd489SCZCN7osEY1vPx5f5LQF0gN9GRwcwNfsNvGhpFHBhJ3FT3qBSA6KRK91qtPCi2GPbIw2eJ1DqIges9EBOg0qPttMYeH_KJgeznyFTeuH36Pdab31tHRTqkaIp2Gi81qLeKhrdljbU0RsGCLKqNaBdiqh2zA0gNn3BWCaqm_K6m_aoNGvGj-jQfI1ZsxhYrvMAXrUUHQ6w2gyj8Hkuh2h1F_eEkGcQs5EQsMta0KRvsjHYZo3-UtY1GTsfvfp8WQ2jPbsI' }
    ];

    const destinations = [
        {
            id: 1,
            title: 'Kete Kesu Village',
            region: 'Toraja Utara',
            tag: 'WARISAN LELUHUR',
            desc: 'Desa adat berumur ratusan tahun dengan deretan tongkonan megah dan kuburan tebing bersejarah yang menakjubkan.',
            image: 'https://lh3.googleusercontent.com/aida/AP1WRLvYeqrFdeRQkI8xbVEV6cMH7JOrbWRCkKLeIokvPZjE3C0Rt_Cpuu3EZPPXZHSP7NsyDJwqYBq3xbfpC8Evsj0zfYM91C0K5nH4gw3ztbX_7uTlLtptZ3KwNsdnihGdbwh05dY1uyPEOcY6ca540N0pzwYFAVw4hUU6ZBGRyeHPPA6Ga7Az_KCbMemzLl4yZmriqjNNRYNroAv0eayLwsKeh64oiv8hBdxp5OKmFkxK-2CAyjsmbB7FEQ',
            featured: true
        },
        {
            id: 2,
            title: 'Hutan Karst Maros',
            region: 'Maros',
            tag: 'KEANEKARAGAMAN HAYATI',
            desc: 'Labirin batu kapur purba terindah kedua di dunia dengan aliran sungai yang tenang menyusuri gua-gua prasejarah.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KtwA3DqtQmGNYT0zf93pd0fulPEMYOz_WmFoXw70YEwqC6MWXhKMarSvYnWjjcRtSH3n1JfH_3yGCFhsKQlCYFz2q-D7rOqZehIqPKRj9Yv3WZyEJj1cXXfhgEKILTc1GheVjUE-aqOLi91YN4kouhd1WrRSQwe3LpV9Z-W7cm2Yiutz83ugleIhCzOHN7hf-nn9awE65vE_D5xafr1VDgMmA8xqKiV0_blNcKvds7DXEDhzJ24fMk3F9qOAs-i94_6l4kdnI8',
            featured: false
        },
        {
            id: 3,
            title: 'Pantai Tanjung Bira',
            region: 'Bulukumba',
            tag: 'PESONA PESISIR',
            desc: 'Hamparan pasir putih selembut tepung dengan gradasi warna air laut biru toska yang memanjakan mata.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAChlvmSARo8RJAp3UQjOtUYXO3LwvQFPmO1yjxfzhSuc96U7Qk-H01XARKly92BGXRN_JYh9hrLbhcZ-XKySsBW6eL6f1VTua6Pj2n8l0TjMzQCe9PXBpEADX3zulC6RqA3NctBaTVxu3WYMVT6AVMgJ0jetiZw97rWH9pqDWgUOmk_FP8ueecdRgRMsNmG_Hjy3QnqbykOCi4zWKXUbYnxmzgzOtNjnviDsiwuRXGAzt4nldxDqm8ZKqxdrxOj74LqqHolEvBzc',
            featured: false
        },
        {
            id: 4,
            title: 'Tebing Apparalang',
            region: 'Bulukumba',
            tag: 'TEBING MAHA DAHSYAT',
            desc: 'Kemegahan dinding tebing batu cadas berpadu birunya air laut lepas Flores yang eksotis dan memicu adrenalin.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB428y5rHMi0j0psH-XT3wj3gCWYo5gY68iXAqVfg1rV7nNpurpVPn2l2T-9rKhyF2krAK9SX6earjDU9vWo3WiOiwLWlFgopjKalHYmRW09oy6zJzFn0HodB9pE-Jl-NTmWhsPIwhCdBAlibPTi6voavov-7vyKlhG-I7DYXpnqE8t0xYGlXpmFqEGx3q3-mwktg-6DR5QXxvFjmT1h8RVZqFq1zIi_gnptl9CUMKai43qMFX6ctxDLQ7fGkb6jVSVfZzy47e_Tw',
            featured: false
        },
        {
            id: 5,
            title: 'Taman Purbakala Leang-Leang',
            region: 'Maros',
            tag: 'PRASEJARAH',
            desc: 'Situs lukisan telapak tangan gua purba berusia puluhan ribu tahun dari peradaban manusia prasejarah awal di Sulawesi.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeyTYN0gGp39FX9kFka9pq_LvmU1fXakF18AX2WQMHB7auwbLlOilicr3EusU8PU9BbjIT2pbz24i0AE6L1CPuOgONhbVSQOXLM6GJIlq2AIkqtksGxc8En3u3eNEsN_jG9tHyi8AWkckJvDQmrRMXNgLQtT_4TSWJXWYSd_-OkM_hcK7Iq3vul4NPlH0eCcdh_SMPJaVgfZWkvCIL2rvdrvOzvQLEhaNn0cByfvLLw1WGqmrzbk64qN3rmRuwH8hkVKYM1vxOO_8',
            featured: false
        },
        {
            id: 6,
            title: 'Gua Mampu Bone',
            region: 'Bone',
            tag: 'SEJARAH MISTIS',
            desc: 'Gua alam legendaris terluas di Sulawesi Selatan dengan formasi stalaktit dan stalagmit unik menyerupai legenda pemukiman kuno.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpd489SCZCN7osEY1vPx5f5LQF0gN9GRwcwNfsNvGhpFHBhJ3FT3qBSA6KRK91qtPCi2GPbIw2eJ1DqIges9EBOg0qPttMYeH_KJgeznyFTeuH36Pdab31tHRTqkaIp2Gi81qLeKhrdljbU0RsGCLKqNaBdiqh2zA0gNn3BWCaqm_K6m_aoNGvGj-jQfI1ZsxhYrvMAXrUUHQ6w2gyj8Hkuh2h1F_eEkGcQs5EQsMta0KRvsjHYZo3-UtY1GTsfvfp8WQ2jPbsI',
            featured: false
        }
    ];

    const filteredDestinations = activeRegion === 'Semua Wilayah'
        ? destinations
        : destinations.filter(d => d.region === activeRegion);

    return (
        <div className="gradient-mesh-bg" style={{ minHeight: '100vh', fontFamily: font, color: '#131e1b', display: 'flex', flexDirection: 'column' }}>
            
            <Navbar
                activePage="all-destinations"
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

            {/* â”€â”€ Main Content Area â”€â”€ */}
            <main style={{ flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '140px 64px 80px' }}>
                
                {/* Eyebrow & Title Section */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '2px', backgroundColor: '#006b5e' }}></div>
                        <span style={{
                            fontFamily: font,
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.20em',
                            textTransform: 'uppercase',
                            color: '#006b5e'
                        }}>Jelajahi per Wilayah</span>
                    </div>
                    <h1 style={{
                        fontFamily: font,
                        fontSize: '56px',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        color: '#131e1b',
                        margin: 0
                    }}>Semua Destinasi</h1>
                </div>

                {/* Filter Pills with Drag-to-Scroll */}
                <div 
                    ref={filterRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="no-scrollbar"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        overflowX: 'auto',
                        cursor: isDown ? 'grabbing' : 'grab',
                        paddingBottom: '24px',
                        marginBottom: '48px',
                        userSelect: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {regions.map(region => {
                        const isActive = activeRegion === region.name;
                        return (
                            <div
                                key={region.name}
                                onClick={() => setActiveRegion(region.name)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '8px 20px 8px 12px',
                                    borderRadius: '9999px',
                                    backgroundColor: isActive ? '#b32000' : '#eaf6f1',
                                    border: isActive ? '1px solid #b32000' : '1px solid rgba(0, 107, 94, 0.15)',
                                    color: isActive ? '#ffffff' : '#131e1b',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    boxShadow: isActive ? '0 10px 20px -5px rgba(179,32,0,0.3)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <img 
                                    src={region.image} 
                                    alt={region.name} 
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: isActive ? '1.5px solid #ffffff' : '1.5px solid transparent'
                                    }}
                                />
                                <span style={{
                                    fontFamily: font,
                                    fontSize: '14px',
                                    fontWeight: 600,
                                }}>{region.name}</span>
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    opacity: 0.6,
                                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                                    padding: '2px 6px',
                                    borderRadius: '9999px'
                                }}>{region.count}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Cards Grid */}
                <div 
                    className="all-dest-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px'
                    }}
                >
                    {filteredDestinations.map(dest => {
                        const isFeatured = dest.featured && activeRegion === 'Semua Wilayah';
                        return (
                            <div
                                key={dest.id}
                                className={`all-dest-card ${isFeatured ? 'all-dest-featured-card' : ''}`}
                                onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }}
                                style={{
                                    gridColumn: isFeatured ? 'span 2' : 'span 1',
                                    gridRow: isFeatured ? 'span 2' : 'span 1',
                                    height: isFeatured ? '800px' : 'auto',
                                    aspectRatio: isFeatured ? 'auto' : '4/5',
                                }}
                            >
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="all-dest-card-img"
                                />
                                <div className="all-dest-card-gradient" />
                                
                                {/* Glass Card Details */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    padding: isFeatured ? '48px' : '28px',
                                    boxSizing: 'border-box'
                                }}>
                                    <div className="glass-card" style={{
                                        padding: isFeatured ? '40px' : '24px',
                                        borderRadius: '16px',
                                        maxWidth: isFeatured ? '520px' : '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        <span style={{
                                            fontFamily: font,
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            letterSpacing: '0.20em',
                                            color: '#23F7DB',
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>{dest.tag}</span>
                                        <h3 style={{
                                            fontFamily: font,
                                            fontSize: isFeatured ? '36px' : '22px',
                                            fontWeight: 700,
                                            letterSpacing: '-0.02em',
                                            color: '#ffffff',
                                            margin: '0 0 12px 0',
                                            lineHeight: 1.2
                                        }}>{dest.title}</h3>
                                        
                                        {/* Description (collapsible hover reveal on standard, static/animated on featured) */}
                                        <p 
                                            className={isFeatured ? '' : 'all-dest-card-desc'}
                                            style={{
                                                fontFamily: font,
                                                fontSize: '14px',
                                                lineHeight: 1.5,
                                                color: 'rgba(255,255,255,0.85)',
                                                margin: '0 0 20px 0'
                                            }}
                                        >
                                            {dest.desc}
                                        </p>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{
                                                fontFamily: font,
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                letterSpacing: '0.15em',
                                                color: '#ffffff',
                                                textTransform: 'uppercase'
                                            }}>{dest.region}</span>
                                            
                                            <div className="glass-card-btn">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* â”€â”€ Footer â”€â”€ */}
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

import React, { useState } from 'react';
import { sulselRegencies } from './constants/sulselRegencies';

const font = "'Plus Jakarta Sans', sans-serif";

// Province data
const provinces = [
    {
        id: 'sulsel',
        name: 'Sulawesi Selatan',
        capital: 'Makassar',
        highlight: true,
        description: 'Gerbang utama menuju keajaiban Sulawesi. Rumah bagi Tana Toraja, Karst Maros-Pangkep, Pantai Tanjung Bira, dan Kepulauan Selayar.',
    },
    {
        id: 'sulbar',
        name: 'Sulawesi Barat',
        capital: 'Mamuju',
        highlight: false,
        description: 'Provinsi termuda di Sulawesi dengan pesona alam pegunungan dan pantai yang masih alami.',
    },
    {
        id: 'sulteng',
        name: 'Sulawesi Tengah',
        capital: 'Palu',
        highlight: false,
        description: 'Taman Nasional Lore Lindu dan Kepulauan Togean yang memukau.',
    },
    {
        id: 'sulut',
        name: 'Sulawesi Utara',
        capital: 'Manado',
        highlight: false,
        description: 'Surga penyelam dengan Taman Laut Bunaken yang terkenal di dunia.',
    },
    {
        id: 'gorontalo',
        name: 'Gorontalo',
        capital: 'Gorontalo',
        highlight: false,
        description: 'Bumi Serambi Madinah dengan kearifan lokal dan alam yang memesona.',
    },
    {
        id: 'sultra',
        name: 'Sulawesi Tenggara',
        capital: 'Kendari',
        highlight: false,
        description: 'Rumah bagi Wakatobi, surga bawah laut yang mendunia.',
    },
];

/*
 * Geographically accurate SVG paths for Sulawesi provinces.
 * Scaled and centered to fit within a 0 0 500 550 viewBox.
 */
const provincePaths = {
    sulteng: "M 110.2,250.3 L 111.6,262.1 L 104.5,271.3 L 115.5,275.7 L 115.0,280.1 L 123.5,290.2 L 123.4,300.3 L 132.1,297.3 L 141.3,301.1 L 146.9,298.6 L 160.7,309.8 L 176.3,311.5 L 176.2,316.6 L 191.7,317.2 L 205.2,326.9 L 200.3,337.9 L 225.5,346.5 L 227.6,353.8 L 235.1,349.9 L 225.1,343.3 L 228.1,338.8 L 214.8,330.2 L 206.9,312.0 L 195.2,306.7 L 189.3,295.7 L 186.2,298.9 L 184.6,290.7 L 200.6,297.2 L 207.8,286.6 L 231.0,277.9 L 248.7,254.2 L 261.5,249.8 L 268.1,258.3 L 272.1,258.2 L 275.8,244.7 L 268.3,238.8 L 259.5,238.1 L 246.2,243.0 L 255.4,246.3 L 223.0,247.7 L 218.7,255.2 L 212.1,256.6 L 202.4,254.8 L 198.7,248.5 L 186.0,259.6 L 175.9,275.5 L 164.1,271.9 L 157.8,274.5 L 150.6,256.6 L 146.5,253.5 L 142.2,255.3 L 132.6,243.5 L 130.3,217.3 L 134.7,205.8 L 144.9,194.4 L 156.6,191.8 L 175.1,197.1 L 186.0,193.8 L 185.7,189.5 L 178.7,185.5 L 181.0,180.3 L 208.6,171.7 L 215.0,175.2 L 222.7,169.7 L 195.2,168.6 L 189.6,163.4 L 191.5,158.3 L 182.6,161.5 L 167.5,156.2 L 163.5,157.5 L 163.5,170.1 L 156.1,173.9 L 154.2,181.7 L 146.0,180.3 L 141.1,171.9 L 138.8,180.2 L 130.7,183.6 L 130.9,192.2 L 124.0,194.4 L 124.7,204.8 L 119.7,204.4 L 123.8,210.8 L 122.2,218.2 L 112.1,214.5 L 115.0,219.1 L 120.8,219.9 L 118.6,235.0 L 123.7,251.0 L 117.2,242.3 L 110.2,250.3 Z M 200.2,238.6 L 203.1,235.2 L 209.5,237.1 L 210.7,232.9 L 203.9,232.3 L 200.2,238.6 Z M 213.3,232.1 L 216.9,228.9 L 208.4,230.2 L 213.3,232.1 Z M 230.7,229.7 L 230.7,226.2 L 224.1,223.2 L 230.7,229.7 Z M 262.3,368.3 L 263.9,366.1 L 258.9,367.6 L 262.3,368.3 Z M 252.0,282.4 L 262.9,269.5 L 265.0,278.7 L 261.3,282.4 L 267.4,284.5 L 268.0,275.7 L 276.6,278.9 L 280.8,268.6 L 272.6,266.5 L 267.6,273.4 L 265.1,263.2 L 253.3,264.5 L 248.0,275.9 L 252.0,282.4 Z M 278.0,286.9 L 283.2,286.6 L 280.3,277.6 L 278.0,286.9 Z",
    sulbar: "M 110.2,250.3 L 99.2,268.4 L 98.3,286.2 L 101.7,293.5 L 95.3,299.4 L 92.1,319.8 L 83.0,327.6 L 78.7,326.0 L 75.9,333.0 L 76.4,336.5 L 81.2,337.1 L 76.8,345.7 L 82.3,364.6 L 86.0,366.2 L 99.5,360.4 L 106.5,363.6 L 102.8,351.5 L 113.3,346.9 L 110.9,331.7 L 118.2,330.0 L 118.8,324.4 L 115.2,311.4 L 123.4,300.3 L 123.5,290.2 L 115.0,280.1 L 115.5,275.7 L 104.5,271.3 L 111.6,262.1 L 110.2,250.3 Z",
    sulsel: "M 168.4,525.1 L 162.9,524.6 L 174.4,525.9 L 168.4,525.1 Z M 162.0,518.1 L 155.4,513.3 L 156.1,518.5 L 162.0,518.1 Z M 147.8,478.6 L 149.5,491.2 L 153.2,472.7 L 150.2,460.5 L 147.8,478.6 Z M 106.5,363.6 L 105.6,372.7 L 113.3,383.5 L 113.4,398.5 L 106.8,417.0 L 108.6,424.4 L 101.4,441.5 L 104.1,451.5 L 116.3,457.6 L 125.9,451.0 L 134.5,452.7 L 142.3,449.3 L 148.8,453.6 L 140.5,433.7 L 142.0,422.0 L 148.2,413.0 L 143.8,403.1 L 143.4,388.8 L 147.7,374.1 L 146.9,353.5 L 139.9,349.1 L 137.1,341.1 L 161.0,326.1 L 175.1,329.4 L 172.1,336.5 L 175.2,332.5 L 188.3,342.8 L 200.3,337.9 L 205.2,326.9 L 191.7,317.2 L 176.2,316.6 L 176.2,316.6 L 176.3,311.5 L 160.7,309.8 L 146.9,298.6 L 141.3,301.1 L 132.1,297.3 L 123.4,300.3 L 115.2,311.4 L 118.8,324.4 L 118.2,330.0 L 110.9,331.7 L 113.3,346.9 L 102.8,351.5 L 106.5,363.6 Z M 175.9,530.0 L 178.7,528.0 L 175.2,526.0 L 175.9,530.0 Z",
    gorontalo: "M 186.0,193.8 L 194.0,190.6 L 206.4,196.1 L 231.3,191.9 L 259.8,192.5 L 268.5,200.3 L 277.3,200.4 L 279.9,189.5 L 268.8,184.2 L 268.7,179.8 L 262.3,174.6 L 254.5,173.1 L 249.8,179.1 L 233.7,170.0 L 222.7,169.7 L 215.0,175.2 L 208.6,171.7 L 181.0,180.3 L 178.7,185.5 L 185.7,189.5 L 186.0,193.8 Z",
    sultra: "M 207.6,441.9 L 212.1,448.3 L 216.4,447.0 L 217.0,436.4 L 212.6,430.2 L 207.6,432.2 L 207.6,441.9 Z M 172.1,336.5 L 175.5,338.9 L 174.0,350.1 L 165.9,360.8 L 166.6,364.8 L 186.4,384.4 L 197.7,387.7 L 191.8,413.6 L 200.9,421.2 L 215.3,423.0 L 218.3,420.1 L 217.2,410.0 L 223.8,405.4 L 239.5,401.8 L 246.0,406.7 L 243.2,398.8 L 249.4,403.8 L 252.5,401.9 L 250.9,387.9 L 243.4,391.7 L 242.5,385.2 L 237.4,383.5 L 242.8,380.5 L 236.8,380.4 L 233.3,374.2 L 222.7,368.1 L 226.3,365.8 L 226.4,357.7 L 230.6,361.3 L 227.6,353.8 L 225.5,346.5 L 200.3,337.9 L 188.3,342.8 L 175.2,332.5 L 172.1,336.5 Z M 228.5,444.5 L 230.8,441.3 L 234.1,444.8 L 236.8,439.4 L 236.6,446.3 L 241.7,442.8 L 239.5,434.4 L 247.1,423.3 L 244.2,411.2 L 228.0,420.4 L 230.7,431.4 L 225.7,441.6 L 228.5,444.5 Z M 238.9,450.5 L 241.6,457.3 L 244.4,454.5 L 247.9,457.6 L 252.6,451.7 L 251.6,447.0 L 266.4,440.5 L 258.9,433.7 L 253.7,435.1 L 258.3,417.5 L 263.0,415.8 L 266.2,421.6 L 260.5,400.6 L 251.4,407.4 L 246.5,429.0 L 246.3,436.9 L 249.0,437.0 L 242.4,441.4 L 238.9,450.5 Z M 282.4,444.1 L 284.6,440.3 L 279.8,438.2 L 282.4,444.1 Z M 260.9,418.9 L 258.7,420.5 L 261.9,421.1 L 260.9,418.9 Z M 254.6,389.3 L 262.2,396.0 L 268.1,388.9 L 257.6,384.0 L 254.6,389.3 Z M 297.0,460.8 L 299.6,460.5 L 295.7,458.4 L 297.0,460.8 Z"
};

// Label positions for each province
const labelPositions = {
    sulteng: { x: 195, y: 252 },
    sulbar: { x: 101, y: 314 },
    sulsel: { x: 146, y: 407 },
    gorontalo: { x: 229, y: 185 },
    sultra: { x: 236, y: 412 },
    sulut: { x: 355, y: 111 }
};

/*
 * Detailed SVG paths for individual regencies within South Sulawesi.
 * Structured to seamlessly overlay and align with the original province path
 * when zoomed into coordinates X: 90 to 220, Y: 290 to 540.
 */
const regencyPaths = {
    "tana-toraja": "M 123.4,300.3 L 132.1,297.3 L 141.3,301.1 L 146.9,298.6 L 160.7,309.8 L 176.3,311.5 L 168.0,325.0 L 145.0,325.0 L 132.0,312.0 Z",
    "luwu": "M 176.3,311.5 L 191.7,317.2 L 205.2,326.9 L 200.3,337.9 L 188.3,342.8 L 175.2,332.5 L 172.1,336.5 L 168.0,325.0 Z",
    "pangkep": "M 115.2,311.4 L 123.4,300.3 L 132.0,312.0 L 145.0,325.0 L 137.1,341.1 L 139.9,349.1 L 120.0,345.0 L 118.8,324.4 Z",
    "bone": "M 145.0,325.0 L 168.0,325.0 L 175.2,332.5 L 188.3,342.8 L 175.1,329.4 L 161.0,326.1 L 146.9,353.5 L 143.4,388.8 L 135.0,380.0 L 139.9,349.1 Z",
    "maros": "M 118.8,324.4 L 120.0,345.0 L 139.9,349.1 L 135.0,380.0 L 125.0,375.0 L 125.0,398.5 L 113.4,398.5 L 113.3,383.5 L 105.6,372.7 L 106.5,363.6 L 102.8,351.5 L 110.9,331.7 L 118.2,330.0 L 118.8,324.4 Z",
    "gowa": "M 113.4,398.5 L 125.0,398.5 L 135.0,410.0 L 142.3,449.3 L 134.5,452.7 L 125.9,451.0 L 120.0,430.0 L 106.8,417.0 Z",
    "makassar": "M 101.4,441.5 L 104.1,451.5 L 116.3,457.6 L 125.9,451.0 L 120.0,430.0 L 106.8,417.0 L 108.6,424.4 Z",
    "bulukumba": "M 142.3,449.3 L 148.8,453.6 L 140.5,433.7 L 142.0,422.0 L 148.2,413.0 L 143.8,403.1 L 143.4,388.8 L 147.7,374.1 L 146.9,353.5 L 135.0,380.0 L 135.0,410.0 Z",
    "selayar": "M 147.8,478.6 L 149.5,491.2 L 153.2,472.7 L 150.2,460.5 L 147.8,478.6 Z M 162.0,518.1 L 155.4,513.3 L 156.1,518.5 L 162.0,518.1 Z M 175.9,530.0 L 178.7,528.0 L 175.2,526.0 L 175.9,530.0 Z"
};

// Hand-curated neat alternating soft color scheme for South Sulawesi regencies
const regencyColors = {
    "tana-toraja": "#c2e9de",
    "luwu": "#b4e5d8",
    "pangkep": "#d0ece3",
    "bone": "#a7e1d3",
    "maros": "#b4e5d8",
    "gowa": "#c2e9de",
    "makassar": "#d0ece3",
    "bulukumba": "#a7e1d3",
    "selayar": "#b4e5d8"
};

// Scaled label coordinates for regencies when zoomed in
const regencyLabelPositions = {
    "tana-toraja": { x: 144, y: 312 },
    "luwu": { x: 186, y: 328 },
    "pangkep": { x: 128, y: 332 },
    "bone": { x: 165, y: 352 },
    "maros": { x: 122, y: 374 },
    "makassar": { x: 111, y: 432 },
    "gowa": { x: 128, y: 418 },
    "bulukumba": { x: 145, y: 408 },
    "selayar": { x: 162, y: 494 }
};

export default function SulawesiMapSection({ onNavigateDestinationDetail }) {
    const [hoveredProvince, setHoveredProvince] = useState(null);
    const [isZoomedToSulsel, setIsZoomedToSulsel] = useState(false);
    const [activeRegencyId, setActiveRegencyId] = useState(null);
    const [hoveredRegencyId, setHoveredRegencyId] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [sectionVisible, setSectionVisible] = useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
            { threshold: 0.15 }
        );
        const el = document.getElementById('sulawesi-map-section');
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    const getProvince = (id) => provinces.find(p => p.id === id);
    const activeProvince = hoveredProvince ? getProvince(hoveredProvince) : getProvince('sulsel');

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const getFill = (id, isHovered) => {
        if (id === 'sulsel') return isHovered ? '#00897b' : '#006b5e';
        return isHovered ? '#9cc0b4' : '#c8ddd7';
    };

    return (
        <section
            id="sulawesi-map-section"
            style={{
                padding: '60px 48px',
                backgroundColor: '#f0fcf7',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle dot pattern */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'radial-gradient(circle at 1px 1px, #006b5e 1px, transparent 0)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1340px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* ── Header ── */}
                <div style={{
                    textAlign: 'center', marginBottom: '56px',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity .8s ease, transform .8s ease',
                }}>
                    <span style={{
                        fontFamily: font, fontSize: '12px', fontWeight: 700,
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                        color: '#006b5e', display: 'block', marginBottom: '16px',
                    }}>
                        {isZoomedToSulsel ? 'Eksplorasi Detail Wilayah' : 'Temukan destinasi dan atraksi terbaik'}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                        <div style={{ flex: 1, maxWidth: '180px', height: '2px', background: 'linear-gradient(to right, transparent, #131e1b)' }} />
                        <h2 style={{
                            fontFamily: font, fontSize: '44px', fontWeight: 800,
                            letterSpacing: '-0.03em', color: '#131e1b', whiteSpace: 'nowrap',
                        }}>
                            {isZoomedToSulsel ? 'Sulawesi Selatan' : 'Jelajahi Sulawesi'}
                        </h2>
                        <div style={{ flex: 1, maxWidth: '180px', height: '2px', background: 'linear-gradient(to left, transparent, #131e1b)' }} />
                    </div>
                </div>

                {/* ── Map + Info ── */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1.2fr 360px',
                    gap: '32px', alignItems: 'center',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 1s ease .3s, transform 1s ease .3s',
                }}>
                    {/* ── SVG Map Container ── */}
                    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '40px' }} onMouseMove={handleMouseMove}>
                        <svg 
                            viewBox="70 15 360 520" 
                            style={{
                                width: '100%', height: 'auto', maxHeight: '580px',
                                filter: 'drop-shadow(0 16px 32px rgba(0,107,94,0.08))',
                                display: 'block',
                            }}
                        >
                            <defs>
                                <filter id="glow-sulsel" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="5" result="b" />
                                    <feFlood floodColor="#006b5e" floodOpacity="0.35" result="c" />
                                    <feComposite in="c" in2="b" operator="in" result="g" />
                                    <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <filter id="glow-hover" x="-15%" y="-15%" width="130%" height="130%">
                                    <feGaussianBlur stdDeviation="3.5" result="b" />
                                    <feFlood floodColor="#9cc0b4" floodOpacity="0.45" result="c" />
                                    <feComposite in="c" in2="b" operator="in" result="g" />
                                    <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <filter id="glow-regency" x="-10%" y="-10%" width="120%" height="120%">
                                    <feGaussianBlur stdDeviation="2" result="b" />
                                    <feFlood floodColor="#23F7DB" floodOpacity="0.5" result="c" />
                                    <feComposite in="c" in2="b" operator="in" result="g" />
                                    <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>

                            {/* Main Animated Group: Transitions scale and translate smoothly via GPU acceleration */}
                            <g
                                style={{
                                    transform: isZoomedToSulsel ? 'translate(-110px, -721px) scale(2.4)' : 'translate(0px, 0px) scale(1)',
                                    transformOrigin: '0px 0px',
                                    transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                            >
                                {/* Base Province Paths */}
                                {Object.entries(provincePaths).map(([id, d]) => {
                                    const isHovered = hoveredProvince === id;
                                    const isSulsel = id === 'sulsel';
                                    const label = labelPositions[id];
                                    
                                    // Dynamic styling depending on whether the map is zoomed in
                                    const provinceOpacity = isZoomedToSulsel 
                                        ? (isSulsel ? 0 : 0.02) 
                                        : 1;
                                    const pointerEvents = isZoomedToSulsel ? 'none' : 'auto';

                                    return (
                                        <g key={id} style={{ opacity: provinceOpacity, transition: 'opacity 0.6s ease' }}>
                                            <path
                                                d={d}
                                                fill={getFill(id, isHovered)}
                                                stroke={isSulsel ? '#004d40' : '#a0bfb5'}
                                                strokeWidth={isSulsel ? 2 : 1}
                                                strokeLinejoin="round"
                                                filter={isSulsel ? 'url(#glow-sulsel)' : (isHovered ? 'url(#glow-hover)' : 'none')}
                                                style={{ cursor: 'pointer', transition: 'fill .35s ease', pointerEvents }}
                                                onMouseEnter={() => setHoveredProvince(id)}
                                                onMouseLeave={() => setHoveredProvince(null)}
                                                onClick={() => {
                                                    if (isSulsel) {
                                                        setIsZoomedToSulsel(true);
                                                        setActiveRegencyId('bulukumba');
                                                    }
                                                }}
                                            />
                                            {/* Label */}
                                            <text
                                                x={label.x} y={label.y}
                                                textAnchor="middle" dominantBaseline="middle"
                                                style={{
                                                    fontFamily: font,
                                                    fontSize: isSulsel ? '14px' : '11px',
                                                    fontWeight: isSulsel ? 800 : 600,
                                                    fill: isSulsel ? '#fff' : '#4a6b60',
                                                    pointerEvents: 'none',
                                                    letterSpacing: '0.03em',
                                                }}
                                            >
                                                {id === 'sulsel' ? 'Sulawesi Selatan' :
                                                 id === 'sulbar' ? 'Sul. Barat' :
                                                 id === 'sulteng' ? 'Sul. Tengah' :
                                                 id === 'sulut' ? 'Sul. Utara' :
                                                 id === 'gorontalo' ? 'Gorontalo' :
                                                 'Sul. Tenggara'}
                                            </text>
                                            {/* Sulsel pulsing pin */}
                                            {isSulsel && (
                                                <>
                                                    <circle cx={label.x} cy={label.y - 24} r="4.5" fill="#b32000" stroke="#fff" strokeWidth="1.8" style={{ pointerEvents: 'none' }}>
                                                        <animate attributeName="r" values="4.5;7;4.5" dur="2.2s" repeatCount="indefinite" />
                                                        <animate attributeName="opacity" values="1;.55;1" dur="2.2s" repeatCount="indefinite" />
                                                    </circle>
                                                    <circle cx={label.x} cy={label.y - 24} r="10" fill="none" stroke="#b32000" strokeWidth="1.2" opacity=".35" style={{ pointerEvents: 'none' }}>
                                                        <animate attributeName="r" values="7;16;7" dur="2.2s" repeatCount="indefinite" />
                                                        <animate attributeName="opacity" values=".35;0;.35" dur="2.2s" repeatCount="indefinite" />
                                                    </circle>
                                                </>
                                            )}
                                        </g>
                                    );
                                })}

                                {/* Detailed South Sulawesi Regency Paths (Fades in smoothly) */}
                                <g style={{ opacity: isZoomedToSulsel ? 1 : 0, transition: 'opacity 0.6s ease', pointerEvents: isZoomedToSulsel ? 'auto' : 'none' }}>
                                    {Object.entries(regencyPaths).map(([id, d]) => {
                                        const isRegencyHovered = hoveredRegencyId === id;
                                        const isRegencyActive = activeRegencyId === id;
                                        
                                        // Curated colors for clean layout contrast
                                        let fill = regencyColors[id] || '#c8e6c9';
                                        if (isRegencyActive) {
                                            fill = '#004d40'; // Active selection: deep dark forest green
                                        } else if (isRegencyHovered) {
                                            fill = '#00897b'; // Hovered: vibrant teal
                                        }

                                        return (
                                            <g key={id}>
                                                <path
                                                    d={d}
                                                    fill={fill}
                                                    stroke={isRegencyActive ? '#23F7DB' : '#fff'}
                                                    strokeWidth={isRegencyActive ? 1.2 : 0.5}
                                                    strokeLinejoin="round"
                                                    filter={isRegencyActive ? 'url(#glow-regency)' : 'none'}
                                                    style={{ cursor: 'pointer', transition: 'fill .3s ease, stroke .3s ease' }}
                                                    onMouseEnter={() => setHoveredRegencyId(id)}
                                                    onMouseLeave={() => setHoveredRegencyId(null)}
                                                    onClick={() => setActiveRegencyId(id)}
                                                />
                                                {/* Regency Label - scaled for zoomed in coordinate space */}
                                                {regencyLabelPositions[id] && (
                                                    <text
                                                        x={regencyLabelPositions[id].x}
                                                        y={regencyLabelPositions[id].y}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                        style={{
                                                            fontFamily: font,
                                                            fontSize: '4.8px',
                                                            fontWeight: isRegencyActive ? 800 : 600,
                                                            fill: isRegencyActive ? '#fff' : '#1b3a32',
                                                            pointerEvents: 'none',
                                                            textShadow: '0.4px 0.4px 0px rgba(255,255,255,0.75)',
                                                        }}
                                                    >
                                                        {id === 'tana-toraja' ? 'Toraja' :
                                                         id === 'luwu' ? 'Luwu' :
                                                         id === 'pangkep' ? 'Pangkep' :
                                                         id === 'bone' ? 'Bone' :
                                                         id === 'maros' ? 'Maros' :
                                                         id === 'makassar' ? 'Makassar' :
                                                         id === 'gowa' ? 'Gowa' :
                                                         id === 'bulukumba' ? 'Bira' :
                                                         id === 'selayar' ? 'Selayar' : ''}
                                                    </text>
                                                )}
                                            </g>
                                        );
                                    })}
                                </g>
                            </g>
                        </svg>

                        {/* Floating Back Button on Map */}
                        {isZoomedToSulsel && (
                            <button
                                onClick={() => {
                                    setIsZoomedToSulsel(false);
                                    setActiveRegencyId(null);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '24px',
                                    left: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    border: '1px solid rgba(0,107,94,.15)',
                                    borderRadius: '30px',
                                    padding: '10px 18px',
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: '#006b5e',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 24px rgba(0,107,94,0.12)',
                                    transition: 'all .25s ease',
                                    zIndex: 20,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#006b5e';
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                                    e.currentTarget.style.color = '#006b5e';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                                Kembali ke Peta Sulawesi
                            </button>
                        )}

                        {/* Province Tooltip (Zoomed Out) */}
                        {!isZoomedToSulsel && hoveredProvince && (
                            <div style={{
                                position: 'absolute',
                                left: Math.min(tooltipPos.x + 18, 320),
                                top: tooltipPos.y - 8,
                                background: 'rgba(19,30,27,.92)',
                                backdropFilter: 'blur(14px)',
                                color: '#fff', padding: '10px 16px', borderRadius: '10px',
                                pointerEvents: 'none', zIndex: 50,
                                border: '1px solid rgba(255,255,255,.08)',
                                boxShadow: '0 10px 28px rgba(0,0,0,.28)',
                                maxWidth: '200px',
                            }}>
                                <p style={{
                                    fontFamily: font, fontSize: '13px', fontWeight: 700, marginBottom: '2px',
                                    color: getProvince(hoveredProvince)?.highlight ? '#23F7DB' : '#fff',
                                }}>{getProvince(hoveredProvince)?.name}</p>
                                <p style={{
                                    fontFamily: font, fontSize: '11px', color: 'rgba(255,255,255,.55)', lineHeight: 1.3,
                                }}>Ibu kota: {getProvince(hoveredProvince)?.capital}</p>
                            </div>
                        )}

                        {/* Regency Tooltip (Zoomed In) */}
                        {isZoomedToSulsel && hoveredRegencyId && (
                            <div style={{
                                position: 'absolute',
                                left: Math.min(tooltipPos.x + 18, 320),
                                top: tooltipPos.y - 8,
                                background: 'rgba(19,30,27,.92)',
                                backdropFilter: 'blur(14px)',
                                color: '#fff', padding: '10px 16px', borderRadius: '10px',
                                pointerEvents: 'none', zIndex: 50,
                                border: '1px solid rgba(255,255,255,.08)',
                                boxShadow: '0 10px 28px rgba(0,0,0,.28)',
                                maxWidth: '220px',
                            }}>
                                <p style={{
                                    fontFamily: font, fontSize: '13px', fontWeight: 700, marginBottom: '2px',
                                    color: '#23F7DB',
                                }}>{sulselRegencies[hoveredRegencyId]?.name}</p>
                                <p style={{
                                    fontFamily: font, fontSize: '11px', color: 'rgba(255,255,255,.65)', lineHeight: 1.3,
                                }}>Destinasi: {sulselRegencies[hoveredRegencyId]?.destinations?.map(d => d.name).join(', ') || 'Segera hadir'}</p>
                            </div>
                        )}
                    </div>

                    {/* ── Right Info Panel ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        {!isZoomedToSulsel ? (
                            <>
                                {/* Province Detail Card */}
                                <div style={{
                                    background: activeProvince?.highlight
                                        ? 'linear-gradient(135deg, #006b5e, #004d44)'
                                        : '#ffffff',
                                    borderRadius: '20px', padding: '36px',
                                    boxShadow: activeProvince?.highlight
                                        ? '0 24px 48px -10px rgba(0,107,94,.35)'
                                        : '0 8px 24px -6px rgba(0,0,0,.06)',
                                    border: activeProvince?.highlight
                                        ? '1px solid rgba(35,247,219,.25)'
                                        : '1px solid rgba(0,0,0,.05)',
                                    transition: 'all .45s ease',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                        <span className="material-symbols-outlined" style={{
                                            fontSize: '18px',
                                            color: activeProvince?.highlight ? '#23F7DB' : '#006b5e',
                                            backgroundColor: activeProvince?.highlight ? 'rgba(35,247,219,.12)' : 'rgba(0,107,94,.08)',
                                            padding: '7px', borderRadius: '10px',
                                        }}>location_on</span>
                                        <span style={{
                                            fontFamily: font, fontSize: '11px', fontWeight: 700,
                                            letterSpacing: '.18em', textTransform: 'uppercase',
                                            color: activeProvince?.highlight ? 'rgba(255,255,255,.6)' : '#006b5e',
                                        }}>Provinsi Terpilih</span>
                                    </div>

                                    <h3 style={{
                                        fontFamily: font, fontSize: '26px', fontWeight: 800,
                                        letterSpacing: '-0.02em', marginBottom: '6px',
                                        color: activeProvince?.highlight ? '#fff' : '#131e1b',
                                        transition: 'color .3s',
                                    }}>{activeProvince?.name}</h3>

                                    <p style={{
                                        fontFamily: font, fontSize: '12px', marginBottom: '14px',
                                        color: activeProvince?.highlight ? 'rgba(255,255,255,.45)' : '#8a7a72',
                                    }}>Ibu Kota: {activeProvince?.capital}</p>

                                    <p style={{
                                        fontFamily: font, fontSize: '14px', lineHeight: 1.7,
                                        color: activeProvince?.highlight ? 'rgba(255,255,255,.82)' : '#5c4039',
                                    }}>{activeProvince?.description}</p>

                                    {activeProvince?.highlight && (
                                        <div style={{
                                            marginTop: '20px', padding: '10px 16px',
                                            background: 'rgba(35,247,219,.08)', borderRadius: '10px',
                                            border: '1px solid rgba(35,247,219,.18)',
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                        }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#23F7DB' }}>auto_awesome</span>
                                            <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, color: '#23F7DB' }}>
                                                Klik untuk perbesar wilayah detail!
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Province List Chips */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    {provinces.map((p) => (
                                        <div
                                            key={p.id}
                                            onMouseEnter={() => setHoveredProvince(p.id)}
                                            onMouseLeave={() => setHoveredProvince(null)}
                                            onClick={() => {
                                                if (p.id === 'sulsel') {
                                                    setIsZoomedToSulsel(true);
                                                    setActiveRegencyId('bulukumba');
                                                }
                                            }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                padding: '10px 14px', borderRadius: '12px', cursor: 'pointer',
                                                background: hoveredProvince === p.id
                                                    ? (p.highlight ? 'rgba(0,107,94,.1)' : 'rgba(0,0,0,.04)')
                                                    : 'transparent',
                                                border: p.highlight ? '1px solid rgba(0,107,94,.18)' : '1px solid transparent',
                                                transition: 'background .25s ease',
                                            }}
                                        >
                                            <div style={{
                                                width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0,
                                                backgroundColor: p.highlight ? '#006b5e' : '#c8ddd7',
                                                boxShadow: p.highlight ? '0 0 6px rgba(0,107,94,.4)' : 'none',
                                            }} />
                                            <span style={{
                                                fontFamily: font, fontSize: '12px',
                                                fontWeight: p.highlight ? 700 : 500,
                                                color: p.highlight ? '#006b5e' : '#5c4039',
                                            }}>{p.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Regency Detail Card */}
                                {(() => {
                                    const regencyData = sulselRegencies[activeRegencyId] || sulselRegencies['bulukumba'];
                                    return (
                                        <div style={{
                                            background: '#ffffff',
                                            borderRadius: '20px', padding: '30px',
                                            boxShadow: '0 8px 24px -6px rgba(0,0,0,.06)',
                                            border: '1px solid rgba(0,107,94,.1)',
                                            transition: 'all .45s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                        }}>
                                            {/* Image Header with smooth loading */}
                                            <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: '12px', overflow: 'hidden' }}>
                                                <img
                                                    src={regencyData.image}
                                                    alt={regencyData.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <div style={{
                                                    position: 'absolute', inset: 0,
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)'
                                                }} />
                                            </div>

                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                    <span className="material-symbols-outlined" style={{
                                                        fontSize: '16px', color: '#006b5e',
                                                        backgroundColor: 'rgba(0,107,94,.08)',
                                                        padding: '6px', borderRadius: '8px',
                                                    }}>explore</span>
                                                    <span style={{
                                                        fontFamily: font, fontSize: '10px', fontWeight: 700,
                                                        letterSpacing: '.18em', textTransform: 'uppercase', color: '#006b5e',
                                                    }}>Kabupaten / Kota</span>
                                                </div>

                                                <h3 style={{
                                                    fontFamily: font, fontSize: '24px', fontWeight: 800,
                                                    letterSpacing: '-0.02em', color: '#131e1b', margin: 0
                                                }}>{regencyData.name}</h3>
                                            </div>

                                            {/* Tags */}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {regencyData.tags.map((tag, i) => (
                                                    <span key={i} style={{
                                                        fontFamily: font, fontSize: '11px', fontWeight: 600,
                                                        backgroundColor: 'rgba(0,107,94,.08)', color: '#006b5e',
                                                        padding: '4px 10px', borderRadius: '30px',
                                                    }}>{tag}</span>
                                                ))}
                                            </div>

                                            <p style={{
                                                fontFamily: font, fontSize: '13px', lineHeight: 1.6,
                                                color: '#5c4039', margin: 0,
                                            }}>{regencyData.description}</p>

                                            {/* Destinations List */}
                                            <div>
                                                <h4 style={{
                                                    fontFamily: font, fontSize: '11px', fontWeight: 700,
                                                    color: '#8a7a72', textTransform: 'uppercase',
                                                    letterSpacing: '.08em', marginBottom: '10px',
                                                }}>Destinasi Rekomendasi</h4>
                                                
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {regencyData.destinations && regencyData.destinations.map((dest, i) => (
                                                        <div key={i} style={{
                                                            padding: '12px 14px',
                                                            borderRadius: '10px',
                                                            backgroundColor: '#f0fcf7',
                                                            border: '1px solid rgba(0,107,94,.08)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}>
                                                            <div>
                                                                <h5 style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, color: '#131e1b', margin: 0 }}>{dest.name}</h5>
                                                                <p style={{ fontFamily: font, fontSize: '10px', color: '#8a7a72', margin: '2px 0 0' }}>{dest.type}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    if (onNavigateDestinationDetail) {
                                                                        onNavigateDestinationDetail({
                                                                            id: dest.id,
                                                                            title: dest.name,
                                                                            region: regencyData.name
                                                                        });
                                                                    }
                                                                }}
                                                                style={{
                                                                    backgroundColor: '#006b5e',
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    color: '#fff',
                                                                    fontFamily: font,
                                                                    fontSize: '11px',
                                                                    fontWeight: 700,
                                                                    padding: '6px 12px',
                                                                    cursor: 'pointer',
                                                                    transition: 'background .2s',
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004d40'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006b5e'}
                                                            >
                                                                Jelajahi
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Zoom out button inside card */}
                                            <button
                                                onClick={() => {
                                                    setIsZoomedToSulsel(false);
                                                    setActiveRegencyId(null);
                                                }}
                                                style={{
                                                    marginTop: '4px',
                                                    padding: '12px',
                                                    backgroundColor: 'transparent',
                                                    border: '1.5px solid #006b5e',
                                                    borderRadius: '10px',
                                                    fontFamily: font,
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    color: '#006b5e',
                                                    cursor: 'pointer',
                                                    transition: 'all .2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(0,107,94,.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>zoom_out</span>
                                                Kembali ke Peta Sulawesi
                                            </button>
                                        </div>
                                    );
                                })()}

                                {/* Regency List Chips */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    {Object.entries(sulselRegencies).map(([id, reg]) => (
                                        <div
                                            key={id}
                                            onMouseEnter={() => setHoveredRegencyId(id)}
                                            onMouseLeave={() => setHoveredRegencyId(null)}
                                            onClick={() => setActiveRegencyId(id)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                padding: '10px 14px', borderRadius: '12px', cursor: 'pointer',
                                                background: activeRegencyId === id || hoveredRegencyId === id
                                                    ? 'rgba(0,107,94,.1)'
                                                    : 'transparent',
                                                border: activeRegencyId === id
                                                    ? '1.5px solid rgba(0,107,94,.25)'
                                                    : '1.5px solid transparent',
                                                transition: 'background .25s ease',
                                            }}
                                        >
                                            <div style={{
                                                width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0,
                                                backgroundColor: activeRegencyId === id ? '#23F7DB' : '#006b5e',
                                                boxShadow: activeRegencyId === id ? '0 0 6px rgba(35,247,219,.8)' : 'none',
                                            }} />
                                            <span style={{
                                                fontFamily: font, fontSize: '12px',
                                                fontWeight: activeRegencyId === id ? 700 : 500,
                                                color: activeRegencyId === id ? '#006b5e' : '#5c4039',
                                            }}>{reg.name.replace("Kabupaten ", "").replace("Kota ", "")}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

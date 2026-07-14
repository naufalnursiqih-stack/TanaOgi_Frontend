import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageWithShimmer from './ImageWithShimmer';

const BACKEND_STORAGE = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')
    : '';

function getImageUrl(images) {
    if (!images || images.length === 0) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
    const first = images[0];
    const url = typeof first === 'string' ? first : first?.url;
    if (!url) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
    if (url.startsWith('http')) return url;
    return `${BACKEND_STORAGE}/storage/${url}`;
}

function DestinationSkeleton() {
    return (
        <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, #e0ebe7 25%, #f0f7f4 50%, #e0ebe7 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            aspectRatio: '4/5',
        }} />
    );
}

export default function AllDestinationsPage({
    onNavigateHome, onNavigateLogin, onNavigateRegister, onNavigateDestinations,
    onNavigateExperiences, onNavigateCulture, onNavigateJournal, onNavigateDestinationDetail,
    onNavigateTravelGuide, onNavigateSustainability, onNavigateAbout, onNavigatePressKit,
    onNavigatePrivacyPolicy, onNavigateTerms, currentUser, onLogout, wishlistCount,
    onWishlistToggle, onToggleWishlist, isInWishlist
}) {
    const [scrolled, setScrolled] = useState(false);
    const [activeRegion, setActiveRegion] = useState('Semua Wilayah');
    const [destinations, setDestinations] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch destinations & regencies from API
    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        Promise.all([
            fetch('/api/v1/destinations').then(r => r.json()),
            fetch('/api/v1/regencies').then(r => r.json()),
        ])
            .then(([destData, regData]) => {
                if (!isMounted) return;
                if (destData?.success) setDestinations(destData.data || []);
                if (regData?.success) setRegencies(regData.data || []);
            })
            .catch(err => console.error('Failed to fetch destinations/regencies:', err))
            .finally(() => { if (isMounted) setLoading(false); });

        return () => { isMounted = false; };
    }, []);

    // Filter bar drag-to-scroll
    const filterRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const handleMouseDown = (e) => { setIsDown(true); setStartX(e.pageX - filterRef.current.offsetLeft); setScrollLeft(filterRef.current.scrollLeft); };
    const handleMouseLeave = () => setIsDown(false);
    const handleMouseUp = () => setIsDown(false);
    const handleMouseMove = (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - filterRef.current.offsetLeft; filterRef.current.scrollLeft = scrollLeft - (x - startX) * 2; };

    // Build region filter pills from API data
    const allRegionPill = {
        id: 'all',
        name: 'Semua Wilayah',
        count: destinations.length,
        image: regencies[0]?.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80',
    };

    const regionPills = [
        allRegionPill,
        ...regencies.map(reg => ({
            id: reg.id,
            name: reg.name,
            count: destinations.filter(d => d.regency?.name === reg.name || d.regency_id === reg.id).length,
            image: reg.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80',
        })).filter(r => r.count > 0),
    ];

    const filteredDestinations = activeRegion === 'Semua Wilayah'
        ? destinations
        : destinations.filter(d => d.regency?.name === activeRegion);

    // Tags based on destination category/name patterns
    const getTag = (dest, index) => {
        const name = (dest.name || '').toLowerCase();
        if (name.includes('pantai') || name.includes('tanjung') || name.includes('pesisir')) return 'PESONA PESISIR';
        if (name.includes('taman nasional') || name.includes('hutan')) return 'KEANEKARAGAMAN HAYATI';
        if (name.includes('benteng') || name.includes('candi') || name.includes('makam')) return 'WARISAN SEJARAH';
        if (name.includes('danau')) return 'KEINDAHAN DANAU';
        if (name.includes('pulau')) return 'DESTINASI BAHARI';
        const tags = ['WARISAN LELUHUR', 'KEANEKARAGAMAN HAYATI', 'PESONA PESISIR', 'KEAJAIBAN ALAM', 'WISATA BUDAYA'];
        return tags[index % tags.length];
    };

    return (
        <div className="gradient-mesh-bg" style={{ minHeight: '100vh', fontFamily: font, color: '#131e1b', display: 'flex', flexDirection: 'column' }}>
            <style>{`
                @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
            `}</style>

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
                wishlistCount={wishlistCount}
                onWishlistToggle={onWishlistToggle}
            />

            <main style={{ flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '140px 64px 80px' }}>

                {/* Title */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '2px', backgroundColor: '#f5401b' }} />
                        <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#f5401b' }}>
                            Jelajahi per Wilayah
                        </span>
                    </div>
                    <h1 style={{ fontFamily: font, fontSize: '56px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em', color: '#131e1b', margin: 0 }}>
                        Semua Destinasi
                    </h1>
                    {!loading && (
                        <p style={{ fontFamily: font, fontSize: '16px', color: '#5c4039', marginTop: '12px' }}>
                            {destinations.length} destinasi wisata terpilih di Sulawesi
                        </p>
                    )}
                </div>

                {/* Filter Pills */}
                <div
                    ref={filterRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="no-scrollbar"
                    style={{ display: 'flex', gap: '16px', overflowX: 'auto', cursor: isDown ? 'grabbing' : 'grab', paddingBottom: '24px', marginBottom: '48px', userSelect: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {regionPills.map(region => {
                        const isActive = activeRegion === region.name;
                        return (
                            <div
                                key={region.id}
                                onClick={() => setActiveRegion(region.name)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '8px 20px 8px 12px', borderRadius: '9999px',
                                    backgroundColor: isActive ? '#b32000' : '#eaf6f1',
                                    border: isActive ? '1px solid #b32000' : '1px solid rgba(245, 64, 27, 0.15)',
                                    color: isActive ? '#ffffff' : '#131e1b',
                                    cursor: 'pointer', whiteSpace: 'nowrap',
                                    boxShadow: isActive ? '0 10px 20px -5px rgba(179,32,0,0.3)' : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <img src={region.image} alt={region.name}
                                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: isActive ? '1.5px solid #ffffff' : '1.5px solid transparent' }}
                                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80'; }}
                                />
                                <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 600 }}>{region.name}</span>
                                <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.6, backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '9999px' }}>
                                    {region.count}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Cards Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {[...Array(6)].map((_, i) => <DestinationSkeleton key={i} />)}
                    </div>
                ) : filteredDestinations.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#5c4039' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '64px', opacity: 0.3 }}>landscape</span>
                        <p style={{ fontFamily: font, fontSize: '18px', marginTop: '16px' }}>Belum ada destinasi untuk wilayah ini.</p>
                    </div>
                ) : (
                    <div className="all-dest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {filteredDestinations.map((dest, index) => {
                            const isFeatured = index === 0 && activeRegion === 'Semua Wilayah';
                            const imgUrl = getImageUrl(dest.images);
                            const tag = getTag(dest, index);
                            const regionName = dest.regency?.name || '';
                            const price = dest.ticket_price === 0
                                ? 'Gratis'
                                : `Rp ${dest.ticket_price?.toLocaleString('id-ID')}`;

                            return (
                                <div
                                    key={dest.id}
                                    className={`all-dest-card tilt-card-3d ${isFeatured ? 'all-dest-featured-card' : ''}`}
                                    onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }}
                                    style={{
                                        gridColumn: isFeatured ? 'span 2' : 'span 1',
                                        gridRow: isFeatured ? 'span 2' : 'span 1',
                                        height: isFeatured ? '800px' : 'auto',
                                        aspectRatio: isFeatured ? 'auto' : '4/5',
                                        position: 'relative',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {/* Wishlist button */}
                                    <button
                                        onClick={e => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(dest); }}
                                        style={{
                                            position: 'absolute', top: '20px', right: '20px', zIndex: 30,
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            backgroundColor: 'rgba(255,255,255,0.85)', border: 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <span className="material-symbols-outlined" style={{
                                            color: isInWishlist && isInWishlist(dest.id) ? '#b32000' : 'rgba(19,30,27,0.4)',
                                            fontVariationSettings: isInWishlist && isInWishlist(dest.id) ? "'FILL' 1" : "'FILL' 0",
                                            fontSize: '20px', transition: 'color 0.3s ease'
                                        }}>favorite</span>
                                    </button>

                                    <ImageWithShimmer
                                        src={imgUrl}
                                        alt={dest.name}
                                        imgClassName="all-dest-card-img"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                    <div className="all-dest-card-gradient" />

                                    {/* Card Details */}
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: isFeatured ? '48px' : '28px', boxSizing: 'border-box' }}>
                                        <div className="glass-card" style={{ padding: isFeatured ? '40px' : '24px', borderRadius: '16px', maxWidth: isFeatured ? '520px' : '100%', boxSizing: 'border-box' }}>
                                            <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 700, letterSpacing: '0.20em', color: '#23F7DB', display: 'block', marginBottom: '8px' }}>
                                                {tag}
                                            </span>
                                            <h3 style={{ fontFamily: font, fontSize: isFeatured ? '36px' : '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
                                                {dest.name}
                                            </h3>
                                            <p className={isFeatured ? '' : 'all-dest-card-desc'} style={{ fontFamily: font, fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: '0 0 20px 0' }}>
                                                {dest.description?.slice(0, 120)}{dest.description?.length > 120 ? '...' : ''}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', color: '#ffffff', textTransform: 'uppercase' }}>
                                                        {regionName}
                                                    </span>
                                                    {dest.ticket_price !== undefined && (
                                                        <span style={{ display: 'block', fontFamily: font, fontSize: '11px', color: '#23F7DB', marginTop: '2px' }}>
                                                            Tiket: {price}
                                                        </span>
                                                    )}
                                                </div>
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
                )}
            </main>

            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={onNavigateDestinations}
                onNavigateExperiences={onNavigateExperiences}
                onNavigateCulture={onNavigateCulture}
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

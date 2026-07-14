import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SulawesiMapSection from './SulawesiMapSection';
import ScrollReveal from './ScrollReveal';
import ImageWithShimmer from './ImageWithShimmer';

export default function DestinationsPage({
    onNavigateHome, onNavigateLogin, onNavigateRegister, onNavigateAllDestinations,
    onNavigateExperiences, onNavigateCulture, onNavigateJournal, onNavigateDestinationDetail,
    onNavigateTravelGuide, onNavigateSustainability, onNavigateAbout, onNavigatePressKit,
    onNavigatePrivacyPolicy, onNavigateTerms, currentUser, onLogout, wishlistCount,
    onWishlistToggle, onToggleWishlist, isInWishlist
}) {
    const [scrolled, setScrolled] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [destLoading, setDestLoading] = useState(true);
    const font = "'Plus Jakarta Sans', sans-serif";

    const BACKEND_STORAGE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

    const getImgUrl = (images, fallback) => {
        if (!images || images.length === 0) return fallback || '';
        const first = images[0];
        const url = typeof first === 'string' ? first : first?.url;
        if (!url) return fallback || '';
        if (url.startsWith('http')) return url;
        return `${BACKEND_STORAGE}/storage/${url}`;
    };

    const getTag = (dest, index) => {
        const name = (dest.name || '').toLowerCase();
        if (name.includes('pantai') || name.includes('tanjung')) return 'SURGA PESISIR';
        if (name.includes('karst') || name.includes('hutan') || name.includes('gua')) return 'KEANEKARAGAMAN HAYATI';
        if (name.includes('benteng') || name.includes('candi') || name.includes('kesu') || name.includes('tongkonan')) return 'WARISAN LELUHUR';
        if (name.includes('danau')) return 'KEINDAHAN DANAU';
        const tags = ['WARISAN LELUHUR', 'KEANEKARAGAMAN HAYATI', 'SURGA PESISIR', 'KEAJAIBAN ALAM', 'WISATA BUDAYA'];
        return tags[index % tags.length];
    };

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/v1/destinations?per_page=3')
            .then(r => r.json())
            .then(data => {
                if (isMounted && data?.success) setDestinations(data.data || []);
            })
            .catch(err => console.error('Failed to fetch destinations:', err))
            .finally(() => { if (isMounted) setDestLoading(false); });
        return () => { isMounted = false; };
    }, []);

    const WishlistBtn = ({ dest }) => (
        <button
            onClick={e => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(dest); }}
            style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 30, width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'transform 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            <span className="material-symbols-outlined" style={{ color: isInWishlist && isInWishlist(dest.id) ? '#b32000' : 'rgba(19,30,27,0.4)', fontVariationSettings: isInWishlist && isInWishlist(dest.id) ? "'FILL' 1" : "'FILL' 0", fontSize: '22px', transition: 'color 0.3s' }}>favorite</span>
        </button>
    );

    return (
        <div style={{ fontFamily: font, backgroundColor: '#e4f0ed', color: '#131e1b' }}>
            <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>

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
                wishlistCount={wishlistCount}
                onWishlistToggle={onWishlistToggle}
            />

            {/* ── Hero Section ── */}
            <section style={{ position: 'relative', height: '90vh', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img alt="Malino Highland" src="batubatu.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 100%)' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 64px' }}>
                    <span className="hover-aesthetic" style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#b32000', display: 'block', marginBottom: '24px', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.1s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        SULAWESI SELATAN
                    </span>
                    <h1 className="hover-aesthetic" style={{ fontFamily: font, fontSize: '64px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em', color: '#131e1b', maxWidth: '900px', margin: '0 auto 48px', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 1s ease 0.3s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        Mahakarya Alam &amp; Budaya
                    </h1>
                    <p className="hover-aesthetic" style={{ fontFamily: font, fontSize: '18px', fontWeight: 400, lineHeight: 1.6, color: '#5c4039', maxWidth: '560px', margin: '0 auto 80px', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.5s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        Temukan harmoni antara puncak karst yang megah dan tradisi leluhur yang tak lekang oleh waktu di jantung Celebes.
                    </p>
                </div>

                <div style={{ position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, animation: 'bounce-arrow 2s ease-in-out infinite' }}>
                    <span className="material-symbols-outlined" style={{ color: '#131e1b', fontSize: '32px' }}>expand_more</span>
                </div>
            </section>

            {/* ── Sulawesi Map Section ── */}
            <SulawesiMapSection onNavigateDestinationDetail={onNavigateDestinationDetail} />

            {/* ── Featured Collection ── */}
            <ScrollReveal>
                <section style={{ padding: '80px 64px', maxWidth: '1440px', margin: '0 auto' }}>

                    {/* Section Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '24px' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#131e1b', marginBottom: '24px' }}>
                                Destinasi Pilihan: Permata Sulawesi Selatan
                            </h2>
                            <div style={{ width: '96px', height: '4px', backgroundColor: '#f5401b', borderRadius: '9999px' }} />
                        </div>
                        <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 400, color: '#5c4039', maxWidth: '400px', lineHeight: 1.6 }}>
                            Koleksi eksklusif yang dikurasi khusus untuk petualang yang menghargai kedalaman cerita dan kemegahan visual.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    {destLoading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
                            <div style={{ gridColumn: 'span 8', height: '600px', borderRadius: '16px', background: 'linear-gradient(90deg, #d4e8e0 25%, #e8f4f0 50%, #d4e8e0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                            <div style={{ gridColumn: 'span 4', height: '600px', borderRadius: '16px', background: 'linear-gradient(90deg, #d4e8e0 25%, #e8f4f0 50%, #d4e8e0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

                            {/* Card 1: Featured – col-span 8 */}
                            {destinations[0] && (() => {
                                const dest = destinations[0];
                                const imgUrl = getImgUrl(dest.images, '/Kete-Kesu.jpg');
                                const tag = getTag(dest, 0);
                                return (
                                    <div key={dest.id}
                                        className="dest-card tilt-card-3d"
                                        onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }}
                                        style={{ gridColumn: 'span 8', position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(245, 64, 27,0.15)', height: '600px', cursor: 'pointer' }}
                                    >
                                        <WishlistBtn dest={dest} />
                                        <ImageWithShimmer alt={dest.name} src={imgUrl} imgClassName="dest-card-img" style={{ width: '100%', height: '100%' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', opacity: 0.6, transition: 'opacity 0.3s' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '48px', width: '100%' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', padding: '48px', borderRadius: '16px', maxWidth: '520px' }}>
                                                <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#f5401b', display: 'block', marginBottom: '4px' }}>{tag}</span>
                                                <h3 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', color: '#131e1b', marginBottom: '12px' }}>{dest.name}</h3>
                                                <p style={{ fontFamily: font, fontSize: '16px', color: '#5c4039', marginBottom: '24px', lineHeight: 1.6 }}>{dest.description?.slice(0, 100)}{dest.description?.length > 100 ? '...' : ''}</p>
                                                <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#b32000', textDecoration: 'none', transition: 'gap 0.3s' }}>
                                                    JELAJAHI <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Card 2: col-span 4 */}
                            {destinations[1] && (() => {
                                const dest = destinations[1];
                                const imgUrl = getImgUrl(dest.images, 'rammangrammang.jpg');
                                const tag = getTag(dest, 1);
                                return (
                                    <div key={dest.id}
                                        className="dest-card tilt-card-3d"
                                        onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }}
                                        style={{ gridColumn: 'span 4', position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(245, 64, 27,0.15)', height: '600px', cursor: 'pointer' }}
                                    >
                                        <WishlistBtn dest={dest} />
                                        <ImageWithShimmer alt={dest.name} src={imgUrl} imgClassName="dest-card-img" style={{ width: '100%', height: '100%' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)', opacity: 0.6 }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '48px' }}>
                                            <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#ffffff', display: 'block', marginBottom: '4px' }}>{tag}</span>
                                            <h3 style={{ fontFamily: font, fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '12px' }}>{dest.name}</h3>
                                            <p style={{ fontFamily: font, fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6 }}>{dest.description?.slice(0, 80)}{dest.description?.length > 80 ? '...' : ''}</p>
                                            <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#31fde1', textDecoration: 'none', transition: 'gap 0.3s' }}>
                                                LIHAT DETAIL <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Card 3: Wide Banner – col-span 12 */}
                            {destinations[2] && (() => {
                                const dest = destinations[2];
                                const imgUrl = getImgUrl(dest.images, 'pasirputihbulkum.jpg');
                                return (
                                    <div key={dest.id}
                                        className="dest-card tilt-card-3d"
                                        onClick={() => { if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }}
                                        style={{ gridColumn: 'span 12', position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(245, 64, 27,0.15)', height: '400px', cursor: 'pointer' }}
                                    >
                                        <WishlistBtn dest={dest} />
                                        <ImageWithShimmer alt={dest.name} src={imgUrl} imgClassName="dest-card-img" style={{ width: '100%', height: '100%' }} />
                                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s' }} className="dest-card-overlay">
                                            <div style={{ textAlign: 'center', color: '#ffffff', padding: '0 20px' }}>
                                                <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{getTag(dest, 2)}</span>
                                                <h3 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '24px' }}>{dest.name}</h3>
                                                <button
                                                    style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', padding: '12px 48px', borderRadius: '9999px', fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
                                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#b32000'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ffffff'; }}
                                                    onClick={e => { e.stopPropagation(); if (onNavigateDestinationDetail) onNavigateDestinationDetail(dest); }}
                                                >Rencanakan Kunjungan</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                        </div>
                    )}

                    {/* Primary CTA */}
                    <div style={{ marginTop: '80px', textAlign: 'center' }}>
                        <button
                            onClick={e => { e.preventDefault(); if (onNavigateAllDestinations) onNavigateAllDestinations(); }}
                            className="dest-plan-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', backgroundColor: '#b32000', color: '#ffffff', padding: '24px 80px', borderRadius: '9999px', fontFamily: font, fontSize: '16px', fontWeight: 700, boxShadow: '0 30px 60px -12px rgba(245, 64, 27,0.3)', border: 'none', cursor: 'pointer', textDecoration: 'none', transition: 'transform 0.3s ease' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Lihat Semua Destinasi
                            <span className="material-symbols-outlined">explore</span>
                        </button>
                    </div>
                </section>
            </ScrollReveal>

            {/* ── Editorial Section ── */}
            <ScrollReveal>
                <section style={{ padding: '80px 0', backgroundColor: '#eaf6f1' }}>
                    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <div>
                            <ImageWithShimmer
                                alt="Traditional Torajan Weaving"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpd489SCZCN7osEY1vPx5f5LQF0gN9GRwcwNfsNvGhpFHBhJ3FT3qBSA6KRK91qtPCi2GPbIw2eJ1DqIges9EBOg0qPttMYeH_KJgeznyFTeuH36Pdab31tHRTqkaIp2Gi81qLeKhrdljbU0RsGCLKqNaBdiqh2zA0gNn3BWCaqm_K6m_aoNGvGj-jQfI1ZsxhYrvMAXrUUHQ6w2gyj8Hkuh2h1F_eEkGcQs5EQsMta0KRvsjHYZo3-UtY1GTsfvfp8WQ2jPbsI"
                                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', color: '#131e1b' }}>Cerita di Balik Setiap Perjalanan</h2>
                            <p style={{ fontFamily: font, fontSize: '18px', fontWeight: 400, lineHeight: 1.6, color: '#5c4039' }}>
                                Kami percaya bahwa perjalanan bukan sekadar berpindah tempat, melainkan sebuah dialog mendalam antara diri dan tradisi yang masih bernapas.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                                    <span className="material-symbols-outlined" style={{ padding: '4px', backgroundColor: '#de2f08', borderRadius: '50%', fontSize: '20px', color: '#ffffff', flexShrink: 0 }}>auto_awesome</span>
                                    <div>
                                        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#131e1b', marginBottom: '4px' }}>KURASI EKSKLUSIF</p>
                                        <p style={{ fontFamily: font, fontSize: '16px', color: '#5c4039', lineHeight: 1.6 }}>Setiap lokasi dipilih berdasarkan keaslian budaya dan keasrian alamnya.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                                    <span className="material-symbols-outlined" style={{ padding: '4px', backgroundColor: '#23F7DB', borderRadius: '50%', fontSize: '20px', color: '#00201b', flexShrink: 0 }}>eco</span>
                                    <div>
                                        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#131e1b', marginBottom: '4px' }}>WISATA BERKELANJUTAN</p>
                                        <p style={{ fontFamily: font, fontSize: '16px', color: '#5c4039', lineHeight: 1.6 }}>Mendukung komunitas lokal untuk menjaga ekosistem dan tradisi Toraja.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            <Footer
                onNavigateHome={onNavigateHome}
                onNavigateDestinations={() => {}}
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

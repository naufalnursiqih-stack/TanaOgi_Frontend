import React from 'react';

/**
 * Shared Footer Component — Tana Ogi
 */
export default function Footer({
    onNavigateHome,
    onNavigateDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateJournal,
    onNavigateTravelGuide,
    onNavigateSustainability,
    onNavigateAbout,
    onNavigatePressKit,
    onNavigatePrivacyPolicy,
    onNavigateTerms,
}) {
    const font = "'Plus Jakarta Sans', sans-serif";

    const footerLinkStyle = {
        fontFamily: font,
        fontSize: '16px',
        color: '#5c4039',
        textDecoration: 'none',
        transition: 'color 0.3s',
        cursor: 'pointer',
    };

    const colTitleStyle = {
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: '#006b5e',
        marginBottom: '16px',
        display: 'block',
    };

    return (
        <footer style={{ backgroundColor: '#deebe6', padding: '80px 0' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '40px',
                padding: '0 64px',
                maxWidth: '1440px',
                margin: '0 auto',
                boxSizing: 'border-box',
            }}>
                {/* Brand Column */}
                <div>
                    {/* Flex Wrapper untuk Menyejajarkan Logo Lumayan Besar & Teks */}
                    <div
                        onClick={onNavigateHome}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src="/logo TanaOgi.png"
                            alt="Logo Tana Ogi"
                            style={{
                                width: '64px', // Ukuran dibuat agak mayan besar sesuai request
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                        <span
                            style={{
                                fontFamily: font,
                                fontSize: '32px',
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                color: '#131e1b',
                            }}
                        >
                            TanaOgi'
                        </span>
                    </div>

                    <p style={{
                        fontFamily: font,
                        fontSize: '14px',
                        color: '#5c4039',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        © 2026 TanaOgi'.<br />
                        Dibuat untuk Para Penjelajah Budaya.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                        {['language', 'share'].map(icon => (
                            <span
                                key={icon}
                                className="material-symbols-outlined"
                                style={{ cursor: 'pointer', color: '#5c4039', fontSize: '22px', transition: 'color 0.3s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#b32000'}
                                onMouseLeave={e => e.currentTarget.style.color = '#5c4039'}
                            >
                                {icon}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Jelajahi */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={colTitleStyle}>JELAJAHI</span>
                    {[
                        { label: 'Destinations', action: onNavigateDestinations },
                        { label: 'Experiences', action: onNavigateExperiences },
                        { label: 'Culture', action: onNavigateCulture },
                        { label: 'Journal', action: onNavigateJournal },
                    ].map(({ label, action }) => (
                        <a
                            key={label}
                            href="#"
                            onClick={e => { e.preventDefault(); if (action) action(); }}
                            style={{ ...footerLinkStyle, marginBottom: '12px' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#00dfc5'}
                            onMouseLeave={e => e.currentTarget.style.color = '#5c4039'}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Panduan */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={colTitleStyle}>PANDUAN</span>
                    {[
                        { label: 'Panduan Perjalanan', action: onNavigateTravelGuide },
                        { label: 'Keberlanjutan', action: onNavigateSustainability },
                        { label: 'Tentang Kami', action: onNavigateAbout },
                        { label: 'Press Kit', action: onNavigatePressKit },
                    ].map(({ label, action }) => (
                        <a
                            key={label}
                            href="#"
                            onClick={e => { e.preventDefault(); if (action) action(); }}
                            style={{ ...footerLinkStyle, marginBottom: '12px' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#00dfc5'}
                            onMouseLeave={e => e.currentTarget.style.color = '#5c4039'}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Legal */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={colTitleStyle}>LEGAL</span>
                    {[
                        { label: 'Kebijakan Privasi', action: onNavigatePrivacyPolicy },
                        { label: 'Syarat & Ketentuan', action: onNavigateTerms },
                    ].map(({ label, action }) => (
                        <a
                            key={label}
                            href="#"
                            onClick={e => { e.preventDefault(); if (action) action(); }}
                            style={{ ...footerLinkStyle, marginBottom: '12px' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#00dfc5'}
                            onMouseLeave={e => e.currentTarget.style.color = '#5c4039'}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

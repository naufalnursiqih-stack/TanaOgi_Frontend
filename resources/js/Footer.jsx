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
        fontSize: '15px',
        color: 'rgba(230, 189, 181, 0.7)',
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        display: 'inline-block',
    };

    const colTitleStyle = {
        fontFamily: font,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#23F7DB',
        marginBottom: '20px',
        display: 'block',
    };

    return (
        <footer style={{ 
            backgroundColor: '#0f0a09', // Deep dark teakwood charcoal
            borderTop: '1px solid rgba(230, 189, 181, 0.08)',
            padding: '80px 0', 
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Glowing backdrop auroras */}
            <div style={{
                position: 'absolute', bottom: '-100px', left: '-50px',
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(179,32,0,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: '-150px', right: '-50px',
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(35,247,219,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '40px',
                padding: '0 64px',
                maxWidth: '1440px',
                margin: '0 auto',
                boxSizing: 'border-box',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Brand Column */}
                <div>
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
                                width: '56px',
                                height: 'auto',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))'
                            }}
                        />
                        <span
                            style={{
                                fontFamily: font,
                                fontSize: '28px',
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                color: '#ffffff',
                            }}
                        >
                            TanaOgi'
                        </span>
                    </div>

                    <p style={{
                        fontFamily: font,
                        fontSize: '14px',
                        color: 'rgba(230, 189, 181, 0.55)',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        © 2026 TanaOgi'.<br />
                        Dibuat untuk Para Penjelajah Budaya.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                        {['language', 'share'].map(icon => (
                            <span
                                key={icon}
                                className="material-symbols-outlined"
                                style={{ 
                                    cursor: 'pointer', 
                                    color: 'rgba(230, 189, 181, 0.6)', 
                                    fontSize: '20px', 
                                    transition: 'all 0.3s ease',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(230, 189, 181, 0.1)'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = 'rgba(230, 189, 181, 0.6)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
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
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.transform = 'translateX(6px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(230, 189, 181, 0.7)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
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
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.transform = 'translateX(6px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(230, 189, 181, 0.7)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
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
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.transform = 'translateX(6px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(230, 189, 181, 0.7)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

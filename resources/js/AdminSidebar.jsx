import React, { useState, useEffect } from 'react';

const font = "'Plus Jakarta Sans', sans-serif";

/**
 * NAV config — bisa diimport dan dipakai di file admin lain
 */
export const ADMIN_NAV = [
    {
        group: 'UTAMA',
        items: [{ label: 'Dashboard', icon: 'dashboard', key: 'dashboard' }],
    },
    {
        group: 'MANAJEMEN KONTEN',
        items: [
            { label: 'Destinations', icon: 'landscape', key: 'destinations' },
            { label: 'Regencies', icon: 'map', key: 'regencies' },
            { label: 'Accommodations', icon: 'hotel', key: 'accommodations' },
            { label: 'Vehicles', icon: 'directions_car', key: 'vehicles' },
        ],
    },
    {
        group: 'LAINNYA',
        items: [{ label: 'Settings', icon: 'settings', key: 'settings' }],
    },
];

/**
 * AdminSidebar — komponen sidebar admin yang reusable.
 *
 * Props:
 *  - activeNav  : string  — key menu yang aktif
 *  - onNavChange: fn(key) — callback saat menu diklik
 *  - adminName  : string  — nama admin
 *  - onLogout   : fn()    — callback logout
 */
export default function AdminSidebar({ activeNav = 'dashboard', onNavChange, adminName = 'Admin', onLogout }) {
    // ── Animated brand title (sama persis seperti Navbar utama) ──────────────
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % titles.length);
                setFade(false);
            }, 400);
        }, 4800);
        return () => clearInterval(interval);
    }, []);

    // ── Logout handler ────────────────────────────────────────────────────────
    const handleLogout = async () => {
        try {
            await fetch('/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie
                            .split('; ')
                            .find((r) => r.startsWith('XSRF-TOKEN='))
                            ?.split('=')[1] || ''
                    ),
                },
            });
        } catch (_) {}
        if (onLogout) onLogout();
        else window.location.href = '/admin/login';
    };

    return (
        <>
            <style>{`
                .admin-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 16px;
                    border-radius: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    color: #5c4039;
                    transition: all 0.22s ease;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                }
                .admin-nav-item:hover {
                    background: #d4ebe0;
                    color: #b32000;
                    transform: translateX(3px);
                }
                .admin-nav-item.active {
                    background: linear-gradient(135deg, #de2f08 0%, #b32000 100%);
                    color: #fff;
                    font-weight: 700;
                    box-shadow: 0 4px 16px rgba(179,32,0,0.28);
                    transform: translateX(0);
                }
                .admin-nav-item.active .material-symbols-outlined { color: #fff; }

                .admin-logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #e6bdb5;
                    border-radius: 12px;
                    background: none;
                    cursor: pointer;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    color: #5c4039;
                    transition: all 0.22s ease;
                }
                .admin-logout-btn:hover {
                    color: #ba1a1a;
                    background: rgba(186,26,26,0.07);
                    border-color: #ba1a1a;
                }
            `}</style>

            <aside style={{
                position: 'fixed',
                left: 0, top: 0,
                height: '100vh',
                width: '256px',
                background: 'linear-gradient(180deg, #e8f5ee 0%, #ddeee6 100%)',
                borderRight: '1px solid rgba(230,189,181,0.7)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 40,
                overflowY: 'auto',
                boxShadow: '4px 0 24px rgba(0,0,0,0.05)',
            }}>

                {/* ── Brand ─────────────────────────────────────────────── */}
                <div style={{ padding: '28px 24px 16px' }}>
                    {/* Logo + Animated Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <img
                            src="/logo TanaOgi.png"
                            alt="Logo TanaOgi"
                            style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }}
                        />
                        <span style={{
                            fontFamily: font,
                            fontSize: '22px',
                            fontWeight: 800,
                            letterSpacing: '-0.01em',
                            color: '#b32000',
                            opacity: fade ? 0 : 1,
                            filter: fade ? 'blur(6px)' : 'blur(0px)',
                            transform: fade ? 'scale(0.96)' : 'scale(1)',
                            transition: 'color 0.4s, opacity 0.4s, filter 0.4s, transform 0.4s',
                            userSelect: 'none',
                        }}>
                            {titles[currentIndex]}
                        </span>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'rgba(230,189,181,0.5)', marginBottom: '16px' }} />

                    {/* Admin info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px',
                            borderRadius: '9999px',
                            background: 'linear-gradient(135deg, #de2f08 0%, #b32000 100%)',
                            flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(179,32,0,0.3)',
                        }}>
                            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '20px' }}>person</span>
                        </div>
                        <div>
                            <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: '#131e1b' }}>
                                {adminName}
                            </div>
                            <div style={{
                                fontFamily: font, fontSize: '10px', fontWeight: 700,
                                letterSpacing: '0.18em', color: '#5c4039',
                                textTransform: 'uppercase', marginTop: '2px',
                            }}>Super User</div>
                        </div>
                    </div>
                </div>

                {/* ── Nav ───────────────────────────────────────────────── */}
                <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {ADMIN_NAV.map((group) => (
                        <div key={group.group}>
                            <p style={{
                                fontFamily: font,
                                fontSize: '10px', fontWeight: 700,
                                letterSpacing: '0.20em', textTransform: 'uppercase',
                                color: '#5c4039',
                                padding: '0 16px', marginBottom: '6px',
                            }}>{group.group}</p>

                            {group.items.map((item) => (
                                <button
                                    key={item.key}
                                    className={`admin-nav-item${activeNav === item.key ? ' active' : ''}`}
                                    onClick={() => onNavChange && onNavChange(item.key)}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontSize: '20px',
                                            fontVariationSettings: activeNav === item.key ? "'FILL' 1" : "'FILL' 0",
                                            transition: 'font-variation-settings 0.2s',
                                        }}
                                    >{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* ── Logout ────────────────────────────────────────────── */}
                <div style={{ padding: '16px 20px' }}>
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

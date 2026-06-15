import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminDestinations from './AdminDestinations';
import AdminDrivers from './AdminDrivers';
import AdminRegencies from './AdminRegencies';
import AdminAccommodations from './AdminAccommodations';

const font = "'Plus Jakarta Sans', sans-serif";

// ─── Sidebar Nav Items ────────────────────────────────────────────────────────
const NAV = [
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ stat, animIn }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderLeft: `4px solid ${stat.accent}`,
            borderRadius: '20px',
            padding: '24px',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.10)`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                    fontFamily: font,
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.20em',
                    color: '#5c4039',
                    textTransform: 'uppercase',
                }}>{stat.label}</span>
                <span className="material-symbols-outlined" style={{ color: stat.accent, fontSize: '22px' }}>{stat.icon}</span>
            </div>
            <div>
                <div style={{
                    fontFamily: font,
                    fontSize: '42px',
                    fontWeight: 900,
                    color: '#131e1b',
                    lineHeight: 1,
                    opacity: animIn ? 1 : 0,
                    transform: animIn ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'all 0.6s ease',
                }}>{stat.value}</div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '8px',
                    fontFamily: font,
                    fontSize: '12px',
                    fontWeight: 700,
                    color: stat.subColor,
                }}>
                    {stat.subIcon && (
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{stat.subIcon}</span>
                    )}
                    <span>{stat.sub}</span>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const isPublished = status === 'Published';
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: isPublished ? 'rgba(43,250,222,0.15)' : '#d9e5e0',
            color: isPublished ? '#006b5e' : '#5c4039',
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 700,
        }}>{status}</span>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard({ onLogout, adminName = 'Admin Portal' }) {
    const [activeNav, setActiveNav] = useState('dashboard');
    const [search, setSearch] = useState('');
    const [animIn, setAnimIn] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Dynamic stats and destinations states
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [destinations, setDestinations] = useState([]);
    const [destinationsLoading, setDestinationsLoading] = useState(true);
    const [destPage, setDestPage] = useState(1);
    const [destTotalPages, setDestTotalPages] = useState(1);
    const [destTotalItems, setDestTotalItems] = useState(0);

    const getXsrfToken = () => {
        return decodeURIComponent(
            document.cookie.split('; ').find(r => r.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
        );
    };

    useEffect(() => {
        const t = setTimeout(() => setAnimIn(true), 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            setStatsLoading(true);
            try {
                const res = await fetch('/api/v1/admin/dashboard/stats', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (err) {
                console.error("Gagal mengambil data statistik:", err);
            } finally {
                setStatsLoading(false);
            }
        };

        if (activeNav === 'dashboard') {
            fetchStats();
        }
    }, [activeNav]);

    useEffect(() => {
        const fetchDestinations = async () => {
            setDestinationsLoading(true);
            try {
                const res = await fetch(`/api/v1/admin/destinations?per_page=5&page=${destPage}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setDestinations(data.data);
                    setDestTotalPages(data.meta.last_page);
                    setDestTotalItems(data.meta.total);
                }
            } catch (err) {
                console.error("Gagal mengambil data destinasi terbaru:", err);
            } finally {
                setDestinationsLoading(false);
            }
        };

        if (activeNav === 'dashboard') {
            fetchDestinations();
        }
    }, [activeNav, destPage]);

    const handleDeleteDestination = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus destinasi ini?")) return;
        try {
            const res = await fetch(`/api/v1/admin/destinations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                alert("Destinasi berhasil dihapus");
                setDestPage(1);
                // Refresh stats
                const resStats = await fetch('/api/v1/admin/dashboard/stats', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                const dataStats = await resStats.json();
                if (dataStats.success) {
                    setStats(dataStats.data);
                }
                // Refresh destinations
                if (destPage === 1) {
                    const resDest = await fetch(`/api/v1/admin/destinations?per_page=5&page=1`, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                        }
                    });
                    const dataDest = await resDest.json();
                    if (dataDest.success) {
                        setDestinations(dataDest.data);
                        setDestTotalPages(dataDest.meta.last_page);
                        setDestTotalItems(dataDest.meta.total);
                    }
                }
            } else {
                alert(data.message || "Gagal menghapus destinasi");
            }
        } catch (err) {
            console.error("Gagal menghapus destinasi:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                },
            });
        } catch (_) {}
        if (onLogout) onLogout();
        else window.location.href = '/admin/login';
    };

    const displayStats = [
        {
            label: 'DESTINATIONS',
            icon: 'landscape',
            value: statsLoading ? '...' : (stats?.destinations?.total ?? 0),
            sub: statsLoading ? 'Loading...' : `${stats?.destinations?.active ?? 0} aktif`,
            subIcon: 'trending_up',
            accent: '#b32000',
            subColor: '#006b5e',
        },
        {
            label: 'REGENCIES',
            icon: 'map',
            value: statsLoading ? '...' : (stats?.regencies?.total ?? 0),
            sub: statsLoading ? 'Loading...' : (stats?.regencies?.total === stats?.regencies?.active ? 'Semua wilayah aktif' : `${stats?.regencies?.active ?? 0} aktif`),
            subIcon: null,
            accent: '#2bfade',
            subColor: '#5c4039',
        },
        {
            label: 'ACCOMMODATIONS',
            icon: 'hotel',
            value: statsLoading ? '...' : (stats?.accommodations?.total ?? 0),
            sub: statsLoading ? 'Loading...' : `${stats?.accommodations?.active ?? 0} aktif`,
            subIcon: 'trending_up',
            accent: '#006b5e',
            subColor: '#006b5e',
        },
        {
            label: 'VEHICLES',
            icon: 'directions_car',
            value: statsLoading ? '...' : (stats?.vehicles?.total ?? 0),
            sub: statsLoading ? 'Loading...' : `${stats?.vehicles?.active ?? 0} aktif`,
            subIcon: null,
            accent: '#535e5c',
            subColor: '#5c4039',
        },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { overflow-x: hidden; }

                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #d9e5e0; border-radius: 10px; }

                .action-btn {
                    padding: 8px;
                    border: none;
                    background: none;
                    border-radius: 9999px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s ease;
                }

                @keyframes pulse-glow {
                    0%   { box-shadow: 0 0 0 0 rgba(179,32,0,0.4); }
                    70%  { box-shadow: 0 0 0 15px rgba(179,32,0,0); }
                    100% { box-shadow: 0 0 0 0 rgba(179,32,0,0); }
                }
                .btn-primary-cta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #b32000;
                    color: #fff;
                    border: none;
                    padding: 14px 28px;
                    border-radius: 9999px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(179,32,0,0.25);
                    transition: all 0.3s ease;
                }
                .btn-primary-cta:hover {
                    background: #de2f08;
                    transform: translateY(-1px);
                    animation: pulse-glow 2s infinite;
                }
                .btn-primary-cta:active { transform: scale(0.97); }

                .table-row { transition: background 0.2s ease; }
                .table-row:hover { background: rgba(179,32,0,0.04); }
                .table-row .row-actions { opacity: 0.5; transition: opacity 0.2s; }
                .table-row:hover .row-actions { opacity: 1; }

                .fade-slide-in {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
                .fade-slide-in.in {
                    opacity: 1;
                    transform: translateY(0);
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div style={{ display: 'flex', minHeight: '100vh', background: '#f0fcf7', fontFamily: font }}>

                {/* ── Sidebar (reusable component) ─────────────────── */}
                <AdminSidebar
                    activeNav={activeNav}
                    onNavChange={setActiveNav}
                    adminName={adminName}
                    onLogout={handleLogout}
                />

                {/* ── Main ────────────────────────────────────────────── */}
                <main style={{ marginLeft: '256px', flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                    {/* Top Bar */}
                    <header style={{
                        position: 'sticky', top: 0, zIndex: 30,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '16px 32px',
                        background: 'rgba(240,252,247,0.85)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderBottom: '1px solid #e6bdb5',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                    }}>
                        {/* Search */}
                        <div style={{
                            display: 'flex', alignItems: 'center',
                            background: '#e4f1eb',
                            borderRadius: '9999px',
                            padding: '8px 20px',
                            width: '380px',
                            gap: '8px',
                        }}>
                            <span className="material-symbols-outlined" style={{ color: '#5c4039', fontSize: '20px' }}>search</span>
                            <input
                                type="text"
                                placeholder="Search data, reports, or users..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    fontFamily: font, fontSize: '14px', color: '#131e1b',
                                    background: 'transparent', border: 'none', outline: 'none', width: '100%',
                                }}
                            />
                        </div>

                        {/* Right controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button className="action-btn" style={{ position: 'relative' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#d9e5e0'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                                <span className="material-symbols-outlined" style={{ color: '#5c4039' }}>notifications</span>
                                <span style={{
                                    position: 'absolute', top: '8px', right: '8px',
                                    width: '8px', height: '8px',
                                    borderRadius: '9999px', background: '#b32000',
                                }} />
                            </button>
                            <button className="action-btn"
                                onMouseEnter={e => e.currentTarget.style.background = '#d9e5e0'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                                <span className="material-symbols-outlined" style={{ color: '#5c4039' }}>help</span>
                            </button>
                            <div style={{ width: '1px', height: '32px', background: '#e6bdb5', margin: '0 8px' }} />
                            <button style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 20px',
                                border: '1.5px solid #b32000',
                                borderRadius: '9999px',
                                background: 'none',
                                fontFamily: font, fontSize: '13px', fontWeight: 700,
                                color: '#b32000', cursor: 'pointer',
                                transition: 'all 0.25s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#b32000'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#b32000'; }}
                                onClick={() => window.open('/', '_blank')}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>language</span>
                                Live Website
                            </button>
                        </div>
                    </header>

                    {/* Page Body */}
                    <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: '48px' }}>

                        {activeNav === 'dashboard' ? (
                            <>
                                {/* Page Header */}
                                <section
                                    className={`fade-slide-in${animIn ? ' in' : ''}`}
                                    style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}
                                >
                                    <div>
                                        <p style={{
                                            fontFamily: font,
                                            fontSize: '11px', fontWeight: 700,
                                            letterSpacing: '0.30em', textTransform: 'uppercase',
                                            color: '#b32000', marginBottom: '4px',
                                        }}>ADMIN DASHBOARD</p>
                                        <h1 style={{
                                            fontFamily: font,
                                            fontSize: '42px', fontWeight: 900,
                                            color: '#131e1b', letterSpacing: '-0.03em', lineHeight: 1.1,
                                        }}>Dashboard</h1>
                                    </div>
                                    <button className="btn-primary-cta" onClick={() => setActiveNav('destinations')}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
                                        Tambah Destinasi
                                    </button>
                                </section>

                                {/* Stats Grid */}
                                <section style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '24px',
                                }}>
                                    {displayStats.map((stat, i) => (
                                        <div
                                            key={stat.label}
                                            className={`fade-slide-in${animIn ? ' in' : ''}`}
                                            style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                                        >
                                            <StatCard stat={stat} animIn={animIn} />
                                        </div>
                                    ))}
                                </section>

                                {/* Table Section */}
                                <section className={`fade-slide-in${animIn ? ' in' : ''}`} style={{ transitionDelay: '0.5s' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between', marginBottom: '20px',
                                    }}>
                                        <h3 style={{
                                            fontFamily: font,
                                            fontSize: '28px', fontWeight: 800,
                                            color: '#131e1b', letterSpacing: '-0.02em',
                                        }}>Latest Destinations</h3>
                                        <a href="#" style={{
                                            fontFamily: font, fontSize: '13px', fontWeight: 700,
                                            color: '#b32000', textDecoration: 'none',
                                            transition: 'opacity 0.2s',
                                        }}
                                            onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                                            onMouseLeave={e => e.target.style.textDecoration = 'none'}
                                        >View All</a>
                                    </div>

                                    <div style={{
                                        background: 'rgba(255,255,255,0.72)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: '1px solid #e6bdb5',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                    }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ background: '#deebe6', borderBottom: '1px solid #e6bdb5' }}>
                                                    {['DESTINATION NAME', 'REGENCY', 'DATE ADDED', 'STATUS', 'ACTIONS'].map((th, i) => (
                                                        <th key={th} style={{
                                                            padding: '16px 24px',
                                                            fontFamily: font,
                                                            fontSize: '11px', fontWeight: 700,
                                                            letterSpacing: '0.16em', textTransform: 'uppercase',
                                                            color: '#131e1b',
                                                            textAlign: i === 4 ? 'right' : 'left',
                                                        }}>{th}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {destinationsLoading ? (
                                                    <tr>
                                                        <td colSpan="5" style={{ padding: '32px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                                            <span className="material-symbols-outlined" style={{ animation: 'spin 2s linear infinite', verticalAlign: 'middle', marginRight: '8px' }}>sync</span>
                                                            Memuat data destinasi...
                                                        </td>
                                                    </tr>
                                                ) : destinations.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5" style={{ padding: '32px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                                            Tidak ada data destinasi.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    destinations.map((row, idx) => {
                                                        const category = row.facilities?.category || 'NATURE';
                                                        const imgUrl = row.images && row.images.length > 0 
                                                            ? row.images[0].url 
                                                            : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80';
                                                        const dateAdded = new Date(row.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        });
                                                        const status = row.is_active ? 'Published' : 'Draft';

                                                        return (
                                                            <tr key={row.id} className="table-row" style={{
                                                                borderBottom: idx < destinations.length - 1 ? '1px solid rgba(230,189,181,0.25)' : 'none',
                                                            }}>
                                                                <td style={{ padding: '16px 24px' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <div style={{
                                                                            width: '48px', height: '48px',
                                                                            borderRadius: '12px', overflow: 'hidden',
                                                                            background: '#d9e5e0', flexShrink: 0,
                                                                        }}>
                                                                            <img
                                                                                src={imgUrl}
                                                                                alt={row.name}
                                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <div style={{ fontFamily: font, fontWeight: 700, fontSize: '14px', color: '#131e1b' }}>{row.name}</div>
                                                                            <div style={{ fontFamily: font, fontSize: '12px', color: '#5c4039', marginTop: '2px' }}>{category}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td style={{ padding: '16px 24px', fontFamily: font, fontSize: '14px', color: '#5c4039' }}>{row.regency?.name || '-'}</td>
                                                                <td style={{ padding: '16px 24px', fontFamily: font, fontSize: '14px', color: '#5c4039' }}>{dateAdded}</td>
                                                                <td style={{ padding: '16px 24px' }}>
                                                                    <StatusBadge status={status} />
                                                                </td>
                                                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                                    <div className="row-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                                                                        <button className="action-btn"
                                                                            style={{ color: '#5c4039' }}
                                                                            onMouseEnter={e => e.currentTarget.style.background = '#d9e5e0'}
                                                                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                                                            title="View"
                                                                            onClick={() => window.open('/destinations/' + row.slug, '_blank')}
                                                                        >
                                                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
                                                                        </button>
                                                                        <button className="action-btn"
                                                                            style={{ color: '#b32000' }}
                                                                            onMouseEnter={e => e.currentTarget.style.background = '#ffdad3'}
                                                                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                                                            title="Edit"
                                                                            onClick={() => setActiveNav('destinations')}
                                                                        >
                                                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                                                                        </button>
                                                                        <button className="action-btn"
                                                                            style={{ color: '#ba1a1a' }}
                                                                            onMouseEnter={e => e.currentTarget.style.background = '#ffdad6'}
                                                                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                                                            title="Delete"
                                                                            onClick={() => handleDeleteDestination(row.id)}
                                                                        >
                                                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                )}
                                            </tbody>
                                        </table>

                                        {/* Pagination */}
                                        <div style={{
                                            background: '#eaf6f1',
                                            padding: '16px 24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <span style={{ fontFamily: font, fontSize: '13px', color: '#5c4039' }}>
                                                Showing {destinations.length} of {destTotalItems} destinations
                                            </span>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    disabled={destPage === 1 || destinationsLoading}
                                                    onClick={() => setDestPage(prev => Math.max(prev - 1, 1))}
                                                    style={{
                                                        padding: '8px 18px',
                                                        border: '1px solid #e6bdb5',
                                                        borderRadius: '10px',
                                                        background: 'none',
                                                        fontFamily: font, fontSize: '13px',
                                                        color: destPage === 1 ? '#b09890' : '#131e1b',
                                                        cursor: destPage === 1 ? 'not-allowed' : 'pointer',
                                                        opacity: destPage === 1 ? 0.5 : 1,
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                    onMouseEnter={e => { if (destPage !== 1) e.currentTarget.style.background = '#d9e5e0'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    disabled={destPage === destTotalPages || destinationsLoading}
                                                    onClick={() => setDestPage(prev => Math.min(prev + 1, destTotalPages))}
                                                    style={{
                                                        padding: '8px 18px',
                                                        border: '1px solid #e6bdb5',
                                                        borderRadius: '10px',
                                                        background: 'none',
                                                        fontFamily: font, fontSize: '13px',
                                                        color: destPage === destTotalPages ? '#b09890' : '#131e1b',
                                                        cursor: destPage === destTotalPages ? 'not-allowed' : 'pointer',
                                                        opacity: destPage === destTotalPages ? 0.5 : 1,
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                    onMouseEnter={e => { if (destPage !== destTotalPages) e.currentTarget.style.background = '#d9e5e0'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        ) : activeNav === 'destinations' ? (
                            <AdminDestinations />
                        ) : activeNav === 'regencies' ? (
                            <AdminRegencies />
                        ) : activeNav === 'accommodations' ? (
                            <AdminAccommodations />
                        ) : activeNav === 'vehicles' ? (
                            <AdminDrivers />
                        ) : (
                            <div style={{
                                background: 'rgba(255,255,255,0.72)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid #e6bdb5',
                                borderRadius: '20px',
                                padding: '48px',
                                textAlign: 'center',
                                fontFamily: font,
                                color: '#5c4039',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.07)'
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#b32000', marginBottom: '16px' }}>construction</span>
                                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#131e1b', marginBottom: '8px' }}>Halaman Sedang Dikembangkan</h3>
                                <p>Halaman "{activeNav.toUpperCase()}" akan segera hadir pada pembaruan berikutnya.</p>
                            </div>
                        )}

                        <div style={{ height: '48px' }} />
                    </div>
                </main>
            </div>
        </>
    );
}
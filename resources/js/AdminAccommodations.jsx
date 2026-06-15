import React, { useState, useEffect, useCallback } from 'react';

const font = "'Plus Jakarta Sans', sans-serif";

const XSRF = () =>
    decodeURIComponent(
        document.cookie
            .split('; ')
            .find((r) => r.startsWith('XSRF-TOKEN='))
            ?.split('=')[1] || ''
    );

const ACCOMMODATION_TYPES = [
    { value: 'Hotel', label: 'Hotel', icon: 'hotel' },
    { value: 'Resort', label: 'Resort', icon: 'villa' },
    { value: 'Hostel', label: 'Hostel', icon: 'meeting_room' },
    { value: 'Guesthouse', label: 'Guesthouse', icon: 'home' },
    { value: 'Homestay', label: 'Homestay', icon: 'cottage' },
    { value: 'Villa', label: 'Villa', icon: 'house' },
    { value: 'Camping', label: 'Camping', icon: 'camping' },
];

const TYPE_COLORS = {
    Hotel: { bg: 'rgba(179,32,0,0.08)', color: '#b32000', icon: 'hotel' },
    Resort: { bg: 'rgba(0,107,94,0.08)', color: '#006b5e', icon: 'villa' },
    Hostel: { bg: 'rgba(83,94,92,0.09)', color: '#535e5c', icon: 'meeting_room' },
    Guesthouse: { bg: 'rgba(92,64,57,0.09)', color: '#5c4039', icon: 'home' },
    Homestay: { bg: 'rgba(43,250,222,0.10)', color: '#006b5e', icon: 'cottage' },
    Villa: { bg: 'rgba(179,32,0,0.06)', color: '#b32000', icon: 'house' },
    Camping: { bg: 'rgba(83,94,92,0.09)', color: '#535e5c', icon: 'camping' },
};

function formatRupiah(val) {
    if (!val && val !== 0) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function TypeBadge({ type }) {
    const cfg = TYPE_COLORS[type] || { bg: 'rgba(92,64,57,0.08)', color: '#5c4039', icon: 'hotel' };
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '4px 12px', borderRadius: '9999px',
            background: cfg.bg, color: cfg.color,
            fontFamily: font, fontSize: '11px', fontWeight: 700,
        }}>
            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>{cfg.icon}</span>
            {type}
        </span>
    );
}

function StatusBadge({ active }) {
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '4px 12px', borderRadius: '9999px',
            background: active ? 'rgba(43,250,222,0.13)' : 'rgba(92,64,57,0.09)',
            color: active ? '#006b5e' : '#5c4039',
            fontFamily: font, fontSize: '11px', fontWeight: 700,
        }}>
            <span style={{
                width: '6px', height: '6px', borderRadius: '9999px',
                background: active ? '#2bfade' : '#b09890', display: 'inline-block',
            }} />
            {active ? 'Aktif' : 'Nonaktif'}
        </span>
    );
}

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(19,30,27,0.45)', backdropFilter: 'blur(6px)',
        }}>
            <div style={{
                background: '#fff', borderRadius: '20px', padding: '36px 40px',
                maxWidth: '420px', width: '90%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                fontFamily: font, textAlign: 'center',
            }}>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '9999px',
                    background: '#fff3f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                }}>
                    <span className="material-symbols-outlined" style={{ color: '#b32000', fontSize: '28px' }}>delete</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#131e1b', marginBottom: '10px' }}>Konfirmasi Hapus</h3>
                <p style={{ fontSize: '14px', color: '#5c4039', lineHeight: 1.6, marginBottom: '28px' }}>{message}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={onCancel} style={{
                        padding: '10px 24px', border: '1.5px solid #c7b0aa',
                        borderRadius: '9999px', background: 'none',
                        fontFamily: font, fontSize: '13px', fontWeight: 700,
                        color: '#5c4039', cursor: 'pointer',
                    }}>Batal</button>
                    <button onClick={onConfirm} style={{
                        padding: '10px 24px', border: 'none',
                        borderRadius: '9999px', background: '#b32000',
                        fontFamily: font, fontSize: '13px', fontWeight: 700,
                        color: '#fff', cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(179,32,0,0.25)',
                    }}>Ya, Hapus</button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AdminAccommodations() {
    const [view, setView] = useState('list');
    const [accommodations, setAccommodations] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Filters
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDestination, setFilterDestination] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ total: 0, last_page: 1 });

    // Form
    const emptyForm = {
        destination_id: '',
        name: '',
        type: 'Hotel',
        price_per_night: '',
        address: '',
        latitude: '',
        longitude: '',
        is_active: true,
    };
    const [formData, setFormData] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // ── Toast ──────────────────────────────────────────────────────────
    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    // ── Load destinations (for select) ─────────────────────────────────
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/v1/destinations', { headers: { Accept: 'application/json' } });
                const data = await res.json();
                if (data.success) setDestinations(data.data || []);
            } catch (_) {}
        };
        load();
    }, []);

    // ── Fetch accommodations ───────────────────────────────────────────
    const fetchAccommodations = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, per_page: 10 });
            if (search) params.set('search', search);
            if (filterType) params.set('type', filterType);
            if (filterStatus) params.set('status', filterStatus);
            if (filterDestination) params.set('destination_id', filterDestination);

            const res = await fetch(`/api/v1/admin/accommodations?${params}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                setAccommodations(data.data);
                setMeta({ total: data.meta.total, last_page: data.meta.last_page });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, search, filterType, filterStatus, filterDestination]);

    useEffect(() => { fetchAccommodations(); }, [fetchAccommodations]);

    // ── Toggle ─────────────────────────────────────────────────────────
    const handleToggle = async (id) => {
        try {
            const res = await fetch(`/api/v1/admin/accommodations/${id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': XSRF(),
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            const data = await res.json();
            if (data.success) { showToast('Status akomodasi berhasil diubah.'); fetchAccommodations(); }
        } catch (_) {}
    };

    // ── Delete ─────────────────────────────────────────────────────────
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        try {
            const res = await fetch(`/api/v1/admin/accommodations/${deleteTarget.id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': XSRF(),
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast('Akomodasi berhasil dihapus.');
                fetchAccommodations();
            } else {
                showToast(data.message || 'Gagal menghapus.', 'error');
            }
        } catch (_) {
            showToast('Terjadi kesalahan.', 'error');
        } finally {
            setDeleteTarget(null);
        }
    };

    // ── Open Add ───────────────────────────────────────────────────────
    const handleAddClick = () => {
        setFormData(emptyForm);
        setEditId(null);
        setFormErrors({});
        setView('form');
    };

    // ── Open Edit ──────────────────────────────────────────────────────
    const handleEditClick = (acc) => {
        setFormData({
            destination_id: acc.destination_id || '',
            name: acc.name || '',
            type: acc.type || 'Hotel',
            price_per_night: acc.price_per_night || '',
            address: acc.address || '',
            latitude: acc.latitude || '',
            longitude: acc.longitude || '',
            is_active: acc.is_active,
        });
        setEditId(acc.id);
        setFormErrors({});
        setView('form');
    };

    // ── Submit ─────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setSubmitting(true);
        try {
            const isEdit = !!editId;
            const url = isEdit ? `/api/v1/admin/accommodations/${editId}` : '/api/v1/admin/accommodations';
            const body = JSON.stringify({
                destination_id: formData.destination_id,
                name: formData.name.trim(),
                type: formData.type,
                price_per_night: parseInt(formData.price_per_night) || 0,
                address: formData.address.trim(),
                latitude: formData.latitude || null,
                longitude: formData.longitude || null,
                is_active: formData.is_active,
            });

            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': XSRF(),
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
                body,
            });
            const data = await res.json();

            if (res.ok && data.success) {
                showToast(isEdit ? 'Akomodasi berhasil diperbarui!' : 'Akomodasi berhasil ditambahkan!');
                setView('list');
                fetchAccommodations();
            } else {
                if (data.errors) setFormErrors(data.errors);
                showToast(data.message || 'Validasi gagal.', 'error');
            }
        } catch (_) {
            showToast('Gagal menghubungi server.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const fErr = (field) => formErrors[field]?.[0];

    // ──────────────────────────────────────────────────────────────────
    return (
        <div style={{ width: '100%', fontFamily: font, position: 'relative' }}>

            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: '24px', right: '24px', zIndex: 1000,
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 22px', borderRadius: '14px',
                    background: toast.type === 'error' ? '#fff3f0' : 'rgba(240,252,247,0.97)',
                    border: `1.5px solid ${toast.type === 'error' ? '#e6bdb5' : '#2bfade55'}`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    fontFamily: font, fontSize: '14px', fontWeight: 600,
                    color: toast.type === 'error' ? '#b32000' : '#006b5e',
                    animation: 'slideInRight 0.3s ease',
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        {toast.type === 'error' ? 'error' : 'check_circle'}
                    </span>
                    {toast.msg}
                </div>
            )}

            {deleteTarget && (
                <ConfirmModal
                    message={`Hapus akomodasi "${deleteTarget.name}"? Tindakan ini tidak dapat dibatalkan.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(24px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .acc-row { transition: background 0.18s; }
                .acc-row:hover { background: rgba(179,32,0,0.025); }
                .acc-action-btn {
                    padding: 8px; border: none; background: none;
                    border-radius: 10px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: background 0.2s, color 0.2s; color: #5c4039;
                }
                .acc-action-btn:hover { background: #d9e5e0; }
                .acc-action-btn.danger:hover { background: #ffdad3; color: #b32000; }
                .acc-action-btn.on { color: #006b5e; }
                .acc-action-btn.on:hover { background: rgba(43,250,222,0.15); }
                .acc-action-btn.off { color: #b09890; }
                .acc-action-btn.off:hover { background: #f5eded; }

                .acc-btn-primary {
                    display: flex; align-items: center; gap: 8px;
                    background: linear-gradient(135deg, #de2f08, #b32000);
                    color: #fff; border: none;
                    padding: 13px 28px; border-radius: 9999px;
                    font-family: ${font}; font-size: 14px; font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 6px 20px rgba(179,32,0,0.22);
                    transition: all 0.25s;
                }
                .acc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(179,32,0,0.30); }
                .acc-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

                .acc-btn-outline {
                    display: flex; align-items: center; gap: 8px;
                    background: none; color: #5c4039;
                    border: 1.5px solid #c7b0aa;
                    padding: 12px 24px; border-radius: 9999px;
                    font-family: ${font}; font-size: 14px; font-weight: 700;
                    cursor: pointer; transition: all 0.22s;
                }
                .acc-btn-outline:hover { background: rgba(92,64,57,0.06); border-color: #5c4039; }

                .acc-form-input, .acc-form-select, .acc-form-textarea {
                    width: 100%; font-family: ${font}; font-size: 14px;
                    color: #131e1b; background: rgba(255,255,255,0.8);
                    border: 1.5px solid #c7b0aa; border-radius: 12px;
                    padding: 13px 16px; outline: none;
                    transition: all 0.22s; box-sizing: border-box;
                }
                .acc-form-input:focus, .acc-form-select:focus, .acc-form-textarea:focus {
                    border-color: #b32000; background: #fff;
                    box-shadow: 0 0 0 3px rgba(179,32,0,0.08);
                }
                .acc-form-input.err, .acc-form-select.err, .acc-form-textarea.err { border-color: #b32000; background: #fff8f7; }
                .acc-form-textarea { resize: vertical; min-height: 80px; }
                .acc-form-label {
                    font-family: ${font}; font-size: 11px; font-weight: 700;
                    letter-spacing: 0.18em; text-transform: uppercase; color: #5c4039;
                }
                .acc-field-err { font-family: ${font}; font-size: 12px; color: #b32000; font-weight: 600; margin-top: 4px; }

                .acc-filter-input, .acc-filter-select {
                    font-family: ${font}; font-size: 13px;
                    background: rgba(255,255,255,0.65);
                    border: 1.5px solid rgba(230,189,181,0.5);
                    border-radius: 10px; padding: 9px 14px;
                    outline: none; transition: all 0.2s; color: #131e1b;
                }
                .acc-filter-input:focus, .acc-filter-select:focus { border-color: #b32000; background: #fff; }

                .status-pill {
                    padding: 6px 16px; border-radius: 9999px;
                    font-family: ${font}; font-size: 11px; font-weight: 700;
                    cursor: pointer; border: none; transition: all 0.2s;
                }

                .type-card {
                    display: flex; flex-direction: column; align-items: center; gap: 6px;
                    padding: 14px 10px; border-radius: 14px; cursor: pointer;
                    border: 2px solid transparent; transition: all 0.2s;
                    background: rgba(255,255,255,0.6);
                }
                .type-card:hover { border-color: #c7b0aa; }
                .type-card.selected { border-color: #b32000; background: rgba(179,32,0,0.06); }
            `}</style>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* LIST VIEW                                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === 'list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
                        <div>
                            <p style={{
                                fontFamily: font, fontSize: '11px', fontWeight: 700,
                                letterSpacing: '0.28em', textTransform: 'uppercase',
                                color: '#b32000', marginBottom: '6px',
                            }}>MANAJEMEN PENGINAPAN</p>
                            <h2 style={{
                                fontFamily: font, fontSize: '38px', fontWeight: 900,
                                color: '#131e1b', letterSpacing: '-0.03em', lineHeight: 1.1,
                            }}>Akomodasi</h2>
                            <p style={{ fontFamily: font, fontSize: '14px', color: '#5c4039', marginTop: '6px', fontWeight: 500 }}>
                                Kelola penginapan & akomodasi di seluruh destinasi wisata.
                            </p>
                        </div>
                        <button className="acc-btn-primary" onClick={handleAddClick}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_home_work</span>
                            Tambah Akomodasi
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        {[
                            { label: 'Total', value: meta.total, icon: 'hotel', accent: '#b32000' },
                            { label: 'Aktif', value: accommodations.filter(a => a.is_active).length, icon: 'check_circle', accent: '#006b5e' },
                            { label: 'Nonaktif', value: accommodations.filter(a => !a.is_active).length, icon: 'cancel', accent: '#5c4039' },
                            { label: 'Tipe', value: ACCOMMODATION_TYPES.length, icon: 'category', accent: '#535e5c' },
                        ].map((s) => (
                            <div key={s.label} style={{
                                background: 'rgba(255,255,255,0.72)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.4)',
                                borderLeft: `4px solid ${s.accent}`,
                                borderRadius: '16px', padding: '18px 22px',
                                display: 'flex', alignItems: 'center', gap: '14px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '26px', color: s.accent }}>{s.icon}</span>
                                <div>
                                    <div style={{ fontFamily: font, fontSize: '26px', fontWeight: 900, color: '#131e1b', lineHeight: 1 }}>{loading ? '…' : s.value}</div>
                                    <div style={{ fontFamily: font, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5c4039', marginTop: '4px' }}>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div style={{
                        display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center',
                        background: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(230,189,181,0.4)',
                        borderRadius: '16px', padding: '14px 18px',
                        backdropFilter: 'blur(12px)',
                    }}>
                        {/* Search */}
                        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                            <span className="material-symbols-outlined" style={{
                                position: 'absolute', left: '11px', top: '50%',
                                transform: 'translateY(-50%)', fontSize: '17px', color: '#5c4039',
                            }}>search</span>
                            <input
                                className="acc-filter-input"
                                type="text"
                                placeholder="Cari nama akomodasi..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box' }}
                            />
                        </div>

                        {/* Type filter */}
                        <select className="acc-filter-select" value={filterType}
                            onChange={(e) => { setFilterType(e.target.value); setPage(1); }}>
                            <option value="">Semua Tipe</option>
                            {ACCOMMODATION_TYPES.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>

                        {/* Status filter pills */}
                        <div style={{ display: 'flex', gap: '5px', padding: '4px', background: '#e8f5ee', borderRadius: '10px' }}>
                            {[{ label: 'Semua', val: '' }, { label: 'Aktif', val: 'active' }, { label: 'Nonaktif', val: 'inactive' }].map(({ label, val }) => (
                                <button key={val} className="status-pill"
                                    onClick={() => { setFilterStatus(val); setPage(1); }}
                                    style={{
                                        background: filterStatus === val ? 'linear-gradient(135deg, #de2f08, #b32000)' : 'transparent',
                                        color: filterStatus === val ? '#fff' : '#5c4039',
                                        boxShadow: filterStatus === val ? '0 2px 8px rgba(179,32,0,0.2)' : 'none',
                                    }}>{label}</button>
                            ))}
                        </div>

                        {(search || filterType || filterStatus) && (
                            <button className="acc-btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}
                                onClick={() => { setSearch(''); setFilterType(''); setFilterStatus(''); setFilterDestination(''); setPage(1); }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>close</span>
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Table */}
                    <div style={{
                        background: 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(230,189,181,0.5)',
                        borderRadius: '20px', overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(222,235,230,0.7)', borderBottom: '1px solid rgba(230,189,181,0.4)' }}>
                                    {['#', 'Nama Akomodasi', 'Tipe', 'Destinasi', 'Harga / Malam', 'Status', 'Aksi'].map((h, i) => (
                                        <th key={h} style={{
                                            padding: '16px 18px',
                                            fontFamily: font, fontSize: '10px', fontWeight: 700,
                                            letterSpacing: '0.16em', textTransform: 'uppercase',
                                            color: '#131e1b',
                                            textAlign: [4, 5, 6].includes(i) ? 'center' : 'left',
                                        }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '36px', display: 'block', marginBottom: '10px', color: '#b32000', opacity: 0.5 }}>hourglass_top</span>
                                        Memuat data akomodasi...
                                    </td></tr>
                                ) : accommodations.length === 0 ? (
                                    <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '10px', color: '#b09890' }}>hotel</span>
                                        Belum ada data akomodasi.
                                    </td></tr>
                                ) : (
                                    accommodations.map((acc, idx) => (
                                        <tr key={acc.id} className="acc-row" style={{
                                            borderBottom: idx < accommodations.length - 1 ? '1px solid rgba(230,189,181,0.2)' : 'none',
                                        }}>
                                            <td style={{ padding: '14px 18px', fontFamily: font, fontSize: '13px', color: '#b09890', fontWeight: 600 }}>
                                                {(page - 1) * 10 + idx + 1}
                                            </td>
                                            <td style={{ padding: '14px 18px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '42px', height: '42px', borderRadius: '11px', flexShrink: 0,
                                                        background: TYPE_COLORS[acc.type]?.bg || 'rgba(92,64,57,0.08)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        border: '1px solid rgba(230,189,181,0.35)',
                                                    }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: TYPE_COLORS[acc.type]?.color || '#5c4039' }}>
                                                            {TYPE_COLORS[acc.type]?.icon || 'hotel'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: '#131e1b' }}>{acc.name}</div>
                                                        <div style={{ fontFamily: font, fontSize: '11px', color: '#5c4039', marginTop: '2px' }}>
                                                            {acc.address?.substring(0, 40)}{acc.address?.length > 40 ? '...' : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 18px' }}>
                                                <TypeBadge type={acc.type} />
                                            </td>
                                            <td style={{ padding: '14px 18px' }}>
                                                <div style={{ fontFamily: font, fontSize: '13px', fontWeight: 600, color: '#131e1b' }}>
                                                    {acc.destination?.name || '-'}
                                                </div>
                                                {acc.destination?.regency && (
                                                    <div style={{ fontFamily: font, fontSize: '11px', color: '#5c4039', marginTop: '2px' }}>
                                                        {acc.destination.regency.name}
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                                                <span style={{
                                                    fontFamily: font, fontSize: '13px', fontWeight: 700,
                                                    color: '#006b5e',
                                                }}>
                                                    {acc.price_per_night === 0
                                                        ? <span style={{ color: '#5c4039' }}>Gratis</span>
                                                        : formatRupiah(acc.price_per_night)
                                                    }
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                                                <StatusBadge active={acc.is_active} />
                                            </td>
                                            <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                                                    <button className={`acc-action-btn ${acc.is_active ? 'on' : 'off'}`}
                                                        onClick={() => handleToggle(acc.id)}
                                                        title={acc.is_active ? 'Nonaktifkan' : 'Aktifkan'}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                                                            {acc.is_active ? 'toggle_on' : 'toggle_off'}
                                                        </span>
                                                    </button>
                                                    <button className="acc-action-btn" onClick={() => handleEditClick(acc)} title="Edit">
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                                                    </button>
                                                    <button className="acc-action-btn danger"
                                                        onClick={() => setDeleteTarget({ id: acc.id, name: acc.name })} title="Hapus">
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {meta.last_page > 1 && (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 22px',
                                background: 'rgba(234,246,241,0.6)',
                                borderTop: '1px solid rgba(230,189,181,0.3)',
                            }}>
                                <span style={{ fontFamily: font, fontSize: '13px', color: '#5c4039' }}>
                                    Total <strong style={{ color: '#131e1b' }}>{meta.total}</strong> akomodasi &nbsp;·&nbsp; Hal. {page} / {meta.last_page}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {['chevron_left', 'chevron_right'].map((icon, i) => {
                                        const disabled = i === 0 ? page === 1 : page === meta.last_page;
                                        return (
                                            <button key={icon} disabled={disabled}
                                                onClick={() => setPage(p => i === 0 ? Math.max(1, p - 1) : Math.min(meta.last_page, p + 1))}
                                                style={{
                                                    width: '34px', height: '34px', border: '1px solid #e6bdb5',
                                                    borderRadius: '9px', background: disabled ? 'none' : '#fff',
                                                    cursor: disabled ? 'not-allowed' : 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: disabled ? '#c7b0aa' : '#131e1b', opacity: disabled ? 0.5 : 1,
                                                }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '19px' }}>{icon}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* FORM VIEW (Add / Edit)                                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === 'form' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Form Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{
                                fontFamily: font, fontSize: '11px', fontWeight: 700,
                                letterSpacing: '0.28em', textTransform: 'uppercase',
                                color: '#b32000', marginBottom: '6px',
                            }}>
                                {editId ? 'EDIT AKOMODASI' : 'TAMBAH AKOMODASI BARU'}
                            </p>
                            <h2 style={{
                                fontFamily: font, fontSize: '34px', fontWeight: 900,
                                color: '#131e1b', letterSpacing: '-0.02em', lineHeight: 1.1,
                            }}>
                                {editId ? `Edit: ${formData.name}` : 'Tambah Akomodasi'}
                            </h2>
                        </div>
                        <button className="acc-btn-outline" onClick={() => setView('list')}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                            Kembali
                        </button>
                    </div>

                    {/* Form Card */}
                    <form onSubmit={handleSubmit}>
                        <div style={{
                            background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(230,189,181,0.5)',
                            borderRadius: '24px',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                            overflow: 'hidden',
                        }}>
                            {/* Card header */}
                            <div style={{
                                padding: '18px 30px',
                                background: 'linear-gradient(90deg, rgba(222,235,230,0.8) 0%, rgba(240,252,247,0.5) 100%)',
                                borderBottom: '1px solid rgba(230,189,181,0.3)',
                                display: 'flex', alignItems: 'center', gap: '12px',
                            }}>
                                <div style={{
                                    width: '38px', height: '38px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #de2f08, #b32000)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fff' }}>
                                        {editId ? 'edit_home' : 'add_home_work'}
                                    </span>
                                </div>
                                <div>
                                    <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: '#131e1b' }}>
                                        {editId ? 'Perbarui Data Akomodasi' : 'Data Akomodasi Baru'}
                                    </div>
                                    <div style={{ fontFamily: font, fontSize: '12px', color: '#5c4039' }}>
                                        Semua field bertanda * wajib diisi
                                    </div>
                                </div>
                            </div>

                            {/* Form body */}
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

                                {/* Type selector cards */}
                                <div>
                                    <label className="acc-form-label" style={{ display: 'block', marginBottom: '12px' }}>
                                        Tipe Akomodasi <span style={{ color: '#b32000' }}>*</span>
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                                        {ACCOMMODATION_TYPES.map((t) => (
                                            <button
                                                key={t.value}
                                                type="button"
                                                className={`type-card ${formData.type === t.value ? 'selected' : ''}`}
                                                onClick={() => setFormData(p => ({ ...p, type: t.value }))}
                                            >
                                                <span className="material-symbols-outlined" style={{
                                                    fontSize: '24px',
                                                    color: formData.type === t.value ? '#b32000' : '#5c4039',
                                                }}>{t.icon}</span>
                                                <span style={{
                                                    fontFamily: font, fontSize: '11px', fontWeight: 700,
                                                    color: formData.type === t.value ? '#b32000' : '#5c4039',
                                                    textAlign: 'center',
                                                }}>{t.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 2-col grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                                    {/* Name */}
                                    <div>
                                        <label className="acc-form-label" style={{ display: 'block', marginBottom: '8px' }}>
                                            Nama Akomodasi <span style={{ color: '#b32000' }}>*</span>
                                        </label>
                                        <input className={`acc-form-input${fErr('name') ? ' err' : ''}`}
                                            type="text" placeholder="Contoh: Hotel Grand Makassar"
                                            value={formData.name}
                                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                            required />
                                        {fErr('name') && <p className="acc-field-err">{fErr('name')}</p>}
                                    </div>

                                    {/* Destination */}
                                    <div>
                                        <label className="acc-form-label" style={{ display: 'block', marginBottom: '8px' }}>
                                            Destinasi Wisata <span style={{ color: '#b32000' }}>*</span>
                                        </label>
                                        <select className={`acc-form-select${fErr('destination_id') ? ' err' : ''}`}
                                            value={formData.destination_id}
                                            onChange={(e) => setFormData(p => ({ ...p, destination_id: e.target.value }))}
                                            required>
                                            <option value="">-- Pilih Destinasi --</option>
                                            {destinations.map(d => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                        {fErr('destination_id') && <p className="acc-field-err">{fErr('destination_id')}</p>}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="acc-form-label" style={{ display: 'block', marginBottom: '8px' }}>
                                            Harga per Malam (Rp) <span style={{ color: '#b32000' }}>*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{
                                                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                                fontFamily: font, fontSize: '13px', fontWeight: 700, color: '#5c4039',
                                            }}>Rp</span>
                                            <input className={`acc-form-input${fErr('price_per_night') ? ' err' : ''}`}
                                                type="number" min="0" placeholder="0 = Gratis"
                                                style={{ paddingLeft: '40px' }}
                                                value={formData.price_per_night}
                                                onChange={(e) => setFormData(p => ({ ...p, price_per_night: e.target.value }))}
                                                required />
                                        </div>
                                        {formData.price_per_night && (
                                            <p style={{ fontFamily: font, fontSize: '11px', color: '#006b5e', marginTop: '4px' }}>
                                                {parseInt(formData.price_per_night) === 0 ? 'Gratis' : formatRupiah(formData.price_per_night)}
                                            </p>
                                        )}
                                        {fErr('price_per_night') && <p className="acc-field-err">{fErr('price_per_night')}</p>}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="acc-form-label" style={{ display: 'block', marginBottom: '8px' }}>
                                            Alamat Lengkap <span style={{ color: '#b32000' }}>*</span>
                                        </label>
                                        <textarea className={`acc-form-textarea${fErr('address') ? ' err' : ''}`}
                                            placeholder="Jl. Contoh No. 1, Kec. X, Kab. Y..."
                                            value={formData.address}
                                            onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                                            required />
                                        {fErr('address') && <p className="acc-field-err">{fErr('address')}</p>}
                                    </div>

                                    {/* Latitude */}
                                    <div>
                                        <label className="acc-form-label" style={{ display: 'block', marginBottom: '8px' }}>
                                            Latitude <span style={{ color: '#b09890', fontWeight: 500 }}>(opsional)</span>
                                        </label>
                                        <input className="acc-form-input"
                                            type="number" step="any" placeholder="-5.1477..."
                                            value={formData.latitude}
                                            onChange={(e) => setFormData(p => ({ ...p, latitude: e.target.value }))} />
                                    </div>

                                    {/* Longitude */}
                                    <div>
                                        <label className="acc-form-label" style={{ display: 'block', marginBottom: '8px' }}>
                                            Longitude <span style={{ color: '#b09890', fontWeight: 500 }}>(opsional)</span>
                                        </label>
                                        <input className="acc-form-input"
                                            type="number" step="any" placeholder="119.4327..."
                                            value={formData.longitude}
                                            onChange={(e) => setFormData(p => ({ ...p, longitude: e.target.value }))} />
                                    </div>
                                </div>

                                {/* Active toggle */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '16px 20px',
                                    background: 'rgba(240,252,247,0.6)',
                                    border: '1px solid rgba(43,250,222,0.2)',
                                    borderRadius: '14px',
                                }}>
                                    <div>
                                        <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: '#131e1b' }}>Status Aktif</div>
                                        <div style={{ fontFamily: font, fontSize: '12px', color: '#5c4039', marginTop: '3px' }}>
                                            Akomodasi aktif akan tampil di halaman publik destinasi
                                        </div>
                                    </div>
                                    <button type="button"
                                        onClick={() => setFormData(p => ({ ...p, is_active: !p.is_active }))}
                                        style={{
                                            width: '52px', height: '28px', borderRadius: '9999px',
                                            background: formData.is_active ? '#006b5e' : '#c7b0aa',
                                            border: 'none', cursor: 'pointer', position: 'relative',
                                            transition: 'background 0.25s', flexShrink: 0,
                                        }}>
                                        <span style={{
                                            position: 'absolute', top: '3px',
                                            left: formData.is_active ? '26px' : '3px',
                                            width: '22px', height: '22px',
                                            borderRadius: '9999px', background: '#fff',
                                            transition: 'left 0.25s',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                        }} />
                                    </button>
                                </div>

                                {/* Buttons */}
                                <div style={{
                                    display: 'flex', gap: '12px',
                                    borderTop: '1px solid rgba(230,189,181,0.3)',
                                    paddingTop: '20px',
                                }}>
                                    <button type="submit" className="acc-btn-primary" disabled={submitting}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                            {submitting ? 'hourglass_top' : 'save'}
                                        </span>
                                        {submitting ? 'Menyimpan...' : (editId ? 'Perbarui Akomodasi' : 'Simpan Akomodasi')}
                                    </button>
                                    <button type="button" className="acc-btn-outline" onClick={() => setView('list')}>
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

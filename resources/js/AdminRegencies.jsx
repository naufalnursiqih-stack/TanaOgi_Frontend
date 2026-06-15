import React, { useState, useEffect, useCallback } from 'react';

const font = "'Plus Jakarta Sans', sans-serif";

const XSRF = () =>
    decodeURIComponent(
        document.cookie
            .split('; ')
            .find((r) => r.startsWith('XSRF-TOKEN='))
            ?.split('=')[1] || ''
    );

// ─── Small helpers ─────────────────────────────────────────────────────────────

function Badge({ active }) {
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 700,
            background: active ? 'rgba(43,250,222,0.13)' : 'rgba(92,64,57,0.09)',
            color: active ? '#006b5e' : '#5c4039',
        }}>
            <span style={{
                width: '6px', height: '6px', borderRadius: '9999px',
                background: active ? '#2bfade' : '#b09890',
                display: 'inline-block',
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
            background: 'rgba(19,30,27,0.45)',
            backdropFilter: 'blur(6px)',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '36px 40px',
                maxWidth: '420px',
                width: '90%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                fontFamily: font,
                textAlign: 'center',
            }}>
                <div style={{
                    width: '56px', height: '56px',
                    borderRadius: '9999px',
                    background: '#fff3f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                }}>
                    <span className="material-symbols-outlined" style={{ color: '#b32000', fontSize: '28px' }}>warning</span>
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

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function AdminRegencies() {
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [regencies, setRegencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null); // { msg, type }

    // Filters
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ total: 0, last_page: 1 });

    // Form
    const [formData, setFormData] = useState({ name: '', is_active: true });
    const [editId, setEditId] = useState(null);
    const [formError, setFormError] = useState('');

    // Confirm delete
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

    // ── Toast helper ──────────────────────────────────────────────────────────
    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    // ── Fetch regencies ───────────────────────────────────────────────────────
    const fetchRegencies = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page, per_page: 10 });
            if (search) params.set('search', search);
            if (filterStatus) params.set('status', filterStatus);

            const res = await fetch(`/api/v1/admin/regencies?${params}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                setRegencies(data.data);
                setMeta({ total: data.meta.total, last_page: data.meta.last_page });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, search, filterStatus]);

    useEffect(() => { fetchRegencies(); }, [fetchRegencies]);

    // ── Toggle active ─────────────────────────────────────────────────────────
    const handleToggle = async (id) => {
        try {
            const res = await fetch(`/api/v1/admin/regencies/${id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': XSRF(),
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                showToast('Status kabupaten berhasil diubah.');
                fetchRegencies();
            }
        } catch (err) { console.error(err); }
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        try {
            const res = await fetch(`/api/v1/admin/regencies/${deleteTarget.id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': XSRF(),
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast('Kabupaten berhasil dihapus.');
                fetchRegencies();
            } else {
                showToast(data.message || 'Gagal menghapus kabupaten.', 'error');
            }
        } catch (err) {
            showToast('Terjadi kesalahan saat menghapus.', 'error');
        } finally {
            setDeleteTarget(null);
        }
    };

    // ── Open Add form ─────────────────────────────────────────────────────────
    const handleAddClick = () => {
        setFormData({ name: '', is_active: true });
        setEditId(null);
        setFormError('');
        setView('add');
    };

    // ── Open Edit form ────────────────────────────────────────────────────────
    const handleEditClick = (reg) => {
        setFormData({ name: reg.name, is_active: reg.is_active });
        setEditId(reg.id);
        setFormError('');
        setView('edit');
    };

    // ── Submit form ───────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        if (!formData.name.trim()) {
            setFormError('Nama kabupaten tidak boleh kosong.');
            return;
        }
        setSubmitting(true);
        try {
            const isEdit = view === 'edit';
            const url = isEdit ? `/api/v1/admin/regencies/${editId}` : '/api/v1/admin/regencies';
            const body = JSON.stringify({
                name: formData.name.trim(),
                is_active: formData.is_active,
                ...(isEdit ? { _method: 'PUT' } : {}),
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
                showToast(isEdit ? 'Kabupaten berhasil diperbarui!' : 'Kabupaten berhasil ditambahkan!');
                setView('list');
                fetchRegencies();
            } else {
                const firstError = data.errors
                    ? Object.values(data.errors).flat()[0]
                    : data.message || 'Terjadi kesalahan.';
                setFormError(firstError);
            }
        } catch (err) {
            setFormError('Gagal menghubungi server.');
        } finally {
            setSubmitting(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div style={{ width: '100%', fontFamily: font, position: 'relative' }}>

            {/* ── Toast Notification ─────────────────────────────────────── */}
            {toast && (
                <div style={{
                    position: 'fixed', top: '24px', right: '24px', zIndex: 1000,
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 22px',
                    borderRadius: '14px',
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

            {/* ── Confirm Delete Modal ────────────────────────────────────── */}
            {deleteTarget && (
                <ConfirmModal
                    message={`Apakah Anda yakin ingin menghapus kabupaten "${deleteTarget.name}"? Kabupaten dengan destinasi aktif tidak dapat dihapus.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(24px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .reg-action-btn {
                    padding: 8px;
                    border: none;
                    background: none;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s ease, color 0.2s ease;
                    color: #5c4039;
                }
                .reg-action-btn:hover { background: #d9e5e0; }
                .reg-action-btn.danger:hover { background: #ffdad3; color: #b32000; }
                .reg-action-btn.active-toggle { color: #006b5e; }
                .reg-action-btn.active-toggle:hover { background: rgba(43,250,222,0.15); }
                .reg-action-btn.inactive-toggle { color: #b09890; }
                .reg-action-btn.inactive-toggle:hover { background: #f5eded; }

                .reg-row { transition: background 0.18s ease; }
                .reg-row:hover { background: rgba(179,32,0,0.03); }

                .reg-form-input {
                    width: 100%;
                    font-family: ${font};
                    font-size: 14px;
                    color: #131e1b;
                    background: rgba(255,255,255,0.8);
                    border: 1.5px solid #c7b0aa;
                    border-radius: 12px;
                    padding: 13px 16px;
                    outline: none;
                    transition: all 0.22s ease;
                    box-sizing: border-box;
                }
                .reg-form-input:focus {
                    border-color: #b32000;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(179,32,0,0.08);
                }
                .reg-form-input.error {
                    border-color: #b32000;
                    background: #fff8f7;
                }

                .reg-filter-input {
                    font-family: ${font};
                    font-size: 13px;
                    background: rgba(255,255,255,0.65);
                    border: 1.5px solid rgba(230,189,181,0.5);
                    border-radius: 10px;
                    padding: 9px 14px;
                    outline: none;
                    transition: all 0.2s;
                    color: #131e1b;
                }
                .reg-filter-input:focus { border-color: #b32000; background: #fff; }

                .reg-btn-primary {
                    display: flex; align-items: center; gap: 8px;
                    background: linear-gradient(135deg, #de2f08 0%, #b32000 100%);
                    color: #fff; border: none;
                    padding: 13px 28px; border-radius: 9999px;
                    font-family: ${font}; font-size: 14px; font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 6px 20px rgba(179,32,0,0.22);
                    transition: all 0.25s ease;
                }
                .reg-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 28px rgba(179,32,0,0.30);
                }
                .reg-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

                .reg-btn-outline {
                    display: flex; align-items: center; gap: 8px;
                    background: none;
                    color: #5c4039; border: 1.5px solid #c7b0aa;
                    padding: 12px 24px; border-radius: 9999px;
                    font-family: ${font}; font-size: 14px; font-weight: 700;
                    cursor: pointer; transition: all 0.22s ease;
                }
                .reg-btn-outline:hover { background: rgba(92,64,57,0.06); border-color: #5c4039; }

                .status-pill {
                    padding: 6px 16px;
                    border-radius: 9999px;
                    font-family: ${font};
                    font-size: 11px;
                    font-weight: 700;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s;
                }
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
                            }}>MANAJEMEN WILAYAH</p>
                            <h2 style={{
                                fontFamily: font, fontSize: '38px', fontWeight: 900,
                                color: '#131e1b', letterSpacing: '-0.03em', lineHeight: 1.1,
                            }}>Kabupaten & Kota</h2>
                            <p style={{
                                fontFamily: font, fontSize: '14px', color: '#5c4039',
                                marginTop: '6px', fontWeight: 500,
                            }}>
                                Kelola daftar kabupaten/kota destinasi wisata Sulawesi Selatan.
                            </p>
                        </div>
                        <button className="reg-btn-primary" onClick={handleAddClick}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_location_alt</span>
                            Tambah Kabupaten
                        </button>
                    </div>

                    {/* Stats bar */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
                    }}>
                        {[
                            { label: 'Total Kabupaten', value: meta.total, icon: 'map', accent: '#b32000' },
                            { label: 'Aktif', value: regencies.filter(r => r.is_active).length + (loading ? '…' : ''), icon: 'check_circle', accent: '#006b5e' },
                            { label: 'Nonaktif', value: regencies.filter(r => !r.is_active).length, icon: 'cancel', accent: '#5c4039' },
                        ].map((s) => (
                            <div key={s.label} style={{
                                background: 'rgba(255,255,255,0.72)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.4)',
                                borderLeft: `4px solid ${s.accent}`,
                                borderRadius: '16px', padding: '20px 24px',
                                display: 'flex', alignItems: 'center', gap: '16px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: s.accent }}>{s.icon}</span>
                                <div>
                                    <div style={{ fontFamily: font, fontSize: '28px', fontWeight: 900, color: '#131e1b', lineHeight: 1 }}>{s.value}</div>
                                    <div style={{ fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5c4039', marginTop: '4px' }}>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Bar */}
                    <div style={{
                        display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center',
                        background: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(230,189,181,0.4)',
                        borderRadius: '16px', padding: '16px 20px',
                        backdropFilter: 'blur(12px)',
                    }}>
                        {/* Search */}
                        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                            <span className="material-symbols-outlined" style={{
                                position: 'absolute', left: '12px', top: '50%',
                                transform: 'translateY(-50%)', fontSize: '18px', color: '#5c4039',
                            }}>search</span>
                            <input
                                className="reg-filter-input"
                                type="text"
                                placeholder="Cari nama kabupaten..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                style={{ paddingLeft: '38px', width: '100%', boxSizing: 'border-box' }}
                            />
                        </div>

                        {/* Status filter */}
                        <div style={{ display: 'flex', gap: '6px', padding: '4px', background: '#e8f5ee', borderRadius: '10px' }}>
                            {[
                                { label: 'Semua', val: '' },
                                { label: 'Aktif', val: 'active' },
                                { label: 'Nonaktif', val: 'inactive' },
                            ].map(({ label, val }) => (
                                <button
                                    key={val}
                                    onClick={() => { setFilterStatus(val); setPage(1); }}
                                    className="status-pill"
                                    style={{
                                        background: filterStatus === val
                                            ? 'linear-gradient(135deg, #de2f08 0%, #b32000 100%)'
                                            : 'transparent',
                                        color: filterStatus === val ? '#fff' : '#5c4039',
                                        boxShadow: filterStatus === val ? '0 2px 8px rgba(179,32,0,0.2)' : 'none',
                                    }}
                                >{label}</button>
                            ))}
                        </div>

                        {/* Reset */}
                        {(search || filterStatus) && (
                            <button className="reg-btn-outline" style={{ padding: '9px 18px', fontSize: '13px' }}
                                onClick={() => { setSearch(''); setFilterStatus(''); setPage(1); }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Table */}
                    <div style={{
                        background: 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(230,189,181,0.5)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(222,235,230,0.7)', borderBottom: '1px solid rgba(230,189,181,0.4)' }}>
                                    {['#', 'Nama Kabupaten / Kota', 'Slug', 'Destinasi', 'Status', 'Aksi'].map((h, i) => (
                                        <th key={h} style={{
                                            padding: '16px 20px',
                                            fontFamily: font, fontSize: '10px', fontWeight: 700,
                                            letterSpacing: '0.18em', textTransform: 'uppercase',
                                            color: '#131e1b',
                                            textAlign: [3, 4, 5].includes(i) ? 'center' : 'left',
                                        }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '48px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '36px', display: 'block', marginBottom: '10px', color: '#b32000', opacity: 0.5 }}>hourglass_top</span>
                                            Memuat data kabupaten...
                                        </td>
                                    </tr>
                                ) : regencies.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '48px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '10px', color: '#b09890' }}>map_search</span>
                                            Tidak ada kabupaten ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    regencies.map((reg, idx) => (
                                        <tr key={reg.id} className="reg-row" style={{
                                            borderBottom: idx < regencies.length - 1
                                                ? '1px solid rgba(230,189,181,0.2)'
                                                : 'none',
                                        }}>
                                            {/* No */}
                                            <td style={{ padding: '16px 20px', fontFamily: font, fontSize: '13px', color: '#b09890', fontWeight: 600 }}>
                                                {(page - 1) * 10 + idx + 1}
                                            </td>
                                            {/* Name */}
                                            <td style={{ padding: '16px 20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '40px', height: '40px',
                                                        borderRadius: '10px',
                                                        background: 'linear-gradient(135deg, #f0fcf7 0%, #d9e5e0 100%)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        flexShrink: 0,
                                                        border: '1px solid rgba(230,189,181,0.4)',
                                                    }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#b32000' }}>location_city</span>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: '#131e1b' }}>{reg.name}</div>
                                                        <div style={{ fontFamily: font, fontSize: '11px', color: '#5c4039', marginTop: '2px' }}>
                                                            Ditambah {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Slug */}
                                            <td style={{ padding: '16px 20px' }}>
                                                <code style={{
                                                    fontFamily: 'monospace', fontSize: '12px',
                                                    background: '#f0fcf7', padding: '3px 8px',
                                                    borderRadius: '6px', color: '#006b5e',
                                                    border: '1px solid rgba(43,250,222,0.2)',
                                                }}>{reg.slug}</code>
                                            </td>
                                            {/* Destinations count */}
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <div style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                    padding: '5px 14px', borderRadius: '9999px',
                                                    background: reg.destinations_count > 0 ? 'rgba(179,32,0,0.07)' : 'rgba(92,64,57,0.06)',
                                                }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: reg.destinations_count > 0 ? '#b32000' : '#b09890' }}>landscape</span>
                                                    <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 700, color: reg.destinations_count > 0 ? '#b32000' : '#b09890' }}>
                                                        {reg.destinations_count ?? 0}
                                                    </span>
                                                </div>
                                            </td>
                                            {/* Status */}
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <Badge active={reg.is_active} />
                                            </td>
                                            {/* Actions */}
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                                                    {/* Toggle active */}
                                                    <button
                                                        className={`reg-action-btn ${reg.is_active ? 'active-toggle' : 'inactive-toggle'}`}
                                                        onClick={() => handleToggle(reg.id)}
                                                        title={reg.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                                                            {reg.is_active ? 'toggle_on' : 'toggle_off'}
                                                        </span>
                                                    </button>
                                                    {/* Edit */}
                                                    <button
                                                        className="reg-action-btn"
                                                        onClick={() => handleEditClick(reg)}
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                                                    </button>
                                                    {/* Delete */}
                                                    <button
                                                        className="reg-action-btn danger"
                                                        onClick={() => setDeleteTarget({ id: reg.id, name: reg.name })}
                                                        title="Hapus"
                                                    >
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
                                padding: '16px 24px',
                                background: 'rgba(234,246,241,0.6)',
                                borderTop: '1px solid rgba(230,189,181,0.3)',
                            }}>
                                <span style={{ fontFamily: font, fontSize: '13px', color: '#5c4039' }}>
                                    Total <strong style={{ color: '#131e1b' }}>{meta.total}</strong> kabupaten &nbsp;·&nbsp; Halaman {page} dari {meta.last_page}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {['chevron_left', 'chevron_right'].map((icon, i) => {
                                        const disabled = i === 0 ? page === 1 : page === meta.last_page;
                                        return (
                                            <button key={icon}
                                                disabled={disabled}
                                                onClick={() => setPage(p => i === 0 ? Math.max(1, p - 1) : Math.min(meta.last_page, p + 1))}
                                                style={{
                                                    width: '36px', height: '36px',
                                                    border: '1px solid #e6bdb5',
                                                    borderRadius: '10px', background: disabled ? 'none' : '#fff',
                                                    cursor: disabled ? 'not-allowed' : 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: disabled ? '#c7b0aa' : '#131e1b',
                                                    opacity: disabled ? 0.5 : 1,
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
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
            {/* ADD / EDIT FORM VIEW                                           */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {(view === 'add' || view === 'edit') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Form Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{
                                fontFamily: font, fontSize: '11px', fontWeight: 700,
                                letterSpacing: '0.28em', textTransform: 'uppercase',
                                color: '#b32000', marginBottom: '6px',
                            }}>
                                {view === 'add' ? 'TAMBAH WILAYAH BARU' : 'EDIT WILAYAH'}
                            </p>
                            <h2 style={{
                                fontFamily: font, fontSize: '34px', fontWeight: 900,
                                color: '#131e1b', letterSpacing: '-0.02em', lineHeight: 1.1,
                            }}>
                                {view === 'add' ? 'Tambah Kabupaten / Kota' : `Edit: ${formData.name}`}
                            </h2>
                        </div>
                        <button className="reg-btn-outline" onClick={() => setView('list')}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                            Kembali ke Daftar
                        </button>
                    </div>

                    {/* Form Card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(230,189,181,0.5)',
                        borderRadius: '24px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                        overflow: 'hidden',
                    }}>
                        {/* Card header band */}
                        <div style={{
                            padding: '20px 32px',
                            background: 'linear-gradient(90deg, rgba(222,235,230,0.8) 0%, rgba(240,252,247,0.5) 100%)',
                            borderBottom: '1px solid rgba(230,189,181,0.3)',
                            display: 'flex', alignItems: 'center', gap: '12px',
                        }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '10px',
                                background: 'linear-gradient(135deg, #de2f08, #b32000)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fff' }}>
                                    {view === 'add' ? 'add_location_alt' : 'edit_location_alt'}
                                </span>
                            </div>
                            <div>
                                <div style={{ fontFamily: font, fontSize: '14px', fontWeight: 700, color: '#131e1b' }}>
                                    {view === 'add' ? 'Data Kabupaten Baru' : 'Perbarui Data Kabupaten'}
                                </div>
                                <div style={{ fontFamily: font, fontSize: '12px', color: '#5c4039' }}>
                                    Slug akan dibuat otomatis dari nama yang dimasukkan.
                                </div>
                            </div>
                        </div>

                        {/* Form body */}
                        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}>

                                {/* Name Field */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{
                                        fontFamily: font, fontSize: '11px', fontWeight: 700,
                                        letterSpacing: '0.18em', textTransform: 'uppercase',
                                        color: '#5c4039',
                                    }}>Nama Kabupaten / Kota <span style={{ color: '#b32000' }}>*</span></label>
                                    <input
                                        className={`reg-form-input${formError ? ' error' : ''}`}
                                        type="text"
                                        placeholder="Contoh: Bulukumba, Tana Toraja..."
                                        value={formData.name}
                                        onChange={(e) => { setFormData(p => ({ ...p, name: e.target.value })); setFormError(''); }}
                                        autoFocus
                                        required
                                    />
                                    {/* Slug preview */}
                                    {formData.name.trim() && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#006b5e' }}>tag</span>
                                            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#006b5e' }}>
                                                {formData.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                                            </span>
                                        </div>
                                    )}
                                    {formError && (
                                        <p style={{ fontFamily: font, fontSize: '12px', color: '#b32000', fontWeight: 600 }}>
                                            {formError}
                                        </p>
                                    )}
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
                                            Kabupaten aktif akan tampil di filter destinasi publik
                                        </div>
                                    </div>
                                    {/* Custom toggle switch */}
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, is_active: !p.is_active }))}
                                        style={{
                                            width: '52px', height: '28px', borderRadius: '9999px',
                                            background: formData.is_active ? '#006b5e' : '#c7b0aa',
                                            border: 'none', cursor: 'pointer', position: 'relative',
                                            transition: 'background 0.25s ease', flexShrink: 0,
                                        }}
                                    >
                                        <span style={{
                                            position: 'absolute', top: '3px',
                                            left: formData.is_active ? '26px' : '3px',
                                            width: '22px', height: '22px',
                                            borderRadius: '9999px', background: '#fff',
                                            transition: 'left 0.25s ease',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                        }} />
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div style={{
                                    display: 'flex', gap: '12px', paddingTop: '8px',
                                    borderTop: '1px solid rgba(230,189,181,0.3)', marginTop: '8px',
                                }}>
                                    <button type="submit" className="reg-btn-primary" disabled={submitting}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                            {submitting ? 'hourglass_top' : 'save'}
                                        </span>
                                        {submitting ? 'Menyimpan...' : (view === 'add' ? 'Simpan Kabupaten' : 'Perbarui Data')}
                                    </button>
                                    <button type="button" className="reg-btn-outline" onClick={() => setView('list')}>
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Info card */}
                    <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        padding: '16px 20px',
                        background: 'rgba(179,32,0,0.04)',
                        border: '1px solid rgba(179,32,0,0.12)',
                        borderRadius: '12px',
                        maxWidth: '560px',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#b32000', flexShrink: 0, marginTop: '1px' }}>info</span>
                        <p style={{ fontFamily: font, fontSize: '13px', color: '#5c4039', lineHeight: 1.6 }}>
                            Kabupaten yang sudah memiliki destinasi terhubung <strong>tidak dapat dihapus</strong> untuk menjaga integritas data. Nonaktifkan saja jika ingin menyembunyikannya dari publik.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';

const font = "'Plus Jakarta Sans', sans-serif";

export default function AdminDestinations() {
    const [view, setView] = useState('list'); // 'list', 'add', 'edit'
    const [destinations, setDestinations] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Pagination & Filters
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [filterRegency, setFilterRegency] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchRegency, setSearchRegency] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        regency_id: '',
        category: 'NATURE',
        ticket_price: 0,
        description: '',
        route_text: '',
        latitude: '',
        longitude: '',
        is_active: true,
        images: [],
    });
    
    // For editing
    const [existingImages, setExistingImages] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    // CSRF token helper
    const getXsrfToken = () => {
        return decodeURIComponent(
            document.cookie
                .split('; ')
                .find((r) => r.startsWith('XSRF-TOKEN='))
                ?.split('=')[1] || ''
        );
    };

    // Load Regencies
    useEffect(() => {
        const fetchRegencies = async () => {
            try {
                const res = await fetch('/api/v1/regencies');
                const data = await res.json();
                if (data.success) {
                    setRegencies(data.data);
                }
            } catch (err) {
                console.error("Gagal mengambil data kabupaten:", err);
            }
        };
        fetchRegencies();
    }, []);

    // Load Destinations
    const fetchDestinations = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                name: searchName,
                regency_id: searchRegency,
                per_page: 5,
            });
            const res = await fetch(`/api/v1/admin/destinations?${queryParams.toString()}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setDestinations(data.data);
                setTotalPages(data.meta.last_page);
                setTotalItems(data.meta.total);
            }
        } catch (err) {
            console.error("Gagal mengambil data destinasi:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, [page, searchName, searchRegency]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchName(filterName);
        setSearchRegency(filterRegency);
        setPage(1);
    };

    const handleReset = () => {
        setFilterName('');
        setFilterRegency('');
        setSearchName('');
        setSearchRegency('');
        setPage(1);
    };

    const handleToggleActive = async (id) => {
        try {
            const res = await fetch(`/api/v1/admin/destinations/${id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                fetchDestinations();
            }
        } catch (err) {
            console.error("Gagal mengubah status aktif:", err);
        }
    };

    const handleDelete = async (id) => {
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
                fetchDestinations();
            }
        } catch (err) {
            console.error("Gagal menghapus destinasi:", err);
        }
    };

    // Form Handlers
    const handleAddClick = () => {
        setFormData({
            id: '',
            name: '',
            regency_id: regencies.length > 0 ? regencies[0].id : '',
            category: 'NATURE',
            ticket_price: 0,
            description: '',
            route_text: '',
            latitude: '',
            longitude: '',
            is_active: true,
            images: [],
        });
        setImagePreviews([]);
        setExistingImages([]);
        setDeletedImageIds([]);
        setView('add');
    };

    const handleEditClick = (dest) => {
        let category = 'NATURE';
        if (dest.facilities && dest.facilities.category) {
            category = dest.facilities.category;
        }

        setFormData({
            id: dest.id,
            name: dest.name,
            regency_id: dest.regency_id,
            category: category,
            ticket_price: dest.ticket_price,
            description: dest.description || '',
            route_text: dest.route_text || '',
            latitude: dest.latitude || '',
            longitude: dest.longitude || '',
            is_active: dest.is_active,
            images: [],
        });
        setExistingImages(dest.images || []);
        setImagePreviews([]);
        setDeletedImageIds([]);
        setView('edit');
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, images: files }));

        // Create previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleRemoveExistingImage = (imageId) => {
        setDeletedImageIds(prev => [...prev, imageId]);
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('regency_id', formData.regency_id);
            payload.append('ticket_price', formData.ticket_price);
            payload.append('description', formData.description);
            payload.append('route_text', formData.route_text);
            payload.append('latitude', formData.latitude);
            payload.append('longitude', formData.longitude);
            payload.append('is_active', formData.is_active ? '1' : '0');

            // Send facilities as array. In controller, it expects 'facilities' => 'nullable|array'
            payload.append('facilities[category]', formData.category);

            // Append images
            formData.images.forEach((file) => {
                payload.append('images[]', file);
            });

            let url = '/api/v1/admin/destinations';
            let method = 'POST';

            if (view === 'edit') {
                // Laravel multipart update workaround: send as POST with _method=PUT
                url = `/api/v1/admin/destinations/${formData.id}`;
                payload.append('_method', 'PUT');

                // Append deleted images list
                deletedImageIds.forEach((id) => {
                    payload.append('deleted_image_ids[]', id);
                });
            }

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: payload,
            });

            const data = await res.json();
            if (res.ok && data.success) {
                alert(view === 'add' ? 'Destinasi berhasil ditambahkan!' : 'Destinasi berhasil diperbarui!');
                setView('list');
                fetchDestinations();
            } else {
                alert(data.message || 'Terjadi kesalahan saat menyimpan data.');
            }
        } catch (err) {
            console.error("Gagal menyimpan destinasi:", err);
            alert("Gagal menghubungi server.");
        } finally {
            setLoading(false);
        }
    };

    // Format Rupiah helper
    const formatPrice = (price) => {
        if (price === 0) return 'Gratis';
        return 'Rp ' + price.toLocaleString('id-ID');
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Embedded styles for buttons and layout */}
            <style>{`
                .btn-red {
                    background-color: #b32000;
                    color: white;
                    border: none;
                    border-radius: 9999px;
                    font-family: ${font};
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    box-shadow: 0 4px 14px rgba(179,32,0,0.25);
                    transition: all 0.22s ease;
                }
                .btn-red:hover {
                    background-color: #de2f08;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(179,32,0,0.35);
                }
                .btn-red:active {
                    transform: scale(0.97);
                }

                .btn-outline {
                    background: transparent;
                    color: #b32000;
                    border: 1.5px solid #b32000;
                    border-radius: 9999px;
                    font-family: ${font};
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 24px;
                    transition: all 0.22s ease;
                }
                .btn-outline:hover {
                    background-color: rgba(179,32,0,0.06);
                    transform: translateY(-1px);
                }

                .btn-gray-outline {
                    background: transparent;
                    color: #5c4039;
                    border: 1px solid #c7b0aa;
                    border-radius: 9999px;
                    font-family: ${font};
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 24px;
                    transition: all 0.22s ease;
                }
                .btn-gray-outline:hover {
                    background-color: rgba(92,64,57,0.05);
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .form-label {
                    font-family: ${font};
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #5c4039;
                    margin-left: 4px;
                }
                .form-input {
                    font-family: ${font};
                    font-size: 14px;
                    color: #131e1b;
                    background-color: rgba(255,255,255,0.72);
                    border: 1px solid #c7b0aa;
                    border-radius: 12px;
                    padding: 12px 16px;
                    outline: none;
                    transition: all 0.22s ease;
                }
                .form-input:focus {
                    border-color: #b32000;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(179,32,0,0.1);
                }

                .form-select {
                    font-family: ${font};
                    font-size: 14px;
                    color: #131e1b;
                    background-color: rgba(255,255,255,0.72);
                    border: 1px solid #c7b0aa;
                    border-radius: 12px;
                    padding: 12px 16px;
                    outline: none;
                    cursor: pointer;
                    transition: all 0.22s ease;
                }
                .form-select:focus {
                    border-color: #b32000;
                    background-color: #ffffff;
                }

                .form-textarea {
                    font-family: ${font};
                    font-size: 14px;
                    color: #131e1b;
                    background-color: rgba(255,255,255,0.72);
                    border: 1px solid #c7b0aa;
                    border-radius: 12px;
                    padding: 12px 16px;
                    outline: none;
                    resize: vertical;
                    min-height: 120px;
                    transition: all 0.22s ease;
                }
                .form-textarea:focus {
                    border-color: #b32000;
                    background-color: #ffffff;
                }

                .dest-table-row {
                    transition: background-color 0.2s;
                }
                .dest-table-row:hover {
                    background-color: rgba(179,32,0,0.04);
                }

                .category-badge {
                    display: inline-flex;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                }
                .category-badge.nature { background-color: #e2f9f0; color: #00875a; }
                .category-badge.beach { background-color: #e6f0fa; color: #0065ff; }
                .category-badge.culture { background-color: #faf0e6; color: #b32000; }
                .category-badge.marine { background-color: #e6fafc; color: #00a3bf; }
            `}</style>

            {/* ── MAIN LIST VIEW ────────────────────────────────────── */}
            {view === 'list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {/* Header bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
                        <div>
                            <h1 style={{
                                fontFamily: font,
                                fontSize: '42px',
                                fontWeight: 900,
                                color: '#131e1b',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1,
                                marginBottom: '10px'
                            }}>Destinasi Wisata</h1>
                            <p style={{
                                fontFamily: font,
                                fontSize: '15px',
                                color: '#5c4039',
                                maxWidth: '600px'
                            }}>
                                Kelola semua destinasi wisata Sulawesi Selatan dengan antarmuka editorial premium.
                            </p>
                        </div>
                        <button className="btn-red" onClick={handleAddClick}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                            Tambah Destinasi
                        </button>
                    </div>

                    {/* Search & filter bar */}
                    <div style={{
                        background: 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid #e6bdb5',
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#e4f1eb', borderRadius: '9999px', padding: '8px 20px', width: '300px', gap: '8px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#5c4039', fontSize: '20px' }}>search</span>
                                <input
                                    type="text"
                                    placeholder="Cari nama destinasi..."
                                    value={filterName}
                                    onChange={(e) => setFilterName(e.target.value)}
                                    style={{
                                        fontFamily: font, fontSize: '14px', color: '#131e1b',
                                        background: 'transparent', border: 'none', outline: 'none', width: '100%',
                                    }}
                                />
                            </div>

                            <select
                                className="form-select"
                                value={filterRegency}
                                onChange={(e) => setFilterRegency(e.target.value)}
                                style={{ borderRadius: '9999px', padding: '10px 24px', border: '1px solid #c7b0aa', background: '#e4f1eb' }}
                            >
                                <option value="">Semua Kabupaten</option>
                                {regencies.map(reg => (
                                    <option key={reg.id} value={reg.id}>{reg.name}</option>
                                ))}
                            </select>

                            <button type="submit" className="btn-red" style={{ padding: '10px 28px' }}>
                                Cari
                            </button>
                            
                            <button type="button" className="btn-outline" onClick={handleReset} style={{ padding: '8px 28px' }}>
                                Reset
                            </button>
                        </form>
                    </div>

                    {/* Listing Table */}
                    <div style={{
                        background: 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid #e6bdb5',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#deebe6', borderBottom: '1px solid #e6bdb5' }}>
                                    <th style={{ padding: '16px 24px', fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#131e1b', textAlign: 'left', width: '120px' }}>PHOTO</th>
                                    <th style={{ padding: '16px 24px', fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#131e1b', textAlign: 'left' }}>NAME</th>
                                    <th style={{ padding: '16px 24px', fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#131e1b', textAlign: 'left' }}>REGENCY</th>
                                    <th style={{ padding: '16px 24px', fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#131e1b', textAlign: 'left' }}>PRICE</th>
                                    <th style={{ padding: '16px 24px', fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#131e1b', textAlign: 'center', width: '100px' }}>ACTIVE</th>
                                    <th style={{ padding: '16px 24px', fontFamily: font, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#131e1b', textAlign: 'right', width: '180px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '48px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                            Sedang memuat data...
                                        </td>
                                    </tr>
                                ) : destinations.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '48px', textAlign: 'center', fontFamily: font, color: '#5c4039' }}>
                                            Tidak ada destinasi ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    destinations.map((row) => {
                                        const firstImage = row.images && row.images.length > 0 ? row.images[0].url : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120';
                                        
                                        let category = 'NATURE';
                                        if (row.facilities && row.facilities.category) {
                                            category = row.facilities.category;
                                        }
                                        const badgeClass = category.toLowerCase();

                                        return (
                                            <tr key={row.id} className="dest-table-row" style={{ borderBottom: '1px solid rgba(230,189,181,0.25)' }}>
                                                {/* Image */}
                                                <td style={{ padding: '16px 24px' }}>
                                                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', background: '#d9e5e0', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
                                                        <img src={firstImage} alt={row.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                </td>
                                                {/* Name */}
                                                <td style={{ padding: '16px 24px' }}>
                                                    <div>
                                                        <div style={{ fontFamily: font, fontWeight: 700, fontSize: '16px', color: '#131e1b', marginBottom: '4px' }}>{row.name}</div>
                                                        <span className={`category-badge ${badgeClass}`}>{category}</span>
                                                    </div>
                                                </td>
                                                {/* Regency */}
                                                <td style={{ padding: '16px 24px', fontFamily: font, fontSize: '14px', color: '#5c4039', fontStyle: 'italic' }}>
                                                    {row.regency ? row.regency.name : 'Unknown'}
                                                </td>
                                                {/* Price */}
                                                <td style={{ padding: '16px 24px', fontFamily: font, fontSize: '15px', fontWeight: 700, color: '#00875a' }}>
                                                    {formatPrice(row.ticket_price)}
                                                </td>
                                                {/* Active status toggle switch */}
                                                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                                    <button 
                                                        onClick={() => handleToggleActive(row.id)}
                                                        style={{
                                                            background: 'none', border: 'none', cursor: 'pointer',
                                                            color: row.is_active ? '#00875a' : '#c7b0aa',
                                                            display: 'inline-flex', alignItems: 'center'
                                                        }}
                                                        title={row.is_active ? "Nonaktifkan" : "Aktifkan"}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>
                                                            {row.is_active ? 'toggle_on' : 'toggle_off'}
                                                        </span>
                                                    </button>
                                                </td>
                                                {/* Actions */}
                                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                        <button 
                                                            className="action-btn" 
                                                            style={{ border: 'none', background: 'none', color: '#5c4039', cursor: 'pointer', padding: '6px', borderRadius: '50%' }}
                                                            onClick={() => handleEditClick(row)}
                                                            title="Edit Destinasi"
                                                        >
                                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                                                        </button>
                                                        <button 
                                                            className="action-btn" 
                                                            style={{ border: 'none', background: 'none', color: '#b32000', cursor: 'pointer', padding: '6px', borderRadius: '50%' }}
                                                            onClick={() => handleDelete(row.id)}
                                                            title="Hapus Destinasi"
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

                        {/* Pagination bar */}
                        {totalPages > 1 && (
                            <div style={{
                                background: '#eaf6f1',
                                padding: '20px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderTop: '1px solid #e6bdb5'
                            }}>
                                <span style={{ fontFamily: font, fontSize: '13px', color: '#5c4039' }}>
                                    Menampilkan {destinations.length} dari {totalItems} destinasi
                                </span>
                                
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    {/* Prev Button */}
                                    <button 
                                        disabled={page === 1}
                                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                                        style={{
                                            border: '1px solid #c7b0aa', borderRadius: '50%', width: '36px', height: '36px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: 'white', color: page === 1 ? '#c7b0aa' : '#131e1b',
                                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
                                    </button>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }).map((_, idx) => {
                                        const pNum = idx + 1;
                                        const isCurrent = pNum === page;
                                        return (
                                            <button
                                                key={pNum}
                                                onClick={() => setPage(pNum)}
                                                style={{
                                                    border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: isCurrent ? '#b32000' : 'transparent',
                                                    color: isCurrent ? 'white' : '#131e1b',
                                                    fontWeight: isCurrent ? '700' : '500',
                                                    fontFamily: font, fontSize: '13px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                {pNum}
                                            </button>
                                        );
                                    })}

                                    {/* Next Button */}
                                    <button 
                                        disabled={page === totalPages}
                                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                        style={{
                                            border: '1px solid #c7b0aa', borderRadius: '50%', width: '36px', height: '36px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: 'white', color: page === totalPages ? '#c7b0aa' : '#131e1b',
                                            cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── ADD / EDIT FORM VIEW ───────────────────────────────── */}
            {(view === 'add' || view === 'edit') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{
                                fontFamily: font,
                                fontSize: '36px',
                                fontWeight: 800,
                                color: '#131e1b',
                                letterSpacing: '-0.02em'
                            }}>
                                {view === 'add' ? 'Tambah Destinasi Baru' : 'Edit Destinasi'}
                            </h1>
                            <p style={{ fontFamily: font, fontSize: '14px', color: '#5c4039', marginTop: '4px' }}>
                                Lengkapi detail destinasi wisata untuk diunggah ke database portal.
                            </p>
                        </div>
                        <button className="btn-gray-outline" onClick={() => setView('list')}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                            Kembali
                        </button>
                    </div>

                    {/* Form Card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid #e6bdb5',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                {/* Name */}
                                <div className="form-group">
                                    <label className="form-label">Nama Destinasi</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Contoh: Rammang-Rammang"
                                        value={formData.name}
                                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Regency */}
                                <div className="form-group">
                                    <label className="form-label">Kabupaten / Kota</label>
                                    <select
                                        className="form-select"
                                        value={formData.regency_id}
                                        onChange={(e) => setFormData(p => ({ ...p, regency_id: e.target.value }))}
                                        required
                                    >
                                        <option value="" disabled>Pilih Kabupaten</option>
                                        {regencies.map(reg => (
                                            <option key={reg.id} value={reg.id}>{reg.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Category Tag */}
                                <div className="form-group">
                                    <label className="form-label">Kategori / Tag Utama</label>
                                    <select
                                        className="form-select"
                                        value={formData.category}
                                        onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                                        required
                                    >
                                        <option value="NATURE">NATURE</option>
                                        <option value="BEACH">BEACH</option>
                                        <option value="CULTURE">CULTURE</option>
                                        <option value="MARINE">MARINE</option>
                                    </select>
                                </div>

                                {/* Ticket Price */}
                                <div className="form-group">
                                    <label className="form-label">Harga Tiket Masuk (IDR)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="0 untuk Gratis"
                                        value={formData.ticket_price}
                                        onChange={(e) => setFormData(p => ({ ...p, ticket_price: parseInt(e.target.value) || 0 }))}
                                        min="0"
                                        required
                                    />
                                </div>

                                {/* Latitude */}
                                <div className="form-group">
                                    <label className="form-label">Latitude Coordinate</label>
                                    <input
                                        type="number"
                                        step="0.00000001"
                                        className="form-input"
                                        placeholder="Contoh: -5.012345"
                                        value={formData.latitude}
                                        onChange={(e) => setFormData(p => ({ ...p, latitude: e.target.value }))}
                                    />
                                </div>

                                {/* Longitude */}
                                <div className="form-group">
                                    <label className="form-label">Longitude Coordinate</label>
                                    <input
                                        type="number"
                                        step="0.00000001"
                                        className="form-input"
                                        placeholder="Contoh: 119.543210"
                                        value={formData.longitude}
                                        onChange={(e) => setFormData(p => ({ ...p, longitude: e.target.value }))}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label className="form-label">Deskripsi Lengkap</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Ceritakan keindahan dan keunikan destinasi ini secara detail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* Route text */}
                            <div className="form-group">
                                <label className="form-label">Petunjuk Rute / Aksesibilitas</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Rute perjalanan, kendaraan yang direkomendasikan, atau detail akses menuju lokasi..."
                                    value={formData.route_text}
                                    onChange={(e) => setFormData(p => ({ ...p, route_text: e.target.value }))}
                                    style={{ minHeight: '80px' }}
                                />
                            </div>

                            {/* Active Status */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData(p => ({ ...p, is_active: e.target.checked }))}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                />
                                <label htmlFor="is_active" style={{ fontFamily: font, fontSize: '14px', fontWeight: 600, color: '#131e1b', cursor: 'pointer' }}>
                                    Aktifkan dan Publikasikan Langsung
                                </label>
                            </div>

                            {/* Images Section */}
                            <div className="form-group" style={{ borderTop: '1px solid #e6bdb5', paddingTop: '24px' }}>
                                <label className="form-label" style={{ marginBottom: '12px' }}>Foto Destinasi (Multiple Upload)</label>
                                
                                {/* Existing Images (For Edit Mode) */}
                                {existingImages.length > 0 && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, color: '#5c4039', marginBottom: '8px' }}>Foto Terunggah:</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                            {existingImages.map((img) => (
                                                <div key={img.id} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #c7b0aa' }}>
                                                    <img src={img.url} alt="existing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveExistingImage(img.id)}
                                                        style={{
                                                            position: 'absolute', top: '4px', right: '4px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                                                            width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#b32000'
                                                        }}
                                                        title="Hapus foto ini"
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: '16px', fontWeight: 'bold' }}>close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Image Previews */}
                                {imagePreviews.length > 0 && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 600, color: '#5c4039', marginBottom: '8px' }}>Foto Baru yang Dipilih:</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                            {imagePreviews.map((src, index) => (
                                                <div key={index} style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #b32000' }}>
                                                    <img src={src} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* File Input */}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{
                                        fontFamily: font, fontSize: '14px',
                                        padding: '12px', border: '1px dashed #c7b0aa', borderRadius: '12px', background: '#f5faf8', cursor: 'pointer'
                                    }}
                                />
                                <p style={{ fontFamily: font, fontSize: '11px', color: '#916f68', marginTop: '4px' }}>
                                    Unggah satu atau beberapa foto dengan format JPG, JPEG, atau PNG (Maks. 4MB per file).
                                </p>
                            </div>

                            {/* Form Action Buttons */}
                            <div style={{ display: 'flex', gap: '16px', marginTop: '24px', borderTop: '1px solid #e6bdb5', paddingTop: '24px' }}>
                                <button type="submit" className="btn-red" disabled={loading} style={{ padding: '14px 40px' }}>
                                    {loading ? 'Menyimpan...' : 'Simpan Destinasi'}
                                </button>
                                <button type="button" className="btn-gray-outline" onClick={() => setView('list')} disabled={loading} style={{ padding: '12px 36px' }}>
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

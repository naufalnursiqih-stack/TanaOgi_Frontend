import React, { useState, useEffect } from 'react';

const font = "'Plus Jakarta Sans', sans-serif";

export default function AdminDrivers() {
    const [view, setView] = useState('list'); // 'list', 'add', 'edit'
    const [drivers, setDrivers] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [loading, setLoading] = useState(false);

    // Search & Filters
    const [search, setSearch] = useState('');
    const [filterRegency, setFilterRegency] = useState('');
    const [filterVehicleType, setFilterVehicleType] = useState('');
    const [filterStatus, setFilterStatus] = useState(''); // 'available', 'on_trip', 'offline', or ''
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        phone: '',
        photo: '', // File object or URL string
        license_type: 'Licensed Specialist',
        vehicle_name: '',
        vehicle_type: 'MPV Standard',
        plate_number: '',
        regency_id: '',
        capacity: 5,
        rating: 5.0,
        status: 'available',
        is_active: true
    });

    const [photoPreview, setPhotoPreview] = useState('');

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
                console.error("Gagal mengambil data regencies:", err);
            }
        };
        fetchRegencies();
    }, []);

    // Load Drivers
    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                search: search,
                regency_id: filterRegency,
                vehicle_type: filterVehicleType,
                status: filterStatus,
                per_page: 5
            });
            const res = await fetch(`/api/v1/admin/drivers?${queryParams.toString()}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setDrivers(data.data);
                setTotalPages(data.meta.last_page);
                setTotalItems(data.meta.total);
            }
        } catch (err) {
            console.error("Gagal mengambil data drivers:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, [page, search, filterRegency, filterVehicleType, filterStatus]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleRegencyChange = (e) => {
        setFilterRegency(e.target.value);
        setPage(1);
    };

    const handleVehicleTypeChange = (e) => {
        setFilterVehicleType(e.target.value);
        setPage(1);
    };

    const handleStatusFilterChange = (status) => {
        setFilterStatus(prev => prev === status ? '' : status);
        setPage(1);
    };

    const handleToggleActive = async (id) => {
        try {
            const res = await fetch(`/api/v1/admin/drivers/${id}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                fetchDrivers();
            }
        } catch (err) {
            console.error("Gagal mengubah status aktif:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus data pengemudi ini?")) return;
        try {
            const res = await fetch(`/api/v1/admin/drivers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                alert("Data pengemudi berhasil dihapus.");
                fetchDrivers();
            }
        } catch (err) {
            console.error("Gagal menghapus data pengemudi:", err);
        }
    };

    const handleAddClick = () => {
        setFormData({
            id: '',
            name: '',
            phone: '',
            photo: '',
            license_type: 'Licensed Specialist',
            vehicle_name: '',
            vehicle_type: 'MPV Standard',
            plate_number: '',
            regency_id: regencies.length > 0 ? regencies[0].id : '',
            capacity: 5,
            rating: 5.0,
            status: 'available',
            is_active: true
        });
        setPhotoPreview('');
        setView('add');
    };

    const handleEditClick = (driver) => {
        setFormData({
            id: driver.id,
            name: driver.name,
            phone: driver.phone,
            photo: driver.photo || '',
            license_type: driver.license_type || 'Licensed Specialist',
            vehicle_name: driver.vehicle_name || '',
            vehicle_type: driver.vehicle_type || 'MPV Standard',
            plate_number: driver.plate_number || '',
            regency_id: driver.regency_id || '',
            capacity: driver.capacity || 5,
            rating: driver.rating || 5.0,
            status: driver.status || 'available',
            is_active: driver.is_active
        });
        setPhotoPreview(driver.photo || '');
        setView('edit');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('phone', formData.phone);
            payload.append('license_type', formData.license_type);
            payload.append('vehicle_name', formData.vehicle_name);
            payload.append('vehicle_type', formData.vehicle_type);
            payload.append('plate_number', formData.plate_number);
            if (formData.regency_id) {
                payload.append('regency_id', formData.regency_id);
            }
            payload.append('capacity', formData.capacity);
            payload.append('rating', formData.rating);
            payload.append('status', formData.status);
            payload.append('is_active', formData.is_active ? '1' : '0');

            if (formData.photo instanceof File) {
                payload.append('photo', formData.photo);
            } else if (typeof formData.photo === 'string') {
                payload.append('photo', formData.photo);
            }

            let url = '/api/v1/admin/drivers';
            if (view === 'edit') {
                url = `/api/v1/admin/drivers/${formData.id}`;
                payload.append('_method', 'PUT');
            }

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: payload
            });

            const data = await res.json();
            if (res.ok && data.success) {
                alert(view === 'add' ? 'Data pengemudi berhasil ditambahkan!' : 'Data pengemudi berhasil diperbarui!');
                setView('list');
                fetchDrivers();
            } else {
                alert(data.message || 'Terjadi kesalahan saat menyimpan data.');
            }
        } catch (err) {
            console.error("Gagal menyimpan data pengemudi:", err);
            alert("Gagal menghubungi server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Styles placeholder for premium classes */}
            <style>{`
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
                    border-color: #f5401b;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(245,64,27,0.1);
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
                    border-color: #f5401b;
                    background-color: #ffffff;
                }
                .btn-submit {
                    background-color: #f5401b;
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
                    padding: 14px 32px;
                    box-shadow: 0 4px 14px rgba(245,64,27,0.25);
                    transition: all 0.22s ease;
                }
                .btn-submit:hover {
                    background-color: #de2f08;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(245,64,27,0.35);
                }
                .btn-cancel {
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
                    padding: 12px 28px;
                    transition: all 0.22s ease;
                }
                .btn-cancel:hover {
                    background-color: rgba(92,64,57,0.05);
                }
            `}</style>

            {/* ─── LIST VIEW ────────────────────────────────────────────── */}
            {view === 'list' && (
                <div className="flex flex-col gap-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight" style={{ fontFamily: font }}>
                                Vehicle &amp; Driver Management
                            </h2>
                            <p className="text-on-surface-variant mt-2 font-medium opacity-70" style={{ fontFamily: font }}>
                                Oversee your fleet and Buginese hospitality specialists across South Sulawesi.
                            </p>
                        </div>
                        <button 
                            onClick={handleAddClick}
                            className="bg-sunset-orange text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 shadow-xl shadow-sunset-orange/20 hover:scale-105 transition-transform duration-300"
                        >
                            <span className="material-symbols-outlined">person_add</span>
                            <span>Add New Driver</span>
                        </button>
                    </div>

                    {/* Filters bar */}
                    <div className="flex flex-wrap gap-4 items-center bg-white/40 p-3 rounded-2xl border border-white/60">
                        <div className="flex items-center gap-3 px-4 border-r border-outline-variant/30">
                            <span className="material-symbols-outlined text-sunset-orange">filter_list</span>
                            <span className="font-bold text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">Quick Filters</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 flex-1">
                            {/* Regency Filter */}
                            <select 
                                value={filterRegency}
                                onChange={handleRegencyChange}
                                className="bg-transparent border-none focus:ring-0 text-sm font-bold text-on-surface py-1 pr-8 cursor-pointer outline-none"
                            >
                                <option value="">All Regencies</option>
                                {regencies.map(reg => (
                                    <option key={reg.id} value={reg.id}>{reg.name}</option>
                                ))}
                            </select>

                            <div className="w-px h-4 bg-outline-variant/30"></div>

                            {/* Vehicle Type Filter */}
                            <select 
                                value={filterVehicleType}
                                onChange={handleVehicleTypeChange}
                                className="bg-transparent border-none focus:ring-0 text-sm font-bold text-on-surface py-1 pr-8 cursor-pointer outline-none"
                            >
                                <option value="">All Vehicle Types</option>
                                <option value="SUV Luxury">SUV Luxury</option>
                                <option value="MPV Standard">MPV Standard</option>
                                <option value="Group Van">Group Van</option>
                            </select>

                            <div className="w-px h-4 bg-outline-variant/30"></div>

                            {/* Status Toggles */}
                            <div className="flex gap-2 p-1 bg-surface-container rounded-full">
                                <button 
                                    onClick={() => handleStatusFilterChange('available')}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${filterStatus === 'available' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
                                >
                                    Available Only
                                </button>
                                <button 
                                    onClick={() => handleStatusFilterChange('on_trip')}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${filterStatus === 'on_trip' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
                                >
                                    On Trip
                                </button>
                            </div>

                            {/* Search bar inside filters */}
                            <div className="ml-auto relative w-64">
                                <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant/60">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                </span>
                                <input 
                                    type="text" 
                                    placeholder="Search driver / plate..." 
                                    value={search}
                                    onChange={handleSearchChange}
                                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-surface-container border-none outline-none focus:ring-1 focus:ring-sunset-orange/30 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white/60 rounded-2xl border border-white/80 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-container/30 border-b border-outline-variant/30">
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em]">Driver Details</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em]">Contact</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em]">Vehicle &amp; Plate</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em] text-center">Capacity</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em] text-center">Rating</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-8 py-12 text-center text-on-surface-variant font-medium">
                                            Sedang memuat data pengemudi...
                                        </td>
                                    </tr>
                                ) : drivers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-8 py-12 text-center text-on-surface-variant font-medium">
                                            Tidak ada data pengemudi ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    drivers.map((row) => (
                                        <tr key={row.id} className="hover:bg-white/80 transition-colors group">
                                            {/* Details */}
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-surface-container-high">
                                                        <img 
                                                            alt={row.name} 
                                                            className="w-full h-full object-cover" 
                                                            src={row.photo || "https://www.gravatar.com/avatar/?d=mp"} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-on-surface">{row.name}</p>
                                                        <p className="text-xs text-on-surface-variant font-medium">{row.license_type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Contact */}
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-semibold text-on-surface">{row.phone}</p>
                                                {row.status === 'available' ? (
                                                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> WhatsApp Active
                                                    </p>
                                                ) : (
                                                    <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider mt-1">
                                                        Offline / Unreachable
                                                    </p>
                                                )}
                                            </td>
                                            {/* Vehicle & Plate */}
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-on-surface">{row.vehicle_name}</p>
                                                <p className="text-[11px] text-on-surface-variant font-medium tracking-wider uppercase mt-0.5">
                                                    {row.plate_number} • {row.regency ? row.regency.name : '-'}
                                                </p>
                                            </td>
                                            {/* Capacity */}
                                            <td className="px-8 py-6 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                                                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">group</span>
                                                    <span className="text-xs font-bold text-on-surface">{row.capacity} Seats</span>
                                                </div>
                                            </td>
                                            {/* Rating */}
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex justify-center items-center gap-1 text-sunset-orange">
                                                    <span className="material-symbols-outlined filled-icon text-[18px]">star</span>
                                                    <span className="font-extrabold">{parseFloat(row.rating).toFixed(1)}</span>
                                                </div>
                                            </td>
                                            {/* Status */}
                                            <td className="px-8 py-6">
                                                {row.status === 'available' && (
                                                    <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-wider">Available</span>
                                                )}
                                                {row.status === 'on_trip' && (
                                                    <span className="px-4 py-1.5 bg-orange-100 text-sunset-orange rounded-full text-[10px] font-extrabold uppercase tracking-wider">On Trip</span>
                                                )}
                                                {row.status === 'offline' && (
                                                    <span className="px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-extrabold uppercase tracking-wider">Offline</span>
                                                )}
                                            </td>
                                            {/* Actions */}
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end items-center gap-4">
                                                    <button 
                                                        onClick={() => handleToggleActive(row.id)}
                                                        className="text-on-surface-variant hover:text-sunset-orange transition-colors"
                                                        title={row.is_active ? "Nonaktifkan Pengemudi" : "Aktifkan Pengemudi"}
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            {row.is_active ? 'toggle_on' : 'toggle_off'}
                                                        </span>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEditClick(row)}
                                                        className="text-on-surface-variant hover:text-on-surface transition-colors"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button 
                                                        className="drv-action-btn danger"
                                                        onClick={() => handleDelete(row.id)}
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
                        {totalPages > 1 && (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '16px 24px',
                                background: 'rgba(234,246,241,0.6)',
                                borderTop: '1px solid rgba(230,189,181,0.3)',
                            }}>
                                <span style={{ fontFamily: font, fontSize: '13px', color: '#5c4039' }}>
                                    Menampilkan <strong style={{ color: '#131e1b' }}>{drivers.length}</strong> dari {totalItems} pengemudi
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {['chevron_left', 'chevron_right'].map((icon, i) => {
                                        const disabled = i === 0 ? page === 1 : page === totalPages;
                                        return (
                                            <button key={icon} disabled={disabled}
                                                onClick={() => setPage(p => i === 0 ? Math.max(1, p - 1) : Math.min(totalPages, p + 1))}
                                                style={{
                                                    width: '34px', height: '34px',
                                                    border: '1px solid #e6bdb5', borderRadius: '9px',
                                                    background: disabled ? 'none' : '#fff',
                                                    cursor: disabled ? 'not-allowed' : 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: disabled ? '#c7b0aa' : '#131e1b',
                                                    opacity: disabled ? 0.5 : 1,
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

            {/* ─── ADD / EDIT FORM VIEW ────────────────────────────────────── */}
            {(view === 'add' || view === 'edit') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Form Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight" style={{ fontFamily: font }}>
                                {view === 'add' ? 'Add New Driver & Fleet' : 'Edit Driver & Fleet Info'}
                            </h2>
                            <p className="text-on-surface-variant mt-2 font-medium opacity-70" style={{ fontFamily: font }}>
                                Fill out the details to assign a professional driver and vehicle.
                            </p>
                        </div>
                        <button className="btn-cancel" onClick={() => setView('list')}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                            Back to List
                        </button>
                    </div>

                    {/* Form Layout */}
                    <div className="bg-white/60 rounded-2xl border border-white/80 shadow-sm p-8">
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            
                            {/* Driver Photo Upload */}
                            <div className="form-group">
                                <label className="form-label">Driver Photo</label>
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-surface-container-high flex-shrink-0">
                                        <img 
                                            src={photoPreview || "https://www.gravatar.com/avatar/?d=mp"} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="text-sm text-on-surface"
                                        />
                                        <p className="text-xs text-on-surface-variant/60 font-medium">
                                            Atau masukkan URL gambar langsung di bawah jika tidak ingin mengunggah file.
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="https://example.com/avatar.jpg"
                                            value={typeof formData.photo === 'string' ? formData.photo : ''}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, photo: e.target.value }));
                                                setPhotoPreview(e.target.value);
                                            }}
                                            className="form-input text-xs w-96 py-1.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                {/* Name */}
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="e.g. Andi Pratama"
                                        value={formData.name}
                                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="e.g. +62 812-xxxx-xxxx"
                                        value={formData.phone}
                                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* License Type */}
                                <div className="form-group">
                                    <label className="form-label">License & Specialist Title</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="e.g. Licensed Specialist, Senior Expert"
                                        value={formData.license_type}
                                        onChange={e => setFormData(p => ({ ...p, license_type: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Regency */}
                                <div className="form-group">
                                    <label className="form-label">Assigned Regency</label>
                                    <select 
                                        className="form-select"
                                        value={formData.regency_id}
                                        onChange={e => setFormData(p => ({ ...p, regency_id: e.target.value }))}
                                        required
                                    >
                                        <option value="" disabled>Select Regency</option>
                                        {regencies.map(reg => (
                                            <option key={reg.id} value={reg.id}>{reg.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Vehicle Name */}
                                <div className="form-group">
                                    <label className="form-label">Vehicle Model/Name</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="e.g. Toyota Avanza Veloz"
                                        value={formData.vehicle_name}
                                        onChange={e => setFormData(p => ({ ...p, vehicle_name: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Vehicle Type */}
                                <div className="form-group">
                                    <label className="form-label">Vehicle Segment / Type</label>
                                    <select 
                                        className="form-select"
                                        value={formData.vehicle_type}
                                        onChange={e => setFormData(p => ({ ...p, vehicle_type: e.target.value }))}
                                        required
                                    >
                                        <option value="SUV Luxury">SUV Luxury</option>
                                        <option value="MPV Standard">MPV Standard</option>
                                        <option value="Group Van">Group Van</option>
                                    </select>
                                </div>

                                {/* Plate Number */}
                                <div className="form-group">
                                    <label className="form-label">License Plate Number</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="e.g. DD 1234 XX"
                                        value={formData.plate_number}
                                        onChange={e => setFormData(p => ({ ...p, plate_number: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Capacity */}
                                <div className="form-group">
                                    <label className="form-label">Passenger Capacity (Seats)</label>
                                    <input 
                                        type="number" 
                                        min="1"
                                        className="form-input" 
                                        placeholder="5"
                                        value={formData.capacity}
                                        onChange={e => setFormData(p => ({ ...p, capacity: parseInt(e.target.value) || 5 }))}
                                        required
                                    />
                                </div>

                                {/* Rating */}
                                <div className="form-group">
                                    <label className="form-label">Driver Rating (0.0 — 5.0)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="form-input" 
                                        placeholder="5.0"
                                        value={formData.rating}
                                        onChange={e => setFormData(p => ({ ...p, rating: parseFloat(e.target.value) || 5.0 }))}
                                        required
                                    />
                                </div>

                                {/* Status */}
                                <div className="form-group">
                                    <label className="form-label">Availability Status</label>
                                    <select 
                                        className="form-select"
                                        value={formData.status}
                                        onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                                        required
                                    >
                                        <option value="available">Available</option>
                                        <option value="on_trip">On Trip</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Switch */}
                            <div className="flex items-center gap-3 mt-4">
                                <input 
                                    type="checkbox" 
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={e => setFormData(p => ({ ...p, is_active: e.target.checked }))}
                                    className="rounded border-gray-300 text-sunset-orange focus:ring-sunset-orange focus:ring-opacity-50"
                                />
                                <label htmlFor="is_active" className="text-sm font-semibold text-on-surface cursor-pointer select-none">
                                    Publish this Driver / Fleet listing (Active)
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-6 border-t border-outline-variant/20 pt-6">
                                <button type="submit" className="btn-submit" disabled={loading}>
                                    <span className="material-symbols-outlined">save</span>
                                    <span>{loading ? 'Saving...' : 'Save Driver Details'}</span>
                                </button>
                                <button type="button" className="btn-cancel" onClick={() => setView('list')}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

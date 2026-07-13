import React, { useState, useEffect, useRef } from 'react';

/**
 * Shared Navbar Component — Tana Ogi (Default)
 */
export default function Navbar({
    activePage = '',
    onNavigateHome,
    onNavigateLogin,
    onNavigateRegister,
    onNavigateAdmin,
    onNavigateDestinations,
    onNavigateExperiences,
    onNavigateCulture,
    onNavigateJournal,
    isHeroTheme = false, // Atribut pendeteksi halaman utama
    currentUser = null,
    onLogout,
    wishlistCount = 0,
    onWishlistToggle,
}) {
    const [scrolled, setScrolled] = useState(false);
    const [isNavbarHovered, setIsNavbarHovered] = useState(false);
    const isTransparent = !scrolled && !isNavbarHovered;
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // States for Profile Photo Edit
    const [profileImgUrl, setProfileImgUrl] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showCameraModal, setShowCameraModal] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
                setFade(false);
            }, 400);
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { label: 'Destinations', key: 'destinations', action: onNavigateDestinations },
        { label: 'Experiences', key: 'experiences', action: onNavigateExperiences },
        { label: 'Culture', key: 'culture', action: onNavigateCulture },
        { label: 'Journal', key: 'journal', action: onNavigateJournal },
    ];

    const isActive = (key) => activePage === key;

    // Menentukan warna teks link menu (Putih bersih jika di awal home page)
    const getDynamicTextColor = (key) => {
        if (isTransparent && isHeroTheme) return '#ffffff';
        if (isActive(key)) return '#b32000';
        return 'rgba(19,30,27,0.7)';
    };

    const linkStyle = (key) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: (isTransparent && isHeroTheme) ? 500 : (isActive(key) ? 700 : 500),
        color: getDynamicTextColor(key),
        textShadow: (isTransparent && isHeroTheme) ? '0 1px 4px rgba(0,0,0,0.6)' : 'none',
        textDecoration: 'none',
        borderBottom: (isActive(key) && !(isTransparent && isHeroTheme)) ? '2px solid #b32000' : '2px solid transparent',
        paddingBottom: '4px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    });

    // Handlers for Profile Photo Edit
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setProfileImgUrl(url);
            setShowProfileMenu(false);
        }
    };

    const startCamera = async () => {
        setShowProfileMenu(false);
        setShowCameraModal(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.");
            setShowCameraModal(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCameraModal(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const dataUrl = canvasRef.current.toDataURL('image/png');
            setProfileImgUrl(dataUrl);
            stopCamera();
        }
    };

    return (
        <header 
            onMouseEnter={() => setIsNavbarHovered(true)}
            onMouseLeave={() => setIsNavbarHovered(false)}
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 50,
                backgroundColor: (isTransparent && isHeroTheme) ? 'transparent' : 'rgba(255,255,255,0.95)',
                backdropFilter: (isTransparent && isHeroTheme) ? 'none' : 'blur(20px)',
                WebkitBackdropFilter: (isTransparent && isHeroTheme) ? 'none' : 'blur(20px)',
                borderBottom: (isTransparent && isHeroTheme) ? 'none' : '1px solid rgba(19,30,27,0.06)',
                boxShadow: scrolled || isNavbarHovered ? '0 4px 30px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.4s ease',
            }}
        >
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: scrolled ? '14px 64px' : '24px 64px',
                maxWidth: '1440px',
                margin: '0 auto',
                transition: 'padding 0.4s ease',
            }}>
                {/* Bagian Kiri: Logo & Nama Brand */}
                <div
                    onClick={onNavigateHome}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                >
                    <img
                        src="/logo TanaOgi.png"
                        alt="Logo Tana Ogi"
                        style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain'
                        }}
                    />
                    <span
                        style={{
                            fontFamily: font,
                            fontSize: '24px',
                            fontWeight: 700,
                            letterSpacing: '-0.01em',
                            color: (isTransparent && isHeroTheme) ? '#ffffff' : '#b32000',
                            textShadow: (isTransparent && isHeroTheme) ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                            opacity: fade ? 0 : 1,
                            filter: fade ? 'blur(8px)' : 'blur(0px)',
                            transform: fade ? 'scale(0.97)' : 'scale(1)',
                            transition: 'color 0.4s, opacity 0.4s, filter 0.4s, transform 0.4s, text-shadow 0.4s',
                        }}
                    >
                        {titles[currentIndex]}
                    </span>
                </div>

                {/* Bagian Tengah: Menu Navigasi */}
                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    {navLinks.map(({ label, key, action }) => (
                        <a
                            key={key}
                            href="#"
                            onClick={e => { e.preventDefault(); if (action) action(); }}
                            style={linkStyle(key)}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = isHeroTheme && (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.7)' : '#b32000';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = getDynamicTextColor(key);
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Bagian Kanan: Akses Tombol / User Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {/* Floating Wishlist Button */}
                    <div 
                        onClick={onWishlistToggle}
                        style={{
                            position: 'relative',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.15)' : 'rgba(0,107,94,0.06)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.08)';
                            e.currentTarget.style.backgroundColor = (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.25)' : 'rgba(0,107,94,0.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = (isTransparent && isHeroTheme) ? 'rgba(255,255,255,0.15)' : 'rgba(0,107,94,0.06)';
                        }}
                    >
                        <span 
                            className="material-symbols-outlined" 
                            style={{ 
                                color: (isTransparent && isHeroTheme) ? '#ffffff' : '#006b5e',
                                fontSize: '22px' 
                            }}
                        >
                            favorite
                        </span>
                        {wishlistCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                backgroundColor: '#b32000',
                                color: '#ffffff',
                                fontSize: '9px',
                                fontWeight: 800,
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid ' + ((isTransparent && isHeroTheme) ? '#131e1b' : '#ffffff'),
                                boxShadow: '0 4px 10px rgba(179,32,0,0.3)',
                                transition: 'all 0.3s ease'
                            }}>
                                {wishlistCount}
                            </span>
                        )}
                    </div>

                    {currentUser ? (
                        /* Logged-in state: show user avatar + name + logout */
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ position: 'relative' }}>
                                <div 
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: profileImgUrl ? `url(${profileImgUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #F5401B, #FF9900)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontFamily: font,
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        flexShrink: 0,
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                    title="Ubah Foto Profil"
                                >
                                    {!profileImgUrl && (currentUser.name ? currentUser.name.charAt(0) : 'U')}
                                </div>
                                
                                {showProfileMenu && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '48px',
                                        right: '0',
                                        background: '#ffffff',
                                        borderRadius: '16px',
                                        boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                                        padding: '8px 0',
                                        minWidth: '220px',
                                        zIndex: 100,
                                        fontFamily: font,
                                        overflow: 'hidden',
                                        border: '1px solid rgba(230,189,181,0.3)'
                                    }}>
                                        <div style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#5c4039', borderBottom: '1px solid rgba(230,189,181,0.3)', marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            Ubah Foto Profil
                                        </div>
                                        <button 
                                            onClick={() => fileInputRef.current.click()}
                                            style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#131e1b', textAlign: 'left', fontWeight: 500, transition: 'background-color 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fcf7'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#23F7DB' }}>folder_open</span> Pilih dari Komputer
                                        </button>
                                        <button 
                                            onClick={startCamera}
                                            style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#131e1b', textAlign: 'left', fontWeight: 500, transition: 'background-color 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fcf7'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#23F7DB' }}>photo_camera</span> Gunakan Kamera
                                        </button>
                                        {profileImgUrl && (
                                            <button 
                                                onClick={() => { setProfileImgUrl(null); setShowProfileMenu(false); }}
                                                style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#b32000', textAlign: 'left', fontWeight: 500, transition: 'background-color 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(179,32,0,0.06)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span> Hapus Profil
                                            </button>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            style={{ display: 'none' }} 
                                        />
                                    </div>
                                )}
                            </div>
                            <span style={{
                                fontFamily: font,
                                fontSize: '14px',
                                fontWeight: 600,
                                color: isHeroTheme && !scrolled ? '#ffffff' : '#131e1b',
                                maxWidth: '120px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                transition: 'color 0.3s',
                            }}>
                                {currentUser.name}
                            </span>
                            <button
                                onClick={onLogout}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: isHeroTheme && !scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(19,30,27,0.5)',
                                    padding: '4px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#b32000';
                                    e.currentTarget.style.backgroundColor = 'rgba(179,32,0,0.08)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = isHeroTheme && !scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(19,30,27,0.5)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                                title="Logout"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                            </button>
                        </div>
                    ) : (
                        /* Guest state: show login + register buttons */
                        <>
                            <button
                                onClick={onNavigateLogin}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: font,
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color: isTransparent ? '#ffffff' : 'rgba(19,30,27,0.7)',
                                    textShadow: isTransparent ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                                    padding: 0,
                                    transition: 'color 0.3s, text-shadow 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.7)' : '#b32000';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = isTransparent ? '#ffffff' : 'rgba(19,30,27,0.7)';
                                }}
                            >
                                Masuk
                            </button>
                            <button
                                onClick={onNavigateRegister}
                                style={{
                                    border: isTransparent ? '1px solid #ffffff' : '1.5px solid #b32000',
                                    color: isTransparent ? '#ffffff' : '#b32000',
                                    textShadow: isTransparent ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                                    boxShadow: isTransparent ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                                    padding: '8px 24px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    if (isTransparent) {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.color = '#000000';
                                        e.currentTarget.style.textShadow = 'none';
                                        e.currentTarget.style.boxShadow = 'none';
                                    } else {
                                        e.currentTarget.style.backgroundColor = '#b32000';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = isTransparent ? '#ffffff' : '#b32000';
                                    e.currentTarget.style.textShadow = isTransparent ? '0 1px 4px rgba(0,0,0,0.5)' : 'none';
                                    e.currentTarget.style.boxShadow = isTransparent ? '0 1px 3px rgba(0,0,0,0.3)' : 'none';
                                }}
                            >
                                Daftar
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Camera Modal */}
            {showCameraModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '24px',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        maxWidth: '90vw'
                    }}>
                        <h3 style={{ margin: 0, fontFamily: font, fontSize: '18px', fontWeight: 700, color: '#131e1b' }}>Gunakan Kamera</h3>
                        
                        <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '4/3', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            ></video>
                        </div>
                        
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                            <button 
                                onClick={stopCamera}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '9999px',
                                    border: '1px solid #e0e0e0',
                                    background: '#fff',
                                    color: '#131e1b',
                                    fontFamily: font,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                                Batal
                            </button>
                            <button 
                                onClick={capturePhoto}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    background: '#b32000',
                                    color: '#fff',
                                    fontFamily: font,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8a1800'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b32000'}
                            >
                                Ambil Foto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
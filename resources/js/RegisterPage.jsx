import React, { useState, useEffect, useRef } from 'react';

export default function RegisterPage({ onNavigateHome, onNavigateLogin }) {
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        whatsapp: '',
        password: '',
        address: ''
    });

    // --- STATE ANIMASI LOGO LONTARA ---
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const heroImgRef = useRef(null);

    // --- SAKLAR PARALLAX (SUDAH FIX) ---
    useEffect(() => {
        const handleMouseMove = (e) => {
            const moveX = (e.clientX - window.innerWidth / 4) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            setParallax({ x: moveX, y: moveY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // --- INTERVAL TIMING LOGO ---
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
                setFade(false);
            }, 400);
        }, 3800);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registrasi berhasil! (Demo)');
    };

    const font = "'Plus Jakarta Sans', sans-serif";

    const labelStyle = {
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: '#5c4039',
        paddingLeft: '4px'
    };

    const inputStyle = {
        fontFamily: font,
        fontSize: '16px',
        fontWeight: 400,
        color: '#131e1b',
        backgroundColor: '#f0fcf7',
        border: 'none',
        borderBottom: '2px solid #e6bdb5',
        padding: '12px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.3s ease'
    };

    const inputFocusHandler = (e) => {
        e.target.style.borderBottomColor = '#23F7DB';
        if (e.target.parentElement) {
            e.target.parentElement.style.transform = 'scale(1.01)';
            e.target.parentElement.style.transition = 'transform 0.3s ease';
        }
    };

    const inputBlurHandler = (e) => {
        e.target.style.borderBottomColor = '#e6bdb5';
        if (e.target.parentElement) {
            e.target.parentElement.style.transform = 'scale(1)';
        }
    };

    return (
        <main style={{ display: 'flex', height: '100vh', width: '100%', fontFamily: font, overflow: 'hidden' }}>
            {/* Left Section: Cinematic Hero */}
            <section style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                overflow: 'hidden',
                display: 'block'
            }} className="register-hero-section">
                <img
                    ref={heroImgRef}
                    alt="South Sulawesi Highlands"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB428y5rHMi0j0psH-XT3wj3gCWYo5gY68iXAqVfg1rV7nNpurpVPn2l2T-9rKhyF2krAK9SX6earjDU9vWo3WiOiwLWlFgopjKalHYmRW09oy6zJzFn0HodB9pE-Jl-NTmWhsPIwhCdBAlibPTi6voavov-7vyKlhG-I7DYXpnqE8t0xYGlXpmFqEGx3q3-mwktg-6DR5QXxvFjmT1h8RVZqFq1zIi_gnptl9CUMKai43qMFX6ctxDLQ7fGkb6jVSVfZzy47e_Tw"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(1.05) translate(${parallax.x}px, ${parallax.y}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
                }} />

                {/* ANIMATED BRANDING TOP-LEFT */}
                <div
                    onClick={onNavigateHome}
                    style={{
                        position: 'absolute',
                        top: '40px',
                        left: '64px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    <img
                        src="/logo TanaOgi.png"
                        alt="Logo Tana Ogi"
                        style={{
                            width: '38px',
                            height: '38px',
                            objectFit: 'contain'
                        }}
                    />
                    <span style={{
                        fontFamily: font,
                        fontSize: '26px',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        display: 'inline-block',
                        opacity: fade ? 0 : 1,
                        filter: fade ? 'blur(8px)' : 'blur(0px)',
                        transform: fade ? 'scale(0.96)' : 'scale(1)',
                        transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease',
                    }}>
                        {titles[currentIndex]}
                    </span>
                </div>

                {/* Hero Content Bottom */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    marginTop: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '64px',
                    paddingBottom: '80px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
                        <span style={{ width: '48px', height: '4px', backgroundColor: '#23F7DB', borderRadius: '9999px' }} />
                        <span style={{
                            fontFamily: font,
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.20em',
                            color: '#23F7DB',
                            textTransform: 'uppercase'
                        }}>TanaOgi' AUTHENTIC</span>
                    </div>

                    <h1 style={{
                        fontFamily: font,
                        fontSize: '64px',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        color: '#ffffff',
                        marginBottom: '24px'
                    }}>
                        Discover the <br />
                        <span style={{ color: '#31fde1' }}>Hidden Paradise</span>
                    </h1>

                    <p style={{
                        fontFamily: font,
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '28rem'
                    }}>
                        Join a community of travelers exploring the soul of South Sulawesi. From misty highlands to turquoise coasts, your journey starts here.
                    </p>
                </div>
            </section>

            {/* Right Section: Registration Form */}
            <section className="register-form-section" style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#eaf6f1',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                position: 'relative'
            }}>
                {/* Mobile Header */}
                <div className="register-mobile-header" style={{
                    display: 'none',
                    padding: '20px',
                    paddingTop: '48px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="/logo TanaOgi.png" alt="Logo" style={{ width: '28px', height: 'auto' }} />
                        <span style={{
                            fontFamily: font,
                            fontSize: '22px',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: '#b32000',
                            opacity: fade ? 0 : 1,
                            transition: 'opacity 0.4s'
                        }}>{titles[currentIndex]}</span>
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateLogin) onNavigateLogin(); }} style={{
                        fontFamily: font,
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.20em',
                        textTransform: 'uppercase',
                        color: '#5c4039',
                        textDecoration: 'none'
                    }}>LOGIN</a>
                </div>

                <div style={{
                    maxWidth: '576px',
                    margin: '0 auto',
                    width: '100%',
                    padding: '80px 20px',
                    display: 'flex',
                    flexDirection: 'column'
                }} className="register-form-container">
                    <header style={{ marginBottom: '48px' }}>
                        <h2 style={{
                            fontFamily: font,
                            fontSize: '32px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            color: '#131e1b',
                            marginBottom: '4px'
                        }}>Create your account</h2>
                        <p style={{
                            fontFamily: font,
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#5c4039'
                        }}>Step into a world of curated cultural experiences.</p>
                    </header>

                    {/* Profile Picture Uploader */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '96px',
                                height: '96px',
                                borderRadius: '50%',
                                backgroundColor: '#deebe6',
                                border: '2px dashed #e6bdb5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                transition: 'border-color 0.3s'
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#916f68' }}>person</span>
                            </div>
                            <button style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: '#F5401B',
                                color: '#ffffff',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                transition: 'transform 0.2s'
                            }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                            </button>
                        </div>
                        <div>
                            <span style={{ ...labelStyle, display: 'block', marginBottom: '4px' }}>PROFILE PHOTO</span>
                            <p style={{ fontFamily: font, fontSize: '12px', color: 'rgba(92,64,57,0.7)' }}>Recommended: Square image, max 2MB.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="register-form-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="I Mangkubumi"
                                    value={formData.fullName}
                                    onChange={e => handleInputChange('fullName', e.target.value)}
                                    onFocus={inputFocusHandler}
                                    onBlur={inputBlurHandler}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={labelStyle}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="explorer@tanaogi.com"
                                    value={formData.email}
                                    onChange={e => handleInputChange('email', e.target.value)}
                                    onFocus={inputFocusHandler}
                                    onBlur={inputBlurHandler}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="register-form-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={labelStyle}>WhatsApp Number</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontFamily: font,
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: 'rgba(92,64,57,0.6)'
                                    }}>+62</span>
                                    <input
                                        type="tel"
                                        placeholder="812 3456 7890"
                                        value={formData.whatsapp}
                                        onChange={e => handleInputChange('whatsapp', e.target.value)}
                                        onFocus={inputFocusHandler}
                                        onBlur={inputBlurHandler}
                                        style={{ ...inputStyle, paddingLeft: '48px' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={labelStyle}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => handleInputChange('password', e.target.value)}
                                        onFocus={inputFocusHandler}
                                        onBlur={inputBlurHandler}
                                        style={{ ...inputStyle, paddingRight: '48px' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: 'rgba(92,64,57,0.6)',
                                            padding: 0
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={labelStyle}>Current Residence Address</label>
                            <textarea
                                placeholder="Street name, City, Province..."
                                value={formData.address}
                                onChange={e => handleInputChange('address', e.target.value)}
                                onFocus={inputFocusHandler}
                                onBlur={inputBlurHandler}
                                rows={2}
                                style={{ ...inputStyle, resize: 'none' }}
                            />
                        </div>

                        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#F5401B',
                                    color: '#ffffff',
                                    padding: '24px 48px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 40px -5px rgba(245, 64, 27, 0.4)'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Register Now
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', padding: '24px 0' }}>
                                <div style={{ flexGrow: 1, height: '1px', background: 'rgba(230,189,181,0.3)' }} />
                                <span style={{
                                    margin: '0 16px',
                                    fontFamily: font,
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(92,64,57,0.5)'
                                }}>OR CONTINUE WITH</span>
                                <div style={{ flexGrow: 1, height: '1px', background: 'rgba(230,189,181,0.3)' }} />
                            </div>

                            <button
                                type="button"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '24px',
                                    border: '2px solid #e6bdb5',
                                    backgroundColor: 'transparent',
                                    padding: '12px 48px',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#006b5e'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#e6bdb5'}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span style={{ fontFamily: font, fontWeight: 700, fontSize: '16px', color: '#131e1b' }}>Sign up with Google</span>
                            </button>
                        </div>

                        <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: font, fontSize: '14px', color: '#5c4039' }}>
                            Already have an account?{' '}
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); if (onNavigateLogin) onNavigateLogin(); }}
                                style={{ color: '#F5401B', fontWeight: 700, textDecoration: 'none' }}
                                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.target.style.textDecoration = 'none'}
                            >Login here</a>
                        </p>
                    </form>

                    <footer style={{
                        marginTop: '80px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(230,189,181,0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '24px'
                    }}>
                        <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(92,64,57,0.6)' }}>© 2026 TanaOgi'. Crafted for the Cultural Explorer.</p>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            {['Privacy', 'Terms'].map(link => (
                                <a key={link} href="#" style={{
                                    fontFamily: font,
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(92,64,57,0.6)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s'
                                }}
                                    onMouseEnter={e => e.target.style.color = '#F5401B'}
                                    onMouseLeave={e => e.target.style.color = 'rgba(92,64,57,0.6)'}
                                >{link}</a>
                            ))}
                        </div>
                    </footer>
                </div>
            </section>
        </main>
    );
}
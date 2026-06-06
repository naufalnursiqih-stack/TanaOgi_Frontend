import React, { useState, useEffect, useRef } from 'react';

export default function LoginPage({ onNavigateHome, onNavigateRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    // --- STATE ANIMASI LOGO LONTARA ---
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const font = "'Plus Jakarta Sans', sans-serif";

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            setParallax({ x, y });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login sedang dalam pengembangan!');
    };

    const labelStyle = {
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: '#5c4039',
    };

    const inputStyle = (focused) => ({
        fontFamily: font,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: '#131e1b',
        background: 'transparent',
        border: 'none',
        borderBottom: focused ? '2px solid #b32000' : '1px solid #e6bdb5',
        outline: 'none',
        padding: '8px 0',
        width: '100%',
        transition: 'border-color 0.3s ease',
    });

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'row',
            fontFamily: font,
            backgroundColor: '#f0fcf7',
            position: 'relative',
        }}>
            {/* Admin Login Link */}
            <div style={{ position: 'absolute', top: '24px', right: '64px', zIndex: 30 }} className="login-admin-link">
                <a href="#" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: font,
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    color: '#131e1b',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                }}
                    onMouseEnter={e => e.currentTarget.style.color = '#b32000'}
                    onMouseLeave={e => e.currentTarget.style.color = '#131e1b'}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>admin_panel_settings</span>
                    <span>Login sebagai Admin</span>
                </a>
            </div>

            {/* Left Side: Cinematic Visual */}
            <section className="login-hero-section" style={{
                position: 'relative',
                width: '50%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
            }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img
                        alt="Tanjung Bira Beach"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeyTYN0gGp39FX9kFka9pq_LvmU1fXakF18AX2WQMHB7auwbLlOilicr3EusU8PU9BbjIT2pbz24i0AE6L1CPuOgONhbVSQOXLM6GJIlq2AIkqtksGxc8En3u3eNEsN_jG9tHyi8AWkckJvDQmrRMXNgLQtT_4TSWJXWYSd_-OkM_hcK7Iq3vul4NPlH0eCcdh_SMPJaVgfZWkvCIL2rvdrvOzvQLEhaNn0cByfvLLw1WGqmrzbk64qN3rmRuwH8hkVKYM1vxOO_8"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: `scale(1.1) translate(${parallax.x}px, ${parallax.y}px)`,
                            transition: 'transform 0.1s ease-out',
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                    }} />
                </div>

                {/* ANIMATED BRANDING TOP-LEFT */}
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: '64px',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    userSelect: 'none'
                }} onClick={onNavigateHome}>
                    <img
                        src="/logo TanaOgi.png"
                        alt="Logo Tana Ogi"
                        style={{
                            width: '38px',
                            height: '38px',
                            objectFit: 'contain'
                        }}
                    />
                    <span
                        style={{
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
                        }}
                    >
                        {titles[currentIndex]}
                    </span>
                </div>

                {/* Hero Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '0 64px',
                    color: '#ffffff',
                    maxWidth: '560px',
                }}>
                    <div style={{ marginBottom: '12px' }}>
                        <span style={{
                            fontFamily: font,
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.30em',
                            textTransform: 'uppercase',
                            color: '#31fde1',
                            opacity: 0.9,
                        }}>TanaOgi' Identity</span>
                    </div>

                    <h1 style={{
                        fontFamily: font,
                        fontSize: '64px',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        color: '#ffffff',
                        marginBottom: '24px',
                    }}>
                        Welcome Back,<br />Explorer.
                    </h1>

                    <p style={{
                        fontFamily: font,
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '28rem',
                    }}>
                        Continue your journey through the soul of South Sulawesi. Your dashboard of curated wonders awaits.
                    </p>
                </div>
            </section>

            {/* Right Side: Login Form */}
            <section style={{
                width: '50%',
                backgroundColor: '#f0fcf7',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '80px 64px',
                position: 'relative',
            }} className="login-form-section">
                <div style={{ maxWidth: '448px', width: '100%', margin: '0 auto' }}>
                    <header style={{ marginBottom: '48px' }}>
                        <h2 style={{
                            fontFamily: font,
                            fontSize: '32px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            color: '#131e1b',
                            marginBottom: '4px',
                        }}>Login to your account</h2>
                        <p style={{
                            fontFamily: font,
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#5c4039',
                        }}>Enter your credentials to access your explorer dashboard.</p>
                    </header>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label htmlFor="login-email" style={labelStyle}>Email Address</label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="explorer@tanaogi.com"
                                value={formData.email}
                                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                style={inputStyle(emailFocused)}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'flex-end' }}>
                                <label htmlFor="login-password" style={labelStyle}>Password</label>
                                <a href="#" style={{
                                    fontFamily: font,
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    color: '#b32000',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s',
                                }}
                                    onMouseEnter={e => e.target.style.color = '#de2f08'}
                                    onMouseLeave={e => e.target.style.color = '#b32000'}
                                >Forgot Password?</a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    style={{ ...inputStyle(passwordFocused), paddingRight: '36px' }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        bottom: '8px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#5c4039',
                                        padding: 0,
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#b32000'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#5c4039'}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div style={{ paddingTop: '24px' }}>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#b32000',
                                    color: '#ffffff',
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    padding: '24px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    boxShadow: '0 20px 40px -10px rgba(179,32,0,0.35)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#de2f08';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(179,32,0,0.5)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = '#b32000';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(179,32,0,0.35)';
                                }}
                            >
                                Login Now
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                            </button>
                        </div>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '80px 0', gap: '24px' }}>
                        <div style={{ flexGrow: 1, height: '1px', background: 'rgba(230,189,181,0.3)' }} />
                        <span style={{
                            fontFamily: font,
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.20em',
                            textTransform: 'uppercase',
                            color: 'rgba(92,64,57,0.6)',
                            flexShrink: 0,
                        }}>Or continue with</span>
                        <div style={{ flexGrow: 1, height: '1px', background: 'rgba(230,189,181,0.3)' }} />
                    </div>

                    <button
                        type="button"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '24px',
                            border: '1px solid rgba(230,189,181,0.5)',
                            backgroundColor: 'transparent',
                            padding: '24px',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                            fontFamily: font,
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#131e1b',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = '#b32000';
                            e.currentTarget.querySelector('.google-btn-text').style.color = '#b32000';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(230,189,181,0.5)';
                            e.currentTarget.querySelector('.google-btn-text').style.color = '#131e1b';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="google-btn-text" style={{ transition: 'color 0.3s', fontFamily: font }}>Sign in with Google</span>
                    </button>

                    <footer style={{ marginTop: '80px', textAlign: 'center' }}>
                        <p style={{ fontFamily: font, fontSize: '16px', fontWeight: 400, color: '#5c4039' }}>
                            Don't have an account?{' '}
                            <a
                                href="#"
                                onClick={e => { e.preventDefault(); if (onNavigateRegister) onNavigateRegister(); }}
                                style={{ color: '#b32000', fontWeight: 700, textDecoration: 'none', marginLeft: '4px', transition: 'all 0.3s' }}
                                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.target.style.textDecoration = 'none'}
                            >Register here</a>
                        </p>
                    </footer>
                </div>
            </section>
        </main>
    );
}
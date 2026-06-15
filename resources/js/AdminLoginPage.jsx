import React, { useState, useEffect } from 'react';

const font = "'Plus Jakarta Sans', sans-serif";

export default function AdminLoginPage({ onNavigateBack, onLoginSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 50);

        const handleMouseMove = (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            setParallax({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const inputUsername = formData.username;
        const inputPassword = formData.password;

        // Map mock credentials to the actual seeded admin credentials
        let loginEmail = inputUsername;
        let loginPassword = inputPassword;

        if (
            (inputUsername === 'Pares' || inputUsername === 'Naufal') &&
            inputPassword === 'admin123'
        ) {
            loginEmail = 'admin@tanaogi.zyy.my.id';
            loginPassword = 'password';
        }

        try {
            const res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Save token and user info to localStorage
                localStorage.setItem('auth_token', data.data.token);
                localStorage.setItem('auth_user', JSON.stringify(data.data.user));
                
                setIsLoading(false);
                if (onLoginSuccess) {
                    onLoginSuccess(data.data.user, data.data.token);
                }
            } else {
                setIsLoading(false);
                setError(data.message || 'Username/Email atau password salah.');
            }
        } catch (err) {
            setIsLoading(false);
            setError('Gagal menghubungi server.');
        }
    };

    // Input field style (pill shape like reference)
    const inputWrapStyle = (focused) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: focused ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
        border: focused ? '1.5px solid #006b5e' : '1px solid rgba(145,111,104,0.22)',
        borderRadius: '9999px',
        padding: '0 20px 0 48px',
        transition: 'all 0.25s ease',
        boxShadow: focused ? '0 4px 20px rgba(0,107,94,0.12)' : 'none',
        transform: focused ? 'scale(1.018)' : 'scale(1)',
    });

    const inputStyle = {
        fontFamily: font,
        fontSize: '15px',
        fontWeight: 400,
        color: '#131e1b',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        padding: '14px 0',
        width: '100%',
    };

    const iconStyle = {
        position: 'absolute',
        left: '16px',
        color: '#916f68',
        fontSize: '20px',
        lineHeight: 1,
        transition: 'color 0.2s',
        pointerEvents: 'none',
    };

    const labelStyle = {
        fontFamily: font,
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: '#5c4039',
        marginLeft: '4px',
        marginBottom: '6px',
        display: 'block',
    };

    return (
        <>
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

                .admin-login-card {
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .admin-login-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .btn-admin-submit {
                    background-color: #f5401b;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                .btn-admin-submit:hover:not(:disabled) {
                    background-color: #e03918;
                    transform: translateY(-2px);
                    box-shadow: 0 12px 28px -6px rgba(245,64,27,0.45) !important;
                }
                .btn-admin-submit:active:not(:disabled) {
                    transform: scale(0.98);
                }
                .btn-admin-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    text-decoration: none;
                    transition: all 0.25s;
                    color: #5c4039;
                }
                .back-link:hover {
                    color: #006b5e;
                    transform: translateX(-3px);
                }
                input::placeholder {
                    color: #b09890;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes shake {
                    0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)}
                }
                .error-shake { animation: shake 0.35s ease; }
            `}</style>

            <main style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: font,
                position: 'relative',
                overflow: 'hidden',
                padding: '20px',
            }}>
                {/* Hero Background */}
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.38), rgba(0,0,0,0.60)),
                        url(https://lh3.googleusercontent.com/aida/AP1WRLuAOoMo5ZLRB3A-86TQtjsTOzYSz4VTp9k9zZ0nT-e0ahpUGZLIgDSVi9n7ImYc7VyVSLqSqj0elGRehztFNPTeaDjhGz3YEhbP60UBAdrrvwwE3wiFoeDbVyiynBzkiyfBt3fyAWIcZAmcXMB3re-hYUyl9chDZY3V5HIeGAyYrTu5uh9l8aFWjCj1rLQ4CmiQHjFFxvCH1Wc7hSlWZPg2IdbQI4-JJexQfrl5z7ORbZ1ToVwRtMwa1mc)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `scale(1.06) translate(${parallax.x}px, ${parallax.y}px)`,
                    transition: 'transform 0.12s ease-out',
                }} />

                {/* Glass Login Card */}
                <div
                    className={`admin-login-card${fadeIn ? ' visible' : ''}`}
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                        maxWidth: '460px',
                        background: 'rgba(240, 252, 247, 0.86)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.45)',
                        borderRadius: '28px',
                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
                        padding: '48px 44px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '36px',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
                        <img
                            src="/logo TanaOgi.png"
                            alt="Tana Ogi Logo"
                            style={{ height: '72px', width: 'auto', objectFit: 'contain' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h1 style={{
                                fontFamily: font,
                                fontSize: '30px',
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                color: '#131e1b',
                                margin: 0,
                            }}>Portal Admin</h1>
                            <p style={{
                                fontFamily: font,
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                color: '#006b5e',
                                opacity: 0.75,
                                margin: 0,
                            }}>Akses Manajemen Aman</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        {/* Error */}
                        {error && (
                            <div
                                className="error-shake"
                                style={{
                                    background: 'rgba(245,64,27,0.10)',
                                    border: '1px solid rgba(245,64,27,0.25)',
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    fontFamily: font,
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: '#b32000',
                                    textAlign: 'center',
                                }}
                            >{error}</div>
                        )}

                        {/* Username */}
                        <div>
                            <label htmlFor="admin-username" style={labelStyle}>Username Admin</label>
                            <div style={inputWrapStyle(usernameFocused)}>
                                <span
                                    className="material-symbols-outlined"
                                    style={{ ...iconStyle, color: usernameFocused ? '#006b5e' : '#916f68' }}
                                >person</span>
                                <input
                                    id="admin-username"
                                    type="text"
                                    placeholder="Masukkan username"
                                    value={formData.username}
                                    onChange={e => setFormData(p => ({ ...p, username: e.target.value }))}
                                    onFocus={() => setUsernameFocused(true)}
                                    onBlur={() => setUsernameFocused(false)}
                                    style={inputStyle}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <label htmlFor="admin-password" style={{ ...labelStyle, marginBottom: 0, marginLeft: '4px' }}>Password</label>
                                <a
                                    href="#"
                                    style={{
                                        fontFamily: font,
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: '0.20em',
                                        textTransform: 'uppercase',
                                        color: '#006b5e',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                    }}
                                    onMouseEnter={e => e.target.style.color = '#f5401b'}
                                    onMouseLeave={e => e.target.style.color = '#006b5e'}
                                >Lupa?</a>
                            </div>
                            <div style={inputWrapStyle(passwordFocused)}>
                                <span
                                    className="material-symbols-outlined"
                                    style={{ ...iconStyle, color: passwordFocused ? '#006b5e' : '#916f68' }}
                                >lock</span>
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    style={{ ...inputStyle, paddingRight: '40px' }}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(s => !s)}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#916f68',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'color 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#006b5e'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#916f68'}
                                    tabIndex={-1}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                            <button
                                type="submit"
                                className="btn-admin-submit"
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '9999px',
                                    fontFamily: font,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    boxShadow: '0 8px 24px -6px rgba(245,64,27,0.35)',
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Masuk Dashboard
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                                    </>
                                )}
                            </button>

                            {/* Back link */}
                            <div style={{ textAlign: 'center' }}>
                                <a
                                    href="#"
                                    className="back-link"
                                    style={{ justifyContent: 'center' }}
                                    onClick={e => { e.preventDefault(); if (onNavigateBack) onNavigateBack(); }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
                                    <span style={{
                                        fontFamily: font,
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                    }}>Kembali ke Website</span>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Branding */}
                <footer style={{
                    position: 'fixed',
                    bottom: '28px',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}>
                    <p style={{
                        fontFamily: font,
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.5em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)',
                        margin: 0,
                    }}>Authentication Required • Tana Ogi Premium v2.1</p>
                </footer>
            </main>
        </>
    );
}

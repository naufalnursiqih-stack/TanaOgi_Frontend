import React, { useEffect, useRef } from 'react';

// ─── CSS Animations (injected once) ───────────────────────────────────────────
const ERROR_PAGE_STYLES = `
  @import url('https://fonts.cdnfonts.com/css/clash-display');

  @keyframes ep-bob {
    0%, 100% { transform: translateY(-10px); }
    50%       { transform: translateY(10px); }
  }
  @keyframes ep-bob-shake {
    0%, 100% { transform: translateY(-8px) rotate(-4deg); }
    50%       { transform: translateY(8px) rotate(4deg); }
  }
  @keyframes ep-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ep-spin-reverse {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes ep-wave {
    0%, 100% { transform: translateY(-10px) scaleX(1); }
    25%       { transform: translateY(4px) scaleX(1.05); }
    75%       { transform: translateY(6px) scaleX(0.96); }
  }
  @keyframes ep-traffic {
    0%, 33%   { filter: brightness(1.4) drop-shadow(0 0 8px #22c55e); }
    34%, 66%  { filter: brightness(1.4) drop-shadow(0 0 8px #f59e0b); }
    67%, 100% { filter: brightness(1.4) drop-shadow(0 0 8px #ef4444); }
  }
  @keyframes ep-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes ep-orbit {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes ep-orbit-rev {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(-360deg); }
  }
  @keyframes ep-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ep-pulse-ring {
    0%   { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.6); }
  }
  @keyframes ep-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.15; }
  }

  .ep-anim-bob        { animation: ep-bob 2.5s ease-in-out infinite; }
  .ep-anim-shake      { animation: ep-bob-shake 2.8s ease-in-out infinite; }
  .ep-anim-spin       { animation: ep-spin 4s linear infinite; display: inline-block; }
  .ep-anim-spin-rev   { animation: ep-spin-reverse 3s linear infinite; display: inline-block; }
  .ep-anim-wave       { animation: ep-wave 3s ease-in-out infinite; }
  .ep-anim-traffic    { animation: ep-traffic 3s steps(1) infinite; }

  .ep-shimmer {
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ep-shimmer 3s linear infinite;
    font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
  }

  .ep-fadeUp-1 { animation: ep-fadeUp 0.65s ease 0.05s both; }
  .ep-fadeUp-2 { animation: ep-fadeUp 0.65s ease 0.15s both; }
  .ep-fadeUp-3 { animation: ep-fadeUp 0.65s ease 0.25s both; }
  .ep-fadeUp-4 { animation: ep-fadeUp 0.65s ease 0.35s both; }
  .ep-fadeUp-5 { animation: ep-fadeUp 0.65s ease 0.45s both; }

  .ep-orbit-cw  { animation: ep-orbit     var(--orbit-dur, 20s) linear infinite; }
  .ep-orbit-ccw { animation: ep-orbit-rev var(--orbit-dur, 28s) linear infinite; }

  .ep-pulse-ring {
    position: absolute;
    inset: -14px;
    border: 2px solid rgba(245, 64, 27, 0.3);
    border-radius: 50%;
    animation: ep-pulse-ring 2s ease-out infinite;
  }
  .ep-pulse-ring-2 {
    inset: -28px;
    animation-delay: 0.5s;
    border-color: rgba(245, 64, 27, 0.15);
  }

  .ep-blink { animation: ep-blink 1.2s ease-in-out infinite; }

  .ep-btn-primary {
    transition: all 0.3s ease;
  }
  .ep-btn-primary:hover {
    transform: scale(1.04);
  }
  .ep-btn-secondary {
    transition: all 0.3s ease;
    border: 1.5px solid rgba(19,30,27,0.18);
    background: transparent;
    color: #131e1b;
  }
  .ep-btn-secondary:hover {
    background: rgba(19,30,27,0.05);
    border-color: rgba(19,30,27,0.35);
  }

  .ep-glass-badge {
    backdrop-filter: blur(12px);
    background: rgba(255,255,255,0.35);
    border: 1px solid rgba(255,255,255,0.55);
  }
`;

// ─── Per-code configuration ────────────────────────────────────────────────────
const ERROR_CONFIG = {
  404: {
    emoji: '🏝️',
    emojiAnim: 'bob',
    title: 'Destinasi Tidak Ditemukan',
    description:
      'Halaman yang Anda cari tidak ada atau telah dipindahkan. Mungkin destinasi ini sudah berubah nama atau dihapus dari radar petualangan kami.',
    gradient: 'linear-gradient(135deg, #F5401B 0%, #23F7DB 100%)',
    orbitColor1: 'rgba(35, 247, 219, 0.22)',
    orbitColor2: 'rgba(245, 64, 27, 0.13)',
    glowColor: 'rgba(35, 247, 219, 0.06)',
    meshGradient: `
      radial-gradient(circle at 20% 20%, rgba(245,64,27,0.08) 0%, transparent 40%),
      radial-gradient(circle at 80% 10%, rgba(35,247,219,0.12) 0%, transparent 40%)
    `,
    primaryBtn: { label: 'Kembali ke Beranda', emoji: '🏠', action: 'home', color: '#b32000' },
    secondaryBtn: { label: 'Halaman Sebelumnya', icon: 'arrow_back', action: 'back' },
    badge: null,
  },
  403: {
    emoji: '🔒',
    emojiAnim: 'shake',
    title: 'Akses Terlarang',
    description:
      'Anda tidak memiliki izin untuk memasuki area ini. Kawasan ini hanya dapat diakses oleh pengunjung dengan tiket yang sah.',
    gradient: 'linear-gradient(135deg, #b32000 0%, #F5401B 100%)',
    orbitColor1: 'rgba(179, 32, 0, 0.18)',
    orbitColor2: 'rgba(245, 64, 27, 0.10)',
    glowColor: 'rgba(179, 32, 0, 0.06)',
    meshGradient: `
      radial-gradient(circle at 15% 25%, rgba(179,32,0,0.10) 0%, transparent 45%),
      radial-gradient(circle at 85% 15%, rgba(245,64,27,0.08) 0%, transparent 40%)
    `,
    primaryBtn: { label: 'Kembali ke Beranda', emoji: '🏠', action: 'home', color: '#b32000' },
    secondaryBtn: { label: 'Halaman Sebelumnya', icon: 'arrow_back', action: 'back' },
    badge: null,
    pulseRings: true,
  },
  401: {
    emoji: '🛂',
    emojiAnim: 'bob',
    title: 'Perlu Masuk Akun',
    description:
      'Anda harus login terlebih dahulu untuk mengakses area ini. Silakan masuk dengan akun Anda atau daftar jika belum memiliki akun.',
    gradient: 'linear-gradient(135deg, #006b5e 0%, #23F7DB 100%)',
    orbitColor1: 'rgba(0, 107, 94, 0.20)',
    orbitColor2: 'rgba(35, 247, 219, 0.12)',
    glowColor: 'rgba(0, 107, 94, 0.06)',
    meshGradient: `
      radial-gradient(circle at 20% 20%, rgba(0,107,94,0.10) 0%, transparent 45%),
      radial-gradient(circle at 80% 15%, rgba(35,247,219,0.08) 0%, transparent 40%)
    `,
    primaryBtn: { label: 'Masuk Sekarang', emoji: '🔑', action: 'login', color: '#006b5e' },
    secondaryBtn: { label: 'Kembali ke Beranda', icon: 'home', action: 'home' },
    badge: null,
  },
  500: {
    emoji: '⚙️',
    emojiAnim: 'spin',
    title: 'Server Sedang Beristirahat',
    description:
      'Mesin kami sedang butuh istirahat sejenak. Tim teknisi sedang bekerja keras memperbaiki situasi ini. Silakan coba kembali beberapa saat lagi.',
    gradient: 'linear-gradient(135deg, #2D4A42 0%, #23F7DB 100%)',
    orbitColor1: 'rgba(45, 74, 66, 0.18)',
    orbitColor2: 'rgba(35, 247, 219, 0.10)',
    glowColor: 'rgba(45, 74, 66, 0.06)',
    meshGradient: `
      radial-gradient(circle at 10% 30%, rgba(45,74,66,0.10) 0%, transparent 50%),
      radial-gradient(circle at 90% 20%, rgba(35,247,219,0.08) 0%, transparent 45%)
    `,
    primaryBtn: { label: 'Kembali ke Beranda', emoji: '🏠', action: 'home', color: '#2D4A42' },
    secondaryBtn: { label: 'Coba Lagi', icon: 'refresh', action: 'reload' },
    badge: { text: 'SISTEM DALAM PEMELIHARAAN', color: '#2D4A42', dotColor: '#F5401B' },
  },
  503: {
    emoji: '🌊',
    emojiAnim: 'wave',
    title: 'Layanan Tidak Tersedia',
    description:
      'Layanan sedang mengalami gangguan atau dalam proses pemeliharaan rutin. Kami akan segera kembali dengan kondisi prima untuk menemani petualangan Anda.',
    gradient: 'linear-gradient(135deg, #006b5e 0%, #F5401B 100%)',
    orbitColor1: 'rgba(0, 107, 94, 0.18)',
    orbitColor2: 'rgba(245, 64, 27, 0.12)',
    glowColor: 'rgba(0, 107, 94, 0.06)',
    meshGradient: `
      radial-gradient(circle at 20% 30%, rgba(0,107,94,0.10) 0%, transparent 45%),
      radial-gradient(circle at 80% 15%, rgba(245,64,27,0.07) 0%, transparent 40%)
    `,
    primaryBtn: { label: 'Kembali ke Beranda', emoji: '🏠', action: 'home', color: '#006b5e' },
    secondaryBtn: { label: 'Coba Lagi', icon: 'refresh', action: 'reload' },
    badge: { text: 'SEDANG DALAM PEMELIHARAAN', color: '#006b5e', dotColor: '#23F7DB' },
  },
  429: {
    emoji: '🚦',
    emojiAnim: 'traffic',
    title: 'Terlalu Banyak Permintaan',
    description:
      'Anda mengirim terlalu banyak permintaan dalam waktu singkat. Mohon tunggu sejenak sebelum mencoba kembali agar perjalanan digital kita tetap nyaman.',
    gradient: 'linear-gradient(135deg, #FF9900 0%, #F5401B 100%)',
    orbitColor1: 'rgba(255, 153, 0, 0.22)',
    orbitColor2: 'rgba(245, 64, 27, 0.12)',
    glowColor: 'rgba(255, 153, 0, 0.07)',
    meshGradient: `
      radial-gradient(circle at 20% 20%, rgba(255,153,0,0.10) 0%, transparent 45%),
      radial-gradient(circle at 80% 10%, rgba(245,64,27,0.08) 0%, transparent 40%)
    `,
    primaryBtn: { label: 'Kembali ke Beranda', emoji: '🏠', action: 'home', color: '#b32000' },
    secondaryBtn: { label: 'Coba Lagi', icon: 'refresh', action: 'reload' },
    badge: { text: 'BATAS PERMINTAAN TERCAPAI', color: '#b32000', dotColor: '#FF9900' },
  },
};

// ─── Emoji Renderer ────────────────────────────────────────────────────────────
function ErrorEmoji({ emoji, anim, hasPulseRings }) {
  return (
    <div className="ep-fadeUp-1" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
      {hasPulseRings && (
        <>
          <div className="ep-pulse-ring" />
          <div className="ep-pulse-ring ep-pulse-ring-2" />
        </>
      )}

      {anim === 'spin' ? (
        /* Dual gear for 500 */
        <div className="ep-anim-bob" style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center' }}>
          <span className={`ep-anim-spin`} style={{ fontSize: '80px', lineHeight: 1, display: 'inline-block' }} role="img" aria-label="Gear">⚙️</span>
          <span className={`ep-anim-spin-rev`} style={{ fontSize: '52px', lineHeight: 1, position: 'absolute', right: '-28px', bottom: '-4px' }} role="img" aria-label="Gear small">⚙️</span>
        </div>
      ) : (
        <span
          className={`
            ${anim === 'bob'     ? 'ep-anim-bob'     : ''}
            ${anim === 'shake'   ? 'ep-anim-shake'   : ''}
            ${anim === 'wave'    ? 'ep-anim-wave'    : ''}
            ${anim === 'traffic' ? 'ep-anim-traffic' : ''}
          `}
          role="img"
          style={{ fontSize: '88px', lineHeight: 1, display: 'inline-block', userSelect: 'none' }}
        >
          {emoji}
        </span>
      )}
    </div>
  );
}

// ─── Orbit Ring ────────────────────────────────────────────────────────────────
function OrbitRing({ size, color, duration, reverse, dotColor }) {
  return (
    <div
      className={reverse ? 'ep-orbit-ccw' : 'ep-orbit-cw'}
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        top: '50%',
        left: '50%',
        border: `1.5px dashed ${color}`,
        borderRadius: '50%',
        '--orbit-dur': `${duration}s`,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-5px',
        left: '50%',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: dotColor,
        transform: 'translateX(-50%)',
        boxShadow: `0 0 8px ${dotColor}`,
      }} />
    </div>
  );
}

// ─── Main ErrorPage Component ──────────────────────────────────────────────────
export default function ErrorPage({
  errorCode = 404,
  onNavigateHome,
  onNavigateLogin,
}) {
  const islandRef = useRef(null);
  const glowRef   = useRef(null);

  // Inject CSS once
  useEffect(() => {
    const styleId = 'error-page-styles';
    if (!document.getElementById(styleId)) {
      const tag = document.createElement('style');
      tag.id = styleId;
      tag.textContent = ERROR_PAGE_STYLES;
      document.head.appendChild(tag);
    }
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Parallax mouse effect
  useEffect(() => {
    const handleMove = (e) => {
      const moveX = (e.clientX - window.innerWidth  / 2) * 0.012;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.012;
      if (islandRef.current) {
        islandRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(calc(-50% + ${-moveX * 2}px), calc(-50% + ${-moveY * 2}px))`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const code   = Number(errorCode);
  const config = ERROR_CONFIG[code] || ERROR_CONFIG[404];
  const font   = "'Plus Jakarta Sans', sans-serif";

  const handlePrimaryAction = () => {
    const action = config.primaryBtn.action;
    if (action === 'home'  && onNavigateHome)  onNavigateHome();
    if (action === 'login' && onNavigateLogin) onNavigateLogin();
  };

  const handleSecondaryAction = () => {
    const action = config.secondaryBtn.action;
    if (action === 'back')   window.history.back();
    if (action === 'reload') window.location.reload();
    if (action === 'home' && onNavigateHome) onNavigateHome();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#E4F0ED',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      overflow: 'hidden',
      zIndex: 9999,
    }}>

      {/* Mesh gradient background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: config.meshGradient,
        pointerEvents: 'none',
      }} />

      {/* Orbit rings */}
      <OrbitRing size={320} color={config.orbitColor1} duration={20} dotColor="#23F7DB" />
      <OrbitRing size={520} color={config.orbitColor2} duration={30} reverse dotColor={config.primaryBtn.color} />

      {/* Main content */}
      <main style={{
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        position: 'relative',
        zIndex: 10,
        padding: '80px 20px',
      }}>

        {/* Floating Emoji */}
        <div ref={islandRef} style={{ transition: 'transform 0.1s ease-out' }}>
          <ErrorEmoji emoji={config.emoji} anim={config.emojiAnim} hasPulseRings={config.pulseRings} />
        </div>

        {/* Error code + title */}
        <div className="ep-fadeUp-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            className="ep-shimmer"
            style={{
              background: config.gradient,
              fontSize: 'clamp(100px, 18vw, 160px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            {code}
          </h1>
          <h2 style={{
            fontFamily: font,
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: '#131e1b',
            marginTop: '-8px',
            padding: '0 12px',
          }}>
            {config.title}
          </h2>
        </div>

        {/* Description */}
        <p className="ep-fadeUp-3" style={{
          fontFamily: font,
          fontSize: '17px',
          lineHeight: 1.65,
          color: '#5c4039',
          maxWidth: '400px',
          opacity: 0.9,
          margin: 0,
        }}>
          {config.description}
        </p>

        {/* Status badge (optional) */}
        {config.badge && (
          <div className="ep-fadeUp-3 ep-blink ep-glass-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 20px',
            borderRadius: '9999px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: config.badge.dotColor,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: font,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: config.badge.color,
            }}>
              {config.badge.text}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="ep-fadeUp-4" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '24px',
          width: '100%',
        }}>
          {/* Primary */}
          <button
            className="ep-btn-primary"
            onClick={handlePrimaryAction}
            style={{
              backgroundColor: config.primaryBtn.color,
              color: '#ffffff',
              fontFamily: font,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.20em',
              padding: '14px 40px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: `0 8px 28px ${config.primaryBtn.color}40`,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '18px' }}>{config.primaryBtn.emoji}</span>
            {config.primaryBtn.label}
          </button>

          {/* Secondary */}
          <button
            className="ep-btn-secondary"
            onClick={handleSecondaryAction}
            style={{
              fontFamily: font,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.20em',
              padding: '14px 40px',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {config.secondaryBtn.icon}
            </span>
            {config.secondaryBtn.label}
          </button>
        </div>

        {/* Glow blur circle */}
        <div ref={glowRef} style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: config.glowColor,
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: -1,
        }} />
      </main>

      {/* TANA OGI Watermark */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.28,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: font,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.42em',
          color: '#5c4039',
        }}>
          TANA OGI
        </span>
      </div>
    </div>
  );
}

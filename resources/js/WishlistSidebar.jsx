import React from 'react';

/**
 * WishlistSidebar Component
 * An interactive slide-out panel that displays favorited destinations,
 * supports custom travel note edits (e.g. target dates), and coordinates navigation.
 */
export default function WishlistSidebar({
    isOpen,
    onClose,
    wishlist = [],
    onRemoveItem,
    onUpdateNote,
    onExploreItem,
}) {
    const font = "'Plus Jakarta Sans', sans-serif";

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop Overlay */}
            <div 
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    zIndex: 99990,
                    animation: 'fadeIn 0.4s ease-out forwards',
                }}
            />

            {/* Sidebar Container */}
            <aside 
                style={{
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    height: '100vh',
                    width: '420px',
                    maxWidth: '100%',
                    backgroundColor: '#0f0a09', // Dark teakwood charcoal
                    borderLeft: '1px solid rgba(230, 189, 181, 0.08)',
                    zIndex: 99999,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box',
                    animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
            >
                {/* CSS Animation Keyframes */}
                <style>{`
                    @keyframes slideInRight {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>

                {/* Sidebar Header */}
                <div style={{ 
                    padding: '24px 32px', 
                    borderBottom: '1px solid rgba(230, 189, 181, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#23F7DB', fontSize: '24px' }}>favorite</span>
                        <h3 style={{ 
                            fontFamily: font, 
                            fontSize: '20px', 
                            fontWeight: 800, 
                            color: '#ffffff', 
                            margin: 0,
                            letterSpacing: '-0.01em'
                        }}>
                            Destinasi Impian
                        </h3>
                    </div>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(230, 189, 181, 0.6)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            transition: 'color 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(230, 189, 181, 0.6)'}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
                    </button>
                </div>

                {/* Wishlist Items List */}
                <div style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    padding: '24px 32px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '20px'
                }} className="no-scrollbar">
                    {wishlist.length === 0 ? (
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            height: '100%', 
                            textAlign: 'center',
                            gap: '16px'
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'rgba(230, 189, 181, 0.15)' }}>explore</span>
                            <p style={{ 
                                fontFamily: font, 
                                fontSize: '14px', 
                                color: 'rgba(230, 189, 181, 0.4)',
                                lineHeight: 1.5,
                                margin: 0
                            }}>
                                Belum ada destinasi yang ditambahkan.<br/>
                                Cari permata Sulawesi Selatan dan klik tombol hati.
                            </p>
                        </div>
                    ) : (
                        wishlist.map(item => (
                            <div 
                                key={item.id} 
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(230, 189, 181, 0.06)',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    {/* Thumbnail Image */}
                                    <div 
                                        onClick={() => { if (onExploreItem) { onExploreItem(item); onClose(); } }}
                                        style={{ 
                                            width: '64px', 
                                            height: '64px', 
                                            borderRadius: '12px', 
                                            overflow: 'hidden', 
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    {/* Detail Meta */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 
                                            onClick={() => { if (onExploreItem) { onExploreItem(item); onClose(); } }}
                                            style={{ 
                                                fontFamily: font, 
                                                fontSize: '15px', 
                                                fontWeight: 700, 
                                                color: '#ffffff', 
                                                margin: '0 0 4px 0',
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#23F7DB'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
                                        >
                                            {item.title}
                                        </h4>
                                        <span style={{ 
                                            fontFamily: font, 
                                            fontSize: '11px', 
                                            fontWeight: 600, 
                                            color: 'rgba(230, 189, 181, 0.5)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>
                                            {item.region}
                                        </span>
                                    </div>
                                    {/* Trash action */}
                                    <button 
                                        onClick={() => onRemoveItem(item.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(230, 189, 181, 0.4)',
                                            cursor: 'pointer',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = '#F5401B';
                                            e.currentTarget.style.backgroundColor = 'rgba(245,64,27,0.06)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = 'rgba(230, 189, 181, 0.4)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                    </button>
                                </div>

                                {/* Custom Note/Date field */}
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="text"
                                        placeholder="Tulis rencana tanggal / catatan perjalanan..."
                                        value={item.note || ''}
                                        onChange={e => onUpdateNote(item.id, e.target.value)}
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            border: '1px solid rgba(230, 189, 181, 0.08)',
                                            borderRadius: '8px',
                                            padding: '8px 12px',
                                            color: 'rgba(230, 189, 181, 0.8)',
                                            fontFamily: font,
                                            fontSize: '12px',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'border-color 0.3s'
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(35, 247, 219, 0.4)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(230, 189, 181, 0.08)'}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sidebar Footer CTA */}
                {wishlist.length > 0 && (
                    <div style={{ 
                        padding: '24px 32px', 
                        borderTop: '1px solid rgba(230, 189, 181, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <button
                            onClick={() => {
                                alert("Rencana perjalanan Anda telah tersimpan secara otomatis. Menghubungi admin TanaOgi untuk pengaturan supir armada...");
                                onClose();
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: '#b32000',
                                color: '#ffffff',
                                border: 'none',
                                padding: '14px 20px',
                                borderRadius: '9999px',
                                fontFamily: font,
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#F5401B';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#b32000';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>hail</span>
                            Rencanakan dengan Supir
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}

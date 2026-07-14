import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * PendingPaymentModal
 * Modal untuk melunasi pesanan yang statusnya masih PENDING.
 * Dipanggil dari history dropdown di Navbar.
 */
export default function PendingPaymentModal({ booking, onClose, onPaymentSuccess }) {
    const font = "'Plus Jakarta Sans', sans-serif";
    const [loading, setLoading] = useState(false);
    const [midtransReady, setMidtransReady] = useState(false);
    const [error, setError] = useState(null);
    const [paymentDone, setPaymentDone] = useState(false);

    // Load Midtrans Snap script
    useEffect(() => {
        if (window.snap) {
            setMidtransReady(true);
            return;
        }
        let isActive = true;
        fetch('/api/v1/payments/config')
            .then(r => r.json())
            .then(config => {
                if (!isActive || !config?.enabled || window.snap) return;
                const script = document.createElement('script');
                script.src = config.snap_url;
                script.setAttribute('data-client-key', config.client_key);
                script.onload = () => isActive && setMidtransReady(true);
                document.head.appendChild(script);
            })
            .catch(() => {});
        return () => { isActive = false; };
    }, []);

    const handlePay = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`/api/v1/bookings/${booking.id}/retry-payment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.message || 'Gagal membuat ulang tagihan pembayaran.');
                setLoading(false);
                return;
            }

            const snapToken = data.snap_token;
            if (!snapToken) {
                // Total = 0, marked paid directly
                setPaymentDone(true);
                if (onPaymentSuccess) onPaymentSuccess(booking.id);
                setLoading(false);
                return;
            }

            // Mock payment (sandbox/dev environment)
            if (snapToken.startsWith('mock-snap-token-')) {
                // Auto-complete mock payment
                await fetch(`/api/v1/bookings/${booking.id}/mock-payment`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPaymentDone(true);
                if (onPaymentSuccess) onPaymentSuccess(booking.id);
                setLoading(false);
                return;
            }

            if (!window.snap || !midtransReady) {
                setError('Portal pembayaran Midtrans belum siap. Tunggu sebentar lalu coba lagi.');
                setLoading(false);
                return;
            }

            setLoading(false);
            window.snap.pay(snapToken, {
                onSuccess: () => {
                    setPaymentDone(true);
                    if (onPaymentSuccess) onPaymentSuccess(booking.id);
                },
                onPending: () => {
                    setError('Pembayaran sedang diproses. Silakan cek kembali status di riwayat pemesanan.');
                },
                onError: () => {
                    setError('Pembayaran gagal. Silakan coba lagi.');
                },
                onClose: () => {
                    // User closed without completing
                },
            });
        } catch (err) {
            setError('Terjadi kesalahan koneksi. Coba lagi.');
            setLoading(false);
        }
    };

    const formatRupiah = (n) => {
        if (!n) return 'Rp 0';
        return 'Rp ' + parseInt(n).toLocaleString('id-ID');
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const modalContent = (
        <div
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 26, 23, 0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 9000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                overflowY: 'auto',
            }}
        >
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '460px',
                maxHeight: 'calc(100vh - 40px)',
                overflowY: 'auto',
                boxShadow: '0 24px 60px -12px rgba(15, 26, 23, 0.25)',
                fontFamily: font,
                margin: 'auto',
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f1a17, #1a2e28)',
                    padding: '24px 28px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#23f7db', fontSize: '22px' }}>
                                receipt_long
                            </span>
                            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                                Selesaikan Pembayaran
                            </span>
                        </div>
                        <p style={{ color: 'rgba(228,240,237,0.6)', fontSize: '12px', margin: 0 }}>
                            Lunasi tagihan Anda untuk mengkonfirmasi perjalanan
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'rgba(255,255,255,0.7)',
                            flexShrink: 0,
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                    </button>
                </div>

                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {paymentDone ? (
                        /* ─── SUCCESS STATE ─── */
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '20px 0',
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#23f7db',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#0f1a17' }}>
                                    check_circle
                                </span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f1a17', margin: '0 0 6px' }}>
                                    Pembayaran Berhasil!
                                </p>
                                <p style={{ fontSize: '13px', color: 'rgba(15,26,23,0.6)', margin: 0 }}>
                                    Status pemesanan Anda telah diperbarui menjadi <strong>LUNAS</strong>.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                style={{
                                    marginTop: '8px',
                                    background: 'linear-gradient(135deg, #f5401b, #e03010)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '12px 32px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontFamily: font,
                                }}
                            >
                                Tutup
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* ─── BOOKING SUMMARY ─── */}
                            <div style={{
                                backgroundColor: '#e4f0ed',
                                borderRadius: '14px',
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <p style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 800, color: '#0f1a17' }}>
                                            {booking.destination?.title || booking.destination_slug || 'Destinasi Wisata'}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'rgba(15,26,23,0.55)' }}>
                                            ID Pesanan: <span style={{ fontFamily: 'monospace', fontSize: '10px' }}>{booking.id?.substring(0, 16)}…</span>
                                        </p>
                                    </div>
                                    <span style={{
                                        backgroundColor: 'rgba(245, 64, 27, 0.12)',
                                        color: '#f5401b',
                                        fontSize: '10px',
                                        fontWeight: 800,
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        letterSpacing: '0.05em',
                                        flexShrink: 0,
                                    }}>
                                        PENDING
                                    </span>
                                </div>

                                <div style={{ height: '1px', backgroundColor: 'rgba(15,26,23,0.08)' }} />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'rgba(15,26,23,0.55)' }}>Tanggal Kunjungan</span>
                                        <span style={{ fontWeight: 600, color: '#0f1a17' }}>{formatDate(booking.visit_date)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'rgba(15,26,23,0.55)' }}>Jumlah Pengunjung</span>
                                        <span style={{ fontWeight: 600, color: '#0f1a17' }}>{booking.pax_count} Pax</span>
                                    </div>
                                    {booking.has_driver && booking.driver_price > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(15,26,23,0.55)' }}>Driver Lokal</span>
                                            <span style={{ fontWeight: 600, color: '#0f1a17' }}>{formatRupiah(booking.driver_price)}</span>
                                        </div>
                                    )}
                                    {booking.include_hotel && booking.selected_hotel && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(15,26,23,0.55)' }}>Penginapan</span>
                                            <span style={{ fontWeight: 600, color: '#0f1a17', maxWidth: '180px', textAlign: 'right' }}>{booking.selected_hotel}</span>
                                        </div>
                                    )}
                                    <div style={{ height: '1px', backgroundColor: 'rgba(15,26,23,0.1)', borderTop: '1px dashed rgba(15,26,23,0.12)' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f1a17' }}>Total Tagihan (via Web)</span>
                                        <span style={{ fontSize: '16px', fontWeight: 800, color: '#f5401b' }}>
                                            {formatRupiah(booking.total_amount_web)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ─── PAYMENT INFO ─── */}
                            <div style={{
                                backgroundColor: 'rgba(35, 247, 219, 0.07)',
                                border: '1px solid rgba(35, 247, 219, 0.25)',
                                borderRadius: '12px',
                                padding: '12px 14px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#23f7db', flexShrink: 0, marginTop: '1px' }}>
                                    info
                                </span>
                                <p style={{ margin: 0, fontSize: '11.5px', color: 'rgba(15,26,23,0.7)', lineHeight: 1.5 }}>
                                    Pembayaran akan diproses aman melalui <strong>Midtrans</strong>. Anda dapat memilih metode pembayaran (Transfer Bank, QRIS, GoPay, dll) di halaman berikutnya.
                                </p>
                            </div>

                            {/* ─── ERROR MESSAGE ─── */}
                            {error && (
                                <div style={{
                                    backgroundColor: 'rgba(245, 64, 27, 0.07)',
                                    border: '1px solid rgba(245, 64, 27, 0.25)',
                                    borderRadius: '10px',
                                    padding: '10px 14px',
                                    fontSize: '12px',
                                    color: '#f5401b',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                                    {error}
                                </div>
                            )}

                            {/* ─── ACTION BUTTONS ─── */}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                                <button
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        padding: '13px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #e4f0ed',
                                        backgroundColor: 'transparent',
                                        color: '#0f1a17',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontFamily: font,
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#e4f0ed';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    Nanti Saja
                                </button>
                                <button
                                    onClick={handlePay}
                                    disabled={loading}
                                    style={{
                                        flex: 2,
                                        padding: '13px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: loading
                                            ? 'rgba(245, 64, 27, 0.5)'
                                            : 'linear-gradient(135deg, #f5401b, #e03010)',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontFamily: font,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease',
                                        boxShadow: loading ? 'none' : '0 4px 14px rgba(245, 64, 27, 0.35)',
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}>
                                                progress_activity
                                            </span>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                                credit_card
                                            </span>
                                            Bayar Sekarang
                                        </>
                                    )}
                                </button>
                            </div>

                            <style>{`
                                @keyframes spin {
                                    from { transform: rotate(0deg); }
                                    to   { transform: rotate(360deg); }
                                }
                            `}</style>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

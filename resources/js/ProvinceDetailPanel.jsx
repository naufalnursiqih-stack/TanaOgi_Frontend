import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const ProvinceDetailPanel = ({ province, onClose }) => {
  const panelRef = useRef(null);

  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // Matikan scroll saat panel terbuka

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Aktifkan scroll saat panel tertutup
    };
  }, [onClose]);

  // Klik area overlay (bukan panel) untuk menutup
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Cek apakah portal root ada, jika tidak pakai body
  const portalRoot = document.getElementById('portal-root') || document.body;

  return ReactDOM.createPortal(
    <>
      {/* Overlay Gelap */}
      <div
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer"
        style={{
          opacity: province ? 1 : 0,
          pointerEvents: province ? 'auto' : 'none',
          transition: 'opacity 300ms ease-out',
        }}
        aria-hidden="true"
      />

      {/* Panel Detail dari Kanan */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl overflow-y-auto"
        style={{
          transform: province ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        {/* Gambar Header */}
        <div className="relative w-full aspect-video">
          <img
            src={province.image}
            alt={`Destinasi unggulan di ${province.name}`}
            className="w-full h-full object-cover"
          />

          {/* Tombol Close */}
          <button
            onClick={onClose}
            aria-label={`Tutup detail ${province.name}`}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Konten Panel */}
        <div className="p-8">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: '#1a365d', fontFamily: 'serif' }}
          >
            {province.name}
          </h2>

          <p
            className="text-gray-600 leading-relaxed mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {province.description}
          </p>

          {/* Tombol CTA */}
          <button
            onClick={() => console.log('Navigate to:', province.detailUrl)}
            className="w-full py-3 px-6 border-2 border-[#1a365d] text-[#1a365d] font-semibold rounded-lg hover:bg-[#1a365d] hover:text-white transition-colors"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </>,
    portalRoot
  );
};

export default ProvinceDetailPanel;

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const RegencyDetailPanel = ({ regency, onClose }) => {
  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Klik area overlay untuk menutup
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const portalRoot = document.getElementById('portal-root') || document.body;

  return ReactDOM.createPortal(
    <>
      {/* Overlay Gelap */}
      <div
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer"
        style={{
          opacity: regency ? 1 : 0,
          pointerEvents: regency ? 'auto' : 'none',
          transition: 'opacity 300ms ease-out',
        }}
        aria-hidden="true"
      />

      {/* Panel Detail dari Kanan */}
      <div
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl overflow-y-auto"
        style={{
          transform: regency ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        {/* Gambar Header */}
        <div className="relative w-full aspect-video">
          <img
            src={regency.image}
            alt={`Destinasi unggulan di ${regency.name}`}
            className="w-full h-full object-cover"
          />

          {/* Tombol Close */}
          <button
            onClick={onClose}
            aria-label={`Tutup detail ${regency.name}`}
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
            {regency.name}
          </h2>

          <p
            className="text-gray-600 leading-relaxed mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {regency.description}
          </p>

          {/* Tags */}
          {regency.tags && regency.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {regency.tags.map((tag, index) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: index % 2 === 0 ? '#e6f5f0' : '#f3f4f6',
                    color: index % 2 === 0 ? '#0d4d3c' : '#374151',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Tombol CTA (hanya ditampilkan jika ada detailUrl) */}
          {regency.detailUrl && (
            <button
              onClick={() => console.log('Navigate to:', regency.detailUrl)}
              className="w-full py-3 px-6 border-2 border-[#1a365d] text-[#1a365d] font-semibold rounded-lg hover:bg-[#1a365d] hover:text-white transition-colors"
            >
              Pelajari Lebih Lanjut
            </button>
          )}
        </div>
      </div>
    </>,
    portalRoot
  );
};

export default RegencyDetailPanel;

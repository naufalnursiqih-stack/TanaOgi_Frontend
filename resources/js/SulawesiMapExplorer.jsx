import React, { useState } from 'react';
import { sulawesiProvinces } from './constants/sulawesiProvinces';
import ProvinceDetailPanel from './ProvinceDetailPanel';

const SulawesiMapExplorer = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  // Handle klik provinsi
  const handleProvinceClick = (province) => {
    setSelectedProvince(province);
  };

  // Handle keyboard event (Enter/Space) untuk aksesibilitas
  const handleProvinceKeyDown = (e, province) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProvinceClick(province);
    }
  };

  return (
    <div className="w-full py-12">
      {/* Bagian Background (Judul + Peta) */}
      <div
        style={{
          filter: selectedProvince ? 'brightness(0.7)' : 'brightness(1)',
          pointerEvents: selectedProvince ? 'none' : 'auto',
          opacity: selectedProvince ? 0.6 : 1,
          transition: 'filter 300ms ease-out, opacity 300ms ease-out',
        }}
      >
        {/* Judul */}
        <div className="max-w-4xl mx-auto text-center mb-10 px-4">
          <p className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            Temukan destinasi dan atraksi terbaik
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ color: '#b32000', fontFamily: 'serif' }}
          >
            Sulawesi Menanti
          </h1>
        </div>

        {/* SVG Peta Container */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border border-blue-200 shadow-lg overflow-hidden">
            <svg
              viewBox="180 60 600 500"
              className="w-full h-auto max-h-[650px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/*
                ==========================================================================
                GANTI dengan PATH SVG AKURAT 6 PROVINSI SULAWESI DI BAWAH INI!
                ==========================================================================
              */}

              {/* 1. Sulawesi Utara (Sulut) */}
              <g
                id="sulut"
                data-name="Sulawesi Utara"
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => handleProvinceClick(sulawesiProvinces[0])}
                onMouseEnter={() => setHoveredProvince('sulut')}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleProvinceKeyDown(e, sulawesiProvinces[0])}
                aria-label="Klik untuk melihat detail Sulawesi Utara"
              >
                <path
                  d="M400,100 L460,80 L500,110 L490,160 L430,180 L380,150 Z"
                  fill={hoveredProvince === 'sulut' ? '#64748b' : '#9aa8c4'}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  transition="fill 300ms ease"
                />
                <text
                  x="430"
                  y="135"
                  textAnchor="middle"
                  fill={hoveredProvince === 'sulut' ? '#1e293b' : '#475569'}
                  fontFamily="serif"
                  fontSize="13"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  Sulut
                </text>
              </g>

              {/* 2. Gorontalo */}
              <g
                id="gorontalo"
                data-name="Gorontalo"
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => handleProvinceClick(sulawesiProvinces[1])}
                onMouseEnter={() => setHoveredProvince('gorontalo')}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleProvinceKeyDown(e, sulawesiProvinces[1])}
                aria-label="Klik untuk melihat detail Gorontalo"
              >
                <path
                  d="M360,140 L400,120 L430,150 L420,190 L370,200 L340,170 Z"
                  fill={hoveredProvince === 'gorontalo' ? '#64748b' : '#9aa8c4'}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  transition="fill 300ms ease"
                />
                <text
                  x="385"
                  y="160"
                  textAnchor="middle"
                  fill={hoveredProvince === 'gorontalo' ? '#1e293b' : '#475569'}
                  fontFamily="serif"
                  fontSize="12"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  Gorontalo
                </text>
              </g>

              {/* 3. Sulawesi Tengah (Sulteng) */}
              <g
                id="sulteng"
                data-name="Sulawesi Tengah"
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => handleProvinceClick(sulawesiProvinces[2])}
                onMouseEnter={() => setHoveredProvince('sulteng')}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleProvinceKeyDown(e, sulawesiProvinces[2])}
                aria-label="Klik untuk melihat detail Sulawesi Tengah"
              >
                <path
                  d="M340,210 L400,190 L450,220 L440,280 L380,300 L320,270 Z"
                  fill={hoveredProvince === 'sulteng' ? '#64748b' : '#9aa8c4'}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  transition="fill 300ms ease"
                />
                <text
                  x="380"
                  y="250"
                  textAnchor="middle"
                  fill={hoveredProvince === 'sulteng' ? '#1e293b' : '#475569'}
                  fontFamily="serif"
                  fontSize="13"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  Sulteng
                </text>
              </g>

              {/* 4. Sulawesi Barat (Sulbar) */}
              <g
                id="sulbar"
                data-name="Sulawesi Barat"
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => handleProvinceClick(sulawesiProvinces[3])}
                onMouseEnter={() => setHoveredProvince('sulbar')}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleProvinceKeyDown(e, sulawesiProvinces[3])}
                aria-label="Klik untuk melihat detail Sulawesi Barat"
              >
                <path
                  d="M280,280 L330,260 L360,290 L350,340 L300,350 L260,320 Z"
                  fill={hoveredProvince === 'sulbar' ? '#64748b' : '#9aa8c4'}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  transition="fill 300ms ease"
                />
                <text
                  x="310"
                  y="308"
                  textAnchor="middle"
                  fill={hoveredProvince === 'sulbar' ? '#1e293b' : '#475569'}
                  fontFamily="serif"
                  fontSize="13"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  Sulbar
                </text>
              </g>

              {/* 5. Sulawesi Selatan (Sulsel) */}
              <g
                id="sulsel"
                data-name="Sulawesi Selatan"
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => handleProvinceClick(sulawesiProvinces[4])}
                onMouseEnter={() => setHoveredProvince('sulsel')}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleProvinceKeyDown(e, sulawesiProvinces[4])}
                aria-label="Klik untuk melihat detail Sulawesi Selatan"
              >
                <path
                  d="M360,360 L420,340 L460,370 L450,430 L390,450 L330,420 Z"
                  fill={hoveredProvince === 'sulsel' ? '#64748b' : '#9aa8c4'}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  transition="fill 300ms ease"
                />
                <text
                  x="395"
                  y="395"
                  textAnchor="middle"
                  fill={hoveredProvince === 'sulsel' ? '#1e293b' : '#475569'}
                  fontFamily="serif"
                  fontSize="13"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  Sulsel
                </text>
              </g>

              {/* 6. Sulawesi Tenggara (Sultra) */}
              <g
                id="sultra"
                data-name="Sulawesi Tenggara"
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => handleProvinceClick(sulawesiProvinces[5])}
                onMouseEnter={() => setHoveredProvince('sultra')}
                onMouseLeave={() => setHoveredProvince(null)}
                onKeyDown={(e) => handleProvinceKeyDown(e, sulawesiProvinces[5])}
                aria-label="Klik untuk melihat detail Sulawesi Tenggara"
              >
                <path
                  d="M480,320 L540,300 L580,330 L570,390 L510,410 L460,380 Z"
                  fill={hoveredProvince === 'sultra' ? '#64748b' : '#9aa8c4'}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  transition="fill 300ms ease"
                />
                <text
                  x="520"
                  y="355"
                  textAnchor="middle"
                  fill={hoveredProvince === 'sultra' ? '#1e293b' : '#475569'}
                  fontFamily="serif"
                  fontSize="13"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  Sultra
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Render Panel Detail jika provinsi dipilih */}
      {selectedProvince && (
        <ProvinceDetailPanel
          province={selectedProvince}
          onClose={() => setSelectedProvince(null)}
        />
      )}
    </div>
  );
};

export default SulawesiMapExplorer;

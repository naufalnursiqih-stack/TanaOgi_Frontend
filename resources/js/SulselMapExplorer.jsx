import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { sulselRegencies } from './constants/sulselRegencies';
import RegencyDetailPanel from './RegencyDetailPanel';
// Import file TopoJSON langsung
import sulselTopoJson from '../data/sulsel-regencies.json';

// Fungsi normalisasi nama untuk pencocokan (case-insensitive, hilangkan spasi/karakter spesial)
const normalizeRegencyName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // ganti spasi dengan dash
    .replace(/kabupaten|kota|dan|kepulauan/g, '') // hapus kata umum
    .replace(/-+/g, '-') // ganti multiple dash dengan satu
    .replace(/^-|-$/g, '') // hapus dash di awal/akhir
    .trim();
};

// Data placeholder fallback untuk kabupaten yang belum diisi di sulselRegencies
const getPlaceholderData = (geoName) => {
  return {
    name: geoName || 'Kabupaten/Kota',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=450&fit=crop',
    description: 'Detail destinasi segera hadir!',
    tags: [],
    detailUrl: null,
  };
};

const SulselMapExplorer = () => {
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [hoveredRegency, setHoveredRegency] = useState(null);

  // PRINT SELURUH TOPOJSON OBJECT KE CONSOLE!
  console.log('=== SELURUH TOPOJSON OBJECT ===', sulselTopoJson);
  console.log('=== KEY DI TOPOJSON ===', Object.keys(sulselTopoJson));
  if (sulselTopoJson.objects) {
    console.log('=== OBJECTS DI TOPOJSON ===', sulselTopoJson.objects);
    console.log('=== KEY DI OBJECTS ===', Object.keys(sulselTopoJson.objects));
  }

  // Handle klik kabupaten/kota
  const handleRegencyClick = (geo) => {
    // ==========================================================================
    // PRINT STRUKTUR PROPERTIES DI CONSOLE!
    // Buka DevTools (F12) -> Tab Console untuk melihat!
    // ==========================================================================
    console.log('=== SELURUH geo.properties ===', geo.properties);
    console.log('=== List semua key properties ===', Object.keys(geo.properties));

    // ==========================================================================
    // Coba beberapa kemungkinan key nama kabupaten/kota
    // ==========================================================================
    const geoName = 
      geo.properties.NAME_2 || 
      geo.properties.KAB_KOTA || 
      geo.properties.NAMA_KAB || 
      geo.properties.NAME || 
      geo.properties.NAMOBJ ||
      geo.properties.KOTA_KAB ||
      geo.properties.KABUPATEN ||
      'Tidak Diketahui';

    console.log('=== Nama Kabupaten/Kota yang didapat ===', geoName);
    
    const normalizedGeoName = normalizeRegencyName(geoName);
    console.log('=== Nama yang sudah dinormalisasi ===', normalizedGeoName);

    // Cari data di sulselRegencies
    const matchedData = sulselRegencies[normalizedGeoName];

    // Jika ditemukan, gunakan data asli. Jika tidak, gunakan placeholder.
    const regencyData = matchedData || getPlaceholderData(geoName);
    setSelectedRegency(regencyData);
  };

  return (
    <div className="w-full py-12">
      {/* Bagian Background (Judul + Peta) */}
      <div
        style={{
          filter: selectedRegency ? 'brightness(0.7)' : 'brightness(1)',
          pointerEvents: selectedRegency ? 'none' : 'auto',
          opacity: selectedRegency ? 0.6 : 1,
          transition: 'filter 300ms ease-out, opacity 300ms ease-out',
        }}
      >
        {/* Judul dengan garis horizontal */}
        <div className="max-w-5xl mx-auto text-center mb-10 px-4">
          <p className="text-sm font-semibold text-gray-500 mb-2 tracking-[0.2em] uppercase">
            Temukan destinasi dan atraksi terbaik
          </p>

          <div className="flex items-center justify-center gap-6">
            {/* Garis kiri */}
            <div className="flex-1 max-w-xs h-[2px] bg-gradient-to-r from-transparent to-[#1a365d]"></div>

            <h1
              className="text-3xl md:text-4xl font-bold shrink-0"
              style={{ color: '#b32000', fontFamily: 'serif' }}
            >
              Sulawesi Selatan Menanti
            </h1>

            {/* Garis kanan */}
            <div className="flex-1 max-w-xs h-[2px] bg-gradient-to-l from-transparent to-[#1a365d]"></div>
          </div>
        </div>

        {/* Container Peta dengan aspect ratio */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border border-blue-200 shadow-lg overflow-hidden aspect-[4/3]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [120.0, -3.5], // Fokus ke Sulawesi Selatan
                scale: 7000,          // Zoom level (sesuaikan 6000-10000)
              }}
              style={{ width: '100%', height: '100%' }}
            >
              {/* Gunakan imported TopoJSON object, bukan URL string */}
              <Geographies geography={sulselTopoJson}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const geoName = 
                      geo.properties.NAME_2 || 
                      geo.properties.KAB_KOTA || 
                      geo.properties.NAMA_KAB || 
                      geo.properties.NAME || 
                      geo.properties.NAMOBJ ||
                      'Tidak Diketahui';
                    
                    const normalizedGeoName = normalizeRegencyName(geoName);

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredRegency(normalizedGeoName)}
                        onMouseLeave={() => setHoveredRegency(null)}
                        onClick={() => handleRegencyClick(geo)}
                        // Style INLINE sesuai request
                        style={{
                          default: { 
                            fill: "#9aa8c4", 
                            stroke: "#FFFFFF", 
                            strokeWidth: 0.5, 
                            outline: "none" 
                          },
                          hover: { 
                            fill: "#1a2b5c", 
                            stroke: "#FFFFFF", 
                            strokeWidth: 0.5, 
                            outline: "none" 
                          },
                          pressed: { 
                            fill: "#0d2547", 
                            stroke: "#FFFFFF", 
                            strokeWidth: 0.5, 
                            outline: "none" 
                          },
                        }}
                        aria-label={`Klik untuk melihat detail ${geoName}`}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>
      </div>

      {/* Render Panel Detail jika kabupaten/kota dipilih */}
      {selectedRegency && (
        <RegencyDetailPanel
          regency={selectedRegency}
          onClose={() => setSelectedRegency(null)}
        />
      )}
    </div>
  );
};

export default SulselMapExplorer;

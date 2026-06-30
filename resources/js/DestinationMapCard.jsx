import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { destinations } from './constants/destinations';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons
const originIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const formatDistance = (distanceInMeters) => {
  if (!distanceInMeters) return 'Estimasi jarak tidak tersedia';
  return `${(distanceInMeters / 1000).toFixed(1)} km`;
};

const formatDuration = (durationInSeconds) => {
  if (!durationInSeconds) return 'Estimasi waktu tidak tersedia';

  const totalMinutes = Math.round(durationInSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${totalMinutes} menit`;
  }

  if (minutes === 0) {
    return `${hours} jam`;
  }

  return `${hours} jam ${minutes} menit`;
};

// Component to keep the route visible when destination changes
const MapViewUpdater = ({ positions, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, {
        padding: [40, 40],
      });
      return;
    }

    if (positions.length === 1) {
      map.setView(positions[0], zoom);
    }
  }, [map, positions, zoom]);

  return null;
};

const DestinationMapCard = ({ onNavigateDetail }) => {
  const [selectedDestId, setSelectedDestId] = useState(destinations[0].id);
  const [activeTag, setActiveTag] = useState(null);
  const [routeData, setRouteData] = useState({
    positions: [],
    distanceText: '',
    durationText: '',
    loading: true,
    error: '',
  });
  
  const filteredDestinations = useMemo(() => {
    if (!activeTag) return destinations;

    return destinations.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
    );
  }, [activeTag]);

  // Get current destination
  const destination = useMemo(() => {
    return filteredDestinations.find(d => d.id === selectedDestId) || filteredDestinations[0] || destinations[0];
  }, [filteredDestinations, selectedDestId]);

  useEffect(() => {
    const stillExists = filteredDestinations.some((item) => item.id === selectedDestId);
    if (!stillExists && filteredDestinations.length > 0) {
      setSelectedDestId(filteredDestinations[0].id);
    }
  }, [filteredDestinations, selectedDestId]);

  const fallbackRoutePositions = [
    [destination.origin.lat, destination.origin.lng],
    [destination.coordinates.lat, destination.coordinates.lng]
  ];

  const routePositions = routeData.positions.length > 1 ? routeData.positions : fallbackRoutePositions;

  useEffect(() => {
    let isCancelled = false;

    const fetchRoute = async () => {
      setRouteData({
        positions: [],
        distanceText: '',
        durationText: '',
        loading: true,
        error: '',
      });

      try {
        const origin = `${destination.origin.lng},${destination.origin.lat}`;
        const dest = `${destination.coordinates.lng},${destination.coordinates.lat}`;
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${origin};${dest}?overview=full&geometries=geojson`
        );

        if (!response.ok) {
          throw new Error('Gagal mengambil data rute.');
        }

        const data = await response.json();
        const route = data?.routes?.[0];

        if (!route) {
          throw new Error('Rute tidak ditemukan.');
        }

        const positions = (route.geometry?.coordinates || []).map(([lng, lat]) => [lat, lng]);

        if (!isCancelled) {
          setRouteData({
            positions: positions.length > 1 ? positions : fallbackRoutePositions,
            distanceText: formatDistance(route.distance),
            durationText: formatDuration(route.duration),
            loading: false,
            error: '',
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setRouteData({
            positions: fallbackRoutePositions,
            distanceText: 'Estimasi belum tersedia',
            durationText: 'Cek koneksi',
            loading: false,
            error: error.message,
          });
        }
      }
    };

    fetchRoute();

    return () => {
      isCancelled = true;
    };
  }, [destination]);

  return (
    <div style={{ width: '100%', maxWidth: '100%', position: 'relative', zIndex: 1 }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: '20px',
        color: '#0d4d3c',
        fontFamily: 'serif',
        letterSpacing: '-0.02em'
      }}>
        Jelajahi destinasi anda
      </h2>

      {/* Destination Selector */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto 28px auto',
        padding: '0 16px'
      }}>
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 600,
          color: '#374151',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Pilih Destinasi:
        </label>
        <select
          value={selectedDestId}
          onChange={(e) => setSelectedDestId(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '14px',
            border: '2px solid #d1fae5',
            background: 'white',
            fontSize: '16px',
            fontWeight: 500,
            color: '#065f46',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.25s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%230d4d3c' d='M3.5 5.5L7 9l3.5-3.5H3.5z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 18px center',
            paddingRight: '48px'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#0d9488';
            e.target.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#d1fae5';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
          }}
        >
          {filteredDestinations.map(dest => (
            <option key={dest.id} value={dest.id}>
              {dest.name}
            </option>
          ))}
        </select>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            {activeTag
              ? `Menampilkan ${filteredDestinations.length} destinasi untuk tag "${activeTag}"`
              : `Menampilkan ${destinations.length} destinasi Sulawesi Selatan`}
          </p>
          {activeTag && (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#0d4d3c',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0
              }}
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.03)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Map Section */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', zIndex: 1 }}>
          <MapContainer
            center={fallbackRoutePositions[0]}
            zoom={9}
            style={{ width: '100%', height: '100%', zIndex: 1 }}
          >
            <MapViewUpdater positions={routePositions} zoom={9} />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Polyline route */}
            <Polyline
              positions={routePositions}
              color="#0ea5e9"
              weight={5}
              opacity={0.8}
            />

            {/* Origin Marker */}
            <Marker position={[destination.origin.lat, destination.origin.lng]} icon={originIcon}>
              <Popup>
                <strong>{destination.origin.name}</strong><br />
                Titik Awal
              </Popup>
            </Marker>

            {/* Destination Marker */}
            <Marker position={[destination.coordinates.lat, destination.coordinates.lng]} icon={destinationIcon}>
              <Popup>
                <strong>{destination.name}</strong><br />
                Tujuan Wisata
              </Popup>
            </Marker>
          </MapContainer>

          {/* Floating Badge - Top Left */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1000,
            border: '1px solid rgba(255,255,255,0.8)'
          }}>
            <svg style={{ width: '22px', height: '22px', color: '#059669' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <div>
              <p style={{ fontWeight: 700, color: '#065f46', fontSize: '14px', margin: 0 }}>Jelajahi {destination.name}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>{destination.origin.name}</p>
            {routeData.error && (
              <p style={{ fontSize: '10px', color: '#b45309', margin: '4px 0 0 0' }}>
                Menggunakan fallback rute sementara
              </p>
            )}
            </div>
          </div>

          {/* Floating Info Box - Center Top */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(10px)',
            borderRadius: '9999px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000,
            border: '1px solid rgba(255,255,255,0.8)'
          }}>
            <svg style={{ width: '18px', height: '18px', color: '#0369a1' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h2a2 2 0 012 2v6a2 2 0 01-2 2h-1.05a2.5 2.5 0 00-4.9 0H8a1 1 0 01-1-1v-1h7V7z"/>
            </svg>
            <p style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', margin: 0 }}>
              {routeData.loading
                ? 'Menghitung rute...'
                : `${routeData.durationText} • ${routeData.distanceText}`}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ padding: '28px 28px 32px 28px' }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#131e1b',
            marginBottom: '10px',
            fontFamily: 'serif',
            letterSpacing: '-0.01em'
          }}>
            {destination.name}, Sulawesi Selatan
          </h3>

          <p style={{
            color: '#4f5f57',
            marginBottom: '22px',
            lineHeight: 1.7,
            fontSize: '15px'
          }}>
            {destination.description}
          </p>

          {/* Tags Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '28px'
          }}>
            {destination.tags.map((tag, index) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((currentTag) => (currentTag === tag ? null : tag))}
                aria-pressed={activeTag === tag}
                title={`Filter destinasi dengan tag ${tag}`}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: activeTag === tag
                    ? '#0d4d3c'
                    : index % 2 === 0
                      ? '#e6f5f0'
                      : '#f3f4f6',
                  color: activeTag === tag
                    ? '#ffffff'
                    : index % 2 === 0
                      ? '#0d4d3c'
                      : '#374151',
                  letterSpacing: '0.01em',
                  border: activeTag === tag ? '1px solid #0d4d3c' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() =>
              onNavigateDetail &&
              onNavigateDetail({
                ...destination,
                routeInfo: {
                  distanceText: routeData.distanceText,
                  durationText: routeData.durationText,
                },
              })
            }
            style={{
              width: '100%',
              background: '#0d4d3c',
              color: 'white',
              fontWeight: 700,
              padding: '15px 24px',
              borderRadius: '14px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 12px 24px rgba(13, 77, 60, 0.25)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#0a3d30';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 16px 32px rgba(13, 77, 60, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#0d4d3c';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 12px 24px rgba(13, 77, 60, 0.25)';
            }}
          >
            Mulai Jelajah
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationMapCard;

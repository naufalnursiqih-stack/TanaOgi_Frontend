import { useState, useEffect, useCallback } from 'react';

export const useDirections = (origin, destination) => {
  const [directions, setDirections] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDirections = useCallback(async () => {
    if (!origin || !destination) return;

    setLoading(true);
    setError(null);

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      if (results.routes.length > 0) {
        const route = results.routes[0];
        const leg = route.legs[0];
        setDirections(results);
        setDuration(leg.duration.text);
        setDistance(leg.distance.text);
      }
    } catch (err) {
      console.error('Error fetching directions:', err);
      setError(err.message || 'Gagal memuat rute');
    } finally {
      setLoading(false);
    }
  }, [origin, destination]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      fetchDirections();
    }
  }, [fetchDirections]);

  return {
    directions,
    duration,
    distance,
    loading,
    error,
    refetch: fetchDirections,
  };
};

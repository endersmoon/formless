import { useEffect, useRef } from 'react';

/**
 * A component that displays a Google Map preview for a location
 * @param {Object} props
 * @param {string} props.location - The location to display on the map
 * @param {Object} props.coordinates - Optional lat/lng coordinates
 * @param {number} props.height - The height of the map container
 */
export default function MapPreview({ location, coordinates, height = 200 }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Skip if no map div or no location/coordinates
    if (!mapRef.current || (!location && !coordinates)) return;

    const initMap = () => {
      // Default to a generic position if no coordinates provided
      const position = coordinates || { lat: 0, lng: 0 };
      
      // Create map if it doesn't exist
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: position,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });
      }

      // Create or update marker
      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          position,
          map: mapInstanceRef.current,
          animation: window.google.maps.Animation.DROP
        });
      } else {
        markerRef.current.setPosition(position);
      }

      // Center map on marker
      mapInstanceRef.current.setCenter(position);
    };

    // If we have coordinates, just initialize the map
    if (coordinates) {
      initMap();
      return;
    }

    // If we only have a location string, geocode it
    if (location && window.google?.maps?.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          coordinates = results[0].geometry.location.toJSON();
          initMap();
        }
      });
    }
  }, [location, coordinates]);

  return (
    <div 
      ref={mapRef} 
      className="w-full rounded-md border overflow-hidden mt-2" 
      style={{ height: `${height}px` }}
      aria-label={`Map showing location: ${location || 'None selected'}`}
    />
  );
} 
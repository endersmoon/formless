import { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SuggestionsList from './SuggestionsList';
import MapPreview from './MapPreview';

/**
 * A form field component for location search using Google Places API
 * @param {Object} props
 * @param {Object} props.form - The react-hook-form instance
 * @param {string} props.name - The field name
 * @param {string} props.label - The label for the field
 * @param {Array} props.suggestions - The array of quick location suggestions
 * @param {string} props.placeholder - The placeholder text for the input
 * @param {string} props.coordinatesFieldName - Optional name of form field to store coordinates
 */
export default function LocationFormField({
  form,
  name,
  label,
  suggestions = [],
  placeholder = "Enter a location",
  coordinatesFieldName,
}) {
  const [loaded, setLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Handle Google Places API script loading
  useEffect(() => {
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Check if the script is already being loaded
    const existingScript = document.getElementById('google-places-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-places-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        setLoaded(true);
        initAutocomplete();
      };
      document.head.appendChild(script);
    }
  }, []);

  // Show map when a location is entered
  useEffect(() => {
    const location = form.getValues(name);
    if (location && location.trim().length > 0) {
      setShowMap(true);
    }
  }, [form, name]);

  // Initialize Google Places Autocomplete
  const initAutocomplete = () => {
    if (!inputRef.current) return;
    
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      fields: ['address_components', 'formatted_address', 'geometry', 'name']
    });

    autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
  };

  // Handle when a place is selected from the autocomplete
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place?.formatted_address) {
      form.setValue(name, place.formatted_address);
      form.trigger(name);
      
      // Store coordinates and show map
      if (place.geometry?.location) {
        const latLng = place.geometry.location.toJSON();
        setCoordinates(latLng);
        
        // Save coordinates to form data if coordinatesFieldName is provided
        if (coordinatesFieldName) {
          form.setValue(coordinatesFieldName, latLng);
        }
      }
      setShowMap(true);
    }
  };

  // Handle selection from the suggestion buttons
  const handleSuggestionSelect = (suggestion) => {
    form.setValue(name, suggestion);
    form.trigger(name);
    setShowMap(true);
    
    // If we have a suggestion without exact coordinates, clear coordinates
    // so the MapPreview will geocode the location
    setCoordinates(null);
    
    // Clear coordinates in form data
    if (coordinatesFieldName) {
      form.setValue(coordinatesFieldName, null);
      
      // Geocode the location to get coordinates
      if (window.google?.maps?.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: suggestion }, (results, status) => {
          if (status === 'OK' && results[0]?.geometry?.location) {
            const latLng = results[0].geometry.location.toJSON();
            setCoordinates(latLng);
            form.setValue(coordinatesFieldName, latLng);
          }
        });
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              ref={inputRef}
              placeholder={placeholder}
              autoComplete="off"
            />
          </FormControl>
          
          {suggestions.length > 0 && (
            <SuggestionsList 
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
            />
          )}
          
          {showMap && field.value && (
            <MapPreview 
              location={field.value} 
              coordinates={coordinates}
            />
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 
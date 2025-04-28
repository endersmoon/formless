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

/**
 * A form field component for location search using Google Places API
 * @param {Object} props
 * @param {Object} props.form - The react-hook-form instance
 * @param {string} props.name - The field name
 * @param {string} props.label - The label for the field
 * @param {Array} props.suggestions - The array of quick location suggestions
 * @param {string} props.placeholder - The placeholder text for the input
 */
export default function LocationFormField({
  form,
  name,
  label,
  suggestions = [],
  placeholder = "Enter a location",
}) {
  const [loaded, setLoaded] = useState(false);
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
    }
  };

  // Handle selection from the suggestion buttons
  const handleSuggestionSelect = (suggestion) => {
    form.setValue(name, suggestion);
    form.trigger(name);
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
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 
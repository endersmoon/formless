import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LocationField = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  useEffect(() => {
    // Initialize Google Maps services
    if (window.google) {
      setAutocompleteService(new window.google.maps.places.AutocompleteService());
      setPlacesService(new window.google.maps.places.PlacesService(document.createElement('div')));
    }
  }, []);

  const handleInputChange = async (value) => {
    setInputValue(value);
    setShowPredictions(true);

    if (!value || !autocompleteService) {
      setPredictions([]);
      return;
    }

    try {
      const response = await autocompleteService.getPlacePredictions({
        input: value,
        types: ['(cities)'],
        componentRestrictions: { country: 'in' } // Restrict to India, change as needed
      });

      setPredictions(response.predictions || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
  };

  const handleSelect = (prediction) => {
    if (!placesService) return;

    placesService.getDetails(
      {
        placeId: prediction.place_id,
        fields: ['address_components', 'formatted_address']
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const addressComponents = place.address_components;
          const city = addressComponents.find(
            component => component.types.includes('locality')
          )?.long_name;
          const locality = addressComponents.find(
            component => component.types.includes('sublocality_level_1')
          )?.long_name;

          const locationData = {
            formattedAddress: place.formatted_address,
            city,
            locality,
            placeId: prediction.place_id
          };

          onChange(locationData);
          setInputValue(place.formatted_address);
          setShowPredictions(false);
        }
      }
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="relative">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Enter city and locality..."
            value={inputValue}
            onValueChange={handleInputChange}
            className="h-9"
          />
          {showPredictions && predictions.length > 0 && (
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    value={prediction.description}
                    onSelect={() => handleSelect(prediction)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        inputValue === prediction.description ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {prediction.description}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  );
}; 
import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ComboboxTrigger from './ComboboxTrigger';
import ComboboxDropdown from './ComboboxDropdown';
import SuggestionsList from './SuggestionsList';

/**
 * A reusable form field component for job-related dropdowns
 * @param {Object} props
 * @param {Object} props.form - The react-hook-form instance
 * @param {string} props.name - The field name
 * @param {string} props.label - The label for the field
 * @param {Array} props.items - The array of options for the dropdown
 * @param {Array} props.suggestions - The array of quick suggestions
 * @param {string} props.placeholder - The placeholder text for the dropdown
 * @param {string} props.emptyText - Text to display when no items match the search
 * @param {string} props.searchPlaceholder - Placeholder text for the search input
 * @param {Function} props.onSelect - Called when an item is selected (receives the selected value)
 * @param {Function} props.getDisplayValue - Function to get the display value from an item
 * @param {Function} props.getSearchValue - Function to get the search value from an item
 * @param {Function} props.getItemId - Function to get the unique id from an item
 */
export default function JobFormField({
  form,
  name,
  label,
  items,
  suggestions = [],
  placeholder = "Select an option",
  emptyText = "No results found.",
  searchPlaceholder = "Search...",
  onSelect,
  getDisplayValue = (item) => item,
  getSearchValue = (item) => item,
  getItemId = (item) => item,
}) {
  const [open, setOpen] = useState(false);

  // Handle selection from the dropdown
  const handleSelect = (item) => {
    const value = getDisplayValue(item);
    form.setValue(name, value);
    setOpen(false);
    form.trigger(name);
    
    if (onSelect) {
      onSelect(value);
    }
  };

  // Handle selection from the suggestion buttons
  const handleSuggestionSelect = (suggestion) => {
    form.setValue(name, suggestion);
    form.trigger(name);
    
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <ComboboxTrigger
                  value={field.value}
                  placeholder={placeholder}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <ComboboxDropdown
                items={items}
                value={field.value}
                onSelect={handleSelect}
                emptyText={emptyText}
                searchPlaceholder={searchPlaceholder}
                getDisplayValue={getDisplayValue}
                getSearchValue={getSearchValue}
                getItemId={getItemId}
              />
            </PopoverContent>
          </Popover>
          
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
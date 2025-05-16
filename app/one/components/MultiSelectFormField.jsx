import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import SuggestionsList from './SuggestionsList';

/**
 * A form field component for multiple selection with checkboxes
 * @param {Object} props
 * @param {Object} props.form - The react-hook-form instance
 * @param {string} props.name - The field name
 * @param {string} props.label - The label for the field
 * @param {Array} props.options - The array of options for selection
 * @param {Array} props.suggestions - The array of quick suggestions
 */
export default function MultiSelectFormField({
  form,
  name,
  label,
  options = [],
  suggestions = [],
}) {
  // Handle checkbox change
  const handleCheckboxChange = (option, checked) => {
    const currentValue = form.getValues(name) || [];
    let newValue;
    
    if (checked) {
      newValue = [...currentValue, option];
    } else {
      newValue = currentValue.filter(item => item !== option);
    }
    
    form.setValue(name, newValue);
    form.trigger(name);
  };

  // Handle selection from the suggestion buttons
  const handleSuggestionSelect = (suggestion) => {
    const currentValue = form.getValues(name) || [];
    if (!currentValue.includes(suggestion)) {
      const newValue = [...currentValue, suggestion];
      form.setValue(name, newValue);
      form.trigger(name);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${name}-${option}`}
                  checked={(field.value || []).includes(option)}
                  onCheckedChange={(checked) => handleCheckboxChange(option, checked)}
                />
                <label
                  htmlFor={`${name}-${option}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          
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
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
 * A form field component for number inputs with suggestions
 * @param {Object} props
 * @param {Object} props.form - The react-hook-form instance
 * @param {string} props.name - The field name
 * @param {string} props.label - The label for the field
 * @param {Array<number>} props.suggestions - The array of quick suggestions
 * @param {string} props.placeholder - The placeholder text for the input
 */
export default function NumberFormField({
  form,
  name,
  label,
  suggestions = [],
  placeholder = '1',
}) {
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
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='number'
              placeholder={placeholder}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
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
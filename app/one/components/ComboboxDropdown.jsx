import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem,
  CommandList 
} from '@/components/ui/command';

/**
 * A reusable combobox dropdown component
 * @param {Object} props
 * @param {Array} props.items - The array of items to display
 * @param {string} props.value - The current selected value
 * @param {Function} props.onSelect - Function called when an item is selected
 * @param {string} props.emptyText - Text to display when no items match the search
 * @param {string} props.searchPlaceholder - Placeholder text for the search input
 * @param {Function} props.getDisplayValue - Function to get the display value from an item
 * @param {Function} props.getSearchValue - Function to get the search value from an item
 * @param {Function} props.getItemId - Function to get the unique id from an item
 */
export default function ComboboxDropdown({
  items,
  value,
  onSelect,
  emptyText = "No results found.",
  searchPlaceholder = "Search...",
  getDisplayValue = (item) => item,
  getSearchValue = (item) => item,
  getItemId = (item) => item
}) {
  return (
    <Command>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup className='max-h-60 overflow-y-auto'>
          {items.map((item) => (
            <CommandItem
              value={getSearchValue(item)}
              key={getItemId(item)}
              onSelect={() => onSelect(item)}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === getDisplayValue(item) ? 'opacity-100' : 'opacity-0'
                )}
              />
              {getDisplayValue(item)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
} 
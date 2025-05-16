import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A reusable trigger for combobox/dropdown components
 * @param {Object} props
 * @param {string} props.value - The selected value to display
 * @param {string} props.placeholder - Placeholder text when no value is selected
 */
export default function ComboboxTrigger({ value, placeholder }) {
  return (
    <Button
      variant='outline'
      role='combobox'
      className={cn(
        'w-full justify-between',
        !value && 'text-muted-foreground'
      )}>
      {value || placeholder}
      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
    </Button>
  );
} 
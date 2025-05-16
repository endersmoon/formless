import { Button } from '@/components/ui/button';

/**
 * A suggestion button used for quick selections in forms
 * @param {Object} props
 * @param {string|number} props.suggestion - The suggestion text/value to display
 * @param {Function} props.onClick - The function to call when clicked
 */
export default function SuggestionButton({ suggestion, onClick }) {
  return (
    <Button
      key={suggestion}
      type="button"
      variant="outline"
      size="sm"
      className="rounded-full text-xs px-3 py-1 h-auto"
      onClick={onClick}
    >
      {suggestion}
    </Button>
  );
} 
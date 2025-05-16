import SuggestionButton from './SuggestionButton';

/**
 * Renders a list of suggestion buttons
 * @param {Object} props
 * @param {Array<string|number>} props.suggestions - The list of suggestions to display
 * @param {Function} props.onSelect - The function to call when a suggestion is selected
 */
export default function SuggestionsList({ suggestions, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {suggestions.map((suggestion) => (
        <SuggestionButton
          key={suggestion}
          suggestion={suggestion}
          onClick={() => onSelect(suggestion)}
        />
      ))}
    </div>
  );
} 
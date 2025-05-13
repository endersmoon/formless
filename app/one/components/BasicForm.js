import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobTitleSearch } from '../hooks/useJobTitleSearch';

export const BasicForm = () => {
  const {
    title,
    setTitle,
    category,
    setCategory,
    filteredTitles,
    showTitleDropdown,
    setShowTitleDropdown,
    handleTitleSelect,
    categories
  } = useJobTitleSearch();

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      
      <div className="space-y-6">
        {/* Job Title Field */}
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <div className="relative">
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Search for a job title..." 
                value={title}
                onValueChange={(value) => {
                  setTitle(value);
                  setShowTitleDropdown(true);
                }}
                className="h-9"
              />
              {title && (
                <CommandList>
                  <CommandEmpty>No job title found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    {filteredTitles.map((jobTitle) => (
                      <CommandItem
                        key={jobTitle}
                        value={jobTitle}
                        onSelect={() => handleTitleSelect(jobTitle)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            title === jobTitle ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {jobTitle}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
          </div>
        </div>

        {/* Job Category Field */}
        <div className="space-y-2">
          <Label htmlFor="job-category">Job Category</Label>
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}; 
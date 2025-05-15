import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

        {/* Number of Openings */}
        <div className="space-y-2">
          <Label htmlFor="openings">Number of Openings</Label>
          <Input
            type="number"
            id="openings"
            placeholder="Enter number of positions"
            min="1"
          />
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label htmlFor="job-type">Job Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Work Location */}
        <div className="space-y-2">
          <Label htmlFor="work-location">Work Location</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select work location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            placeholder="Enter city"
          />
        </div>

        {/* Locality */}
        <div className="space-y-2">
          <Label htmlFor="locality">Locality</Label>
          <Input
            type="text"
            id="locality"
            placeholder="Enter locality/area"
          />
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <Label htmlFor="salary">Salary Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              id="salary-min"
              placeholder="Min"
            />
            <Input
              type="number"
              id="salary-max"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select benefits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health-insurance">Health Insurance</SelectItem>
              <SelectItem value="dental-insurance">Dental Insurance</SelectItem>
              <SelectItem value="vision-insurance">Vision Insurance</SelectItem>
              <SelectItem value="life-insurance">Life Insurance</SelectItem>
              <SelectItem value="401k">401(k)</SelectItem>
              <SelectItem value="paid-time-off">Paid Time Off</SelectItem>
              <SelectItem value="flexible-schedule">Flexible Schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Shifts */}
        <div className="space-y-2">
          <Label htmlFor="shifts">Shifts</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day Shift</SelectItem>
              <SelectItem value="night">Night Shift</SelectItem>
              <SelectItem value="evening">Evening Shift</SelectItem>
              <SelectItem value="rotating">Rotating Shift</SelectItem>
              <SelectItem value="flexible">Flexible Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}; 
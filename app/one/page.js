'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import occupation from './occupation';
import jobCategories from './categories';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  jobTitle: z.string().min(2, {
    message: 'Job title must be at least 2 characters.',
  }),
  jobCategory: z.string().min(2, {
    message: 'Job category must be at least 2 characters.',
  }),
  jobOpenings: z.number().min(1, {
    message: 'Number of openings must be at least 1.',
  }).max(99, {
    message: 'Number of openings cannot exceed 99.',
  }),
});

export default function ApproachOne() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      jobCategory: '',
      jobOpenings: 1,
    },
  });
  
  // Add state for Popover
  const [open, setOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  // Function to suggest a matching category based on job title
  const findMatchingCategory = (title) => {
    const titleLower = title.toLowerCase();
    
    // Map of keywords to categories
    const categoryMapping = {
      'sales': 'Sales / Business Development',
      'marketing': 'Marketing',
      'customer': 'Customer Support / TeleCaller',
      'support': 'Customer Support / TeleCaller',
      'telecaller': 'Customer Support / TeleCaller',
      'call': 'Customer Support / TeleCaller',
      'tele': 'Customer Support / TeleCaller',
      'delivery': 'Delivery',
      'driver': 'Driver',
      'tech': 'IT / Hardware / Network Engineer',
      'developer': 'IT / Hardware / Network Engineer',
      'engineer': 'IT / Hardware / Network Engineer',
      'design': 'Graphic / Web Designer',
      'account': 'Accountant',
      'admin': 'Recruiter / HR / Admin',
      'hr': 'Recruiter / HR / Admin',
      'recruit': 'Recruiter / HR / Admin',
      'data': 'Back Office / Data Entry',
      'entry': 'Back Office / Data Entry',
      'warehouse': 'Warehouse / Logistics',
      'logistics': 'Warehouse / Logistics',
      'chef': 'Cook / Chef',
      'cook': 'Cook / Chef',
    };
    
    // Find a match from the mapping
    for (const [keyword, category] of Object.entries(categoryMapping)) {
      if (titleLower.includes(keyword)) {
        return category;
      }
    }
    
    // Return null if no match found
    return null;
  };

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className='max-w-screen-lg mx-auto p-3 space-y-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='jobTitle'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Job Title</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value
                          ? occupation.find((job) => job === field.value)
                          : 'Select job title'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search job title...' />
                      <CommandList>
                        <CommandEmpty>No job title found.</CommandEmpty>
                        <CommandGroup className='max-h-60 overflow-y-auto'>
                          {occupation.map((job) => (
                            <CommandItem
                              value={job}
                              key={job}
                              onSelect={() => {
                                form.setValue('jobTitle', job);
                                // Auto-select category based on job title
                                const suggestedCategory = findMatchingCategory(job);
                                if (suggestedCategory) {
                                  form.setValue('jobCategory', suggestedCategory);
                                  form.trigger('jobCategory');
                                }
                                // Close the popover after selection
                                setOpen(false);
                              }}>
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  job === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {job}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
               
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Telecaller', 'Field Sales Executive', 'Delivery Boy', 'Customer Support Executive', 'Accountant'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs px-3 py-1 h-auto"
                      onClick={() => {
                        form.setValue('jobTitle', suggestion);
                        // Also auto-select category for quick buttons
                        const suggestedCategory = findMatchingCategory(suggestion);
                        if (suggestedCategory) {
                          form.setValue('jobCategory', suggestedCategory);
                          form.trigger('jobCategory');
                        }
                        form.trigger('jobTitle');
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='jobCategory'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Category</FormLabel>
                <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value
                          ? jobCategories.find((category) => category.name === field.value)?.name
                          : 'Select job category'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search job category...' />
                      <CommandList>
                        <CommandEmpty>No job category found.</CommandEmpty>
                        <CommandGroup className='max-h-60 overflow-y-auto'>
                          {jobCategories.slice(1).map((category) => (
                            <CommandItem
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue('jobCategory', category.name);
                                setCategoryOpen(false);
                              }}>
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  category.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Customer Support / TeleCaller', 'Sales / Business Development', 'Delivery', 'Retail / Counter Sales', 'Marketing'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs px-3 py-1 h-auto"
                      onClick={() => {
                        form.setValue('jobCategory', suggestion);
                        form.trigger('jobCategory');
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='jobOpenings'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Openings</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='1'
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
              
                <div className="flex flex-wrap gap-2 mt-1">
                  {[1, 2, 5, 10, 20].map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs px-3 py-1 h-auto"
                      onClick={() => {
                        form.setValue('jobOpenings', suggestion);
                        form.trigger('jobOpenings');
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}

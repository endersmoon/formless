'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import occupation from './occupation';

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
                <FormControl>
                  <Input placeholder='Technology' {...field} />
                </FormControl>
               
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
                <FormDescription>
                  Number of positions available.
                </FormDescription>
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

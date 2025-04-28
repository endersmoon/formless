'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as React from 'react';
import occupation from './occupation';
import jobCategories from './categories';
import { findMatchingCategory } from './utils/categoryMatcher';
import { JOB_TITLE_SUGGESTIONS, JOB_CATEGORY_SUGGESTIONS, JOB_OPENINGS_SUGGESTIONS, LOCATION_SUGGESTIONS } from './constants';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import JobFormField from './components/JobFormField';
import NumberFormField from './components/NumberFormField';
import LocationFormField from './components/LocationFormField';

// Validation schema
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
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
});

export default function ApproachOne() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      jobCategory: '',
      jobOpenings: 1,
      location: '',
    },
  });
  
  // Handle job title selection and auto-suggest category
  const handleJobTitleSelect = (value) => {
    // Auto-select category based on job title
    const suggestedCategory = findMatchingCategory(value);
    if (suggestedCategory) {
      form.setValue('jobCategory', suggestedCategory);
      form.trigger('jobCategory');
    }
  };

  // Handle form submission
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className='max-w-screen-lg mx-auto p-3 space-y-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Job Title Field */}
          <JobFormField
            form={form}
            name="jobTitle"
            label="Job Title"
            items={occupation}
            suggestions={JOB_TITLE_SUGGESTIONS}
            placeholder="Select job title"
            emptyText="No job title found."
            searchPlaceholder="Search job title..."
            onSelect={handleJobTitleSelect}
          />

          {/* Job Category Field */}
          <JobFormField
            form={form}
            name="jobCategory"
            label="Job Category"
            items={jobCategories.slice(1)}
            suggestions={JOB_CATEGORY_SUGGESTIONS}
            placeholder="Select job category"
            emptyText="No job category found."
            searchPlaceholder="Search job category..."
            getDisplayValue={(category) => category.name}
            getSearchValue={(category) => category.name}
            getItemId={(category) => category.id}
          />

          {/* Job Openings Field */}
          <NumberFormField
            form={form}
            name="jobOpenings"
            label="Number of Openings"
            suggestions={JOB_OPENINGS_SUGGESTIONS}
          />
          
          {/* Location Field */}
          <LocationFormField
            form={form}
            name="location"
            label="Job Location"
            suggestions={LOCATION_SUGGESTIONS}
            placeholder="Enter job location"
          />
          
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}

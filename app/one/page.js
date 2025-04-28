'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as React from 'react';
import occupation from './occupation';
import jobCategories from './categories';
import { findMatchingCategory } from './utils/categoryMatcher';
import { 
  JOB_TITLE_SUGGESTIONS, 
  JOB_CATEGORY_SUGGESTIONS, 
  JOB_OPENINGS_SUGGESTIONS, 
  LOCATION_SUGGESTIONS,
  JOB_TYPES,
  JOB_TYPE_SUGGESTIONS,
  WORK_LOCATIONS,
  WORK_LOCATION_SUGGESTIONS,
  SHIFTS,
  SHIFT_SUGGESTIONS,
  WORKING_DAYS,
  WORKING_DAYS_SUGGESTIONS,
  SALARY_SUGGESTIONS,
  BENEFITS,
  BENEFITS_SUGGESTIONS
} from './constants';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import JobFormField from './components/JobFormField';
import NumberFormField from './components/NumberFormField';
import LocationFormField from './components/LocationFormField';
import MultiSelectFormField from './components/MultiSelectFormField';

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
  jobType: z.string().min(2, {
    message: 'Job type must be selected.',
  }),
  workLocation: z.string().min(2, {
    message: 'Work location must be selected.',
  }),
  shifts: z.string().min(2, {
    message: 'Shift type must be selected.',
  }),
  workingDays: z.string().min(2, {
    message: 'Working days must be selected.',
  }),
  salaryRange: z.object({
    min: z.number().min(0, {
      message: 'Minimum salary must be 0 or greater.',
    }),
    max: z.number().min(0, {
      message: 'Maximum salary must be 0 or greater.',
    }),
  }),
  benefits: z.array(z.string()).optional(),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  locationCoordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
});

export default function ApproachOne() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      jobCategory: '',
      jobOpenings: 1,
      jobType: '',
      workLocation: '',
      shifts: '',
      workingDays: '',
      salaryRange: {
        min: 0,
        max: 0,
      },
      benefits: [],
      location: '',
      locationCoordinates: null,
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
    <div className='max-w-[720px] mx-auto p-3 space-y-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

          <h1 className='text-2xl font-bold'>Basic Details</h1>
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
          
          {/* Job Type Field */}
          <JobFormField
            form={form}
            name="jobType"
            label="Job Type"
            items={JOB_TYPES}
            suggestions={JOB_TYPE_SUGGESTIONS}
            placeholder="Select job type"
            emptyText="No job type found."
            searchPlaceholder="Search job type..."
          />
          
          {/* Work Location Field */}
          <JobFormField
            form={form}
            name="workLocation"
            label="Work Location"
            items={WORK_LOCATIONS}
            suggestions={WORK_LOCATION_SUGGESTIONS}
            placeholder="Select work location"
            emptyText="No work location found."
            searchPlaceholder="Search work location..."
          />
          
          {/* Shifts Field */}
          <JobFormField
            form={form}
            name="shifts"
            label="Shift Type"
            items={SHIFTS}
            suggestions={SHIFT_SUGGESTIONS}
            placeholder="Select shift type"
            emptyText="No shift type found."
            searchPlaceholder="Search shift type..."
          />
          
          {/* Working Days Field */}
          <JobFormField
            form={form}
            name="workingDays"
            label="Working Days"
            items={WORKING_DAYS}
            suggestions={WORKING_DAYS_SUGGESTIONS}
            placeholder="Select working days"
            emptyText="No working days found."
            searchPlaceholder="Search working days..."
          />
          
          {/* Salary Range Field */}
          <div className='grid grid-cols-2 gap-4'>
            <NumberFormField
              form={form}
              name="salaryRange.min"
              label="Minimum Salary"
              suggestions={SALARY_SUGGESTIONS}
            />
            <NumberFormField
              form={form}
              name="salaryRange.max"
              label="Maximum Salary"
              suggestions={SALARY_SUGGESTIONS}
            />
          </div>
          
          {/* Benefits Field */}
          <MultiSelectFormField
            form={form}
            name="benefits"
            label="Benefits"
            options={BENEFITS}
            suggestions={BENEFITS_SUGGESTIONS}
          />
          
          {/* Location Field */}
          <LocationFormField
            form={form}
            name="location"
            label="Job Location"
            suggestions={LOCATION_SUGGESTIONS}
            placeholder="Enter job location"
            coordinatesFieldName="locationCoordinates"
          />
          
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}

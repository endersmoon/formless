"use client";

import {
    Bike,
    Box,
    Briefcase,
    Phone,
    Car,
    Package,
    Shield,
  } from 'lucide-react';
  import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
  import { Input } from '@/components/ui/input';
  import { JOB_CATEGORIES } from '../constants';
  import { useState, useEffect, createContext, useContext } from 'react';
  import jobCategories from '../../job_cat.json';
  
  const iconMap = {
    Phone,
    Box,
    Car,
    Package,
    Shield,
  };

  // Create context for job data with default value
  export const JobContext = createContext({
    jobData: {},
    setJobData: () => {}
  });

  // Flatten all job titles into a single array
  const allJobTitles = Object.values(jobCategories).flat();
  
  let JobInfo = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
    const [openingsCount, setOpeningsCount] = useState('');
    const [jobType, setJobType] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState('');

    // Get context with safe destructuring
    const context = useContext(JobContext);
    const setJobData = context?.setJobData || (() => {});

    // Update context whenever relevant fields change
    useEffect(() => {
      if (setJobData) {
        setJobData({
          title: jobTitle,
          category: jobCategory,
          openings: openingsCount,
          type: jobType,
          location: workLocation,
          city,
          locality
        });
      }
    }, [jobTitle, jobCategory, openingsCount, jobType, workLocation, city, locality, setJobData]);

    useEffect(() => {
      if (jobTitle.trim()) {
        const filteredSuggestions = allJobTitles.filter(title =>
          title.toLowerCase().includes(jobTitle.toLowerCase())
        ).slice(0, 5); // Limit to 5 suggestions
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, [jobTitle]);

    useEffect(() => {
      if (jobTitle.trim()) {
        // Find categories that contain the selected job title
        const matchingCategories = Object.entries(jobCategories)
          .filter(([_, titles]) => titles.includes(jobTitle))
          .map(([category]) => category);
        
        setCategorySuggestions(matchingCategories);
        setShowCategorySuggestions(true);
      } else {
        setCategorySuggestions([]);
        setShowCategorySuggestions(false);
      }
    }, [jobTitle]);

    const handleSuggestionClick = (suggestion) => {
      setJobTitle(suggestion);
      setShowSuggestions(false);
    };

    const handleCategorySuggestionClick = (category) => {
      setJobCategory(category);
      setShowCategorySuggestions(false);
    };

    const handleOpeningsChange = (value) => {
      setOpeningsCount(value);
    };

    return (
      <div className='space-y-12'>
        <div>
          <h2 className='text-sm font-semibold'>Job Title</h2>
          <div className="relative">
            <Input 
              type='text' 
              placeholder='Job Title' 
              className='mt-3'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              onFocus={() => jobTitle.trim() && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <ToggleGroup type='single' className='grid grid-cols-5 gap-2 mt-3'>
            {JOB_CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon];
              return (
                <ToggleGroupItem
                  key={category.id}
                  value={category.id}
                  size={"sm"}
                  className='col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer'>
                  <Icon className='size-4' />
                  <div className='text-center text-sm'>{category.name}</div>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className='text-sm font-semibold'>Job Category</h2>
          <div className="relative">
            <Input 
              type='text' 
              placeholder='Job Category' 
              className='mt-3'
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              onFocus={() => categorySuggestions.length > 0 && setShowCategorySuggestions(true)}
            />
            {showCategorySuggestions && categorySuggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {categorySuggestions.map((category, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors duration-200 flex items-center gap-1"
                    onClick={() => handleCategorySuggestionClick(category)}
                  >
                    <span>{category}</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        <div>
          <h2 className='text-sm font-semibold'>Openings</h2>
          <Input 
            type='number' 
            placeholder='Number of Openings' 
            className='mt-3'
            value={openingsCount}
            onChange={(e) => setOpeningsCount(e.target.value)}
          />
          <ToggleGroup 
            type='single' 
            className='grid grid-cols-10 gap-3 mt-3'
            value={openingsCount}
            onValueChange={handleOpeningsChange}
          >
            {[1, 4, 5, 10, 15, 25, 50].map((count) => (
              <ToggleGroupItem
                key={count}
                value={count.toString()}
                size={"sm"}
                className='col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer'>
                <div className='text-center text-sm'>{count}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className='text-sm font-semibold'>Job Type</h2>
          <ToggleGroup 
            type='single' 
            className='grid grid-cols-3 gap-3 mt-3'
            value={jobType}
            onValueChange={setJobType}
          >
            {['Full-Time', 'Part-Time', 'Contract'].map((type) => (
              <ToggleGroupItem
                key={type}
                value={type}
                className='col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer'>
                <div className='text-center text-sm'>{type}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className='text-sm font-semibold'>Work Location</h2>
          <ToggleGroup 
            type='single' 
            className='grid grid-cols-3 gap-3 mt-3'
            value={workLocation}
            onValueChange={setWorkLocation}
          >
            {['Work From Home', 'Work From Office', 'Field Job'].map((type) => (
              <ToggleGroupItem
                key={type}
                value={type}
                className='col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer'>
                <div className='text-center text-sm'>{type}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h2 className='text-sm font-semibold'>City</h2>
            <Input 
              type='text' 
              placeholder='Enter city' 
              className='mt-3'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <h2 className='text-sm font-semibold'>Locality</h2>
            <Input 
              type='text' 
              placeholder='Enter locality' 
              className='mt-3'
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
  
      </div>
    );
  };
  
  export default JobInfo;
  
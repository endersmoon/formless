"use client";

import { Button } from '@/components/ui/button';
import { Sidebar, Briefcase, MapPin, Users, Clock } from 'lucide-react';
import { JobContext } from './components/BaseInfo';
import { useState, useCallback } from 'react';

export default function Layout({ children }) {
  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    openings: '',
    type: '',
    location: '',
    city: '',
    locality: ''
  });

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = {
    jobData,
    setJobData: useCallback((newData) => {
      setJobData(prev => ({ ...prev, ...newData }));
    }, [])
  };

  return (
    <JobContext.Provider value={contextValue}>
      <div className='flex h-screen overflow-hidden'>
        <div className='flex-1 overflow-y-scroll'>{children}</div>

        <div className='w-[480px] border-l hidden xl:block'>
          <div className='border-b h-18 bg-background'>
            <div className='flex items-center h-full gap-3 px-3'>
              <Button variant='outline' size='icon'>
                <Sidebar className='w-4 h-4' />
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center p-12'>
            <div className='bg-white rounded-lg shadow-lg w-[360px] p-6 space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <h3 className='text-lg font-semibold'>{jobData.title || 'Job Title'}</h3>
                  <p className='text-sm text-gray-500'>{jobData.category || 'Job Category'}</p>
                </div>
                <div className='bg-blue-50 p-2 rounded-md'>
                  <Briefcase className='w-5 h-5 text-blue-600' />
                </div>
              </div>

              <div className='space-y-3 pt-2'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Users className='w-4 h-4' />
                  <span>{jobData.openings ? `${jobData.openings} Openings` : 'No openings specified'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Clock className='w-4 h-4' />
                  <span>{jobData.type || 'Job type not specified'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <MapPin className='w-4 h-4' />
                  <span>
                    {jobData.location ? (
                      <>
                        {jobData.location}
                        {(jobData.city || jobData.locality) && (
                          <span className='text-gray-500'>
                            {' • '}
                            {[jobData.city, jobData.locality].filter(Boolean).join(', ')}
                          </span>
                        )}
                      </>
                    ) : (
                      'Location not specified'
                    )}
                  </span>
                </div>
              </div>

              <div className='pt-4'>
                <Button className='w-full'>Apply Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </JobContext.Provider>
  );
}

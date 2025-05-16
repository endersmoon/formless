'use client';
import { useState } from 'react';
import {
  Briefcase,
  BriefcaseIcon,
  User,
  Calendar,
  CreditCard,
  ArrowLeftIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BasicForm } from './components/BasicForm';
import JobInfo from './components/JobInfo';
import CandidateInfo from './components/CandidateInfo';
import BaseInfo from './components/BaseInfo';
import { Button } from '@/components/ui/button';

const tabs = [
  {
    name: 'Basic Info',
    icon: BriefcaseIcon,
    content: <BaseInfo />,
  },
  {
    name: 'Job Details',
    icon: BriefcaseIcon,
    content: <JobInfo />,
  },

  {
    name: 'Candidate Info',
    icon: User,
    content: <CandidateInfo />,
  },
  {
    name: 'Pre Screening',
    icon: Calendar,
    content: <div>Interview Form Content</div>,
  },
  {
    name: 'Confirmation',
    icon: Calendar,
    content: <div>Interview Form Content</div>,
  },
];

export default function One() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <div className='border-b flex  items-center overflow-x-auto bg-background sticky top-0 z-10 '>
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex flex-1 items-center h-18 cursor-pointer  z-50',
                index < tabs.length - 1 && 'border-r',
                activeTab === index && 'border-b-2 border-b-primary'
              )}>
              <div className='hidden w-10 h-10 ml-3 rounded-md bg-muted md:flex items-center justify-center'>
                <tab.icon className='w-6 h-6 ' />
              </div>

              <div className='ml-3'>
                <p className='text-xs text-muted-foreground'>
                  Step {index + 1}
                </p>
                <p className='text-sm font-medium'>{tab.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mx-auto max-w-[720px] p-4 overflow-hidden scroll-auto'>
          {tabs[activeTab].content}
        </div>
      </div>
      <div className=' w-full h-18 bg-background border-t flex items-center justify-between px-6'>
        <div className='flex items-center'>
          <Button variant='outline'>
            Reset
          </Button>
        </div>
        <Button variant='outline'>
            Save & Continue
          </Button>
      </div>
    </div>
  );
}

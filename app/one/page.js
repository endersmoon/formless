"use client"
import { Briefcase, BriefcaseIcon, User, Calendar, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function One() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { name: 'Basic', icon: BriefcaseIcon },
    { name: 'Jobs', icon: Briefcase },
    { name: 'Candidates', icon: User },
    { name: 'Interview', icon: Calendar },
    { name: 'Deposits', icon: CreditCard },
  ];

  return (
    <div>
      <div className='border-b flex gap-3 items-center overflow-x-auto'>
        {tabs.map((tab, index) => (
          <div 
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'flex flex-1 items-center gap-3 pr-3 p-3 cursor-pointer',
              index < tabs.length - 1 && 'border-r',
              activeTab === index && 'border-b-2 border-b-primary'
            )}
          >
            <div className='w-10 h-10 rounded-md bg-muted flex items-center justify-center'>
              <tab.icon className='w-6 h-6' />
            </div>

            <div>
              <p className='text-xs text-muted-foreground'>Step {index + 1}</p>
              <p className='text-sm font-medium'>{tab.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className='mx-auto max-w-[720px] p-4'>
        {activeTab === 0 && <div>Basic Form Content</div>}
        {activeTab === 1 && <div>Jobs Form Content</div>}
        {activeTab === 2 && <div>Candidates Form Content</div>}
        {activeTab === 3 && <div>Interview Form Content</div>}
        {activeTab === 4 && <div>Deposits Form Content</div>}
      </div>
    </div>
  );
}

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
  const jobCategories = [
    {
      id: 1,
      name: 'Tele Caller',
      icon: Phone,
    },
    {
      id: 2,
      name: 'Delivery Boy',
      icon: Box,
    },
    {
      id: 3,
      name: 'Driver',
      icon: Car,
    },
    {
      id: 4,
      name: 'Picker/Packer',
      icon: Package,
    },
    {
      id: 5,
      name: 'Security Guard',
      icon: Shield,
    },
  ];
  
  let JobInfo = () => {
    return (
      <div className='  space-y-12'>
        <div>
          <h2 className='text-sm font-semibold'>Job Title</h2>
          <Input type='text' placeholder='Job Title' className='mt-3' />
          <ToggleGroup type='single' className='grid grid-cols-5 gap-2 mt-3'>
            {jobCategories.map((category) => (
              <ToggleGroupItem
                key={category.id}
                value={category.id}
                size={"sm"}
                className='col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer'>
                <category.icon className='size-4' />
                <div className='text-center text-sm'>{category.name}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className='text-sm font-semibold'>Job Category</h2>
          <Input type='text' placeholder='Job Category' className='mt-3' />
         
        </div>
  
        <div>
          <h2 className='text-sm font-semibold'>Openings</h2>
          <Input type='text' placeholder='Number of Openings' className='mt-3' />
          <ToggleGroup type='single' className='grid grid-cols-10 gap-3 mt-3'>
            {[1, 4, 5, 10,15,25,50].map((count) => (
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
         
          <ToggleGroup type='single' className='grid grid-cols-3 gap-3 mt-3'>
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
         
          <ToggleGroup type='single' className='grid grid-cols-3 gap-3 mt-3'>
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
            <Input type='text' placeholder='Enter city' className='mt-3' />
          </div>
          <div>
            <h2 className='text-sm font-semibold'>Locality</h2>
            <Input type='text' placeholder='Enter locality' className='mt-3' />
          </div>
        </div>
  
      </div>
    );
  };
  
  export default JobInfo;
  
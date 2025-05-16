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
import { useState } from 'react';
import { Label } from '@/components/ui/label';


import { JOB_CATEGORIES } from '../constants';

const iconMap = {
  Phone,
  Box,
  Car,
  Package,
  Shield,
};

let JobInfo = () => {
  const [depositRequired, setDepositRequired] = useState('no');
  const [walkinInterview, setWalkinInterview] = useState('no');
  const [walkinLocation, setWalkinLocation] = useState(null);
  const [shift, setShift] = useState('');
  const [workingDays, setWorkingDays] = useState('');

  return (
    <div className='space-y-12'>
      <div>
        <h2 className='text-sm font-semibold'>Job Title</h2>
        <Input type='text' placeholder='Job Title' className='mt-3' />
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

      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Salary & benefits <span className="text-red-500">*</span></h2>
        <ToggleGroup type="single" className="grid grid-cols-2 gap-3 mt-3">
          <ToggleGroupItem
            value="fixed"
            className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer text-sm font-medium"
          >
            Fixed
          </ToggleGroupItem>
          <ToggleGroupItem
            value="fixed-incentives"
            className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer text-sm font-medium"
          >
            Fixed + Incentives
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex gap-2 mt-3 items-center">
          <Input type="number" placeholder="₹ e.g 10,000" className="w-40" />
          <span className="text-sm">to</span>
          <Input type="number" placeholder="₹ e.g 50,000" className="w-40" />
          <span className="ml-2 text-sm">+</span>
          <Input type="number" placeholder="₹ e.g 10,000" className="w-40" />
        </div>
        <div className="bg-blue-50 rounded-xl p-4 mt-3">
          <div className="font-semibold mb-2 text-sm">Salary Break-up tool</div>
          <div className="flex justify-between text-sm mb-1">
            <span>Fixed Salary</span>
            <span>₹ 15,000 - ₹ 25,000</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Incentives</span>
            <span>₹ 5,000</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-sm">
            <span>Total salary</span>
            <span>₹ 15,000 - ₹ 25,000</span>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 mt-3 flex items-center gap-2 text-sm">
          <span className="font-medium">i</span>
          <span>The average salary for <b>{'Back Office/Data Entry'}</b> is <b>₹17,025</b>. Increase salary range to receive more job applies</span>
        </div>
        <div className="mt-3">
          <div className="text-sm font-semibold mb-2">Job benefits <span className="text-gray-400">(optional)</span></div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">Cab +</span>
            <span className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">Meal +</span>
            <span className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">Insurance +</span>
            <span className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">PF +</span>
            <span className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">Medical benefits +</span>
            <span className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">Add more +</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-2">
          <Label htmlFor="timing">Timing</Label>
          <Input type="text" id="timing" placeholder="e.g. 9:00 AM - 6:00 PM" className="w-80" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shifts">Shifts</Label>
          <ToggleGroup type="single" value={shift} onValueChange={setShift} className="grid grid-cols-5 gap-2 mt-3">
            <ToggleGroupItem value="day" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Day</ToggleGroupItem>
            <ToggleGroupItem value="night" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Night</ToggleGroupItem>
            <ToggleGroupItem value="evening" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Evening</ToggleGroupItem>
            <ToggleGroupItem value="rotating" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Rotating</ToggleGroupItem>
            <ToggleGroupItem value="flexible" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Flexible</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="working-days">Working Days</Label>
          <ToggleGroup type="single" value={workingDays} onValueChange={setWorkingDays} className="grid grid-cols-4 gap-2 mt-3">
            <ToggleGroupItem value="5" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">5 Days</ToggleGroupItem>
            <ToggleGroupItem value="6" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">6 Days</ToggleGroupItem>
            <ToggleGroupItem value="7" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">7 Days</ToggleGroupItem>
            <ToggleGroupItem value="custom" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Custom</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <Label>Deposit Required</Label>
          <ToggleGroup type="single" value={depositRequired} onValueChange={setDepositRequired} className="grid grid-cols-2 gap-2 mt-3">
            <ToggleGroupItem value="yes" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Yes</ToggleGroupItem>
            <ToggleGroupItem value="no" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">No</ToggleGroupItem>
          </ToggleGroup>
          {depositRequired === 'yes' && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="deposit-amount">Amount</Label>
              <Input type="number" id="deposit-amount" placeholder="e.g. 2000" className="w-80" />
              <Label htmlFor="deposit-reason">Reason for deposit</Label>
              <Input type="text" id="deposit-reason" placeholder="e.g. Uniform, Security, etc." className="w-80" />
              <Label htmlFor="deposit-when">When will the amount be taken?</Label>
              <Input type="text" id="deposit-when" placeholder="e.g. At joining, after training, etc." className="w-80" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>Walk-in Interview</Label>
          <ToggleGroup type="single" value={walkinInterview} onValueChange={setWalkinInterview} className="grid grid-cols-2 gap-2 mt-3">
            <ToggleGroupItem value="yes" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">Yes</ToggleGroupItem>
            <ToggleGroupItem value="no" className="col-span-1 border rounded-md p-2 flex items-center justify-center hover:bg-muted cursor-pointer">No</ToggleGroupItem>
          </ToggleGroup>
          {walkinInterview === 'yes' && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="walkin-timing">Timing</Label>
              <Input type="text" id="walkin-timing" placeholder="e.g. 10:00 AM - 2:00 PM" className="w-80" />
              <Label htmlFor="walkin-date">Date</Label>
              <Input type="date" id="walkin-date" className="w-80" />
              <Label>Location</Label>
              
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default JobInfo;

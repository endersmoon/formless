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
      <div className='space-y-12'>
        <div>
          <h2 className="text-sm font-semibold">Gender</h2>
          <ToggleGroup type="single" className="grid grid-cols-3 gap-3 mt-3">
            {["Male", "Female", "Any"].map((gender) => (
              <ToggleGroupItem
                key={gender}
                value={gender}
                className="col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer"
              >
                <div className="text-center text-sm">{gender}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">Qualification</h2>
          <ToggleGroup type="single" className="grid grid-cols-6 gap-2 mt-3">
            {["Any", "10th", "12th", "Diploma", "Graduate", "Post Graduate"].map((q) => (
              <ToggleGroupItem
                key={q}
                value={q}
                className="col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer"
              >
                <div className="text-center text-sm">{q}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">Experience</h2>
          <div className="flex gap-2 mt-3 items-center">
            <Input type="number" placeholder="Min (years)" className="w-32" />
            <span className="text-sm">to</span>
            <Input type="number" placeholder="Max (years)" className="w-32" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="fresher-allowed" className="accent-blue-500" />
            <label htmlFor="fresher-allowed" className="text-sm">Fresher Allowed</label>
          </div>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">Industry</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {["BPO", "Logistics", "Retail", "Security", "E-commerce", "Healthcare", "Add more +"].map((industry) => (
              <span key={industry} className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">
                {industry}
              </span>
            ))}
          </div>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">Job Skills</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {["MS Excel", "Communication", "Driving", "Telecalling", "Packing", "Add more +"].map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">
                {skill}
              </span>
            ))}
          </div>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">English Proficiency</h2>
          <ToggleGroup type="single" className="grid grid-cols-3 gap-3 mt-3">
            {["None", "Basic", "Good"].map((level) => (
              <ToggleGroupItem
                key={level}
                value={level}
                className="col-span-1 border rounded-md p-2 gap-2 flex items-center justify-center hover:bg-muted cursor-pointer"
              >
                <div className="text-center text-sm">{level}</div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">Document Required</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Aadhaar", "PAN", "Driving License", "Voter ID", "Passport", "Add more +"].map((doc) => (
              <span key={doc} className="px-3 py-1 rounded-full border bg-white text-sm cursor-pointer">
                {doc}
              </span>
            ))}
          </div>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold">Requirement</h2>
          <textarea
            className="w-full mt-3 border rounded-md p-2 text-sm"
            rows={4}
            placeholder="Enter job requirements, responsibilities, etc."
          />
        </div>
      </div>
    );
  };
  
  export default JobInfo;
  
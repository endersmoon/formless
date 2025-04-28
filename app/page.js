import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className=' p-12  flex gap-4'>
      <a href='/one'>
     
        <Button className=''>Approach One</Button>
      </a>
      <a href='/two'>
      
        <Button className=''>Approach Two</Button>
      </a>
      <a href='/three'>
   
        <Button className=''>Approach Three</Button>
      </a>
    </div>
  );
}

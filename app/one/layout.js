import { Button } from '@/components/ui/button';
import { Sidebar } from 'lucide-react';
export default function Layout({ children }) {
  return (
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
        <div className=' flex items-center justify-center p-3'>
        <div className='mockup-phone h-[812px] w-[390px]  '>
              <div className='mockup-phone-camera'></div>
              <div className='mockup-phone-display text-white grid place-content-center'>
                It's Glowtime.
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

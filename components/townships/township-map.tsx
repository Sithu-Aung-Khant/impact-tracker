'use client';

import { useEffect, useState } from 'react';

export function TownshipMap() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='h-[400px] flex items-center justify-center'>
        Loading map...
      </div>
    );
  }

  return (
    <div className='h-[400px] w-full flex flex-col items-center justify-center bg-muted/20 rounded-md border border-dashed'>
      <div className='text-center max-w-md space-y-4 p-6'>
        <h3 className='text-lg font-medium'>Map Visualization</h3>
        <p className='text-sm text-muted-foreground'>
          This would display an interactive map of Myanmar with township markers
          sized according to aid distribution volume. For low-bandwidth
          environments, this view would be loaded on demand.
        </p>
        <p className='text-xs text-muted-foreground'>
          Note: Actual implementation would use a lightweight map library
          optimized for low-bandwidth environments.
        </p>
      </div>
    </div>
  );
}

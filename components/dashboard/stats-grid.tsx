'use client';

import { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Home, Utensils, BookOpen } from 'lucide-react';
import { useGetTotalDistributionsQuery } from '@/state/api';

const useAnimatedValue = (targetValue: number, duration: number = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (targetValue === 0) return;

    const increment = targetValue / (duration / 16); // 16ms for 60fps
    let currentValue = 0;

    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        setValue(targetValue);
        clearInterval(interval);
      } else {
        setValue(Math.floor(currentValue));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return value;
};

export const StatsGrid = () => {
  const { data, isLoading, isError } = useGetTotalDistributionsQuery();

  const {
    totalDistributions = 0,
    totalTownshipsReached = 0,
    totalFoodKits = 0,
    totalEducationMaterials = 0,
  } = data || {};

  const animatedDistributions = useAnimatedValue(totalDistributions);
  const animatedTownships = useAnimatedValue(totalTownshipsReached);
  const animatedFoodKits = useAnimatedValue(totalFoodKits);
  const animatedEducationMaterials = useAnimatedValue(totalEducationMaterials);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Package className='h-4 w-4' /> Total Distributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className='h-8 w-20' />}>
            <div className='text-2xl font-bold'>
              {isLoading ? 0 : animatedDistributions}
            </div>
          </Suspense>
          <p className='text-xs text-muted-foreground'>+20% from last month</p>
        </CardContent>
      </Card>
      <Card className='bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Home className='h-4 w-4' /> Townships Reached
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className='h-8 w-20' />}>
            <div className='text-2xl font-bold'>
              {isLoading ? 0 : animatedTownships}
            </div>
          </Suspense>
          <p className='text-xs text-muted-foreground'>
            +2 new townships this month
          </p>
        </CardContent>
      </Card>
      <Card className='bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <Utensils className='h-4 w-4' /> Food Kits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className='h-8 w-20' />}>
            <div className='text-2xl font-bold'>
              {isLoading ? 0 : animatedFoodKits}
            </div>
          </Suspense>
          <p className='text-xs text-muted-foreground'>+12% from last month</p>
        </CardContent>
      </Card>
      <Card className='bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium flex items-center gap-2'>
            <BookOpen className='h-4 w-4' /> Educational Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className='h-8 w-20' />}>
            <div className='text-2xl font-bold'>
              {isLoading ? 0 : animatedEducationMaterials}
            </div>
          </Suspense>
          <p className='text-xs text-muted-foreground'>+18% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

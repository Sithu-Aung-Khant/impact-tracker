'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetTownshipSupportStatsQuery } from '@/state/api';

export const TownshipSupportStats = () => {
  const { data, isLoading, isError } = useGetTownshipSupportStatsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Most Supported Township
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {data?.mostSupportedTownship.name}
          </div>
          <p className='text-xs text-muted-foreground'>
            {data?.mostSupportedTownship.totalDistributions} total distributions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Least Supported Township
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {data?.leastSupportedTownship.name}
          </div>
          <p className='text-xs text-muted-foreground'>
            {data?.leastSupportedTownship.totalDistributions} total
            distributions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Average Per Township
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{data?.averagePerTownship}</div>
          <p className='text-xs text-muted-foreground'>items distributed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Growth This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{data?.growthThisMonth}%</div>
          <p className='text-xs text-muted-foreground'>from previous month</p>
        </CardContent>
      </Card>
    </div>
  );
};

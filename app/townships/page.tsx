import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TownshipTable } from '@/components/townships/township-table';
import { TownshipMap } from '@/components/townships/township-map';
import { TownshipBarChart } from '@/components/townships/township-bar-chart';
import { TownshipSupportStats } from '../../components/townships/TownshipSupportStats';

export default function TownshipsPage() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/'>
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Back to dashboard</span>
          </Link>
        </Button>
        <div className='flex flex-1 items-center gap-2'>
          <h1 className='text-xl font-semibold'>Township Distribution Data</h1>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold tracking-tight'>All Townships</h2>
          <p className='text-muted-foreground'>
            Comprehensive view of aid distribution across all townships in
            Myanmar.
          </p>
        </div>

        <Tabs defaultValue='table' className='w-full'>
          <TabsList className='mb-4'>
            <TabsTrigger value='table'>Table View</TabsTrigger>
            <TabsTrigger value='chart'>Chart View</TabsTrigger>
            <TabsTrigger value='map'>Map View</TabsTrigger>
          </TabsList>
          <TabsContent value='table' className='mt-0'>
            <Card>
              <CardHeader>
                <CardTitle>Township Distribution Summary</CardTitle>
                <CardDescription>
                  Detailed breakdown of aid distribution by township and aid
                  type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className='space-y-2'>
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                    </div>
                  }
                >
                  <TownshipTable />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='chart' className='mt-0'>
            <Card>
              <CardHeader>
                <CardTitle>Township Distribution Chart</CardTitle>
                <CardDescription>
                  Visual comparison of aid distribution across townships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className='h-[400px] w-full' />}>
                  <TownshipBarChart />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='map' className='mt-0'>
            <Card>
              <CardHeader>
                <CardTitle>Township Distribution Map</CardTitle>
                <CardDescription>
                  Geographic visualization of aid distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className='h-[400px] w-full' />}>
                  <TownshipMap />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <TownshipSupportStats />
      </main>
    </div>
  );
}

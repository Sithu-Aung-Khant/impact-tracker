import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SummaryTable } from '@/components/dashboard/summary-table';
import { DistributionChart } from '@/components/dashboard/distribution-chart';
import { RecentDistributions } from '@/components/dashboard/recent-distributions';

export default function Dashboard() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <div className='flex flex-1 items-center gap-2'>
          <h1 className='text-xl font-semibold'>Impact Tracker Dashboard</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button asChild variant='outline' size='sm'>
            <Link href='/add-record'>
              <Plus className='mr-2 h-4 w-4' />
              Add New Record
            </Link>
          </Button>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Distributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className='h-8 w-20' />}>
                <div className='text-2xl font-bold'>1,284</div>
              </Suspense>
              <p className='text-xs text-muted-foreground'>
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Townships Reached
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className='h-8 w-20' />}>
                <div className='text-2xl font-bold'>24</div>
              </Suspense>
              <p className='text-xs text-muted-foreground'>
                +2 new townships this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Food Kits</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className='h-8 w-20' />}>
                <div className='text-2xl font-bold'>845</div>
              </Suspense>
              <p className='text-xs text-muted-foreground'>
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Educational Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className='h-8 w-20' />}>
                <div className='text-2xl font-bold'>439</div>
              </Suspense>
              <p className='text-xs text-muted-foreground'>
                +18% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='lg:col-span-4'>
            <CardHeader>
              <CardTitle>Distribution Summary by Township</CardTitle>
              <CardDescription>
                Overview of aid distribution across townships
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
                  </div>
                }
              >
                <SummaryTable />
              </Suspense>
              <div className='flex justify-end mt-4'>
                <Button variant='outline' size='sm' asChild>
                  <Link href='/townships'>
                    View All Townships
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Distribution by Aid Type</CardTitle>
              <CardDescription>
                Breakdown of different aid types distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className='h-[240px] w-full' />}>
                <DistributionChart />
              </Suspense>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Distributions</CardTitle>
            <CardDescription>Latest aid distribution records</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className='space-y-2'>
                  <Skeleton className='h-12 w-full' />
                  <Skeleton className='h-12 w-full' />
                  <Skeleton className='h-12 w-full' />
                </div>
              }
            >
              <RecentDistributions />
            </Suspense>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

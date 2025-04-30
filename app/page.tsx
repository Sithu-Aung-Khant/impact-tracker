import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Activity } from 'lucide-react';
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
import { StatsGrid } from '@/components/dashboard/stats-grid';

export default function Dashboard() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-gradient-to-r from-background to-muted/50 shadow-sm px-4 md:px-6'>
        <div className='flex flex-1 items-center gap-2'>
          <Activity className='h-6 w-6' />
          <h1 className='text-xl font-semibold'>Impact Tracker Dashboard</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            asChild
            variant='outline'
            size='sm'
            className='hover:bg-muted/50'
          >
            <Link href='/add-record'>
              <Plus className='mr-2 h-4 w-4' />
              Add New Record
            </Link>
          </Button>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <StatsGrid />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='lg:col-span-4 bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
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
                <Button
                  variant='outline'
                  size='sm'
                  className='hover:bg-muted/50'
                  asChild
                >
                  <Link href='/townships'>
                    View All Townships
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className='lg:col-span-3 bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
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
        <Card className='bg-gradient-to-br from-background to-muted/50 hover:from-background/90 hover:to-muted/60 transition-all duration-300 shadow-sm hover:shadow-md border'>
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

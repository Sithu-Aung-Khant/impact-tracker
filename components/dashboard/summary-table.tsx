'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetDistributionsSummaryByTownshipQuery } from '@/state/api';
import { Skeleton } from '@/components/ui/skeleton';

export function SummaryTable() {
  const { data, isLoading } = useGetDistributionsSummaryByTownshipQuery();

  if (isLoading) {
    return (
      <div className='overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Township</TableHead>
              <TableHead className='text-right'>Food Kits</TableHead>
              <TableHead className='text-right'>
                Educational Materials
              </TableHead>
              <TableHead className='text-right'>Medical Supplies</TableHead>
              <TableHead className='text-right'>Hygiene Kits</TableHead>
              <TableHead className='text-right'>Shelter Materials</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} aria-label='Loading row'>
                <TableCell>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-6 w-full opacity-50' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  // Limit the data to the first 5 rows
  const limitedData = data.slice(0, 5);

  return (
    <div className='overflow-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Township</TableHead>
            <TableHead className='text-right'>Food Kits</TableHead>
            <TableHead className='text-right'>Educational Materials</TableHead>
            <TableHead className='text-right'>Medical Supplies</TableHead>
            <TableHead className='text-right'>Hygiene Kits</TableHead>
            <TableHead className='text-right'>Shelter Materials</TableHead>
            <TableHead className='text-right'>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limitedData.map((row) => (
            <TableRow key={row.township}>
              <TableCell className='font-medium'>{row.township}</TableCell>
              <TableCell className='text-right'>{row.foodKits}</TableCell>
              <TableCell className='text-right'>
                {row.educationalMaterials}
              </TableCell>
              <TableCell className='text-right'>
                {row.medicalSupplies}
              </TableCell>
              <TableCell className='text-right'>{row.hygieneKits}</TableCell>
              <TableCell className='text-right'>
                {row.shelterMaterials}
              </TableCell>
              <TableCell className='text-right font-medium'>
                {row.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

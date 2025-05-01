'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetDistributionsSummaryByTownshipQuery } from '@/state/api';

export function TownshipTable() {
  const { data, isLoading, error } =
    useGetDistributionsSummaryByTownshipQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

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
            <TableHead>Last Distribution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
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
              <TableCell>
                <Badge variant='outline' className='font-normal'>
                  {formatDate(row.lastDistributionDate)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDate(date: Date | string) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

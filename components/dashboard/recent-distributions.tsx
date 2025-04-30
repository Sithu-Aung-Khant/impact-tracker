'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetRecentDistributionsQuery } from '@/state/api';

export function RecentDistributions() {
  const { data, isLoading, isError } = useGetRecentDistributionsQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (isError) {
    return <div>Error loading recent distributions.</div>; // Error state
  }

  return (
    <div className='overflow-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Township</TableHead>
            <TableHead>Aid Type</TableHead>
            <TableHead className='text-right'>Quantity</TableHead>
            <TableHead>Field Worker</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.date + row.township + row.aidType}>
              <TableCell>{formatDate(row.date)}</TableCell>
              <TableCell>{row.township}</TableCell>
              <TableCell>
                <Badge variant='outline' className='font-normal'>
                  {row.aidType}
                </Badge>
              </TableCell>
              <TableCell className='text-right'>{row.quantity}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-6 w-6'>
                    <AvatarFallback className='text-xs'>
                      {getInitials(row.fieldWorker)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{row.fieldWorker}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

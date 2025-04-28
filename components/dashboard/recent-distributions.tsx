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

const recentData = [
  {
    id: '1',
    date: '2023-04-15',
    township: 'Yangon',
    aidType: 'Food Kits',
    quantity: 50,
    fieldWorker: 'Aung Min',
  },
  {
    id: '2',
    date: '2023-04-14',
    township: 'Mandalay',
    aidType: 'Educational Materials',
    quantity: 30,
    fieldWorker: 'Thiri Aung',
  },
  {
    id: '3',
    date: '2023-04-13',
    township: 'Bago',
    aidType: 'Medical Supplies',
    quantity: 25,
    fieldWorker: 'Kyaw Zaw',
  },
  {
    id: '4',
    date: '2023-04-12',
    township: 'Naypyidaw',
    aidType: 'Food Kits',
    quantity: 40,
    fieldWorker: 'Su Su',
  },
  {
    id: '5',
    date: '2023-04-11',
    township: 'Mawlamyine',
    aidType: 'Hygiene Kits',
    quantity: 35,
    fieldWorker: 'Tun Tun',
  },
];

export function RecentDistributions() {
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
          {recentData.map((row) => (
            <TableRow key={row.id}>
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

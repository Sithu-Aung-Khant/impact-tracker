import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const townshipData = [
  {
    township: 'Yangon',
    foodKits: 245,
    educationalMaterials: 120,
    medicalSupplies: 85,
    hygieneKits: 65,
    shelterMaterials: 35,
    total: 550,
    lastDistribution: '2023-04-15',
  },
  {
    township: 'Mandalay',
    foodKits: 180,
    educationalMaterials: 95,
    medicalSupplies: 65,
    hygieneKits: 45,
    shelterMaterials: 25,
    total: 410,
    lastDistribution: '2023-04-14',
  },
  {
    township: 'Naypyidaw',
    foodKits: 120,
    educationalMaterials: 75,
    medicalSupplies: 45,
    hygieneKits: 35,
    shelterMaterials: 15,
    total: 290,
    lastDistribution: '2023-04-12',
  },
  {
    township: 'Bago',
    foodKits: 95,
    educationalMaterials: 60,
    medicalSupplies: 35,
    hygieneKits: 25,
    shelterMaterials: 10,
    total: 225,
    lastDistribution: '2023-04-13',
  },
  {
    township: 'Mawlamyine',
    foodKits: 75,
    educationalMaterials: 50,
    medicalSupplies: 25,
    hygieneKits: 20,
    shelterMaterials: 5,
    total: 175,
    lastDistribution: '2023-04-11',
  },
  {
    township: 'Taunggyi',
    foodKits: 65,
    educationalMaterials: 45,
    medicalSupplies: 20,
    hygieneKits: 15,
    shelterMaterials: 5,
    total: 150,
    lastDistribution: '2023-04-10',
  },
  {
    township: 'Pathein',
    foodKits: 55,
    educationalMaterials: 40,
    medicalSupplies: 15,
    hygieneKits: 10,
    shelterMaterials: 5,
    total: 125,
    lastDistribution: '2023-04-09',
  },
  {
    township: 'Monywa',
    foodKits: 50,
    educationalMaterials: 35,
    medicalSupplies: 15,
    hygieneKits: 10,
    shelterMaterials: 0,
    total: 110,
    lastDistribution: '2023-04-08',
  },
];

export function TownshipTable() {
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
          {townshipData.map((row) => (
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
                  {formatDate(row.lastDistribution)}
                </Badge>
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const summaryData = [
  {
    township: 'Yangon',
    foodKits: 245,
    educationalMaterials: 120,
    medicalSupplies: 85,
    total: 450,
  },
  {
    township: 'Mandalay',
    foodKits: 180,
    educationalMaterials: 95,
    medicalSupplies: 65,
    total: 340,
  },
  {
    township: 'Naypyidaw',
    foodKits: 120,
    educationalMaterials: 75,
    medicalSupplies: 45,
    total: 240,
  },
  {
    township: 'Bago',
    foodKits: 95,
    educationalMaterials: 60,
    medicalSupplies: 35,
    total: 190,
  },
  {
    township: 'Mawlamyine',
    foodKits: 75,
    educationalMaterials: 50,
    medicalSupplies: 25,
    total: 150,
  },
];

export function SummaryTable() {
  return (
    <div className='overflow-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Township</TableHead>
            <TableHead className='text-right'>Food Kits</TableHead>
            <TableHead className='text-right'>Educational Materials</TableHead>
            <TableHead className='text-right'>Medical Supplies</TableHead>
            <TableHead className='text-right'>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summaryData.map((row) => (
            <TableRow key={row.township}>
              <TableCell className='font-medium'>{row.township}</TableCell>
              <TableCell className='text-right'>{row.foodKits}</TableCell>
              <TableCell className='text-right'>
                {row.educationalMaterials}
              </TableCell>
              <TableCell className='text-right'>
                {row.medicalSupplies}
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

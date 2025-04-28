'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Food Kits', value: 845, color: '#2563eb' },
  { name: 'Educational Materials', value: 439, color: '#16a34a' },
  { name: 'Medical Supplies', value: 285, color: '#dc2626' },
  { name: 'Hygiene Kits', value: 175, color: '#9333ea' },
  { name: 'Shelter Materials', value: 120, color: '#ea580c' },
];

export function DistributionChart() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='h-[240px] flex items-center justify-center'>
        Loading chart...
      </div>
    );
  }

  return (
    <div className='h-[240px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

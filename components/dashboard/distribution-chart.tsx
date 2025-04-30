'use client';

import { useGetDistributionsByAidTypeQuery } from '@/state/api';
import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

// Predefined colors in order
const colors = ['#4C6A9C', '#A78BFA', '#48BB78', '#F687B3', '#63B3ED'];

export function DistributionChart() {
  const [mounted, setMounted] = useState(false);
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetDistributionsByAidTypeQuery();

  // Prevent hydration issues with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className='h-[240px] flex items-center justify-center'>
        Loading chart...
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-[240px] flex items-center justify-center'>
        Error loading data
      </div>
    );
  }

  // Map API data to the format expected by the PieChart
  const chartData =
    apiData?.map((item, index) => ({
      name: item.aidType,
      value: parseInt(item.totalQuantity, 10),
      color: colors[index % colors.length], // Use colors in order
    })) || [];

  return (
    <div className='h-[240px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={chartData}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {chartData.map((entry, index) => (
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

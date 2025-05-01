'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useGetDistributionsSummaryByTownshipQuery } from '@/state/api';

const colors = {
  'Food Kits': '#2563eb',
  'Educational Materials': '#16a34a',
  'Medical Supplies': '#dc2626',
  'Hygiene Kits': '#9333ea',
  'Shelter Materials': '#ea580c',
};

export function TownshipBarChart() {
  const [mounted, setMounted] = useState(false);
  const [chartHeight, setChartHeight] = useState(400);

  const { data, isLoading, error } =
    useGetDistributionsSummaryByTownshipQuery();

  // Transform API data into the format expected by the BarChart
  const chartData =
    data?.map((row) => ({
      name: row.township,
      'Food Kits': row.foodKits,
      'Educational Materials': row.educationalMaterials,
      'Medical Supplies': row.medicalSupplies,
      'Hygiene Kits': row.hygieneKits,
      'Shelter Materials': row.shelterMaterials,
    })) || [];

  // Prevent hydration issues with SSR
  useEffect(() => {
    setMounted(true);

    // Responsive height adjustment
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartHeight(300);
      } else {
        setChartHeight(400);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className='h-[400px] flex items-center justify-center'>
        Loading chart...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='h-[400px] flex items-center justify-center'>
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-[400px] flex items-center justify-center'>
        Error loading data
      </div>
    );
  }

  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height={chartHeight}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' angle={-45} textAnchor='end' height={70} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Food Kits' fill={colors['Food Kits']} />
          <Bar
            dataKey='Educational Materials'
            fill={colors['Educational Materials']}
          />
          <Bar dataKey='Medical Supplies' fill={colors['Medical Supplies']} />
          <Bar dataKey='Hygiene Kits' fill={colors['Hygiene Kits']} />
          <Bar dataKey='Shelter Materials' fill={colors['Shelter Materials']} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

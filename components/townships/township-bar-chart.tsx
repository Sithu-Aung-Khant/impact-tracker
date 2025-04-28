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

const data = [
  {
    name: 'Yangon',
    'Food Kits': 245,
    'Educational Materials': 120,
    'Medical Supplies': 85,
    'Hygiene Kits': 65,
    'Shelter Materials': 35,
  },
  {
    name: 'Mandalay',
    'Food Kits': 180,
    'Educational Materials': 95,
    'Medical Supplies': 65,
    'Hygiene Kits': 45,
    'Shelter Materials': 25,
  },
  {
    name: 'Naypyidaw',
    'Food Kits': 120,
    'Educational Materials': 75,
    'Medical Supplies': 45,
    'Hygiene Kits': 35,
    'Shelter Materials': 15,
  },
  {
    name: 'Bago',
    'Food Kits': 95,
    'Educational Materials': 60,
    'Medical Supplies': 35,
    'Hygiene Kits': 25,
    'Shelter Materials': 10,
  },
  {
    name: 'Mawlamyine',
    'Food Kits': 75,
    'Educational Materials': 50,
    'Medical Supplies': 25,
    'Hygiene Kits': 20,
    'Shelter Materials': 5,
  },
  {
    name: 'Taunggyi',
    'Food Kits': 65,
    'Educational Materials': 45,
    'Medical Supplies': 20,
    'Hygiene Kits': 15,
    'Shelter Materials': 5,
  },
];

const colors = {
  'Food Kits': '#2563eb',
  'Educational Materials': '#16a34a',
  'Medical Supplies': '#dc2626',
  'Hygiene Kits': '#9333ea',
  'Shelter Materials': '#ea580c',
};

export function TownshipBarChart() {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState(data);
  const [chartHeight, setChartHeight] = useState(400);

  // Prevent hydration issues with SSR
  useEffect(() => {
    setMounted(true);

    // Responsive height adjustment
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartHeight(300);
        // For mobile, limit to fewer townships to avoid overcrowding
        setChartData(data.slice(0, 4));
      } else {
        setChartHeight(400);
        setChartData(data);
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

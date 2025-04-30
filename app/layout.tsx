import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DashboardWrapper from './dashboardWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Impact Tracker Dashboard',
  description: 'Track distribution of aid resources across townships',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}

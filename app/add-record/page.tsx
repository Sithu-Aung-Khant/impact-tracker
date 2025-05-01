'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { DatePicker } from '@/components/ui/date-picker';

export default function AddRecordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay and success
    setTimeout(() => {
      toast({
        title: 'Record added successfully',
        description: 'The distribution record has been added to the system.',
      });
      setIsSubmitting(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/'>
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Back to dashboard</span>
          </Link>
        </Button>
        <div className='flex flex-1 items-center gap-2'>
          <h1 className='text-xl font-semibold'>Add Distribution Record</h1>
        </div>
      </header>
      <main className='flex flex-1 flex-col items-center justify-center p-4 md:p-8'>
        <Card className='w-full max-w-md'>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Distribution Record</CardTitle>
              <CardDescription>
                Enter details about the aid distribution
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2 space-x-2'>
                <Label htmlFor='date'>Distribution Date</Label>
                <DatePicker />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='township'>Township</Label>
                <Select required>
                  <SelectTrigger id='township'>
                    <SelectValue placeholder='Select township' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='yangon'>Yangon</SelectItem>
                    <SelectItem value='mandalay'>Mandalay</SelectItem>
                    <SelectItem value='naypyidaw'>Naypyidaw</SelectItem>
                    <SelectItem value='bago'>Bago</SelectItem>
                    <SelectItem value='mawlamyine'>Mawlamyine</SelectItem>
                    <SelectItem value='taunggyi'>Taunggyi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='aid-type'>Aid Type</Label>
                <Select required>
                  <SelectTrigger id='aid-type'>
                    <SelectValue placeholder='Select aid type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='food-kits'>Food Kits</SelectItem>
                    <SelectItem value='educational-materials'>
                      Educational Materials
                    </SelectItem>
                    <SelectItem value='medical-supplies'>
                      Medical Supplies
                    </SelectItem>
                    <SelectItem value='hygiene-kits'>Hygiene Kits</SelectItem>
                    <SelectItem value='shelter-materials'>
                      Shelter Materials
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input id='quantity' type='number' min='1' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='field-worker'>Field Worker</Label>
                <Select required>
                  <SelectTrigger id='field-worker'>
                    <SelectValue placeholder='Select field worker' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='aung-min'>Aung Min</SelectItem>
                    <SelectItem value='thiri-aung'>Thiri Aung</SelectItem>
                    <SelectItem value='kyaw-zaw'>Kyaw Zaw</SelectItem>
                    <SelectItem value='su-su'>Su Su</SelectItem>
                    <SelectItem value='tun-tun'>Tun Tun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='notes'>Notes (Optional)</Label>
                <Textarea
                  id='notes'
                  placeholder='Any additional information about this distribution'
                />
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' asChild>
                <Link href='/'>Cancel</Link>
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Record'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Toaster />
    </div>
  );
}

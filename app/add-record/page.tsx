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
import { useCreateDistributionMutation } from '@/state/api';

export default function AddRecordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [township, setTownship] = useState<string>('');
  const [aidType, setAidType] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [fieldWorker, setFieldWorker] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [createDistribution] = useCreateDistributionMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!date || !township || !aidType || !quantity || !fieldWorker) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }

      const response = await createDistribution({
        date: date,
        townshipId: parseInt(township),
        aidTypeId: parseInt(aidType),
        fieldWorkerId: parseInt(fieldWorker),
        quantity,
        notes,
      }).unwrap();
      console.log(response);

      toast({
        title: 'Record added successfully',
        description: 'The distribution record has been added to the system.',
      });
      if (response) {
        router.push('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add the distribution record.',
        variant: 'destructive',
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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
                <DatePicker onSelect={setDate} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='township'>Township</Label>
                <Select required onValueChange={setTownship}>
                  <SelectTrigger id='township'>
                    <SelectValue placeholder='Select township' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Yangon</SelectItem>
                    <SelectItem value='2'>Mandalay</SelectItem>
                    <SelectItem value='3'>Naypyidaw</SelectItem>
                    <SelectItem value='4'>Bago</SelectItem>
                    <SelectItem value='5'>Mawlamyine</SelectItem>
                    <SelectItem value='6'>Taunggyi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='aid-type'>Aid Type</Label>
                <Select required onValueChange={setAidType}>
                  <SelectTrigger id='aid-type'>
                    <SelectValue placeholder='Select aid type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Food Kits</SelectItem>
                    <SelectItem value='2'>Educational Materials</SelectItem>
                    <SelectItem value='3'>Medical Supplies</SelectItem>
                    <SelectItem value='4'>Hygiene Kits</SelectItem>
                    <SelectItem value='5'>Shelter Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                  id='quantity'
                  type='number'
                  min='1'
                  required
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='field-worker'>Field Worker</Label>
                <Select required onValueChange={setFieldWorker}>
                  <SelectTrigger id='field-worker'>
                    <SelectValue placeholder='Select field worker' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Aung Min</SelectItem>
                    <SelectItem value='2'>Thiri Aung</SelectItem>
                    <SelectItem value='3'>Kyaw Zaw</SelectItem>
                    <SelectItem value='4'>Su Su</SelectItem>
                    <SelectItem value='5'>Tun Tun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='notes'>Notes (Optional)</Label>
                <Textarea
                  id='notes'
                  placeholder='Any additional information about this distribution'
                  onChange={(e) => setNotes(e.target.value)}
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

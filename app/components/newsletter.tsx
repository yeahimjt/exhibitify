'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { handleNewsLetter } from '../helper';
import { useToast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const [emailAddress, setEmailAddress] = useState<string | null>(null);
  const { toast } = useToast();
  const handlerNewsLetter = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await handleNewsLetter(emailAddress);

    if (response) {
      toast({
        title: 'Sign Up Success!',
        description:
          'You will recieve notifications when updates are available.',
      });
    }
  };
  return (
    <form
      className='mt-[90px] flex flex-col justify-between gap-4 lg:flex-row'
      onSubmit={(e) => handlerNewsLetter(e)}
    >
      <span className='-space-y-2'>
        <h5 className='title'>Sign up for our newsletter!</h5>
        <p>Receive updates on new features.</p>
      </span>
      <span className='flex gap-4'>
        <Input
          className='min-w-[300px]'
          required
          type='email'
          placeholder='Enter your email address'
          onChange={(e) => setEmailAddress(e.currentTarget.value)}
        />
        <Button>Sign Up</Button>
      </span>
    </form>
  );
};

export default Newsletter;

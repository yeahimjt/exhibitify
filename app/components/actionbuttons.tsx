'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const ActionButtons = () => {
  // Make it so that when user is focused on input, listen to escape key to close
  const [searchActive, setSearchActive] = useState<boolean>(false);
  return (
    <div className='mb-[20px] flex items-center justify-start gap-[20px] '>
      <Link
        href='/new-post'
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'gap-[5px] text-light-reg-text dark:text-dark-reg-text'
        )}
      >
        <PlusIcon className='w-fit' />
        <p>New Post</p>
      </Link>
      <section className='relative w-full  text-light-reg-text dark:text-dark-reg-text'>
        <Input
          className={`${
            searchActive ? 'w-full' : 'w-[50px]'
          } origin-center transition-all`}
          placeholder='Search by keywords'
          tabIndex={-1}
        />
        <Button
          className={`${
            searchActive ? 'right-0' : 'left-0'
          } absolute top-0 transition-all`}
          variant={'outline'}
          onClick={() => setSearchActive(!searchActive)}
        >
          {searchActive ? <X /> : <Search />}
        </Button>
      </section>
    </div>
  );
};

export default ActionButtons;

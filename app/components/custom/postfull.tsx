'use client';
import { Button } from '@/components/ui/button';
import { Heart, HeartOff, ImageIcon, MessagesSquare, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostFull = () => {
  return (
    <section className='component-style flex w-full gap-[10px]  rounded-[10px] p-8 dark:bg-dark-less-text'>
      <div className='w-[50px]'>
        <User size={42} />
      </div>
      <section className='w-[calc(100%-50px)] space-y-1'>
        <div className='flex w-full justify-between '>
          <div>
            <span className='flex gap-[10px]'>
              <h5 className='font-semibold text-light-subtitle dark:text-dark-subtitle'>
                Jonathan Trevino
              </h5>
              <h4 className='font-light text-light-less-text dark:text-dark-less-text'>
                Today, 4:45 PM
              </h4>
            </span>
            <h5 className='text-light-title dark:text-dark-title'>
              I just finished creating my newest portfolio, need opinions!
            </h5>
          </div>
          <span>
            <Button className='bg-light-subtitle hover:bg-light-title dark:bg-dark-subtitle dark:hover:bg-dark-title'>
              Visit Site
            </Button>
          </span>
        </div>
        <p className=' truncate  text-[14px]'>
          This portfolio was built using Next.js, React.js, Tailwind, and
          Firebase. Looking for valuable insights on what I could possibly add
          to make it any better! This portfolio was built using Next.js,
          React.js, Tailwind, and Firebase. Looking for valuable insights on
          what I could possibly add to make it any better!
        </p>
        <ImageIcon size={128} />
        <span className='flex space-x-4'>
          <button className='group flex items-center space-x-2'>
            <HeartOff className='text-red-500' />
            <h4 className='mt-[2px] text-[14px] group-hover:underline'>
              343 Likes
            </h4>
          </button>
          <button className='group flex items-center space-x-2'>
            <MessagesSquare className='text-light-title dark:text-dark-title' />
            <h4 className='mt-[2px] text-[14px] group-hover:underline'>
              343 Likes
            </h4>
          </button>
        </span>
      </section>
    </section>
  );
};

export default PostFull;

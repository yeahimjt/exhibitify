'use client';

import CategoryButton from '@/app/components/categorybutton';
import PostPreview from '@/app/components/custom/postpreview';
import Footer from '@/app/components/footer';
import NavBar from '@/app/components/navbar';
import { auth } from '@/app/firebase';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <main className=''>
      <NavBar />
      <header className='mt-[142px]'>
        <section className='component-style space-y-4  rounded-[40px] p-8'>
          <h3>Categories</h3>
          <span className='flex w-full flex-wrap justify-center gap-[20px]  pb-[90px] transition-all '>
            <CategoryButton />
            <CategoryButton />
            <CategoryButton />
            <CategoryButton />
            <CategoryButton />
            <CategoryButton />
            <CategoryButton />
            <CategoryButton />
          </span>
        </section>
      </header>
      <div className='component-style mt-[20px] space-y-4 rounded-[40px] p-8'>
        <span className=''>
          <Label>Sort</Label>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Choose Filter' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filters</SelectLabel>
                <SelectItem className='cursor-pointer' value='most_viewed'>
                  Most Viewed
                </SelectItem>
                <SelectItem className='cursor-pointer' value='most_liked'>
                  Most Liked
                </SelectItem>
                <SelectItem className='cursor-pointer' value='least_viewed'>
                  Least Viewed
                </SelectItem>
                <SelectItem className='cursor-pointer' value='reverse'>
                  Bottom -&gt; Top
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <div className=''>
          <PostPreview />
        </div>
      </div>
    </main>
  );
};

export default Page;

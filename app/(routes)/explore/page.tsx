'use client';
import ActionButtons from '@/app/components/actionbuttons';
import CategoryButton from '@/app/components/categorybutton';
import NavBar from '@/app/components/navbar/navbar';
import PostPreviewContainer from '@/app/components/postpreviewcontainer';
import { categories, category } from '@/app/constants';
import { auth } from '@/app/firebase';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  // Default the user to all category on first launch, if they happen to deselect a category initialize as all again
  const [selected, setSelected] = useState<string[]>(['all']);

  return (
    <>
      <NavBar />
      <main className=''>
        <header className='mt-[90px] select-none '>
          {/* <ActionButtons /> */}
          <section className='component-style space-y-4  rounded-[40px] bg-white p-8 dark:bg-dark-accent'>
            <h3>Categories</h3>
            <span className='flex w-full flex-wrap justify-center gap-[20px]   transition-all '>
              {categories.map((item, index) => (
                <CategoryButton
                  selected={selected}
                  setSelected={setSelected}
                  title={item.title}
                  value={item.value}
                  key={index}
                  icon=''
                  postsNum={0}
                />
              ))}
            </span>
          </section>
        </header>
        <PostPreviewContainer type={'general'} category={selected} />
      </main>
    </>
  );
};

export default Page;

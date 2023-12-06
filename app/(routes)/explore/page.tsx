'use client';
import ActionButtons from '@/app/components/actionbuttons';
import CategoryButton from '@/app/components/categorybutton';
import NavBar from '@/app/components/navbar/navbar';
import PostPreviewContainer from '@/app/components/postpreviewcontainer';
import { categories, category } from '@/app/constants';
import { auth } from '@/app/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <>
      <NavBar />
      <main className=''>
        <header className='mt-[90px] select-none '>
          <ActionButtons />
          <section className='component-style space-y-4  rounded-[40px] bg-white p-8 dark:bg-dark-accent'>
            <h3>Categories</h3>
            <span className='flex w-full flex-wrap justify-center gap-[20px]   transition-all '>
              {categories.map((item, index) => (
                <CategoryButton
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
        <PostPreviewContainer type={'general'} />
      </main>
    </>
  );
};

export default Page;

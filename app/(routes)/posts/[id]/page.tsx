import PostFull from '@/app/components/custom/postfull';
import NavBar from '@/app/components/navbar';
import React from 'react';

const page = () => {
  return (
    <main>
      <NavBar />
      <header className='mt-[142px]'>
        <PostFull />
      </header>
    </main>
  );
};

export default page;

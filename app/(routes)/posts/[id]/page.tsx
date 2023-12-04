import PostFull from '@/app/components/custom/postfull';
import NavBar from '@/app/components/navbar/navbar';
import React from 'react';

const page = () => {
  return (
    <>
      <NavBar />
      <main>
        <header className='mt-[90px]'>
          <PostFull />
        </header>
      </main>
    </>
  );
};

export default page;

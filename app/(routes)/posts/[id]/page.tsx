'use client';
import Comments from '@/app/components/commentssection';
import PostFull from '@/app/components/custom/postfull';
import NavBar from '@/app/components/navbar/navbar';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const pathName = usePathname();
  let post_id = pathName.split('/')[2];

  useEffect(() => {
    if (post_id) {
    }
  }, [post_id]);
  return (
    <>
      <NavBar />
      <main>
        <header className='mt-[90px]'>
          <PostFull />
          <Comments post_id={post_id} />
        </header>
      </main>
    </>
  );
};

export default Page;

'use client';
import NavBar from '@/app/components/navbar/navbar';
import PostForm from '@/app/components/postform';
import { Posts } from '@/app/types';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const pathName = usePathname();
  let post_id = pathName.split('/')[2];
  const [post, setPost] = useState<Posts | null>(null);

  useEffect(() => {
    if (post_id) {
      handleGrabPost();
    }
  }, [post_id]);

  async function handleGrabPost() {
    // Route for api call
    let url = '/api/post/get-specific';

    // Call api to retrieve post
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id,
      }),
    });
    if (response) {
      console.log(response);
      const responseData = await response.json();
      setPost(responseData);
    }
  }
  return (
    <>
      <NavBar />
      <main className='mt-[92px] space-y-4'>
        <h5 className='title'>Edit Post</h5>
        <Separator />
        <PostForm post={post} type={'edit'} />
      </main>
    </>
  );
};

export default Page;

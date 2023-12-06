'use client';
import { Posts } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Heart, HeartOff, ImageIcon, MessagesSquare, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PostFull = () => {
  const pathName = usePathname();
  let post_id = pathName.split('/')[2];
  const [post, setPost] = useState<Posts | null>(null);
  async function handleGrabPost() {
    // Route for api call
    let url = '/api/post/get-specific';

    // Build query
    const params = new URLSearchParams();
    params.append('post_id', post_id);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // Call api to retrieve post
    const response = await fetch(url);
    const responseData = await response.json();
    setPost(responseData);
  }
  useEffect(() => {
    if (post_id) {
      handleGrabPost();
    }
  }, [post_id]);

  const handleVisit = () => {
    redirect('');
  };
  return (
    <section className='component-style flex w-full gap-[10px]  rounded-[10px] p-8 dark:bg-dark-accent'>
      {post ? (
        <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-200'>
          <h2>{post.displayName.charAt(0)}</h2>
        </div>
      ) : (
        <Skeleton className='h-[50px] w-[50px] rounded-full' />
      )}

      <section className='w-[calc(100%-50px)] space-y-1'>
        <div className='flex w-full justify-between '>
          <div>
            <span className='flex gap-[10px]'>
              {post ? (
                <h5 className='font-semibold text-light-subtitle dark:text-dark-subtitle'>
                  {post?.displayName}
                </h5>
              ) : (
                <Skeleton className='mb-1 h-[24px] w-64' />
              )}

              <h4 className='font-light text-light-less-text dark:text-dark-less-text'>
                Today, 4:45 PM
              </h4>
            </span>
            {post ? (
              <h5 className='text-light-title dark:text-dark-title'>
                {post?.title}
              </h5>
            ) : (
              <Skeleton className='mb-1 h-[24px] w-full' />
            )}
          </div>
          <span>
            {post ? (
              <a
                href={post.url}
                target='_blank'
                rel='noreferrer'
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'bg-light-subtitle hover:bg-light-title dark:bg-dark-subtitle dark:hover:bg-dark-title'
                )}
              >
                Visit Site
              </a>
            ) : (
              <Button
                disabled
                className='bg-light-subtitle hover:bg-light-title dark:bg-dark-subtitle dark:hover:bg-dark-title'
              >
                Visit Site
              </Button>
            )}
          </span>
        </div>
        {post ? (
          <p className=' truncate  text-[14px]'>{post?.description}</p>
        ) : (
          <Skeleton className='mb-1 h-[20px] w-full' />
        )}
        {post ? (
          <Image
            className='pb-4'
            src={post?.image}
            width={512}
            height={300}
            alt='portfolio image'
          />
        ) : (
          <Skeleton className='h-[300px] w-[512px]' />
        )}
        <span className='flex space-x-4'>
          <button className='group flex items-center space-x-2'>
            <HeartOff className='text-red-500' />
            <h4 className='mt-[2px] text-[14px] group-hover:underline'>
              {post?.likes}
            </h4>
          </button>
          <button className='group flex items-center space-x-2'>
            <MessagesSquare className='text-light-title dark:text-dark-title' />
            <h4 className='mt-[2px] text-[14px] group-hover:underline'>
              {post?.comments.length}
            </h4>
          </button>
        </span>
      </section>
    </section>
  );
};

export default PostFull;

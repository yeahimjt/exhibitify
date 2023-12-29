'use client';

import { auth } from '@/app/firebase';
import { formatTimeSinceUpload } from '@/app/helper';
import { Posts } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Eye, Heart, HeartOff, MessagesSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostMenu from './postmenu';
type AsyncFunctionType = (
  e: React.SyntheticEvent,
  index: number,
  post_id: string
) => Promise<any>;
type PostPreviewProps = {
  type: 'user' | 'general' | 'likes';
  post: Posts;
  handleLike: AsyncFunctionType;
  index: number;
};

const PostPreview = ({ type, post, handleLike, index }: PostPreviewProps) => {
  const [user] = useAuthState(auth);

  return (
    <Link
      href={`/posts/${post.id}`}
      className='flex w-full flex-col gap-[10px] rounded-[10px] border border-light-less-text p-[12px] transition-all hover:border-dark-less-text hover:shadow-md dark:border-dark-less-text dark:bg-dark-accent dark:hover:border-light-less-text  md:flex-row'
    >
      <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-200'>
        <h2>{post.displayName.charAt(0)}</h2>
      </div>
      <section className='w-full space-y-1 md:w-[calc(100%-70px)]'>
        <div className='flex w-full justify-between '>
          <div>
            <span className='flex gap-[10px]'>
              <h5 className='font-semibold text-light-subtitle dark:text-dark-subtitle'>
                {post.displayName}
              </h5>
              <h4 className='font-light text-light-less-text dark:text-dark-less-text'>
                {post && post?.timestamp
                  ? formatTimeSinceUpload(post.timestamp)
                  : ''}
              </h4>
            </span>
            <h5 className='text-light-title dark:text-dark-title'>
              {post.title}
            </h5>
          </div>
          <span className='flex items-center gap-4'>
            <a
              target='_blank'
              rel='noreferrer'
              href={post.url}
              onClick={(e) => e.stopPropagation()}
            >
              <Button className='bg-light-subtitle hover:bg-light-title dark:bg-dark-subtitle dark:hover:bg-dark-title'>
                Visit Site
              </Button>
            </a>
            <PostMenu
              post_id={post.id}
              owner_id={post.owner}
              type={'preview'}
            />
          </span>
        </div>
        <p className=' truncate  text-[14px]'>{post.description}</p>
        <Image
          className='pb-4'
          src={post.image}
          width={512}
          height={300}
          alt='portfolio image'
        />
        <span className=' flex space-x-4'>
          <button
            className='group flex items-center space-x-2'
            onClick={(e) => handleLike(e, index, post.id)}
          >
            {user ? (
              post.likes.includes(user?.uid) ? (
                <Heart className='text-red-500' />
              ) : (
                <HeartOff className='text-red-500' />
              )
            ) : (
              <HeartOff className='text-red-500' />
            )}
            <h4 className='mt-[2px] text-[14px] group-hover:underline'>
              {post.likes.length} Likes
            </h4>
          </button>
          <button className='group flex items-center space-x-2'>
            <MessagesSquare className='text-light-title dark:text-dark-title' />
            <h4 className='mt-[2px] text-[14px] group-hover:underline'>
              {post.comments.length} Comments
            </h4>
          </button>
          {post.owner === user?.uid && (
            <section className='group flex items-center space-x-2'>
              <Eye className='text-light-title dark:text-dark-title' />
              <h4 className='mt-[2px] text-[14px] group-hover:underline'>
                {post.impressions}
              </h4>
            </section>
          )}
        </span>
      </section>
    </Link>
  );
};

export default PostPreview;

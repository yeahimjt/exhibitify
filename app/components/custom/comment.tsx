import { Comments } from '@/app/types';
import { HeartIcon, Reply, UserIcon } from 'lucide-react';
import React from 'react';

interface CommentsProps {
  comment: Comments;
}

const Comment = ({ comment }: CommentsProps) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <section className='flex gap-4'>
        <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-200'>
          <h2>{comment.displayName.charAt(0)}</h2>
        </div>
        <span className='flex flex-col'>
          <h5 className='text-[14px] font-semibold text-light-subtitle dark:text-dark-subtitle'>
            {comment.displayName}
          </h5>
          <p className='text-[12px]'>{comment.comment}</p>
        </span>
      </section>
      {/* <section className='flex gap-4'>
        <HeartIcon />
        <Reply />
      </section> */}
    </div>
  );
};

export default Comment;

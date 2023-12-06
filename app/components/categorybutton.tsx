import { Globe } from 'lucide-react';
import React from 'react';
import { category } from '../constants';

interface CategoryButtonProps {
  title: string;
  value: string;
  postsNum: number;
  icon: string;
}
const CategoryButton = ({
  title,
  value,
  postsNum,
  icon,
}: CategoryButtonProps) => {
  return (
    <button className='flex min-w-full items-center gap-[10px] rounded-[10px] border border-light-less-text p-[12px] transition-all hover:border-dark-less-text hover:shadow-md dark:border-dark-less-text dark:hover:border-light-less-text md:min-w-[216px]'>
      <div className='  h-[47px] w-[47px] rounded-full bg-light-reg-text p-2 dark:bg-dark-reg-text'>
        <Globe size={30} />
      </div>
      <section className='flex flex-col justify-start'>
        <h5 className='text-left text-[14px] font-bold text-light-subtitle dark:text-dark-subtitle'>
          {title}
        </h5>
        <h5 className='text-left text-[14px] text-light-reg-text dark:text-dark-reg-text'>
          406 Posts
        </h5>
      </section>
    </button>
  );
};

export default CategoryButton;

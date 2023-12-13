'use client';
import { Globe } from 'lucide-react';
import React, { Dispatch, useEffect, useState } from 'react';
import { category } from '../constants';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useRefreshStore } from '../states';

interface CategoryButtonProps {
  selected: string[];
  setSelected: Dispatch<string[]>;
  title: string;
  value: string;
  postsNum: number;
  icon: string;
}
const CategoryButton = ({
  selected,
  setSelected,
  title,
  value,
  postsNum,
  icon,
}: CategoryButtonProps) => {
  const [postCount, setPostCount] = useState<number>(0);
  const { refresh, setRefresh } = useRefreshStore((state) => state);
  async function handleCountPosts() {
    try {
      const docCollection = collection(firestore, 'posts');
      let q;
      if (value === 'all') {
        q = query(docCollection);
      } else {
        q = query(docCollection, where('category', 'array-contains', value));
      }
      const docSnap = await getDocs(q);

      if (docSnap.empty) return;

      setPostCount(docSnap.size);
    } catch (error) {}
  }
  useEffect(() => {
    handleCountPosts();
  }, [refresh]);

  return (
    <button
      onClick={() =>
        selected.includes(value) ? setSelected(['all']) : setSelected([value])
      }
      value={value}
      className={`${
        selected.includes(value)
          ? 'border-dark-less-text dark:border-light-less-text'
          : 'border-light-less-text hover:border-dark-less-text hover:shadow-md dark:border-dark-less-text dark:hover:border-light-less-text'
      } flex min-w-full items-center gap-[10px] rounded-[10px]  border p-[12px]  transition-all  hover:shadow-md md:min-w-[216px]`}
    >
      <div className='  h-[47px] w-[47px] rounded-full bg-light-reg-text p-2 dark:bg-dark-reg-text'>
        <Globe size={30} />
      </div>
      <section className='flex flex-col justify-start'>
        <h5 className='text-left text-[14px] font-bold text-light-subtitle dark:text-dark-subtitle'>
          {title}
        </h5>
        <h5 className='text-left text-[14px] text-light-reg-text dark:text-dark-reg-text'>
          {postCount} Posts
        </h5>
      </section>
    </button>
  );
};

export default CategoryButton;

'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import PostPreview from './custom/postpreview';
import { FilterTypes, PostsList } from '../types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useInView } from 'react-intersection-observer';

interface PostPreviewContainerProps {
  type: 'user' | 'general';
  category?: string[];
}

// Handle all functionality for retrieving and displaying posts, with category or filter.

const PostPreviewContainer = ({
  type,
  category,
}: PostPreviewContainerProps) => {
  const [filter, setFilter] = useState<FilterTypes | null>(null);
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<PostsList | null>(null);
  const [offset, setOffset] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>();

  const { ref, inView } = useInView();

  // Update filter
  const handleFilterChange = (value: FilterTypes) => {
    setFilter(value);
  };

  async function handlePosts() {
    let url = '/api/post/get';

    const params = new URLSearchParams();
    if (user?.uid && type === 'user') params.append('user_id', user?.uid);
    if (category && type !== 'user') params.append('category', category[0]);
    if (filter) params.append('filter', filter);
    if (offset) params.append('offset', offset);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.posts?.length > 0) {
      const combinedPosts =
        posts !== null
          ? [...posts, ...responseData.posts]
          : [...responseData.posts];
      await setPosts(combinedPosts);

      setOffset(responseData.lastVisibleId);
    }
  }
  console.log(offset);
  // Handle user selecting a different filter, or category by retrieving its posts.
  useEffect(() => {
    if (!filter && !category) return;
    handlePosts();
  }, [filter, category]);

  useEffect(() => {
    if (inView) {
      handlePosts();
    }
  }, [inView]);
  console.log(posts, offset);
  return (
    <div className='component-style mt-[20px] select-none space-y-4 rounded-[40px] bg-white p-8 dark:bg-dark-accent'>
      <span className='text-light-reg-text dark:text-dark-reg-text'>
        <Label className=''>Sort</Label>
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Choose Filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              <SelectItem className='cursor-pointer' value='most_viewed'>
                Most Viewed
              </SelectItem>
              <SelectItem className='cursor-pointer' value='most_liked'>
                Most Liked
              </SelectItem>
              <SelectItem className='cursor-pointer' value='least_viewed'>
                Least Viewed
              </SelectItem>
              <SelectItem className='cursor-pointer' value='reverse'>
                Bottom -&gt; Top
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
      <div className='flex flex-col gap-8'>
        {posts &&
          posts?.map((post, index) => (
            <PostPreview key={index} post={post} type={type} />
          ))}
      </div>
      {/* Buffer zone */}
      <div className='h-[100px] bg-white/50'></div>
      {/* Loading area */}
      <div ref={ref}>{loading ? 'loading' : ''}</div>
    </div>
  );
};

export default PostPreviewContainer;

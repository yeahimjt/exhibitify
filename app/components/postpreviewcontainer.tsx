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
import { FilterTypes, Posts, PostsList } from '../types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { useInView } from 'react-intersection-observer';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Loader } from 'lucide-react';

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

  // Handle user selecting a different category.
  useEffect(() => {
    setPosts(null);
    setOffset(null);
    handlePosts();
  }, [category]);

  // User has scrolled to end of page, retrieve more posts if possible.
  useEffect(() => {
    if (inView) {
      handlePosts();
    }
  }, [inView]);

  // Update select filter
  const handleFilterChange = (value: FilterTypes) => {
    setFilter(value);
  };

  // Retrieve posts of specific user, category, or filter, increment posts recieved to enable infinite scrolling.
  async function handlePosts() {
    // Initialize loading spinner
    setLoading(true);
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

    setLoading(false);
  }

  // User has clicked like button of a post, handle whether they like it or unlike it and update accordingly
  const handleLike = async (
    e: React.SyntheticEvent,
    index: number,
    post_id: string
  ) => {
    e.preventDefault();
    if (!user || !posts) {
      return;
    }

    const docSnap = doc(firestore, 'posts', post_id);
    const isUserLiked = posts[index].likes.includes(user.uid);

    if (isUserLiked) {
      // Remove user from like array in database
      await updateDoc(docSnap, {
        likes: arrayRemove(user?.uid),
      });
      // Update local posts to remove user
      const updatedLikes = posts[index].likes.filter(
        (userLiked) => userLiked !== user?.uid
      );
      setPosts((prevPosts) => {
        if (prevPosts === null) {
          return prevPosts;
        }
        const updatedPosts = [...prevPosts];
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedLikes };
        return updatedPosts;
      });
    } else {
      // Add user to like array in database
      await updateDoc(docSnap, {
        likes: arrayUnion(user?.uid),
      });
      // Update local posts to add user
      const updatedLikes = [...posts[index].likes, user?.uid];
      setPosts((prevPosts) => {
        if (prevPosts === null) {
          return prevPosts;
        }
        const updatedPosts = [...prevPosts];
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedLikes };
        return updatedPosts;
      });
    }
  };

  return (
    <div className='component-style mb-[40px] mt-[20px] select-none space-y-4 rounded-[40px] bg-white p-8 dark:bg-dark-accent'>
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
            <PostPreview
              key={index}
              post={post}
              type={type}
              index={index}
              handleLike={handleLike}
            />
          ))}
      </div>
      {/* Buffer zone */}
      <div className='h-[100px]'></div>
      {/* Loading area */}
      <div className='flex items-center justify-center' ref={ref}>
        {loading ? (
          <Loader className='animate-spin' />
        ) : (
          <div className='h-[22px] w-full'></div>
        )}
      </div>
    </div>
  );
};

export default PostPreviewContainer;

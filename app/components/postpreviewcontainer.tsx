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
import { useRefreshStore } from '../states';

interface PostPreviewContainerProps {
  type: 'user' | 'general' | 'likes';
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
  const { refresh, setRefresh } = useRefreshStore((state) => state);

  // Handle user selecting a different category.
  useEffect(() => {
    setPosts(null);
    setOffset(null);
  }, [category]);

  useEffect(() => {
    if (posts === null && offset === null) {
      handlePosts();
    }
  }, [posts, offset]);

  useEffect(() => {
    if (refresh) {
      setPosts(null);
      setOffset(null);
      handlePosts();
    }
  }, [refresh]);

  // User has scrolled to end of page, retrieve more posts if possible.
  useEffect(() => {
    if (inView && !refresh) {
      handlePostsInView();
    }
  }, [inView]);

  // Retrieve posts of specific user, category, or filter, increment posts recieved to enable infinite scrolling.
  async function handlePosts() {
    // Initialize loading spinner
    setLoading(true);
    setRefresh(false);
    let url = '/api/post/get';

    const params = new URLSearchParams();
    if (type === 'likes') params.append('type', type);
    if (user?.uid && (type === 'user' || type === 'likes')) {
      params.append('user_id', user?.uid);
    }
    if (category && type !== 'user') params.append('category', category[0]);
    if (filter) params.append('filter', filter);
    if (offset && !refresh) {
      // This is the intial state that is reached when a user selects a new category
      if (inView && !posts) {
      } else {
        params.append('offset', offset);
      }
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.posts?.length > 0) {
        const combinedPosts =
          posts !== null
            ? [...posts, ...responseData.posts]
            : [...responseData.posts];
        setPosts(combinedPosts);

        setOffset(responseData.lastVisibleId);
      } else {
        setPosts([]);
      }
    } catch (error: any) {
      setPosts([]);
    }

    setLoading(false);
  }

  async function handlePostsInView() {
    // Initialize loading spinner
    setLoading(true);
    setRefresh(false);
    let url = '/api/post/get';

    const params = new URLSearchParams();
    if (type === 'likes') params.append('type', type);
    if (user?.uid && (type === 'user' || type === 'likes')) {
      params.append('user_id', user?.uid);
    }
    if (category && type !== 'user') params.append('category', category[0]);
    if (filter) params.append('filter', filter);
    if (offset && !refresh) {
      // This is the intial state that is reached when a user selects a new category
      if (inView && !posts) {
      } else {
        params.append('offset', offset);
      }
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.posts?.length > 0) {
        const combinedPosts =
          posts !== null
            ? [...posts, ...responseData.posts]
            : [...responseData.posts];
        setPosts(combinedPosts);

        setOffset(responseData.lastVisibleId);
      } else {
        // setPosts([]);
      }
    } catch (error: any) {
      setPosts([]);
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

    // If postpreviewcontainer is in liked-posts page, then they can only be unliking a post.
    if (type === 'likes') {
      // Remove user from like array in database
      await updateDoc(docSnap, {
        likes: arrayRemove(user?.uid),
      });

      // Update local posts to remove the entire post
      setPosts((prevPosts) => {
        if (prevPosts === null) {
          return prevPosts;
        }
        const updatedPosts = [...prevPosts];
        updatedPosts.splice(index, 1); // Remove the post at the specified index
        return updatedPosts;
      });
      return;
    }

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
      {type === 'user' ? (
        <h5 className='title mb-4'>My Posts</h5>
      ) : type === 'general' ? (
        ''
      ) : (
        <h5 className='title mb-4'>My Likes</h5>
      )}
      {/* <section className='flex items-end gap-2 text-light-reg-text dark:text-dark-reg-text'>
        <span>
          <Label className=''>Sort</Label>
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={filter ? filter : 'Choose Filter'} />
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
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
      </section> */}
      <div className='flex flex-col gap-8'>
        {posts && posts.length > 0 ? (
          posts?.map((post, index) => (
            <PostPreview
              key={index}
              post={post}
              type={type}
              index={index}
              handleLike={handleLike}
            />
          ))
        ) : !loading ? (
          <p className='text-center'>No posts found</p>
        ) : (
          ''
        )}
      </div>
      {/* Buffer zone */}
      {posts && <div className='h-[100px]'></div>}
      {/* Loading area */}

      <>
        <div className='flex items-center justify-center' ref={ref}>
          {loading && <Loader className='animate-spin' />}
        </div>
      </>
    </div>
  );
};

export default PostPreviewContainer;

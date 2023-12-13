'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';
import Comment from './custom/comment';
import { useCommentRefStore } from '../states';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CommentsList } from '../types';
import { Separator } from '@/components/ui/separator';

interface CommentSectionProps {
  post_id: string;
}

const Comments = ({ post_id }: CommentSectionProps) => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState<CommentsList | null>(null);
  const [userComment, setUserComment] = useState<string | null>(null);

  // Grab focused state to see if user has clicked comment counter
  const { focused, setFocused } = useCommentRefStore((state) => state);
  const inputRef = useRef<HTMLInputElement>(null);

  // If user has clicked comment counter, auto focus to comment input field
  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, inputRef]);

  useEffect(() => {
    handleCommentsInitial();
  }, []);

  async function handleCommentsInitial() {
    // Build api call with search params
    let url = '/api/comment/get';
    const searchParams = new URLSearchParams();
    searchParams.append('post_id', post_id);

    if (searchParams.toString()) {
      url += `?${searchParams.toString()}`;
    }
    console.log(url);
    const response = await fetch(url);
    const responseData = await response.json();
    setComments(responseData.comments);
  }

  async function handleSubmit() {
    console.log('submitting');
    // Create and fetch new comment to append to comment list
    const response = await fetch('/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id,
        user_id: user?.uid,
        imageURL: user?.photoURL,
        displayName: user?.displayName,
        comment: userComment,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    setComments((prevComments) => {
      // If no comments are on the post the user is commenting on, then create a new comments array
      if (!prevComments) return [responseData];

      // Comments already exist, append new comment to end
      const updatedComments = [...prevComments, responseData];
      return updatedComments;
    });
  }
  console.log(comments);
  return (
    <div className='component-style mt-[40px] space-y-4  rounded-[10px] bg-white p-8 dark:bg-dark-accent'>
      <h3>Comments</h3>
      <span className='flex gap-4 pb-4'>
        <Input
          ref={inputRef}
          placeholder='Write a comment...'
          onChange={(e) => setUserComment(e.target.value)}
        />
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </span>
      <section className='space-y-4'>
        {comments?.map((comment, index) => (
          <>
            <Comment key={index} comment={comment} />
            {index === comments.length - 1 ? '' : <Separator />}
          </>
        ))}
        {comments === null ? <p>No comments exist for this post</p> : ''}
      </section>
    </div>
  );
};

export default Comments;

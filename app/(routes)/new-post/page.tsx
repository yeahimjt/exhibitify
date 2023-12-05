'use client';
import AuthRequired from '@/app/components/authrequired';
import Categories from '@/app/components/categories';
import NavBar from '@/app/components/navbar/navbar';
import { auth } from '@/app/firebase';
import { isSafeURL } from '@/app/helper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AlertOctagon, Verified } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
const Page = () => {
  // Check if user is logged in
  const [user, loading, error] = useAuthState(auth);

  // Form states
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [portfolioURL, setPortfolioURL] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<string[]>(['']);
  const [postError, setPostError] = useState<string | null>(null);

  // Router to redirect user
  const router = useRouter();

  // Protect route
  if (!user && !loading) {
    return (
      <>
        <NavBar />
        <main className='mt-[92px]'>
          <AuthRequired />
        </main>
      </>
    );
  }

  // Submit Post
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    // Filter out bad attempts
    if (!verified) {
      setPostError('You are required to validate your portfolio url');
      return;
    } else if (!selected) {
      setPostError('You are required to choose a category');
      return;
    }

    // Create new post in posts collection
    const response = await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        category: selected,
        portfolio_url: portfolioURL,
        portfolio_image: imageURL,
        user_id: user?.uid,
      }),
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
      router.push(`/posts/${responseData.post_id}`);
    } else {
      setPostError('Failed to create post');
    }
  }
  console.log(selected);
  // Validate users portfolio url
  async function validateUrl() {
    if (!portfolioURL) {
      console.log('no url given');
      return;
    }
    setVerified(null);
    setVerifying(true);
    if (isSafeURL(portfolioURL)) {
      const response = await fetch('/api/screenshot-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: portfolioURL,
          user_id: user?.uid,
        }),
      });
      const url = await response.json();
      console.log(url);
      if (url) {
        setVerified(true);
        setVerifying(false);
        setImageURL(url.downloadURL);
      }
    } else {
      setVerified(false);
      setVerifying(false);
    }
  }

  return (
    <>
      <NavBar />
      <main className='mt-[92px] space-y-4'>
        <h5 className='title'>Create Post</h5>
        <Separator />
        <form className='space-y-4' onSubmit={onSubmit}>
          <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
            <Label>Title</Label>
            <Input
              required
              placeholder='Enter title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
            <Label>Description</Label>
            <Textarea
              required
              placeholder='Enter description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
            <Label>Category</Label>
            <Categories selected={selected} setSelected={setSelected} />
          </div>

          <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
            <Label>Portfolio URL</Label>
            <span className='flex gap-4'>
              <Input
                required
                disabled={verified ? true : false}
                placeholder='Enter portfolio url'
                onChange={(e) => setPortfolioURL(e.target.value)}
              />
              <Button
                type='button'
                className='bg-light-subtitle hover:bg-light-title dark:bg-dark-subtitle dark:hover:bg-dark-title'
                disabled={
                  portfolioURL && !verifying && !verified ? false : true
                }
                onClick={() => validateUrl()}
              >
                {verifying ? 'Verifying...' : 'Validate URL'}
              </Button>
            </span>
            {verified !== null ? (
              verified === true ? (
                <span className='flex gap-2 text-green-500'>
                  <Verified />
                  <p>Your portfolio url has been validated</p>
                </span>
              ) : (
                <span className='flex gap-2 text-red-500'>
                  <AlertOctagon />
                  <p>Your portfolio could not be validated</p>
                </span>
              )
            ) : (
              ''
            )}
          </div>
          <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
            <Label>Portfolio Image</Label>
            {imageURL ? (
              <Image
                src={imageURL}
                width={512}
                height={300}
                alt='portfolio image'
              />
            ) : (
              <section className='h-[300px] w-[512px] border bg-white dark:bg-dark-accent'></section>
            )}
          </div>
          {postError ? (
            <h5 className='text-center text-red-500'>{postError}</h5>
          ) : (
            <div className='h-[24px]'></div>
          )}
          <div className='flex justify-end'>
            <Button
              variant='default'
              className='bg-my-accent text-dark-title hover:bg-my-accent/90 dark:text-dark-title'
            >
              Submit Post
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Page;

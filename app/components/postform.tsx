import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { isSafeURL } from '../helper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Categories from './categories';
import { Button } from '@/components/ui/button';
import { AlertOctagon, Verified } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { Posts } from '../types';
import { POST } from '../api/screenshot-website/route';

interface PostFormProps {
  type: 'new' | 'edit';
  post?: Posts | null;
}

const PostForm = ({ type, post }: PostFormProps) => {
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

  const { toast } = useToast();

  // Submit Post
  async function onSubmitNew(event: React.SyntheticEvent) {
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
        display_name: user?.displayName,
        user_id: user?.uid,
        photoURL: user?.photoURL,
      }),
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
      toast({
        title: 'Post Created',
        description: 'Viewable by others now.',
      });
      router.push(`/posts/${responseData.post_id}`);
    } else {
      setPostError('Failed to create post');
    }
  }

  async function onSubmitEdit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!selected) {
      setPostError('You are required to choose a category.');
    }

    // Update post in posts collection
    const response = await fetch('/api/post/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: post?.id,
        title,
        description,
        category: selected,
        portfolio_url: portfolioURL,
        portfolio_image: imageURL,
        user_id: user?.uid,
        display_name: user?.displayName,
      }),
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
      toast({
        title: 'Post Updated',
        description: 'Viewable by others now.',
      });
      router.push(`/posts/${responseData.post_id}`);
    } else {
      setPostError('Failed to create post');
    }
  }

  // Validate users portfolio url
  async function validateUrl() {
    if (!portfolioURL) {
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

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setPortfolioURL(post.url);
      setVerified(post.url ? true : false);
      setImageURL(post.image);
      setSelected(post.category);
    }
  }, [post]);

  return (
    <form
      className='space-y-4'
      onSubmit={(e) => (type === 'new' ? onSubmitNew(e) : onSubmitEdit(e))}
    >
      <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
        <Label>Title</Label>
        <Input
          required={!post ? true : false}
          placeholder={post?.title || 'Enter title'}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='space-y-1 text-light-subtitle dark:text-dark-subtitle'>
        <Label>Description</Label>
        <Textarea
          required={!post ? true : false}
          placeholder={post?.description || 'Enter description'}
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
            required={!post ? true : false}
            disabled={post?.url ? true : verified ? true : false}
            placeholder={post?.url ? post?.url : 'Enter portfolio url'}
            onChange={(e) => setPortfolioURL(e.target.value)}
          />
          <Button
            type='button'
            className='bg-light-subtitle hover:bg-light-title dark:bg-dark-subtitle dark:hover:bg-dark-title'
            disabled={portfolioURL && !verifying && !verified ? false : true}
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
  );
};

export default PostForm;

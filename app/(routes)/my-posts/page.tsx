import PostPreview from '@/app/components/custom/postpreview';
import NavBar from '@/app/components/navbar/navbar';
import PostPreviewContainer from '@/app/components/postpreviewcontainer';
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
import { Separator } from '@/components/ui/separator';
import React from 'react';

const page = () => {
  return (
    <>
      <NavBar />
      <main className='mb-[40px] mt-[94px] space-y-4'>
        <h5 className='title'>My Posts</h5>
        <Separator />
        <PostPreviewContainer type={'user'} />
      </main>
    </>
  );
};

export default page;

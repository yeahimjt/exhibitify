'use effect';
import { auth } from '@/app/firebase';
import { handleReport } from '@/app/helper';
import { useRefreshStore } from '@/app/states';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

import { AlertTriangle, Delete, Edit, MoreVertical, Trash } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { Dispatch } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface PostMenuProps {
  post_id: string;
  owner_id: string;
  type: 'preview' | 'full';
}
const PostMenu = ({ post_id, owner_id, type }: PostMenuProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const { toast } = useToast();
  const { setRefresh } = useRefreshStore((state) => state);
  const handleDelete = async () => {
    const url = `/api/post/delete`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post_id,
          user_id: user!.uid,
        }),
      });
      if (response) {
        toast({
          title: 'Post deleted successfully',
          description: 'This action was permanent.',
        });
        setRefresh(true);
      }
      if (type === 'full') {
        router.push('/');
      }
    } catch (error) {
      return;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='cursor-pointer select-none text-light-reg-text hover:text-light-title'
        asChild
      >
        <MoreVertical size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[159px]'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.uid === owner_id && (
          <>
            <DropdownMenuItem
              className='cursor-pointer space-x-2'
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/edit-post/${post_id}`);
              }}
            >
              <Edit size={20} />
              <h5>Edit Post</h5>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer space-x-2 text-red-500'
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Trash size={20} />
              <h5>Delete Post</h5>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className='w-full cursor-default space-x-2 text-orange-500'
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle size={20} />
            <h5>Report Post</h5>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='space-y-1'>
              <DropdownMenuItem
                className='cursor-pointer space-x-2 text-red-500'
                onClick={(e) =>
                  handleReport(e, 'not_appropriate', post_id, user?.uid)
                }
              >
                <h5>Not appropriate</h5>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer space-x-2 text-red-500'
                onClick={(e) =>
                  handleReport(e, 'spam_content', post_id, user?.uid)
                }
              >
                <h5>Spam Content</h5>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;

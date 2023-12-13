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
  comment_id: string;
}
const CommentMenu = ({ comment_id }: PostMenuProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const { toast } = useToast();
  const { setRefresh } = useRefreshStore((state) => state);

  const handleReport = async (e: React.SyntheticEvent, report_type: string) => {
    e.preventDefault();
    const url = `/api/comment/report`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: comment_id,
          report_type,
          user_id: user!.uid,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        toast({
          title: 'Comment successfully reported',
          description: 'We will look into it immediately',
        });
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
      <DropdownMenuContent className='w-[200px]'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className='w-full cursor-default space-x-2 text-orange-500'
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle size={20} />
            <h5>Report Comment</h5>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='space-y-1'>
              <DropdownMenuItem
                className='cursor-pointer space-x-2 text-red-500'
                onClick={(e) => handleReport(e, 'not_appropriate')}
              >
                <h5>Not appropriate</h5>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer space-x-2 text-red-500'
                onClick={(e) => handleReport(e, 'spam_content')}
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

export default CommentMenu;

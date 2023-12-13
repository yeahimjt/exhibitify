import { firestore } from '@/app/firebase';
import { CommentsList } from '@/app/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const post_id = req.nextUrl.searchParams.get('post_id');
  if (!post_id) {
    return NextResponse.json({ comments: null }, { status: 400 });
  }
  try {
    const q = query(
      collection(firestore, 'comments'),
      where('post_id', '==', post_id)
    );

    const postsCommentsSnap = await getDocs(q);

    if (postsCommentsSnap.empty) {
      return NextResponse.json({ comments: null }, { status: 400 });
    }

    const postsComments: CommentsList = [];
    postsCommentsSnap.docs.forEach((comment) =>
      postsComments.push({
        imageURL: comment.data().imageURL,
        comment: comment.data().comment,
        displayName: comment.data().displayName,
        owner: comment.data().owner,
        likes: comment.data().likes,
        id: comment.id,
      })
    );

    return NextResponse.json({ comments: postsComments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ comments: null }, { status: 400 });
  }
}

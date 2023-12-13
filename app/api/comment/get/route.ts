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
    console.log('in post_id not sent');
    return NextResponse.json({ comments: null }, { status: 400 });
  }
  try {
    const q = query(
      collection(firestore, 'comments'),
      where('post_id', '==', post_id)
    );

    const postsCommentsSnap = await getDocs(q);

    if (postsCommentsSnap.empty) {
      console.log(' in empty');
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
    console.log(postsComments);
    return NextResponse.json({ comments: postsComments }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ comments: null }, { status: 400 });
  }
}

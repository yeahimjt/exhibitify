import { firestore } from '@/app/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const {
    title,
    description,
    category,
    portfolio_url,
    portfolio_image,
    user_id,
    display_name,
  } = await req.json();
  const postsCollection = collection(firestore, 'posts');
  try {
    // Create new post
    const postDocSnap = await addDoc(postsCollection, {
      title,
      description,
      category,
      url: portfolio_url,
      image: portfolio_image,
      owner: user_id,
      displayName: display_name,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });

    // Update post to include post id for future reference
    const createdDoc = doc(firestore, 'posts', postDocSnap.id);
    await updateDoc(createdDoc, { id: postDocSnap.id });
    return NextResponse.json(
      { status: 'success', post_id: postDocSnap.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { status: 'failed', post_id: null },
      { status: 400 }
    );
  }
}

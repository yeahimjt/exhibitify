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
    post_id,
    title,
    description,
    category,
    portfolio_url,
    portfolio_image,
    user_id,
    display_name,
  } = await req.json();
  const postsCollection = doc(firestore, 'posts', post_id);
  try {
    // Create new post
    const postDocSnap = await updateDoc(postsCollection, {
      title,
      description,
      category,
      url: portfolio_url,
      image: portfolio_image,
      owner: user_id,
      displayName: display_name,
    });
    console.log(postDocSnap);
    return NextResponse.json(
      { status: 'success', post_id: post_id },
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

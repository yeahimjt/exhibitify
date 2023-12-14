// Import the required functions from both 'firebase' and 'firebase-admin'
import { firestore } from '@/app/firebase'; // Assuming 'clientFirestore' is your client-side Firestore instance
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
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

  const postsCollection = collection(firestore, 'posts'); // Use client-side Firestore instance
  console.log(
    title,
    description,
    category,
    portfolio_url,
    portfolio_image,
    user_id,
    display_name
  );
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
      impressions: 0,
    });

    // Update post to include post id for future reference
    const createdDoc = doc(firestore, 'posts', postDocSnap.id);
    await updateDoc(createdDoc, { id: postDocSnap.id });

    const mailCollection = collection(firestore, 'mail');
    const addMail = addDoc(mailCollection, {
      to: ['exhibitify@gmail.com'],
      message: {
        subject: 'Someone has created an account!',
        html: 'Congratulations!',
      },
    });

    return NextResponse.json(
      { status: 'success', post_id: postDocSnap.id },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 'failed', post_id: null },
      { status: 400 }
    );
  }
}

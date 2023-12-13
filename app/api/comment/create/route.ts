import { firestore } from '@/app/firebase';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { post_id, user_id, imageURL, displayName, comment } = await req.json();
  try {
    const commentDoc = collection(firestore, 'comments');
    const commentDocRef = await addDoc(commentDoc, {
      post_id,
      user_id,
      url: imageURL,
      displayName,
      comment,
    });

    const commentDocSnap = await getDoc(commentDocRef);

    if (!commentDocSnap.exists) return NextResponse.json({ status: 400 });

    return NextResponse.json(commentDocSnap.data(), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
}

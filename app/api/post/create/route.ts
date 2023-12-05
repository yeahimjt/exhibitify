import { firestore } from '@/app/firebase';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const {
    title,
    description,
    category,
    portfolio_url,
    portfolio_image,
    user_id,
  } = await req.json();
  const postsCollection = collection(firestore, 'posts');
  try {
    const postDocSnap = await addDoc(postsCollection, {
      title,
      description,
      category,
      url: portfolio_url,
      image: portfolio_image,
      owner: user_id,
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

import { firestore } from '@/app/firebase';
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
  if (!post_id)
    return NextResponse.json({ message: 'failed' }, { status: 400 });
  try {
    const postDoc = doc(firestore, 'posts', post_id);
    const postDocSnap = await getDoc(postDoc);
    if (!postDocSnap.exists() || !postDocSnap.data()) {
      return NextResponse.json({ message: 'failed' }, { status: 400 });
    }
    console.log(postDocSnap.data());
    return NextResponse.json(postDocSnap.data(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'failed' }, { status: 400 });
  }
}

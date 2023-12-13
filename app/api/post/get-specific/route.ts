import { firestore } from '@/app/firebase';
import { hasImpressionCookie, setImpressionCookie } from '@/app/cookie';
import { cookies } from 'next/headers';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { NextResponse, NextRequest } from 'next/server';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export async function POST(req: NextRequest) {
  const { post_id } = await req.json();
  if (!post_id)
    return NextResponse.json({ message: 'failed' }, { status: 400 });
  try {
    const postDoc = doc(firestore, 'posts', post_id);
    const postDocSnap = await getDoc(postDoc);
    if (!postDocSnap.exists() || !postDocSnap.data()) {
      return NextResponse.json({ message: 'failed' }, { status: 400 });
    }

    const hasImpressionCookie =
      getCookie(`impression_${post_id}`, { cookies }) === 'true';
    if (!hasImpressionCookie) {
      await updateDoc(postDoc, {
        impressions: postDocSnap.data().impressions + 1,
      });
      setCookie(`impression_${post_id}`, 'true', { cookies });
    }

    return NextResponse.json(postDocSnap.data(), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'failed' }, { status: 400 });
  }
}

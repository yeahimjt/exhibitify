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
  const type = req.nextUrl.searchParams.get('type');
  const user_id = req.nextUrl.searchParams.get('user_id');
  const category = req.nextUrl.searchParams.get('category');
  const offset = req.nextUrl.searchParams.get('offset');
  const filter = req.nextUrl.searchParams.get('filter');
  const limitNum = 2;
  const conditions = [];

  if (offset) {
    const lastDoc = doc(firestore, 'posts', offset);
    const lastDocSnap = await getDoc(lastDoc);
    if (!lastDocSnap || !lastDocSnap.data()) return;
    conditions.push(orderBy('id'), startAfter(lastDocSnap.data()!.id));
  }

  if (user_id && type !== 'likes') {
    conditions.push(where('owner', '==', user_id));
  }
  if (category && category !== 'all') {
    conditions.push(where('category', 'array-contains', category));
  }

  if (type === 'likes') {
    conditions.push(where('likes', 'array-contains', user_id));
  }

  try {
    let q;
    if (conditions.length > 0) {
      q = query(collection(firestore, 'posts'), ...conditions, limit(limitNum));
    } else {
      q = query(collection(firestore, 'posts'), limit(limitNum));
    }
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }
    const posts: any = [];

    const nextLastVisibleId = snapshot.docs[snapshot.docs.length - 1].id;

    snapshot.docs.forEach((doc) => {
      // Send id to for each post, both for redirecting user, and tracking the last post sent
      posts.push(doc.data());
    });
    return NextResponse.json(
      { posts, lastVisibleId: nextLastVisibleId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ posts: [] }, { status: 400 });
  }
}

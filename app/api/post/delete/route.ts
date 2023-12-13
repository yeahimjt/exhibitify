import { firestore } from '@/app/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { post_id, user_id } = await req.json();

  if (!post_id || !user_id) return NextResponse.json({ status: 400 });

  try {
    const postDoc = doc(firestore, 'posts', post_id);
    await deleteDoc(postDoc);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}

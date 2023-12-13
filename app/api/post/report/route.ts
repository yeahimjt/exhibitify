import { firestore } from '@/app/firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { user_id, report_type, post_id } = await req.json();
  if (!user_id) return;
  // Check if user has already submitted a report for this post
  const reportDoc = query(
    collection(firestore, 'reports_posts'),
    where('post_id', '==', post_id)
  );

  const reportDocSnap = await getDocs(reportDoc);

  // If reports for post are empty user has not sent one yet
  if (reportDocSnap.empty) {
    const reportsCollection = collection(firestore, 'reports_posts');
    try {
      const reportsDocSnap = await addDoc(reportsCollection, {
        report_type,
        user_id: arrayUnion(user_id),
        post_id,
        handled: false,
      });
      const mailCollection = collection(firestore, 'mail');
      await addDoc(mailCollection, {
        to: ['exhibitify@gmail.com'],
        message: {
          subject: 'Post has been reported!',
          html: `${post_id} has been reported as ${report_type}.`,
        },
      });
      return NextResponse.json({ status: true });
    } catch (error) {
      return NextResponse.json({ status: false });
    }
  }
  // Check if user has already sent a report for this post
  else if (reportDocSnap.docs[0].data().user_id.includes(user_id)) {
    return NextResponse.json({ status: false });
  }

  const reportsCollection = collection(firestore, 'reports_posts');
  try {
    //
    const reportsDocSnap = await addDoc(reportsCollection, {
      report_type,
      user_id: arrayUnion(user_id),
      post_id,
      handled: false,
    });
    const mailCollection = collection(firestore, 'mail');
    await addDoc(mailCollection, {
      to: ['exhibitify@gmail.com'],
      message: {
        subject: 'Post has been reported!',
        html: `${post_id} has been reported as ${report_type}.`,
      },
    });
    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ status: false });
  }
}

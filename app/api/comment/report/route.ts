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
  const { comment_id, report_type, user_id } = await req.json();
  if (!user_id) return;
  // Check if user has already submitted a report for this post
  const commentDoc = query(
    collection(firestore, 'reports_comments'),
    where('post_id', '==', comment_id)
  );

  const reportDocSnap = await getDocs(commentDoc);

  // If reports for post are empty user has not sent one yet
  if (reportDocSnap.empty) {
    const reportsCollection = collection(firestore, 'reports_comments');
    try {
      const reportsDocSnap = await addDoc(reportsCollection, {
        report_type,
        user_id: arrayUnion(user_id),
        comment_id,
        handled: false,
      });
      const mailCollection = collection(firestore, 'mail');
      await addDoc(mailCollection, {
        to: ['exhibitify@gmail.com'],
        message: {
          subject: 'Comment has been reported!',
          html: `${comment_id} has been reported as ${report_type}.`,
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
      comment_id,
      handled: false,
    });
    const mailCollection = collection(firestore, 'mail');
    await addDoc(mailCollection, {
      to: ['yeahimjt@gmail.com'],
      message: {
        subject: 'Comment has been reported!',
        html: `${comment_id} has been reported as ${report_type}.`,
      },
    });
    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ status: false });
  }
}

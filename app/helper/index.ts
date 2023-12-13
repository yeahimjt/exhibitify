import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { Timestamp } from 'firebase/firestore';

// Handling validation for users portfolio url
function isValidURL(url: string): boolean {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

function containsMaliciousContent(url: string): boolean {
  const maliciousPatterns = /(porn|sex|maliciousword1|maliciousword2)/i;
  return maliciousPatterns.test(url);
}

export function isSafeURL(url: string): boolean {
  return isValidURL(url) && !containsMaliciousContent(url);
}

// Handling Timestamp output

type TimeSinceUpload =
  | 'just now'
  | '1 minute ago'
  | `${number} minutes ago`
  | '1 hour ago'
  | `${number} hours ago'`
  | string;

export function formatTimeSinceUpload(
  timestamp: Timestamp | null
): TimeSinceUpload {
  if (!timestamp) {
    return ''; // Handle the case where timestamp is null or undefined
  }

  const now = new Date();
  const timestampDate = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const elapsedMilliseconds = now.getTime() - timestampDate.getTime();
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));

  if (elapsedMinutes < 1) {
    return 'just now';
  } else if (elapsedMinutes === 1) {
    return '1 minute ago';
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedHours === 1) {
    return '1 hour ago';
  } else if (elapsedHours < 24) {
    // Between 24 and 168 hours (1 week), show the day and time
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    };
    return timestampDate.toLocaleDateString('en-US', options);
  } else {
    // After a week, show the date in 'yy/mm/dd' format
    const year = timestampDate.getFullYear() % 100; // Get the last two digits of the year
    const month = timestampDate.getMonth() + 1; // Month is zero-based
    const day = timestampDate.getDate();
    return `${day}/${month}/${year}`;
  }
}

// Handling updating users profile (name, picture)
export async function updateUserProfile(
  name: string | null,
  picture: string | null,
  user_id: string
) {
  const userDoc = doc(firestore, 'users', user_id);

  // Get user document data to get their current name/photo.
  // If one of the fields is not updated use current data

  try {
    const usersData = await getDoc(userDoc);

    if (!usersData.exists()) return;
    await updateDoc(userDoc, {
      displayName: name ? name : usersData.data().displayName,
      photoURL: picture ? picture : usersData.data().photoURL,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Report function handler
export async function handleReport(
  e: React.SyntheticEvent,
  report_type: string,
  post_id: string,
  user_id?: string
) {
  e.stopPropagation();
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

      return true;
    } catch (error) {
      return false;
    }
  }
  // Check if user has already sent a report for this post
  else if (reportDocSnap.docs[0].data().user_id.includes(user_id)) {
    return;
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

    return true;
  } catch (error) {
    return;
  }
}

export async function handleNewsLetter(email_address: string | null) {
  if (!email_address) return;

  try {
    const newsLetterCollection = query(
      collection(firestore, 'newsletter'),
      where('users', 'array-contains', 'yeahimjt@gmail.com')
    );
    const newsLetterCollectionSnap = await getDocs(newsLetterCollection);
    if (newsLetterCollectionSnap.empty) return;

    const newsletterDoc = doc(
      firestore,
      'newsletter',
      newsLetterCollectionSnap.docs[0].id
    );
    const newsLetterSnap = await updateDoc(newsletterDoc, {
      users: arrayUnion(email_address),
    });
    return true;
  } catch (error) {
    return;
  }
}

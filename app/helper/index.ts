import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

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

// Handling updating users profile (name, picture)
export async function updateUserProfile(
  name: string | null,
  picture: string | null,
  user_id: string
) {
  const userDoc = doc(firestore, 'users', user_id);
  console.log(' in here');
  // Get user document data to get their current name/photo.
  // If one of the fields is not updated use current data
  console.log('name in here:', name);
  try {
    const usersData = await getDoc(userDoc);
    console.log('userDocData: ', usersData.data());
    if (!usersData.exists()) return;
    await updateDoc(userDoc, {
      displayName: name ? name : usersData.data().displayName,
      photoURL: picture ? picture : usersData.data().photoURL,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

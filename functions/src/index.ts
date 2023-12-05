import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    const { uid, email, displayName, photoURL } = user;

    // Define additional properties
    // const userData = {
    //   // Add other necessary data
    // };

    // Merge the extracted user data with additional properties
    const userWithAdditionalData = {
      uid,
      email,
      displayName,
      photoURL,
      //   ...userData,
    };
    db.collection('users').doc(user.uid).set(userWithAdditionalData);
  });
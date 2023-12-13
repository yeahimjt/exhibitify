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

export const sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  db.collection('mail').add({
    to: user.email,
    message: {
      subject: 'Welcome to exhibitify!',
      html: `
      Hey ${user.displayName || ''}!
      
      This is the only email you will receive unless you sign up to our newsletter.
      Thank you for signing up.
      `,
    },
  });
});

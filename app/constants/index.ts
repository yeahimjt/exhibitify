// Used for filtering categories
export const categories = [
  { value: 'all', title: 'All' },
  { value: 'software_engineer', title: 'Software Engineer' },
  { value: 'fullstack_developer', title: 'Full Stack Developer' },
  { value: 'frontend_developer', title: 'Front End Developer' },
  { value: 'backend_developer', title: 'Back End Developer' },
  { value: 'uiux_developer', title: 'UI/UX Developer' },
  { value: 'product_designer', title: 'Product Designer' },
];

// Used for posts
export const category = [
  { value: 'software_engineer', title: 'Software Engineer' },
  { value: 'fullstack_developer', title: 'Full Stack Developer' },
  { value: 'frontend_developer', title: 'Front End Developer' },
  { value: 'backend_developer', title: 'Back End Developer' },
  { value: 'uiux_developer', title: 'UI/UX Developer' },
  { value: 'product_designer', title: 'Product Designer' },
];

export const FIREBASE_ERRORS = [
  {
    code: 'auth/email-already-in-use',
    title: 'This email address is already in use.',
    description: 'Try another, or contact support.',
  },
  {
    code: 'auth/invalid-email',
    title: 'Email address not valid.',
    description: 'Format must be example@gmail.com',
  },
  {
    code: 'auth/operation-not-allowed',
    title: 'Email authentication has not been permitted.',
    description: 'Contact support.',
  },
  {
    code: 'auth/weak-password',
    title: 'This password is not strong enough.',
    description: 'Password must be at least 6 characters.',
  },
  {
    code: 'auth/user-disabled',
    title: 'This account has been disabled.',
    descrpition: 'Contact support.',
  },
  {
    code: 'auth/user-not-found',
    title: 'No account corresponds to this email.',
    description: 'Try another, or contact support.',
  },
  {
    code: 'auth/invalid-credential',
    title: 'Password incorrect.',
    description: 'Verify this password is correct.',
  },
  {
    code: 'auth/wrong-password',
    title: 'Password incorrect.',
    description: 'Verify this password is correct.',
  },
];

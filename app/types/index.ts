export type FilterTypes =
  | 'most_viewed'
  | 'most_liked'
  | 'least_viewed'
  | 'reverse';

export type Posts = {
  category: string[];
  description: string;
  image: string;
  owner: string;
  title: string;
  url: string;
  displayName: string;
  comments: string[];
  likes: number;
  timestamp: FirebaseFirestore.Timestamp;
  id: string;
  photoURL: string;
};

export type PostsList = Posts[];

import { Timestamp } from 'firebase/firestore';

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
  likes: string[];
  timestamp: Timestamp | null;
  id: string;
  photoURL: string;
  impressions: number;
};

export type PostsList = Posts[];

export type Comments = {
  imageURL: string;
  comment: string;
  displayName: string;
  owner: string;
  likes: string[];
  id: string;
};

export type CommentsList = Comments[];

import { Posts } from './post.entity';

export interface CreatePostResponse {
  id: number;
  message: string;
}

export interface SearchPostResponse {
  posts: Posts[];
}

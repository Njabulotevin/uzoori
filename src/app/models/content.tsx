import { IpublicUser } from "./user";

export interface iComment {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  message: string;
  user: IpublicUser;
  userId: string;
  post: any | null;
  postId: string;
  commentId: string;
  hasComments: boolean;
  commentLikeCount: number;
  commentLike: any | null;
}

import { IpublicUser } from "./user";

export enum InotificationType {
  FOLLOW_NOTIFICATION = "follow",
  LIKE_NOTIFICATION = "like",
  COMMENT_NOTIFICATION = "comment",
  ORDER_NOTIFICATION = "order",
  ASSISTANT_NOTIFICATION = "assistant",
  COMMENT_LIKE_NOTIFICATION = "comment_like",
}

export interface Inotification {
  id: string;
  createdAt: number;
  message: string;
  user: IpublicUser;
  userId: string;
  seen: boolean;
  notificationType: InotificationType;
}

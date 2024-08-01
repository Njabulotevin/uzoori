import { iComment } from "@/app/models/content";
import { iPost } from "@/app/models/user";
import { atom } from "jotai";

export type userCommentType = { postId: string; comment: string };

export interface ImediaPost {
  post: iPost;
  comments: iComment[];
}

export const isPostViewOnAtom = atom<boolean>(false);
export const mediaPostsAtom = atom<ImediaPost[]>([]);
export const isCommentsOnAtom = atom<boolean>(false);
export const activePostAtom = atom<iPost | null>(null);
export const userCommentAtom = atom<userCommentType[]>([]);

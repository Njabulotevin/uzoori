import { Iproduct } from "./product";

export interface Iuser {
  username: string;
  name: string;
  email: string;
  accountType: "general";
  password?: string;
  confirmPassword?: string;
  description: string;
  displayImageUrl?: string;
  [key: string]: unknown;
}

export interface ImerchantUser {
  id: string;
  username: string;
  name: string;
  email: string;
  accountType: "merchant" | "general" | "assistant";
  password?: string;
  confirmPassword?: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: number;
  province: string;
  category: string;
  description: string;
  country: "south africa";
  firstContactNumber: string;
  secondContactNumber: string;
  weekdayStart: number;
  weekdayEnd: number;
  saturdayStart: number;
  saturdayEnd: number;
  sundayStart: number;
  sundayEnd: number;
  displayImageUrl?: string;
  [key: string]: unknown;
}

export interface IassistantUser {
  username: string;
  name: string;
  email: string;
  accountType: "assistant";
  password: string;
  confirmPassword: string;
  category: string;
  description: string;
  [key: string]: unknown;
}

export interface iProduct {
  id: string;
  name: string;
  price: number;
  productType: string;
}

export interface IpublicUser {
  accountType: "merchant" | "general" | "assistant";
  id: string;
  name: string;
  displayImageUrl: string;
  username: string;
  description?: string;
  followerCount?: number;
  followingCount?: number;
  followId?: string;
}

export interface iPostProduct {
  id: string;
  postId: string;
  product: Partial<Iproduct>;
}

export interface iPost {
  id: string;
  media: string[];
  message: string;
  postProduct: iPostProduct;
  user: IpublicUser;
  createdAt: number;
  productType: "AS" | "UG";
  like: { postId: string; userId: string } | null;
  likeCount: number;
}

export interface getAssistantsResponse {
  data: Array<{
    id: string;
    createdAt: number;
    updatedAt: number;
    deletedAt: null;
    productId: string;
    user: IpublicUser;
    userId: string;
  }>;
  status: string;
}

export type accountTypes = "merchant" | "assistant" | "general";

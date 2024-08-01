import { IpublicUser } from "./user";

export type productImgType = {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: null;
  product: null;
  productId: string;
  imageUrl: string;
  [key: string]: unknown;
};

export interface Iproduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  currency: string;
  collectionType: string;
  description: string;
  available: boolean;
  estimatedTime: number;
  productImage: Partial<productImgType>[];
  productUser?: { id: string; user: IpublicUser }[];
  productType: string;
  [key: string]: unknown;
}

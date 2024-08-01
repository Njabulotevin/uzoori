import { Iproduct } from "./product";
import { ImerchantUser, IpublicUser } from "./user";

export interface iPublicMerchant extends IpublicUser {
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  postalCode: number;
}

export interface ProductImage {
  id: string;
  deletedAt: number | null;
  product: any;
  productId: string;
  imageUrl: string;
}

export interface Product extends Iproduct {
  assistant: IpublicUser;
  estimatedTime: number;
}

export interface iEvent {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  orderId: string;
  merchant: iPublicMerchant;
  merchantId: string;
  product: Product;
  productId: string;
  assistant: IpublicUser | null;
  assistantId: string;
  userId: string;
  user: IpublicUser;
  date: number;
  timeStart: number;
  timeEnd: number;
  price: number;
  exchangeRate: number;
  quantity: number;
  Affiliate: string;
  AffiliateAmount: number;
}

export interface Response<T> {
  data: T;
  status: string;
}

export interface OrderProduct {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  orderId: string;
  merchant: iPublicMerchant | null;
  merchantId: string;
  product: Product;
  productId: string;
  assistant: IpublicUser | null;
  assistantId: string;
  userId: string;
  date: number;
  timeStart: number;
  timeEnd: number;
  price: number;
  exchangeRate: number;
  quantity: number;
  Affiliate: string;
  AffiliateAmount: number;
}

export interface Order {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  price: number;
  payment: string;
  status: string;
  orderType: "AS" | "UG" | "UST";
  userId: string;
  merchantId: string;
  date: number;
  timeStart: number;
  timeEnd: number;
  orderProduct: OrderProduct[];
  user: IpublicUser;
  merchant: iPublicMerchant;
  pin: number;
}

import { Iproduct } from "@/app/models/product";

export interface ProductType {
  id?: string;
  ids?: string[];
  userId?: string;
  name: string;
  price: number;
  originalPrice: number;
  collectionType?: string;
  currency: string;
  available: boolean;
  description: string;
  estimatedTime: number;
  productImage: string[]; //  on receive array of object |
  productType: string;
}

export interface ProductsResponseType {
  data?: ProductType[] | ProductType | string | Iproduct[]; //* issue_65 array of products, single product, or string
  status?: string;
}

export interface ProductIdType {
  id?: string | string[];
}

export interface productMutate {
  id: string[] | string;
  data: ProductType | string;
  status: string;
  isLoading: boolean;
  isError: boolean;
  error: object;
}

import { IpublicUser } from "@/app/models/user";

export interface Login {
  email: string;
  password: string;
}

export interface errorType {
  message: string;
  state: boolean;
}

// Users
export interface UserType {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  accountType?: string;
  category?: string;
  displayImageUrl?: string;
  coverImageUrl?: string;
  currentAmount?: number;
  totalAmount?: number;
  firstContactNumber?: string;
  secondContactNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: number;
  description?: string;
  weekdayStart?: number | string;
  weekdayEnd?: number | string;
  saturdayStart?: number | string;
  saturdayEnd?: number | string;
  sundayStart?: number | string;
  sundayEnd?: number | string;
}

export interface UserPassword {
  password: string;
  oldPassword?: string;
  token?: string;
}

export interface UsersResponse {
  data: UserType[] | string;
  status: string;
}

export interface UserResponse {
  data: UserType;
  status: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: object | string;
}

export interface GetUserResponse {
  data: IpublicUser;
  status: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: object | string;
}

export interface GetAllUsersParams {
  accountType: string;
  offset: number;
  limit: number;
}

export interface errorType {
  message: string;
  state: boolean;
}

export interface Invites {
  id: string;
  limit: number;
  offset: number;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
  merchant: string;
  merchantUserId: string;
  assistantUser: {
    id: string;
    deletedAt: number | null;
    name: string;
    username: string;
  };
  assistantUserId: string;
}

export interface InviteResponse {
  data: Partial<Invites[]>;
  status: string;
}

export type assistant = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  merchant: null;
  merchantUserId: string;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    name: string;
    username: string;
  };
  assistantUserId: string;
};

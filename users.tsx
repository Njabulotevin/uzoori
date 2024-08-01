

const users = [
  {
    "username": "johndoe123",
    "name": "John Doe",
    "email": "johndoe123@example.com",
    "accountType": "general",
    "description": "I'm an avid reader and love to explore new genres. Looking for book recommendations!",
    "displayImageUrl": "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    "username": "janedoe456",
    "name": "Jane Doe",
    "email": "janedoe456@example.com",
    "accountType": "general",
    "description": "I'm a travel enthusiast and always on the lookout for new destinations to visit.",
    "displayImageUrl": "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    "username": "bobsmith789",
    "name": "Bob Smith",
    "email": "bobsmith789@example.com",
    "accountType": "general",
    "description": "I'm a foodie and love to try out new restaurants and recipes.",
    "displayImageUrl": "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    "username": "sarahjones101",
    "name": "Sarah Jones",
    "email": "sarahjones101@example.com",
    "accountType": "general",
    "description": "I'm a fitness enthusiast and enjoy trying out new workout routines.",
    "displayImageUrl": "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    "username": "alexanderbrown",
    "name": "Alexander Brown",
    "email": "alexanderbrown@example.com",
    "accountType": "general",
    "description": "I'm a tech enthusiast and always interested in the latest gadgets and software.",
    "displayImageUrl": "https://randomuser.me/api/portraits/men/5.jpg"
  }
]


export interface ProductI {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  currency: string;
  collectionType: string;
  description: string;
  available: boolean;
  productImage: productImgType[];
  [key: string]: unknown;
}

export interface productImgType {
  displayImageUrl: string;
  altText: string;
}

export const hairStyles: ProductI[] = [
  {
    id: "1",
    name: "Pixie Cut",
    price: 599.99,
    originalPrice: 649.99,
    currency: "ZAR",
    collectionType: "hair styles",
    description: "Short, cropped haircut with layers to add texture",
    available: true,
    productImage: [
      {
        displayImageUrl:
          "/braids1.jpg",
        altText: "Woman with pixie cut hair",
      },
    ],
  },
  {
    id: "2",
    name: "Beachy Waves",
    price: 719.99,
    originalPrice: 769.99,
    currency: "ZAR",
    collectionType: "hair styles",
    description: "Loose, tousled waves for a relaxed, carefree look",
    available: true,
    productImage: [
      {
        displayImageUrl:
        "/braids2.jpg",
        altText: "Woman with beachy waves",
      },
    ],
  },
  {
    id: "3",
    name: "Fishtail Braid",
    price: 449.99,
    originalPrice: 499.99,
    currency: "ZAR",
    collectionType: "hair styles",
    description:
      "Intricate braid featuring a woven pattern resembling a fishtail",
    available: true,
    productImage: [
      {
        displayImageUrl:
        "/braids3.jpg",
        altText: "Woman with fishtail braid",
      },
    ],
  },
];













import { inputType } from "@/app/models/common";
import { provinces } from "@/app/models/provinces";
import { ImerchantUser, IpublicUser } from "@/app/models/user";
import {
  DropDown,
  Input,
  PhoneNumberInput,
  TextArea,
} from "@/components/molecules/Form";
import axios from "axios";
import Compressor from "compressorjs";
import { getCookie, getCookies, removeCookies } from "cookies-next";
import {
  addHours,
  differenceInDays,
  differenceInHours,
  format,
  formatDistanceToNow,
  isSameDay,
  isSameWeek,
  startOfToday,
} from "date-fns";
import React from "react";
import { Cookies } from "react-cookie";

// /*********************************************************************************************************************** */
// Set first letter of a string to upper case

// /*********************************************************************************************************************** */

export const titleCap = (str: string) => {
  if (str === "") {
    return str;
  } else {
    const firstLetter = str[0].toUpperCase();
    const rest = str.slice(1, str.length);
    return firstLetter + rest;
  }
};

// /*********************************************************************************************************************** */
// check emptyfields in an object
// /*********************************************************************************************************************** */

export const checkEmptyFields = (object: object): string[] => {
  const objectValues = Object.values(object);
  const objectkKeys = Object.keys(object);
  const unfield = objectValues.map((value, i) => {
    if (value === "" || value.length === 0) {
      return objectkKeys[i];
    } else {
      return true;
    }
  });
  const filter = unfield.filter((item) => {
    return item !== true;
  });
  return filter as string[];
};

export const logoOut = () => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    const res = axios.create();
    removeCookies("user");
    axios
      .create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      })
      .get("/user/signout/");
  } catch (err) {
    console.log(err);
  }
};

// /*********************************************************************************************************************** */
// Set object keys to lowercase
// /*********************************************************************************************************************** */

export const LowerObjectValues = (object: { [key: string]: string }) => {
  const objectKeys = Object.keys(object);
  objectKeys.forEach((key: string) => {
    object[key] = object[key].toLowerCase();
  });
  return object;
};

// /*********************************************************************************************************************** */
//get user data from cookies
// /*********************************************************************************************************************** */

export const getAuth = (): ImerchantUser | null => {
  try {
    // const user: unknown = getCookie("user");
    const user: unknown = localStorage.getItem("user");
    return JSON.parse(user as string);
  } catch (err) {
    return null;
  }
};

export const setAuth = (
  user: IpublicUser
): ImerchantUser | IpublicUser | null => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  try {
    return getAuth() ? true : false;
  } catch (err) {
    return false;
  }
};

// /*********************************************************************************************************************** */
// compare two objects and return difference
// /*********************************************************************************************************************** */

type objectType = {
  [key: string]: unknown;
};

export const compareObjects = (obj1: objectType, obj2: objectType) => {
  let keyFound = {};

  Object.keys(obj1).forEach((key) => {
    if (typeof obj1[key] === "object") {
      null;
    } else if (obj1[key] !== obj2[key]) {
      // keyFound = key +" Key : " + obj1[key] +" & "+ obj2[key];
      keyFound = { ...keyFound, [key]: obj2[key] };
    }
  });
  return Object.keys(keyFound).length === 0 ? {} : keyFound;
};

// /*********************************************************************************************************************** */
// handle add images on click
// /*********************************************************************************************************************** */

export const handleAddImg = (
  setImage: Function,
  setDisplay: Function,
  display: string[],
  image: object[]
) => {
  let input: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;

  input.type = "file";
  input.name = "image";

  input.onchange = async () => {
    const file = input.files;
    input.name = "image";

    if (file) {
      new Compressor(file[0], {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          setImage([...image, compressedResult]);
          console.log("original size:", file[0].size);
          console.log("compressed size:", compressedResult.size);
        },
      });

      setDisplay([...display, URL.createObjectURL(file[0])]);
    }
    // const newImg = renameFile(input.files[0], "image.jpeg");
  };
  input.click();
};
// /*********************************************************************************************************************** */
// handle add image on click
// /*********************************************************************************************************************** */

export const handleAddSingleImg = (
  setImage: Function,
  setDisplay: Function,
  display: string,
  image: object[]
): string => {
  let input: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;

  input.type = "file";
  input.name = "image";

  let img = "";

  input.onchange = async () => {
    const file = input.files;
    input.name = "image";

    if (file) {
      new Compressor(file[0], {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          setImage([...image, compressedResult]);
          console.log("original size:", file[0].size);
          console.log("compressed size:", file[0].size);
        },
      });

      setDisplay(URL.createObjectURL(file[0]));
      img = URL.createObjectURL(file[0]);
    }
    // const newImg = renameFile(input.files[0], "image.jpeg");
  };
  input.click();
  return img;
};

// /*********************************************************************************************************************** */
// rename image name
// /*********************************************************************************************************************** */

export function renameFile(originalFile: any, newName: any) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

// **********************************************************************************************/
// Handle input change on the form
// **********************************************************************************************/

export const handleChangeValue = (
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  setProduct: Function,
  product: object
) => {
  const { name, value, type } = e.currentTarget;
  setProduct({
    ...product,
    [name]: type === "number" ? parseFloat(value) : value,
  });
};
// **********************************************************************************************/
// Display date
// **********************************************************************************************/

export const getRelativeDate = (date: Date) => {
  const today = startOfToday();

  if (isSameWeek(today, date)) {
    if (isSameDay(today, date)) {
      return `${formatDistanceToNow(date, { addSuffix: true })}`;
    } else {
      return `${formatDistanceToNow(date, { addSuffix: true })}`;
    }
  } else {
    return format(date, "MMM dd");
  }
};

// **********************************************************************************************/
// Save and retrieve encrypted item to local storage
// **********************************************************************************************/

export const getIncryptedData = (name: string): Object | null => {
  try {
    const order = localStorage.getItem(name);
    const decrypt = JSON.parse(order as string);
    return decrypt;
  } catch (err) {
    return null;
  }
};

export const setIncryptedData = (name: string, data: Object) => {
  try {
    const decrypt = JSON.stringify(data);
    localStorage.setItem(name, decrypt);
    return true;
  } catch (err) {
    return null;
  }
};

// **********************************************************************************************/
// Convert Date to Unix timestamp
// **********************************************************************************************/

export const convertToUnix = (date: Date) => {
  const convertedToString = format(date, "yyyy-MM-dd");
  const unix = new Date(convertedToString as string).getTime();
  return unix / 1000;
};

export const isMobileBrowser = (): boolean => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    console.log("is mobile browser");
    return true;
  } else {
    console.log("is NOT mobile browser");
    return false;
  }
};

export function isAddressBarShowing() {
  // Calculate the difference between the inner height and the outer height
  const heightDifference = window.outerHeight - window.innerHeight;

  // If the height difference is greater than 100 pixels, assume the address bar is showing
  return heightDifference > 100;
}

export function capitalizeWords(str: string) {
  if (str === "" || typeof str === "undefined") {
    return str;
  } else {
    return str.replace(/(^|\s)\S/g, function (match) {
      return match.toUpperCase();
    });
  }
}

export function detectEmojis(text: string) {
  const emojiRegex =
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u203C|\u2049|\u20E3|\u00A9|\u00AE|\u2122|\u2139|\uD83C[\uDC04\uDCCF\uDFF0-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF]/g;
  const emojis = text.match(emojiRegex);

  if (emojis) {
    for (let i = 0; i < emojis.length; i++) {
      text = text.replace(
        emojis[i],
        '<span class="emoji">' + emojis[i] + "</span>"
      );
    }
  }

  return text;
}

export function setLikeState(postId: string) {
  try {
    const data: string[] = JSON.parse(
      sessionStorage.getItem("likes") as string
    );
    const add = (data: string[]) =>
      sessionStorage.setItem("likes", JSON.stringify([...data]));

    const remove = () => {
      sessionStorage.setItem(
        "likes",
        JSON.stringify([...data.filter((id) => id !== postId)])
      );
    };

    if (data) {
      if (isPostLiked(postId)) {
        remove();
      } else {
        add([...data, postId]);
      }
    } else {
      if (isPostLiked(postId)) {
        remove();
      } else {
        add([data]);
      }
    }
    return 1;
  } catch (err) {
    return 0;
  }
}

export function isPostLiked(postId: string): boolean {
  try {
    const data: string[] = JSON.parse(
      sessionStorage.getItem("likes") as string
    );
    return data.find((item) => item === postId) ? true : false;
  } catch (err) {
    return false;
  }
}

// **********************************************************************************************/
// Test Users dummy data
// **********************************************************************************************/

export const testUsers = [
  {
    username: "johndoe123",
    name: "John Doe",
    email: "johndoe123@example.com",
    accountType: "general",
    description:
      "I'm an avid reader and love to explore new genres. Looking for book recommendations!",
    displayImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    username: "janedoe456",
    name: "Jane Doe",
    email: "janedoe456@example.com",
    accountType: "general",
    description:
      "I'm a travel enthusiast and always on the lookout for new destinations to visit.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    username: "bobsmith789",
    name: "Bob Smith",
    email: "bobsmith789@example.com",
    accountType: "general",
    description:
      "I'm a foodie and love to try out new restaurants and recipes.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    username: "sarahjones101",
    name: "Sarah Jones",
    email: "sarahjones101@example.com",
    accountType: "general",
    description:
      "I'm a fitness enthusiast and enjoy trying out new workout routines.",
    displayImageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    username: "alexanderbrown",
    name: "Alexander Brown",
    email: "alexanderbrown@example.com",
    accountType: "general",
    description:
      "I'm a tech enthusiast and always interested in the latest gadgets and software.",
    displayImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export const dummyFood = [
  {
    id: "1",
    name: "Organic Blueberry Muffin",
    price: 2.99,
    originalPrice: 3.99,
    currency: "USD",
    collectionType: "Bakery",
    description: "A freshly baked muffin made with organic blueberries",
    available: true,
    productImage: [
      {
        displayImageUrl:
          "https://www.simplyorganic.com/sites/default/files/styles/768x768/public/acquiadam/2021-12/sneaky-blueberry-muffins-1440x660.jpg?itok=F4QybgV4",
        altText: "Organic Blueberry Muffin",
      },
    ],
  },
  {
    id: "2",
    name: "Grass-Fed Beef Burger",
    price: 8.99,
    originalPrice: 10.99,
    currency: "USD",
    collectionType: "Fast Food",
    description:
      "A juicy burger made with grass-fed beef, served with lettuce and tomato",
    available: true,
    productImage: [
      {
        displayImageUrl:
          "https://cdn.shopify.com/s/files/1/0071/9519/7491/articles/Grilled_Organic_Grass-Fed_Burgers_ac053a17-0f66-421c-81f8-e4f6012b72fa.png?v=1678274099",
        altText: "Grass-Fed Beef Burger",
      },
    ],
  },
  {
    id: "3",
    name: "Gluten-Free Pizza",
    price: 12.99,
    originalPrice: 14.99,
    currency: "USD",
    collectionType: "Italian",
    description:
      "A delicious pizza made with gluten-free crust and fresh toppings",
    available: true,
    productImage: [
      {
        displayImageUrl:
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gluten-free-pizza-3319d3b.jpg",
        altText: "Gluten-Free Pizza",
      },
    ],
  },
  {
    id: "4",
    name: "Spicy Kota",
    price: 25.99,
    originalPrice: 29.99,
    currency: "ZAR",
    collectionType: "Fast Food",
    description:
      "A delicious and spicy Kota filled with polony, chips, cheese, fried egg, atchar, and chakalaka",
    available: true,
    productImage: [
      {
        displayImageUrl:
          "https://pbs.twimg.com/media/Ff0e_sCX0AA_hKS?format=jpg&name=4096x4096",
        altText: "Spicy Kota",
      },
    ],
  },
  {
    id: "5",
    name: "Freshly Squeezed Orange Juice",
    price: 3.99,
    originalPrice: 4.99,
    currency: "USD",
    collectionType: "Beverages",
    description: "A refreshing drink made with freshly squeezed oranges",
    available: true,
    productImage: [
      {
        displayImageUrl:
          "https://example.com/images/freshly-squeezed-orange-juice.jpg",
        altText: "Freshly Squeezed Orange Juice",
      },
    ],
  },
];

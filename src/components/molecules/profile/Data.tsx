import { getAuth } from "@/scripts/utils";
import { BsBox, BsCalendar3, BsChatRightText, BsChatSquareText, BsChatText, BsGear, BsGraphUp, BsHouse, BsPeople, BsPerson } from "react-icons/bs";

export const Links = [
  { name: "home", icon: <BsHouse /> , link: '/app/merchant'},
  { name: "edit profile", icon: <BsPerson /> , link: `/app/merchant/profile`},
  { name: "bookings", icon: <BsCalendar3 />, link: '/app/merchant/bookings' },
  { name: "stylists", icon: <BsPeople />, link: '/app/merchant/stylists' },
  { name: "products", icon: <BsBox /> , link: '/app/merchant/products'},
  { name: "analytics", icon: <BsGraphUp />, link: '/app/merchant/analytics'},
  { name: "reviews", icon: <BsChatSquareText /> , link: '/app/merchant/reviews'},

];

export const LinksGeneral = [
  { name: "home", icon: <BsHouse /> , link: '/app'},
  { name: "my profile", icon: <BsPerson /> , link: `/app/profile`},
  { name: "my bookings", icon: <BsCalendar3 />, link: '/app/bookings' },
  { name: "messages", icon: <BsChatText />, link: '/app/messages' },
  { name: "reviews", icon: <BsChatSquareText />, link: '/app/reviews' },

];

export const OtherLinks = [
    { name: "support", icon: <BsChatRightText />, link: '/app/support' },
    { name: "setting", icon: <BsGear />, link: '/app/settings' },
  ];
  


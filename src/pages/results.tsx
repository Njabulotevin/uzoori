import Button from "@/components/molecules/Button";
import PopularSalonCard from "@/components/molecules/PopularSalonCard";
import SalonSearchResultCard from "@/components/molecules/SalonSearchResultCard";
import SearchInput from "@/components/molecules/SearchInput";
import { useRouter } from "next/navigation";
import React from "react";
import { BsChevronLeft, BsSortDown } from "react-icons/bs";

export default function Results() {
  const salons = [
    { name: "Scissors N' Razors", imgSrc: "/salon1.jpg" },
    { name: "Under the Dryer", imgSrc: "/salon2.jpg" },
    { name: "Serenity Salon", imgSrc: "/salon3.jpg" },
    { name: "Styles n' Smiles", imgSrc: "/salon4.jpg" },
    { name: "Inspirations Salon", imgSrc: "/salon5.jpg" },
    { name: "Fly-Away Hair", imgSrc: "/salon6.jpg" },
  ];
  const Router = useRouter();
  return (
    <div>
      <div className=""></div>
    </div>
  );
}

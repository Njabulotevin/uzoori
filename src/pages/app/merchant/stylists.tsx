import React from "react";
import StylistsList from "@/components/molecules/stylists/StylistsList";
import { Iuser } from "@/components/molecules/authentication/types";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import MerchantAssistants from "@/app/features/merchant/view/MerchantAssistants";

export default function Stylists({ invitations }: { invitations: any }) {
  return (
    <div className="p-3">
      <MerchantAssistants />
    </div>
  );
}

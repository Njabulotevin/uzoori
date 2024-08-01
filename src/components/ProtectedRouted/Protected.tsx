import useAutoLogin from "@/app/features/accounts/hooks/useAutoLogin";
import { getAuth } from "@/scripts/utils";
import { NextRouter, useRouter } from "next/router";
import React, {
  ReactComponentElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { SpinningWheel } from "../SpinningWheel";

export default function Protected({ children }: { children: ReactNode }) {
  // const { getUser, isSuccess } = useAutoLogin();

  if (!getAuth()) {
    if (typeof window !== "undefined") {
      window.location.href = "/account/login";
    }
    return null;
  } else {
    return <div className="">{children}</div>;
  }
}

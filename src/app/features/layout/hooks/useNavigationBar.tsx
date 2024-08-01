import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { activeViewAtom } from "../LayouStore";

export default function useNavigationBar() {
  const RouterPathName = useRouter();
  const [active, setActive] = useAtom(activeViewAtom);

  return { active, setActive };
}

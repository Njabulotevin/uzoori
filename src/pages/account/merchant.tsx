import CreateMerchant from "@/app/features/accounts/view/CreateMerchant";
import { loadingAtom } from "@/app/features/PopUp/stores/LoadingStore";
// import { LoadContext, ToastContext } from "@/app/features/PopUp/ModalContextProvider";
import Toast from "@/app/features/PopUp/views/Toast";
import { SpinningWheel } from "@/components/SpinningWheel";
import React, { useContext } from "react";
import {useAtom} from "jotai";
import useToast from "@/app/features/PopUp/hooks/useToast";

export default function Merchant() {
  const [isPending, setIsPending] = useAtom(loadingAtom);
 const {toggleToast} = useToast();

  return (
    <div>
      {toggleToast && (
        <div className="fixed top-5 z-[200] w-[600px] left-[calc((100vw-600px)/2)] animate__animated animate__slideInDown animate__faster">
          <Toast />
        </div>
      )}
      {isPending && (
        <div className="absolute w-full z-[3000] h-screen bg-violet-600/30  flex items-center justify-center text-white">
          <SpinningWheel />
        </div>
      )}

      <CreateMerchant />
    </div>
  );
}

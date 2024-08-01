import { useRouter } from "next/navigation";
import React from "react";
import { useFormik } from "formik";
import { getAuth } from "@/scripts/utils";
import { useVerifyEmailMutation } from "../accountApiSlice";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";

export default function useVerify() {
  const [verifyUser] = useVerifyEmailMutation();

  const Router = useRouter();
  const [isPending, setIsPending] = useAtom(loadingAtom);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      value_1: "",
      value_2: "",
      value_3: "",
      value_4: "",
    },
    onSubmit: async (values) => {
      // ! test:05/04/2023: opt. - test pending
      try {
        const OTP =
          values.value_1 + values.value_2 + values.value_3 + values.value_4;
        setIsPending(true);
        const { data, status } = await verifyUser({
          otp: parseInt(OTP),
        }).unwrap();

        if (status === "SUCCESS") {
          setIsPending(false);
          console.log(data);
          if (getAuth()) {
            Router.push(`/app/profile/${getAuth()?.id}`);
          } else {
            Router.push(`/account/login`);
          }
        }
      } catch (err) {
        setIsPending(false);
        console.log(err);
      }
    },
  });
  return { handleChange, values, handleSubmit };
}

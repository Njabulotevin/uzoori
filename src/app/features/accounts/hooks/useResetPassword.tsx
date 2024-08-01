import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";
import {
  useChangePasswordMutation,
  useForgotMutation,
} from "../accountApiSlice";

export default function useResetPassword() {
  const Router = useRouter();

  // export interface UserPassword {
  //   password: string;
  //   oldPassword: string;
  // }

  const [sendEmail] = useForgotMutation();

  const [isPending, setIsPending] = useAtom(loadingAtom);

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { email: "" },
    onSubmit: async (values) => {
      try {
        // make request
        setIsPending(true);
        const { data, status } = await sendEmail({
          email: values.email,
        }).unwrap();
        setIsPending(false);
        if (status === "SUCCESS") {
          if (true) {
            Router.push(`/account/OTP?email=${values.email}`);
          }
        }
      } catch (err) {
        setIsPending(false);
        console.log(err);
      }
    },
  });
  return { values, handleChange, handleSubmit, errors, touched };
}

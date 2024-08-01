import { getAuth } from "@/scripts/utils";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";
import { useForgotCheckMutation } from "../accountApiSlice";

export default function useOTP() {
  const Router = useRouter();
  const [isPending, setIsPending] = useAtom(loadingAtom);

  const [verifyUserOpt] = useForgotCheckMutation();
  const [email, setEmail] = useState("");

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      value_1: "",
      value_2: "",
      value_3: "",
      value_4: "",
    },
    onSubmit: async (values) => {
      const OTP =
        values.value_1 + values.value_2 + values.value_3 + values.value_4;
      try {
        setIsPending(true);
        const { data, status } = await verifyUserOpt({
          email: email,
          OTP: parseInt(OTP),
        }).unwrap();

        if (status === "SUCCESS") {
          setIsPending(false);
          console.log(data);
          Router.push(`/account/new_password?token=${data}`);
        }
      } catch (err) {
        setIsPending(false);
        console.log(err);
      }
    },
  });
  return { handleChange, values, handleSubmit, email, setEmail };
}

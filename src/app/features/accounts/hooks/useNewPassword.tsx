import { useFormik } from "formik";
import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { iconConfigType } from "./useRegisterUser";
import {
  useChangePasswordMutation,
  useResetPasswordMutation,
} from "../accountApiSlice";
import { resetPasswordSchema } from "../validations/loginSchema";
import { useRouter, useSearchParams } from "next/navigation";

export default function useNewPassword() {
  // ! Next
  const [resetPassword] = useResetPasswordMutation();
  const Router = useRouter();
  const searchParams = useSearchParams();
  const token: string = searchParams.get("token") as string;

  console.log(token);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      // make request

      try {
        await resetPassword({
          token: token,
          password: values.password,
        }).unwrap();
      } catch (err) {
        console.log(err);
      }
      console.log(values);
    },
  });

  const [newPasswordIcon, setNewPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700" />
  );
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700" />
  );

  const iconConfig_new: iconConfigType = {
    position: "right",
    element: newPasswordIcon,
    onClick: (e: MouseEvent, input: HTMLInputElement) => {
      if (input.type === "password") {
        input.type = "text";
        setNewPasswordIcon(<BsEyeFill className="text-gray-700" />);
      } else {
        input.type = "password";
        setNewPasswordIcon(<BsEyeSlashFill className="text-gray-700" />);
      }
    },
  };
  const iconConfig_confirm: iconConfigType = {
    position: "right",
    element: confirmPasswordIcon,
    onClick: (e: MouseEvent, input: HTMLInputElement) => {
      if (input.type === "password") {
        input.type = "text";
        setConfirmPasswordIcon(<BsEyeFill className="text-gray-700" />);
      } else {
        input.type = "password";
        setConfirmPasswordIcon(<BsEyeSlashFill className="text-gray-700" />);
      }
    },
  };
  return {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    iconConfig_confirm,
    iconConfig_new,
  };
}

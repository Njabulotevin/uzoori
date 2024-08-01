import { IassistantUser, ImerchantUser, Iuser } from "@/app/models/user";
import { InputErrorType } from "@/components/molecules/authentication/AuthErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BsPersonFill,
  BsPeopleFill,
  BsEyeSlashFill,
  BsEyeFill,
} from "react-icons/bs";
import { RegisterSchema } from "../validations/loginSchema";
import { useSignUpMutation } from "../accountApiSlice";
export type iconConfigType = {
  element: ReactNode;
  onClick: Function;
  position: "right" | "left";
};
export default function useRegisterUser() {
  const Router = useRouter();
  const [step, setStep] = useState(2);
  const [passwordCriteriaFirst, setPasswordCriteriaFirst] = useState(false);
  const [passwordCriteriaSecond, setPasswordCriteriaSecond] = useState(false);
  const [passwordCriteriaThird, setPasswordCriteriaThird] = useState(false);

  const [register, { isLoading, isSuccess, isUninitialized, error, isError }] =
    useSignUpMutation();

  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState<InputErrorType>({ message: "", tags: [] });
  const [isErr, setIsErr] = useState<boolean>(isError);
  const [isPending, setIsPending] = useState(false);

  const initialValues: Iuser = {
    username: "",
    name: "",
    email: "",
    accountType: "general",
    password: "",
    confirmPassword: "",
    description: "",
  };

  const { values, setValues, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegisterSchema,
      onSubmit: async (values) => {
        try {
          // ! lets use the same type to prevent such errors
          const { data, status } = await register(values).unwrap();
          if (status === "SUCCESS") {
            setCookie("user", {
              ...data,
            });

            localStorage.setItem("user", JSON.stringify({ ...data }));
            // Router.push(`/app/profile/${data.id}`);
            Router.push(`/account/verify_email`);
          }
        } catch (err: unknown) {
          setIsErr(true);
          // setErr({ message: err?.data?.data, tags: [] });
        }
      },
    });

  const { username, name, email, password, confirmPassword, description } =
    values;

  const passwordReq = [
    {
      description: "Password must consist of at least 8 characters",
      value: passwordCriteriaFirst,
    },
    {
      description: "Password must consist of at least one special character",
      value: passwordCriteriaSecond,
    },
    {
      description: "Password must consist of at least one number",
      value: passwordCriteriaThird,
    },
  ];
  const [passwordIcon, setPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700 dark:text-gray-400" />
  );
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700 dark:text-gray-400" />
  );

  useEffect(() => {
    const passwordRegexThird = /^(?=.*[0-9]).+$/;
    const passwordRegexSecond = /^(?=.*[0-9])(?=.*[!@#?*]).+$/;
    if (password!.length >= 8) {
      setPasswordCriteriaFirst(true);
    } else {
      setPasswordCriteriaFirst(false);
    }

    if (passwordRegexThird.test(password as string)) {
      setPasswordCriteriaThird(true);
    } else {
      setPasswordCriteriaThird(false);
    }

    if (passwordRegexSecond.test(password as string)) {
      setPasswordCriteriaSecond(true);
    } else {
      setPasswordCriteriaSecond(false);
    }
  }, [[[password]]]);

  const Inputs = [
    {
      placeholder: "Name",
      name: "name",
      type: "text",
      value: name,
      gridSpan: "col-span-2",
    },
    {
      placeholder: "Username",
      name: "username",
      type: "text",
      value: username,
      gridSpan: "col-span-2",
    },
    {
      placeholder: "Email",
      name: "email",
      type: "email",
      value: email,
      gridSpan: "col-span-4",
    },
    {
      placeholder: "Password",
      name: "password",
      type: "password",
      value: password,
      gridSpan: "col-span-4",
      iconConfig: {
        position: "right",
        element: passwordIcon,
        onClick: (e: MouseEvent, input: HTMLInputElement) => {
          if (input.type === "password") {
            input.type = "text";
            setPasswordIcon(
              <BsEyeFill className="text-gray-700 dark:text-gray-400" />
            );
          } else {
            input.type = "password";
            setPasswordIcon(
              <BsEyeSlashFill className="text-gray-700 dark:text-gray-400" />
            );
          }
        },
      },
    },
    {
      placeholder: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      value: confirmPassword,
      gridSpan: "col-span-4",
      iconConfig: {
        position: "right",
        element: confirmPasswordIcon,
        onClick: (e: MouseEvent, input: HTMLInputElement) => {
          if (input.type === "password") {
            input.type = "text";
            setConfirmPasswordIcon(
              <BsEyeFill className="text-gray-700 dark:text-gray-400" />
            );
          } else {
            input.type = "password";
            setConfirmPasswordIcon(
              <BsEyeSlashFill className="text-gray-700 dark:text-gray-400" />
            );
          }
        },
      },
    },
  ];
  return {
    values,
    isPending,
    agree,
    handleChange,
    handleSubmit,
    setStep,
    isErr,
    step,
    err,
    Inputs,
    setValues,
    setAgree,
    errors,
    passwordReq,
    touched,
    passwordIcon,
  };
}

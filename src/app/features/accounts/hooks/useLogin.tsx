import { useLoginMutation } from "../accountApiSlice";
import { InputErrorType } from "@/components/molecules/authentication/AuthErrorHandling";
import { loginSchema } from "@/components/molecules/authentication/validation/login/loginSchema";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";

export default function useLogin() {
  const Router = useRouter();
  const [login, response] = useLoginMutation();
  const [err, setErr] = useState<InputErrorType>({ message: "", tags: [] });
  const [isPending, setIsPending] = useAtom(loadingAtom);
  const [isError, setIsError] = useState<boolean>(false);

  function handleError(error: string) {
    if (error.includes("incorrect email or password")) {
      setErr({
        message: "Incorrect Email Or Password",
        tags: ["email", "password"],
      });
      setErrors({ email: "Incorrect email", password: "Incorrect password" });
    } else if (error.includes("invalid email address")) {
      setErr({ message: "invalid email address", tags: ["email"] });
    } else {
      setErr({ message: "Oops something went wrong here!", tags: [] });
    }
  }

  const [passwordIcon, setPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700" />
  );

  const iconConfig = {
    position: "right",
    element: passwordIcon,
    onClick: (e: MouseEvent, input: HTMLInputElement) => {
      if (input.type === "password") {
        input.type = "text";
        setPasswordIcon(<BsEyeFill className="text-gray-700" />);
      } else {
        input.type = "password";
        setPasswordIcon(<BsEyeSlashFill className="text-gray-700" />);
      }
    },
  };

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    setErrors,
    setValues,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setIsPending(true);
        const { status, data } = await login({
          email: values.email as string,
          password: values.password as string,
        }).unwrap();

        setIsPending(false);
        if (status === "SUCCESS") {
          console.log(data);

          // setCookie("user", {
          //   id: data.id,
          //   accountType: data.accountType,
          //   displayImageUrl: data?.displayImageUrl ? data?.displayImageUrl : "",
          //   name: data?.name,
          //   username: data?.username,
          // });cd

          setCookie("user", {
            ...data,
          });

          localStorage.setItem("user", JSON.stringify({ ...data }));
          Router.push(`/app`);
        }
      } catch (err: any) {
        setIsError(true);
        setErr({ message: "Something went wrong", tags: [] });
        setIsPending(false);
        handleError(err.data.data.toLowerCase());
      }
    },
    validateOnBlur: true,
  });

  return {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isError,
    isPending,
    err,
    handleBlur,
    iconConfig,
  };
}

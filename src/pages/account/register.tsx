import React, { useState } from "react";
import {
  BsCheckCircleFill,
  BsCheckSquareFill,
  BsEyeFill,
  BsEyeSlashFill,
} from "react-icons/bs";
import Alert from "@/components/molecules/Alert";
import { AccountFooter } from "@/components/molecules/authentication/CreateAccount";
import { Input, DropDown, Checkbox } from "@/components/molecules/Form";
import { useFormik } from "formik";
import useRegisterUser, {
  iconConfigType,
} from "@/app/features/accounts/hooks/useRegisterUser";
import AccountsLayout from "@/app/features/accounts/view/AccountsLayout";
export const autheType = {
  signIn: "sign-in",
  signUp: "sign-up",
};
export default function CreateAccount() {
  const {
    handleChange,
    handleSubmit,
    err,
    Inputs,
    passwordReq,
    errors,
    touched,
    isErr,
    setAgree,
    agree,
  } = useRegisterUser();

  return (
    <AccountsLayout
      title="Let’s Create your account"
      subtitle="Signing up for uzoori is fast and Free"
    >
      <form
        onSubmit={handleSubmit}
        className="lg:w-[390px] w-[330px] mx-auto grid grid-cols-4 gap-4"
      >
        {isErr && (
          <div className="w-full col-span-4">
            <Alert type={"error"} message={err.message} />
          </div>
        )}
        {Inputs.map((item, i) => {
          if (item.type === "password") {
            return (
              <div key={i} className={`${item.gridSpan}`}>
                <Input
                  isRequired={true}
                  label={item.placeholder}
                  key={i}
                  value={item.value}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  name={item.name}
                  isError={
                    errors[item.name] && touched[item.name] ? true : false
                  }
                  error={errors[item.name]}
                  type={item.type}
                  icon={item.iconConfig as iconConfigType}
                />
              </div>
            );
          } else {
            return (
              <div key={i} className={`${item.gridSpan}`}>
                <Input
                  isRequired={true}
                  label={item.placeholder}
                  key={i}
                  value={item.value}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  name={item.name}
                  isError={
                    errors[item.name] && touched[item.name] ? true : false
                  }
                  error={errors[item.name]}
                  type={item.type}
                />
              </div>
            );
          }
        })}
        <div className="col-span-4 flex flex-col gap-2 px-4 ">
          {passwordReq.map(({ description, value }, i) => {
            return (
              <div key={i} className="flex gap-4 items-center ">
                {value ? (
                  <BsCheckCircleFill className="text-green-500" />
                ) : (
                  <BsCheckCircleFill className="text-gray-400" />
                )}{" "}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {description}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 col-span-4 my-5 py-4">
          <Checkbox
            onChange={() => {
              setAgree(!agree);
            }}
            checked={agree}
          />
          <p className="font-medium text-sm text-gray-400">
          By signing up for uzoori you agree to our terms of use and privacy policy
          </p>
        </div>
        <div className="col-span-4 w-full">
          <AccountFooter
            type={autheType.signUp}
            label="Sign up"
            onClick={() => {}}
            btnType="submit"
            disabled={false}
          />
        </div>
      </form>
    </AccountsLayout>
  );
}

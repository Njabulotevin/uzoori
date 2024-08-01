import { SpinningWheel } from "@/components/SpinningWheel";
import Link from "next/link";
import React from "react";
import Alert from "../../components/molecules/Alert";
import AccountsLayout from "@/app/features/accounts/view/AccountsLayout";
import { AccountFooter } from "../../components/molecules/authentication/CreateAccount";
import { Input } from "@/components/molecules/Form";
import useLogin from "@/app/features/accounts/hooks/useLogin";
import { iconConfigType } from "@/app/features/accounts/hooks/useRegisterUser";
import { isLoggedIn } from "@/scripts/utils";
import { BsMailbox } from "react-icons/bs";

export interface IloginCredentials {
  email?: string;
  password?: string;
}

export default function Login() {
  const {
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
  } = useLogin();

  return (
    <div className="">
      <AccountsLayout
        title="Log in"
        subtitle="Enter your credentials to access your account"
      >
        <form
          className="grid grid-cols-4 gap-4 lg:w-[390px] w-[330px] mx-auto"
          onSubmit={handleSubmit}
          autoComplete="false"
          autoCorrect="false"
        >
          {isError && (
            <div className="col-span-4">
              <Alert type={"error"} message={err.message} />
            </div>
          )}
          <div className="col-span-4">
            <Input
              value={values.email}
              placeholder={"Email"}
              onChange={handleChange}
              name={"email"}
              type="email"
              isRequired={false}
              isError={errors.email && touched.email ? true : false}
              error={errors.email}
              onBlur={handleBlur}
              label="email"
              icon={{element: <BsMailbox/>, position: "left", onClick: ()=>{}}}
            />
          </div>
          <div className="col-span-4">
            <Input
              value={values.password}
              placeholder={"Password"}
              onChange={handleChange}
              name={"password"}
              type="password"
              isRequired={false}
              isError={errors.password && touched.password ? true : false}
              error={errors.password}
              onBlur={handleBlur}
              label="password"
              icon={{element: <BsMailbox/>, position: "left", onClick: ()=>{}}}
            />
          </div>
          <div className="flex justify-end col-span-4 ">
            <Link href="/account/reset_password">
              <p className=" text-violet-600 font-medium text-end text-[12px]">
                Forgot password?
              </p>
            </Link>
          </div>
          <div className="mt-[20px] col-span-4">
            <AccountFooter
              onClick={() => {}}
              label={"Login"}
              type={"signIn"}
              btnType={"submit"}
            />
          </div>
        </form>
      </AccountsLayout>
    </div>
  );
}

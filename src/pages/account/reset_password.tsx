import useResetPassword from "@/app/features/accounts/hooks/useResetPassword";
import AccountsLayout from "@/app/features/accounts/view/AccountsLayout";
import { AccountFooter } from "@/components/molecules/authentication/CreateAccount";
import ResetPassword from "@/components/molecules/authentication/ResetPassword";
import { Input } from "@/components/molecules/Form";
import { useRouter } from "next/navigation";
import React from "react";

export default function Reset_password() {
  const { values, handleChange, handleSubmit, errors, touched } =
    useResetPassword();
  return (
    <AccountsLayout
      title={"Reset Password"}
      subtitle={"Enter your account email address to reset your password"}
    >
      <form
        className="grid grid-cols-4 gap-4 lg:w-[390px] w-[330px] mx-auto"
        onSubmit={handleSubmit}
        autoComplete="false"
        autoCorrect="false"
      >
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
            // onBlur={handleBlur}
            label="email"
          />
        </div>

        <div className="mt-[20px] col-span-4">
          <AccountFooter
            onClick={() => {}}
            label={"Submit"}
            type={"signIn"}
            btnType={"submit"}
          />
        </div>
      </form>
    </AccountsLayout>
  );
}

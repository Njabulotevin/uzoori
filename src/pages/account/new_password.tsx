import useNewPassword from "@/app/features/accounts/hooks/useNewPassword";
import AccountsLayout from "@/app/features/accounts/view/AccountsLayout";
import { AccountFooter } from "@/components/molecules/authentication/CreateAccount";
import { Input } from "@/components/molecules/Form";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function New_password() {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    iconConfig_confirm,
    iconConfig_new,
  } = useNewPassword();

  return (
    <AccountsLayout
      title={"Reset Password"}
      subtitle={"Enter your new password, to be used on your next login."}
    >
      <form
        className="grid grid-cols-4 gap-4 lg:w-[390px] w-[330px] mx-auto"
        onSubmit={handleSubmit}
        autoComplete="false"
        autoCorrect="false"
      >
        <div className="col-span-4">
          <Input
            value={values.password}
            placeholder={"New Password"}
            onChange={handleChange}
            name={"password"}
            type="password"
            isRequired={false}
            isError={errors.password && touched.password ? true : false}
            error={errors.password}
            // onBlur={handleBlur}
            label="New Password"
            icon={iconConfig_new}
          />
        </div>
        <div className="col-span-4">
          <Input
            value={values.confirmPassword}
            placeholder={"Confirm Password"}
            onChange={handleChange}
            name={"confirmPassword"}
            type="password"
            isRequired={false}
            isError={
              errors.confirmPassword && touched.confirmPassword ? true : false
            }
            error={errors.confirmPassword}
            // onBlur={handleBlur}
            label="Confirm Password"
            icon={iconConfig_confirm}
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

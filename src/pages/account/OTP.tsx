import useOTP from "@/app/features/accounts/hooks/useOTP";
import AccountsLayout from "@/app/features/accounts/view/AccountsLayout";
import { AccountFooter } from "@/components/molecules/authentication/CreateAccount";
import { Code } from "@/components/molecules/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function OTP() {
  const Router = useRouter();
  const searchParams = useSearchParams();

  const userEmail = searchParams.get("email") as string;

  const { values, handleSubmit, handleChange, setEmail } = useOTP();

  useEffect(() => {
    setEmail(userEmail);
  });

  return (
    <AccountsLayout
      title={"One time pin"}
      subtitle={"Enter the otp sent to your email address"}
    >
      <form
        className="grid grid-cols-4 gap-4 lg:w-[390px] w-[330px] mx-auto"
        onSubmit={handleSubmit}
        autoComplete="false"
        autoCorrect="false"
      >
        <div className="col-span-4">
          <Code
            label={"One-time-pin"}
            isError={false}
            value_1={values.value_1}
            value_2={values.value_2}
            value_3={values.value_3}
            value_4={values.value_4}
            name_1={"value_1"}
            name_2={"value_2"}
            name_3={"value_3"}
            name_4={"value_4"}
            onChange={handleChange}
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

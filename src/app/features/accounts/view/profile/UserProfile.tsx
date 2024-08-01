import { provinces } from "@/app/models/provinces";
import { ImerchantUser, IpublicUser, Iuser } from "@/app/models/user";
import Button from "@/components/molecules/Button";
import {
  DropDown,
  Input,
  PhoneNumberInput,
  TextArea,
} from "@/components/molecules/Form";
import { getAuth } from "@/scripts/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { BsClock } from "react-icons/bs";
import useUserProfile from "../../hooks/profile/useUserProfile";
import { iconConfigType } from "../../hooks/useRegisterUser";
import PublicUserProfile from "./PublicUserProfile";

export default function UserProfile({ user }: { user: ImerchantUser }) {
  const Router = useRouter();
  const {
    fields,
    handleChange,
    handleSubmit,
    managePassword,
    changePassword,
    contactFields,
    workingHoursFields,
    isPending,
  } = useUserProfile();
  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto w-full lg:w-[700px]">
        <PublicUserProfile
          user={
            {
              id: getAuth()?.id,
              username: getAuth()?.username,
              name: getAuth()?.name,
              email: "",
              accountType: getAuth()?.accountType,
              description: "",
              displayImageUrl: getAuth()?.displayImageUrl,
            } as IpublicUser
          }
          type={getAuth()?.id === getAuth()?.id ? "private" : "public"}
          followers={getAuth()?.followerCount as number}
          following={getAuth()?.followingCount as number}
        />
      </div>
      {/* -------------Edit profile------------ */}

      <div className="flex flex-col gap-10 w-full lg:w-[700px] mx-auto">
        {getAuth()?.accountType !== "merchant" && (
          <div className="box-small">
            <div className="">
              <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 ">
                Migrate to merchant account
              </h4>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Change your account type to a merchant account
              </p>
            </div>
            <Button
              onClick={() => Router.push("/account/merchant")}
              size={"default"}
              variant={"primary"}
            >
              Migrate
            </Button>
          </div>
        )}

        <div className="box-small w-full ">
          <div className="flex flex-col gap-0 lg:gap-[5px]">
            <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 ">
              Edit Your Profile
            </h4>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full">
            {fields.map((item, i) => {
              if (item.type === "dropdown") {
                return (
                  <div key={i} className={item.gridSpan}>
                    <DropDown
                      value={item.value as string}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      name={item.name}
                      isRequired={false}
                      isError={false}
                      options={[]}
                      label={item.label}
                    />
                  </div>
                );
              } else if (item.type === "textarea") {
                return (
                  <div key={i} className={item.gridSpan}>
                    <TextArea
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      name={item.name}
                      isRequired={false}
                      isError={false}
                      label={item.label}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={i} className={item.gridSpan}>
                    <Input
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      name={item.name}
                      isRequired={false}
                      isError={false}
                      label={item.label}
                    />
                  </div>
                );
              }
            })}

            {getAuth()?.accountType === "merchant" &&
              contactFields.map((item, i) => {
                if (item.type === "dropdown") {
                  if (item.name === "city") {
                    return (
                      <div key={i} className={item.gridSpan}>
                        <DropDown
                          value={item.value as string}
                          placeholder={item.placeholder}
                          onChange={handleChange}
                          name={item.name}
                          isRequired={false}
                          isError={false}
                          options={["johannesburg"]}
                          label={item.label}
                        />
                      </div>
                    );
                  }
                  if (item.name === "province") {
                    return (
                      <div key={i} className={item.gridSpan}>
                        <DropDown
                          value={item.value as string}
                          placeholder={item.placeholder}
                          onChange={handleChange}
                          name={item.name}
                          isRequired={false}
                          isError={false}
                          options={["gauteng"]}
                          label={item.label}
                        />
                      </div>
                    );
                  }
                } else if (item.type === "textarea") {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <TextArea
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        isError={false}
                        label={item.label}
                      />
                    </div>
                  );
                } else if (item.type === "phoneNumber") {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <PhoneNumberInput
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        isError={false}
                        label={item.label}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <Input
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        isError={false}
                        label={item.label}
                      />
                    </div>
                  );
                }
              })}
          </div>
          <div className="col-span-5 flex justify-end">
            <Button
              className="min-w-[95px]"
              size={"default"}
              variant={"primary"}
              onClick={() => handleSubmit()}
            >
              Save Changes
            </Button>
          </div>
        </div>
        {/* ---------working Hours---------- */}
        {getAuth()?.accountType === "merchant" && (
          <div className="box-small w-full lg:w-[700px]">
            <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 ">
              Update working hours
            </h4>
            <div className="grid lg:grid-cols-4 gap-4">
              {workingHoursFields.map((item, i) => {
                return (
                  <div key={i} className={item.gridSpan}>
                    <Input
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      name={item.name}
                      isRequired={false}
                      isError={false}
                      label={item.label}
                      icon={{
                        element: <BsClock />,
                        position: "left",
                        onClick: () => {},
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="col-span-4 flex justify-end">
              <Button
                className="min-w-[95px]"
                size={"default"}
                variant={"primary"}
                onClick={() => changePassword.handleSubmit()}
                type="submit"
                isPending={isPending}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* -------------Chnage Password------------ */}
        <div className="box-small w-full lg:w-[700px]">
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 ">
            Change Your Password
          </h4>
          <div className="flex flex-col gap-5">
            {managePassword.map((item, i) => {
              return (
                <div key={i} className={item.gridSpan}>
                  <Input
                    value={item.value}
                    placeholder={item.placeholder}
                    onChange={changePassword.handleChange}
                    name={item.name}
                    isRequired={false}
                    isError={false}
                    label={item.placeholder}
                    type={item.type}
                    icon={item.iconConfig as iconConfigType}
                  />
                </div>
              );
            })}
          </div>
          <div className="col-span-5 flex justify-end">
            <Button
              className="min-w-[95px]"
              size={"default"}
              variant={"primary"}
              onClick={() => changePassword.handleSubmit()}
              type="submit"
            >
              Save New Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

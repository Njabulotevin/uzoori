import Button from "@/components/molecules/Button";
import { Checkbox, Input } from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import React from "react";
import { BsSearch, BsPlus, BsEnvelopeFill } from "react-icons/bs";
import PublicUserProfile from "../../accounts/view/profile/PublicUserProfile";
import { TableNavigation } from "../../product/views/Products";
import useMerchantAssistants from "../hooks/useMerchantAssistants";
import { da } from "date-fns/locale";

export default function MerchantAssistants() {
  const {
    isActive,
    setIsActive,
    assistantList,
    pendingAssistantList,
    values,
    handleChange,
    handleSubmit,
    setActiveTab,
    activeTab,
  } = useMerchantAssistants();

  return (
    <div>
      <div className="box-small">
        <h4 className="text-base font-semibold text-gray-700 lg:text-lg p-5">
          Assistants
        </h4>

        <div className="box-small">
          <div className="flex flex-col lg:flex-row w-full lg:justify-between gap-4">
            <TableNavigation
              active={activeTab}
              setActive={setActiveTab}
              views={["Members", "Pending"]}
            />

            <form
              className="flex flex-col lg:items-center lg:flex-row gap-4"
              onSubmit={handleSubmit}
            >
              <Input
                value={values.email}
                placeholder={"Add uers email address"}
                onChange={handleChange}
                name={"email"}
                isRequired={false}
                isError={false}
                icon={{
                  element: <BsEnvelopeFill />,
                  position: "left",
                  onClick: () => {},
                }}
              />
              <Button
                size={"default"}
                variant="primary"
                className="w-full lg:w-[170px]"
                icon={{ icon: <BsPlus size={18} />, variant: "icon-label" }}
                onClick={() => {}}
                type="submit"
              >
                Invite User
              </Button>{" "}
            </form>
          </div>

          {/* Table */}

          <div className="flex flex-col-reverse gap-10 lg:flex-row">
            <div
              className={`flex flex-col gap-4 ${
                isActive ? "lg:w-[60%]" : "w-full"
              }`}
            >
              {activeTab === "Members"
                ? assistantList?.map((item, i) => {
                    // * destructuring the assistant List.
                    // ! issue_70: is this acceptable
                    // const { assistantUser: item } = list;

                    return (
                      <div
                        onClick={() => {
                          // setIsActive(
                          //   isActive === null || isActive !== item ? item : null
                          // );
                        }}
                        key={`${i}_${item.name}`}
                        className={`py-2 flex gap-2 justify-between items-center cursor-pointer p-3 rounded-[10px] ${
                          isActive?.username === item?.username
                            ? "bg-slate-100 dark:bg-darkMode-900"
                            : ""
                        } hover:bg-slate-100 dark:hover:bg-gray-800`}
                      >
                        <div className="flex gap-3 items-center">
                          <Checkbox checked={false} onChange={() => {}} />
                          <UserName
                            size="default"
                            name={item.name as string}
                            userName={item.username as string}
                            imgSrc={""}
                            type={"general"}
                            isVerified={false}
                          />
                        </div>
                        <span className="text-xs text-red-700 bg-red-100 rounded font-semibold p-2">
                          {activeTab === "Members" ? "Remove" : "waiting.."}
                        </span>
                      </div>
                    );
                  })
                : pendingAssistantList?.map((item, i) => {
                    // * destructuring the assistant List.
                    // ! issue_70: is this acceptable
                    // const { assistantUser: item } = list;
                    return (
                      <div
                        onClick={() => {
                          // setIsActive(
                          //   isActive === null || isActive !== item ? item : null
                          // );
                        }}
                        key={`${i}_${name}`}
                        className={`py-2 flex gap-2 justify-between items-center cursor-pointer p-3 rounded-[10px] ${
                          isActive?.username === item?.username
                            ? "bg-slate-100 dark:bg-darkMode-900"
                            : ""
                        } hover:bg-slate-100 dark:hover:bg-gray-800`}
                      >
                        <div className="flex gap-3 items-center">
                          <Checkbox checked={false} onChange={() => {}} />
                          <UserName
                            size="default"
                            name={item.name as string}
                            userName={item.username as string}
                            imgSrc={""}
                            type={"general"}
                            isVerified={false}
                          />
                        </div>
                        <span className="text-xs text-red-700 bg-red-100 rounded font-semibold p-2">
                          {activeTab === "Members" ? "Remove" : "waiting.."}
                        </span>
                      </div>
                    );
                  })}
            </div>
            {isActive && (
              <div className="">
                <PublicUserProfile
                  followers={0}
                  following={0}
                  user={isActive}
                  type={"public"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

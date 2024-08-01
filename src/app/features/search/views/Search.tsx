import Button from "@/components/molecules/Button";
import FollowUserCard from "@/components/molecules/FollowUserCard";
import { Input } from "@/components/molecules/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsClock, BsSearch, BsX } from "react-icons/bs";
import useSearch from "../hooks/useSearch";

export default function Search() {
  const Router = useRouter();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    values,
    handleChange,
    history,
    setValues,
    isActive,
    setIsActive,
    suggestedUsers,
    getSuggestedUsers,
  } = useSearch();

  return (
    <div className="flex-1 static lg:relative">
      <form className=" flex gap-1" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Input
            id="searchField"
            value={values.question}
            placeholder={"Search"}
            onChange={(e) => {
              handleChange(e);
              setIsActive(true);
              getSuggestedUsers(e.target.value);
            }}
            name={"question"}
            isRequired={false}
            isError={false}
            onBlur={() => {}}
            autoComplete="off"
            icon={{
              element: <BsSearch />,
              position: "left",
              onClick: () => {},
            }}
          />
          {values.question !== "" && (
            <span
              onClick={() => setValues({ question: "" })}
              className="absolute bg-gray-400 font-medium text-white rounded-full p-1 top-2 right-2 cursor-pointer"
            >
              <BsX />
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="p-3 flex lg:hidden"
          size={"default"}
          variant={"primary"}
          icon={{ icon: <BsSearch size={17} />, variant: "icon-only" }}
        ></Button>
      </form>

      {values.question !== "" && isActive && suggestedUsers?.length !== 0 && (
        <div
          onMouseLeave={() => {
            setIsActive(false);
          }}
          className="box-small dark:bg-darkMode-300 absolute left-0 top-[60px] w-full z-50"
        >
          <div className="flex flex-col gap-4">
            <h4 className="text-gray-700 dark:text-gray-100 font-semibold text-sm">
              {/* Recent Searches : */}
            </h4>
            {suggestedUsers?.map((user, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setIsActive(false);
                    Router.push(`/${user.username}`);
                    // handleSubmit();
                  }}
                  className="cursor-pointer"
                >
                  <FollowUserCard
                    user={user}
                    display={"horizontal"}
                    onClick={() => {}}
                    fullname={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

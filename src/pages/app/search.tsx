import ProductPost, {
  PublicProductPost,
} from "@/app/features/content/view/ProductPost";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import useSearch from "@/app/features/search/hooks/useSearch";
import { Iproduct } from "@/app/models/product";
import { iPost, iPostProduct, IpublicUser } from "@/app/models/user";
import PostWrapper from "@/components/common/PostWrapper";
import FollowUserCard from "@/components/molecules/FollowUserCard";
import UserName from "@/components/molecules/UserName";
import { testUsers } from "@/scripts/utils";
import clsx from "clsx";
import { Skeleton } from "components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { BsClock } from "react-icons/bs";

export default function Search() {
  const Router = useRouter();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    values,
    handleChange,
    activeTab,
    setActiveTab,
    Tabs,
    isActive,
    setIsActive,
    history,
    setValues,
    isLoading,
    getSearchResults,
  } = useSearch();

  const { setActive } = useNavigationBar();

  useEffect(() => {
    setActive({ label: "search", data: "" });
  }, []);

  const RenderResults = () => {
    switch (activeTab) {
      case "Posts":
        return (getSearchResults() as iPost[]).map((post: iPost, i) => {
          return (
            <ProductPost
              key={post.id}
              id={post.id}
              user={post.user}
              date={new Date(post.createdAt)}
              media={post.media}
              post={post}
              product={post.postProduct?.product as Iproduct}
              content={{
                message: post.message as string,
                price: post.postProduct?.product.price as number,
                name: post.postProduct?.product.name as string,
              }}
            />
          );
        });

      case "Product":
        return (
          <div className="flex flex-col items-center gap-10 ">
            <div
              style={{ backgroundSize: "100%" }}
              className="bg-[url('/no_results.svg')]  w-[150px] h-[150px]"
            ></div>
            <h4 className="font-bold text-gray-700 dark:text-gray-100">
              No search results Found!
            </h4>
          </div>
        );

      default:
        return (
          <div className="box-small max-w-[600px] gap-4">
            {(getSearchResults() as IpublicUser[]).map(
              (user: IpublicUser, i) => {
                return (
                  <FollowUserCard
                    key={user.id}
                    onClick={() => {}}
                    fullname={true}
                    user={user}
                    display={"horizontal"}
                  />
                );
              }
            )}
          </div>
        );
    }
  };

  return (
    <div className="p-2">
      <div className="w-full max-w-[600px] mx-auto flex flex-col gap-5">
        {!isActive && (
          <div className="border-b border-gray-300 ">
            <div
              style={{ width: "fit-content" }}
              className="flex gap-4 mx-auto justify-center   rounded-md p-2 pb-0"
            >
              {Tabs.map((item, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => setActiveTab(item)}
                    className={clsx(
                      `text-sm   cursor-pointer px-2 py-4`,
                      activeTab === item
                        ? "border-b-2 border-violet-600 text-violet-600 font-bold"
                        : "text-gray-700 dark:text-gray-100 font-normal"
                    )}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {isActive && history.length !== 0 ? (
          <div
            onMouseLeave={() => {
              setIsActive(false);
            }}
            className="box-small dark:bg-transparent shadow-none  top-[60px] w-full "
          >
            <div className="flex flex-col gap-4">
              <h4 className="text-gray-700 dark:text-gray-100 font-semibold text-sm">
                Recent Searches :
              </h4>
              {history.map((item, i) => {
                return (
                  <button
                    type="button"
                    key={item.question}
                    onClick={() => {
                      console.log("item clicked: ", item);
                      setValues({ question: item.question });
                      handleSubmit();
                      setIsActive(false);
                      const params = new URLSearchParams(searchParams);
                      params.set("q", item.question);
                    }}
                    className="text-gray-700 dark:text-gray-100 flex gap-3 cursor-pointer p-3 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100"
                  >
                    <BsClock />
                    <span className="text-xs font-medium">{item.question}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        {/*------------------results----------- */}
        <div className="flex flex-col w-full gap-5">
          {isLoading ? (
            <div className="box-small max-w-[600px] mx-auto w-full">
              {[1, 2, 3, 4, 5].map((item) => {
                return <PostSkeleton key={item} />;
              })}
            </div>
          ) : getSearchResults().length === 0 ? (
            <div className="flex flex-col items-center gap-10 ">
              <div
                style={{ backgroundSize: "100%" }}
                className="bg-[url('/no_results.svg')]  w-[150px] h-[150px]"
              ></div>
              <h4 className="font-bold text-gray-700 dark:text-gray-100">
                No search results Found!
              </h4>
            </div>
          ) : (
            RenderResults()
          )}
        </div>
      </div>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center space-x-4  ">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]  bg-gray-200 dark:bg-gray-600 rounded" />
          <Skeleton className="h-4 w-[200px]  bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
      <div className="flex items-center space-x-4  ">
        <div style={{ width: "100%" }} className="space-y-2">
          <div className="lg:min-w-[536px]  h-[300px] md:h-[500px] bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
}

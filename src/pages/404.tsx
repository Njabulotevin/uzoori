import Button from "@/components/molecules/Button";
import Link from "next/link";
import React from "react";

export default function Notfound() {
  return (
    <div className="w-full h-screen flex  justify-center p-4">
      <div className="flex flex-col gap-4 items-center mt-20 max-w-[600px]">
        <div
          style={{
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="bg-[url('/404.svg')] dark:bg-[url('/404_dark.svg')] w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]"
        ></div>
        <p className="text-lg dark:text-gray-100 font-bold">
          Oops! page not found
        </p>
        <p className="text-sm dark:text-gray-100 font-medium max-w-[500px] text-center">
          Sorry, the page you are looking for cannot be found. It may have been
          moved or deleted. Please check the URL you entered and try again.
        </p>
        <Link href="/app">
          <Button size={"default"} variant={"primary"} className="w-full">
            Go to feeds
          </Button>
        </Link>
      </div>
    </div>
  );
}

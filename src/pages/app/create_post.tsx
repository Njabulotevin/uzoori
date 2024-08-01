import useCreatePost from "@/app/features/content/hooks/useCreatePost";
import useNavigationBar from "@/app/features/layout/hooks/useNavigationBar";
import Button from "@/components/molecules/Button";
import { TextArea } from "@/components/molecules/Form";
import UserName from "@/components/molecules/UserName";
import { getAuth, handleAddImg } from "@/scripts/utils";
import React, { ReactNode, useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsImages,
  BsPlusLg,
  BsTag,
} from "react-icons/bs";
import clsx from "clsx";

export default function Create_post() {
  const { setActive } = useNavigationBar();
  const {
    caption,
    setCaption,
    selectedImage,
    setSelectedImage,
    imageList,
    setImageList,
    step,
    setStep,
    handleSubmitPost,
    displayImages,
    setDisplayImages,
    isPending,
  } = useCreatePost();

  useEffect(() => {
    setActive({ label: "Create Post", data: "" });
  }, []);

  switch (step) {
    case 1:
      return (
        <StepWrapper
          setStep={setStep}
          step={step}
          handleSubmit={handleSubmitPost}
          isPending={isPending}
        >
          <div className="flex flex-col gap-3">
            <img
              src={selectedImage}
              alt=""
              className="w-[100%] h-[300px] md:h-[500px] object-cover rounded-md "
            />
            {displayImages.length !== 0 && (
              <div className="flex gap-4">
                {displayImages.map((image, i) => {
                  return (
                    <img
                      key={`image_${i + image}`}
                      src={image}
                      alt={image}
                      className={clsx(
                        "w-[60px] h-[60px]  object-cover rounded-md cursor-pointer",
                        selectedImage === image
                          ? "border border-violet-600"
                          : ""
                      )}
                      onClick={() => {
                        setSelectedImage(image);
                      }}
                    />
                  );
                })}
              </div>
            )}
            <Button
              onClick={() => {
                handleAddImg(
                  setImageList,
                  setDisplayImages,
                  displayImages,
                  imageList
                );
              }}
              className=""
              size={"default"}
              variant={"primary"}
              icon={{ icon: <BsPlusLg />, variant: "icon-label" }}
            >
              Add Image
            </Button>
          </div>
        </StepWrapper>
      );
    case 2:
      return (
        <StepWrapper
          setStep={setStep}
          step={step}
          handleSubmit={handleSubmitPost}
          isPending={isPending}
        >
          <div className="flex flex-col gap-3">
            <h4 className="text-gray-700 dark:text-gray-100 font-semibold text-sm lg:text-base">
              New Post
            </h4>
            <div className="flex gap-1 lg:gap-4 ">
              <img
                src={displayImages[0]}
                alt=""
                className="w-[60px] h-[60px] object-cover rounded-md"
              />

              <div className="flex-1">
                <TextArea
                  rows={8}
                  value={caption}
                  placeholder={"Add a Caption"}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  name={"caption"}
                  isRequired={false}
                  isError={false}
                  label={""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[100%]">
              {/* <Button size={"default"} variant={"secondary"}>Tag a friend</Button> */}
              <Button
                size={"default"}
                variant={"secondary"}
                icon={{ icon: <BsTag size={18} />, variant: "icon-label" }}
              >
                Tag a Product
              </Button>
            </div>
          </div>
        </StepWrapper>
      );

    default:
      return (
        <StepWrapper
          setStep={setStep}
          step={step}
          handleSubmit={handleSubmitPost}
          isPending={isPending}
        >
          <div className="flex flex-col items-center justify-center gap-5 min-h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 font-semibold text-gray-700 dark:text-gray-50">
              <BsImages size={50} />
              <h4>Add Images to create a post</h4>
            </div>
            <Button
              onClick={() => {
                handleAddImg(
                  setImageList,
                  setDisplayImages,
                  displayImages,
                  imageList
                );
              }}
              size={"default"}
              variant={"primary"}
            >
              Select image
            </Button>
          </div>
        </StepWrapper>
      );
  }
}

function StepWrapper({
  children,
  step,
  setStep,
  handleSubmit,
  isPending,
}: {
  children: ReactNode;
  step: number;
  setStep: Function;
  handleSubmit: Function;
  isPending: boolean;
}) {
  return (
    <div className="p-2">
      <div className="box-small justify-between p-4 max-w-[700px] mx-auto min-h-[400px]">
        <div className="">{children}</div>

        {step !== 0 && (
          <div className="flex justify-between items-center p-4">
            <Button
              onClick={() => {
                if (step - 1 >= 0) {
                  setStep(step - 1);
                }
              }}
              size={"default"}
              variant={"secondary"}
              icon={{ icon: <BsArrowLeft />, variant: "icon-label" }}
            >
              Discard
            </Button>
            <Button
              onClick={() => {
                if (step === 2) {
                  handleSubmit();
                } else {
                  if (step + 1 <= 2) {
                    setStep(step + 1);
                  }
                }
              }}
              size={"default"}
              variant={"primary"}
              isPending={isPending}
              icon={{ icon: <BsArrowRight />, variant: "icon-label" }}
            >
              {step === 2 ? "Share" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

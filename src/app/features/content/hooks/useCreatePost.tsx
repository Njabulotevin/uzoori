import { getAuth, renameFile } from "@/scripts/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useBottomToast from "../../PopUp/hooks/useBottomToast";
import { usePostImageMutation } from "../../product/productApiSlice";
import { useCreatePostMutation } from "../contentApiSlice";

export default function useCreatePost() {
  const [imageList, setImageList] = useState([]);
  const [step, setStep] = useState(0);
  const [displayImages, setDisplayImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(displayImages[0]);
  const [uploadImage] = usePostImageMutation();
  const [createPost] = useCreatePostMutation();
  const [isPending, setIsPending] = useState(false);
  const { openBottomToast } = useBottomToast();
  const Router = useRouter();
  useEffect(() => {
    if (displayImages.length === 0) {
      setStep(0);
    } else {
      setStep(1);
    }
    setSelectedImage(displayImages[displayImages.length - 1]);
  }, [displayImages]);
  const [caption, setCaption] = useState("");
  const handleSubmitPost = async () => {
    try {
      setIsPending(true);
      const formData = new FormData();
      imageList.forEach((img, i) => {
        const newImg = renameFile(
          img,
          `${getAuth()?.name}.post.image_${i}.jpeg`
        );
        formData.append("image", newImg);
      });
      const { data: imagesData, status: imagesStatus } = await uploadImage(
        formData
      ).unwrap();
      if (imagesStatus === "SUCCESS") {
        const { data, status } = await createPost({
          media: imagesData,
          message: caption,
        }).unwrap();
        if (status === "SUCCESS") {
          setIsPending(false);
          Router.replace(`/${getAuth()?.username}`);
          openBottomToast("New Post Created!");
          console.log(data);
        }
      }
      console.log({
        image: displayImages,
        caption: caption,
      });
    } catch (err) {
      setIsPending(false);
      console.log(err);
    }
  };

  return {
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
  };
}

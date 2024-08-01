import useModal from "@/app/features/PopUp/hooks/useModal";
import { usePostImageMutation } from "@/app/features/product/productApiSlice";
import { renameFile, getAuth } from "@/scripts/utils";
import { setCookie } from "cookies-next";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUploadProfileImgaeMutation } from "../../accountApiSlice";

const imageAtom = atom("");

export default function useChangeProfileImage(displayImageUrl: string) {
  const [displayImage, setDisplayImage] = useAtom(imageAtom);
  const [imageList, setImageList] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const [changeProfile] = useUploadProfileImgaeMutation();
  const [upload] = usePostImageMutation();

  const { closeModal } = useModal();
  const Router = useRouter();

  useEffect(() => {
    setDisplayImage(displayImageUrl ? displayImageUrl : "/blackPP.png");
  }, []);

  const uploadImage = async () => {
    try {
      setIsPending(true);
      const formData = new FormData();
      imageList.forEach((img, i) => {
        const newImg = renameFile(
          img,
          `${getAuth()?.name}.profile.image_${i}.jpeg`
        );
        formData.append("image", newImg);
      });
      const { data: imageData, status: imageStatus } = await upload(
        formData
      ).unwrap();
      if (imageStatus === "SUCCESS") {
        console.log(imageData);
        const { data, status } = await changeProfile({
          displayImageUrl: imageData[0],
        }).unwrap();
        if (status === "SUCCESS") {
          console.log(data);
          setIsPending(false);
          closeModal();
          setCookie("user", {
            ...data,
          });
          Router.refresh();
        }
      }
    } catch (err) {
      setIsPending(false);
      console.log(err);
      closeModal();
    }
  };

  return {
    imageList,
    setImageList,
    displayImage,
    setDisplayImage,
    uploadImage,
    isPending,
  };
}

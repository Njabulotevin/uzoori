import {
  ImerchantUser,
  iPost,
  iPostProduct,
  iProduct,
  IpublicUser,
} from "@/app/models/user";
import PostWrapper from "@/components/common/PostWrapper";
import Button from "@/components/molecules/Button";
import { Input } from "@/components/molecules/Form";
import UserName, { UserProfileImage } from "@/components/molecules/UserName";
import { detectEmojis, getAuth } from "@/scripts/utils";
import { getElementById } from "domutils";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  BsCheckLg,
  BsChevronLeft,
  BsChevronRight,
  BsTagFill,
} from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import useCart from "../../Cart/hooks/useCart";
import BookingForm from "../../booking/view/BookingForm";
import { cartAtom } from "../../Cart/CartSore";
import useModal from "../../PopUp/hooks/useModal";
import usePostView from "../hooks/usePostView";
import { Iproduct } from "@/app/models/product";
import { useRouter } from "next/navigation";
import useBottomToast from "../../PopUp/hooks/useBottomToast";
import Image from "next/image";

export default function ProductPost({
  user,
  date,
  content,
  media,
  id,
  product,
  post,
  wrapperClass,
}: {
  id: string;
  user: IpublicUser;
  date: Date;
  media: string[];
  post: iPost;
  product: Iproduct;
  content: { message: string; price: number; name: string };
  wrapperClass?: string;
}) {
  return (
    <PostWrapper
      user={user}
      date={date}
      post={post}
      wrapperClass={wrapperClass}
    >
      <PublicProductPost
        id={id}
        media={media}
        content={content}
        product={product}
        post={post}
        userId={user.id}
      />
    </PostWrapper>
  );
}

export function PublicProductPost({
  id,
  content,
  media,
  post,
  product,
  imgDimention,
  disableScroll,
  userId,
}: {
  id: string;
  media: string[];
  post?: iPost;
  product: Iproduct;
  content: { message: string; price: number; name: string };
  imgDimention?: string;
  disableScroll?: boolean | false;
  userId: string;
}) {
  const Router = useRouter();
  const [images, setImages] = useState<string[]>(media);

  // media.map((image) => image + ".jpg")

  let message = content.message ?? "";
  message = detectEmojis(
    message.replace(/(#\w+)/g, '<span class="hashtag">$1</span>')
  );

  const { openPost, openPostById } = usePostView();

  const handleImageError = () => {
    setImages(["/noImage.jpg"]);
  };

  const handleScroll = (direction: "right" | "left") => {
    const box: HTMLDivElement = document.getElementById(id) as HTMLDivElement;

    if (direction === "right") {
      box.scrollLeft += 300;
    } else {
      box.scrollLeft -= 300;
    }
  };

  return (
    <div className="flex flex-col gap-4 relative select-none items-between h-[100%]">
      {images.length > 1 && !disableScroll && (
        <div
          onClick={() => handleScroll("left")}
          className="absolute z-40 hidden top-[calc((500px-48px)/2)] text-white bg-violet-600/40 w-12 h-12 -left-2 rounded-full lg:flex items-center justify-center cursor-pointer hover:bg-violet-600"
        >
          <BsChevronLeft />
        </div>
      )}
      <div
        className="flex overflow-auto noScrollBar gap-4 relative "
        style={{
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
        }}
        id={id}
      >
        {images.map((image, i) => {
          return (
            <img
              key={i}
              style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
              src={image}
              className={`rounded-md w-[100%]  shrink-0 object-cover cursor-pointer ${
                imgDimention ? imgDimention : "w-[100%] h-[400px] md:h-[500px]"
              }`}
              onClick={() => {
                if (post) {
                  openPostById(post?.id as string);
                }
              }}
              onError={handleImageError}
              onLoad={() => {}}
              alt={""}
            />
          );
        })}
      </div>

      {images.length > 1 && !disableScroll && (
        <div
          onClick={() => handleScroll("right")}
          className="absolute z-40 hidden top-[calc((500px-48px)/2)] text-white bg-violet-600/40 w-12 h-12 -right-2 rounded-full lg:flex items-center justify-center cursor-pointer hover:bg-violet-600"
        >
          <BsChevronRight />
        </div>
      )}
      {product && (
        <div className="text-sm text-gray-700 dark:text-slate-300 font-semibold flex flex-wrap justify-between flex-1">
          <h4>{product.name}</h4>
          <h4 className="p-2 flex gap-2 items-center rounded-[4px] bg-violet-100 text-violet-600">
            <BsTagFill />
            <span>R{product.price}</span>
          </h4>
        </div>
      )}
      <p
        dangerouslySetInnerHTML={{ __html: message }}
        className="text-sm font-medium text-gray-500 dark:text-slate-200"
      ></p>
      {product && (
        <BuyButton
          product={product}
          media={media}
          userId={userId}
          post={post}
        />
      )}
    </div>
  );
}

export function BuyButton({
  product,
  media,
  userId,
  post,
}: {
  product: Iproduct;
  media: string[];
  userId: string;
  post?: iPost;
}) {
  const { openModal } = useModal();
  const transformPostImages = () => {
    return media.map((image) => {
      return { imageUrl: image };
    });
  };

  const [isPending, setIsPending] = useState(false);
  const { openBottomToast } = useBottomToast();

  const { cart, addToCart } = useCart();

  const addedToCart =
    typeof cart[userId] === "undefined"
      ? false
      : cart[userId].filter((target) => target?.id === product?.id).length !== 0
      ? true
      : false;

  const { closePost } = usePostView();

  return (
    <>
      <div className="w-full flex-1">
        {product.productType === "AS" ? (
          <Button
            onClick={() => {
              closePost();
              openModal({
                modalChild: <BookingForm product={product as Iproduct} />,
                title: "Book New Appointment",
                subtitle: "",
                action: () => {},
              });
            }}
            size={"default"}
            variant={"primary"}
            className="w-full font-semibold"
          >
            Book Now
          </Button>
        ) : (
          <>
            {addedToCart ? (
              <Button
                onClick={() => {}}
                size={"default"}
                variant={"secondary"}
                disabled={true}
                className="w-full font-semibold"
                icon={{ icon: <BsCheckLg />, variant: "icon-label" }}
              >
                Added
              </Button>
            ) : (
              <Button
                isPending={isPending}
                onClick={() => {
                  setIsPending(true);
                  setTimeout(() => {
                    addToCart(
                      post
                        ? {
                            userId: userId,
                            product: {
                              ...product,
                              productImage: transformPostImages(),
                            },
                          }
                        : { userId: userId, product }
                    );
                    setIsPending(false);
                    closePost();
                    openBottomToast("Added Product to cart");
                  }, 1000);
                }}
                size={"default"}
                variant={"primary"}
                className="w-full font-semibold "
              >
                Add to cart
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
}

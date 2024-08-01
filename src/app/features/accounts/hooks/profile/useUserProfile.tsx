import useModal from "@/app/features/PopUp/hooks/useModal";
import { ChangePasswordWarning } from "@/app/features/PopUp/views/Modal";
import { compareObjects, getAuth } from "@/scripts/utils";
import { removeCookies, setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useUpdateUserMutation } from "../../accountApiSlice";
import useBottomToast from "@/app/features/PopUp/hooks/useBottomToast";

export default function useUserProfile() {
  const Router = useRouter();

  const [update] = useUpdateUserMutation();

  const [passwordIcon, setPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700" />
  );
  const [newPasswordIcon, setNewPasswordIcon] = useState(
    <BsEyeSlashFill className="text-gray-700" />
  );

  const initialValues = {
    name: getAuth()?.name,
    username: getAuth()?.username,
    email: getAuth()?.email,
    description: getAuth()?.description,
    accountType: getAuth()?.accountType,
    addressLine1: getAuth()?.addressLine1,
    addressLine2: getAuth()?.addressLine2,
    city: getAuth()?.city,
    postalCode: getAuth()?.postalCode,
    province: getAuth()?.province,
    category: getAuth()?.category,
    country: getAuth()?.country,
    firstContactNumber: getAuth()?.firstContactNumber,
    secondContactNumber: getAuth()?.secondContactNumber,
    weekdayStart: getAuth()?.weekdayStart,
    weekdayEnd: getAuth()?.weekdayEnd,
    saturdayStart: getAuth()?.saturdaystart,
    saturdayEnd: getAuth()?.saturdayEnd,
    sundayStart: getAuth()?.sundayStart,
    sundayEnd: getAuth()?.sundayEnd,
  };

  const [isPending, setIsPending] = useState(false);
  const { openBottomToast } = useBottomToast();

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        if (Object.keys(compareObjects(values, initialValues)).length !== 0) {
          setIsPending(true);
          //request to make changes
          const changes = compareObjects(initialValues, values);
          const { data, status } = await update({ ...changes }).unwrap();
          if (status === "SUCCESS") {
            removeCookies("user");
            setCookie("user", { ...data });
            openBottomToast("Changes saved!");
          }

          setIsPending(false);
        }
      } catch (err) {
        setIsPending(false);
        console.log(err);
      }
    },
  });

  const { setModal, openModal } = useModal();

  const changePassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      openModal({
        modalChild: <ChangePasswordWarning />,
        title: "",
        subtitle: "",
        action: async () => {
          // make request to change password
        },
      });
    },
  });

  const fields = [
    {
      name: "name",
      placeholder: "Store name",
      label: "Store name",
      value: values.name,
      type: "text",
      gridSpan: "lg:col-span-2 col-span-5",
    },
    {
      name: "username",
      placeholder: "Store Username",
      label: "Store Username",
      value: values.username,
      type: "text",
      gridSpan: "lg:col-span-3 col-span-5",
    },
    {
      name: "email",
      placeholder: "Store Email",
      label: "Store Email",
      value: values.email,
      type: "email",
      gridSpan: "col-span-5",
    },

    {
      name: "description",
      placeholder: "Tell us about yourself",
      label: "Bio",
      value: values.description,
      type: "textarea",
      gridSpan: "col-span-5",
    },
  ];

  const contactFields = [
    {
      name: "firstContactNumber",
      placeholder: "First Contact Number",
      label: "First Contact Number",
      value: values.firstContactNumber,
      type: "phoneNumber",
      gridSpan: "col-span-5 lg:col-span-5",
    },
    {
      name: "secondContactNumber",
      placeholder: "Second Contact Number",
      label: "Second Contact Number",
      value: values.secondContactNumber,
      type: "phoneNumber",
      gridSpan: "col-span-5 lg:col-span-5",
    },
    {
      name: "addressLine1",
      placeholder: "Street Address",
      label: "Street Address",
      value: values.addressLine1,
      type: "text",
      gridSpan: "col-span-5 lg:col-span-5",
    },
    {
      name: "addressLine2",
      placeholder: "Address Line 2 (Optional)",
      label: "Address Line 2 (Optional)",
      value: values.addressLine2,
      type: "text",
      gridSpan: "col-span-5 lg:col-span-5",
    },
    {
      name: "city",
      placeholder: "City",
      label: "City",
      value: values.city,
      type: "dropdown",
      gridSpan: "col-span-5 lg:col-span-3",
    },
    {
      name: "postalCode",
      placeholder: "Postal Code",
      label: "Postal Code",
      value: values.postalCode,
      type: "text",
      gridSpan: "col-span-5 lg:col-span-2",
    },
    {
      name: "province",
      placeholder: "Province",
      label: "Province",
      value: values.province,
      type: "dropdown",
      gridSpan: "col-span-5 lg:col-span-2",
    },
  ];

  const workingHoursFields = [
    {
      name: "weekdayStart",
      placeholder: "Weekday Open",
      label: "Weekday Open",
      value: values.weekdayStart,
      type: "text",
      gridSpan: "col-span-4 lg:col-span-2",
    },
    {
      name: "weekdayEnd",
      placeholder: "Weekday Close",
      label: "Weekday Close",
      value: values.weekdayEnd,
      type: "text",
      gridSpan: "col-span-4 lg:col-span-2",
    },
    {
      name: "saturdayStart",
      placeholder: "Saturday Open",
      label: "Saturday Open",
      value: values.saturdayStart,
      type: "dropdown",
      gridSpan: "col-span-4 lg:col-span-2",
    },
    {
      name: "saturdayEnd",
      placeholder: "Saturday Close",
      label: "Saturday Close",
      value: values.saturdayEnd,
      type: "dropdown",
      gridSpan: "col-span-4 lg:col-span-2",
    },
    {
      name: "sundayStart",
      placeholder: "Sunday Open",
      label: "Sunday Open",
      value: values.sundayStart,
      type: "dropdown",
      gridSpan: "col-span-4 lg:col-span-2",
    },
    {
      name: "sundayEnd",
      placeholder: "Sunday Close",
      label: "Sunday Close",
      value: values.sundayEnd,
      type: "dropdown",
      gridSpan: "col-span-4 lg:col-span-2",
    },
  ];

  const managePassword = [
    {
      placeholder: "Old Password",
      name: "oldPassword",
      type: "password",
      value: changePassword.values.oldPassword,
      gridSpan: "col-span-4",
      iconConfig: {
        position: "right",
        element: passwordIcon,
        _onClick: (e: MouseEvent, input: HTMLInputElement) => {
          if (input.type === "password") {
            input.type = "text";
            setPasswordIcon(<BsEyeFill className="text-gray-700" />);
          } else {
            input.type = "password";
            setPasswordIcon(<BsEyeSlashFill className="text-gray-700" />);
          }
        },
        get onClick() {
          return this._onClick;
        },
        set onClick(value) {
          this._onClick = value;
        },
      },
    },
    {
      placeholder: "New Password",
      name: "newPassword",
      type: "password",
      value: changePassword.values.newPassword,
      gridSpan: "col-span-4",
      iconConfig: {
        position: "right",
        element: passwordIcon,
        _onClick: (e: MouseEvent, input: HTMLInputElement) => {
          if (input.type === "password") {
            input.type = "text";
            setPasswordIcon(<BsEyeFill className="text-gray-700" />);
          } else {
            input.type = "password";
            setPasswordIcon(<BsEyeSlashFill className="text-gray-700" />);
          }
        },
        get onClick() {
          return this._onClick;
        },
        set onClick(value) {
          this._onClick = value;
        },
      },
    },
  ];

  return {
    fields,
    handleChange,
    handleSubmit,
    managePassword,
    changePassword,
    contactFields,
    workingHoursFields,
    isPending,
  };
}

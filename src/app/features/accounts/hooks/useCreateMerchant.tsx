import { ImerchantUser } from "@/app/models/user";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSignUpMutation, useUpdateUserMutation } from "../accountApiSlice";
import { useSetState } from "rooks";
import { getAuth } from "@/scripts/utils";
import { useRouter } from "next/navigation";
import { removeCookies } from "cookies-next";
import { errorType } from "../types";
import Toast from "../../PopUp/views/Toast";
import { createMerchantSchema } from "../validations/loginSchema";
import { useAtom } from "jotai";
import { loadingAtom } from "../../PopUp/stores/LoadingStore";
import { toastAtom } from "../../PopUp/stores/ToastStore";
export interface Isteps {
  step: number;
  title: string;
  isComplete: boolean;
  fields: {
    name: string;
    placeholder: string;
    label: string;
    value: unknown;
    type: string;
    gridSpan: string;
  }[];
}

export default function useCreateMerchant() {
  const Router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [update] = useUpdateUserMutation();

  const [error, setError] = useState<errorType>({
    message: "",
    state: false,
  });

  const [stepStatus, setStepStatus] = useState({
    step_1: false,
    step_2: false,
    step_3: false,
  });

  const initialValues: { [key: string]: unknown } = {
    name: getAuth()?.name as string,
    username: getAuth()?.username as string,
    category: "",
    description: "",
    accountType: "merchant",
    password: "",
    VerifiedEmail: false,
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    city: "Johannesburg",
    postalCode: 0,
    province: "Gauteng",
    country: "south africa",
    firstContactNumber: "",
    secondContactNumber: "",
    weekdayStart: "",
    weekdayEnd: "",
    saturdayStart: "",
    saturdayEnd: "",
    sundayStart: "",
    sundayEnd: "",
  };

  const [isPending, setIsPending] = useAtom(loadingAtom);
  const [toast, setToast] = useAtom(toastAtom);

  const { values, handleChange, handleSubmit, errors, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createMerchantSchema,
      onSubmit: async (values) => {
        try {
          const updated = {
            ...values,
            accountType: "merchant",
            postalCode: parseInt(values.postalCode as string),
          };
          setIsPending(true);
          const { status, data } = await update(updated).unwrap();

          setIsPending(false);
          if (status === "SUCCESS") {
            removeCookies("user");
            Router.push("/app");
          }
        } catch (error) {
          setIsPending(false);
          console.log(error);
          setToast({
            modalChild: <Toast />,
            type: "ERROR",
            message: "Something went wrong!",
          });
          setError({ message: "Something went wrong", state: true });
        }
        console.log(values);
      },
    });

  console.log(errors);

  const {
    name,
    username,
    description,
    category,
    weekdayStart,
    weekdayEnd,
    saturdayStart,
    saturdayEnd,
    sundayStart,
    sundayEnd,
    addressLine1,
    addressLine2,
    city,
    postalCode,
    province,
    firstContactNumber,
  } = values;

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const steps: Isteps[] = [
    {
      step: 0,
      title: "Store details",
      isComplete: stepStatus.step_1,
      fields: [
        {
          name: "name",
          placeholder: "Store name",
          label: "Store name",
          value: name,
          type: "text",
          gridSpan: "lg:col-span-3 col-span-5",
        },
        {
          name: "username",
          placeholder: "Store Username",
          label: "Store Username",
          value: username,
          type: "text",
          gridSpan: "lg:col-span-2 col-span-5",
        },

        {
          name: "category",
          placeholder: "Store Category",
          label: "Store Category",
          value: category,
          type: "dropdown",
          gridSpan: "col-span-5",
        },
        {
          name: "description",
          placeholder: "Tell us a bit about your store",
          label: "About Us",
          value: description,
          type: "textarea",
          gridSpan: "col-span-5",
        },
      ],
    },
    {
      step: 1,
      title: "Working hours",
      isComplete: stepStatus.step_2,
      fields: [
        {
          name: "weekdayStart",
          placeholder: "Weekday Open",
          label: "Weekday Open",
          value: weekdayStart,
          type: "time",
          gridSpan: "col-span-4 lg:col-span-2",
        },
        {
          name: "weekdayEnd",
          placeholder: "Weekday Close",
          label: "Weekday Close",
          value: weekdayEnd,
          type: "time",
          gridSpan: "col-span-4 lg:col-span-2",
        },
        {
          name: "saturdayStart",
          placeholder: "Saturday Open",
          label: "Saturday Open",
          value: saturdayStart,
          type: "time",
          gridSpan: "col-span-4 lg:col-span-2",
        },
        {
          name: "saturdayEnd",
          placeholder: "Saturday Close",
          label: "Saturday Close",
          value: saturdayEnd,
          type: "time",
          gridSpan: "col-span-4 lg:col-span-2",
        },
        {
          name: "sundayStart",
          placeholder: "Sunday Open",
          label: "Sunday Open",
          value: sundayStart,
          type: "time",
          gridSpan: "col-span-4 lg:col-span-2",
        },
        {
          name: "sundayEnd",
          placeholder: "Sunday Close",
          label: "Sunday Close",
          value: sundayEnd,
          type: "time",
          gridSpan: "col-span-4 lg:col-span-2",
        },
      ],
    },
    {
      step: 2,
      title: "Contact details",
      isComplete: stepStatus.step_1,
      fields: [
        {
          name: "firstContactNumber",
          placeholder: "Contact Number",
          label: "Contact Number",
          value: firstContactNumber,
          type: "phoneNumber",
          gridSpan: "col-span-5 lg:col-span-5",
        },
        {
          name: "addressLine1",
          placeholder: "Street Address",
          label: "Street Address",
          value: addressLine1,
          type: "text",
          gridSpan: "col-span-5 lg:col-span-5",
        },
        {
          name: "addressLine2",
          placeholder: "Address Line 2 (Optional)",
          label: "Address Line 2 (Optional)",
          value: addressLine2,
          type: "text",
          gridSpan: "col-span-5 lg:col-span-5",
        },
        {
          name: "city",
          placeholder: "City",
          label: "City",
          value: city,
          type: "dropdown",
          gridSpan: "col-span-5 lg:col-span-3",
        },
        {
          name: "postalCode",
          placeholder: "Postal Code",
          label: "Postal Code",
          value: postalCode,
          type: "text",
          gridSpan: "col-span-5 lg:col-span-2",
        },
        {
          name: "province",
          placeholder: "Province",
          label: "Province",
          value: province,
          type: "dropdown",
          gridSpan: "col-span-5 lg:col-span-2",
        },
      ],
    },
  ];

  return {
    step,
    setStep,
    steps,
    setStepStatus,
    handleChange,
    nextStep,
    previousStep,
    handleSubmit,
    errors,
    touched,
  };
}

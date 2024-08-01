import { provinces } from "@/app/models/provinces";
import ModalCard from "@/components/common/ModalCard";
import Button from "@/components/molecules/Button";
import {
  DropDown,
  Input,
  PhoneNumberInput,
  TextArea,
} from "@/components/molecules/Form";
import Link from "next/link";
import React, {
  EventHandler,
  MouseEventHandler,
  ReactNode,
  useEffect,
} from "react";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsCheckSquareFill,
  BsClock,
  BsCloud,
  BsCloudFill,
  BsXSquareFill,
} from "react-icons/bs";
import useCreateMerchant, { Isteps } from "../hooks/useCreateMerchant";

export default function CreateMerchant() {
  const {
    step,
    steps,
    setStep,
    handleChange,
    nextStep,
    previousStep,
    handleSubmit,
    errors,
    touched,
  } = useCreateMerchant();

  // const

  // !issue_54: onSubmit Missing

  useEffect(() => {
    console.log(step);
  }, [step]);

  switch (step) {
    case 1:
      return (
        <div className="w-full flex-col gap-4 min-h-screen flex items-center justify-center">
          <StepLayout active={step} steps={steps} onClickStep={setStep}>
            <div className="grid grid-cols-4 gap-4">
              {steps[step].fields?.map((item, i) => {
                return (
                  <div key={i} className={item.gridSpan}>
                    <Input
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      name={item.name}
                      isRequired={false}
                      type={item.type}
                      label={item.label}
                      isError={
                        errors[item.name] && touched[item.name] ? true : false
                      }
                      error={errors[item.name]}
                    />
                    {/* <label htmlFor=""></label>
                    <input
                      className="border-gray-300 w-full dark:border-none rounded-full max-h-[42px]  py-[10px] text-gray-700 dark:text-gray-300 text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600"
                      type="time"
                    /> */}
                  </div>
                );
              })}
              <div className="col-span-5 flex justify-between">
                <Button
                  className="min-w-[95px]"
                  size={"default"}
                  variant={"primary"}
                  icon={{ icon: <BsArrowLeftShort />, variant: "icon-label" }}
                  onClick={previousStep}
                >
                  Previous
                </Button>
                <Button
                  className="min-w-[95px]"
                  size={"default"}
                  variant={"primary"}
                  icon={{ icon: <BsArrowRightShort />, variant: "icon-label" }}
                  onClick={nextStep}
                >
                  Next
                </Button>
              </div>
            </div>
          </StepLayout>
          <Link href="/app">
            <p className="underline text-gray-400">Cancel</p>
          </Link>
        </div>
      );
    case 2:
      return (
        <div className="w-full flex-col gap-4 min-h-screen flex items-center justify-center">
          <StepLayout active={step} steps={steps} onClickStep={setStep}>
            <form className="grid grid-cols-5 gap-4" onSubmit={handleSubmit}>
              {steps[step].fields?.map((item, i) => {
                if (item.type === "dropdown") {
                  if (item.name === "city") {
                    return (
                      <div key={i} className={item.gridSpan}>
                        <DropDown
                          value={item.value as string}
                          placeholder={item.placeholder}
                          onChange={handleChange}
                          name={item.name}
                          isRequired={false}
                          isError={false}
                          options={["johannesburg"]}
                          label={item.label}
                        />
                      </div>
                    );
                  }
                  if (item.name === "province") {
                    return (
                      <div key={i} className={item.gridSpan}>
                        <DropDown
                          value={item.value as string}
                          placeholder={item.placeholder}
                          onChange={handleChange}
                          name={item.name}
                          isRequired={false}
                          isError={false}
                          options={["gauteng"]}
                          label={item.label}
                        />
                      </div>
                    );
                  }
                } else if (item.type === "textarea") {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <TextArea
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        label={item.label}
                        isError={
                          errors[item.name] && touched[item.name] ? true : false
                        }
                        error={errors[item.name]}
                      />
                    </div>
                  );
                } else if (item.type === "phoneNumber") {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <PhoneNumberInput
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        label={item.label}
                        isError={
                          errors[item.name] && touched[item.name] ? true : false
                        }
                        error={errors[item.name]}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <Input
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        label={item.label}
                        isError={
                          errors[item.name] && touched[item.name] ? true : false
                        }
                        error={errors[item.name]}
                      />
                    </div>
                  );
                }
              })}
              <div className="col-span-5 flex justify-between">
                <Button
                  className="min-w-[95px]"
                  size={"default"}
                  variant={"primary"}
                  icon={{ icon: <BsArrowLeftShort />, variant: "icon-label" }}
                  onClick={previousStep}
                >
                  Previousd
                </Button>
                <Button
                  className="min-w-[95px]"
                  size={"default"}
                  variant={"primary"}
                  icon={{ icon: <BsArrowRightShort />, variant: "icon-label" }}
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </StepLayout>
          <Link href="/app">
            <p className="underline text-gray-400">Cancel</p>
          </Link>
        </div>
      );
    default:
      return (
        <div className="w-full flex-col gap-4 min-h-screen flex items-center justify-center">
          <StepLayout active={step} steps={steps} onClickStep={setStep}>
            <div className="grid grid-cols-5 gap-4">
              {steps[step].fields?.map((item, i) => {
                if (item.type === "dropdown") {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <DropDown
                        value={item.value as string}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        isError={
                          errors[item.name] && touched[item.name] ? true : false
                        }
                        error={errors[item.name]}
                        options={["salon", "bardershop", "restaurant"]}
                        label={item.label}
                      />
                    </div>
                  );
                } else if (item.type === "textarea") {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <TextArea
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        isError={
                          errors[item.name] && touched[item.name] ? true : false
                        }
                        error={errors[item.name]}
                        label={item.label}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className={item.gridSpan}>
                      <Input
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={handleChange}
                        name={item.name}
                        isRequired={false}
                        isError={
                          errors[item.name] && touched[item.name] ? true : false
                        }
                        error={errors[item.name]}
                        label={item.label}
                      />
                    </div>
                  );
                }
              })}
              <div className="col-span-5 flex justify-end">
                <Button
                  className="min-w-[95px]"
                  size={"default"}
                  variant={"primary"}
                  icon={{ icon: <BsArrowRightShort />, variant: "icon-label" }}
                  onClick={nextStep}
                >
                  Next
                </Button>
              </div>
            </div>
          </StepLayout>
          <Link href="/app">
            <p className="underline text-gray-400">Cancel</p>
          </Link>
        </div>
      );
  }
}

function StepLayout(props: {
  children: ReactNode;
  active: number;
  steps: Isteps[];
  onClickStep: Function;
}) {
  return (
    <ModalCard className="w-[350px] p-[30px] lg:rounded-[14px] lg:w-[725px] flex flex-col gap-[25px] lg:gap-[50px] dark:bg-darkMode-500 dark:border-none">
      <div className="flex flex-col gap-0 lg:gap-[5px]">
        <h4 className="text-lg font-semibold text-gray-700 lg:text-2xl dark:text-gray-300">
          Let&apos;s Create your store account
        </h4>
        <p className="text-sm font-medium text-gray-400 lg:text-base">
          Start selling your services. its easy
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        {props.steps.map((item, i) => {
          const isActive = props.active === item.step;
          return (
            <div key={i} className="flex gap-2 items-center">
              <Button
                onClick={() => props.onClickStep(item.step)}
                size={"large"}
                className={`no-underline ${
                  isActive
                    ? "dark:text-violet-400"
                    : "text-gray-400 dark:text-gray-300"
                }`}
                variant={"tertiary"}
                icon={{
                  icon: isActive ? (
                    <BsCheckSquareFill />
                  ) : (
                    <BsXSquareFill className="text-gray-400" />
                  ),
                  variant: "icon-label",
                }}
              >
                {item.title}
              </Button>
            </div>
          );
        })}
      </div>
      <div>{props.children}</div>
    </ModalCard>
  );
}

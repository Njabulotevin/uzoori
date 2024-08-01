import { SpinningWheel } from "@/components/SpinningWheel";
import { getAuth } from "@/scripts/utils";
import Link from "next/link";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
  ReactNode,
} from "react";
import Button from "../Button";

export function AccountFooter({
  label,
  onClick,
  disabled,
  type,
  btnType,
}: {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type: Object;
  btnType?: "button" | "reset" | "submit" | undefined;
}) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Button
        title={label}
        type={btnType}
        onClick={onClick}
        disabled={disabled}
        size={"default"}
        variant={"primary"}
        className={"w-full"}
      />
      <Link href={type === "signIn" ? "/account/register" : "/account/login"}>
        <p className="text-neutral-300 text-[12px] font-medium">
          {type === "signIn"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span className="font-semibold text-violet-600 underline underline-offset-2">
            {type === "signIn" ? "Sign-Up" : "Sign-in"}
          </span>{" "}
        </p>
      </Link>

      <Link href={`/`}>
        <p className="text-neutral-300 text-[12px] font-semibold ">Cancel</p>
      </Link>
    </div>
  );
}

function Progress({ active, onClick }: { active: boolean; onClick: Function }) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`w-[90px] h-[5px] cursor-pointer ${
        active ? "bg-violet-600" : "bg-neutral-200"
      }  rounded-full`}
    ></div>
  );
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

// function Button(props: ButtonProps) {
//   const { label, onClick, ...rest } = props;

//   return (
//     <button
//       {...rest}
//       onClick={onClick}
//       className="btn btn-primary w-[100%] disabled:bg-primary-100"
//     >
//       {label}
//     </button>
//   );
// }

import { titleCap } from "../../scripts/utils";
import { Switch } from "@headlessui/react";
import { FormikHandlers } from "formik";
import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  ReactNode,
  MouseEventHandler,
} from "react";
import {
  BsChevronUp,
  BsChevronDown,
  BsExclamation,
  BsExclamationCircle,
  BsExclamationCircleFill,
  BsChevronRight,
  BsChevronLeft,
  BsXLg,
  BsX,
  BsCheck,
  BsCheckLg,
} from "react-icons/bs";
import { MdOutlineCheck } from "react-icons/md";

export function Input({
  value,
  onChange,
  placeholder,
  type,
  name,
  isRequired,
  isError,
  error,
  onBlur,
  width,
  label,
  icon,
  autoComplete,
  id,
}: {
  id?: string;
  autoComplete?: string;
  value: unknown;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name: string;
  isRequired: boolean;
  isError: boolean;
  error?: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  width?: string;
  label?: string;
  icon?: { element: ReactNode; position: "right" | "left"; onClick: Function };
}) {
  const [isActive, setIsActive] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  return (
    <div
      data-testid="input-testId"
      className="flex flex-col gap-[8px] relative"
    >
      {label && (
        <label
          htmlFor=""
          className={`px-[24px] text-[12px] lg:text-sm font-medium text-gray-700 dark:text-gray-300 ${
            isError ? "text-red-500" : ""
          }`}
        >
          {titleCap(label)} {isRequired && <span>*</span>}
        </label>
      )}

      <input
        id={id}
        className={`bg-white dark:bg-darkMode-300 border text-[12px] ${
          isError ? "border border-red-500" : ""
        }  ${
          icon?.position === "right"
            ? "pr-[38px] pl-5"
            : icon?.position === "left"
            ? "pl-[38px] pr-5"
            : "px-5"
        }  border-gray-300 dark:border-none rounded-lg max-h-[42px]  py-[10px] text-gray-700 dark:text-gray-300 lg:text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600`}
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value as string}
        name={name}
        ref={input}
        autoComplete={autoComplete}
      />
      {icon?.element && (
        <span
          onClick={(e) => {
            icon.onClick(e, input.current);
          }}
          className={`text-gray-400  absolute ${
            label ? "top-[39px]" : "top-[10px]"
          } cursor-pointer ${
            icon.position === "right" ? "right-[12px]" : "left-[12px]"
          } text-[20px]`}
        >
          {icon.element}
        </span>
      )}

      {isError && (
        <span className="text-red-500 px-[12px] text-xs font-medium flex gap-2 items-center">
          <BsExclamationCircleFill />
          {titleCap(error as string) || "check this field"}
        </span>
      )}
    </div>
  );
}

export function PhoneNumberInput({
  value,
  onChange,
  placeholder,
  type,
  name,
  isRequired,
  isError,
  error,
  onBlur,
  width,
  label,
  icon,
}: {
  value: unknown;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name: string;
  isRequired: boolean;
  isError: boolean;
  error?: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  width?: string;
  label: string;
  icon?: { element: ReactNode; position: "right" | "left" };
}) {
  const [isActive, setIsActive] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-[8px] relative">
      <label
        htmlFor=""
        className={`px-[24px] text-sm font-medium text-gray-700 dark:text-gray-300 ${
          isError ? "text-red-500" : ""
        }`}
      >
        {titleCap(label)} {isRequired && <span>*</span>}
      </label>

      <div className="flex gap-1 max-h-[42px]">
        <div className="text-sm font-medium border border-gray-400 dark:border-none dark:text-gray-300 px-5 flex gap-2 items-center py-[12px] bg-white dark:bg-darkMode-300 rounded-l-lg">
          <span>+27</span> <BsChevronDown />
        </div>
        <input
          className={`bg-white dark:bg-darkMode-300 border ${
            isError ? "border border-red-500" : ""
          }  ${
            icon?.element ? "px-[38px]" : "px-5"
          } border-gray-300 dark:border-none rounded-r-lg w-full py-[10px] text-gray-700 dark:text-gray-300 text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600`}
          type={type ? type : "text"}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value as string}
          name={name}
          ref={input}
        />
      </div>

      {isError && (
        <span className="text-red-500 px-[12px] text-xs font-medium flex gap-2 items-center">
          <BsExclamationCircleFill />
          {titleCap(error as string) || "check this field"}
        </span>
      )}
    </div>
  );
}

export function SubscriptInput({
  value,
  onChange,
  placeholder,
  type,
  name,
  isRequired,
  isError,
  error,
  onBlur,
  width,
  label,
  icon,
  subscript,
}: {
  value: unknown;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name: string;
  isRequired: boolean;
  isError: boolean;
  error?: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  width?: string;
  label: string;
  icon?: { element: ReactNode; position: "right" | "left" };
  subscript: string;
}) {
  const [isActive, setIsActive] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-[8px] relative">
      <label
        htmlFor=""
        className={`px-[24px] text-sm font-medium text-gray-700 dark:text-gray-300 ${
          isError ? "text-red-500" : ""
        }`}
      >
        {titleCap(label)} {isRequired && <span>*</span>}
      </label>

      <div className="max-h-[42px]">
        <span className="text-sm font-medium text-gray-400 px-5 py-[12px] bg-gray-200 rounded-l-full">
          {subscript}
        </span>
        <input
          className={`bg-white dark:bg-darkMode-300 border ${
            isError ? "border border-red-500" : ""
          }  ${
            icon?.element ? "px-[38px]" : "px-5"
          } border-gray-300 dark:border-none rounded-r-full  py-[10px] text-gray-700 dark:text-gray-300 text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600`}
          type={type ? type : "text"}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value as string}
          name={name}
          ref={input}
        />
      </div>
      {icon?.element && (
        <span
          className={`text-gray-400 dark:text-gray-100 absolute top-[39px] ${
            icon.position === "right" ? "right-[12px]" : "left-[12px]"
          } text-[20px]`}
        >
          {icon.element}
        </span>
      )}

      {isError && (
        <span className="text-red-500 px-[12px] text-xs font-medium flex gap-2 items-center">
          <BsExclamationCircleFill />
          {titleCap(error as string) || "check this field"}
        </span>
      )}
    </div>
  );
}

export function PriceInput({
  value,
  onChange,
  placeholder,
  type,
  name,
  isRequired,
  isError,
  error,
  onBlur,
  width,
  label,
  icon,
}: {
  value: unknown;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name: string;
  isRequired: boolean;
  isError: boolean;
  error?: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  width?: string;
  label: string;
  icon?: { element: ReactNode; position: "right" | "left" };
}) {
  const [isActive, setIsActive] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-[8px] relative">
      <label
        htmlFor=""
        className={`px-[24px] text-sm font-medium text-gray-700 dark:text-gray-300 ${
          isError ? "text-red-500" : ""
        }`}
      >
        {titleCap(label)} {isRequired && <span>*</span>}
      </label>

      <span
        className={`text-gray-700 dark:text-gray-300 absolute top-[39px] left-4 text-sm font-semibold`}
      >
        R
      </span>

      <input
        className={`bg-white dark:bg-darkMode-300 border px-[38px] max-h-[42px] border-gray-300 dark:border-none rounded-lg  py-[10px] text-gray-700 dark:text-gray-300 text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600`}
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value as string}
        name={name}
        ref={input}
      />

      <div
        className={`text-gray-700 dark:text-gray-300 absolute top-[39px] flex gap-2 items-center right-4 text-sm font-semibold`}
      >
        <span>ZAR</span> <BsChevronDown />
      </div>

      {isError && (
        <span className="text-red-500 px-[12px] text-xs font-medium flex gap-2 items-center">
          <BsExclamationCircleFill />
          {titleCap(error as string) || "check this field"}
        </span>
      )}
    </div>
  );
}

export function DropDown({
  value,
  onChange,
  placeholder,
  type,
  name,
  isRequired,
  isError,
  options,
  optionsDirection,
  label,
  error,
}: {
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  type?: string;
  name: string;
  isRequired: boolean;
  isError: boolean;
  options: string[];
  label: string;
  error?: string;
  optionsDirection?: "top" | "bottom";
}) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [active, setActive] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [top, setTop] = useState(70);

  useLayoutEffect(() => {
    console.log(optionsRef.current);

    const width: number = optionsRef.current?.offsetHeight as number;

    if (optionsDirection === "top") {
      setTop((width - 20) * -1);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2 relative">
      <label
        htmlFor=""
        className={`px-[24px] text-sm font-medium text-gray-700 dark:text-gray-300 ${
          isError ? "text-red-500" : ""
        }`}
      >
        {titleCap(label)} {isRequired && <span>*</span>}
      </label>

      <select
        value={value}
        // style={{ top: `${top}px` }}
        onChange={onChange}
        name={name}
        className={`bg-white dark:bg-darkMode-300 border ${
          isError ? "border border-red-500" : ""
        }  border-gray-300 dark:border-none rounded-lg px-4 flex flex-col gap-2  py-[10px] text-gray-700 dark:text-gray-300 text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600`}
      >
        {options.map((option, i) => {
          return (
            <option
              value={option}
              className="p-2 hover:bg-violet-600 px-4 hover:text-white rounded-lg cursor-pointer"
              key={i}
            >
              {option}
            </option>
          );
        })}
      </select>
      {isError && (
        <span className="text-red-500 px-[12px] text-xs font-medium flex gap-2 items-center">
          <BsExclamationCircleFill />
          {titleCap(error as string) || "check this field"}
        </span>
      )}
      {/* {isActive && <span onClick={()=>{console.log(input.current)}} className="absolute top-[41px] right-[10px] text-neutral-400"><BsXLg size={12}/></span>} */}
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  type,
  name,
  isRequired,
  isError,
  error,
  onBlur,
  width,
  label,
  icon,
  rows,
  autoComplete,
}: {
  autoComplete?: string;
  value: unknown;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  type?: string;
  name: string;
  isRequired: boolean;
  isError: boolean;
  error?: string;
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement>;
  width?: string;
  label: string;
  rows?: number;
  icon?: { element: ReactNode; position: "right" | "left" };
}) {
  const [isActive, setIsActive] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-[8px] relative">
      <label
        htmlFor=""
        className={`px-[24px] text-sm font-medium text-gray-700 dark:text-gray-300 ${
          isError ? "text-red-500" : ""
        }`}
      >
        {titleCap(label)} {isRequired && <span>*</span>}
      </label>

      <textarea
        className={`bg-white dark:bg-darkMode-300 border ${
          isError ? "border border-red-500" : ""
        }  ${
          icon?.element ? "px-[38px]" : "px-5"
        } border-gray-300 dark:border-none rounded-lg min-h-[42px]  py-[10px] text-gray-700 dark:text-gray-300 text-sm font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value as string}
        name={name}
        rows={rows ? rows : 10}
        autoComplete={autoComplete}
      ></textarea>

      {isError && (
        <span className="text-red-500 px-[12px] text-xs font-medium flex gap-2 items-center">
          <BsExclamationCircleFill />
          {titleCap(error as string) || "check this field"}
        </span>
      )}
    </div>
  );
}

export function Checkbox({
  label,
  onChange,
  checked,
}: {
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}) {
  return (
    <div className="font-primary flex gap-4 cursor-pointer">
      <input
        checked={checked}
        type="checkbox"
        className={`font-bold text-violet-600 cursor-pointer rounded-[5px] w-[20px] h-[20px] bg-gray-200  flex justify-center items-center`}
        onChange={onChange}
      />
      {label && (
        <label htmlFor="" className="font-primary font-semibold">
          {label}
        </label>
      )}
    </div>
  );
}

export function Toggle({
  isOn,
  setSwitch,
  label,
}: {
  isOn: boolean;
  setSwitch: Function;
  label?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex gap-4 items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-violet-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-lg`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-lg bg-white transition`}
        />
      </Switch>
      {label && <h4 className="text-sm font-medium">{label}</h4>}
    </div>
  );
}

export function Code({
  label,
  isError,
  value_1,
  value_2,
  value_3,
  value_4,
  name_1,
  name_2,
  name_3,
  name_4,
  onChange,
}: {
  label: string;
  isError: boolean;
  value_1: string;
  value_2: string;
  value_3: string;
  value_4: string;
  name_1: string;
  name_2: string;
  name_3: string;
  name_4: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const handleNextFocus = (id: string) => {
    const current = parseInt(id) + 1;
    const nextField = document.getElementById(current.toString());
    nextField?.focus();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {label && (
        <label
          htmlFor=""
          className={` text-sm font-medium text-gray-700 dark:text-gray-300 ${
            isError ? "text-red-500" : ""
          }`}
        >
          {titleCap(label)}
        </label>
      )}
      <div className="flex gap-4 items-center">
        <input
          id="1"
          value={value_1}
          onChange={(e) => {
            onChange(e);
            handleNextFocus(e.target.id);
          }}
          name={name_1}
          maxLength={1}
          className="bg-gray-200 dark:bg-darkMode-300 focus:bg-white dark:focus:bg-gray-500 border-gray-300 dark:border-none rounded-[14px] h-[50px] w-[50px]  py-[10px] px-[10px] text-gray-700 dark:text-gray-300 text-2xl text-center font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600"
        />
        <input
          id="2"
          value={value_2}
          onChange={(e) => {
            onChange(e);
            handleNextFocus(e.target.id);
          }}
          name={name_2}
          maxLength={1}
          className="bg-gray-200 dark:bg-darkMode-300 focus:bg-white dark:focus:bg-gray-500 border-gray-300 dark:border-none rounded-[14px] h-[50px] w-[50px]  py-[10px] px-[10px] text-gray-700 dark:text-gray-300 text-2xl text-center font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600"
        />
        <input
          id="3"
          value={value_3}
          onChange={(e) => {
            onChange(e);
            handleNextFocus(e.target.id);
          }}
          name={name_3}
          maxLength={1}
          className="bg-gray-200 dark:bg-darkMode-300 focus:bg-white dark:focus:bg-gray-500 border-gray-300 dark:border-none rounded-[14px] h-[50px] w-[50px]  py-[10px] px-[10px] text-gray-700 dark:text-gray-300 text-2xl text-center font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600"
        />
        <input
          id="4"
          value={value_4}
          onChange={(e) => {
            onChange(e);
            handleNextFocus(e.target.id);
          }}
          name={name_4}
          maxLength={1}
          className="bg-gray-200 focus:bg-white dark:focus:bg-gray-500 dark:bg-darkMode-300 border-gray-300 dark:border-none rounded-[14px] h-[50px] w-[50px]  py-[10px] px-[10px] text-gray-700 dark:text-gray-300 text-2xl text-center font-medium focus:ring-4 ring-offset-0 focus:ring-violet-100 dark:focus:ring-slate-700 focus:outline-none focus:border focus:border-violet-600"
        />
      </div>
    </div>
  );
}

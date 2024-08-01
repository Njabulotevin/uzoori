import React, { ReactNode } from "react";

export default function ModalCard({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`bg-white shadow-md rounded border border-gray-200 min-w-[300px] min-h-[300px] ${className}`}
    >
      {children}
    </div>
  );
}

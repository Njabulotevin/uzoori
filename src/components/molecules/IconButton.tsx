import React, { ReactNode } from "react";

function IconButton({
  children,
  icon,
  title,
  className,
  onClick

}: {
  className ?: string;
  children?: ReactNode;
  icon: ReactNode;
  title?: string;
  onClick : Function

}) {
  return (
<div className=""></div>
  );
}

export default IconButton;

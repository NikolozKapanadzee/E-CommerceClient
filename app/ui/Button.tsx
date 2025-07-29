import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md transition cursor-pointer hover:bg-sky-500 ${className}`}
      {...props}
    />
  );
};

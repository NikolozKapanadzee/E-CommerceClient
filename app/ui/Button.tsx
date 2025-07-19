import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-transparent text-black  hover:bg-sky-500 transition cursor-pointer ${className}`}
      {...props}
    />
  );
};

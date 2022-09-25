import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<any>;
  type?: "button" | "submit" | "reset" | undefined;
  href?: string;
  to?: string;
  danger?: boolean;
  inverse?: boolean;
  animate?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  className,
  onClick,
  type,
  href,
  to,
  danger,
  inverse,
  animate,
  disabled,
}) => {
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        type={type}
        className={twMerge(
          `rounded-full py-2.5 px-4 text-white font-semibold ${
            animate && "hover:animate-scale"
          } ${
            danger
              ? "bg-red-700 hover:bg-red-600"
              : inverse
              ? "bg-transparent text-primary border-primary border-2"
              : "hover:bg-secondary bg-primary"
          } ${className}`
        )}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        type={type}
        className={twMerge(
          `rounded-full inline-block py-2.5 px-4 text-white font-semibold ${
            animate && "hover:animate-scale"
          } ${
            danger
              ? "bg-red-700 hover:bg-red-600"
              : inverse
              ? "bg-transparent text-primary border-primary border-2"
              : "hover:bg-secondary bg-primary"
          } ${className}`
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={twMerge(
        `rounded-full py-2.5 px-4 text-white font-semibold disabled:bg-gray-400 disabled:hover:bg-gray-500 ${
          animate && "hover:animate-scale"
        } ${
          danger
            ? "bg-red-700 hover:bg-red-600"
            : inverse
            ? "bg-transparent text-primary border-primary border-2"
            : "hover:bg-secondary bg-primary"
        } ${className}`
      )}
    >
      {children}
    </button>
  );
};

export default Button;

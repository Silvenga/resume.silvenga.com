import type { AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: twMerge(
    "bg-gray-900 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white",
  ),
  ghost: twMerge(
    "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-900 dark:border-gray-400 border",
  ),
};

type LinkButtonProps = {
  variant?: keyof typeof variants;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: LinkButtonProps) {
  const disabled = !href;
  return (
    <a
      className={twMerge(
        className,
        "flex items-center justify-center py-3 px-4 rounded transition-all gap-3",
        variants[variant],
        disabled && "opacity-50 pointer-events-none cursor-default",
      )}
      href={href}
      type="application/pdf"
      rel="nofollow"
      {...props}
    >
      {children}
    </a>
  );
}

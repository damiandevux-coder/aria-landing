import { ReactNode } from "react";

const base =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn px-5 text-[15px] font-semibold transition-[background-color,transform,border-color] duration-200 ease-out-expo active:scale-[0.98] active:translate-y-px";

const variants = {
  primary:
    "bg-blue-fill text-white hover:bg-blue-fill-hover shadow-[0_8px_24px_-12px_rgba(61,107,245,0.7)]",
  secondary:
    "border border-line-2 bg-white/[0.04] text-fg hover:bg-white/[0.08] hover:border-white/20",
  ghost: "text-fg-2 hover:text-fg",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: Props) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

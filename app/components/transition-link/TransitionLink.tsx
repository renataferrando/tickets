// components/TransitionLink.tsx
import React, { MouseEvent, useContext } from "react";
import Link, { LinkProps } from "next/link";
import { TransitionContext } from "../transition-provider/TransitionProvider";

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const ctx = useContext(TransitionContext);

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    if (!ctx)
      return (window.location.href =
        typeof href === "string" ? href : href.pathname || "/");
    const to = typeof href === "string" ? href : href.pathname || "/";
    await ctx.playOutThenNavigate(to);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}

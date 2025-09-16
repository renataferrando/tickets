import React from "react";

type ArchiveIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  title?: string;
};

const Archive: React.FC<ArchiveIconProps> = ({
  size = 24,
  color,
  strokeWidth = 1.5,
  title,
  ...props
}) => {
  const strokeColor = color ?? "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      vectorEffect="non-scaling-stroke"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="4" y="9" width="16" height="11" rx="2" />
      <path d="M10 13h4" />
    </svg>
  );
};

export default Archive;

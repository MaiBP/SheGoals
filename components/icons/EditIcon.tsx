import React from "react";

export const EditIcon = ({
  fill = "currentColor",
  size = 24,
  ...props
}: {
  fill?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 20v2h2l8-8-2-2L4 20zm14-14a2.3 2.3 0 00-3.25 0L13 6.75l3.25 3.25L18 8.25a2.3 2.3 0 000-3.25L18 6z"
        fill={fill}
      />
    </svg>
  );
};

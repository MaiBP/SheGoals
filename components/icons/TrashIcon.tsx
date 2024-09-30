import React from "react";

export const TrashIcon = ({
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
        d="M9 3h6v1H9V3zM5 6v1h14V6H5zm2 2v11h10V8H7zm6 0v9h-2V8h2z"
        fill={fill}
      />
    </svg>
  );
};

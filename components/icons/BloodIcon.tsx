
import React from 'react';

interface BloodIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

const BloodIcon = ({
  className,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}: BloodIconProps & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2v4" />
      <path d="M12 6 9 9h6z" />
      <path d="M12 13v-3" />
      <path d="M9 16a3 3 0 1 0 6 0c0-3-3-3-3-6 0 3-3 3-3 6z" />
    </svg>
  );
};

export default BloodIcon;

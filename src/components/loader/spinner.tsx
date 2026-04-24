import type { FC } from "react";
interface Props {
  size?: "sm" | "md" | "lg";
  color?: string;
  designs?: string;
}

const Spinner: FC<Props> = ({ size = "md", color = "aqua", designs }) => {
  const sizeMap = {
    sm: "size-4",
    md: "size-8",
    lg: "size-12",
  };
  return (
    <div className={`flex items-center justify-center ${designs}`}>
      <div
        className={`${sizeMap[size]} animate-spin rounded-full`}
        style={{ borderTop: `2px solid ${color}` }}
      ></div>
    </div>
  );
};

export default Spinner;

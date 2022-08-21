import { CircleNotch } from "phosphor-react";

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 14 }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <CircleNotch className={`animate-spin text-white text-[${size}px]`} />
    </div>
  );
}

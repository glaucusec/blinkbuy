import React from "react";

type PriceButtonProps = {
  onChange: () => void;
  labelText: string;
  checked: boolean;
};

function PriceButton({ onChange, labelText, checked }: PriceButtonProps) {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex items-center p-2 cursor-pointer">
        <input
          onChange={onChange}
          checked={checked}
          type="checkbox"
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border transition-all before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-red-900 checked:bg-red-900 "
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label className="mt-px font-normal text-sm text-gray-700 cursor-pointer select-none">
        {labelText}
      </label>
    </div>
  );
}

export default PriceButton;

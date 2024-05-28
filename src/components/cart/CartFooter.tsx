import React from "react";

function CartFooter() {
  return (
    <div className="w-full bg-white border-t-2">
      <div className="px-8 py-4 flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold">₹1999</span>
          <span className="text-sm text-gray-500">Total Payable</span>
        </div>
        <button className="border-blinkblue bg-blinkblue text-white rounded-full px-3 py-2 outline-none">
          Proceed to Buy
        </button>
      </div>
    </div>
  );
}

export default CartFooter;

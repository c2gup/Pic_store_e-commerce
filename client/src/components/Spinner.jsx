import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2B2B2B]">
      <div
        className="animate-spin inline-block w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-[4px] border-blue-500 border-t-transparent rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;

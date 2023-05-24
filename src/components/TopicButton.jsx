import React from "react";

function TopicButton({ name, onClick, className, isDisabled = false }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`bg-[#B6C2D9] px-4 mr-2 rounded-xl text-[#1B3044] ${
        !isDisabled && "hover:font-bold"
      } ${className}`}
    >
      {name}
    </button>
  );
}

export default TopicButton;

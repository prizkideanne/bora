import React from "react";
import Love from "../assets/love.png";
import Loved from "../assets/loved.png";

function LoveButton({ loveCount, onClick, isDisabled = false }) {
  return (
    <div className="relative z-10 flex items-center justify-center">
      <button disabled={isDisabled} className="w-5 h-5 ml-2">
        <img
          src={isDisabled ? Loved : Love}
          onMouseEnter={(e) => {
            if (!isDisabled) {
              e.currentTarget.src = Loved;
            }
          }}
          onMouseOut={(e) => {
            if (!isDisabled) {
              e.currentTarget.src = Love;
            }
          }}
          onClick={onClick}
          alt="heart-logo"
          className="w-4 h-4 object-contain"
        />
      </button>
      {loveCount}
    </div>
  );
}

export default LoveButton;

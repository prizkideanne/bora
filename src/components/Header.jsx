import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-[#F1C831] flex flex-row justify-between items-center px-10 py-4">
      <Link to={'/'}>
        <button className="flex flex-row items-center">
          <img src={Logo} className="w-10" />
          <span className="text-[#1B3044]">BORA</span>
        </button>
      </Link>
      <div>
        <button className="border-2 shadow-md shadow-black border-[#9B3838] bg-[#9B3838] rounded-[20px] px-3 py-1 text-[#F3ECD7]">
          Login/Register
        </button>
      </div>
    </div>
  );
}

export default Header;

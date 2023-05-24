import React from "react";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import Twitter from "../assets/twitter.png";

function Footer() {
  return (
    <div className="bg-[#F1C831] flex flex-col items-center bottom-0 w-full py-8 px-4">
      <div className="flex flex-row justify-center items-center mb-10">
        <button>
          <img className="w-10 h-10 object-contain" src={Facebook} />
        </button>
        <button className="mx-5">
          <img className="w-10 h-10 object-contain" src={Instagram} />
        </button>
        <button>
          <img className="w-10 h-10 object-contain" src={Twitter} />
        </button>
      </div>
      <div className="text-center text-sm max-w-[500px] flex items-center justify-center">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium,
          quibusdam fugiat? Nemo cumque ex quo porro quisquam molestias commodi?
          Incidunt delectus provident vel dolore quibusdam recusandae modi
          similique itaque repudiandae.
        </p>
      </div>
    </div>
  );
}

export default Footer;

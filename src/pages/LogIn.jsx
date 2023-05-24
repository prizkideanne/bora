import React from "react";

function LogIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center bg-pink-400 w-[600px]">
        <p>Log In</p>
        <div className="flex flex-col w-[400px]">
          <input
            className="border border-black"
            type="text"
            placeholder="Username/Email/Phone"
          />
          <input
            className="border border-black"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="py-1 px-4 bg-white hover:opacity-75">Login</button>
        <p>
          Don't have an account? <span>Register Here</span>
        </p>
      </div>
    </div>
  );
}

export default LogIn;

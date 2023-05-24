import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div className="bg-[#F3ECD7]">
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;

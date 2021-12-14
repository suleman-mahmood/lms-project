import React from "react";

// components

import Sidebar from "components/Sidebar/RoSidebar.js";
import Footer from "components/Footers/Footer.js";

export default function Ro({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          <div className="h-12 bg-blueGray-100"></div>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

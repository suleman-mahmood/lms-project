import React from "react";

import Sidebar from "components/Sidebar/StudentSidebar";
import Footer from "components/Footers/Footer.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative h-screen md:ml-64 bg-blueGray-100">
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          <div className="h-12 bg-blueGray-100"></div>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

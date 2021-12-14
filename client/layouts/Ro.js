import React from "react";

// components

import Sidebar from "components/Sidebar/RoSidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Ro({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {/* <AdminNavbar /> */}
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

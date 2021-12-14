import React from "react";

import Sidebar from "components/Sidebar/StudentSidebar";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative h-screen md:ml-64 bg-blueGray-100">
        {/* <AdminNavbar /> */}
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}

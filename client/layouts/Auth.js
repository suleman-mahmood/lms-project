import React from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('https://lums.edu.pk/sites/default/files/styles/international_955x716/public/2020-05/DJI_0005%20copy_0.jpg?h=da92fc0b')",
            }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}

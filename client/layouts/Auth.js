import React from "react";

import Footer from "components/Footers/Footer.js";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-screen py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('https://lums.edu.pk/sites/default/files/styles/international_955x716/public/2020-05/DJI_0005%20copy_0.jpg?h=da92fc0b')",
            }}
          ></div>
          {children}
          <Footer />
        </section>
      </main>
    </>
  );
}

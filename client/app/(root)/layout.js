import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;

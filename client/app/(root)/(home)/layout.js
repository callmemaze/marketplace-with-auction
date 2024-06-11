import { Metadata } from "next";
import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

export const metadata = {
  title: "LocalLance",
  description: "A platform for freelancing.",
};

const HomeLayout = ({ children }) => {
  return (
    <main className="relative">
      <Navbar />
      {children}
    </main>
  );
};

export default HomeLayout;

import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata = {
  title: "Marketplace",
  description: "A platform for buyer and seller.",
};

const HomeLayout = ({ children }) => {
  return <main className="relative">{children}</main>;
};

export default HomeLayout;

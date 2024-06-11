import "./globals.css";

import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Marketplace",
  description: "Marketplace for Nepal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}

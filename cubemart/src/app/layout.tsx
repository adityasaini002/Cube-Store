import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";
import InitUser from "@/InitUser";
import { Store } from "lucide-react";



export const metadata: Metadata = {
  title: "cubemart | 10 minutes grocery delivery App",
  description: "10 minutes grocery delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-b from-red-50 to-white">
        <Provider>
          <InitUser />
          {children}
        </Provider>
      </body>
    </html>
  );
}

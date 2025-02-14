import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "A simple dictionary application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-inter ${inter.variable} antialiased`}>
        {children}
        <p className="text-gray-600 absolute bottom-4 text-sm w-full text-center">
          made with <span className="text-red-500">♥</span> by{" "}
          <Link href="https://kcsquid.xyz" className="underline">
            kcsquid
          </Link>
        </p>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster as Sonner } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cloud Clove",
  description: "The only solution you ever need for secure files storage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={cn(`font-outfit antialiased`, outfit.variable)}>
        {children}
        <Sonner />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { Suspense } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: "NL Academy Payments",
  description: "Payment portal for NL Academy",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body 
          className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
          )}>
          <Suspense>
            {children}
          </Suspense>
          <Toaster />
        </body>
      </html>
    </ReactQueryProvider>
  );
}

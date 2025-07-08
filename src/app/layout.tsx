import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalendarProvider } from "@/components/Context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gp-schedule",
  description: "gp schedule app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CalendarProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-50 `}
        >
          {children}
          <div className="fixed bottom-0 w-full h-30 bg-gradient-to-t from-white/90 to-transparent pointer-events-none -z-10"></div>
        </body>
      </CalendarProvider>
    </html>
  );
}

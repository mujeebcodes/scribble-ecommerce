import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/Nav";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Toaster from "@/components/ui/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("px-6 md:px-12 max-w-7xl", `${inter.className}`)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

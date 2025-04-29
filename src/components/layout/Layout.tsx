
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
  showFullHeight?: boolean;
  showScrollArea?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children,
  showFullHeight = true,
  showScrollArea = false,
  className = ""
}) => {
  if (showScrollArea) {
    return (
      <div className={`flex flex-col min-h-screen ${className}`}>
        <Header />
        <ScrollArea className="flex-1">
          <main className="flex-1 mt-16">{children}</main>
        </ScrollArea>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${showFullHeight ? 'min-h-screen' : ''} ${className}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;

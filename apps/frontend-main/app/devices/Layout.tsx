import { AppSidebar } from "@/components/components/app-sidebar";
import { SidebarProvider } from "@/components/components/ui/sidebar";
import React, { ReactNode } from "react";

const DeviceLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DeviceLayout;

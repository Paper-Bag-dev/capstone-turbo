import { AppSidebar } from "@/components/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/components/ui/sidebar";
import React, { ReactNode } from "react";

const AnalyticsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AnalyticsLayout;

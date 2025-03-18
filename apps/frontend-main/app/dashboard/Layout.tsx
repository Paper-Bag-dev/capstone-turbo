import { AppSidebar } from "@/components/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/components/ui/sidebar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <main className="w-[100%]">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

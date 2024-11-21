import { Outlet } from "react-router-dom";
import { FC } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

const BaseLayout: FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default BaseLayout;

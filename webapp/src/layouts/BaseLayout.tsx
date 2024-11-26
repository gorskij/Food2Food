import { Outlet } from "react-router-dom";
import { FC } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import React from "react";
import { cn } from "@/lib/utils";
import { Apple } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import LanguageSelector from "@/components/LanguageSelector";

const BaseLayout: FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10 bg-green-500 text-white h-16 flex flex-row justify-between px-4 shadow-md">
        <span className="text-2xl font-extrabold flex justify-center items-center">
          Food2Food
          <Apple className="w-6 h-6 text-white ml-2" />
        </span>
        <div className=" flex items-center">
          <ModeToggle />
          <LanguageSelector />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <AppSidebar />
          <SidebarTrigger />
          <div className="flex-1 flex justify-center ">
            <Outlet />
          </div>
        </SidebarProvider>
        <footer
          className={cn(
            "sticky bottom-0 left-0 w-full h-12 flex items-center justify-center bg-green-500 text-xl text-white"
          )}
        >
          <span>© 2024 Food2Food</span>
        </footer>
      </div>
    </div>
  );
};

export default BaseLayout;

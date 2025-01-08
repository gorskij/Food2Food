import { Outlet } from "react-router-dom";
import { FC } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import React from "react";
import { cn } from "@/lib/utils";
import { Apple } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import LanguageSelector from "@/components/LanguageSelector";
import UserAuth from "@/components/UserAuth";
import SessionExpiredDialog from "@/components/SessionExpiredDialog";

const BaseLayout: FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex w-full h-full flex-col">
      <div className="sticky top-0 z-10 bg-green-500 text-background h-16 flex flex-row justify-between px-4 shadow-md">
        <span className="text-2xl font-extrabold flex justify-center items-center">
          <span className="hidden sm:inline">Food2Food</span>
          <span className="inline sm:hidden">F2F</span>
          <Apple className="w-6 h-6 text-background ml-2" />
        </span>
        <div className=" flex items-center">
          <UserAuth />
          <ModeToggle />
          <LanguageSelector />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between pr-6">
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <AppSidebar />
          <SidebarTrigger />
          <div className="flex-1 flex justify-center ">
            <Outlet />
            <SessionExpiredDialog />
          </div>
        </SidebarProvider>
      </div>
      <footer
        className={cn(
          "sticky bottom-0 left-0 w-full h-12 flex items-center justify-center bg-green-500 text-xl text-background"
        )}
      >
        <span>© 2025 Food2Food</span>
      </footer>
    </div>
  );
};

export default BaseLayout;

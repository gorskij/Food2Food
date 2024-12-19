import { Outlet } from "react-router-dom";
import { FC } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import React from "react";
import { cn } from "@/lib/utils";
import { Apple, ChevronsUpDown, LogOut, Settings, User2 } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useUserStore } from "@/store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SignInGoogleButton from "@/components/SignInGoogleButton";
import SignInGithubButton from "@/components/SignInGithubButton";
import SessionExpiredDialog from "@/components/SessionExpiredDialog";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";

const BaseLayout: FC = () => {
  const [open, setOpen] = React.useState(true);
  const { isAuthenticated, username, clearToken } = useUserStore();

  const handleLogout = () => {
    toast({
      variant: "success",
      title: t("logout.successTitle"),
      description: t("logout.successDescription"),
    });
    clearToken();
  };

  return (
    <div className="flex w-full min-h-screen flex-col">
      <div className="sticky top-0 z-10 bg-green-500 text-background h-16 flex flex-row justify-between px-4 shadow-md">
        <span className="text-2xl font-extrabold flex justify-center items-center">
          Food2Food
          <Apple className="w-6 h-6 text-background ml-2" />
        </span>
        <div className=" flex items-center">
          {isAuthenticated() ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <User2 />
                    {username}
                    <ChevronsUpDown className="ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Settings />
                    <span>Opcje Użytkownika</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    <span>Wyloguj</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <SignInGoogleButton />
              <SignInGithubButton />
            </>
          )}
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
            <SessionExpiredDialog />
          </div>
        </SidebarProvider>
        <footer
          className={cn(
            "sticky bottom-0 left-0 w-full h-12 flex items-center justify-center bg-green-500 text-xl text-background"
          )}
        >
          <span>© 2024 Food2Food</span>
        </footer>
      </div>
    </div>
  );
};

export default BaseLayout;

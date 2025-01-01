import React from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User2, LogOut, Settings, ChevronsUpDown } from "lucide-react";
import SignInGoogleButton from "@/components/SignInGoogleButton";
import SignInGithubButton from "@/components/SignInGithubButton";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";

const UserAuth: React.FC = () => {
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
    <div className="flex items-center">
      {isAuthenticated() ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              <User2 />
              {username}
              <ChevronsUpDown className="ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-auto">
            <DropdownMenuItem className="cursor-pointer">
              <Settings />
              <span>{t("userAuth.settings")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              <span>{t("userAuth.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex space-x-2">
          <SignInGoogleButton />
          <SignInGithubButton />
        </div>
      )}
    </div>
  );
};

export default UserAuth;

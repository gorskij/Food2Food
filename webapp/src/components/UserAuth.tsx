import React from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2, LogOut, Settings, ChevronsUpDown, LogIn } from "lucide-react";
import SignInGoogleButton from "@/components/SignInGoogleButton";
import SignInGithubButton from "@/components/SignInGithubButton";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";
import { useQueryClient } from "@tanstack/react-query";

const UserAuth: React.FC = () => {
  const { isAuthenticated, username, clearToken } = useUserStore();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    toast({
      variant: "success",
      title: t("logout.successTitle"),
      description: t("logout.successDescription"),
    });
    clearToken();
    queryClient.invalidateQueries({ queryKey: ["userPreference"] });
  };

  return (
    <div className="flex items-center">
      {isAuthenticated() ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              <User2 />
              <span className="hidden sm:inline">{username}</span>
              <ChevronsUpDown className="ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-auto">
            <DropdownMenuLabel className="flex flex-row">
              <User2 className="mr-2 w-4" />
              {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              <LogIn />
              <span>{t("userAuth.signIn")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-auto flex flex-col">
            <DropdownMenuItem asChild>
              <SignInGoogleButton />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SignInGithubButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserAuth;

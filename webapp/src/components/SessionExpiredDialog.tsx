import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useUserStore } from "@/store/userStore";
import { isTokenValid } from "@/utils/jwt";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import GoogleLoginButton from "./SignInGoogleButton";
import GithubLoginButton from "./SignInGithubButton";
import { toast } from "@/hooks/use-toast";

const SessionExpiredDialog: FC = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const { token, clearToken } = useUserStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (token !== undefined && !isTokenValid(token)) {
        setOpen(true);
      }
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const handleLogout = () => {
    toast({
      variant: "success",
      title: t("logout.successTitle"),
      description: t("logout.successDescription"),
    });
    clearToken();
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            <div>{t("sessionExpiredDialog.title")}</div>
          </DialogTitle>
          <DialogDescription>
            {t("sessionExpiredDialog.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col sm:flex-col items-center gap-4 w-full">
            <Button className="w-full sm:w-auto" onClick={handleLogout}>
              {t("sessionExpiredDialog.signOut")}
            </Button>
            <GoogleLoginButton />
            <GithubLoginButton />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpiredDialog;

import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userStore";
import { toast } from "./hooks/use-toast";
import { useTranslation } from "react-i18next";

const AuthGuard: FC = () => {
  const { token, clearToken } = useUserStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn =
    token !== undefined;

  useEffect(() => {
    if (!isLoggedIn) {
      clearToken();
      toast({
        variant: "destructive",
        title: t("authGuard.noAccess"),
        description: t("authGuard.noAccessDescription"),
      });
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, t, navigate, clearToken]);

  return <>{isLoggedIn ? <Outlet /> : null}</>;
};

export default AuthGuard;

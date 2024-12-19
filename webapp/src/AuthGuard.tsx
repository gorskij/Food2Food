import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userStore";
import { isTokenValid } from "./utils/jwt";
import { toast } from "./hooks/use-toast";
import { useTranslation } from "react-i18next";

const AuthGuard: FC = () => {
  const { token } = useUserStore();
  const isAuthenticated = useUserStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn =
    isAuthenticated && token !== undefined && isTokenValid(token);

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: t("authGuard.noAccess"),
        description: t("authGuard.noAccessDescription"),
      });
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, t, navigate]);

  return <>{isLoggedIn ? <Outlet /> : null}</>;
};

export default AuthGuard;

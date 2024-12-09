import { api } from "@/data/api";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import { AuthenticateResponse } from "@/types/AuthenticateResponse";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const GoogleCallback: FC = () => {
  const called = useRef(false);
  const navigate = useNavigate();
  const { setToken, token } = useUserStore();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      if (!token) {
        try {
          if (called.current) {
            return;
          }
          called.current = true;
          const result = await api.get<AuthenticateResponse>(
            `auth/google-oauth/token/${window.location.search}`
          );

          if (result.status === 201) {
            toast({
              variant: "default",
              title: t("loginPage.acountCreated"),
              description: t("loginPage.acountCreatedDescription"),
            });
          }

          setToken(result.data.token);
        } catch (err) {
          toast({
            variant: "destructive",
            title: t("loginPage.loginError"),
            description: t("loginPage.tryAgain"),
          });
        }
      } else {
        navigate("/");
      }
    })();
  }, [navigate, token]);

  return <></>;
};

export default GoogleCallback;

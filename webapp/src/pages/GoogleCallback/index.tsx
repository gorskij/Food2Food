import { api } from "@/data/api";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/languageStore";
import { useUserStore } from "@/store/userStore";
import { AuthenticateResponse } from "@/types/AuthenticateResponse";
import { ErrorCode } from "@/types/ErrorCode";
import { AxiosError } from "axios";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const GoogleCallback: FC = () => {
  const called = useRef(false);
  const navigate = useNavigate();
  const { setToken, token } = useUserStore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    (async () => {
      try {
        if (called.current) {
          return;
        }
        called.current = true;
        const result = await api.get<AuthenticateResponse>(
          `auth/google-oauth/token/${window.location.search}`
        );

        setToken(result.data.token);
        setLanguage(result.data.language);

        if (result.status === 201) {
          toast({
            variant: "success",
            title: t("login.accountCreated"),
            description: t("login.accountCreatedDescription"),
          });
        } else if (result.status === 200) {
          toast({
            variant: "success",
            title: t("login.loggedIn"),
            description: t("login.loggedInDescription"),
          });
        }

        navigate("/");
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: t("login.loginError"),
          description: t(
            `errors.${(axiosError.response?.data as ErrorCode).exceptionCode}`
          ),
        });
        navigate("/");
      }
    })();
  }, [navigate, setLanguage, setToken, t, toast, token]);

  return <></>;
};

export default GoogleCallback;

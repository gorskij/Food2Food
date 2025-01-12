import { api } from "@/data/api";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import { AuthenticateResponse } from "@/types/AuthenticateResponse";
import axios from "axios";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const GithubCallback: FC = () => {
  const called = useRef(false);
  const navigate = useNavigate();
  const { setToken, token } = useUserStore();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        if (called.current) {
          return;
        }
        called.current = true;
        const result = await api.get<AuthenticateResponse>(
          `auth/github-oauth/token/${window.location.search}`
        );

        setToken(result.data.token);

        if (result.status === 201) {
          toast({
            variant: "success",
            title: t("loginPage.acountCreated"),
            description: t("login.acountCreatedDescription"),
          });
        } else if (result.status === 200) {
          toast({
            variant: "success",
            title: t("login.loggedIn"),
            description: t("login.loggedInDescription"),
          });
        }

        navigate("/");
      } catch (err) {
        if (!axios.isAxiosError(err)) {
          toast({
            variant: "destructive",
            title: t("login.loginError"),
            description: t("login.tryAgain"),
          });
          navigate("/");
          return;
        }
        if (err.status === 400) {
          toast({
            variant: "destructive",
            title: t("login.creationError"),
            description: t("login.creationErrorDescription"),
          });
        } else if (err.status === 409) {
          toast({
            variant: "destructive",
            title: t("login.emailConflict"),
            description: t("login.emailConflictDescription"),
          });
        }
        navigate("/");
      }
    })();
  }, [navigate, setToken, t, toast, token]);

  return <></>;
};

export default GithubCallback;

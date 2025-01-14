import { api } from "./api";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/hooks/use-toast.ts";
import { useTranslation } from "react-i18next";

const useAxiosPrivate = () => {
  const { token, setToken, clearToken } = useUserStore();
  const { t } = useTranslation();
  const navigation = useNavigate();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token && !config.url?.includes("auth")) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        error = error as AxiosError;

        if (error.response?.status === 401 || error.response?.status === 403) {
          clearToken();
          toast({
            variant: "destructive",
            title: t("axiosPrivate.unauthorized"),
            description: t("axiosPrivate.unauthorizedDescription"),
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token, clearToken, navigation, setToken, t]);

  return { api };
};

export default useAxiosPrivate;

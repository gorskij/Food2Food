import { apiAxios } from "./api";
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
    const requestInterceptor = apiAxios.interceptors.request.use(
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

    const responseInterceptor = apiAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        error = error as AxiosError;

        if (error.response?.status === 401) {
          clearToken();
          toast({
            variant: "destructive",
            title: t("axiosPrivate.unauthorized"),
            description: t("axiosPrivate.unauthorizedDescription"),
          });
        }

        if (error.response?.status === 403) {
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
      apiAxios.interceptors.request.eject(requestInterceptor);
      apiAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, clearToken, navigation, setToken, t]);

  return { apiAxios };
};

export default useAxiosPrivate;

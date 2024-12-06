import { api } from "./api";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { t } from "i18next";
import {toast} from "@/hooks/use-toast.ts";

const useAxiosPrivate = () => {
  const {
    token,
    setToken,
    clearToken,
  } = useUserStore();

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

        if (error.response?.status === 401) {
          clearToken();
          navigation("/login");
          toast({
            title: t("sessionExpired"),
            description: t("sessionExpiredDescription"),
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token, clearToken, navigation, setToken]);

  return { api };
};

export default useAxiosPrivate;

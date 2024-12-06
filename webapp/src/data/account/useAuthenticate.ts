import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import { useToast } from "@/hooks/use-toast";
import {ErrorCode} from "@/types/ErrorCode.ts";

type AuthenticateRequest = {
  username: string;
  password: string;
  // language: string;
};

export const useAuthenticate = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: async (data: AuthenticateRequest) => {
      const response = await api.post("auth/login", data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: t("loginPage.loginError"),
        description: t(
          `errors.${(error.response?.data as ErrorCode).exceptionCode}`
        ),
      });
    },
  });

  return { authenticate: mutateAsync, isSuccess, isPending };
};

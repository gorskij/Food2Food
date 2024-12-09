import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { t } from "i18next";
import { api } from "../api";

type OAuth2UrlResponse = {
  url: string;
};

export const useOAuthGithubUrl = () => {
  const { data } = useQuery({
    queryKey: ["oauthGithubUrl"],
    queryFn: async () => {
      try {
        const response = await api.get<OAuth2UrlResponse>(
          "auth/github-oauth/url"
        );
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: t("userDataPage.error"),
          description: t(
            `errors.${(axiosError.response?.data as ErrorCode).exceptionCode}`
          ),
        });
        return Promise.reject(error);
      }
    },
  });

  return { oAuthUrl: data };
};

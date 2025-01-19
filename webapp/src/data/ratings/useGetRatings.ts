import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Rating } from "@/types/Rating";

interface RatingsResponse {
  content: Rating[];
}

export const useGetRatings = () => {
  const { t } = useTranslation();
  return useQuery({
    queryKey: ["ratings"],
    queryFn: async () => {
      try {
        const response = await api.get<RatingsResponse>("/ratings");
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: t("error.baseTitle"),
          description: t(
            `errors.${
              (axiosError.response?.data as ErrorCode)?.exceptionCode ||
              "unknownError"
            }`
          ),
        });
        return Promise.reject(axiosError);
      }
    },
  });
};

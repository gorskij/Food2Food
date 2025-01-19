import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { NutritionalValueName } from "@/types/NutritionalValueName";

interface NutritionalValueNamesResponse {
  content: NutritionalValueName[];
}

export const useGetNutritionalValueNames = () => {
  const { t } = useTranslation();
  return useQuery({
    queryKey: ["nutritionalValueNames"],
    queryFn: async () => {
      try {
        const response = await api.get<NutritionalValueNamesResponse>(
          "/nutritional-value-names"
        );
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

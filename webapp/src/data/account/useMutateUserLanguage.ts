import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

interface ChangeLanguageRequest {
  language: "pl" | "en";
}

export const useMutateUserLanguage = () => {
  const { apiAxios } = useAxiosPrivate();
  const { t } = useTranslation();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: ChangeLanguageRequest) => {
      await apiAxios.post("/users/me/language", data);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("changeLanguage.successTitle"),
        description: t("changeLanguage.successDescription"),
      });
    },
    onError: (axiosError: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("changeLanguage.error"),
        description: t(
          `errors.${
            (axiosError.response?.data as ErrorCode)?.exceptionCode ||
            "unknownError"
          }`
        ),
      });
    },
  });

  return { mutateUserLanguage: mutateAsync };
};

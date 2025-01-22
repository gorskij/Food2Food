import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { ErrorCode } from "@/types/ErrorCode";
import { useToast } from "@/hooks/use-toast";
import { UserPreferenceSimplified } from "@/types/UserPreferenceSimplified";

interface UpdateUserPreferenceRequest {
  userPreference: UserPreferenceSimplified;
  etag: string;
}

export const useMutateUserPreference = () => {
  const queryClient = useQueryClient();
  const { apiAxios } = useAxiosPrivate();
  const { t } = useTranslation();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpdateUserPreferenceRequest) => {
      await apiAxios.put(`/user-preference`, data.userPreference, {
        headers: {
          "If-Match": data.etag,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreference"] });
      toast({
        variant: "success",
        title: t("editUserPreference.successTitle"),
        description: t("editUserPreference.successDescription"),
      });
    },
    onError: (error: AxiosError) => {
      queryClient.invalidateQueries({ queryKey: ["userPreference"] });
      toast({
        variant: "destructive",
        title: t("editUserPreference.errorTitle"),
        description: t(
          `errors.${(error.response?.data as ErrorCode).exceptionCode}`
        ),
      });
    },
  });
};

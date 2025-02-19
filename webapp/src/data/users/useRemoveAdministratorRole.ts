import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

export const useRemoveAdministratorRole = () => {
  const { apiAxios } = useAxiosPrivate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await apiAxios.put(`/admins/${id}/remove-role`);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("removeAdministratorRole.successTitle"),
        description: t("removeAdministratorRole.successDescription"),
      });
    },
    onError: (axiosError: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("removeAdministratorRole.error"),
        description: t(
          `errors.${
            (axiosError.response?.data as ErrorCode)?.exceptionCode ||
            "unknownError"
          }`
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { removeAdministratorRole: mutateAsync };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

export const useBlockUser = () => {
  const { apiAxios } = useAxiosPrivate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await apiAxios.post(`/users/${id}/block`);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("blockUser.successTitle"),
        description: t("blockUser.successDescription"),
      });
    },
    onError: (axiosError: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("blockUser.error"),
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

  return { blockUser: mutateAsync };
};

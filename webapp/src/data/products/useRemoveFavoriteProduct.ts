import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

export const useRemoveFavoriteProduct = () => {
  const { api } = useAxiosPrivate();
  const { t } = useTranslation();

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/favorite-products/${id}`);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("removeFavoriteProduct.successTitle"),
        description: t("removeFavoriteProduct.successDescription"),
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("removeFavoriteProduct.error"),
        description: t(
          `errors.${(error.response?.data as ErrorCode).exceptionCode}`
        ),
      });
    },
  });

  return { removeFavoriteProduct: mutateAsync };
};

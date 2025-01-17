import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

export const useRemoveFavoriteProduct = () => {
  const { api } = useAxiosPrivate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

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
    onError: (axiosError: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("removeFavoriteProduct.error"),
        description: t(
          `errors.${
            (axiosError.response?.data as ErrorCode)?.exceptionCode ||
            "unknownError"
          }`
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["checkFavoriteProduct"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    },
  });

  return { removeFavoriteProduct: mutateAsync };
};

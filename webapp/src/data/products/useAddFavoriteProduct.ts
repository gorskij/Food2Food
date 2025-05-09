import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

export const useAddFavoriteProduct = () => {
  const { apiAxios } = useAxiosPrivate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await apiAxios.post(`/favorite-products/${id}`);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("addFavoriteProduct.successTitle"),
        description: t("addFavoriteProduct.successDescription"),
      });
    },
    onError: (axiosError: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("addFavoriteProduct.error"),
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

  return { addFavoriteProduct: mutateAsync };
};

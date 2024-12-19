import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/data/useAxiosPrivate.ts";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";

export const useAddFavoriteProduct = () => {
  const { api } = useAxiosPrivate();
  const { t } = useTranslation();

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await api.post(`/favorite-products/${id}`);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: t("addFavoriteProduct.successTitle"),
        description: t("addFavoriteProduct.successDescription"),
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: t("addFavoriteProduct.error"),
        description: t(
          `errors.${(error.response?.data as ErrorCode).exceptionCode}`
        ),
      });
    },
  });

  return { addFavoriteProduct: mutateAsync };
};

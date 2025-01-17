import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { ErrorCode } from "@/types/ErrorCode";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";

interface BooleanResponse {
  result: boolean;
}

export const useCheckFavoriteProduct = (productId: string) => {
  const { api } = useAxiosPrivate();
  const { isAuthenticated } = useUserStore();
  const { t } = useTranslation();

  return useQuery({
    queryKey: ["checkFavoriteProduct", productId],
    queryFn: async () => {
      try {
        const response = await api.get<BooleanResponse>(
          `/favorite-products/${productId}`
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
    enabled: isAuthenticated() && !!productId,
  });
};

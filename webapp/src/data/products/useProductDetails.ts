import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { AxiosError } from "axios";
import { ProductDetails } from "@/types/ProductDetails";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";
import { ErrorCode } from "@/types/ErrorCode";

export const useGetProductDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      try {
        const response = await api.get<ProductDetails>(`/products/${id}`);
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
    enabled: Boolean(id),
  });
};

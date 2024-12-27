import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";

interface Product {
  id: string;
  productName: string;
  productDescription: string;
  ean: string;
  labelImage: string | null;
}

interface ProductsRequest {
  pageNumber: number;
  pageSize: number;
  name?: string;
}

interface ProductsResponse {
  content: Product[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export const useGetProducts = (request: ProductsRequest) => {
  return useQuery({
    queryKey: ["products", request.pageNumber, request.pageSize, request.name],
    queryFn: async () => {
      try {
        const response = await api.get<ProductsResponse>("/products", {
          params: {
            page: request.pageNumber,
            size: request.pageSize,
            name: request.name || undefined,
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: t("error.baseTitle"),
          description: t(
            `errors.${(axiosError.response!.data as ErrorCode).exceptionCode}`
          ),
        });
        return Promise.reject(axiosError);
      }
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";
import { SimplifiedProduct } from "@/types/SimplifiedProduct";

interface ProductsRequest {
  pageNumber: number;
  pageSize: number;
  name?: string;
}

interface ProductsResponse {
  content: SimplifiedProduct[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export const useGetTopProducts = () => {
  return useQuery({
    queryKey: ["top-products"],
    queryFn: async () => {
      try {
        const response = await api.get<ProductsResponse>("/products", {
          params: {
            page: 0,
            size: 10,
            sortBy: "favoriteCount",
            sortDirection: "desc",
          },
        });
        return response.data.content;
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
  });
};

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
            `errors.${
              (axiosError.response?.data as ErrorCode)?.exceptionCode ||
              "unknownError"
            }`
          ),
        });
        return Promise.reject(axiosError);
      }
    },
  });
};

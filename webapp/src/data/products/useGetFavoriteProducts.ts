import { useQuery } from "@tanstack/react-query";
// import useAxiosPrivate from "../useAxiosPrivate";
import { AxiosError } from "axios";
import useAxiosPrivate from "../useAxiosPrivate";
// import { toast } from "@/components/ui/use-toast";
// import { t } from "i18next";
// import { ErrorCode } from "@/@types/errorCode";

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

export const useGetFavoriteProducts = (request: ProductsRequest) => {
  const { api } = useAxiosPrivate();
  return useQuery({
    queryKey: [
      "favoriteProducts",
      request.pageNumber,
      request.pageSize,
      request.name,
    ],
    queryFn: async () => {
      try {
        const response = await api.get<ProductsResponse>("/favorite-products", {
          params: {
            page: request.pageNumber,
            size: request.pageSize,
            name: request.name || undefined,
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError);
      }
    },
  });
};

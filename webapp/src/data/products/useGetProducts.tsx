import { useQuery } from "@tanstack/react-query";
// import useAxiosPrivate from "../useAxiosPrivate";
import { AxiosError } from "axios";
import { api } from "../api";
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
}

interface ProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const useGetProducts = (request: ProductsRequest) => {
  // const { api } = useAxiosPrivate();

  return useQuery({
    queryKey: ["products", request.pageNumber, request.pageSize],
    queryFn: async () => {
      try {
        const response = await api.get<ProductsResponse>("/products", {
          params: {
            page: request.pageNumber,
            size: request.pageSize,
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        // toast({
        //   variant: "destructive",
        //   title: t("error.baseTitle"),
        //   description: t(
        //     `errors.${
        //       (axiosError.response?.data as ErrorCode)?.exceptionCode ||
        //       "unknownError"
        //     }`
        //   ),
        // });
        return Promise.reject(axiosError);
      }
    },
  });
};

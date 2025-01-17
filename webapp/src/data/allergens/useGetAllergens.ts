import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";

interface Allergen {
  id: string;
  name: string;
}

interface AllergensResponse {
  content: Allergen[];
}

export const useGetAllergens = () => {
  return useQuery({
    queryKey: ["allergens"],
    queryFn: async () => {
      try {
        const response = await api.get<AllergensResponse>("/allergens");
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

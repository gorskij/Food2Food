import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";

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
        return Promise.reject(axiosError);
      }
    },
  });
};

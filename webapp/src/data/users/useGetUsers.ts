import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";
import { User } from "@/types/User";
import useAxiosPrivate from "../useAxiosPrivate";

interface UsersRequest {
  pageNumber: number;
  pageSize: number;
  username?: string;
}

interface UsersResponse {
  content: User[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export const useGetUsers = (request: UsersRequest) => {
  const { apiAxios } = useAxiosPrivate();

  const query = useQuery({
    queryKey: ["users", request.pageNumber, request.pageSize, request.username],
    queryFn: async () => {
      try {
        const response = await apiAxios.get<UsersResponse>("/users", {
          params: {
            page: request.pageNumber,
            size: request.pageSize,
            username: request.username || undefined,
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

  return { ...query, refetch: query.refetch };
};

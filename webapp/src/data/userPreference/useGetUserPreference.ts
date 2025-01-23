import { UserPreference } from "@/types/UserPreference";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { t } from "i18next";
import { ErrorCode } from "@/types/ErrorCode";
import useAxiosPrivate from "../useAxiosPrivate";
import { useUserStore } from "@/store/userStore";

export const useGetUserPreference = () => {
  const { apiAxios } = useAxiosPrivate();
  const { isAuthenticated } = useUserStore();

  return useQuery({
    queryKey: ["userPreference"],
    queryFn: async () => {
      if (!isAuthenticated()) return null;
      try {
        return await apiAxios.get<UserPreference>(`/user-preference`);
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
    enabled: isAuthenticated(),
  });
};

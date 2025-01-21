import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorCode } from "@/types/ErrorCode";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { PackageType } from "@/types/PackageType";
import useAxiosPrivate from "../useAxiosPrivate";

export const useGetPackageTypes = () => {
  const { t } = useTranslation();
  const { apiAxios } = useAxiosPrivate();
  return useQuery({
    queryKey: ["packageTypes"],
    queryFn: async () => {
      try {
        const response = await apiAxios.get<PackageType[]>("/package-types");
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

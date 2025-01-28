import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import BaseLayout from "./BaseLayout";

const AdminLayout: FC = () => {
  const { t } = useTranslation();
  const { roles } = useUserStore();
  if (!roles?.includes("ADMINISTRATOR")) {
    toast({
      variant: "destructive",
      title: t("axiosPrivate.unauthorized"),
      description: t("axiosPrivate.unauthorizedDescription"),
    });
    return <Navigate to={"/"} />;
  }

  return <BaseLayout />;
};

export default AdminLayout;

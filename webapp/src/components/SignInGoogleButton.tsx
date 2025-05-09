import { FC } from "react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useOAuthGoogleUrl } from "@/data/account/useOAuthGoogleUrl";

const GoogleLoginButton: FC = () => {
  const { t } = useTranslation();
  const { oAuthUrl } = useOAuthGoogleUrl();
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => {
        window.location.href = oAuthUrl?.url || "";
      }}
    >
      <FaGoogle className="mr-2" />
      {t("loginButton.googleLoginButton")}
    </Button>
  );
};

export default GoogleLoginButton;

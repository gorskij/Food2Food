import { FC } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useOAuthGithubUrl } from "@/data/account/useOAuthGithubUrl";
import { FaGithub } from "react-icons/fa";

const GithubLoginButton: FC = () => {
  const { t } = useTranslation();
  const { oAuthUrl } = useOAuthGithubUrl();
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        window.location.href = oAuthUrl?.url || "";
      }}
    >
      <FaGithub className="mr-2 h-4 w-4" />
      {t("loginPage.githubLoginButton")}
    </Button>
  );
};

export default GithubLoginButton;

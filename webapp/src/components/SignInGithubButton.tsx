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
      variant="ghost"
      type="button"
      onClick={() => {
        window.location.href = oAuthUrl?.url || "";
      }}
    >
      <FaGithub className="mr-2" />
      {t("loginButton.githubLoginButton")}
    </Button>
  );
};

export default GithubLoginButton;

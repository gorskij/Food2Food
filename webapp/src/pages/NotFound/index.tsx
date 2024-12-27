import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            {t("notFound.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow text-xl">
          {t("notFound.description")}
          <div className="flex justify-around pt-3">
            <Button variant="outline" asChild>
              <NavLink to={"/"} replace>
                {t("notFound.homeLink")}
              </NavLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

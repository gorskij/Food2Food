import { FC } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FavoriteCountComparisonProps {
  product1FavoriteCount: number;
  product2FavoriteCount: number;
}

const FavoriteCountComparison: FC<FavoriteCountComparisonProps> = ({
  product1FavoriteCount,
  product2FavoriteCount,
}) => {
  const { t } = useTranslation();

  if (product1FavoriteCount === product2FavoriteCount) return null;

  return (
    <>
      {product1FavoriteCount > product2FavoriteCount ? (
        <>
          <div className="flex flex-row flex-nowrap">
            <Plus className="text-positive mr-1" />
            <p className="text-muted-foreground">
              {t("favoriteComparison.more")}
            </p>
          </div>
          <div className="flex flex-row flex-nowrap">
            <Minus className="text-negative mr-1" />
            <p className="text-muted-foreground">
              {t("favoriteComparison.less")}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row flex-nowrap">
            <Minus className="text-negative mr-1" />
            <p className="text-muted-foreground">
              {t("favoriteComparison.less")}
            </p>
          </div>
          <div className="flex flex-row flex-nowrap">
            <Plus className="text-positive mr-1" />
            <p className="text-muted-foreground ">
              {t("favoriteComparison.more")}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default FavoriteCountComparison;

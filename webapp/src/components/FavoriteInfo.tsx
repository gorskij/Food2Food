import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRemoveFavoriteProduct } from "@/data/products/useRemoveFavoriteProduct";
import { useAddFavoriteProduct } from "@/data/products/useAddFavoriteProduct";
import { Heart } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useCheckFavoriteProduct } from "@/data/products/useCheckFavoriteProduct";
import { useTranslation } from "react-i18next";

interface FavoriteInfoProps {
  favoriteCount: number;
  id: string;
}

const FavoriteInfo: FC<FavoriteInfoProps> = ({ favoriteCount, id }) => {
  const { addFavoriteProduct } = useAddFavoriteProduct();
  const { removeFavoriteProduct } = useRemoveFavoriteProduct();
  const { isAuthenticated } = useUserStore();
  const { data: isFavorite, isLoading } = useCheckFavoriteProduct(id);
  const [isProductFavorite, setIsProductFavorite] = useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (isAuthenticated() && !isLoading) {
      setIsProductFavorite(isFavorite?.result ?? false);
    }
  }, [isAuthenticated, isFavorite, isLoading]);

  const handleRemoveFromFavorites = async () => {
    if (id) {
      setIsProductFavorite(false);
      await removeFavoriteProduct(id);
    }
  };

  const handleAddToFavorites = async () => {
    if (id) {
      setIsProductFavorite(true);
      await addFavoriteProduct(id);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center" asChild>
        {isAuthenticated() ? (
          <button
            onClick={
              isProductFavorite
                ? handleRemoveFromFavorites
                : handleAddToFavorites
            }
            className="flex items-center"
          >
            {isProductFavorite ? (
              <>
                <div className="mt-2 mr-2 text-sm text-gray-600">
                  <span>{t("favoriteInfo.productInFavorites")}</span>
                </div>
                <Heart className="fill-red-500 text-red-500 mr-1" />
              </>
            ) : (
              <>
                <div className="mt-2 mr-2 text-sm text-gray-600">
                  <span>{t("favoriteInfo.addToFavorites")}</span>
                </div>
                <Heart className="text-red-500 mr-1" />
              </>
            )}
            <span>{favoriteCount}</span>
          </button>
        ) : (
          <div className="flex items-center">
            <Heart className="text-red-500 mr-1" />
            <span className="text-gray-600">{favoriteCount}</span>
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>
        {t("favoriteInfo.countFavorites", { count: favoriteCount })}
      </TooltipContent>
    </Tooltip>
  );
};

export default FavoriteInfo;

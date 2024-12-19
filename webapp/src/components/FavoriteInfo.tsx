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
import { useCheckFavoriteProduct } from "@/data/products/useCheckFavoriteProduct"; // Assuming you have this hook
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated());
    console.log("isLoading:", isLoading);
    console.log("isFavorite:", isFavorite);

    if (isAuthenticated() === true && isLoading === false) {
      setIsProductFavorite(isFavorite?.result ?? false);
      console.log("going through");
    }
  }, [isAuthenticated, isFavorite, isLoading]);

  const handleRemoveFromFavorites = async () => {
    if (id) {
      await removeFavoriteProduct(id);
      setIsProductFavorite(false);
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    }
  };

  const handleAddToFavorites = async () => {
    if (id) {
      await addFavoriteProduct(id);
      setIsProductFavorite(true);
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center cursor-pointer">
        <button
          onClick={
            isProductFavorite ? handleRemoveFromFavorites : handleAddToFavorites
          }
          className="flex items-center"
          disabled={!isAuthenticated()}
        >
          {isProductFavorite ? (
            <>
              {isAuthenticated() && (
                <div className="mt-2 mr-2 text-sm text-gray-600">
                  <span>{t("favoriteInfo.productInFavorites")}</span>
                </div>
              )}
              <Heart className="fill-red-500 text-red-500 mr-1" />
            </>
          ) : (
            <>
              {isAuthenticated() && (
                <div className="mt-2 mr-2 text-sm text-gray-600">
                  <span>{t("favoriteInfo.addToFavorites")}</span>
                </div>
              )}
              <Heart className="text-red-500 mr-1" />
            </>
          )}
          <span>{favoriteCount}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {t("favoriteInfo.countFavorites", { count: favoriteCount })}
      </TooltipContent>
    </Tooltip>
  );
};

export default FavoriteInfo;

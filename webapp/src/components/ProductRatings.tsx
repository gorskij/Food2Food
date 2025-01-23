import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { UserPreference } from "@/types/UserPreference";

interface ProductRatingsProps {
  productDetails: ProductDetails;
  groupName: string;
  userPreference?: UserPreference;
}

const ProductRatings: FC<ProductRatingsProps> = ({
  productDetails,
  groupName,
  userPreference,
}) => {
  const { t } = useTranslation();

  const filteredRatings = productDetails.ratings
    .filter((rating) => rating.groupName === groupName)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-row flex-wrap">
      {filteredRatings.map((rating) => {
        const isPositive = userPreference?.positiveRatings.some(
          (positiveRating) => positiveRating.name === rating.name
        );
        const isNegative = userPreference?.negativeRatings.some(
          (negativeRating) => negativeRating.name === rating.name
        );

        const badgeClass = isPositive
          ? "bg-positive"
          : isNegative
          ? "bg-negative"
          : "";

        return (
          <TooltipProvider key={rating.id}>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  key={rating.id}
                  variant="outline"
                  className={`whitespace-nowrap ${badgeClass}`}
                >
                  {t(`ratings.${rating.name}`)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>{t(`ratings.${groupName}`)}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default ProductRatings;

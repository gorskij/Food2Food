import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ProductRatingsProps {
  productDetails: ProductDetails;
  groupName: string;
}

const ProductRatings: FC<ProductRatingsProps> = ({
  productDetails,
  groupName,
}) => {
  const { t } = useTranslation();
  const filteredRatings = productDetails.ratings.filter(
    (rating) => rating.groupName === groupName
  );

  return (
    <div>
      {filteredRatings.map((rating) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Badge
              key={rating.id}
              variant="outline"
            >
              {t(`ratings.${rating.name}`)}
            </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {t(`ratings.${groupName}`)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default ProductRatings;

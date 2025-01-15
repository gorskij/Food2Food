import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTranslation } from "react-i18next";

interface ProductAllergensProps {
  productDetails: ProductDetails;
}

const ProductAllergens: FC<ProductAllergensProps> = ({ productDetails }) => {
  const allergens = productDetails.label.allergens.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const { t } = useTranslation();

  return (
    <div className="flex flex-row flex-wrap">
      {allergens.map((allergen) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                key={allergen.id}
                variant="outline"
                className="whitespace-nowrap"
              >
                {allergen.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>{t("allergens.tooltip")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default ProductAllergens;

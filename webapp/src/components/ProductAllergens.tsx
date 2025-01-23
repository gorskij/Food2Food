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
import { UserPreference } from "@/types/UserPreference";
import { TriangleAlert } from "lucide-react";

interface ProductAllergensProps {
  productDetails: ProductDetails;
  userPreference?: UserPreference;
}

const ProductAllergens: FC<ProductAllergensProps> = ({
  productDetails,
  userPreference,
}) => {
  const allergens = productDetails.label.allergens.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const { t } = useTranslation();

  return (
    <div className="flex flex-row flex-wrap">
      {allergens.map((allergen) => {
        const isNegative = userPreference?.allergens.some(
          (allergen) => allergen.name === allergen.name
        );

        const badgeClass = isNegative ? "bg-negative" : "";

        return (
          <TooltipProvider key={allergen.id}>
            <Tooltip>
              <TooltipTrigger className="flex flex-row flex-nowrap">
                {isNegative && <TriangleAlert className="text-negative" />}
                <Badge
                  key={allergen.id}
                  variant="outline"
                  className={`whitespace-nowrap ${badgeClass}`}
                >
                  {t(`allergens.${allergen.name}`)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>{t("allergens.tooltip")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default ProductAllergens;

import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";

interface ProductAllergensProps {
  productDetails: ProductDetails;
}

const ProductAllergens: FC<ProductAllergensProps> = ({ productDetails }) => {
  const { t } = useTranslation();
  const allergens = productDetails.label.allergens;
  const areAllergensAbsent = allergens.length === 0;

  return (
    <Card
      className={`flex-1 max-w-full mt-4 min-w-[400px] ${
        areAllergensAbsent ? "bg-green-100" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-left">{t("allergens.title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {allergens.length > 0 ? (
          allergens.map((allergen) => (
            <div
              key={allergen.id}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-full border border-red-300 text-sm font-medium"
            >
              {allergen.name}
            </div>
          ))
        ) : (
          <p className="flex-1 text-center text-xl text-muted-foreground">
            {t("allergens.noData")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductAllergens;

import { FC } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "@/types/ProductDetails";
import { UserPreference } from "@/types/UserPreference";
import { NutritionalValueName } from "@/types/NutritionalValueName";

interface NutrientsComparisonProps {
  product: ProductDetails;
  userPreference: UserPreference;
}

const NutrientsComparison: FC<NutrientsComparisonProps> = ({
  product,
  userPreference,
}) => {
  const { t } = useTranslation();

  function isPositive(nutrient: NutritionalValueName) {
    return userPreference?.positiveNutritionalValueNames.some(
      (item) => item.id === nutrient.id
    );
  }

  function isNegative(nutrient: NutritionalValueName) {
    return userPreference?.negativeNutritionalValueNames.some(
      (item) => item.id === nutrient.id
    );
  }

  function renderNutrientStatus(nutrient: NutritionalValueName) {
    if (isPositive(nutrient)) {
      return <Plus className="text-positive mr-1" />;
    } else if (isNegative(nutrient)) {
      return <Minus className="text-negative mr-1" />;
    } else {
      return <div className="flex items-center"></div>;
    }
  }

  if (!product || !userPreference) return null;

  const categories = ["Witaminy", "Minerały", "Omega"];
  const categoryTranslations: Record<string, string> = {
    Witaminy: "vitamins",
    Minerały: "minerals",
    Omega: "omega3",
  };

  const nutrientsByCategory = categories.map((category) => ({
    category,
    nutrients: product.nutritionalValues.filter((nv) =>
      nv.nutritionalValueName.group.groupName.startsWith(
        category.charAt(0).toUpperCase() + category.slice(1)
      )
    ),
  }));

  const hasAnyNutrients = nutrientsByCategory.some(
    ({ nutrients }) => nutrients.length > 0
  );

  return (
    <div>
      {hasAnyNutrients ? (
        nutrientsByCategory.map(({ category, nutrients }) => (
          <div key={category}>
            <div className="flex flex-col">
              {nutrients.map((nutrient) => (
                <div
                  key={`nutrient-${nutrient.nutritionalValueName.name}`}
                  className="flex items-center mb-2"
                >
                  {renderNutrientStatus(nutrient.nutritionalValueName)}
                  <p className="ml-2">
                    {t(
                      `${categoryTranslations[category]}.${nutrient.nutritionalValueName.name}`
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground flex flex-row flex-nowrap">
          <Minus className="text-muted-foreground" />
          {t("nutrientComparison.noNutrients")}
        </p>
      )}
    </div>
  );
};

export default NutrientsComparison;

import { FC } from "react";
import { Plus, Minus, Diff, Banana, Carrot } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "@/types/ProductDetails";
import { UserPreference } from "@/types/UserPreference";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface MacronutrientsComparisonProps {
  product1: ProductDetails;
  product2: ProductDetails;
  userPreference?: UserPreference;
}

const RWS_VALUES: Record<string, number> = {
  "Wartość Energetyczna": 2000,
  Węglowodany: 300,
  Tłuszcz: 70,
  Białko: 50,
  Sól: 6,
  Błonnik: 25,
};

const MacronutrientsComparison: FC<MacronutrientsComparisonProps> = ({
  product1,
  product2,
  userPreference,
}) => {
  const { t } = useTranslation();

  const macronutrientNames = [
    "Wartość Energetyczna",
    "Węglowodany",
    "Tłuszcz",
    "Białko",
    "Sól",
    "Błonnik",
  ];

  const getMacronutrientValue = (
    product: ProductDetails,
    nutrientName: string
  ) => {
    const macronutrient = product.nutritionalValues.find(
      (item) => item.nutritionalValueName.group.groupName === nutrientName
    );
    if (macronutrient) {
      const { quantity, unit } = macronutrient;
      return { quantity, unit: unit.name };
    }
    return { quantity: null, unit: "g" };
  };

  const determineImpact = (
    nutrientName: string,
    product1Value: number,
    product2Value: number
  ) => {
    if (!RWS_VALUES[nutrientName]) return null;

    const difference = Math.abs(product1Value - product2Value);
    const percentDifference = (difference / RWS_VALUES[nutrientName]) * 100;

    if (percentDifference < 5) return "diff";

    const isPositiveByDefault = ["Białko", "Błonnik"].includes(nutrientName);
    const isNegativeByDefault = [
      "Wartość Energetyczna",
      "Węglowodany",
      "Tłuszcz",
      "Sól",
    ].includes(nutrientName);

    const isPositive = userPreference
      ? userPreference.positiveNutritionalValueNames.some(
          (item) => item.group.groupName === nutrientName
        )
      : isPositiveByDefault;

    const isNegative = userPreference
      ? userPreference.negativeNutritionalValueNames.some(
          (item) => item.group.groupName === nutrientName
        )
      : isNegativeByDefault;

    if (!isPositive && !isNegative) {
      if (product1Value > product2Value) {
        return isPositiveByDefault ? "plus" : "minus";
      } else if (product1Value < product2Value) {
        return isNegativeByDefault ? "plus" : "minus";
      }
    }

    if (product1Value > product2Value) {
      return isPositive ? "plus" : "minus";
    } else if (product1Value < product2Value) {
      return isNegative ? "plus" : "minus";
    }
    return null;
  };

  const renderImpactIcon = (impact: string | null) => {
    switch (impact) {
      case "plus":
        return <Plus className="text-positive" />;
      case "minus":
        return <Minus className="text-negative" />;
      case "diff":
        return <Diff className="text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-center">
          {t("macronutrientsComparison.title")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("macronutrientsComparison.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between w-full px-2 md:px-10">
          <Banana />
          <Carrot />
        </div>
        <div className="flex flex-col gap-4">
          {macronutrientNames.map((nutrientName) => {
            const product1Value = getMacronutrientValue(product1, nutrientName);
            const product2Value = getMacronutrientValue(product2, nutrientName);

            if (
              product1Value.quantity === null &&
              product2Value.quantity === null
            )
              return null;

            const impactProduct1 = determineImpact(
              nutrientName,
              product1Value.quantity || 0,
              product2Value.quantity || 0
            );
            const impactProduct2 = determineImpact(
              nutrientName,
              product2Value.quantity || 0,
              product1Value.quantity || 0
            );

            return (
              <div key={nutrientName} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-center font-bold w-full">
                    {t(
                      `macronutrientsInformation.${nutrientName.replace(
                        /\s+/g,
                        ""
                      )}`
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between px-2 md:px-10">
                  <div className="flex items-center space-x-2">
                    <p className="flex flex-row flex-nowrap">
                      {renderImpactIcon(impactProduct1)}
                      {product1Value.quantity !== null
                        ? `${product1Value.quantity}${product1Value.unit}`
                        : t("base.noData")}
                    </p>
                  </div>
                  <p className="flex flex-row flex-nowrap">
                    {product2Value.quantity !== null
                      ? `${product2Value.quantity}${product2Value.unit}`
                      : t("base.noData")}
                    {renderImpactIcon(impactProduct2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MacronutrientsComparison;

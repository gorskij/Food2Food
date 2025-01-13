import { ProductDetails } from "@/types/ProductDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import RWSChart from "./RWSChart";
import { useTranslation } from "react-i18next";
import { FC } from "react";

interface MacronutrientsInformationProps {
  productDetails: ProductDetails;
}

const RWS_VALUES: Record<string, number> = {
  "Wartość Energetyczna": 2000,
  Węglowodany: 300,
  Tłuszcz: 70,
  Białko: 50,
  Sól: 6,
  Błonnik: 25,
};

const MacronutrientsInformation: FC<MacronutrientsInformationProps> = ({
  productDetails,
}) => {
  const macronutrientNames = [
    { groupName: "Wartość Energetyczna", name: "Wartość Energetyczna" },
    { groupName: "Węglowodany", name: "Total" },
    { groupName: "Tłuszcz", name: "Total" },
    { groupName: "Białko", name: "Białko" },
    { groupName: "Sól", name: "Sól" },
    { groupName: "Błonnik", name: "Błonnik" },
  ];
  const { t } = useTranslation();

  const getMacronutrientColor = (name: string, quantity: number) => {
    switch (name) {
      case "Wartość Energetyczna":
        if (quantity < 100) return "green";
        if (quantity >= 100 && quantity <= 200) return "yellow";
        return "red";
      case "Węglowodany":
        if (quantity < 50) return "green";
        if (quantity >= 50 && quantity <= 75) return "yellow";
        return "red";
      case "Tłuszcz":
        if (quantity < 10) return "green";
        if (quantity >= 10 && quantity <= 20) return "yellow";
        return "red";
      case "Białko":
        return "green";
      case "Błonnik":
        return "green";
      case "Sól":
        if (quantity < 1) return "green";
        if (quantity >= 1 && quantity <= 2) return "yellow";
        return "red";
      default:
        return "green";
    }
  };

  const getMacronutrientValue = (groupName: string, name: string) => {
    const macronutrient = productDetails.nutritionalValues.find(
      (item) =>
        item.nutritionalValueName.group.groupName === groupName &&
        item.nutritionalValueName.name === name
    );

    if (macronutrient) {
      const quantity = macronutrient.quantity;
      const unit = macronutrient.unit.name;

      const rwsValue = RWS_VALUES[groupName];
      let rwsPercentage = t("base.noData");

      if (rwsValue) {
        rwsPercentage = ((quantity / rwsValue) * 100).toFixed(2) + "%";
      }

      return {
        quantity,
        unit,
        rwsPercentage: parseFloat(rwsPercentage),
        valueWithUnit: `${quantity}\u00A0${unit}`,
      };
    }

    const defaultUnit = groupName === "Wartość Energetyczna" ? "kcal" : "g";
    const defaultQuantity = 0;

    return {
      quantity: 0,
      unit: defaultUnit,
      rwsPercentage: 0,
      valueWithUnit: `${defaultQuantity}\u00A0${defaultUnit}`,
    };
  };

  const macronutrientsData = macronutrientNames.map(({ groupName, name }) => {
    const { quantity, unit, rwsPercentage, valueWithUnit } =
      getMacronutrientValue(groupName, name);
    const nameWithoutSpaces = groupName.replace(/\s+/g, "");
    return {
      translatedName: t(`macronutrientsInformation.${nameWithoutSpaces}`),
      groupName,
      quantity,
      unit,
      rwsPercentage,
      valueWithUnit,
    };
  });

  const macronutrientsChartData = macronutrientsData
    .map((macronutrient) => {
      const quantity =
        typeof macronutrient.quantity === "number" ? macronutrient.quantity : 0;
      return {
        name: macronutrient.translatedName,
        rws: macronutrient.rwsPercentage ?? 0,
        fill: (() => {
          const color = getMacronutrientColor(
            macronutrient.groupName,
            quantity
          );
          return color === "green"
            ? "hsl(var(--chart-green))"
            : color === "yellow"
            ? "hsl(var(--chart-yellow))"
            : color === "red"
            ? "hsl(var(--chart-red))"
            : "hsl(var(--chart-green))";
        })(),
        valueWithUnit: macronutrient.valueWithUnit,
      };
    })
    .filter((macronutrient) => macronutrient.rws >= 0);

  const chartConfig = {
    rws: {
      label: "% RWS",
      color: "hsl(var(--chart-green))",
    },
  };

  const unit =
    productDetails.unit.name === "l" ? "ml" : productDetails.unit.name;

  return (
    <>
      <Card className="flex-1 hidden sm:block">
        <CardHeader>
          <CardTitle className="text-center">
            {t("macronutrientsInformation.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("macronutrientsInformation.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {macronutrientsChartData.length > 0 ? (
            <RWSChart
              data={macronutrientsChartData}
              maxRWS={100}
              chartConfig={chartConfig}
            />
          ) : (
            <div className="text-muted-foreground text-center">
              {t("macronutrientsInformation.dataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1 block sm:hidden">
        <CardHeader>
          <CardTitle className="text-center">
            {t("macronutrientsInformation.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("macronutrientsInformation.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {macronutrientsData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t("macronutrientsInformation.macronutrient")}
                  </TableHead>
                  <TableHead>
                    {t("macronutrientsInformation.quantity")}
                  </TableHead>
                  <TableHead>{t("macronutrientsInformation.unit")}</TableHead>
                  <TableHead>
                    {t("macronutrientsInformation.rwsPercentage")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {macronutrientsData.map((macronutrient, index) => {
                  const quantity =
                    typeof macronutrient.quantity === "number"
                      ? macronutrient.quantity
                      : 0;
                  const colorClass = getMacronutrientColor(
                    macronutrient.groupName,
                    quantity
                  );

                  return (
                    <TableRow
                      key={index}
                      className={`
                      ${
                        colorClass === "green"
                          ? "bg-green-300 hover:bg-green-400"
                          : ""
                      }
                      ${
                        colorClass === "yellow"
                          ? "bg-yellow-300 hover:bg-yellow-400"
                          : ""
                      }
                      ${
                        colorClass === "red"
                          ? "bg-red-300 hover:bg-red-400"
                          : ""
                      }
                      text-black
                    `}
                    >
                      <TableCell>{macronutrient.translatedName}</TableCell>
                      <TableCell>{macronutrient.quantity}</TableCell>
                      <TableCell>{macronutrient.unit}</TableCell>
                      <TableCell>{macronutrient.rwsPercentage}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground text-center">
              {t("macronutrientsInformation.dataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MacronutrientsInformation;

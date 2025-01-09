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

interface VitaminsTableProps {
  productDetails: ProductDetails;
}

const RWS_VALUES: Record<string, number> = {
  "Witamina A": 0.8,
  "Witamina B1": 1.1,
  "Witamina B2": 1.4,
  "Witamina B3": 16,
  "Witamina B5": 6,
  "Witamina B6": 1.4,
  "Witamina B7": 0.05,
  "Witamina B9": 0.2,
  "Witamina B12": 0.0025,
  "Witamina C": 80,
  "Witamina D": 0.005,
  "Witamina E": 12,
  "Witamina K": 0.0075,
};

const VitaminsInformation: FC<VitaminsTableProps> = ({
  productDetails,
}) => {
  const vitaminNames = Object.keys(RWS_VALUES);
  const { t } = useTranslation();

  const getVitaminValue = (vitaminName: string) => {
    const vitamin = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === vitaminName
    );

    if (vitamin) {
      const quantity = vitamin.quantity;
      const unit = vitamin.unit.name;

      const normalizedQuantity = unit === "mcg" ? quantity / 1000 : quantity;
      const rwsValue = RWS_VALUES[vitaminName];
      let rwsPercentage = t("base.noData");

      if (rwsValue) {
        rwsPercentage =
          ((normalizedQuantity / rwsValue) * 100).toFixed(2) + "%";
      }

      return {
        quantity,
        unit,
        rwsPercentage: parseFloat(rwsPercentage),
        valueWithUnit: `${quantity}\u00A0${unit}`,
      };
    }

    return {
      quantity: t("base.noData"),
      unit: "",
      rwsPercentage: null,
      valueWithUnit: "",
    };
  };

  const vitaminsData = vitaminNames
    .map((vitaminName) => {
      const { quantity, unit, rwsPercentage, valueWithUnit } =
        getVitaminValue(vitaminName);
      return {
        translatedName: t(`vitamins.${vitaminName}`),
        quantity,
        unit,
        rwsPercentage,
        valueWithUnit,
      };
    })
    .filter(
      (vitamin) =>
        vitamin.rwsPercentage !== null && vitamin.quantity !== t("base.noData")
    );

  const vitaminsChartData = vitaminsData
    .map((vitamin) => ({
      name: vitamin.translatedName,
      rws: vitamin.rwsPercentage ?? 0,
      fill: "hsl(var(--chart-green))",
      valueWithUnit: vitamin.valueWithUnit,
    }))
    .filter((vitamin) => vitamin.rws > 0);

  const chartConfig = {
    rws: {
      label: "% RWS",
      color: "hsl(var(--chart-green))",
    },
  };

  const unit = productDetails.unit.name === "l" ? "ml" : productDetails.unit.name;

  return (
    <>
      <Card className="flex-1 h-full hidden sm:block">
        <CardHeader>
          <CardTitle className="text-center">
            {t("vitaminsInformation.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("vitaminsInformation.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {vitaminsChartData.length > 0 ? (
            <RWSChart
              data={vitaminsChartData}
              maxRWS={100}
              chartConfig={chartConfig}
            />
          ) : (
            <div className="text-muted-foreground text-center">
              {t("vitaminsInformation.vitaminDataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1 h-full block sm:hidden">
        <CardHeader>
          <CardTitle className="text-center">
            {t("vitaminsInformation.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("vitaminsInformation.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {vitaminsData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t(
                      "vitaminsInformation.table.vitamin"
                    )}
                  </TableHead>
                  <TableHead>
                    {t(
                      "vitaminsInformation.table.quantity"
                    )}
                  </TableHead>
                  <TableHead>
                    {t(
                      "vitaminsInformation.table.unit"
                    )}
                  </TableHead>
                  <TableHead>
                    {t(
                      "vitaminsInformation.table.rwsPercentage"
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vitaminsData.map((vitamin, index) => (
                  <TableRow key={index} className="bg-green-100 text-black">
                    <TableCell>{vitamin.translatedName}</TableCell>
                    <TableCell>{vitamin.quantity}</TableCell>
                    <TableCell>{vitamin.unit}</TableCell>
                    <TableCell>{vitamin.rwsPercentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground text-center">
              {t("vitaminsInformation.vitaminDataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default VitaminsInformation;

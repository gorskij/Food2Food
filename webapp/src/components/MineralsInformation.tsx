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

interface MineralsTableProps {
  productDetails: ProductDetails;
}

const RWS_VALUES: Record<string, number> = {
  Potas: 2000,
  Wapń: 800,
  Fosfor: 700,
  Magnez: 375,
  Żelazo: 14,
  Cynk: 10,
  Fluorek: 3.5,
  Mangan: 2,
  Miedź: 1,
  Jod: 0.15,
  Selen: 0.055,
  Molibden: 0.05,
  Chrom: 0.04,
};

const MineralsInformation: FC<MineralsTableProps> = ({
  productDetails,
}) => {
  const mineralNames = Object.keys(RWS_VALUES);
  const { t } = useTranslation();

  const getMineralValue = (mineralName: string) => {
    const mineral = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === mineralName
    );

    if (mineral) {
      const quantity = mineral.quantity;
      const unit = mineral.unit.name;

      const normalizedQuantity = unit === "mcg" ? quantity / 1000 : quantity;

      const rwsValue = RWS_VALUES[mineralName];
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

  const mineralsData = mineralNames
    .map((mineralName) => {
      const { quantity, unit, rwsPercentage, valueWithUnit } =
        getMineralValue(mineralName);
      return {
        translatedName: t(`minerals.${mineralName}`),
        quantity,
        unit,
        rwsPercentage,
        valueWithUnit,
      };
    })
    .filter(
      (mineral) =>
        mineral.rwsPercentage !== null && mineral.quantity !== t("base.noData")
    );

  const mineralsChartData = mineralsData
    .map((mineral) => ({
      name: mineral.translatedName,
      rws: mineral.rwsPercentage ?? 0,
      fill: "hsl(var(--chart-green))",
      valueWithUnit: mineral.valueWithUnit,
    }))
    .filter((mineral) => mineral.rws > 0);

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
            {t("mineralsInformation.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("mineralsInformation.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {mineralsChartData.length > 0 ? (
            <RWSChart
              data={mineralsChartData}
              maxRWS={100}
              chartConfig={chartConfig}
            />
          ) : (
            <div className="text-muted-foreground text-center">
              {t("mineralsInformation.mineralDataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1 h-full block sm:hidden">
        <CardHeader>
          <CardTitle className="text-center">
            {t("mineralsInformation.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("mineralsInformation.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mineralsData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t(
                      "mineralsInformation.table.mineral"
                    )}
                  </TableHead>
                  <TableHead>
                    {t(
                      "mineralsInformation.table.quantity"
                    )}
                  </TableHead>
                  <TableHead>
                    {t(
                      "mineralsInformation.table.unit"
                    )}
                  </TableHead>
                  <TableHead>
                    {t(
                      "mineralsInformation.table.rwsPercentage"
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mineralsData.map((mineral, index) => (
                  <TableRow key={index} className="bg-green-100 text-black">
                    <TableCell>{mineral.translatedName}</TableCell>
                    <TableCell>{mineral.quantity}</TableCell>
                    <TableCell>{mineral.unit}</TableCell>
                    <TableCell>{mineral.rwsPercentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground text-center">
              {t("mineralsInformation.mineralDataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MineralsInformation;

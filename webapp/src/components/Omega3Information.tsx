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

interface Omega3InformationProps {
  productDetails: ProductDetails;
}

const OMEGA3_RWS_VALUES: Record<string, number> = {
  ALA: 1100,
  "EPA+DHA": 250,
};

const Omega3Information: FC<Omega3InformationProps> = ({ productDetails }) => {
  const omega3Names = Object.keys(OMEGA3_RWS_VALUES);
  const { t } = useTranslation();

  const getOmega3Value = (omega3Name: string) => {
    const omega3 = productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === omega3Name
    );

    if (omega3) {
      const quantity = omega3.quantity;
      const unit = omega3.unit.name;

      const rwsValue = OMEGA3_RWS_VALUES[omega3Name];
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

    return {
      quantity: t("base.noData"),
      unit: "",
      rwsPercentage: null,
      valueWithUnit: "",
    };
  };

  const omega3Data = omega3Names
    .map((omega3Name) => {
      const { quantity, unit, rwsPercentage, valueWithUnit } =
        getOmega3Value(omega3Name);
      return {
        translatedName: t(`omega3.${omega3Name}`),
        quantity,
        unit,
        rwsPercentage,
        valueWithUnit,
      };
    })
    .filter(
      (omega3) =>
        omega3.rwsPercentage !== null && omega3.quantity !== t("base.noData")
    );

  const omega3ChartData = omega3Data
    .map((omega3) => ({
      name: omega3.translatedName,
      rws: omega3.rwsPercentage ?? 0,
      fill: "hsl(var(--chart-green))",
      valueWithUnit: omega3.valueWithUnit,
    }))
    .filter((omega3) => omega3.rws > 0);

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
      <Card className="flex-1 hidden sm:block min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">
            {t("omega3Information.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("omega3Information.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {omega3ChartData.length > 0 ? (
            <RWSChart
              data={omega3ChartData}
              maxRWS={100}
              chartConfig={chartConfig}
            />
          ) : (
            <div className="text-muted-foreground text-center">
              {t("omega3Information.dataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1 h-full block sm:hidden">
        <CardHeader>
          <CardTitle className="text-center">
            {t("omega3Information.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("omega3Information.description", { unit: unit })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {omega3Data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("omega3Information.table.name")}</TableHead>
                  <TableHead>{t("omega3Information.table.quantity")}</TableHead>
                  <TableHead>{t("omega3Information.table.unit")}</TableHead>
                  <TableHead>
                    {t("omega3Information.table.rwsPercentage")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {omega3Data.map((omega3, index) => (
                  <TableRow
                    key={index}
                    className="bg-green-300 text-black hover:bg-green-400"
                  >
                    <TableCell>{omega3.translatedName}</TableCell>
                    <TableCell>{omega3.quantity}</TableCell>
                    <TableCell>{omega3.unit}</TableCell>
                    <TableCell>{omega3.rwsPercentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground text-center">
              {t("omega3Information.dataUnavailable")}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Omega3Information;

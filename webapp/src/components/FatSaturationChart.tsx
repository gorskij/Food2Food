import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  RadialBarChart,
  PolarRadiusAxis,
  Label,
  RadialBar,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { ProductDetails } from "@/types/ProductDetails";
import { useTranslation } from "react-i18next";
import { Banana, Carrot } from "lucide-react";
import { Payload } from "recharts/types/component/DefaultLegendContent";

interface FatSaturationChartProps {
  productDetails: ProductDetails;
  icon?: string;
}

const FatSaturationChart: FC<FatSaturationChartProps> = ({
  productDetails,
  icon,
}) => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const saturatedFat =
    productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === "Kwasy nasycone"
    )?.quantity ?? 0;

  const totalFat =
    productDetails.nutritionalValues.find(
      (item) =>
        item.nutritionalValueName.group.groupName === "Tłuszcz" &&
        item.nutritionalValueName.name === "Total"
    )?.quantity ?? 0;

  const unsaturatedFat = totalFat - saturatedFat;

  const fatSaturationChartData = [
    {
      saturated: saturatedFat,
      unsaturated: unsaturatedFat,
    },
  ];
  const fatSaturationChartDataForLegend: Payload[] = [
    {
      value: t("fatSaturation.unsaturatedFatLabel"),
      color: "hsl(var(--chart-yellow))",
      type: "square",
    },
    {
      value: t("fatSaturation.saturatedFatLabel"),
      color: "hsl(var(--chart-red))",
      type: "square",
    },
  ];
  const fatSaturationChartConfig = {
    saturated: {
      label: t("fatSaturation.saturatedFatLabel"),
      color: "hsl(var(--chart-red))",
    },
    unsaturated: {
      label: t("fatSaturation.unsaturatedFatLabel"),
      color: "hsl(var(--chart-yellow))",
    },
  } satisfies ChartConfig;

  const isFatAbsent = totalFat === 0;
  const isSaturatedAbsent = saturatedFat === 0;

  const fatLevelInfo =
    saturatedFat < 1.5
      ? t("fatSaturation.lowSaturatedFat")
      : saturatedFat >= 5
      ? t("fatSaturation.highSaturatedFat")
      : t("fatSaturation.moderateSaturatedFat");

  const unit =
    productDetails.unit.name === "l" ? "ml" : productDetails.unit.name;

  return (
    <Card
      className={`flex-1 flex-col ${isSaturatedAbsent ? "bg-positive" : ""}`}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center flex flex-row items-center justify-center gap-2">
          {t("fatSaturation.title")}
          {icon === "banana" && <Banana />}
          {icon === "carrot" && <Carrot />}
        </CardTitle>
        <CardDescription className="text-foreground">
          {t("fatSaturation.description", {
            unit: unit,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        {isFatAbsent ? (
          <p className="flex-1 text-center justify-center text-muted-foreground">
            {t("fatSaturation.noFat")}
          </p>
        ) : (
          <ChartContainer
            config={fatSaturationChartConfig}
            className="mx-auto w-full max-w-[290px] h-full min-h-[240px]"
          >
            <RadialBarChart
              data={fatSaturationChartData}
              endAngle={180}
              innerRadius={100}
              outerRadius={hoveredIndex !== null ? 145 : 135}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel unit="g" />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 5}
                            className="fill-foreground text-xl font-bold"
                          >
                            {`${saturatedFat.toLocaleString()} g / ${totalFat} g`.replace(
                              ",",
                              "."
                            )}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 25}
                            className="fill-muted-foreground"
                          >
                            {t("fatSaturation.chartLabel")}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 65}
                            className="text-sm fill-foreground"
                          >
                            {fatLevelInfo}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="saturated"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-saturated)"
                className="stroke-transparent stroke-2"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <RadialBar
                dataKey="unsaturated"
                fill="var(--color-unsaturated)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                payload={fatSaturationChartDataForLegend}
                align="left"
                iconType="square"
              />
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
export default FatSaturationChart;

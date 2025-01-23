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

interface SugarContentChartProps {
  productDetails: ProductDetails;
  icon: string;
}

const SugarContentChart: FC<SugarContentChartProps> = ({
  productDetails,
  icon,
}) => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sugarContentChartConfig = {
    sugarContent: {
      label: t("sugarChart.labels.sugar"),
      color: "hsl(var(--chart-red))",
    },
    nonSugarCarbohydrates: {
      label: t("sugarChart.labels.nonSugarCarbs"),
      color: "hsl(var(--chart-yellow))",
    },
  } satisfies ChartConfig;

  const sugarContent =
    productDetails.nutritionalValues.find(
      (item) => item.nutritionalValueName.name === "Cukry"
    )?.quantity ?? 0;

  const totalCarbohydrates =
    productDetails.nutritionalValues.find(
      (item) =>
        item.nutritionalValueName.group.groupName === "Węglowodany" &&
        item.nutritionalValueName.name === "Total"
    )?.quantity ?? 0;

  const nonSugarCarbohydrates = totalCarbohydrates - sugarContent;

  const sugarContentChartData = [
    {
      sugarContent: sugarContent,
      nonSugarCarbohydrates: nonSugarCarbohydrates,
    },
  ];

  const sugarContentChartDataForLegend = [
    {
      value: t("sugarChart.labels.nonSugarCarbs"),
      color: "hsl(var(--chart-yellow))",
      label: t("sugarChart.labels.nonSugarCarbs"),
      type: "square",
    },
    {
      value: t("sugarChart.labels.sugar"),
      color: "hsl(var(--chart-red))",
      label: t("sugarChart.labels.sugar"),
      type: "square",
    },
  ];

  const isCarbohydrateAbsent = totalCarbohydrates === 0;

  const sugarLevelInfo =
    sugarContent < 5
      ? t("sugarChart.info.lowSugar")
      : sugarContent >= 15
      ? t("sugarChart.info.highSugar")
      : t("sugarChart.info.moderateSugar");

  const unit =
    productDetails.unit.name === "l" ? "ml" : productDetails.unit.name;

  return (
    <Card
      className={`flex-1 flex-col ${isCarbohydrateAbsent ? "bg-positive" : ""}`}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center flex flex-row items-center justify-center gap-2">
          {t("sugarChart.title")}
          {icon === "banana" && <Banana />}
          {icon === "carrot" && <Carrot />}
        </CardTitle>
        <CardDescription className="text-foreground">
          {t("sugarChart.description", { unit: unit })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 min-h-[240px]">
        {isCarbohydrateAbsent ? (
          <p className="flex-1 text-center justify-center">
            {t("sugarChart.noCarbs")}
          </p>
        ) : (
          <ChartContainer
            config={sugarContentChartConfig}
            className="mx-auto w-full max-w-[290px] h-full min-h-[240px]"
          >
            <RadialBarChart
              data={sugarContentChartData}
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
                            {(
                              sugarContent.toLocaleString() +
                              " g/ " +
                              totalCarbohydrates +
                              " g"
                            ).replace(",", ".")}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 25}
                            className="fill-muted-foreground"
                          >
                            {t("sugarChart.tooltip", {
                              sugarContent,
                              totalCarbohydrates,
                            })}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 75}
                            className="text-sm fill-foreground"
                          >
                            {sugarLevelInfo}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="sugarContent"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-sugarContent)"
                className="stroke-transparent stroke-2"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <RadialBar
                dataKey="nonSugarCarbohydrates"
                fill="var(--color-nonSugarCarbohydrates)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                payload={sugarContentChartDataForLegend}
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

export default SugarContentChart;

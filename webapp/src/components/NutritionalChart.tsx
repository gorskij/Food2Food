import { ProductDetails } from "@/types/ProductDetails";
import { FC, useState } from "react";
import { Pie, Sector, Label, PieChart } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  CustomLegend,
} from "./ui/chart";
import { useTranslation } from "react-i18next";

interface NutritionalChartProps {
  productDetails: ProductDetails;
}

const NutritionalChart: FC<NutritionalChartProps> = ({ productDetails }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const chartConfig = {
    carbohydrates: {
      label: t("nutritionalChart.carbohydrates"),
      color: "hsl(var(--chart-7))",
    },
    fat: {
      label: t("nutritionalChart.fat"),
      color: "hsl(var(--chart-yellow))",
    },
    protein: {
      label: t("nutritionalChart.protein"),
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  const energyValue = productDetails.nutritionalValues
    .filter((item) => {
      const groupName = item.nutritionalValueName.group.groupName;
      const name = item.nutritionalValueName.name;
      return (
        groupName === "Wartość Energetyczna" && name === "Wartość Energetyczna"
      );
    })
    .map((item) => {
      return {
        value: item.quantity,
      };
    })[0];

  const nutritionalChartData = productDetails.nutritionalValues
    .filter((item) => {
      const groupName = item.nutritionalValueName.group.groupName;
      const name = item.nutritionalValueName.name;
      return (
        (groupName === "Węglowodany" && name === "Total") ||
        (groupName === "Tłuszcz" && name === "Total") ||
        (groupName === "Białko" && name === "Białko")
      );
    })
    .map((item) => {
      const groupName = item.nutritionalValueName.group.groupName;
      let chartKey: keyof typeof chartConfig;

      if (groupName === "Węglowodany") chartKey = "carbohydrates";
      else if (groupName === "Tłuszcz") chartKey = "fat";
      else if (groupName === "Białko") chartKey = "protein";
      else return null;

      return {
        name: chartConfig[chartKey].label,
        value: item.quantity,
        fill: chartConfig[chartKey].color,
      };
    })
    .filter(Boolean);

  const unit = productDetails.unit.name === "l" ? "ml" : productDetails.unit.name;

  return (
    <Card className="flex-1 flex-col min-w-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">
          {t("nutritionalChart.title")}
        </CardTitle>
        <CardDescription>
          {t("nutritionalChart.description", {
            unit: unit,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[350px] [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent unit="g" />} />
            <Pie
              data={nutritionalChartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={120}
              labelLine={false}
              onMouseEnter={onPieEnter}
              onMouseLeave={() => setActiveIndex(-1)}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.value + " g"}
                </text>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {energyValue.value
                            .toLocaleString()
                            .replace(",", ".")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {t("nutritionalChart.energyUnit")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<CustomLegend payload="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default NutritionalChart;
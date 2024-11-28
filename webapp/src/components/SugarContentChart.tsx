import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadialBarChart, PolarRadiusAxis, Label, RadialBar } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { ProductDetails } from "@/types/ProductDetails";

interface SugarContentChartProps {
  productDetails: ProductDetails;
}

const SugarContentChart: FC<SugarContentChartProps> = ({ productDetails }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sugarContentChartConfig = {
    sugarContent: {
      label: "Zawartość Cukru",
      color: "hsl(var(--chart-red))",
    },
    nonSugarCarbohydrates: {
      label: "Pozostałe węglowodany",
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

  const isCarbohydrateAbsent = totalCarbohydrates === 0;

  return (
    <Card
      className={`flex-1 flex-col min-w-[400px] ${
        isCarbohydrateAbsent ? "bg-green-100" : ""
      }`}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>Węglowodany</CardTitle>
        <CardDescription>na 100 g produktu</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        {isCarbohydrateAbsent ? (
          <p className="flex-1 p-10 text-center text-xl text-muted-foreground">
            Brak węglowodanów w produkcie
          </p>
        ) : (
          <ChartContainer
            config={sugarContentChartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={sugarContentChartData}
              endAngle={180}
              innerRadius={90}
              outerRadius={hoveredIndex !== null ? 150 : 140}
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
                            className="fill-foreground text-2xl font-bold"
                          >
                            {sugarContent.toLocaleString() +
                              " g/ " +
                              totalCarbohydrates +
                              " g"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 25}
                            className="fill-muted-foreground"
                          >
                            zawartość cukru / total węglowodany
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
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default SugarContentChart;

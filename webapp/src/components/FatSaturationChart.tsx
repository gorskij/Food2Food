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

interface FatSaturationChartProps {
  productDetails: ProductDetails;
}

const FatSaturationChart: FC<FatSaturationChartProps> = ({
  productDetails,
}) => {
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

  const fatSaturationChartConfig = {
    saturated: {
      label: "Nasycone Kwasy Tłuszczowe",
      color: "hsl(var(--chart-red))",
    },
    unsaturated: {
      label: "Pozostałe tłuszcze",
      color: "hsl(var(--chart-yellow))",
    },
  } satisfies ChartConfig;

  const isFatAbsent = totalFat === 0;
  const isSaturatedAbsent = saturatedFat === 0;

  return (
    <Card
      className={`flex-1 flex-col min-w-[400px] ${
        isSaturatedAbsent ? "bg-green-100" : ""
      }`}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>Tłuszcz</CardTitle>
        <CardDescription>na 100 g produktu</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        {isFatAbsent ? (
          <p className="flex-1 text-center text-xl text-muted-foreground p-10 ">
            Brak tłuszczu w produkcie
          </p>
        ) : (
          <ChartContainer
            config={fatSaturationChartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={fatSaturationChartData}
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
                            {saturatedFat.toLocaleString() +
                              " g/ " +
                              totalFat +
                              " g"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 25}
                            className="fill-muted-foreground"
                          >
                            nasycone kwasy tłuszczowe / total tłuszcze
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
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
export default FatSaturationChart;

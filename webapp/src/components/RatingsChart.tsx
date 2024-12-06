import { ProductDetails } from "@/types/ProductDetails";
import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

interface RatingsChartProps {
  productDetails: ProductDetails;
}

const RatingsChart: FC<RatingsChartProps> = ({ productDetails }) => {
  const chartData = [
    { ratingCategory: "Smak", rating: 33 },
    { ratingCategory: "Jakość", rating: 40 },
    { ratingCategory: "Uniwersalność", rating: 20 },
    { ratingCategory: "Dostępność", rating: 15 },
    { ratingCategory: "Trwałość", rating: 45 },
  ];

  const chartConfig = {
    rating: {
      label: "Ocena",
      color: "hsl(var(--chart-green))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex-1 flex-col mt-4 min-w-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Oceny użytkowników</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-w-[300px] max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="ratingCategory" />
            <PolarGrid />
            <Radar
              dataKey="rating"
              fill="var(--color-rating)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RatingsChart;

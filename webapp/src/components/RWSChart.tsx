import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { useTranslation } from "react-i18next";

interface RWSChartData {
  name: string;
  rws: number;
  fill?: string;
  valueWithUnit?: string;
}

interface RWSChartProps {
  data: RWSChartData[];
  maxRWS?: number;
  chartConfig: ChartConfig;
  className?: string;
}

const RWSChart: React.FC<RWSChartProps> = ({
  data,
  maxRWS = 100,
  chartConfig,
  className,
}) => {
  const { t } = useTranslation();
  const computedMaxRWS = Math.max(maxRWS, ...data.map((item) => item.rws ?? 0));

  return (
    <ChartContainer
      config={chartConfig}
      className={`${className || "min-w-[400px]"} ${
        data.length === 1 ? "h-[150px]" : ""
      }`}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 20,
          right: 65,
          top: 20,
        }}
      >
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <XAxis
          dataKey="rws"
          type="number"
          domain={[0, computedMaxRWS]}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent unit="%" hideLabel />}
        />
        <Bar dataKey="rws" layout="vertical" radius={5} barSize={40}>
          <LabelList
            dataKey="valueWithUnit"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
        <ReferenceLine
          x={100}
          stroke="var(--color-reference-line)"
          strokeDasharray="3 3"
          strokeWidth={2}
          label={{
            value: t("RWSChart.rws"),
            position: "top",
            fill: "var(--color-label)",
            fontSize: 12,
          }}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default RWSChart;

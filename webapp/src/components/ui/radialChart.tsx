import { RadialBarChart, RadialBar, PolarRadiusAxis, Label } from "recharts";

const GenericRadialBarChart = ({
  data,
  config,
  totalKey,
  valueKey,
  unit = "",
  chartSize = { innerRadius: 80, outerRadius: 130 },
  className,
}) => {
  // Calculate total and derived data points for chart rendering
  const totalValue = data.find((item) => item.key === totalKey)?.value ?? 0;

  const dataPoints = config.map(({ key }) => ({
    [key]: data.find((item) => item.key === key)?.value ?? 0,
  }));

  return (
    <div className={`mx-auto aspect-square w-full max-w-[250px] ${className}`}>
      <RadialBarChart
        data={dataPoints}
        endAngle={180}
        innerRadius={chartSize.innerRadius}
        outerRadius={chartSize.outerRadius}
      >
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {totalValue.toLocaleString() + ` ${unit}`}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      total
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        {config.map(({ key, color }) => (
          <RadialBar
            key={key}
            dataKey={key}
            stackId="a"
            cornerRadius={5}
            fill={color}
            className="stroke-transparent stroke-2"
          />
        ))}
      </RadialBarChart>
    </div>
  );
};

export default GenericRadialBarChart;

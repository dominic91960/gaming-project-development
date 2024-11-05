import React from "react";

import { Bar, BarChart, Rectangle, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  totalIncome: {
    label: "Income",
    color: "#00FFA199",
  },
} satisfies ChartConfig;

interface MonthlyEarningsProps {
  chartData: {
    month: string;
    totalIncome: number;
  }[];
}

const MonthlyEarnings: React.FC<MonthlyEarningsProps> = ({ chartData }) => {
  return (
    <div className="relative w-full bg-black/80 text-[11px] my-[24px] p-[1em] font-secondaryFont border border-[#0D6D49] rounded-sm z-10 md:mb-0 2xl:w-[570px] 2xl:py-[30px] backdrop-blur-md min-[1920px]:z-0">
      <h2 className="font-medium text-[20px] 2xl:px-[30px]">Overview</h2>
      <p className="text-[13px] text-[#ACACAC] mb-[1em] 2xl:px-[30px]">
        Monthly Earning
      </p>

      <ChartContainer
        config={chartConfig}
        className="w-full min-h-[200px] 2xl:px-[30px]"
      >
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={4}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 2)}
            className="text-[7px] 2xl:text-[10px]"
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                className="bg-white text-black"
              />
            }
          />
          <Bar
            dataKey="totalIncome"
            fill="var(--color-totalIncome)"
            radius={4}
            barSize={28}
            activeBar={
              <Rectangle
                fill="#00FFA1"
                className="hover:-translate-y-[1%] origin-left transition-transform duration-200"
              />
            }
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default MonthlyEarnings;

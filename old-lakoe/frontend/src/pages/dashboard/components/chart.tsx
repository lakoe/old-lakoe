const chartData = [
  { month: "January", berhasil: 186, gagal: 80 },
  { month: "February", berhasil: 305, gagal: 200 },
  { month: "March", berhasil: 237, gagal: 120 },
  { month: "April", berhasil: 73, gagal: 190 },
  { month: "May", berhasil: 209, gagal: 130 },
  { month: "June", berhasil: 214, gagal: 140 },
];

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  berhasil: {
    label: "Transaksi Sukses",
    color: "#ea580c",
  },
  gagal: {
    label: "Transaksi Gagal",
    color: "#1e293b",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="berhasil" fill="var(--color-berhasil)" radius={4} />
        <Bar dataKey="gagal" fill="var(--color-gagal)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

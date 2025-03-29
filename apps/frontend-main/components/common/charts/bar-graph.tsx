"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/components/ui/chart";

const initialData = [
  { day: "2024-03-20", humidity: 60, temp: 30, ppm: 400 },
  { day: "2024-03-21", humidity: 65, temp: 28, ppm: 420 },
  { day: "2024-03-22", humidity: 70, temp: 32, ppm: 410 },
  { day: "2024-03-23", humidity: 75, temp: 29, ppm: 430 },
  { day: "2024-03-24", humidity: 68, temp: 31, ppm: 415 },
];

// const chartConfig = {
//   humidity: { label: "Humidity", color: "var(--chart-1)" },
//   temp: { label: "Temperature", color: "var(--chart-2)" },
//   ppm: { label: "PPM", color: "var(--chart-3)" },
// } satisfies ChartConfig;

export function BarGraph({title = "Environmental Data", desc = "Select a date range to filter data",data = [], chartConfig} : {title?: string, desc?: string, data: [], chartConfig: ChartConfig}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      {/* Ensure CardContent & ChartContainer take full width */}
      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart data={(data.length === 0) ? initialData : data} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickFormatter={(value) => value.slice(5)} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />

            {Object.entries(chartConfig).map(([key, val], ind) => (
              <Bar index={ind} key={key} dataKey={key} fill={val.color} radius={4} />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        </div>
        <div className="leading-none text-muted-foreground">
        </div>
      </CardFooter>
    </Card>
  );
}

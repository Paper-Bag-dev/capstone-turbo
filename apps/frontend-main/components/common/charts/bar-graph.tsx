"use client"

import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/components/ui/chart"

const initialData = [
  { day: "2024-03-20", humidity: 60, temp: 30, ppm: 400 },
  { day: "2024-03-21", humidity: 65, temp: 28, ppm: 420 },
  { day: "2024-03-22", humidity: 70, temp: 32, ppm: 410 },
  { day: "2024-03-23", humidity: 75, temp: 29, ppm: 430 },
  { day: "2024-03-24", humidity: 68, temp: 31, ppm: 415 },
]

const chartConfig = {
  humidity: { label: "Humidity", color: "var(--chart-1)" },
  temp: { label: "Temperature", color: "var(--chart-2)" },
  ppm: { label: "PPM", color: "var(--chart-3)" },
} satisfies ChartConfig

export function BarGraph() {
  const [data, setData] = useState(initialData)
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Environmental Data</CardTitle>
        <CardDescription>Select a date range to filter data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} width={600} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickFormatter={(value) => value.slice(5)} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="humidity" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="temp" fill="var(--chart-2)" radius={4} />
            <Bar dataKey="ppm" fill="var(--chart-3)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing environmental readings for selected days
        </div>
      </CardFooter>
    </Card>
  )
}
"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/components/ui/chart";
import axios from "axios";
import { useSession } from "next-auth/react";

const chartConfig = {
  visitors: {
    label: "VOC",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type BaseDataItem = {
  date: string;
  avgHumidity: number;
  avgTemperature: number;
  avgPPM: number;
  minHumidity: number;
  maxHumidity: number;
  minTemperature: number;
  maxTemperature: number;
  minPPM: number;
  maxPPM: number;
};

const colors = [
  "#0B3D02", "#166D07", "#1F8A10", "#28A219", "#32BA21",
  "#44D62C", "#66E04D", "#85E87B", "#A3F0A1", "#C4F7C3"
];

export function PieGraph() {
  const initialChartData = [
    { name: "Acetic acid", visitors: 275, fill: "var(--color-chrome)" },
    { name: "Acetone", visitors: 200, fill: "var(--color-safari)" },
    { name: "Benzene", visitors: 287, fill: "var(--color-firefox)" },
    { name: "Ethanol", visitors: 173, fill: "var(--color-edge)" },
    { name: "Formaldehyde", visitors: 190, fill: "var(--color-chrome)" },
    { name: "Isoprene", visitors: 190, fill: "var(--color-safari)" },
    { name: "Methanol", visitors: 190, fill: "var(--color-firefox)" },
    {
      name: "Minimal VOCs, clean air (O₂, N₂)",
      visitors: 190,
      fill: "var(--color-edge)",
    },
    { name: "Toluene", visitors: 190, fill: "var(--color-chrome)" },
    { name: "Xylene", visitors: 190, fill: "var(--color-safari)" },
  ];

  const [chartData, setChartData] = React.useState(initialChartData);
  
  const totalVisitors = 100

  const { data: session } = useSession();

  React.useEffect(() => {
    const fetchLLMData = async (features: number[]) => {
      try {
        const response = await axios.post("http://15.206.210.191:5000/plantgpt/predict", {
          features,
        });
  
        console.log("Logistic Response:", response.data);
        
        if(response.data){
          
          const newChartData = [
            { name: "Acetic acid", visitors: response.data.voc_probabilities["Acetic Acid"] * 100, fill: colors[0]! },
            { name: "Acetone", visitors: response.data.voc_probabilities["Acetone"] * 100, fill: colors[1]! },
            { name: "Benzene", visitors: response.data.voc_probabilities["Benzene"] * 100, fill: colors[2]! },
            { name: "Ethanol", visitors: response.data.voc_probabilities["Ethanol"] * 100, fill: colors[3]! },
            { name: "Formaldehyde", visitors: response.data.voc_probabilities["Formaldehyde"] * 100, fill: colors[4]! },
            { name: "Isoprene", visitors: response.data.voc_probabilities["Isoprene"] * 100, fill: colors[5]! },
            { name: "Methanol", visitors: response.data.voc_probabilities["Methanol"] * 100, fill: colors[6]! },
            { 
              name: "Minimal VOCs, clean air (O₂, N₂)", 
              visitors: response.data.voc_probabilities["Minimal VOCs, clean air (O₂, N₂)"] * 100, 
              fill: colors[7]! 
            },
            { name: "Toluene", visitors: response.data.voc_probabilities["Toluene"] * 100, fill: colors[8]! },
            { name: "Xylene", visitors: response.data.voc_probabilities["Xylene"] * 100, fill: colors[9]! }
          ];
          

          setChartData(newChartData);
        }
      } catch (error) {
        console.error("Error fetching LLM data:", error);
      }
    };  

    const fetchBaseData = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/get-data`,
        { userId: session?.user.id }
      );
      if (res.data.success && res.data.data.length > 0) {
        const baseData = res.data.data;

        // Compute averages
        const avgHumidity =
          baseData.reduce((acc:number, item: BaseDataItem) => acc + item.avgHumidity, 0) /
          baseData.length;
        const avgTemperature =
          baseData.reduce((acc:number, item: BaseDataItem) => acc + item.avgTemperature, 0) /
          baseData.length;
        const avgPPM =
          baseData.reduce((acc:number, item: BaseDataItem) => acc + item.avgPPM, 0) /
          baseData.length;

        // Call LLM API
        fetchLLMData([avgHumidity, avgTemperature, avgPPM, 12]);
      }
    };

    fetchBaseData();
  }, [session?.user.id]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>VOC Types</CardTitle>
        <CardDescription>Volatile Organic Compounds</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
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
                          className="text-3xl font-bold fill-foreground"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Compound %
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Breakdown By Logistic Regression <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total compound percentage for forest on all average
        </div>
      </CardFooter>
    </Card>
  );
}
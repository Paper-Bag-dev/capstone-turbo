"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import { useAppContext } from "../../../context";

const chartConfig = {
  humidity: {
    label: "Humidity",
    color: "var(--chart-1)",
  },
  ppm: {
    label: "PPM",
    color: "var(--chart-2)",
  },
  temperature: {
    label: "Temperature",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const dummyData = [
      {
          "timestamp": "2025-03-18T07:07:47.799Z",
          "humidity": 30.323232,
          "temperature": 33,
          "ppm": 340
      },
      {
          "timestamp": "2025-03-18T07:07:56.261Z",
          "humidity": 30.323232,
          "temperature": 33,
          "ppm": 340
      },
      {
          "timestamp": "2025-03-18T07:07:56.952Z",
          "humidity": 30.323232,
          "temperature": 33,
          "ppm": 340
      },
      {
          "timestamp": "2025-03-18T07:07:57.752Z",
          "humidity": 30.323232,
          "temperature": 33,
          "ppm": 340
      },
      {
          "timestamp": "2025-03-18T07:29:37.019Z",
          "humidity": 30.323232,
          "temperature": 33,
          "ppm": 340
      },
      {
          "timestamp": "2025-03-18T07:47:38.999Z",
          "humidity": 46.6,
          "temperature": 32.5,
          "ppm": 1869
      },
      {
          "timestamp": "2025-03-18T07:47:44.913Z",
          "humidity": 46.3,
          "temperature": 32.5,
          "ppm": 1845
      },
      {
          "timestamp": "2025-03-18T07:47:50.688Z",
          "humidity": 46.3,
          "temperature": 32.5,
          "ppm": 1845
      },
      {
          "timestamp": "2025-03-18T07:47:56.608Z",
          "humidity": 46.2,
          "temperature": 32.5,
          "ppm": 1846
      },
      {
          "timestamp": "2025-03-18T07:48:02.523Z",
          "humidity": 46.2,
          "temperature": 32.5,
          "ppm": 1841
      },
      {
          "timestamp": "2025-03-18T07:48:08.520Z",
          "humidity": 46.3,
          "temperature": 32.4,
          "ppm": 1841
      },
      {
          "timestamp": "2025-03-18T07:48:14.360Z",
          "humidity": 46.3,
          "temperature": 32.4,
          "ppm": 1810
      },
      {
          "timestamp": "2025-03-18T07:48:20.137Z",
          "humidity": 46.3,
          "temperature": 32.3,
          "ppm": 1825
      },
      {
          "timestamp": "2025-03-18T07:48:26.031Z",
          "humidity": 46.3,
          "temperature": 32.3,
          "ppm": 1818
      },
      {
          "timestamp": "2025-03-18T07:48:31.912Z",
          "humidity": 46.4,
          "temperature": 32.3,
          "ppm": 1819
      },
      {
          "timestamp": "2025-03-18T07:48:37.798Z",
          "humidity": 46.5,
          "temperature": 32.3,
          "ppm": 1813
      },
      {
          "timestamp": "2025-03-18T07:48:43.578Z",
          "humidity": 46.6,
          "temperature": 32.2,
          "ppm": 1807
      },
      {
          "timestamp": "2025-03-18T07:48:49.347Z",
          "humidity": 46.6,
          "temperature": 32.2,
          "ppm": 1793
      },
      {
          "timestamp": "2025-03-18T07:48:55.145Z",
          "humidity": 46.7,
          "temperature": 32.2,
          "ppm": 1808
      },
      {
          "timestamp": "2025-03-18T07:49:00.908Z",
          "humidity": 46.7,
          "temperature": 32.2,
          "ppm": 1809
      },
      {
          "timestamp": "2025-03-18T07:49:06.688Z",
          "humidity": 46.8,
          "temperature": 32.2,
          "ppm": 1810
      },
      {
          "timestamp": "2025-03-18T07:49:12.551Z",
          "humidity": 46.8,
          "temperature": 32.2,
          "ppm": 1818
      },
      {
          "timestamp": "2025-03-18T07:49:18.335Z",
          "humidity": 46.8,
          "temperature": 32.2,
          "ppm": 1811
      },
      {
          "timestamp": "2025-03-18T07:49:24.138Z",
          "humidity": 46.8,
          "temperature": 32.2,
          "ppm": 1805
      },
      {
          "timestamp": "2025-03-18T07:49:29.902Z",
          "humidity": 46.7,
          "temperature": 32.1,
          "ppm": 1792
      },
      {
          "timestamp": "2025-03-18T07:49:35.699Z",
          "humidity": 46.8,
          "temperature": 32.1,
          "ppm": 1801
      },
      {
          "timestamp": "2025-03-18T07:49:41.481Z",
          "humidity": 46.8,
          "temperature": 32.1,
          "ppm": 1803
      }
  ]

type ChartDataTye = typeof dummyData;

export function AreaChartLine({ deviceId }: { deviceId: string }) {
  const { date, setDate } = useAppContext();
  const [chartData, setChartData] = useState<ChartDataTye>();
  useEffect(() => {
    if (!date.start || !date.end) return;

    const fetchData = async () => {
      try {
        console.log(deviceId);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/get-data-device`,
          { deviceId: deviceId, startDate: date.start, endDate: date.end }
        );
        console.log("Chart Data: ");
        console.log(response.data);

        if(response.data.data.length === 0){
          setChartData(dummyData);
          return;
        }
        setChartData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, setDate, deviceId]);

  return (
    <Card className="w-[48rem]">
      <CardHeader>
        <CardTitle>All Parameters</CardTitle>
        <CardDescription>
          Showing Humidity, PPM, and Temperature for the selected range
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-humidity)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-humidity)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPPM" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ppm)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ppm)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="humidity"
              type="natural"
              fill="url(#fillHumidity)"
              fillOpacity={0.4}
              stroke="var(--color-humidity)"
              stackId="a"
            />
            <Area
              dataKey="ppm"
              type="natural"
              fill="url(#fillPPM)"
              fillOpacity={0.4}
              stroke="var(--color-ppm)"
              stackId="a"
            />
            <Area
              dataKey="temperature"
              type="natural"
              fill="url(#fillTemperature)"
              fillOpacity={0.4}
              stroke="var(--color-temperature)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-start w-full gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending data from {date.start} to {date.end}{" "}
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

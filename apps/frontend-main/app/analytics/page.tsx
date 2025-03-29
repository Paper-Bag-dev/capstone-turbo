"use client";
import React, { useEffect, useState } from "react";
import AnalyticsLayout from "./Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CalendarDateRangePicker } from "@/components/common/Date/date-range-picker";
import { BarGraph } from "@/components/common/charts/bar-graph";
import { AreaChartLine } from "@/components/common/AreaLineChart";
import { PieGraph } from "@/components/common/charts/pie-graph";
import PageContainer from "@/components/common/layout/page-container";
import CustomCard from "@/components/common/CustomCard";
import {
  CircleDotDashed,
  DropletIcon,
  ThermometerSun,
} from "lucide-react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/components/ui/carousel";
import { ChartConfig } from "@/components/components/ui/chart";


type Device = {
  _id: string;
  deviceName: string;
  userId: string;
  location: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  __v: number;
};

const humidityConfig = {
  minHumidity: { label: "minHumidity", color: "var(--chart-1)" },
  maxHumidity: { label: "maxHumidity", color: "var(--chart-2)" },
} satisfies ChartConfig;

const ppmConfig = {
  minPPM: { label: "minPPM", color: "var(--chart-1)" },
  maxPPM: { label: "maxPPM", color: "var(--chart-2)" },
} satisfies ChartConfig;

const tempConfig = {
  minTemperature: { label: "minTemp", color: "var(--chart-1)" },
  maxTemperature: { label: "maxTemp", color: "var(--chart-2)" },
} satisfies ChartConfig;

const Analytics = () => {
  const [humidity, setHumidity] = useState(0);
  const [temp, setTemp] = useState(0);
  const [ppm, setPpm] = useState(0);
  const [devices, setDevices] = useState<Device[]>();
  // const [data, setData] = useState();
  const [humidityData, setHumidityData] = useState<[]>([]);
  const [ppmData, setPpmData] = useState<[]>([]);
  const [temperatureData, setTemperatureData] = useState<[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("User not logged in!");
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session) {
          return;
        }
        const response = await axios.post<{ devices: Device[] }>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/device/get-devices`,
          { userId: session?.user.id }
        );
        setDevices(response.data.devices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchBaseData = async () => {
      try {
        if (!session) return;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/get-data`,
          { userId: session?.user.id }
        );
        const rawData = response.data.data;
        type rawDataType = typeof rawData;
        // Process the data
        const humidity = rawData.map((entry: rawDataType) => ({
          date: entry.date,
          minHumidity: entry.minHumidity,
          maxHumidity: entry.maxHumidity,
        }));
        const ppm = rawData.map((entry: rawDataType) => ({
          date: entry.date,
          minPPM: entry.minPPM,
          maxPPM: entry.maxPPM,
        }));
        const temperature = rawData.map((entry: rawDataType) => ({
          date: entry.date,
          minTemperature: entry.minTemperature,
          maxTemperature: entry.maxTemperature,
        }));

        setHumidityData(humidity);
        setPpmData(ppm);
        setTemperatureData(temperature);
      } catch (error) {
        console.log("Error fetching base data", error);
      }
    };

    fetchData();
    fetchBaseData();
  }, [session]);

    useEffect(() => {
      if (!session) return;
  
      const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/live-agg?userId=${session.user.id}`);
  
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setHumidity(data.avgHumidity.toFixed(3));
        setTemp(data.avgTemperature.toFixed(1));
        setPpm(data.avgPPM);  
      };
  
      eventSource.onerror = () => {
        eventSource.close();
      };
  
      return () => eventSource.close();
    }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <AnalyticsLayout>
      <PageContainer scrollable={true}>
        <div className="flex flex-col items-center w-full gap-4 p-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">Analytics - Devices</h1>
            <CalendarDateRangePicker />
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto group">
            <Carousel className="relative flex col-span-2 col-start-1 col-end-3 row-start-1 row-end-1 py-2">
              <CarouselContent className="w-full">
                {devices &&
                  devices.map((item, key) => {
                    return (
                      <CarouselItem className="" key={key}>
                        <AreaChartLine deviceId={item._id} />
                      </CarouselItem>
                    );
                  })}
              </CarouselContent>
              <CarouselPrevious className="absolute invisible -left-1 group-hover:visible" />
              <CarouselNext className="absolute invisible right-5 group-hover:visible" />
            </Carousel>

            <div className="flex col-span-1 col-start-3 px-1 py-2">
              <PieGraph />
            </div>

            <div className="flex w-full col-span-3 gap-3 md:flex-col lg:flex-row">
            <CustomCard
                  title="Humidity"
                  desc="Relative Humidity (RH)"
                  icon={
                    <DropletIcon className="font-bold w-7 h-7 text-primary" />
                  }
                  val={`${humidity} %`}
                  footer="measures humidity aggregation"
                />
                <CustomCard
                  title="Temperature"
                  desc="Celcius"
                  icon={<ThermometerSun className="w-7 h-7 text-temp" />}
                  val={`${temp} \u00b0 C`}
                  footer={`0 \u00b0 C to 50 \u00b0 C`}
                />
                <CustomCard
                  title="PPM"
                  desc="Particles Per Million (PPM)"
                  icon={<CircleDotDashed className="text-blue-400" />}
                  val={`${ppm} PPM`}
                  footer="sensor PPM live values"
                />
              </div>
          </div>
          <div className="flex flex-col w-full gap-4 py-2">
            <h1 className="text-2xl font-bold">Combined Device Aggregation</h1>
            <div className="grid w-full grid-cols-4 grid-rows-3 gap-4">
              <div className="col-start-1 col-end-5">
                {humidityData && (
                  <BarGraph title="Humidity" desc="Min and Max humidity" data={humidityData} chartConfig={humidityConfig} />
                )}
              </div>
              <div className="col-start-1 col-end-5">
                {ppmData && (
                  <BarGraph title="PPM" desc="Min and Max PPM" data={ppmData} chartConfig={ppmConfig} />
                )}
              </div>
              <div className="col-start-1 col-end-5">
                {temperatureData && (
                  <BarGraph title="Temperature" desc="Min and Max temperature" data={temperatureData} chartConfig={tempConfig} />
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </AnalyticsLayout>
  );
};

export default Analytics;

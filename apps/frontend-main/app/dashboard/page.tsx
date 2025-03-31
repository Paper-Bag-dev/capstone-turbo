"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/components/ui/button";
import DashboardLayout from "./Layout";
import { BarGraph } from "@/components/common/charts/bar-graph";
import { PieGraph } from "@/components/common/charts/pie-graph";
import PageContainer from "@/components/common/layout/page-container";
import {
  CircleDotDashed,
  CpuIcon,
  DropletIcon,
  MapPinIcon,
  ThermometerSun,
} from "lucide-react";
import CustomCard from "@/components/common/CustomCard";
import CustomChat from "@/components/common/CustomChat";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChartConfig } from "@/components/components/ui/chart";
import DashboardPopups from "@/components/Dashboard/DashboardContent";
import axios from "axios";

const chartConfig = {
  humidity: { label: "Humidity", color: "var(--chart-1)" },
  temp: { label: "Temperature", color: "var(--chart-2)" },
  ppm: { label: "PPM", color: "var(--chart-3)" },
} satisfies ChartConfig;

const Dashboard = () => {
  const [humidityData, setHumidityData] = useState<[]>([]);
  const [ppmData, setPpmData] = useState<[]>([]);
  const [temperatureData, setTemperatureData] = useState<[]>([]);
  const [humidity, setHumidity] = useState(0);
  const [temp, setTemp] = useState(0);
  const [ppm, setPpm] = useState(0);
  const [user, setUser] = useState<string>("User");
  const [locRefresh, setLocRefresh] = useState<boolean>(false);

  const pathname = usePathname();

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("User not logged in!");
      router.push("/api/auth/signin");
    } else if (session?.user?.name) {
      setUser(session.user.name);
    }
  }, [status, session, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/?show=false");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    if (!session) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/live-agg?userId=${session.user.id}`
    );

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

  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        if (!session) return;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/get-data-loc`,
          { userId: session?.user.id }
        );

        const rawData = response.data.processedData;

        if (!rawData) {
          console.log("No data received");
          return;
        }

        const humidity = rawData.map((entry: any) => ({
          date: entry.date,
          avgHumidity: entry.avgHumidity,
        }));

        const ppm = rawData.map((entry: any) => ({
          date: entry.date,
          avgPPM: entry.avgPPM,
        }));

        const temperature = rawData.map((entry: any) => ({
          date: entry.date,
          avgTemperature: entry.avgTemperature,
        }));

        setHumidityData(humidity);
        setPpmData(ppm);
        setTemperatureData(temperature);
      } catch (error) {
        console.error("Error fetching base data", error);
      }
    };

    fetchBaseData();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <DashboardPopups
        locRefresh={locRefresh}
        setLocRefresh={setLocRefresh}
        router={router}
        pathname={pathname}
      />
      <DashboardLayout>
        <PageContainer scrollable={true}>
          <div className="space-y-2">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Hi, Welcome back {user} 👋
              </h2>

              <div className="items-center hidden pr-3 space-x-2 md:flex">
                {/* <CalendarDateRangePicker /> */}
                <Button
                  className="text-white bg-black hover:bg-accent"
                  onClick={() => {
                    router.push(`${pathname}/?loc=true`);
                  }}
                >
                  <MapPinIcon />
                </Button>

                <Button
                  onClick={() => {
                    router.push(`${pathname}/?show=true`);
                  }}
                >
                  <CpuIcon /> Add Device
                </Button>
              </div>
            </div>
            <div className="grid auto-rows-auto md:grid-cols-1 lg:grid-cols-4">
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

              <div className="flex col-span-2 row-start-2 py-3">
                <BarGraph data={[]} chartConfig={chartConfig} />
              </div>

              <div className="flex items-center justify-center col-start-3 px-[0.3rem] ml-1 py-3">
                <PieGraph />
              </div>
              <div className="col-start-4 row-span-2 row-start-1 px-3">
                <CustomChat />
              </div>
            </div>
          </div>
        </PageContainer>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

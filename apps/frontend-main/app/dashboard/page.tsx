"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/components/ui/button";
import DashboardLayout from "./Layout";
import { AreaGraph } from "@/components/common/charts/area-graph";
import { BarGraph } from "@/components/common/charts/bar-graph";
import { PieGraph } from "@/components/common/charts/pie-graph";
import { CalendarDateRangePicker } from "@/components/common/Date/date-range-picker";
import PageContainer from "@/components/common/layout/page-container";
// import { RecentSales } from "@/components/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/components/ui/tabs";
import {
  CircleDotDashed,
  CpuIcon,
  DropletIcon,
  ThermometerSun,
} from "lucide-react";
import { humidity, ppm, temp } from "../../utils/dataTypes";
import CustomCard from "@/components/common/CustomCard";
import CustomChat from "@/components/common/CustomChat";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddDevicePopup from "@/components/common/modals/AddDevice";

const Dashboard = () => {
  // use session to validate user
  const [humidity, setHumidity] = useState<humidity[]>([]);
  const [temp, setTemp] = useState<temp[]>([]);
  const [ppm, setPpm] = useState<ppm[]>([]);
  const [user, setUser] = useState<string>("User");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const show = searchParams.get("show");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/?show=false");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <>
      <AddDevicePopup
        show={show}
        backFn={() => {
          router.push(`${pathname}/?show=false`);
        }}
      />
      <DashboardLayout>
        <PageContainer scrollable={true}>
          <div className="space-y-2">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                {/* Add a user name parser here */}
                Hi, Welcome back {user}👋
              </h2>

              {/* Allow user to set data range and add devices */}
              <div className="items-center hidden space-x-2 md:flex">
                <CalendarDateRangePicker />
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
                  val="90.32 %"
                  footer="measures humidity aggregation"
                />
                <CustomCard
                  title="Temperature"
                  desc="Celcius"
                  icon={<ThermometerSun className="w-7 h-7 text-temp" />}
                  val={`32 \u00b0 C`}
                  footer={`0 \u00b0 C to 50 \u00b0 C`}
                />
                <CustomCard
                  title="PPM"
                  desc="Particles Per Million (PPM)"
                  icon={<CircleDotDashed className="text-blue-400" />}
                  val="200 PPM"
                  footer="sensor PPM live values"
                />
              </div>

              <div className="flex col-span-2 row-start-2 py-3">
                <BarGraph />
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

"use client";
import React, { useEffect } from "react";
import AnalyticsLayout from "./Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CalendarDateRangePicker } from "@/components/common/Date/date-range-picker";

const Analytics = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("User not logged in!");
      router.push("/api/auth/signin");
    }
  }, [status, session, router]);
  return (
    <AnalyticsLayout>
      <div className="flex flex-col items-center w-full h-full p-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <CalendarDateRangePicker />
        </div>
      </div>
    </AnalyticsLayout>
  );
};

export default Analytics;

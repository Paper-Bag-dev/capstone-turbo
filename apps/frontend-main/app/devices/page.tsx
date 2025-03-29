"use client";
import React, { useEffect, useState } from "react";
import DeviceLayout from "./Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DeviceCard from "@/components/common/DeviceCard";
import { CpuIcon } from "lucide-react";

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

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("User not logged in!");
      router.push("/api/auth/signin");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session) return;
        
        const response = await axios.post<{ devices: Device[] }>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/device/get-devices`,
          { userId: session?.user.id }
        );
        setDevices(response.data.devices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchData();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <DeviceLayout>
      <div className="flex flex-col items-center w-full h-full p-4">
        <h1 className="w-full text-2xl font-bold">Devices</h1>
        <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard
              key={device._id}
              id={device._id}
              title={device.deviceName}
              desc={`Location: ${device.location.name}`}
              icon={<span><CpuIcon /></span>}
            />
          ))}
        </div>
      </div>
    </DeviceLayout>
  );
};

export default Devices;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";

interface SearchParamProps {
  show: string | null;
  refresh: boolean;
  backFn: () => void;
}

const AddDevicePopup = ({ show, refresh, backFn = () => {} }: SearchParamProps) => {
  const [deviceName, setdeviceName] = useState("");
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locList, setLocList] = useState<
    { _id: string; locationName: string; latitude: number; longitude: number }[]
  >([]);

  const { data: session } = useSession();
  const getLocations = async () => {
    if(!session?.user.id)
      return;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/location/get-location`,
        {
          userId: session?.user.id, // Fix: Send only userId
        }
      );

      if (res.data.status) {
        setLocList(res.data.locations);
      } else {
        setLocList([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLocations();
    };
    
    if (session?.user.id) {
      fetchData();
    }
  }, [refresh]);

  const handleSubmit = async () => {
    if (!deviceName || !locationName || !location) {
      setError("Device ID, Location Id, and Location Name are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log({
        deviceName,
        userId: session?.user.id,
        id: location,
        name: locationName,
        longitude,
        latitude,
      });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/device/add-device`,
        {
          deviceName,
          userId: session?.user.id,
          id: location,
          name: locationName,
          longitude,
          latitude,
        }
      );

      console.log("Device Added:", response.data);
      backFn();
    } catch (err) {
      console.error("Error adding device:", err);
      setError("Failed to add device. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {show === "true" && (
        <div
          onClick={() => backFn()}
          className="absolute top-0 flex items-center justify-center w-full h-full z-[4] bg-black/50"
        >
          <Card
            className="w-[32rem] h-[36rem] items-center flex"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="text-2xl">Add Device</CardTitle>
            <CardContent className="w-full px-12">
              <p className="py-3 pl-1">Device Name*</p>
              <Input
                value={deviceName}
                onChange={(e) => setdeviceName(e.target.value)}
                placeholder="Enter Device Name"
              />

              <p className="py-3 pl-1">Location Id*</p>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location Id"
              />

              <div className="flex justify-around w-full gap-8 pt-8">
                <Input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Longitude"
                />
                <Input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Latitude"
                />
              </div>
              <div className="flex justify-between w-full pt-8">
                <Input
                  value={locationName}
                  className="w-48"
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Choose Location..."
                />
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex gap-2 p-2 rounded-md text-md bg-accent">
                    Select Location
                    <ChevronDown className="pt-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[22rem]">
                    <DropdownMenuLabel>Added Locations</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {locList.map((item) => (
                      <DropdownMenuItem
                        key={item._id} // Fix: Use `_id` as key
                        onClick={() => {
                          setLocationName(item.locationName); // Fix: Use `locationName`
                          setLatitude(String(item.latitude)); // Fix: Store latitude
                          setLongitude(String(item.longitude)); // Fix: Store longitude
                          setLocation(item._id); // Fix: Store `_id` as location
                        }}
                      >
                        {item.locationName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-16 mt-12 text-xl"
              >
                {loading ? "Adding..." : "Add Device"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddDevicePopup;

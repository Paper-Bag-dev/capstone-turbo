"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";

interface SearchParamProps {
  show: string | null;
  backFn: () => void;
}

const AddDevicePopup = ({ show, backFn = () => {} }: SearchParamProps) => {
  const [deviceName, setdeviceName] = useState("");
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!deviceName || !locationName || !location) {
      setError("Device ID, Location Id and Location Name are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/device/add-device`, {
        deviceName,
        location,
        longitude,
        latitude,
        locationName,
      });

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
              <Input value={deviceName} onChange={(e) => setdeviceName(e.target.value)} placeholder="Enter Device Name" />

              <p className="py-3 pl-1">Location Id*</p>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter Location Id" />

              <div className="flex justify-around w-full gap-8 pt-8">
                <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
                <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
              </div>

              <p className="py-3 pl-1">Location Name*</p>
              <Input value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Enter Location Name" />

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

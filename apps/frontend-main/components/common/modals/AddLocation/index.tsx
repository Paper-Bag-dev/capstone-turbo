"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { useSession } from "next-auth/react";

interface SearchParamProps {
  show: string | null;
  setLocRefresh: React.Dispatch<React.SetStateAction<boolean>>
  backFn: () => void;
}

const AddLocationPopup = ({ show, setLocRefresh, backFn = () => {} }: SearchParamProps) => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (!locationName || !latitude || !longitude) {
      setError("Location Name, Latitude, and Longitude are required.");
      return;
    } 

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/location/add-location`, {
        id: session?.user.id,
        locationName,
        latitude,
        longitude,
      });

      console.log("Location Added:", response.data);
      setLocRefresh((prev:boolean) => !prev);
      backFn(); // Close popup on success
    } catch (err) {
      console.error("Error adding location:", err);
      setError("Failed to add location. Try again.");
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
            className="w-[32rem] h-[30rem] flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="text-2xl">Add Location</CardTitle>
            <CardContent className="w-full px-12">
              <p className="py-3 pl-1">Location Name*</p>
              <Input
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Enter Location Name"
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

              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-16 mt-12 text-xl"
              >
                {loading ? "Adding..." : "Add Location"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddLocationPopup;

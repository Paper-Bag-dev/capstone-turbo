import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactElement;
}

const DeviceCard = ({ id, title, desc, icon }: Props) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [ppm, setPPM] = useState<number | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/live-single-dev?deviceId=${id}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setPPM(data.ppm);

      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  const getTempColor = () => (temperature !== null && temperature >= 40 ? "text-red-500" : "text-blue-500");
  const getHumidityColor = () => (humidity !== null && humidity > 70 ? "text-red-500" : "text-green-500");
  const getPPMColor = () => (ppm !== null && ppm > 1000 ? "text-red-500" : "text-green-500");

  return (
    <Card className="w-[18rem] h-[16rem] flex flex-col justify-between shadow-lg border rounded-xl p-4 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-400">{desc}</CardDescription>
        </div>
        <div className="text-2xl">{icon}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Temperature</span>
          <span className={`text-xl font-semibold ${getTempColor()}`}>
            {temperature !== null ? `${temperature}°C` : "--"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Humidity</span>
          <span className={`text-xl font-semibold ${getHumidityColor()}`}>
            {humidity !== null ? `${humidity}%` : "--"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">PPM</span>
          <span className={`text-xl font-semibold ${getPPMColor()}`}>
            {ppm !== null ? ppm : "--"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-center text-gray-500"></CardFooter>
    </Card>
  );
};

export default DeviceCard;
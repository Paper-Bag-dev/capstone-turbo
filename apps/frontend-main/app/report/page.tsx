"use client";
import React, { useEffect, useState } from "react";
import ReportLayout from "./Layout";
import PageContainer from "@/components/common/layout/page-container";
import axios from "axios";
import { useSession } from "next-auth/react";

type BaseDataItem = {
  date: string;
  avgHumidity: number;
  avgTemperature: number;
  avgPPM: number;
  minHumidity: number;
  maxHumidity: number;
  minTemperature: number;
  maxTemperature: number;
  minPPM: number;
  maxPPM: number;
};

const Report = () => {
  const [report, setReport] = useState();
  const [recommendations, setRecommendations] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchLLMData = async (features: object) => {
      try {
        console.log(features);
        const response = await axios.post(
          "http://15.206.210.191:5000/plantgpt/ai-report",
          features
        );

        if (response.data.risks === true) {
          setReport(response.data.overall_health);
          setRecommendations(response.data.recommendations);
        } else {
          setReport(response.data.overall_health);
        }
      } catch (error) {
        console.error("Error fetching LLM data:", error);
      }
    };
    const fetchBaseData = async () => {
      try {
        if(!session){
          return;
        }
        
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/get-data`,
          { userId: session?.user.id }
        );
        if (res.data.success && res.data.data.length > 0) {
          const baseData = res.data.data;

          // Compute averages
          const avgHumidity =
            baseData.reduce(
              (acc: number, item: BaseDataItem) => acc + item.avgHumidity,
              0
            ) / baseData.length;
          const avgTemperature =
            baseData.reduce(
              (acc: number, item: BaseDataItem) => acc + item.avgTemperature,
              0
            ) / baseData.length;
          const avgPPM =
            baseData.reduce(
              (acc: number, item: BaseDataItem) => acc + item.avgPPM,
              0
            ) / baseData.length;

          const data = {
            humidity: avgHumidity,
            temperature: avgTemperature,
            voc_levels: 0.8,
            ppm_levels: avgPPM,
            time_frame: "one month"
          };
          fetchLLMData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBaseData();
  }, [session]);
  return (
    <ReportLayout>
      <PageContainer scrollable={true}>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Report</span>
          <div>{report}</div>
          {recommendations && (
            <>
              <span className="text-2xl font-bold">Recommendations</span>
              <div>{recommendations}</div>
            </>
          )}
        </div>
      </PageContainer>
    </ReportLayout>
  );
};

export default Report;

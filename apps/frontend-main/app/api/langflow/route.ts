import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  console.log("Bearer call Called: ", process.env.LANGFLOW_TOKEN);
  try {
    const body = await req.json();
    const { input_value } = body;
    console.log("API Hit - Received Input:", input_value);
    // Make the Langflow API call
    const langflowRes = await axios.post(
      "https://api.langflow.astra.datastax.com/lf/225d1824-e190-4e58-ba5f-69f51ffd4503/api/v1/run/b03d076f-bb4a-44c7-a93c-9c0b330f3ffd?stream=false",
      {
        input_value,
        output_type: "chat",
        input_type: "chat",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
        },
      }
    );

    return NextResponse.json(langflowRes.data, { status: 200 });
  } catch (error: any) {
    console.error("Langflow API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}

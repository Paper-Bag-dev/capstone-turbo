"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatLayout from "./Layout";

const Chat = () => {
  const [chat, setChat] = useState<string>("");

  const callLangflow = async () => {
    try {
      const res = await axios.post("/api/langflow", {
        input_value: "Hello Langflow",
      });

      setChat(JSON.stringify(res.data, null, 2));
      console.log("Langflow Response:", res.data);
    } catch (error) {
      console.error("Error calling Langflow API:", error);
      setChat(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    callLangflow();
  }, []);

  return (
    <ChatLayout>
      <div className="flex flex-col items-center w-full h-full p-4">
        <h1 className="text-2xl font-bold">Chat</h1>
        <pre className="p-3 mt-4 text-xs text-black whitespace-pre-wrap bg-gray-100 border rounded">
          {chat}
        </pre>
      </div>
    </ChatLayout>
  );
};

export default Chat;

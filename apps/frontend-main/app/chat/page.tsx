"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatLayout from "./Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import PageContainer from "@/components/common/layout/page-container";

interface Message {
  user: string;
  text: string;
  timestamp?: string;
}

const Message = ({ user, text, timestamp }: Message) => {
  return (
    <div className={`flex ${user === "AI" ? "justify-start" : "justify-end"}`}>
      <div className="max-w-sm md:max-w-md lg:max-w-lg p-3 px-5 rounded-lg shadow-md bg-[#262626] text-[#f2f2f2]">
        <span className="font-bold">{user}:</span> {text}
        {timestamp && (
          <div className="mt-1 text-xs text-gray-400">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const callLangflow = async (userInput: string) => {
    try {
      const res = await axios.post("/api/langflow", { input_value: userInput });
      const botResponse =
        res.data.outputs?.[0]?.outputs?.[0]?.results?.message?.data;

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "You", text: userInput, timestamp: new Date().toISOString() },
        {
          user: "AI",
          text: botResponse?.text || "No response",
          timestamp: botResponse?.timestamp,
        },
      ]);
    } catch (error) {
      console.error("Error calling Langflow API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "AI", text: "Error fetching response." },
      ]);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    callLangflow(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatLayout>
      <PageContainer scrollable={true}>
        <div className="w-full">
          <Card className="flex flex-col h-screen w-full max-w-3xl mx-auto border rounded-lg shadow-lg bg-[#121212]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Chatbot AI</CardTitle>
              <CardDescription className="text-gray-400">
                Ask anything!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-auto">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-4">
                  {messages.map((msg, index) => (
                    <Message
                      key={index}
                      user={msg.user}
                      text={msg.text}
                      timestamp={msg.timestamp}
                    />
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <div className="flex items-center gap-3 p-4 border-t">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-600 bg-[#1e1e1e] text-white"
              />
              <Button
                onClick={sendMessage}
                className="px-4 py-2 text-white rounded-lg"
              >
                Send
              </Button>
            </div>
          </Card>
        </div>
      </PageContainer>
    </ChatLayout>
  );
};

export default Chat;

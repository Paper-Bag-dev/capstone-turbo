"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/components/ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Message {
  user: string;
  text: string;
  timestamp?: string;
}

const Message = ({ user, text, timestamp }: Message) => {
  return (
    <div className={`flex ${user === 'AI' ? 'justify-start' : 'justify-end'}`}> 
      <div className='max-w-sm md:max-w-md lg:max-w-lg p-3 px-5 rounded-lg shadow-md bg-[#262626] text-[#f2f2f2]'>
        <span className='font-bold'>{user}:</span> {text}
        {timestamp && (
          <div className='mt-1 text-xs text-gray-400'>
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

const CustomChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const callLangflow = async (userInput: string) => {
    try {
      const res = await axios.post('/api/langflow', { input_value: userInput });
      const botResponse = res.data.outputs?.[0]?.outputs?.[0]?.results?.message?.data;

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'You', text: userInput, timestamp: new Date().toISOString() },
        {
          user: 'AI',
          text: botResponse?.text || 'No response',
          timestamp: botResponse?.timestamp,
        },
      ]);
    } catch (error) {
      console.error('Error calling Langflow API:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'AI', text: 'Error fetching response.' },
      ]);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    callLangflow(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className='flex flex-col h-[41.5rem]'>
      <CardHeader>
        <CardTitle>Ask us!</CardTitle>
        <CardDescription>Chatbot AI</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 overflow-y-auto no-scrollbar'>
        <ScrollArea className='h-full px-2'>
          <div className='flex flex-col gap-2'>
            {messages.map((msg, index) => (
              <Message key={index} user={msg.user} text={msg.text} timestamp={msg.timestamp} />
            ))}
            <div ref={chatEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <div className='flex gap-2 p-3'>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Type a message...'
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </Card>
  );
};

export default CustomChat;

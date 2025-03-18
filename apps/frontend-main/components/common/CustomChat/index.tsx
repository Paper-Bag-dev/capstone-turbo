import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/components/ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import { useState } from 'react';

interface message{
  user: string;
  text: string;
}

const Message = ({ user, text }: message) => {
  return (
    <div className={`flex ${user === 'User1' ? 'justify-start' : 'justify-end'}`}> 
      <div className={`max-w-xs p-2 px-4 rounded-lg bg-[#262626] text-[#f2f2f2]`}>
        <span className='font-bold'>{user}:</span> {text}
      </div>
    </div>
  );
};

const CustomChat = () => {
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Hey there!' },
    { user: 'User2', text: 'Hello! How are you?' }
  ]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState('User1');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: currentUser, text: input }]);
    setInput('');
    setCurrentUser(currentUser === 'User1' ? 'User2' : 'User1');
  };

  

  return (
    <Card className='flex flex-col h-full'>
      <CardHeader>
        <CardTitle>Ask us!</CardTitle>
        <CardDescription>Chatbot AI</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 overflow-hidden'>
        <ScrollArea className='h-full px-2'>
          <div className='flex flex-col gap-2'>
            {messages.map((msg, index) => (
              <Message key={index} user={msg.user} text={msg.text} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <div className='flex gap-2 p-3'>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message...' />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </Card>
  );
};

export default CustomChat;
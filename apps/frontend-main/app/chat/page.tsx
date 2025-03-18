import React from 'react'
import ChatLayout from './Layout'

const Chat = () => {
  return (
    <ChatLayout>
        <div className="flex flex-col items-center w-full h-full p-4">
            <h1 className="text-2xl font-bold">Chat</h1>
        </div>
    </ChatLayout>
  )
}

export default Chat
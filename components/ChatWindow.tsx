import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import type { ChatMessage } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isAgentTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isAgentTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isAgentTyping]);

  return (
    <div 
        ref={scrollRef} 
        className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800"
    >
      <div className="max-w-3xl mx-auto space-y-6 pb-4">
        {messages.map((msg) => (
            <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} />
        ))}
        {isAgentTyping && (
            <MessageBubble sender="agent" text="" isLoading={true} />
        )}
      </div>
    </div>
  );
};
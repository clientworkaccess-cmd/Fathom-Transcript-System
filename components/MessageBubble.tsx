import React from 'react';
import { BotIcon } from './icons/BotIcon';

interface MessageBubbleProps {
  sender: 'user' | 'agent';
  text: string;
  isLoading?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text, isLoading }) => {
  const isAgent = sender === 'agent';

  return (
    <div className={`flex gap-4 ${isAgent ? 'justify-start' : 'justify-end group'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      
      {/* Avatar for Agent */}
      {isAgent && (
        <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm mt-1">
            <BotIcon className="h-5 w-5 text-indigo-500" />
        </div>
      )}

      {/* Bubble */}
      <div className={`
        relative max-w-[85%] md:max-w-xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm
        ${isAgent 
            ? 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300' 
            : 'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 shadow-md'
        }
      `}>
        {isLoading ? (
          <div className="flex items-center space-x-1.5 h-5">
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap font-medium tracking-wide">{text}</p>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isSending: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isSending,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isSending && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const isDisabled = isSending || disabled;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="relative rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl ring-1 ring-zinc-900/5">
        
        {/* Input Field */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={disabled ? "Select a meeting above to start chatting..." : "Ask a question about this meeting..."}
            disabled={isDisabled}
            className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-base text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isDisabled || !inputValue.trim()}
            className="h-10 w-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>

      </div>
      
      {/* Footer Helper Text */}
      <div className="text-center mt-3">
        <p className="text-[10px] text-zinc-400 font-medium tracking-tight">
            AI Agent protected by n8n • Fathom Integration Active
        </p>
      </div>
    </div>
  );
};

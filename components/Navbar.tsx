
import React from 'react';
import { BotIcon } from './icons/BotIcon';
import { MeetingSelector } from './MeetingSelector';
import type { MeetingInfo } from '../types';

interface NavbarProps {
  meetings: MeetingInfo[];
  selectedMeetingId: string;
  onMeetingChange: (meetingId: string) => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  meetings, 
  selectedMeetingId, 
  onMeetingChange, 
  isLoading 
}) => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-16 px-4 md:px-8 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-black/20 backdrop-blur-xl z-20">
      
      {/* Left: Logo/Title */}
      <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
        <div className="text-indigo-600 dark:text-indigo-400">
            <BotIcon className="h-5 w-5" />
        </div>
        <h1 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
          Agent <span className="text-zinc-400 dark:text-zinc-600">/</span> Fathom
        </h1>
      </div>

      {/* Right: Meeting Selector */}
      <div className="w-full max-w-[200px] md:max-w-xs">
        <MeetingSelector 
            meetings={meetings}
            selectedMeetingId={selectedMeetingId}
            onMeetingChange={onMeetingChange}
            isLoading={isLoading}
            disabled={false}
        />
      </div>

    </header>
  );
};

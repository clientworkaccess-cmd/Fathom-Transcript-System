
import React from 'react';
import type { MeetingInfo } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface MeetingSelectorProps {
  meetings: MeetingInfo[];
  selectedMeetingId: string;
  onMeetingChange: (meetingId: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const MeetingSelector: React.FC<MeetingSelectorProps> = ({
  meetings,
  selectedMeetingId,
  onMeetingChange,
  isLoading,
  disabled
}) => {
  return (
    <div className="relative group w-full">
      <select
        value={selectedMeetingId}
        onChange={(e) => onMeetingChange(e.target.value)}
        disabled={isLoading || disabled}
        className="appearance-none w-full bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded-lg py-2 pl-3 pr-9 text-xs font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer disabled:cursor-not-allowed truncate border border-zinc-200/80 dark:border-zinc-800 shadow-sm"
      >
        {isLoading ? (
          <option>Syncing meetings...</option>
        ) : meetings.length === 0 ? (
          <option>No meetings found</option>
        ) : (
          meetings.map((meeting) => (
            <option key={meeting.recordingId} value={meeting.recordingId}>
              {meeting.title}
            </option>
          ))
        )}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400">
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </div>
    </div>
  );
};

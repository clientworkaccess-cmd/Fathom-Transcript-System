
import { useState, useEffect, useCallback } from 'react';
import { getProcessedMeetings } from '../services/fathomService';
import type { MeetingInfo } from '../types';

export const useFathomMeetings = () => {
  const [meetings, setMeetings] = useState<MeetingInfo[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const processedMeetings = await getProcessedMeetings();
      // Sort by date descending to show most recent first
      processedMeetings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setMeetings(processedMeetings);
      if (processedMeetings.length > 0) {
        setSelectedMeeting(processedMeetings[0]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { meetings, loading, error, selectedMeeting, setSelectedMeeting };
};

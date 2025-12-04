
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { useFathomMeetings } from './hooks/useFathomMeetings';
import { sendMessageToAgent } from './services/n8nService';
import type { ChatMessage } from './types';

const App: React.FC = () => {
  const { 
    meetings, 
    loading: loadingMeetings, 
    error: meetingsError, 
    selectedMeeting, 
    setSelectedMeeting 
  } = useFathomMeetings();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      sender: 'agent',
      text: "Hello! I'm your n8n workflow agent. Select a Fathom meeting context in the top right and ask me anything.",
    },
  ]);
  const [isAgentTyping, setIsAgentTyping] = useState<boolean>(false);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || !selectedMeeting) {
      if (!selectedMeeting) {
        alert("Please select a meeting context before sending a message.");
      }
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAgentTyping(true);

    try {
      const agentResponseText = await sendMessageToAgent(messageText, selectedMeeting.recordingId);
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: agentResponseText,
      };
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: "Sorry, I couldn't connect to the n8n agent. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAgentTyping(false);
    }
  }, [selectedMeeting]);

  const handleMeetingChange = (meetingId: string) => {
    const meeting = meetings.find(m => m.recordingId === meetingId) || null;
    setSelectedMeeting(meeting);
  };
  
  return (
    <div className="relative flex flex-col h-screen bg-zinc-50 dark:bg-neutral-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
      </div>

      <Header 
        meetings={meetings}
        selectedMeetingId={selectedMeeting?.recordingId || ''}
        onMeetingChange={handleMeetingChange}
        isLoading={loadingMeetings}
      />

      <main className="flex-1 flex flex-col min-h-0 relative max-w-5xl mx-auto w-full">
        {meetingsError && (
           <div className="flex-shrink-0 mx-4 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center backdrop-blur-sm">
              <strong>Connection Error:</strong> {meetingsError}
          </div>
        )}
        
        {/* Chat Container with min-h-0 to allow internal scrolling */}
        <div className="flex-1 flex flex-col min-h-0 relative z-10">
          <ChatWindow messages={messages} isAgentTyping={isAgentTyping} />
          
          <div className="flex-shrink-0 pb-6 px-4 md:px-6">
            <ChatInput
              onSendMessage={handleSendMessage}
              isSending={isAgentTyping}
              disabled={!selectedMeeting}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

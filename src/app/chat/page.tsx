"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setChatSessions, addChatSession } from "@/app/store/slices/chatSessionsSlice";
import { RootState } from "@/app/store";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Captions, ShieldPlus, MessageCircleCode, MessageSquare } from "lucide-react";

interface ChatSession {
  sessionId: string;
  title: string; // Derived from case data
  description: string; // Derived from case data or message count
}

const generateSessionId = () => {
  return `session_${
    Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(4, 7)
  }`;
};
const sessionbID = generateSessionId();

export default function ChatLandingPage() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userId = user?.id;
  const sessions = useSelector(
    (state: RootState) => state.chatSessions.sessions
  ) as ChatSession[] | null;
  const loading = useSelector(
    (state: RootState) => state.chatSessions.loading
  );
  const error = useSelector(
    (state: RootState) => state.chatSessions.error
  );

  // Load sessions on mount: Check localStorage first, then API
  useEffect(() => {
    // Step 1: Try to load from localStorage immediately
    dispatch({ type: 'chatSessions/loadSessionsFromStorage' });
  }, [dispatch]);

  // Step 2: If no sessions in localStorage and user is loaded, fetch from API
  useEffect(() => {
    const fetchSessions = async () => {
      if (!userId || loading) return;
      
      // Only fetch if we haven't loaded sessions yet (sessions is null)
      // If sessions is an empty array, we already fetched and there are no sessions
      if (sessions !== null) return;
      
      dispatch({ type: 'chatSessions/setLoading', payload: true });
      
      try {
        const res = await fetch(`/api/chat/sessions`);
        if (!res.ok) {
          throw new Error("Failed to fetch chat sessions");
        }
        const data = await res.json();
        dispatch(setChatSessions(data));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        dispatch({ type: 'chatSessions/setError', payload: errorMessage });
        console.error("Error fetching chat sessions:", err);
        // Set sessions to empty array to prevent infinite retries
        dispatch(setChatSessions([]));
      }
    };

    fetchSessions();
  }, [userId, loading, dispatch, sessions]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-60 flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-indigo-950 to-black px-4">
      <motion.h1
        className="text-4xl md:text-6xl flex items-center font-extrabold text-white text-center mb-4 drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        NyayVaad
        
         Chat
        <MessageSquare className="mx-4" width={40} height={40} />
      </motion.h1>
      <motion.p
        className="text-lg md:text-lg text-purple-200 text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
        Your AI-powered legal assistant. Start a new conversation or revisit
        your previous cases.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-12"
      >
        <Link href={`/chat/${sessionbID}`}>
          <button
            className="bg-gradient-to-r cursor-pointer  border border-gray-100  from-red-900  to-purple-950 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={loading}
          >
            {loading ? "Starting..." : ` New Conversation`}
          </button>
        </Link>
      </motion.div>
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-gray-300 underline decoration-purple-100 underline-offset-4 decoration-1 mb-8 mt-2 text-center">
          Previous Conversations
        </h2>
        {!sessions || sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center pb-10 bg-gradient-to-r pt-10 from-black via-neutral-900 to-black rounded-xl p-4 mb-10">
            <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="56"
                fill="#2d2d3a"
                stroke="#a78bfa"
                strokeWidth="4"
              />
              <path
                d="M40 70c0-8 8-14 20-14s20 6 20 14"
                stroke="#a78bfa"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="70" cy="48" r="4" fill="#a78bfa" />
              <circle cx="50" cy="48" r="4" fill="#a78bfa" />
            </svg>
            <div className="text-gray-400 text-lg mt-6 mb-2">
              No previous conversations to display
            </div>
            <div className="text-purple-300 text-sm">
              Start a new conversation now!
            </div>
          </div>
        ) : (
          <div className="flex gap-4 justify-center items-center pb-20">
            {sessions.map((conv: ChatSession) => (
              <Link key={conv.sessionId} href={`/chat/${conv.sessionId}`}>
                <div className="bg-gradient-to-r w-80 h-52 from-neutral-800  to-neutral-900 hover:bg-white/20 border border-white/10 rounded-xl pt-8 px-5 cursor-pointer transition-all shadow-md flex flex-col ">
                  <div>
                    <div className="flex  justify-between">
                      <div className="text-xl font-bold text-white mb-3">
                        {conv.title}
                      </div>
                      <Captions className="text-white" />
                    </div>
                    <div className="text-gray-300 text-sm mb-1 ">
                      {conv.description}
                    </div>
                  </div>
                  <div className="absolute bottom-2 flex justify-between items-center">
                    <ShieldPlus className="text-purple-300" />
                    <h3 className="text-xs  items-center text-purple-300 ml-28  ">
                      Session ID: {conv.sessionId}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

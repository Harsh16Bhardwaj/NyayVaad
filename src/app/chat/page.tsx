"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setChatSessions } from "@/app/store/slices/chatSessionsSlice";
import { RootState } from "@/app/store"; // adjust if your store is elsewhere
import { useUser } from "@clerk/nextjs";

// Dummy previous conversations


const generateSessionId = () => {
  return (` session_${Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(4, 7)}`);
};

export default function ChatLandingPage() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userId = user?.id;
  const sessions = useSelector((state: RootState) => state.chatSessions.sessions) as any[] | null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessions && userId) {
      fetch(`/api/chat/sessions?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          dispatch(setChatSessions(data));
        });
    }
  }, [sessions, userId, dispatch]);

  // Render loading/skeleton if sessions is null
  if (!sessions) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* Skeleton or loading spinner here */}
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-60 flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-indigo-950 to-black px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4 drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        NyayVaad Chat
      </motion.h1>
      <motion.p
        className="text-lg md:text-lg text-purple-200 text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
        Your AI-powered legal assistant. Start a new conversation or revisit your previous cases.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-12"
      >
        <Link href={`/chat/${generateSessionId()}`}>
          <button
            className="bg-gradient-to-r cursor-pointer  border border-gray-100  from-red-900  to-purple-950 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={loading}
          >
            {loading ? "Starting..." : "New Conversation"}
          </button>
        </Link>
      </motion.div>
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-gray-300 underline decoration-purple-100 underline-offset-4 decoration-1 mb-8 mt-2 text-center">Previous Conversations</h2>
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center pb-10 bg-gradient-to-r pt-10 from-black via-neutral-900 to-black rounded-xl p-4 mb-10">
            <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="56" fill="#2d2d3a" stroke="#a78bfa" strokeWidth="4" />
              <path d="M40 70c0-8 8-14 20-14s20 6 20 14" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
              <circle cx="70" cy="48" r="4" fill="#a78bfa" />
              <circle cx="50" cy="48" r="4" fill="#a78bfa" />
            </svg>
            <div className="text-gray-400 text-lg mt-6 mb-2">No previous conversations to display</div>
            <div className="text-purple-300 text-sm">Start a new conversation now!</div>
          </div>
        ) : (
          <div className="flex gap-4 justify-center items-center pb-20">
            {sessions.map((conv: any) => (
              <Link key={conv.sessionId} href={`/chat/${conv.sessionId}`}>
                <div className="bg-gradient-to-r w-80 h-52 from-neutral-800  to-neutral-900 hover:bg-white/20 border border-white/10 rounded-xl pt-8 px-5 cursor-pointer transition-all shadow-md flex flex-col ">
                  <div>
                    <div className="text-xl font-bold text-white mb-3">{conv.title}</div>
                    <div className="text-gray-300 text-sm mb-1 ">{conv.description}</div>
                  </div>
                  <div className="text-xs text-purple-300 font-mono bottom-10 absolute mt-2 md:mt-0">Session ID: {conv.sessionId}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

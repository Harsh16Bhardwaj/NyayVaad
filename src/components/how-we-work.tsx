"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Workflow,
  Database,
  MessageSquare,
  Brain,
  Lock,
  Code,
} from "lucide-react";

// Define fadeIn animation
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Workflow points
const howWeWorkPoints = [
  {
    text: "Summarize cases with Langflow API.",
    icon: <Workflow className="w-6 h-6 text-teal-400" />,
  },
  {
    text: "Retrieve precedents from Indian Kanoon.",
    icon: <Database className="w-6 h-6 text-teal-400" />,
  },
  {
    text: "Refined insights with ChatGPT.",
    icon: <MessageSquare className="w-6 h-6 text-teal-400" />,
  },
  {
    text: "Analyze with Gemini's 32k model.",
    icon: <Brain className="w-6 h-6 text-teal-400" />,
  },
  {
    text: "Secure data with Supabase and Clerk.",
    icon: <Lock className="w-6 h-6 text-teal-400" />,
  },
  {
    text: "Deliver outputs via HTML parsing.",
    icon: <Code className="w-6 h-6 text-teal-400" />,
  },
];

interface HowWeWorkSectionProps {
  darkMode: boolean;
}

const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ darkMode }) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  return (
    <section
      className={cn(
        "pt-20 pb-40",
        darkMode ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-white to-gray-100"
      )}
      aria-labelledby="how-we-work-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          id="how-we-work-heading"
          className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          How NyayVaad Works
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howWeWorkPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-6 rounded-lg border bg-gray-800",
                    selectedPoint === index
                      ? "border-teal-400 shadow-teal-500/30"
                      : "border-teal-400/20",
                    darkMode ? "bg-gray-800/80" : "bg-gray-50"
                  )}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.2 },
                    },
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 10px 20px rgba(45, 212, 191, 0.3)",
                    rotateX: 2,
                    rotateY: 2,
                  }}
                  onClick={() => setSelectedPoint(index)}
                  animate={
                    selectedPoint === index
                      ? { scale: 1.01, transition: { duration: 0.3 } }
                      : {}
                  }
                >
                  <div className="flex items-center gap-4">
                    {point.icon}
                    <span
                      className={cn(
                        "text-base",
                        darkMode ? "text-gray-200" : "text-gray-700"
                      )}
                    >
                      {point.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.div
              className="relative   rounded-lg overflow-hidden border border-teal-400/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(45, 212, 191, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-600/10" />
              <img
                src="/flow.jpg"
                alt="NyayVaad workflow diagram"
                className=" w-[50rem] border border-teal-400/80 object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  List,
  FileText,
  Lock,
  MessageSquare,
  LayoutDashboard,
  Code,
  Database,
  Workflow,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI Pipeline",
    desc: "Leverages Gemini's 32k token model to analyze complex legal cases, delivering tailored insights.",
    icon: <Brain className="w-8 h-8 text-teal-400" />,
  },
  {
    title: "Law Lookup",
    desc: "Access real-time global precedents via Indian Kanoon's extensive database.",
    icon: <BookOpen className="w-8 h-8 text-teal-400" />,
  },
  {
    title: "Case Dashboard",
    desc: "Visualize progress, track deadlines, and manage documents in one hub.",
    icon: <LayoutDashboard className="w-8 h-8 text-teal-400" />,
  },
  {
    title: "To-Do Generator",
    desc: "AI-driven task lists customized to your case's unique needs.",
    icon: <List className="w-8 h-8 text-teal-400" />,
  },
  {
    title: "Structured Reports",
    desc: "Download court-ready reports with insights, citations, and summaries.",
    icon: <FileText className="w-8 h-8 text-teal-400" />,
  },
  {
    title: "Secure Auth",
    desc: "Enterprise-grade security with Clerk-backed authentication.",
    icon: <Lock className="w-8 h-8 text-teal-400" />,
  },
];

const offerings = [
  {
    title: "Instant Consultation",
    desc: "Upload or describe your issue for a clear case summary in minutes.",
    icon: <MessageSquare className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Legal Intelligence",
    desc: "Combines AI analysis and verified cases for a comprehensive view.",
    icon: <Brain className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Clear Explanations",
    desc: "Laws and judgments explained in plain English.",
    icon: <BookOpen className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Action Plan",
    desc: "Tailored recommendations and tasks to advance your case.",
    icon: <List className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Confidential",
    desc: "Encrypted analysis with no storage without consent.",
    icon: <Lock className="w-6 h-6 text-teal-400" />,
  },
];

const onboardingSteps = [
  {
    title: "Sign Up",
    desc: "Create an account in under 30 seconds.",
    icon: <Lock className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Explore Tools",
    desc: "Access powerful AI-driven legal tools.",
    icon: <Brain className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Analyze Cases",
    desc: "Dive into relevant precedents instantly.",
    icon: <BookOpen className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Track Progress",
    desc: "Stay organized with real-time updates.",
    icon: <List className="w-6 h-6 text-teal-400" />,
  },
  {
    title: "Download Reports",
    desc: "Generate structured, court-ready reports.",
    icon: <FileText className="w-6 h-6 text-teal-400" />,
  },
];

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

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } font-inter transition-colors duration-300`}
    >
      {/* Fixed Header */}
      
      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-teal-900 to-gray-800 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Navigate Legal Challenges with Ease
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              NyayVaad provides AI-powered legal insights in minutes. No
              appointments, no complexity—just clarity and confidence.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Link href="/dashboard">
                <button
                  className="bg-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-600 transition-all shadow-lg"
                  aria-label="Start your free analysis"
                >
                  Start Free Analysis
                </button>
              </Link>
              <Link href="/pricing">
                <button
                  className="border border-teal-400 text-teal-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-400/10 transition-all"
                  aria-label="See pricing"
                >
                  See Pricing
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section
          className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}
          aria-labelledby="offerings-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              id="offerings-heading"
              className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              What We Offer
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offerings.map((offering, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg border border-teal-400/20 bg-${
                    darkMode ? "gray-700/50" : "gray-50"
                  } text-center`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mb-4">{offering.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {offering.title}
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {offering.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
          aria-labelledby="features-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              id="features-heading"
              className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Why NyayVaad
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg border border-teal-400/20 bg-${
                    darkMode ? "gray-800/50" : "white"
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-gradient-to-r from-teal-900 to-gray-800 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Empowered by Reliability and Creativity
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  logo: "/Gem.png",
                  text: "Powered by Gemini's 32k token model",
                },
                {
                  logo: "/supa.png",
                  text: "Secured with Supabase",
                },
                {
                  logo: "/Kanoon.png",
                  text: "Trusted Indian Kanoon precedents",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                >
                  <img
                    src={item.logo}
                    alt={`${item.text} logo`}
                    className="w-28  mb-4"
                  />
                  <p className="text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding Section */}
        <section
          className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}
          aria-labelledby="onboarding-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              id="onboarding-heading"
              className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Get Started in Minutes
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center p-6 rounded-lg border border-teal-400/20 bg-${
                    darkMode ? "gray-700/50" : "gray-50"
                  } w-full md:w-1/5 text-center`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                >
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Experience NyayVaad
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                className="flex-1 p-6 rounded-lg bg-gray-800/50 border border-teal-400/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="space-y-4">
                  {[
                    { user: "You", text: "Can you analyze this case?" },
                    {
                      user: "NyayVaad",
                      text: "Analyzing... Found 3 relevant precedents.",
                    },
                    { user: "You", text: "Generate a report." },
                  ].map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.user === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          msg.user === "You" ? "bg-teal-600" : "bg-gray-700"
                        } text-white max-w-xs`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="flex-1 p-6 rounded-lg bg-gray-800/50 border border-teal-400/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <img
                  src="/dashboard-preview.png"
                  alt="Dashboard preview"
                  className="w-full rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section
          className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}
          aria-labelledby="how-we-work-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              id="how-we-work-heading"
              className="text-3xl md:text-4xl font-bold text-teal-400 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              How We Work
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                className="flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {howWeWorkPoints.map((point, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border border-teal-400/20 bg-${
                        darkMode ? "gray-700/50" : "gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {point.icon}
                        <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                          {point.text}
                        </span>
                      </div>
                    </div>
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
                <img
                  src="/flowchart.png"
                  alt="NyayVaad workflow diagram"
                  className="w-full rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-teal-900 to-gray-800 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Ready to Transform Your Legal Journey?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Start with no hidden fees and unlock AI-powered legal solutions
              today.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Link href="/dashboard">
                <button
                  className="bg-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-600 transition-all shadow-lg"
                  aria-label="Start your free analysis"
                >
                  Start Free Analysis
                </button>
              </Link>
              <Link href="/pricing">
                <button
                  className="border border-teal-400 text-teal-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-400/10 transition-all"
                  aria-label="See pricing"
                >
                  See Pricing
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
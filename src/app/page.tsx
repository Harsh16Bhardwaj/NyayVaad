'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Brain, BookOpen, Shield, List, FileText, Lock, MessageSquare, LayoutDashboard, Code, Database, Workflow } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { 
    title: 'AI Pipeline', 
    desc: 'Our multi-layered AI pipeline leverages Gemini’s 32k token model to dissect complex legal cases, delivering precise insights tailored to your needs.', 
    icon: <Brain className="w-10 h-10" />, 
    color: 'bg-teal-600/20 border-teal-400/30 text-teal-400' 
  },
  { 
    title: 'Law Lookup', 
    desc: 'Access real-time global precedents through Indian Kanoon’s vast database, ensuring you have the latest legal references at your fingertips.', 
    icon: <BookOpen className="w-10 h-10" />, 
    color: 'bg-amber-600/20 border-amber-400/30 text-amber-400' 
  },
  { 
    title: 'Case Dashboard', 
    desc: 'An interactive hub to visualize case progress, track deadlines, and manage documents—all in one centralized, user-friendly interface.', 
    icon: <LayoutDashboard className="w-10 h-10" />, 
    color: 'bg-purple-600/20 border-purple-400/30 text-purple-400' 
  },
  { 
    title: 'To-Do Generator', 
    desc: 'Get personalized, AI-driven task lists based on your case’s unique requirements, keeping you organized and ahead of the game.', 
    icon: <List className="w-10 h-10" />, 
    color: 'bg-blue-600/20 border-blue-400/30 text-blue-400' 
  },
  { 
    title: 'Structured Reports', 
    desc: 'Generate downloadable, court-ready reports with structured insights, citations, and summaries to strengthen your legal arguments.', 
    icon: <FileText className="w-10 h-10" />, 
    color: 'bg-coral-600/20 border-coral-400/30 text-coral-400' 
  },
  { 
    title: 'Secure Auth', 
    desc: 'Clerk-backed authentication ensures your data is protected with enterprise-grade security, giving you peace of mind.', 
    icon: <Lock className="w-10 h-10" />, 
    color: 'bg-green-600/20 border-green-400/30 text-green-400' 
  },
];

const onboardingSteps = [
  { title: 'Sign Up & Verify', desc: 'In under 30 seconds.', icon: <Lock className="w-8 h-8 text-teal-400" />, img: '/placeholder-step1.png' },
  { title: 'Explore AI Tools', desc: 'Unleash legal superpowers.', icon: <Brain className="w-8 h-8 text-teal-400" />, img: '/placeholder-step2.png' },
  { title: 'Analyze Cases', desc: 'Dive into precedents.', icon: <BookOpen className="w-8 h-8 text-teal-400" />, img: '/placeholder-step3.png' },
  { title: 'Track Progress', desc: 'Stay ahead of the game.', icon: <List className="w-8 h-8 text-teal-400" />, img: '/placeholder-step4.png' },
  { title: 'Download Reports', desc: 'Win with structured insights.', icon: <FileText className="w-8 h-8 text-teal-400" />, img: '/placeholder-step5.png' },
];

const howWeWorkPoints = [
  { text: 'Summarize cases into one-liners with Langflow API.', icon: <Workflow className="w-8 h-8" /> },
  { text: 'Retrieve precedents from Indian Kanoon’s database.', icon: <Database className="w-8 h-8" /> },
  { text: 'Refine data with ChatGPT for deeper insights.', icon: <MessageSquare className="w-8 h-8" /> },
  { text: 'Analyze with Gemini’s 32k token model.', icon: <Brain className="w-8 h-8" /> },
  { text: 'Secure data with Supabase and Clerk auth.', icon: <Lock className="w-8 h-8" /> },
  { text: 'Deliver structured outputs via HTML parsing.', icon: <Code className="w-8 h-8" /> },
];

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#1F1F1F]' : 'bg-[#F8F9FA]'} font-inter transition-colors duration-300 overflow-x-hidden`} style={{ '--gradient-start': '#3B0764', '--gradient-end': '#1CEFFF', '--coral-600': '#FF6B6B', '--coral-400': '#FF8787' } as any}>
      <main>
        {/* Hero Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="min-h-screen flex items-center justify-center relative"
          style={{ background: 'linear-gradient(45deg, var(--gradient-start), var(--gradient-end))', animation: 'gradientShift 10s ease infinite' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="hero-heading"
        >
          <style jsx global>{`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h1
              id="hero-heading"
              className="text-6xl md:text-8xl font-bold text-white font-inter mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.3 }}
            >
              {['Outsmart', 'Your Case', 'Today?'].map((line, index) => (
                <motion.span key={index} className="block" variants={fadeIn}>
                  {line}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto mb-8`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Legal chaos? Crush it with AI-powered insights and real-time law from San Sam Legal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/dashboard">
                <button className="bg-[#FF6B6B] text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#FF8787] transition-all [filter:drop-shadow(0_0_10px_rgba(255,107,107,0.6))]" aria-label="Start your free analysis">
                  Start Free Analysis
                </button>
              </Link>
            </motion.div>
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <button onClick={toggleDarkMode} className="text-[#1CEFFF] hover:text-teal-300 transition-colors" aria-label="Toggle dark mode">
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1F1F1F]' : 'bg-[#F8F9FA]'} py-16 relative`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="features-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              id="features-heading"
              className="text-5xl md:text-6xl font-bold text-[#1CEFFF] font-inter text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Why Choose Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl border ${feature.color}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  role="article"
                  aria-labelledby={`feature-${index}`}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 id={`feature-${index}`} className={`text-xl font-semibold mb-2`}>{feature.title}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trust Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="trust-heading"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              id="trust-heading"
              className="text-5xl md:text-6xl font-bold text-white font-inter mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trusted by the Best
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { logo: '/gemini-logo.png', text: 'Powered by Gemini’s 32k token model.' },
                { logo: '/supabase-logo.png', text: 'Secure data with Supabase.' },
                { logo: '/kanoon-logo.png', text: 'Trusted Indian Kanoon precedents.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={item.logo} alt={`${item.text} logo`} className="w-24 h-24 mb-4" />
                  <p className="text-white font-mono text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Onboarding Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[3] = el)}
          className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1F1F1F]' : 'bg-[#F8F9FA]'} py-16 relative`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="onboarding-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              id="onboarding-heading"
              className="text-5xl md:text-6xl font-bold text-[#1CEFFF] font-inter text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Climb to Victory
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-8 relative">
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center bg-${darkMode ? '[#1a2632]/80' : '[#FFFFFF]'} p-6 rounded-xl border ${darkMode ? 'border-teal-800/30' : 'border-gray-200'} w-full md:w-1/5`}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.4 }}
                  role="tabpanel"
                  aria-labelledby={`step-${index}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {step.icon}
                    <h3 id={`step-${index}`} className={`text-xl font-semibold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>{step.title}</h3>
                  </div>
                  <img src={step.img} alt={step.title} className="w-24 h-24 rounded-lg mb-2" />
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{step.desc}</p>
                  {index < onboardingSteps.length - 1 && (
                    <svg className="hidden md:block absolute top-1/2 -translate-y-1/2" style={{ left: `${20 * (index + 1) - 2}%` }} width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 10H36M36 10L28 2M36 10L28 18" stroke="#1CEFFF" strokeWidth="2" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Live Demo Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="demo-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              id="demo-heading"
              className="text-5xl md:text-6xl font-bold text-white font-inter text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              See the Magic
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                className="flex-1 bg-[#1a2632]/80 p-6 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4">
                  {[
                    { user: 'You', text: 'Can you analyze this case?' },
                    { user: 'San Sam', text: 'Analyzing... Found 3 relevant precedents.' },
                    { user: 'You', text: 'Generate a report.' },
                  ].map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, x: msg.user === 'You' ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.4 }}
                    >
                      <div className={`p-3 rounded-lg ${msg.user === 'You' ? 'bg-teal-600' : 'bg-gray-700'} text-white max-w-xs`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="flex-1 bg-[#1a2632]/80 p-6 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <img src="/dashboard-preview.png" alt="Dashboard preview" className="w-full rounded-lg" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* How We Work Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[5] = el)}
          className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1F1F1F]' : 'bg-[#F8F9FA]'} py-16`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="how-we-work-heading"
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
            <motion.h2
              id="how-we-work-heading"
              className="text-5xl md:text-6xl font-bold text-[#1CEFFF] font-inter mb-8 md:mb-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              What We Do
            </motion.h2>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                {howWeWorkPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className={`bg-${darkMode ? '[#1a2632]/80' : '[#FFFFFF]'} p-4 rounded-xl border ${darkMode ? 'border-teal-800/30' : 'border-gray-200'}`}
                    initial={{ opacity: 0, y: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    role="listitem"
                    aria-label={`Step ${index + 1}: ${point.text}`}
                  >
                    <div className="flex items-center gap-2">
                      {point.icon}
                      <span className={darkMode ? 'text-teal-400' : 'text-teal-600'}>{point.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <img src="/flowchart.png" alt="San Sam Legal workflow diagram showing the process from user inputs to final AI case analysis using Langflow API, Indian Kanoon, ChatGPT, Gemini, and vector databases." className="w-full rounded-lg" />
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          aria-labelledby="cta-heading"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-[var(--gradient-start)]/50 to-[var(--gradient-end)]/50 animate-[wave_15s_ease_infinite]" />
            <style jsx global>{`
              @keyframes wave {
                0% { transform: translateX(0); }
                50% { transform: translateX(-25%); }
                100% { transform: translateX(0); }
              }
            `}</style>
          </div>
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <motion.h2
              id="cta-heading"
              className="text-5xl md:text-7xl font-bold text-white font-inter mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Ready to Win Your Case?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Jump in with no hidden fees—just AI-powered legal brilliance.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/dashboard">
                <button className="bg-[#FF6B6B] text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#FF8787] transition-all [filter:drop-shadow(0_0_10px_rgba(255,107,107,0.6))]" aria-label="Start your free analysis">
                  Start Free Analysis
                </button>
              </Link>
              <Link href="/pricing">
                <button className="border border-[#1CEFFF] text-[#1CEFFF] px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#1CEFFF]/10 transition-all" aria-label="See pricing">
                  See Pricing
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className={`py-8 ${darkMode ? 'bg-[#1F1F1F]' : 'bg-[#F8F9FA]'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <img src="/logo-small.png" alt="San Sam Legal logo" className="w-24 mb-4 md:mb-0" />
          <div className="flex gap-6">
            <Link href="/privacy" className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-[#1CEFFF] transition-colors`} aria-label="Privacy Policy">
              Privacy
            </Link>
            <Link href="/terms" className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-[#1CEFFF] transition-colors`} aria-label="Terms of Service">
              Terms
            </Link>
            <Link href="/contact" className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-[#1CEFFF] transition-colors`} aria-label="Contact Us">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
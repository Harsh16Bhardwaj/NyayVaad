"use client";

import { useState, useEffect } from "react";
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
  Check,
  Plus,
} from "lucide-react";
import Link from "next/link";
import ParallaxFeatures from "@/components/ui/hero-parallax";
import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Pricing from "@/components/pricing";
import HowWeWork from "@/components/how-we-work";
const features = [
  {
    title: "AI Pipeline",
    desc: "Leverages Gemini's 32k token model to analyze complex legal cases, delivering tailored insights.",
    icon: <Brain className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Law Lookup",
    desc: "Access real-time global precedents via Indian Kanoon's extensive database.",
    icon: <BookOpen className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Case Dashboard",
    desc: "Visualize progress, track deadlines, and manage documents in one hub.",
    icon: <LayoutDashboard className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "To-Do Generator",
    desc: "AI-driven task lists customized to your case's unique needs.",
    icon: <List className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Structured Reports",
    desc: "Download court-ready reports with insights, citations, and summaries.",
    icon: <FileText className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Secure Auth",
    desc: "Enterprise-grade security with Clerk-backed authentication.",
    icon: <Lock className="w-10 h-10 text-teal-400" />,
  },
];

const offerings = [
  {
    title: "Instant Consultation",
    desc: "Upload or describe your issue for a clear case summary in minutes.",
    icon: <MessageSquare className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Legal Intelligence",
    desc: "Combines AI analysis and verified cases for a comprehensive view.",
    icon: <Brain className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Clear Explanations",
    desc: "Laws and judgments explained in plain English.",
    icon: <BookOpen className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Action Plan",
    desc: "Tailored recommendations and tasks to advance your case.",
    icon: <List className="w-10 h-10 text-teal-400" />,
  },
  {
    title: "Confidential",
    desc: "Encrypted analysis with no storage without consent.",
    icon: <Lock className="w-10 h-10 text-teal-400" />,
  },
];

const items = [
  {
    title: "Sign Up",
    desc: "Create an account in under 30 seconds.",
    image: "/signup.png",
    className: "absolute top-10 left-[30%] rotate-[-5deg]",
  },
  {
    title: "Fill OnBoarding",
    desc: "Dive into relevant precedents instantly.",
    image: "/onboarding.png",
    className: "absolute top-5 left-[30%] rotate-[-8deg]",
  },
  {
    title: "Analyze Cases",
    desc: "Dive into relevant precedents instantly.",
    image: "/analyze.png",
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
  {
    title: "Explore Tools",
    desc: "Access powerful AI-driven legal tools.",
    image: "/tools.jpg",
    className: "absolute top-32 left-[25%] rotate-[-7deg]",
  },

  {
    title: "Track Progress",
    desc: "Stay organized with real-time updates.",
    image: "/todos.jpg",
    className: "absolute top-32 left-[40%] rotate-[10deg]",
  },
  {
    title: "Download Reports",
    desc: "Generate structured, court-ready reports.",
    image: "/reports.jpg",
    className: "absolute top-20 right-[35%] rotate-[2deg]",
  },
];

const howWeWorkPoints = [
  {
    text: "Summarize cases with Langflow API.",
    icon: <Workflow className="w-10 h-10 text-teal-400" />,
  },
  {
    text: "Retrieve precedents from Indian Kanoon.",
    icon: <Database className="w-10 h-10 text-teal-400" />,
  },
  {
    text: "Refined insights with ChatGPT.",
    icon: <MessageSquare className="w-10 h-10 text-teal-400" />,
  },
  {
    text: "Analyze with Gemini's 32k model.",
    icon: <Brain className="w-10 h-10 text-teal-400" />,
  },
  {
    text: "Secure data with Supabase and Clerk.",
    icon: <Lock className="w-10 h-10 text-teal-400" />,
  },
  {
    text: "Deliver outputs via HTML parsing.",
    icon: <Code className="w-10 h-10 text-teal-400" />,
  },
];

// Simplified animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [cards, setCards] = useState(
    items.map((step, index) => ({
      ...step,
      id: index,
    }))
  );

  // Debug card count
  useEffect(() => {
    console.log("Current cards:", cards);
  }, [cards]);

  const handleDragEnd = (id: number, info: any) => {
    console.log("Drag end for card:", id, "Info:", info);
    if (Math.abs(info.point.x) > 300) {
      setCards((prev) => {
        const newCards = prev.filter((card) => card.id !== id);
        console.log("New cards after removal:", newCards);
        return newCards.length === 0
          ? onboardingSteps.map((step, index) => ({ ...step, id: index }))
          : newCards;
      });
    }
  };
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } font-inter transition-colors duration-300`}
    >
      {/* Fixed Header */}

      {/* Main Content */}
      <main className="pt-8 md:pt-20">
        <ParallaxFeatures features={features} offerings={offerings} />

        {/* Trust Section */}
        <section className="py-12 md:py-40 bg-gradient-to-r from-[#0a0e17] via-[#192c43] to-[#0a1017] text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <motion.h2
              className="text-2xl md:text-5xl underline decoration-white underline-offset-8 decoration-2 font-bold mb-4"
              initial="hidden y-30"
              whileInView="visible y-0"
              viewport={{ once: false, amount: 0.3 }}
              variants={slideUp}
            >
              Empowered by{" "}
              <motion.span
                className="text-red-400 text-4xl md:text-6xl"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              >
                {" "}
                Reliability
              </motion.span>{" "}
              and{" "}
              <motion.span
                className="text-blue-400 text-4xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                variants={fadeIn}
              >
                {" "}
                Creativity
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 md:mb-36"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              We have ensured that the data is secure and the analysis is
              accurate by using the latest Gemini Models. To back the data we
              are not relying on any single but rather 3 different source.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "Flash-2.0 Latest Gemini",
                  href: "https://aistudio.google.com/welcome?utm_source=google&utm_medium=cpc&utm_campaign=FY25-global-DR-gsem-BKWS-1710442&utm_content=text-ad-none-any-DEV_c-CRE_726176536025-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt-Gemini-Gemini%20API-KWID_43700081658540311-kwd-927524447508&utm_term=KW_gemini%20api-ST_gemini%20api&gad_source=1&gbraid=0AAAAACn9t64NMeQYUJJKvFRJNz7gTak2m&gclid=Cj0KCQjw2tHABhCiARIsANZzDWrw3ZV7mW8INh8Mt40Du4DZkZ7tKlD67sASp9TwdL04mf07SDrL2lcaAnJOEALw_wcB&gclsrc=aw.ds",
                  content: (
                    <div className="flex basis-full flex-col p-4 rounded-xl bg-gradient-to-br tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem]">
                      <h3 className="max-w-xs pb-2 !m-0 font-bold flex items-center justify-center gap-x-2 text-base text-slate-100">
                        Powered by{" "}
                        <span className="text-purple-400 text-3xl font-bold">
                          GEMINI
                        </span>
                      </h3>
                      <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-400">
                          Advanced AI for complex legal case analysis and
                          recommendations.{" "}
                        </span>
                      </div>
                      <div className="flex flex-1 w-full rounded-xl mt-8 bg-gradient-to-br h-[90px] from-violet-500 via-purple-500 to-blue-500">
                        <Image
                          alt="gemini"
                          src="/Gem.png"
                          width={100}
                          height={100}
                          className="w-full border border-gray-400 rounded-xl h-full object-cover"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Official Legal Database of India",
                  href: "https://indiankanoon.org/",
                  content: (
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem]">
                      <h3 className="max-w-xs pb-2 !m-0 font-bold flex items-center justify-center gap-x-2 text-base text-slate-100">
                        Reliability of{" "}
                        <span className="text-red-400 text-3xl font-bold">
                          KanoonAPI
                        </span>
                      </h3>
                      <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500">
                          Access India's Legal Database, get relevant cases
                          summaries.{" "}
                        </span>
                      </div>
                      <div className="flex flex-1 w-full mt-8 h-[90px] rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                        <Image
                          alt="kanoon"
                          src="/kanoon.png"
                          width={100}
                          height={80}
                          className="w-full border border-gray-400 rounded-xl object-cover"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Encrypted Data by Supabase",
                  href: "https://supabase.com/",
                  content: (
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem]">
                      <h3 className="max-w-xs pb-2 !m-0 font-bold flex items-center justify-center gap-x-2 text-base text-slate-100">
                        Secured by{" "}
                        <span className="text-teal-400 text-3xl font-bold">
                          Supabase
                        </span>
                      </h3>
                      <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500">
                          Enterprise-grade data security with real-time updates
                          and Scalability.
                        </span>
                      </div>
                      <div className="flex flex-1 w-full h-[90px] rounded-xl mt-8 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                        <Image
                          alt="supabase"
                          src="/Supa.png"
                          width={100}
                          height={100}
                          className="w-full border border-gray-400 rounded-xl h-full object-cover"
                        />
                      </div>
                    </div>
                  ),
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={staggerItem}
                  className="w-full"
                >
                  <PinContainer title={card.title} href={card.href}>
                    {card.content}
                  </PinContainer>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Onboarding Section */}
        <section
          className="pt-16 md:pt-32 bg-gradient-to-r from-black via-gray-800 to-gray-950"
          aria-labelledby="onboarding-heading"
        >
          <div className="max-w-6xl mx-auto px-2 md:px-4">
            <motion.h2
              id="onboarding-heading"
              className="text-2xl md:text-5xl underline decoration-teal-400 underline-offset-8 decoration-1 font-bold text-gray-100 text-center mb-2 md:mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeIn}
            >
              Get Started in Minutes
            </motion.h2>
            <motion.h3
              id="onboarding-heading"
              className="text-base md:text-xl font-bold text-gray-400 animate-bounce text-center mb-6 md:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeIn}
            >
              Drag the cards to see further steps
            </motion.h3>
            <motion.div variants={staggerContainer}>
              <DraggableCardContainer className="relative h-[400px] md:h-[800px] w-full">
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto max-w-xs md:max-w-sm text-center text-lg md:text-2xl font-black text-neutral-400   dark:text-neutral-800">
                  That's it!! You are all set to go.
                </p>
                {items.map((item, index) => (
                  <motion.div key={item.title}>
                    <DraggableCardBody
                      key={item.title}
                      className={`absolute ${item.className} z-${index + 10}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="pointer-events-none relative z-10 w-full max-w-xs md:h-60 md:w-80 object-cover"
                      />
                      <h3 className="mt-4 text-center text-lg md:text-2xl font-bold text-neutral-200 dark:text-neutral-300">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-center text-gray-400 dark:text-gray-400 text-sm md:text-base">
                        {item.desc}
                      </p>
                    </DraggableCardBody>
                  </motion.div>
                ))}
              </DraggableCardContainer>
            </motion.div>
          </div>
        </section>

        {/* How We Work Section */}
        <HowWeWork darkMode={darkMode} />
        {/* Pricing Section */}
        <Pricing />

        {/* Final CTA Section */}
        <section className="relative py-16 md:py-32 bg-gradient-to-br from-violet-900 via-teal-900 to-black overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute -top-16 md:-top-32 -left-16 md:-left-32 w-[15rem] h-[15rem] md:w-[40rem] md:h-[40rem] bg-violet-600/30 rounded-full blur-xl md:blur-3xl animate-pulse" />
          <div className="absolute -bottom-16 md:-bottom-32 right-0 w-[10rem] h-[10rem] md:w-[30rem] md:h-[30rem] bg-teal-400/20 rounded-full blur-md md:blur-2xl animate-pulse" />
          <div className="relative z-10 max-w-md md:max-w-3xl mx-auto text-center px-4">
            <motion.h2
              className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 md:mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Ready to Transform Your Legal Journey?
            </motion.h2>
            <motion.p
              className="text-base md:text-2xl text-gray-200 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Start for free and unlock AI-powered legal solutions today. No
              hidden fees, just clarity and results.
            </motion.p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full">
              {[
                {
                  label: "Start Free Analysis",
                  href: "/dashboard",
                  style:
                    "w-full md:w-auto bg-gradient-to-br from-teal-300 via-neutral-200 to-blue-300 hover:from-teal-100 cursor-pointer hover:via-neutral-100 hover:to-blue-100 px-6 md:px-10 py-4 md:py-5 rounded-xl text-neutral-900 border-2 border-teal-400 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-[-2px]",
                },
                {
                  label: "See Pricing",
                  href: "#pricing",
                  style:
                    "w-full md:w-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 cursor-pointer hover:via-gray-700 hover:to-gray-800 border-2 border-teal-400 text-teal-300 px-6 md:px-10 py-4 md:py-5 rounded-xl text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-[-2px]",
                },
              ].map((btn, i) => (
                <motion.div
                  key={btn.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="w-full md:w-auto"
                >
                  <a href={btn.href}>
                    <button className={btn.style}>{btn.label}</button>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

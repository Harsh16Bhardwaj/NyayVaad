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
    image:
      "/signup.png",
    className: "absolute top-10 left-[30%] rotate-[-5deg]",
  },
  {
    title: "Fill OnBoarding",
    desc: "Dive into relevant precedents instantly.",
    image:
      "/onboarding.png",
    className: "absolute top-5 left-[30%] rotate-[-8deg]",
  },
  {
    title: "Analyze Cases",
    desc: "Dive into relevant precedents instantly.",
    image:
      "/analyze.png",
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
  {
    title: "Explore Tools",
    desc: "Access powerful AI-driven legal tools.",
    image:
      "/tools.jpg",
    className: "absolute top-32 left-[25%] rotate-[-7deg]",
  },

  {
    title: "Track Progress",
    desc: "Stay organized with real-time updates.",
    image:
      "/todos.jpg",
    className: "absolute top-32 left-[40%] rotate-[10deg]",
  },
  {
    title: "Download Reports",
    desc: "Generate structured, court-ready reports.",
    image:
      "/reports.jpg",
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

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
      <main className="pt-20">
        <ParallaxFeatures features={features} offerings={offerings} />

        {/* Trust Section */}
        <section className="py-40 bg-gradient-to-r from-[#0a0e17] via-[#192c43] to-[#0a1017] text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl  md:text-5xl underline decoration-white underline-offset-8 decoration-2 font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Empowered by{" "}
              <span className="text-red-400 text-6xl"> Reliability</span> and{" "}
              <span className="text-blue-400 text-6xl">Creativity</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-36"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              We have ensured that the data is secure and the analysis is
              accurate by using the latest Gemini Models. To back the data we
              are not relying on any single but rather 3 different source.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PinContainer
                title="Flash-2.0 Latest Gemini"
                href="https://aistudio.google.com/welcome?utm_source=google&utm_medium=cpc&utm_campaign=FY25-global-DR-gsem-BKWS-1710442&utm_content=text-ad-none-any-DEV_c-CRE_726176536025-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt-Gemini-Gemini%20API-KWID_43700081658540311-kwd-927524447508&utm_term=KW_gemini%20api-ST_gemini%20api&gad_source=1&gbraid=0AAAAACn9t64NMeQYUJJKvFRJNz7gTak2m&gclid=Cj0KCQjw2tHABhCiARIsANZzDWrw3ZV7mW8INh8Mt40Du4DZkZ7tKlD67sASp9TwdL04mf07SDrL2lcaAnJOEALw_wcB&gclsrc=aw.ds"
              >
                <div className="flex basis-full flex-col p-4 rounded-xl bg-gradient-to-br  tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem] ">
                  <h3 className="max-w-xs pb-2 !m-0 font-bold flex items-center justify-center gap-x-2 text-base text-slate-100">
                    Powered by{" "}
                    <span className="text-purple-400 text-3xl font-bold">
                      GEMINI
                    </span>
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal ">
                    <span className="text-slate-400 ">
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
                    ></Image>
                  </div>
                </div>
              </PinContainer>
              <PinContainer
                title="Official Legal Database of India"
                href="https://indiankanoon.org/"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem] ">
                  <h3 className="max-w-xs pb-2 !m-0 font-bold flex items-center justify-center gap-x-2 text-base text-slate-100">
                    Reliability of{" "}
                    <span className="text-red-400 text-3xl font-bold">
                      KanoonAPI
                    </span>
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal ">
                    <span className="text-slate-500 ">
                      Acess India's Legal Database, get relevant cases
                      summaries.{" "}
                    </span>
                  </div>
                  <div className="flex flex-1 w-full mt-8 h-[90px] rounded-lg  bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                    <Image
                      alt="kanoon"
                      src="/kanoon.png"
                      width={100}
                      height={80}
                      className="w-full border border-gray-400 rounded-xl object-cover"
                    ></Image>
                  </div>
                </div>
              </PinContainer>
              <PinContainer
                title="Encrypted Data by Supabse"
                href="https://supabase.com/"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[24rem] ">
                  <h3 className="max-w-xs pb-2 !m-0 font-bold flex items-center justify-center gap-x-2 text-base text-slate-100">
                    Secured by{" "}
                    <span className="text-teal-400 text-3xl  font-bold">
                      Supabase
                    </span>
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500">
                      Enterprise-grade data security with real-time updates and
                      Scalability.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full h-[90px] rounded-xl mt-8 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                    <Image
                      alt="supabase"
                      src="/Supa.png"
                      width={100}
                      height={100}
                      className="w-full border border-gray-400 rounded-xl h-full object-cover"
                    ></Image>
                  </div>
                </div>
              </PinContainer>
            </div>
          </div>
        </section>

        

        {/* Onboarding Section */}
        <section
          className={` pt-32 bg-gradient-to-r from-black via-gray-800 to-gray-950`}
          aria-labelledby="onboarding-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              id="onboarding-heading"
              className="text-4xl underline decoration-teal-400 underline-offset-8 decoration-1 md:text-5xl font-bold text-gray-100 text-center mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Get Started in Minutes
            </motion.h2>
            <motion.h3
              id="onboarding-heading"
              className="text-xl   font-bold text-gray-400 animate-bounce text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              Drag the cards to see further steps
            </motion.h3>

            <DraggableCardContainer className="relative h-[800px] w-full">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto max-w-sm text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
                That's it!! You are all set to go.
              </p>
              {items.map((item, index) => (
                <DraggableCardBody
                  key={item.title}
                  className={`absolute ${item.className} z-${index + 10}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="pointer-events-none relative z-10 h-60 w-80 object-cover"
                  />
                  <h3 className="mt-4 text-center text-2xl font-bold text-neutral-200 dark:text-neutral-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-center text-gray-400 dark:text-gray-400">
                    {item.desc}
                  </p>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          </div>
        </section>

        {/* How We Work Section */}
        {/* <section
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
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }
                        >
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
                  src="/flow.jpg"
                  alt="NyayVaad workflow diagram"
                  className="h-[20rem] bg-cover object-cover contain-content rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section> */}
  <HowWeWork darkMode={darkMode}></HowWeWork>
        {/* Pricing Section */}
        <Pricing />

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

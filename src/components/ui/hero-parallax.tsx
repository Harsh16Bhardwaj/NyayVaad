"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import {
  Brain,
  BookOpen,
  LayoutDashboard,
  List,
  FileText,
  Lock,
  MessageSquare,
} from "lucide-react";

// Define the item type for features and offerings
interface FeatureItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

// Define props for ParallaxFeatures
interface ParallaxFeaturesProps {
  features: FeatureItem[];
  offerings: FeatureItem[];
}

// Random gradient generator
const getRandomGradient = () => {
  const gradients = [
    "from-teal-900/80  to-gray-900/80",
    "from-purple-900/80 to-teal-900/80",
    "from-gray-900/80 to-purple-900/80",
    "from-teal-800/80 to-purple-800/80",
    "from-blue-900/80 to-teal-900/80",
    "from-teal-900/80 to-blue-900/80",
    "from-blue-900/80 to-purple-900/80",
    "from-purple-900/80 to-blue-900/80",
    "from-blue-800/80 to-purple-800/80",
    "from-purple-800/80 to-blue-800/80",
    
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export const ParallaxFeatures = ({
  features,
  offerings,
}: ParallaxFeaturesProps) => {
  const firstRow = features.slice(0, 5); // 5 cards
  const secondRow = offerings.slice(0, 5); // 5 cards
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 50, mass: 0.8 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 400]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[290vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-gradient-to-b from-gray-900 to-black"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        <h1 className="text-5xl text-center font-bold text-white mb-16 max-w-7xl mx-auto">
          What we offer ?
        </h1>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-16 max-w-7xl mx-auto" style={{ willChange: "transform" }}>
          {firstRow.map((item) => (
            <FeatureCard item={item} translate={translateX} key={item.title} />
          ))}
        </motion.div>
        <h1 className="text-5xl text-center font-bold text-white mb-16 max-w-7xl mx-auto">
          The Features :
        </h1>
        <motion.div className="flex flex-row mb-16 space-x-8 max-w-7xl mx-auto" style={{ willChange: "transform" }}>
          {secondRow.map((item) => (
            <FeatureCard
              item={item}
              translate={translateXReverse}
              key={item.title}
            />
          ))}
        </motion.div>
        {/* <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 max-w-7xl mx-auto">
          {thirdRow.map((item) => (
            <FeatureCard item={item} translate={translateX} key={item.title} />
          ))}
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full">
      <h1 className="text-3xl md:text-7xl font-bold text-white tracking-tight">
        Facing <span className="text-red-500">Legal</span> Trouble,
      </h1>
      <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
        Not sure where to start ?
      </h1>
      <p className="max-w-2xl text-base md:text-lg mt-6 text-gray-300">
        From panic to a plan — in just minutes. We combine AI with real legal
        insight. Understand your case. Know your rights. Take action now.
      </p>
    </div>
  );
};

export const FeatureCard = ({
  item,
  translate,
}: {
  item: FeatureItem;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
        willChange: "transform",
      }}
      whileHover={{
        y: -15,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      key={item.title}
      className="group/feature w-96 h-96 relative shrink-0 rounded-xl overflow-hidden border border-teal-300/20"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient()} opacity-90 group-hover/feature:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 cursor-pointer">
        <div className="mb-4">{item.icon}</div>
        <h2 className="text-xl font-semibold text-white mb-2 text-center">
          {item.title}
        </h2>
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover/feature:opacity-30 bg-teal-400/20 pointer-events-none transition-opacity duration-300" />
      <div className="absolute inset-0 shadow-lg group-hover/feature:shadow-teal-500/30 group-hover/feature:shadow-xl transition-shadow duration-300 rounded-xl" />
    </motion.div>
  );
};

export default ParallaxFeatures;
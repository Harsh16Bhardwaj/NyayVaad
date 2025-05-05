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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
// Define props for ParallaxFeatures
interface ParallaxFeaturesProps {
  features: FeatureItem[];
  offerings: FeatureItem[];
}

// Replace the random gradient generator with a deterministic one
const getGradientForTitle = (title: string) => {
  // Create a hash of the title to get a consistent number
  const hash = title.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the hash to select a gradient
  const gradients = [
    "from-teal-900/80 to-gray-900/80",
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

  return gradients[Math.abs(hash) % gradients.length];
};

export const ParallaxFeatures = ({
  features,
  offerings,
}: ParallaxFeaturesProps) => {
  const firstRow = features.slice(0, 5);
  const secondRow = offerings.slice(0, 5);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Add spring config for smooth motion
  const springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  };

  // Keep original ranges but add spring physics
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
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 variants={fadeIn} initial="hidden" whileInView="visible" transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="text-5xl text-center font-bold text-white mb-16 max-w-7xl mx-auto">
          What we offer ?
        </motion.h1>
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="flex flex-row-reverse space-x-reverse space-x-8 mb-16 max-w-7xl mx-auto">
          {firstRow.map((item) => (
            <FeatureCard item={item} translate={translateX} key={item.title} />
          ))}
        </motion.div>
        <motion.h1 variants={fadeIn} initial="hidden" whileInView="visible" transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-5xl text-center font-bold text-white mb-16 max-w-7xl mx-auto">
          The Features :
        </motion.h1>
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="flex flex-row mb-16 space-x-8 max-w-7xl mx-auto">
          {secondRow.map((item) => (
            <FeatureCard
              item={item}
              translate={translateXReverse}
              key={item.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <motion.div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full">
      <motion.h1
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-7xl font-bold text-white tracking-tight"
      >
        Facing <motion.span variants={fadeIn} initial="hidden" whileInView="visible" transition={{ duration: 0.8, delay: 1, ease: "easeOut" }} className="text-red-500">Legal</motion.span> Trouble,
      </motion.h1>
      <motion.h1
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-bold text-white tracking-tight"
      >
        Not sure where to start ?
      </motion.h1>
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
        className="max-w-2xl text-base md:text-lg mt-6 text-gray-300"
      >
        From panic to a plan — in just minutes. We combine AI with real legal
        insight. Understand your case. Know your rights. Take action now. For
        Initial Legal Consultance.
      </motion.p>
    </motion.div>
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
      }}
      whileHover={{
        y: -15,
        scale: 1.05,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="group/feature w-96 h-96 relative shrink-0 rounded-xl overflow-hidden border border-teal-300/20"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradientForTitle(
          item.title
        )} opacity-90 group-hover/feature:opacity-100 transition-opacity duration-300`}
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

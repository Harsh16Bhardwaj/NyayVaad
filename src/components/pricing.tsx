"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"Free" | "Pro" | "Enterprise" | null>(null);

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for individual lawyers or students exploring legal tech.",
      features: [
        { available: true, text: "Up to 5 case analyses/month" },
        { available: true, text: "Basic report templates" },
        { available: true, text: "Email delivery" },
        { available: false, text: "Custom branding" },
        { available: false, text: "API access" },
      ],
      buttonText: "Get Started",
      buttonStyle: "border border-teal-300 cursor-pointer bg-gradient-to-r from-gray-950 via-gray-700 to-gray-950  font-bold  text-teal-300 hover:bg-teal-600/90 hover:text-white ",
    },
    {
      name: "Pro",
      price: isYearly ? 39 : 49,
      description: "For legal professionals and small firms with regular casework.",
      features: [
        { available: true, text: "Unlimited case analyses" },
        { available: true, text: "All report templates" },
        { available: true, text: "Email & link delivery" },
        { available: true, text: "Custom branding" },
        { available: true, text: "API access" },
      ],
      buttonText: "Get Started",
      buttonStyle:
        "bg-gradient-to-r from-teal-500 font-bold  to-violet-600 hover:from-teal-600 hover:to-violet-700 shadow-lg hover:shadow-teal-500/25",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: isYearly ? 159 : 199,
      description: "For large firms with complex needs and custom requirements.",
      features: [
        { available: true, text: "Everything in Pro" },
        { available: true, text: "White labeling" },
        { available: true, text: "Priority support" },
        { available: true, text: "Custom integrations" },
        { available: true, text: "Full API access" },
      ],
      buttonText: "Contact Sales",
      buttonStyle: "border border-teal-300 font-bold cursor-pointer bg-gradient-to-r from-gray-950 via-gray-700 to-gray-950  text-teal-300 hover:bg-teal-600/90 hover:text-white ",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-16">
          <motion.h2
            id="pricing"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            Choose the plan that empowers your legal journey.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <span className={`${!isYearly ? "text-white" : "text-gray-500"} font-medium`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 rounded-full bg-gradient-to-r from-teal-500 to-violet-600 p-1 transition-all duration-300"
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-white"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </button>
            <span className={`${isYearly ? "text-white" : "text-gray-500"} font-medium`}>
              Yearly <span className="text-teal-400 text-xs">(Save 20%)</span>
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={cn(
                "relative bg-gray-800 rounded-xl border overflow-hidden hover:bg-gradient-to-br hover:from-gray-900 hover:via-gray-700 hover:to-gray-900  ",
                selectedPlan === plan.name ? "border-teal-400 shadow-teal-500/30" : "border-gray-700",
                plan.isPopular && "scale-105 z-10 shadow-lg shadow-teal-500/20"
              )}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: index * 0.2 } },
              }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 10px 20px rgba(45, 212, 191, 0.3)" }}
              onClick={() => setSelectedPlan(plan.name)}
              animate={selectedPlan === plan.name ? { scale: 1.01, transition: { duration: 0.3 } } : {}}
            >
              {plan.isPopular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-violet-600" />
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-violet-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                </>
              )}

              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-white">
                  ${plan.price}
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </div>

              <div className="p-6 space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    {feature.available ? (
                      <Check className="text-teal-400 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Plus className="text-gray-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    )}
                    <span className={feature.available ? "text-gray-300" : "text-gray-500"}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <button
                  className={cn(
                    "w-full py-2 rounded-lg transition-all transform hover:scale-[1.02]",
                    plan.buttonStyle
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
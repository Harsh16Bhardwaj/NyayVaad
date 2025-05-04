"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const quickLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chat", label: "Chat" },
    { href: "/summarize", label: "Summarize" },
    { href: "/hire", label: "Hire" },
    { href: "/contact", label: "Contact" },
    { href: "/fun", label: "Fun" },
  ];

  const socials = [
    {
      icon: <FaTwitter />,
      href: "https://twitter.com/kourtsell",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin />,
      href: "https://linkedin.com/company/kourtsell",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/kourtsell",
      label: "Instagram",
    },
  ];

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 400;

    const particles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.15 - 0.075,
        vy: Math.random() * 0.15 - 0.075,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(214, 188, 250, 0.3)"; // Matching header's lavender color
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      particles.forEach((p) => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          p.vx += dx * 0.004;
          p.vy += dy * 0.004;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="mt-0">
      <div className="w-full h-1 bg-white"></div>
      <motion.footer
        className="bg-[#1b0020] relative py-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full opacity-20"
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Branding */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.2 }}
          >
            <h4 className="text-4xl text-white font-script">
              NyayVaad
            </h4>
            <p className="text-sm text-gray-300 font-sans mt-2">
              Your Legal Sidekick
            </p>
          </motion.div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="glass rounded-full px-4 py-2 bg-[#1b0020]/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01, duration: 0.3 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 8px 25px rgba(214, 188, 250, 0.5)",
                  backgroundColor: "rgba(214, 188, 250, 0.2)",
                }}
              >
                <Link
                  href={link.href}
                  className="text-white hover:text-lavender-haze font-sans transition"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="text-white text-2xl hover:text-lavender-haze"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 8px 25px rgba(214, 188, 250, 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.form
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex gap-2 w-full">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{ 
                    backgroundImage: 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    backgroundPosition: '0 0',
                    cursor: 'text'
                  }}
                  suppressHydrationWarning
                />
              </div>
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Subscribe
              </Button>
            </div>
          </motion.form>

          {/* Copyright */}
          <motion.p
            className="text-sm text-gray-400 font-sans mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            © 2024 NyayVaad. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;

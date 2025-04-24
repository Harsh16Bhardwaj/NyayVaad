"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  
  
  

  const navSignedInLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chat", label: "Chat" },
    { href: "/summarize", label: "Summarize" },
    { href: "/contact", label: "Contact" },
    { href: "/fun", label: "Fun" },
  ];
  const navSignedOutLinks = [
    { href: "/chat", label: "Chat" },
    { href: "/summarize", label: "Summarize" },
    { href: "/contact", label: "Contact" },
    { href: "/fun", label: "Fun" },
  ];

  // Particle animation with window resize support
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
    };

    const particles = [];
    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: Math.random() * 0.3 - 0.15,
          vy: Math.random() * 0.3 - 0.15,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleMouseMove = (e) => {
      particles.forEach((p) => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.vx += dx * 0.01;
          p.vy += dy * 0.01;
        }
      });
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.nav
      className="bg-[#1b0020] fixed top-0 left-0 right-0 z-50 py-4 rounded-b-2xl px-6 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20" />
      <div className="mx-auto flex justify-between items-center relative max-w-7xl">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-start"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="text-4xl text-white font-semibold font-stylescript drop-shadow-md"
          >
            NyayVaad
          </Link>
          <motion.span
            className="text-xs ml-6 text-gray-300 font-medium font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Your Legal Sidekick
          </motion.span>
        </motion.div>

        {/* Centered Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-4">
          <SignedIn>
            {navSignedInLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="glass rounded-full px-5 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.5 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 8px 25px rgba(214, 188, 250, 0.5)",
                  backgroundColor: "rgba(214, 188, 250, 0.2)",
                }}
              >
                <Link
                  href={link.href}
                  className="text-white hover:text-lavender-haze font-inter transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </SignedIn>
          <SignedOut>
            {navSignedOutLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="glass rounded-full px-5 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.5 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 8px 25px rgba(214, 188, 250, 0.5)",
                  backgroundColor: "rgba(214, 188, 250, 0.2)",
                }}
              >
                <Link
                  href={link.href}
                  className="text-white hover:text-lavender-haze font-inter transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </SignedOut>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="scale-130"
            >
              <UserButton afterSignOutUrl="/" />
            </motion.div>
          </SignedIn>
          <SignedOut>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SignInButton mode="modal" afterSignInUrl="/dashboard">
                <button className=" cursor-pointer from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold">
                  Sign In
                </button>
              </SignInButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                <button className="bg-gradient-to-r curosr-pointer from-pink-600 to-red-500 text-white px-6 py-2 rounded-full font-semibold">
                  Sign Up
                </button>
              </SignUpButton>
            </motion.div>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-full bg-gray-800/50 hover:bg-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden glass mt-4 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SignedIn>
            {navSignedInLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className="mb-2"
              >
                <Link
                  href={link.href}
                  className="block py-3 px-4 text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </SignedIn>
          <SignedOut>
            {navSignedOutLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="mb-2"
              >
                <Link
                  href={link.href}
                  className="block py-3 px-4 text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </SignedOut>
          <SignedOut>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SignInButton mode="modal" afterSignInUrl="/dashboard">
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold mt-4">
                  Sign In
                </button>
              </SignInButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                <button className="w-full bg-gradient-to-r from-pink-600 to-red-500 text-white px-6 py-3 rounded-full font-semibold mt-2">
                  Sign Up
                </button>
              </SignUpButton>
            </motion.div>
          </SignedOut>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
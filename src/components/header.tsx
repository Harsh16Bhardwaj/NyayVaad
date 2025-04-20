"use client"

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/chat', label: 'Chat' },
    { href: '/summarize', label: 'Summarize' },
    { href: '/contact', label: 'Contact' },
    { href: '/fun', label: 'Fun' },
  ];

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 80;

    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      particles.forEach((p) => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          p.vx += dx * 0.005;
          p.vy += dy * 0.005;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.nav
      className="glass fixed top-0 left-0 right-0 z-50 py-2 rounded-b-4xl px-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ boxShadow: '0 6px 30px rgba(0, 0, 0, 0.1)' }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20" />
      <div className=" mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-start"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-4xl text-ocean-blue font-stylescript drop-shadow-sm">
            KourtSell
          </Link>
          <motion.span
            className="text-xs text-slate-gray font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your Legal Sidekick
          </motion.span>
        </motion.div>

        {/* Centered Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-3">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              className="glass rounded-full px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: '0 4px 15px rgba(214, 188, 250, 0.3)' }}
            >
              <Link href={link.href} className="text-slate-gray hover:text-lavender-haze font-inter transition">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sign Up Button */}
        <motion.button
          className="hidden md:block bg-gradient-to-r from-ocean-blue to-mint-green text-soft-ivory px-6 py-2 rounded-full font-inter"
          whileHover={{ opacity: 0.8, boxShadow: '0 6px 20px rgba(43, 108, 176, 0.4)' }}
          whileTap={{ scale: 0.97 }}
          animate={{ opacity: [1, 0.8, 1], transition: { repeat: Infinity, duration: 2 } }}
        >
          Sign Up
        </motion.button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ocean-blue text-2xl drop-shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden glass mt-4 p-6 rounded-xl"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="block py-3 text-slate-gray hover:text-lavender-haze font-inter transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.button
            className="bg-gradient-to-r from-ocean-blue to-mint-green text-soft-ivory px-6 py-3 rounded-full w-full mt-4 font-inter"
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.97 }}
          >
            Sign Up
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
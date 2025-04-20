"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const canvasRef = useRef(null);

  const quickLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/chat', label: 'Chat' },
    { href: '/summarize', label: 'Summarize' },
    { href: '/hire', label: 'Hire' },
    { href: '/contact', label: 'Contact' },
    { href: '/fun', label: 'Fun' },
  ];

  const socials = [
    { icon: <FaTwitter />, href: 'https://twitter.com/kourtsell', label: 'Twitter' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/company/kourtsell', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: 'https://instagram.com/kourtsell', label: 'Instagram' },
  ];

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 400;

    const particles = [];
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
          p.vx += dx * 0.004;
          p.vy += dy * 0.004;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.footer
      className="glass relative py-12 px-6 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ boxShadow: '0 6px 30px rgba(0, 0, 0, 0.1)' }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20" />
      <div className="max-w-7xl mx-auto text-center">
        {/* Branding */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h4 className="text-4xl text-deep-teal font-stylescript drop-shadow-sm">KourtSell</h4>
          <p className="text-sm text-charcoal-gray font-inter mt-2">Your Legal Sidekick</p>
        </motion.div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.href}
              className="glass rounded-full px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(255, 111, 97, 0.4)' }}
            >
              <Link
                href={link.href}
                className="text-charcoal-gray hover:text-lime-spark font-inter transition"
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
              className="text-deep-teal text-2xl"
              whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(255, 111, 97, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              animate={{ opacity: [1, 0.85, 1], transition: { repeat: Infinity, duration: 2 } }}
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
          <input
            type="email"
            placeholder="Enter your email"
            className="glass p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-coral-glow font-inter"
          />
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-deep-teal to-coral-glow text-soft-cream px-6 py-3 rounded-lg font-inter"
            whileHover={{ opacity: 0.85, boxShadow: '0 6px 20px rgba(160, 231, 229, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            animate={{ opacity: [1, 0.85, 1], transition: { repeat: Infinity, duration: 2 } }}
          >
            Subscribe
          </motion.button>
        </motion.form>

        {/* Copyright */}
        <motion.p
          className="text-sm text-charcoal-gray font-inter mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          © 2025 KourtSell. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
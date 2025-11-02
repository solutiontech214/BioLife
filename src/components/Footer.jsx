import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show the "Go to Top" button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIcons = [
    { icon: <Facebook className="w-5 h-5" />, link: "#" },
    { icon: <Twitter className="w-5 h-5" />, link: "#" },
    { icon: <Linkedin className="w-5 h-5" />, link: "#" },
    { icon: <Instagram className="w-5 h-5" />, link: "#" },
    { icon: <Mail className="w-5 h-5" />, link: "mailto:info@biolife.com" },
  ];

  return (
    <footer className="relative w-full mt-20 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#101010] text-gray-300 py-12 px-8 overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.1),transparent_70%)] blur-2xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
        {/* Logo & tagline */}
        <div className="space-y-3">
          <motion.h1
            whileHover={{
              textShadow: "0px 0px 10px #34d399, 0px 0px 20px #10b981",
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-3xl font-bold text-green-400 tracking-wide"
          >
            BioLife
          </motion.h1>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Empowering lives through <span className="text-green-400 font-semibold">neuro-robotic innovation</span>.  
            We redefine motion, mobility, and independence.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col md:flex-row gap-8">
          <ul className="space-y-3 md:space-y-0 md:flex md:space-x-8 text-gray-400 font-medium">
            {["Home", "About", "Status", "Book", "Contact"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{
                  color: "#34d399",
                  textShadow: "0px 0px 6px #34d399",
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social icons */}
        <div className="flex space-x-5">
          {socialIcons.map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.2,
                color: "#34d399",
                textShadow: "0px 0px 8px #10b981",
              }}
              className="text-gray-400 hover:text-green-400 transition-all"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent my-8"></div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-green-400 font-semibold">BioLife Technologies</span>.  
        All rights reserved.
      </div>

      {/* 🌿 Go To Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            key="gototop"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 md:p-4 rounded-full backdrop-blur-xl bg-white/10 border border-green-400/30 shadow-[0_0_20px_rgba(0,255,128,0.25)] text-green-400 hover:bg-green-500/20 hover:shadow-[0_0_30px_rgba(0,255,128,0.4)] transition-all duration-300 z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

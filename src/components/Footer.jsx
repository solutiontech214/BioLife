import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <footer className="relative w-full mt-20 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7ff] text-[#374151] py-12 px-8 overflow-hidden">
      {/* Soft blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_70%)] blur-2xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
        {/* Logo & tagline */}
        <div className="space-y-3">
          <motion.h1
            whileHover={{
              textShadow: "0px 0px 10px #38bdf8, 0px 0px 20px #0ea5e9",
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-3xl font-bold text-sky-500 tracking-wide"
          >
            BioLife
          </motion.h1>
          <p className="text-slate-600 max-w-sm leading-relaxed">
            Empowering lives through{" "}
            <span className="text-sky-600 font-semibold">
              neuro-robotic innovation
            </span>.  
            We redefine motion, mobility, and independence.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-8">
          <ul className="space-y-3 md:space-y-0 md:flex md:space-x-8 text-slate-600 font-medium">
            {["Home", "About", "Status", "Book", "Contact"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{
                  color: "#0ea5e9",
                  textShadow: "0px 0px 6px #38bdf8",
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
                color: "#0ea5e9",
                textShadow: "0px 0px 8px #38bdf8",
              }}
              className="text-slate-500 hover:text-sky-500 transition-all"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent my-8"></div>

      {/* Bottom line */}
      <div className="text-center text-sm text-slate-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-sky-600 font-semibold">
          BioLife Technologies
        </span>. All rights reserved.
      </div>

      {/* Go To Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            key="gototop"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 md:p-4 rounded-full backdrop-blur-xl bg-white/80 border border-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.25)] text-sky-500 hover:bg-sky-100 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all duration-300 z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

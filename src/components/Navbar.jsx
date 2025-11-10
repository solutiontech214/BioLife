import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = ({ onHomeClick, onAboutClick, onStatusClick, onBookClick, onTeamClick, onJourneyClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const glowVariants = {
    rest: {
      scale: 1,
      color: "#0369a1",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
    },
    hover: {
      scale: 1.05,
      color: "#0284c7",
      textShadow: "0px 0px 6px rgba(56,189,248,0.8)",
      transition: { type: "spring", stiffness: 180, damping: 12 },
    },
  };

  const navItems = [
    { name: "Home", onClick: onHomeClick },
    { name: "About Disease", onClick: onAboutClick },
    { name: "Status", onClick: onStatusClick },
    { name: "Book", onClick: onBookClick },
    { name: "Team", onClick: onTeamClick },
    { name: "Journey", onClick: onJourneyClick },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 mx-4 mt-3 px-6 py-3
                 flex justify-between items-center rounded-2xl shadow-lg
                 bg-white/70 backdrop-blur-xl border border-sky-200"
    >
      {/* 🧬 Brand Name */}
      <motion.div
        whileHover={{
          scale: 1.05,
          textShadow: "0px 0px 8px #38bdf8, 0px 0px 15px #0ea5e9",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="text-3xl font-bold text-sky-600 tracking-wide cursor-pointer"
        onClick={onHomeClick}
      >
        BioLife
      </motion.div>

      {/* 🧭 Desktop Menu */}
      <ul className="hidden md:flex space-x-8 font-semibold text-slate-700 text-lg">
        {navItems.map((item, i) => (
          <motion.li
            key={i}
            variants={glowVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            onClick={item.onClick}
            className="relative cursor-pointer transition-all duration-200"
          >
            {item.name}
            <motion.div
              className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-sky-400/70 rounded-full"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.li>
        ))}
      </ul>

      {/* 📱 Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-sky-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📲 Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[70px] left-0 w-full rounded-2xl bg-white/90 
                       backdrop-blur-xl border-t border-sky-300 py-6 md:hidden shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <ul className="flex flex-col items-center space-y-5 text-lg font-semibold text-slate-700">
              {navItems.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, color: "#0ea5e9" }}
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick();
                  }}
                  className="cursor-pointer transition-all"
                >
                  {item.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

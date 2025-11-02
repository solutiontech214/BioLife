import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = ({ onHomeClick, onAboutClick, onStatusClick, onBookClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const glowVariants = {
    rest: {
      scale: 1,
      color: "#d1fae5",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
    },
    hover: {
      scale: 1.05,
      color: "#ffffff",
      textShadow: "0px 0px 4px #6ee7b7, 0px 0px 8px #34d399",
      transition: { type: "spring", stiffness: 180, damping: 12 },
    },
  };

  const navItems = [
    { name: "Home", onClick: onHomeClick },
    { name: "About Disease", onClick: onAboutClick },
    { name: "Status", onClick: onStatusClick },
    { name: "Book", onClick: onBookClick },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 mx-4 mt-3 px-6 py-3 
                 flex justify-between items-center rounded-2xl shadow-lg
                 bg-gray-800/60 backdrop-blur-xl border border-white/20"
    >
      {/* 🌱 Brand Name */}
      <motion.div
        whileHover={{
          scale: 1.05,
          textShadow: "0px 0px 6px #6ee7b7, 0px 0px 10px #34d399",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="text-3xl font-bold text-green-400 tracking-wide cursor-pointer"
        onClick={onHomeClick}
      >
        BioLife
      </motion.div>

      {/* 🧭 Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-white font-semibold text-lg">
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
              className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-green-400/70 rounded-full"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.li>
        ))}
      </ul>

      {/* 🍔 Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[70px] left-0 w-full rounded-2xl bg-gray-900/90 
                       backdrop-blur-xl border-t border-green-400/20 py-6 md:hidden shadow-[0_0_20px_rgba(0,255,128,0.15)]"
          >
            <ul className="flex flex-col items-center space-y-5 text-lg font-semibold text-gray-200">
              {navItems.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, color: "#6ee7b7" }}
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

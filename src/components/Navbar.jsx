import React from "react";
import { motion } from "framer-motion";

const Navbar = ({ onHomeClick, onAboutClick, onStatusClick, onBookClick }) => {
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
    { name: "About Disease ", onClick: onAboutClick },
    { name: "Status", onClick: onStatusClick },
    { name: "Book", onClick: onBookClick },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-5 mt-3 px-6 py-3 flex justify-between items-center rounded-2xl shadow-lg 
                 bg-gray-700/60 backdrop-blur-lg border border-white/20 fixed top-0 left-0 right-0 z-50"
    >
      {/* Brand Name */}
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

      {/* Navigation Menu */}
      <motion.ul className="flex space-x-8 text-white font-semibold text-lg">
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
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;

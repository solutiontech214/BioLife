import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// 🧠 Team Data (with LinkedIn URLs)
const teamMembers = [
  {
    name: "Dr. Shrinivas Metan",
    role: "Mentor",
    image: "../Images/metansir.jpg",
    linkedin:
      "https://www.linkedin.com/in/dr-shriniwas-metan-a1791124?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Dr. Viteshkumar Gaikwad",
    role: "Guide",
    image: "../Images/gaikwadsir.jpg",
    linkedin: "https://www.linkedin.com/in/dr-viteshkumar-gaikwad",
  },
  {
    name: "Ritesh Kulkarni",
    role: "Circuit Designer, Ideation",
    image: "../Images/ritesh.jpg",
    linkedin:
      "https://www.linkedin.com/in/ritesh-kulkarni-56b346311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Sidramappa Potdar",
    role: "Programmer, Marketing",
    image: "../Images/sid.jpg",
    linkedin:
      "https://www.linkedin.com/in/sidramappa-potdar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Aditya Gambhire",
    role: "Designer, Ideation",
    image: "../Images/aditya.jpg",
    linkedin: "https://www.linkedin.com/in/aditya-gambhire-ba1294315",
  },
  {
    name: "Trisha Adki",
    role: "Designer, Researcher",
    image: "../Images/trisha.jpg",
    linkedin:
      "https://www.linkedin.com/in/trisha-adki-a959bb350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

const TeamShowcase = () => {
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 🌊 Smooth & Faster continuous scrolling
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        ease: "linear", // keep it linear for constant speed
        duration: 18, // ⚡ Faster scroll (was 30)
      },
    });
  }, [controls]);

  const handleMouseEnter = (i) => {
    setHoveredIndex(i);
    controls.stop(); // pause scroll
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 18,
      },
    });
  };

  const handleCardClick = (link) => window.open(link, "_blank");

  return (
    <section className="relative w-full py-44 px-10 bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#101010] overflow-hidden min-h-[140vh]">
      {/* Subtle glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] blur-3xl"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 mb-20"
      >
        Meet Our Innovators
      </motion.h2>

      {/* Scroll Container */}
      <div className="relative overflow-hidden h-[650px]">
        <motion.div className="flex gap-16 mt-30" animate={controls}>
          {[...teamMembers, ...teamMembers].map((member, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(member.linkedin)}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              animate={{
                scale: hoveredIndex === i ? 1.18 : 1,
                y: hoveredIndex === i ? -20 : [0, -5, 0],
                zIndex: hoveredIndex === i ? 50 : 1,
              }}
              className="relative min-w-[320px] h-[420px] rounded-3xl overflow-hidden cursor-pointer backdrop-blur-2xl bg-white/5 border border-green-500/20 shadow-[0_0_40px_rgba(0,255,128,0.08)] hover:shadow-[0_0_80px_rgba(0,255,128,0.3)] transition-all duration-500"
            >
              {/* Glow behind card */}
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                  hoveredIndex === i
                    ? "bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.3),transparent_70%)]"
                    : ""
                }`}
              ></div>

              {/* Profile Image */}
              <motion.img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                animate={{
                  scale: hoveredIndex === i ? 1.25 : 1,
                  filter:
                    hoveredIndex === i
                      ? "brightness(1.2) contrast(1.1)"
                      : "brightness(0.85)",
                }}
              />

              {/* Overlay Text */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: hoveredIndex === i ? 1 : 0.85,
                  y: hoveredIndex === i ? 0 : 20,
                }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 w-full text-center bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6"
              >
                <h3 className="text-xl font-bold text-green-400">
                  {member.name}
                </h3>
                <p className="text-gray-300 text-sm mt-1">{member.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fade for depth */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#030303] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-[#030303] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default TeamShowcase;

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// 🧠 Team Data
const teamMembers = [
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
    linkedin: "https://www.linkedin.com/in/trisha-adki-a959bb350",
  },
  {
    name: "Sidramappa Potdar",
    role: "Programmer, Marketing",
    image: "../Images/sid.jpg",
    linkedin: "https://www.linkedin.com/in/sidramappa-potdar",
  },
  {
    name: "Ritesh Kulkarni",
    role: "Circuit Designer, Ideation",
    image: "../Images/sanju.jpg",
    linkedin: "https://www.linkedin.com/in/ritesh-kulkarni-56b346311",
  },
  {
    name: "Dr. Shrinivas Metan",
    role: "Mentor",
    image: "../Images/metansir.jpg",
    linkedin: "https://www.linkedin.com/in/dr-shriniwas-metan-a1791124",
  },
  {
    name: "Dr. Viteshkumar Gaikwad",
    role: "Guide",
    image: "../Images/gaikwadsir.jpg",
    linkedin: "https://www.linkedin.com/in/dr-viteshkumar-gaikwad",
  },
];

const TeamShowcase = () => {
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 10,
      },
    });
  }, [controls]);

  const handleMouseEnter = (i) => {
    setHoveredIndex(i);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 10,
      },
    });
  };

  const handleCardClick = (link) => window.open(link, "_blank");

  return (
    <section className="relative w-full py-44 px-10 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7ff] overflow-hidden min-h-[140vh] text-[#1e3a8a]">
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_70%)] blur-3xl"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 mb-20 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]"
      >
        Meet Our Innovators
      </motion.h2>

      {/* Scroll Container */}
      <div className="relative overflow-hidden h-[650px]">
        <motion.div className="flex gap-16" animate={controls}>
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
              className="relative min-w-[320px] h-[420px] rounded-3xl overflow-hidden cursor-pointer backdrop-blur-2xl bg-white/70 border border-sky-300 shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:shadow-[0_0_80px_rgba(56,189,248,0.3)] transition-all duration-500"
            >
              {/* Glow behind card */}
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                  hoveredIndex === i
                    ? "bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)]"
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
                      ? "brightness(1.1) contrast(1.05)"
                      : "brightness(0.9)",
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
                className="absolute bottom-0 w-full text-center bg-gradient-to-t from-white/90 via-white/60 to-transparent p-6"
              >
                <h3 className="text-xl font-bold text-sky-600">
                  {member.name}
                </h3>
                <p className="text-slate-700 text-sm mt-1">{member.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fade */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#f0f9ff] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-[#f0f9ff] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default TeamShowcase;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const JourneyTimeline = () => {
  const [selected, setSelected] = useState(null);

  const steps = [
    {
      title: "Problem Identified",
      desc: "Observed challenges faced by Muscular Dystrophy patients, forming the foundation of BioLife’s mission.",
      image: "/Images/problem.jpg",
      details:
        "Through research and patient interviews we recognized the lack of affordable assistive mobility technology.",
    },
    {
      title: "Research",
      desc: "Explored neuroscience, AI, and robotics to develop a brain-controlled exoskeleton.",
      image: "/Images/research.jpg",
      details:
        "Studied EEG patterns and actuator control systems to map neural activity to motion.",
    },
    {
      title: "Concept Design",
      desc: "Created early blueprints focusing on comfort, flexibility, and precision.",
      image: "/Images/concept.jpg",
      details:
        "Used CAD and human-factor design to ensure realistic limb motion and ergonomics.",
    },
    {
      title: "Material Selection",
      desc: "Used lightweight yet strong materials for durability and comfort.",
      image: "/Images/material.jpg",
      details:
        "Selected aluminum alloy and carbon-fiber composites for optimum weight and strength.",
    },
    {
      title: "Detailed Design",
      desc: "Full-scale 3D modeling, actuator layout, and simulation in CAD tools.",
      image: "/Images/detailed.jpg",
      details:
        "Performed motion and load analysis before final prototype development.",
    },
    {
      title: "Prototype & Testing",
      desc: "Integrated sensors, control units, and neural mapping for live testing.",
      image: "/Images/prototype.jpg",
      details:
        "Built a working model that successfully translated EEG signals into limb motion.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative w-full py-36 px-10 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#101010] text-gray-200 overflow-hidden">
      {/* soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] blur-3xl"></div>

      {/* heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-center mb-28 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
      >
        Our Journey
      </motion.h2>

      {/* timeline wrapper */}
      <div className="relative flex justify-between items-center max-w-6xl mx-auto">
        {/* central glowing line */}
        <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-green-500/70 to-transparent shadow-[0_0_25px_rgba(34,197,94,0.6)]"></div>

        {/* steps */}
        {steps.map((step, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onClick={() => setSelected(step)}
            className="relative flex flex-col items-center cursor-pointer w-[16%] min-w-[160px] z-10"
          >
            <div
              className={`w-48 backdrop-blur-xl bg-white/5 border border-green-500/20 rounded-3xl p-5 text-center shadow-[0_0_20px_rgba(0,255,128,0.08)] hover:shadow-[0_0_35px_rgba(0,255,128,0.25)] transition-all duration-500 ${
                i % 2 === 0 ? "mb-56 -translate-y-10" : "mt-56 translate-y-10"
              }`}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-24 object-cover rounded-2xl mb-3"
              />
              <h3 className="text-green-400 font-bold text-base mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* pop-up */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex justify-center items-center z-50 p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-br from-[#0a0a0a]/90 to-[#0f2315]/80 border border-green-400/30 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,255,128,0.25)]"
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-48 object-cover rounded-2xl mb-6"
              />
              <h3 className="text-3xl font-bold text-green-400 mb-3 text-center">
                {selected.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-center">
                {selected.details}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-6 text-gray-400 hover:text-green-400 text-3xl font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default JourneyTimeline;

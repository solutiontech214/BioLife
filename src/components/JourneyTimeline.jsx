import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    title: "Problem Identification",
    desc: "Recognized mobility challenges faced by muscular dystrophy patients.",
    details:
      "Our journey began by identifying the lack of affordable assistive technology for muscular dystrophy patients. This sparked the vision behind BioLife.",
    image: "/Images/problem.jpeg",
  },
  {
    title: "Team Formation",
    desc: "Built a multidisciplinary team of engineers.",
    details:
      "Formed a cross-functional team to bridge robotics, neuroscience, and rehabilitation for creating an intelligent assistive exoskeleton.",
    image: "/Images/team2.jpg",
  },
  {
    title: "Brainstorming",
    desc: "Explored AI, neuroscience, and robotics possibilities.",
    details:
      "We conducted multiple brainstorming sessions focusing on signal processing and control system design for neural input interpretation.",
    image: "/Images/brainstorm.jpg",
  },
  {
    title: "Final Conclusion",
    desc: "Defined the exact solution roadmap for BioLife.",
    details:
      "After several design reviews, we concluded the best approach was a wearable brain-controlled exoskeleton integrating EEG-driven motion.",
    image: "/Images/conclusion.jpg",
  },
  {
    title: "Survey & Case Studies",
    desc: "Collected real patient feedback for design improvements.",
    details:
      "Surveyed patients, therapists, and medical professionals to ensure ergonomic fit, comfort, and movement adaptability in the design.",
    image: "/Images/survey.jpg",
  },
  {
    title: "Rough Design",
    desc: "Early sketches and structure layouts for the exoskeleton.",
    details:
      "Our first designs visualized actuator placement and frame geometry using CAD mockups and ergonomic studies.",
    image: "/Images/sketch.jpg",
  },
  {
    title: "Modifications",
    desc: "Enhanced design precision and load distribution.",
    details:
      "We refined joint design, weight balance, and the mechanical structure to ensure maximum comfort and efficiency.",
    image: "/Images/modify.jpg",
  },
  {
    title: "Detailed Design",
    desc: "Created 3D CAD models and actuator layouts.",
    details:
      "Engineered every joint and actuator connection precisely with material stress analysis and CAD integration.",
    image: "/Images/detailed.jpg",
  },
  {
    title: "Rendering",
    desc: "High-quality 3D visuals of the final exoskeleton.",
    details:
      "Rendered photorealistic models to visualize the final product aesthetics and mechanical detailing.",
    image: "/Images/f2.jpg",
  },
  {
    title: "Analysis",
    desc: "Simulated mechanical and neural load performance.",
    details:
      "Used stress, thermal, and load simulations to verify reliability and comfort during real-world usage.",
    image: "/Images/analysis.jpg",
  },
  {
    title: "Simulation",
    desc: "Testing neural control and motion synchronization.",
    details:
      "Virtual tests verified signal mapping accuracy and actuator synchronization with brainwave inputs.",
    image: "/Images/simulation.jpg",
  },
  {
    title: "Prototype & Testing",
    desc: "Built and tested the functional brain-controlled prototype.",
    details:
      "Developed a working prototype that successfully translated EEG signals into physical movement, marking a major BioLife milestone.",
    image: "/Images/prototype.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.7, ease: "easeOut" },
  }),
};

const JourneyVertical = () => {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 10%", "end 90%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative w-full py-32 px-8 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#101010] text-gray-200 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08),transparent_70%)] blur-3xl"></div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-center mb-28 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
      >
        Our Journey
      </motion.h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Static faint line */}
        <div className="absolute left-1/2 top-0 w-[4px] h-full bg-green-900/30 rounded-full"></div>

        {/* Scroll-progress line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-[4px] bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.9)] rounded-full origin-top z-10"
        ></motion.div>

        {/* Neural pulse animation */}
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-0 w-[10px] h-[20px] bg-green-400/90 rounded-full shadow-[0_0_40px_rgba(34,197,94,1)] z-20"
        ></motion.div>

        {/* Timeline items */}
        <div className="space-y-40 relative z-30">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onClick={() => setSelected(step)}
              className={`flex items-center ${
                i % 2 !== 0 ? "flex-row" : "flex-row-reverse"
              } justify-between cursor-pointer`}
            >
              {/* Connector dot */}
              <div className="relative w-1/2 flex justify-center">
                <motion.div
                  whileInView={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-6 h-6 rounded-full bg-green-400 shadow-[0_0_25px_rgba(34,197,94,0.9)] border-2 border-green-500"
                ></motion.div>
              </div>

              {/* Card */}
              {/* Card */}
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.4 }}
  className="relative w-[40%] backdrop-blur-xl bg-white/5 border border-green-500/20 rounded-3xl p-5 shadow-[0_0_25px_rgba(0,255,128,0.1)] hover:shadow-[0_0_40px_rgba(0,255,128,0.3)] transition-all duration-500"
>
  <img
    src={step.image}
    alt={step.title}
    className="w-full h-52 object-cover rounded-2xl mb-3"
  />
  <h3 className="text-green-400 font-bold text-lg mb-1">
    {step.title}
  </h3>
  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
</motion.div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup for details */}
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

export default JourneyVertical;

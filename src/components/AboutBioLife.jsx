import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Brain, Activity, HelpingHand } from "lucide-react";

const AboutBioLife = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative w-full py-24 px-10 bg-gradient-to-br from-[#f9fafb] via-[#eef7fa] to-[#e3f2fd] overflow-hidden text-[#374151]">
      {/* Soft blue background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(56,189,248,0.15),transparent_60%)] blur-3xl animate-pulse"></div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 text-center mb-10 drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
      >
        What is Muscular Dystrophy?
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center text-lg text-slate-600 leading-relaxed mb-12"
      >
        <span className="text-sky-600 font-semibold">Muscular Dystrophy (MD)</span> 
        is a group of genetic disorders that gradually weaken the body’s muscles. 
        Over time, muscle fibers break down and are replaced by fat or scar tissue, 
        making everyday actions like walking, lifting, or even breathing difficult.
      </motion.p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {[
          {
            icon: <HeartPulse className="w-9 h-9 text-sky-500" />,
            title: "Progressive Muscle Weakness",
            desc: "MD causes muscles to lose strength over time, often beginning in the legs and spreading to other parts of the body.",
          },
          {
            icon: <Brain className="w-9 h-9 text-sky-500" />,
            title: "Neural Connection Remains Intact",
            desc: "The brain continues to send movement signals — but the weakened muscles can’t respond properly.",
          },
          {
            icon: <Activity className="w-9 h-9 text-sky-500" />,
            title: "Multiple Types",
            desc: "There are over 30 types of muscular dystrophy — such as Duchenne and Becker — each affecting muscles differently.",
          },
          {
            icon: <HelpingHand className="w-9 h-9 text-sky-500" />,
            title: "Impact on Daily Life",
            desc: "People may experience mobility loss, fatigue, and dependence on assistance for basic movements.",
          },
          {
            icon: <HeartPulse className="w-9 h-9 text-sky-500" />,
            title: "No Permanent Cure — Yet",
            desc: "While research is ongoing, supportive technology like BioLife offers functional independence and renewed hope.",
          },
          {
            icon: <Activity className="w-9 h-9 text-sky-500" />,
            title: "Empowering the Future",
            desc: "By combining neuroscience and robotics, BioLife helps patients regain movement and improve quality of life.",
          },
        ].map((info, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group backdrop-blur-xl bg-white border border-sky-200 rounded-3xl p-8 shadow-[0_0_25px_rgba(56,189,248,0.08)] hover:shadow-[0_0_45px_rgba(56,189,248,0.25)] transition-all duration-500 hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-2xl bg-sky-100 border border-sky-200 group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              <h3 className="text-2xl font-bold text-sky-600">{info.title}</h3>
              <p className="text-slate-600 leading-relaxed">{info.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing Line */}
      <motion.p
        variants={fadeUp}
        custom={7}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 text-center text-slate-600 italic tracking-wide max-w-3xl mx-auto"
      >
        “Understanding Muscular Dystrophy is the first step toward compassion, 
        innovation, and restoring movement through technology.”
      </motion.p>
    </section>
  );
};

export default AboutBioLife;

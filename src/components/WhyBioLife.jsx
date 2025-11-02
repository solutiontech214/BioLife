import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Cpu, Brain, Zap, Shield, Activity } from "lucide-react";

const WhyBioLife = () => {
  const reasons = [
    {
      icon: <Brain className="w-8 h-8 text-green-400" />,
      title: "Mind-Powered Movement",
      desc: "BioLife decodes neural signals to create motion — making your thoughts the key to movement.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-green-400" />,
      title: "AI-Driven Precision",
      desc: "Advanced adaptive AI learns user behavior to ensure smoother, natural, and precise assistance.",
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-green-400" />,
      title: "Rehabilitation & Recovery",
      desc: "Rebuild strength and confidence through controlled muscle engagement and movement training.",
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: "Energy Smart Design",
      desc: "BioLife optimizes energy usage for longer operation — efficient, sustainable, and powerful.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Safety You Can Trust",
      desc: "Integrated stability and overload protection ensure a secure, balanced experience every time.",
    },
    {
      icon: <Activity className="w-8 h-8 text-green-400" />,
      title: "Real-Time Insights",
      desc: "Live data tracking of power, balance, and neural responses keeps you in full control.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative w-full py-24 px-10 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#101010] overflow-hidden text-gray-200">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.07),transparent_70%)] blur-3xl animate-pulse"></div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-center mb-8 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
      >
        Why Choose BioLife?
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center text-lg text-gray-400 mb-16 leading-relaxed"
      >
        BioLife isn’t just a medical device — it’s a revolution in human mobility.
        Designed for <span className="text-green-400 font-semibold">Muscular Dystrophy</span> patients,
        it transforms neural activity into real motion, empowering independence,
        confidence, and a new definition of freedom.
      </motion.p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10 max-w-6xl mx-auto">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group backdrop-blur-xl bg-white/5 border border-green-500/20 rounded-3xl p-8 shadow-[0_0_25px_rgba(0,255,128,0.08)] hover:shadow-[0_0_45px_rgba(0,255,128,0.25)] transition-all duration-500 hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-2xl bg-green-400/10 border border-green-400/20 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-green-400">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Line */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 text-center text-gray-400 italic tracking-wide"
      >
        “BioLife — where technology meets compassion, and movement becomes hope.”
      </motion.div>
    </section>
  );
};

export default WhyBioLife;

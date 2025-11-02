import React, { useState, useEffect } from "react";
import {
  Battery,
  Zap,
  WifiOff,
  Power,
  Activity,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const ExoSkeletonStatus = () => {
  const [systemPower, setSystemPower] = useState(true);
  const [battery, setBattery] = useState(83);
  const [power, setPower] = useState(22.7);
  const [connection, setConnection] = useState(false);
  const [hipAngle, setHipAngle] = useState(5.0);
  const [kneeAngle, setKneeAngle] = useState(40.9);
  const [eegSignal, setEegSignal] = useState(67);
  const [loadSupport, setLoadSupport] = useState(35.9);
  const [powerData, setPowerData] = useState([
    { time: "10s", watts: 18 },
    { time: "20s", watts: 22 },
    { time: "30s", watts: 20 },
    { time: "40s", watts: 23 },
    { time: "50s", watts: 21 },
  ]);

  // 🌀 Randomly update live data
  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => Math.max(50, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      setPower((prev) => Math.max(18, Math.min(26, prev + (Math.random() - 0.5) * 2)));
      setConnection(Math.random() > 0.1);
      setHipAngle((Math.random() * 10).toFixed(1));
      setKneeAngle((Math.random() * 80).toFixed(1));
      setEegSignal(Math.floor(Math.random() * 40) + 60);
      setLoadSupport((Math.random() * 10 + 30).toFixed(1));

      setPowerData((prev) => {
        const newPoint = { time: `${(prev.length + 1) * 10}s`, watts: Math.floor(Math.random() * 8 + 18) };
        return [...prev.slice(-4), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✨ Animation variants for Framer Motion
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      className="w-full min-h-screen bg-gradient-to-br from-[#050505] via-[#0b0b0b] to-[#101010] px-10 py-16 text-gray-200"
    >
      <motion.h2
        variants={fadeUp}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 mb-14 text-center drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
      >
        ExoSkeleton Live Status
      </motion.h2>

      {/* --- TOP STATUS CARDS --- */}
      <motion.div
        variants={fadeUp}
        transition={{ staggerChildren: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      >
        {[
          {
            title: "Battery Status",
            icon: <Battery className="text-green-400 w-7 h-7" />,
            body: (
              <>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
                  <motion.div
                    className="bg-green-500 h-3"
                    animate={{ width: `${battery}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="text-sm text-gray-400">Level: {battery.toFixed(1)}%</p>
                <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full mt-2 inline-block">
                  {battery > 70 ? "Healthy" : battery > 50 ? "Moderate" : "Low"}
                </span>
              </>
            ),
          },
          {
            title: "Power Consumption",
            icon: <Zap className="text-green-400 w-7 h-7" />,
            body: (
              <>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={powerData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#0f0f0f",
                        border: "1px solid #16a34a",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="watts" stroke="#16a34a" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-400">
                  Current Power: <span className="text-green-400 font-semibold">{power.toFixed(1)}W</span>
                </p>
              </>
            ),
          },
          {
            title: "Connection Status",
            icon: <WifiOff className={`w-7 h-7 ${connection ? "text-green-400" : "text-red-400"}`} />,
            body: (
              <>
                <p className={`text-sm font-semibold mb-2 ${connection ? "text-green-400" : "text-red-400"}`}>
                  {connection ? "Connected" : "Disconnected"}
                </p>
                <p className="text-gray-400 text-sm">
                  EEG Headband: {connection ? "Active" : "Disconnected"}
                </p>
                <p className="text-gray-400 text-sm">
                  Signal Quality: {connection ? "Good" : "Poor"}
                </p>
              </>
            ),
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,255,128,0.25)" }}
            className="backdrop-blur-xl bg-white/5 p-6 rounded-3xl border border-green-500/20 shadow-[0_0_20px_rgba(0,255,128,0.1)] transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-4">
              {card.icon}
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </div>
            {card.body}
          </motion.div>
        ))}
      </motion.div>

      {/* --- SYSTEM & SENSOR DETAILS --- */}
      <motion.div
        variants={fadeUp}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* System Controls */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-green-500/20 shadow-[0_0_25px_rgba(0,255,128,0.1)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Power className="text-green-400 w-7 h-7" />
            <h3 className="text-2xl font-semibold">System Controls</h3>
          </div>
          <p className="text-gray-400 mb-4">System Power</p>
          <motion.button
            onClick={() => setSystemPower(!systemPower)}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              systemPower
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {systemPower ? "ON" : "OFF"}
          </motion.button>

          <div className="mt-6">
            <p className="text-gray-400 mb-2">Operation Mode</p>
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-gray-300">
              Walking Assist
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <AlertTriangle className="w-5 h-5" />
            Emergency Stop
          </motion.button>
        </motion.div>

        {/* Sensors & Feedback */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-green-500/20 shadow-[0_0_25px_rgba(0,255,128,0.1)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-green-400 w-7 h-7" />
            <h3 className="text-2xl font-semibold">Sensors & Feedback</h3>
          </div>

          {[
            { label: "Hip Angle", value: hipAngle, unit: "°" },
            { label: "Knee Angle", value: kneeAngle, unit: "°" },
            { label: "EEG Signal", value: eegSignal, unit: "%" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="mb-5">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>{item.label}</span>
                <span>
                  {item.value}
                  {item.unit}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.6 }}
                  className="bg-green-500 h-2"
                ></motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            className="mt-6 text-center text-green-400 font-semibold"
          >
            Load Support: <span className="text-2xl">{loadSupport} kg</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ExoSkeletonStatus;

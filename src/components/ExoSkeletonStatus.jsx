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

  // Simulate live updates
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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      className="w-full min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7ff] px-10 py-16 text-[#374151]"
    >
      <motion.h2
        variants={fadeUp}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 mb-14 text-center drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
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
            icon: <Battery className="text-sky-500 w-7 h-7" />,
            body: (
              <>
                <div className="w-full bg-sky-100 rounded-full h-3 overflow-hidden mb-2">
                  <motion.div
                    className="bg-sky-500 h-3"
                    animate={{ width: `${battery}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="text-sm text-slate-600">Level: {battery.toFixed(1)}%</p>
                <span className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full mt-2 inline-block">
                  {battery > 70 ? "Healthy" : battery > 50 ? "Moderate" : "Low"}
                </span>
              </>
            ),
          },
          {
            title: "Power Consumption",
            icon: <Zap className="text-sky-500 w-7 h-7" />,
            body: (
              <>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={powerData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#f0f9ff",
                        border: "1px solid #38bdf8",
                        borderRadius: "8px",
                        color: "#0c4a6e",
                      }}
                    />
                    <Line type="monotone" dataKey="watts" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-slate-600">
                  Current Power: <span className="text-sky-600 font-semibold">{power.toFixed(1)}W</span>
                </p>
              </>
            ),
          },
          {
            title: "Connection Status",
            icon: (
              <WifiOff className={`w-7 h-7 ${connection ? "text-sky-500" : "text-red-400"}`} />
            ),
            body: (
              <>
                <p className={`text-sm font-semibold mb-2 ${connection ? "text-sky-600" : "text-red-400"}`}>
                  {connection ? "Connected" : "Disconnected"}
                </p>
                <p className="text-slate-600 text-sm">
                  EEG Headband: {connection ? "Active" : "Disconnected"}
                </p>
                <p className="text-slate-600 text-sm">
                  Signal Quality: {connection ? "Good" : "Poor"}
                </p>
              </>
            ),
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(56,189,248,0.25)" }}
            className="backdrop-blur-xl bg-white p-6 rounded-3xl border border-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-4">
              {card.icon}
              <h3 className="text-xl font-semibold text-sky-700">{card.title}</h3>
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
          className="backdrop-blur-xl bg-white p-8 rounded-3xl border border-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Power className="text-sky-500 w-7 h-7" />
            <h3 className="text-2xl font-semibold text-sky-700">System Controls</h3>
          </div>
          <p className="text-slate-600 mb-4">System Power</p>
          <motion.button
            onClick={() => setSystemPower(!systemPower)}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              systemPower
                ? "bg-sky-500 hover:bg-sky-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
          >
            {systemPower ? "ON" : "OFF"}
          </motion.button>

          <div className="mt-6">
            <p className="text-slate-600 mb-2">Operation Mode</p>
            <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-2 text-sky-700">
              Walking Assist
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-all"
          >
            <AlertTriangle className="w-5 h-5" />
            Emergency Stop
          </motion.button>
        </motion.div>

        {/* Sensors & Feedback */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-xl bg-white p-8 rounded-3xl border border-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-sky-500 w-7 h-7" />
            <h3 className="text-2xl font-semibold text-sky-700">Sensors & Feedback</h3>
          </div>

          {[ 
            { label: "Hip Angle", value: hipAngle, unit: "°" },
            { label: "Knee Angle", value: kneeAngle, unit: "°" },
            { label: "EEG Signal", value: eegSignal, unit: "%" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="mb-5">
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>{item.label}</span>
                <span>
                  {item.value}
                  {item.unit}
                </span>
              </div>
              <div className="w-full bg-sky-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.6 }}
                  className="bg-sky-500 h-2"
                ></motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            className="mt-6 text-center text-sky-600 font-semibold"
          >
            Load Support: <span className="text-2xl">{loadSupport} kg</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ExoSkeletonStatus;

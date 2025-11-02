import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Phone, Calendar, CheckCircle2, Home } from "lucide-react";

const Book = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "" });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setForm({ name: "", email: "", phone: "", date: "" });
    setTimeout(() => setShowToast(false), 4000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-[80vh] bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#101010] flex flex-col items-center justify-center px-6 py-20 text-gray-200 overflow-hidden">
      {/* Background glow animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(34,197,94,0.1),transparent_60%)] blur-3xl"
      />

      {/* Section Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 mb-12 text-center drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
      >
        Book a Free Demo
      </motion.h2>

      {/* ✨ Expanding Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0, width: "70%" }}
        whileInView={{
          scale: 1,
          opacity: 1,
          width: "100%",
          transition: { duration: 1, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="relative max-w-xl backdrop-blur-2xl bg-white/5 border border-green-500/20 rounded-3xl p-10 shadow-[0_0_40px_rgba(0,255,128,0.1)] hover:shadow-[0_0_60px_rgba(0,255,128,0.25)] transition-all duration-500"
      >
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-emerald-600/10 rounded-3xl blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-green-400" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ram Kumar Yadav"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-400" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition-all"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-400" /> Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition-all"
            />
          </div>
          
        </div>
        <br />
<div className="flex flex-col ">
            <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Home className="w-4 h-4 text-green-400" /> Preferred Date
 Address
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="123 Main St, City, Country"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-500 outline-none transition-all"
            />
          </div>
        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34,197,94,0.3)" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-8 w-full bg-gradient-to-r from-green-600 to-emerald-500 py-3 rounded-xl font-semibold text-white text-lg flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(0,255,128,0.2)] transition-all"
        >
          <Send className="w-5 h-5" /> Book Demo
        </motion.button>
      </motion.form>

      {/* ✅ Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-xl border border-green-400/30 text-white px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,255,128,0.25)] flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span className="font-semibold tracking-wide">
              Demo booked successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Book;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Home,
  BriefcaseMedical,
  ShoppingBag,
  Clock,
  FileText,
  ChevronDown, // New icon for the dropdown
} from "lucide-react";

// --- Tab Configuration Data (Now used for Dropdown Options) ---
const tabs = [
  { id: "purchase", label: "Purchase Exoskeleton" },
  { id: "rent", label: "Rent Exoskeleton" },
  { id: "doctor", label: "Doctor Order" },
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Initial Form State ---
const initialFormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  address: "",
  duration: "",
  hours: "",
  hospital: "",
  patientName: "",
  diagnosis: "",
};

const Book = () => {
  // activeTab now controls the selected dropdown option
  const [activeTab, setActiveTab] = useState("purchase");
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Tab:", activeTab);
    console.log("Submitted Form Data:", form);

    // Reset form and show toast
    setForm(initialFormState);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Handler for dropdown change
  const handleDropdownChange = (e) => {
    const newTabId = e.target.value;
    setActiveTab(newTabId);
    // Reset the form state when switching tabs
    setForm(initialFormState);
  };

  // Helper function to render a common input field structure
  const InputField = ({ label, name, type = "text", icon: Icon, placeholder, required = true }) => (
    <div className="flex flex-col">
      <label className="text-sm text-slate-600 mb-2 flex items-center gap-2">
        {Icon} {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 
          text-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
      />
    </div>
  );

  return (
    <section
      className="relative w-full min-h-[100vh] bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7ff] 
        flex flex-col items-center px-6 py-20 text-[#374151] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(14,165,233,0.12),transparent_60%)] blur-3xl"></div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 mb-12 text-center"
      >
        Get Started with BioLife
      </motion.h2>

      {/* Dropdown Selector (Replaces Tabs) */}
      {/* <motion.div
        className="max-w-xl w-full mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
      >
        <div className="relative">
          <select
            value={activeTab}
            onChange={handleDropdownChange}
            className="w-full appearance-none bg-white border border-sky-400 text-sky-700 
              rounded-xl px-6 py-4 text-lg font-semibold shadow-[0_4px_20px_rgba(56,189,248,0.2)] 
              focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-sky-500 pointer-events-none" />
        </div>
      </motion.div> */}
      <motion.div
        className="max-w-xl w-full mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
      >
        <div className="relative">
          <select
            value={activeTab}
            onChange={handleDropdownChange}
            // 🌟 Updated Styling for Theme Match 🌟
            className="w-full appearance-none bg-white/70 border-2 border-sky-300 text-sky-700 
              rounded-full px-6 py-3 text-lg font-semibold shadow-[0_4px_20px_rgba(56,189,248,0.1)] 
              focus:outline-none focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all cursor-pointer
              hover:bg-sky-50" 
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id} className="bg-white text-sky-700">
                {tab.label}
              </option>
            ))}
          </select>
          {/* Custom icon positioning */}
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-sky-500 pointer-events-none" />
        </div>
      </motion.div>

      {/* Form Container */}
      <div className="relative max-w-xl w-full backdrop-blur-2xl bg-white border border-sky-200 
        rounded-3xl p-10 shadow-[0_0_40px_rgba(56,189,248,0.1)] 
        hover:shadow-[0_0_60px_rgba(56,189,248,0.25)] transition-all duration-500">

        {/* Dynamic Title */}
        <h3 className="text-2xl font-bold text-sky-600 mb-6 text-center">
          {tabs.find(t => t.id === activeTab)?.label} Details
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Shared Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField 
              label="Full Name" 
              name="name" 
              icon={<User className="w-4 h-4 text-sky-500" />}
              placeholder="Full Name"
              required={activeTab !== 'doctor'} // Doctor forms might be filled by hospital staff
            />
            <InputField 
              label="Email" 
              name="email" 
              type="email"
              icon={<Mail className="w-4 h-4 text-sky-500" />}
              placeholder="you@example.com"
            />
            <InputField 
              label="Phone" 
              name="phone" 
              type="tel"
              icon={<Phone className="w-4 h-4 text-sky-500" />}
              placeholder="+91 9876543210"
            />
            <InputField 
              label="Preferred Date" 
              name="date" 
              type="date"
              icon={<Calendar className="w-4 h-4 text-sky-500" />}
            />
          </div>

          {/* Conditional Fields - Wrapped in AnimatePresence for smooth transition */}
          <AnimatePresence mode="wait">
            {activeTab === "purchase" && (
              <motion.div 
                key="purchase-form"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <InputField 
                  label="Shipping Address" 
                  name="address" 
                  icon={<Home className="w-4 h-4 text-sky-500" />}
                  placeholder="123 Main St, City, Country"
                />
              </motion.div>
            )}

            {activeTab === "rent" && (
              <motion.div 
                key="rent-form"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <InputField 
                  label="Rental Duration (e.g., Months)" 
                  name="duration" 
                  icon={<Clock className="w-4 h-4 text-sky-500" />}
                  placeholder="e.g., 3 Months"
                />
                <InputField 
                  label="Hours per Day" 
                  name="hours" 
                  icon={<Clock className="w-4 h-4 text-sky-500" />}
                  placeholder="e.g., 6 hours/day"
                />
              </motion.div>
            )}

            {activeTab === "doctor" && (
              <motion.div 
                key="doctor-form"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 space-y-6"
              >
                <InputField 
                  label="Patient Name" 
                  name="patientName" 
                  icon={<User className="w-4 h-4 text-sky-500" />}
                  placeholder="Enter Patient's Full Name"
                />
                <InputField 
                  label="Hospital / Clinic" 
                  name="hospital" 
                  icon={<BriefcaseMedical className="w-4 h-4 text-sky-500" />}
                  placeholder="Hospital or Clinic Name"
                />
                <div>
                  <label className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-500" /> Diagnosis / Notes
                  </label>
                  <textarea
                    name="diagnosis"
                    value={form.diagnosis}
                    onChange={handleChange}
                    placeholder="Brief description of patient condition"
                    rows="3"
                    required
                    className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 
                      text-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-sky-500 to-cyan-500 py-3 rounded-xl 
              font-semibold text-white text-lg flex justify-center items-center gap-3 
              shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all"
          >
            <Send className="w-5 h-5" />
            {activeTab === "purchase" && "Submit Purchase Request"}
            {activeTab === "rent" && "Submit Rental Request"}
            {activeTab === "doctor" && "Submit Doctor Order"}
          </motion.button>
        </form>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-sky-500/90 to-cyan-600/90 
              backdrop-blur-xl border border-sky-300/30 text-white px-6 py-3 rounded-2xl 
              shadow-[0_0_30px_rgba(56,189,248,0.3)] flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>Form submitted successfully! We'll be in touch!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Book;
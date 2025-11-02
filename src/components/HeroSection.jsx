import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ModelViewer from "./ModelViewer";

const HeroSection = () => {
  const [showDemo, setShowDemo] = useState(false);
  const textRef = useRef(null);
  const modalRef = useRef(null);

  // Animate hero text entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      textRef.current.children,
      { opacity: 0, y: 40, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.25 }
    );
  }, []);

  // Animate popup open
  useEffect(() => {
    if (showDemo && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [showDemo]);

  // Animate popup close
  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.85,
      y: 40,
      filter: "blur(8px)",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setShowDemo(false),
    });
  };

  return (
    <section className="relative flex flex-col md:mt-20 md:flex-row items-center justify-between min-h-[90vh] w-full px-10 bg-gradient-to-r from-[#000000] via-[#0b0b0b] to-[#111111] overflow-hidden">
      {/* Subtle background glow layers */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-600/10 blur-[200px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 blur-[180px] rounded-full animate-pulse"></div>

      {/* LEFT SIDE TEXT */}
      <div ref={textRef} className="w-full md:w-[60ś%] space-y-8 text-left z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-justify bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.35)]">
          Empowering Mobility.
          <br /> Restoring Hope.
        </h1>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg text-justify">
          <span className="text-green-400 font-semibold">BioLife</span> is a{" "}
          <span className="font-semibold text-green-400">
            brain-controlled AI exoskeleton
          </span>{" "}
          designed for <span className="font-semibold">Muscular Dystrophy</span>{" "}
          patients — converting{" "}
          <span className="font-semibold text-green-400">neural signals</span>{" "}
          into motion, empowering independence and redefining mobility.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 pt-4">
          
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-3 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]"
          >
            Watch Demo
          </button>
        </div>
        <br />
      </div>

      {/* RIGHT SIDE (Model Preview) */}
      <div className="w-full md:w-[40%] mt-14 md:mt-0 flex justify-center items-center relative z-0">
        <div className="backdrop-blur-xl bg-white/5 p-5 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,255,128,0.2)] hover:shadow-[0_0_70px_rgba(0,255,128,0.4)] transition-all duration-700">
          <ModelViewer />
        </div>
      </div>

      {/* MODAL (POPUP) */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="relative w-[90%] md:w-[75%] h-[80vh] bg-gradient-to-br from-[#0a0a0a]/90 to-[#0f2315]/80 border border-green-400/30 rounded-3xl shadow-[0_0_60px_rgba(0,255,128,0.25)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Floating gradient ring effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 to-transparent blur-3xl"></div>
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-green-500/20 blur-[180px] rounded-full animate-pulse"></div>

            {/* ✕ CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-6 text-gray-300 hover:text-green-400 text-4xl font-bold transition-all duration-300 z-20"
            >
              ✕
            </button>

            {/* MODEL INSIDE POPUP */}
            <div className="w-full h-full z-10">
              <ModelViewer />
            </div>

            {/* Subtle footer text */}
            <div className="absolute bottom-6 w-full text-center text-green-300 text-sm tracking-wide animate-pulse opacity-90">
              <span className="font-semibold">Interactive 3D Mode</span> — drag to explore your exoskeleton
              <br />
              <br />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ModelViewer from "./ModelViewer";

const HeroSection = () => {
  const [showDemo, setShowDemo] = useState(false);
  const textRef = useRef(null);
  const modalRef = useRef(null);

  // Animate hero text
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      textRef.current.children,
      { opacity: 0, y: 40, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.25 }
    );
  }, []);

  // Animate modal open
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

  // Animate modal close
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
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[90vh] w-full px-10 bg-gradient-to-r from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7ff] overflow-hidden">
      
      {/* Background glow layers */}
      {/* <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/20 blur-[180px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-300/20 blur-[160px] rounded-full animate-pulse"></div> */}
{/* Background glow layers */}
<div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/20 blur-[180px] rounded-full animate-pulse pointer-events-none z-0"></div>
<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-300/20 blur-[160px] rounded-full animate-pulse pointer-events-none z-0"></div>

      {/* LEFT TEXT */}
      <div ref={textRef} className="w-full md:w-[60%] space-y-8 text-left z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-justify bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
          Empowering Mobility,
          <br /> Restoring Hope.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg text-justify">
          <span className="text-sky-600 font-semibold">BioLife</span> is a{" "}
          <span className="font-semibold text-sky-600">
            brain-controlled AI exoskeleton
          </span>{" "}
          designed for{" "}
          <span className="font-semibold text-sky-700">Muscular Dystrophy</span>{" "}
          patients — converting{" "}
          <span className="font-semibold text-sky-600">neural signals</span>{" "}
          into motion, empowering independence and redefining mobility.
        </p>

        {/* Button */}
        <div className="flex flex-wrap gap-5 pt-4">
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-3 border-2 border-sky-400 text-sky-600 hover:bg-sky-500 hover:text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)]"
          >
            Watch Demo
          </button>
          <p className="text-center text-slate-600 mt-8">
  Have feedback?{" "}
  <a
    href="https://forms.gle/aAzwMKAzwU8GjCY37"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sky-600 font-semibold underline hover:text-sky-800 transition"
  >
    Click here
  </a>{" "}
  to let us know.
</p>

        </div>
      </div>

      {/* RIGHT MODEL */}
      <div className="w-full md:w-[40%] mt-14 md:mt-0 flex justify-center items-center relative z-0">
        <div className="backdrop-blur-xl bg-white/60 p-5 rounded-3xl border border-sky-100 shadow-[0_0_40px_rgba(56,189,248,0.2)] hover:shadow-[0_0_60px_rgba(56,189,248,0.35)] transition-all duration-700">
          <ModelViewer />
        </div>
      </div>

      {/* MODAL (Popup) */}
      {showDemo && (
        <div className="fixed inset-0 bg-sky-950/70 backdrop-blur-md flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="relative w-[90%] md:w-[75%] h-[80vh] bg-gradient-to-br from-[#f0f9ff]/95 to-[#e0f2fe]/90 border border-sky-300/40 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.35)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Floating glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-300/20 to-transparent blur-3xl"></div>
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-cyan-200/30 blur-[180px] rounded-full animate-pulse"></div>

            {/* ✕ CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-6 text-slate-500 hover:text-sky-600 text-4xl font-bold transition-all duration-300 z-20"
            >
              ✕
            </button>

            {/* MODEL INSIDE POPUP */}
            <div className="w-full h-full z-10">
              <ModelViewer />
            </div>

            {/* Footer note */}
            <div className="absolute bottom-6 w-full text-center text-sky-600 text-sm tracking-wide animate-pulse opacity-90">
              <span className="font-semibold">Interactive 3D Mode</span> — drag to explore your exoskeleton
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

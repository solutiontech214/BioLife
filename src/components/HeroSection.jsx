import React, { useState } from "react";
import ModelViewer from "./ModelViewer";

const HeroSection = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section className="flex h-[90vh] w-full bg-transparent">
      {/* LEFT SIDE — 40% */}
      <div className="w-[40%] flex flex-col justify-center px-12 text-left text-gray-800 z-10">
        <h1 className="text-5xl font-extrabold text-green-600 mb-4">
          Welcome to BioLife
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Revolutionizing muscle dystrophy care with cutting-edge AI-driven
          technology and robotics innovation.
        </p>
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className="px-6 py-3 rounded-lg bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition-all duration-300"
        >
          {isFollowing ? "Stop Rotation" : "See Model"}
        </button>
      </div>

      {/* RIGHT SIDE — 60% */}
      <div className="w-[60%] flex items-center justify-center">
        <ModelViewer isFollowing={isFollowing} />
      </div>
    </section>
  );
};

export default HeroSection;

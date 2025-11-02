import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

// 🧩 Model Component
function Model({ scrollY, cursor, isFollowing }) {
  const { scene } = useGLTF("/model_1.glb"); // your new model file
  const modelRef = useRef();

  // Rotation + scaling setup
  const initialRotation = 0;
  const scaleValue = useTransform(scrollY, [0, 600], [0.9, 1.1]);

  // 🌟 Smooth reset animation
  useEffect(() => {
    if (!modelRef.current) return;
    if (!isFollowing) {
      gsap.to(modelRef.current.rotation, {
        y: "+=0.01", // small nudge to ensure smooth loop
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [isFollowing]);

  // 🌀 Animate per frame
  useFrame((_, delta) => {
    if (!modelRef.current) return;

    const currentScale = scaleValue.get();
    modelRef.current.scale.set(currentScale, currentScale, currentScale);

    // Center the model visually
    modelRef.current.position.set(0, -0.5, 0);

    // 360° hover rotation
    if (isFollowing) {
      const rotationY = (cursor.x.get() - 0.5) * Math.PI * 2;
      modelRef.current.rotation.y = initialRotation + rotationY;
    } else {
      // ✨ Auto-slow-spin when idle
      modelRef.current.rotation.y += delta * 0.3; // speed adjustable
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

// 🧠 Main Viewer Component
export default function ModelViewer() {
  const scrollY = useMotionValue(0);
  const cursor = { x: useMotionValue(0.5), y: useMotionValue(0.5) };
  const [isFollowing, setIsFollowing] = useState(false);
  const containerRef = useRef();

  // Track scroll
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Track mouse hover inside container
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        setIsFollowing(true);
        cursor.x.set((e.clientX - rect.left) / rect.width);
      } else {
        setIsFollowing(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursor.x]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[75vh] flex justify-center items-center rounded-3xl backdrop-blur-xl bg-white/10 shadow-[0_0_60px_10px_rgba(0,255,128,0.2)] border border-white/20 relative"
    >
      {/* Glowing Accent Border */}
      <div className="absolute inset-0 rounded-3xl border border-green-400/40 blur-lg opacity-60 animate-pulse"></div>

      <Canvas
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={1.4} />
        <Suspense fallback={null}>
          <Model scrollY={scrollY} cursor={cursor} isFollowing={isFollowing} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enableZoom={true} enableRotate={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

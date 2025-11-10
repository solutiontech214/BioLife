import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

// 🧩 Model Component
function Model({ scrollY, cursor, isFollowing }) {
  const { scene } = useGLTF("/model_1.glb"); // 3D model file
  const modelRef = useRef();

  const initialRotation = 0;
  const scaleValue = useTransform(scrollY, [0, 600], [0.9, 1.1]);

  useEffect(() => {
    if (!modelRef.current) return;
    if (!isFollowing) {
      gsap.to(modelRef.current.rotation, {
        y: "+=0.01",
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [isFollowing]);

  useFrame((_, delta) => {
    if (!modelRef.current) return;

    const currentScale = scaleValue.get();
    modelRef.current.scale.set(currentScale, currentScale, currentScale);
    modelRef.current.position.set(0, -0.5, 0);

    if (isFollowing) {
      const rotationY = (cursor.x.get() - 0.5) * Math.PI * 2;
      modelRef.current.rotation.y = initialRotation + rotationY;
    } else {
      modelRef.current.rotation.y += delta * 0.3;
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

  // Track mouse movement
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
      className="w-full h-[75vh] flex justify-center items-center rounded-3xl backdrop-blur-2xl bg-white/60 shadow-[0_0_60px_10px_rgba(56,189,248,0.15)] border border-sky-200 relative"
    >
      {/* 💡 Soft blue glow border */}
      <div className="absolute inset-0 rounded-3xl border border-sky-400/40 blur-lg opacity-70 animate-pulse"></div>

      <Canvas
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 5]} intensity={1.3} color="#bae6fd" />
        <Suspense fallback={null}>
          <Model scrollY={scrollY} cursor={cursor} isFollowing={isFollowing} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={true} enableRotate={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

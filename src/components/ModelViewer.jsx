import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

// 🧩 Model Component
function Model({ scrollY, cursor, isFollowing }) {
  const { scene } = useGLTF("/model_1.glb");
  const modelRef = useRef();
  const initialRotation = (317 * Math.PI) / 180; // 317° rotation
  const scaleValue = useTransform(scrollY, [0, 600], [0.9, 1.1]);

  // Smooth reset to initial rotation when not following
  useEffect(() => {
    if (!modelRef.current) return;
    if (!isFollowing) {
      gsap.to(modelRef.current.rotation, {
        y: initialRotation,
        duration: 1.2,
        ease: "power3.out",
      });
    }
  }, [isFollowing]);

  // Real-time animation
  useFrame(() => {
    if (!modelRef.current) return;

    // Scale with scroll
    const currentScale = scaleValue.get();
    modelRef.current.scale.set(currentScale, currentScale, currentScale);

    // Model position
    modelRef.current.position.set(0.6, -0.5, 0);

    // Smooth rotation with cursor
    if (isFollowing) {
      const y = (cursor.x.get() - 0.5) * Math.PI * 1.2; // Reduced sensitivity for smoother movement
      modelRef.current.rotation.y = initialRotation + y;
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

  // Track mouse movement (only inside model area)
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
      className="w-full h-[75vh] flex justify-center items-center rounded-3xl backdrop-blur-xl bg-white/10 shadow-[0_0_40px_5px_rgba(0,255,128,0.15)] border border-white/20 relative"
    >
      {/* Subtle glowing border */}
      <div className="absolute inset-0 rounded-3xl border border-green-400/40 blur-lg opacity-60 animate-pulse"></div>

      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model scrollY={scrollY} cursor={cursor} isFollowing={isFollowing} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enableRotate={false}
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
        />
      </Canvas>
    </div>
  );
}

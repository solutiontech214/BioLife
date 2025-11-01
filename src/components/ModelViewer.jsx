import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

function Model({ scrollY, cursor, isFollowing }) {
  const { scene } = useGLTF("/model.glb");
  const modelRef = useRef();

  // Initial rotation at 280 degrees
  const initialRotation = (310 * Math.PI) / 180;
  const scaleValue = useTransform(scrollY, [0, 600], [0.9, 1.1]);

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

  useFrame(() => {
    if (!modelRef.current) return;

    const currentScale = scaleValue.get();
    modelRef.current.scale.set(currentScale, currentScale, currentScale);

    // ✅ Shift slightly to the right (x = 0.6 instead of 0)
    modelRef.current.position.set(0.6, -0.2, 0);

    // Rotate in Y direction only when following is active
    if (isFollowing) {
      const y = cursor.x.get() - 0.5;
      modelRef.current.rotation.y = initialRotation + y * Math.PI * 2;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}


export default function ModelViewer() {
  const scrollY = useMotionValue(0);
  const cursor = { x: useMotionValue(0.5), y: useMotionValue(0.5) };
  const [isFollowing, setIsFollowing] = useState(false);
  const containerRef = useRef();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Track mouse movement only inside container
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
        cursor.y.set((e.clientY - rect.top) / rect.height);
      } else {
        // When leaving container → stop rotation + reset smoothly
        setIsFollowing(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursor.x, cursor.y]);

  return (
    <section
      className="relative w-full h-full flex items-center justify-between px-8"
      style={{ background: "transparent" }}
    >
      {/* Left Side */}
      <div className="w-[40%] text-left text-white z-10">
        <h1 className="text-4xl font-bold mb-3">Welcome to BioLife</h1>
        <p className="text-lg opacity-80 mb-5 max-w-md">
          Revolutionizing muscle dystrophy care with innovation and AI-powered solutions.
        </p>
       
      </div>

      {/* Right Side */}
      <div
        ref={containerRef}
        className="w-[60%] h-[85vh] flex justify-center items-center relative"
      >
        <Canvas
          camera={{ position: [0, 1, 5], fov: 45 }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
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
    </section>
  );
}

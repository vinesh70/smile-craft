"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isFine = useMediaQuery("(pointer: fine)");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const outerX = useMotionValue(-100);
  const outerY = useMotionValue(-100);
  const springX = useSpring(outerX, { stiffness: 100, damping: 20 });
  const springY = useSpring(outerY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (!isFine) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      outerX.set(e.clientX - 16);
      outerY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isFine, cursorX, cursorY, outerX, outerY]);

  if (!isFine) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998] h-2 w-2 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: "#48CAE4",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9997] h-8 w-8 rounded-full border"
        style={{
          x: springX,
          y: springY,
          borderColor: "rgba(72, 202, 228, 0.5)",
        }}
      />
    </>
  );
}

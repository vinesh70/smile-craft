"use client";
import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const BEFORE_IMAGE =
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&fit=crop&crop=center";
const AFTER_IMAGE =
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&fit=crop&crop=center";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--sc-bg-light)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            Transformations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold"
            style={{
              fontFamily: "var(--font-fraunces, serif)",
              color: "var(--sc-text-heading)",
            }}
          >
            See the SmileCraft Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg"
            style={{ color: "var(--sc-text-body)" }}
          >
            Drag the slider to compare results
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          className="relative mx-auto max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-2xl select-none"
          style={{ cursor: "ew-resize" }}
        >
          {/* After (full width, background) */}
          <div className="absolute inset-0">
            <img
              src={AFTER_IMAGE}
              alt="After dental treatment"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.backgroundColor =
                  "#48CAE4";
              }}
            />
          </div>

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src={BEFORE_IMAGE}
              alt="Before dental treatment"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                width: `${(100 / position) * 100}%`,
                maxWidth: "none",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.backgroundColor =
                  "#0F4C5C";
              }}
            />
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
            Before
          </div>
          <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: "#48CAE4" }}>
            After
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div
              className="absolute top-0 bottom-0 w-0.5"
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
              style={{ backgroundColor: "#0F4C5C", border: "3px solid white" }}
            >
              <span className="text-white text-xs font-bold">⟺</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

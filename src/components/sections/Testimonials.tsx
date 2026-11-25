"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/config";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const prev = () => {
    setPaused(true);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setPaused(true);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            Patient Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold text-white"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            Real People, Real Smiles
          </motion.h2>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-8 sm:p-10 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(72,202,228,0.15)",
              }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    style={{ color: "#FFD700", fill: "#FFD700" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 italic"
                style={{ fontFamily: "var(--font-fraunces, serif)" }}
              >
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="h-12 w-12 rounded-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.backgroundColor = "#48CAE4";
                  }}
                />
                <div className="text-left">
                  <p className="font-semibold text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-white/40">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPaused(true);
                    setCurrent(i);
                  }}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === current ? "24px" : "8px",
                    backgroundColor:
                      i === current
                        ? "#48CAE4"
                        : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

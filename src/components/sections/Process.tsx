"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Stethoscope, Wrench, Heart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description: "We listen to your goals, review your dental history, and answer every question. No judgment, no pressure.",
    color: "#48CAE4",
  },
  {
    number: "02",
    icon: Stethoscope,
    title: "Diagnosis",
    description: "Digital X-rays, 3D scans, and a comprehensive exam give us the full picture of your oral health.",
    color: "#FF6B6B",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Treatment",
    description: "Expert care using the latest techniques, delivered with precision and a gentle touch.",
    color: "#0F4C5C",
  },
  {
    number: "04",
    icon: Heart,
    title: "Aftercare",
    description: "Personalised guidance, follow-up check-ins, and lifetime support to keep your smile perfect.",
    color: "#48CAE4",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-16 sm:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--sc-bg-light)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-10 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
            style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
          >
            Your Journey to a Perfect Smile
          </motion.h2>
        </div>

        {/* Timeline connector (desktop only) */}
        <div className="hidden lg:block relative mb-4">
          <div
            className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 opacity-20"
            style={{ backgroundColor: "var(--sc-text-heading)" }}
          />
          <motion.div
            className="absolute top-10 left-[12.5%] h-0.5 origin-left"
            style={{ width: lineWidth, backgroundColor: "#48CAE4" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="relative flex items-center justify-center rounded-full mb-5 shadow-lg"
                  style={{
                    width: "4.5rem",
                    height: "4.5rem",
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                    border: `2px solid ${step.color}50`,
                  }}
                >
                  <Icon className="h-7 w-7" style={{ color: step.color }} />
                  <span
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number.slice(1)}
                  </span>
                </div>

                <h3
                  className="text-lg sm:text-xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--sc-text-body)" }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

const stats = [
  { value: 18, suffix: "+", label: "Years of Excellence" },
  { value: 15000, suffix: "+", label: "Happy Patients" },
  { value: 12, suffix: "", label: "Specialists" },
  { value: 4.9, suffix: "★", label: "Avg. Rating", decimal: true },
];

const values = [
  "Gentle, anxiety-free care for every patient",
  "State-of-the-art digital X-ray technology",
  "Same-day emergency appointments available",
  "Transparent pricing with no hidden fees",
  "AACD-accredited cosmetic procedures",
];

function CountUp({
  target,
  suffix,
  decimal = false,
  trigger,
}: {
  target: number;
  suffix: string;
  decimal?: boolean;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [trigger, target]);

  const display = decimal
    ? count.toFixed(1)
    : count >= 1000
    ? Math.floor(count / 1000) + "k"
    : Math.floor(count).toString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-16 sm:py-24 overflow-hidden"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#48CAE4" }}
            >
              Our Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-semibold mb-6 text-white"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              More Than a Dental Clinic —{" "}
              <span style={{ color: "#48CAE4" }}>A Smile Studio</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-6"
            >
              Founded in 2006 in Mumbai, SmileCraft Dental was built on a simple
              belief: every person deserves a smile they&apos;re proud of. We combine
              artistry with the latest clinical science to deliver results that
              are as beautiful as they are healthy.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 mb-8"
            >
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="h-5 w-5 mt-0.5 shrink-0"
                    style={{ color: "#48CAE4" }}
                  />
                  <span className="text-white/70">{v}</span>
                </li>
              ))}
            </motion.ul>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              onClick={() =>
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FF6B6B" }}
            >
              Schedule Your Visit
            </motion.button>
          </div>

          {/* Right: Stats */}
          <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className="flex flex-col items-center justify-center rounded-3xl p-5 sm:p-8 text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(72,202,228,0.15)",
                }}
              >
                <p
                  className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-2 text-white"
                  style={{ fontFamily: "var(--font-fraunces, serif)" }}
                >
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    decimal={stat.decimal}
                    trigger={inView}
                  />
                </p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

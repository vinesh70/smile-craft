"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { brand } from "@/data/brand";

interface HeroProps {
  onBookNow: () => void;
}

function getWordVariant(i: number) {
  return {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.6 },
    },
  };
}

const headline = "Crafting Smiles That Last a Lifetime";
const words = headline.split(" ");

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0A1628" }}
    >
      {/* Animated gradient blobs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          backgroundColor: "#48CAE4",
          animation: "blob 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          backgroundColor: "#0F4C5C",
          animation: "blob 9s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
        style={{
          backgroundColor: "#FF6B6B",
          animation: "blob 11s ease-in-out infinite 4s",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/5 px-4 py-1.5 mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
              <span className="text-sm text-mint font-medium">
                Mumbai's #1 Dental Clinic
              </span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6 text-white"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial="hidden"
                  animate="visible"
                  variants={getWordVariant(i)}
                  className="inline-block mr-3"
                  style={
                    i > 0 && i < 3
                      ? {
                          background:
                            "linear-gradient(135deg, #48CAE4, #0F4C5C)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg"
            >
              Premium dental care with cutting-edge technology and a gentle
              touch. 15,000+ patients trust us to craft their perfect smile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onBookNow}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#FF6B6B" }}
              >
                Book Appointment
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all"
              >
                Our Services
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10"
            >
              {brand.stats.map((stat, i) => (
                <div key={i}>
                  <p
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-fraunces, serif)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero image + floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(72,202,228,0.3), rgba(15,76,92,0.3))",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&fit=crop&crop=center"
                alt="Modern dental clinic interior"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Floating glass card - top left (inside image bounds) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-4 top-8 rounded-2xl px-4 py-3 shadow-2xl"
              style={{
                backgroundColor: "rgba(10,22,40,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <p className="text-xs text-white/60 mb-0.5">Happy Patients</p>
              <p
                className="text-2xl font-semibold text-white"
                style={{ fontFamily: "var(--font-fraunces, serif)" }}
              >
                15,000+
              </p>
            </motion.div>

            {/* Floating glass card - bottom right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute right-4 bottom-8 rounded-2xl px-4 py-3 shadow-2xl"
              style={{
                backgroundColor: "rgba(10,22,40,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-white">4.9</p>
              </div>
              <p className="text-xs text-white/60 mt-0.5">Patient Rating</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0A1628" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          backgroundColor: "#48CAE4",
          animation: "blob 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          backgroundColor: "#FF6B6B",
          animation: "blob 9s ease-in-out infinite 2s",
        }}
      />

      <div className="relative text-center">
        {/* Animated tooth SVG */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="mb-6 flex justify-center"
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 8C28 8 18 16 18 28C18 32 19 36 20 40C22 50 24 64 30 68C32 70 34 70 36 68C37 66 38 62 40 62C42 62 43 66 44 68C46 70 48 70 50 68C56 64 58 50 60 40C61 36 62 32 62 28C62 16 52 8 40 8Z"
              fill="#48CAE4"
              fillOpacity="0.15"
              stroke="#48CAE4"
              strokeWidth="2.5"
            />
            <path
              d="M32 28C32 24 36 20 40 20C44 20 48 24 48 28"
              stroke="#48CAE4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M34 40L38 44L46 36"
              stroke="#FF6B6B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-8xl sm:text-9xl font-semibold text-white mb-4"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-2xl font-semibold text-white/80 mb-3"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Page Not Found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/40 mb-8 max-w-sm mx-auto"
        >
          Looks like this page went missing — just like a tooth that needed
          pulling. Let&apos;s get you back to your smile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="rounded-full px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#0F4C5C" }}
          >
            Back to Home
          </Link>
          <Link
            href="/#booking"
            className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white/80 hover:bg-white/10 transition-all"
          >
            Book Appointment
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

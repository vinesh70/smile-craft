"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0A1628" }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-6"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 8C28 8 18 16 18 28C18 32 19 36 20 40C22 50 24 64 30 68C32 70 34 70 36 68C37 66 38 62 40 62C42 62 43 66 44 68C46 70 48 70 50 68C56 64 58 50 60 40C61 36 62 32 62 28C62 16 52 8 40 8Z"
                fill="#48CAE4"
                fillOpacity="0.2"
                stroke="#48CAE4"
                strokeWidth="2.5"
              />
              <path
                d="M32 28C32 24 36 20 40 20C44 20 48 24 48 28"
                stroke="#48CAE4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="34" cy="32" r="3" fill="#48CAE4" />
              <circle cx="46" cy="32" r="3" fill="#48CAE4" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-semibold tracking-wide mb-8 text-white"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            SmileCraft
          </motion.div>

          <div
            className="w-48 h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: "#48CAE4" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-4 text-sm text-white"
          >
            Crafting your smile experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

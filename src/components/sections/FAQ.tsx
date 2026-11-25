"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/config";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="faq"
      className="py-24"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold text-white"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            Common Questions
          </motion.h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(72,202,228,0.15)",
              }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <span
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      openIndex === i
                        ? "rgba(72,202,228,0.2)"
                        : "rgba(255,255,255,0.05)",
                  }}
                >
                  {openIndex === i ? (
                    <Minus className="h-3.5 w-3.5" style={{ color: "#48CAE4" }} />
                  ) : (
                    <Plus className="h-3.5 w-3.5 text-white/50" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

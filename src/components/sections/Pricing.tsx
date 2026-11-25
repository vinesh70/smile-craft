"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/data/config";

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="pricing"
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--sc-bg-light)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            Membership Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
            style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
          >
            Transparent, Simple Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--sc-text-body)" }}
          >
            No hidden fees. No surprises. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ y: -4 }}
              className="relative flex flex-col rounded-3xl p-6 transition-shadow hover:shadow-2xl"
              style={
                plan.popular
                  ? { backgroundColor: "#0A1628", border: "2px solid #48CAE4" }
                  : { backgroundColor: "var(--sc-card-bg)", border: "1px solid var(--sc-card-border)" }
              }
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-white whitespace-nowrap"
                  style={{ backgroundColor: "#FF6B6B" }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="text-xl font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-fraunces, serif)",
                    color: plan.popular ? "white" : "var(--sc-text-heading)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: plan.popular ? "rgba(255,255,255,0.5)" : "var(--sc-text-body)" }}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl font-semibold"
                    style={{
                      fontFamily: "var(--font-fraunces, serif)",
                      color: plan.popular ? "white" : "var(--sc-text-heading)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ color: plan.popular ? "rgba(255,255,255,0.5)" : "var(--sc-text-body)" }}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0"
                      style={{ color: "#48CAE4" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: plan.popular ? "rgba(255,255,255,0.75)" : "var(--sc-text-body)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full rounded-2xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "#48CAE4" }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

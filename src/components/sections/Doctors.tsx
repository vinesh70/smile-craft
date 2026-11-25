"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { doctors } from "@/data/doctors";

export default function Doctors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="doctors"
      className="py-24"
      style={{ backgroundColor: "#0A1628" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold text-white"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            Meet Our Specialists
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-white/50 max-w-xl mx-auto"
          >
            Board-certified experts dedicated to your smile and comfort.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="group relative overflow-hidden rounded-3xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(72,202,228,0.15)",
              }}
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.style.background =
                      "linear-gradient(135deg, #0F4C5C, #48CAE4)";
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,22,40,0.95), transparent)",
                  }}
                >
                  <p className="text-sm text-white/80 leading-relaxed">
                    {doctor.bio}
                  </p>
                  <p
                    className="text-xs mt-2 font-medium"
                    style={{ color: "#48CAE4" }}
                  >
                    {doctor.patients.toLocaleString()} patients
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3
                  className="text-lg font-semibold text-white mb-0.5"
                  style={{ fontFamily: "var(--font-fraunces, serif)" }}
                >
                  {doctor.name}
                </h3>
                <p className="text-sm text-white/50 mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-xs text-white/30 mb-3">
                  {doctor.credentials}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5"
                      style={{
                        color:
                          j < Math.floor(doctor.rating)
                            ? "#FFD700"
                            : "rgba(255,255,255,0.2)",
                        fill:
                          j < Math.floor(doctor.rating)
                            ? "#FFD700"
                            : "transparent",
                      }}
                    />
                  ))}
                  <span className="text-xs text-white/40 ml-1">
                    {doctor.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

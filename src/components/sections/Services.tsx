"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Sparkles, Shield, Zap, Heart, Star, Diamond, ClipboardCheck, ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Sparkles, Shield, Zap, Heart, Star, Diamond, ClipboardCheck,
};

const categoryColors: Record<string, string> = {
  Cosmetic: "#FF6B6B",
  Restorative: "#48CAE4",
  Orthodontics: "#0F4C5C",
  General: "#2a9eba",
};

interface ServicesProps {
  onBookService: (serviceId: string) => void;
}

function ServiceCard({
  service, index, onBookService, large = false,
}: {
  service: (typeof services)[0];
  index: number;
  onBookService: (id: string) => void;
  large?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[service.icon] || Sparkles;
  const catColor = categoryColors[service.category] || "#48CAE4";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col rounded-3xl p-5 sm:p-6 overflow-hidden transition-shadow hover:shadow-2xl ${
        large ? "sm:row-span-2 sm:col-span-2" : ""
      }`}
      style={{
        backgroundColor: "var(--sc-card-bg)",
        border: "1px solid var(--sc-card-border)",
      }}
    >
      {/* Gradient hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${catColor}08, ${catColor}15)` }}
      />

      <div className="relative">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white mb-4"
          style={{ backgroundColor: catColor }}
        >
          {service.category}
        </span>

        <div
          className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${catColor}15` }}
        >
          <span style={{ color: catColor }}><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></span>
        </div>

        <h3
          className="text-base sm:text-lg font-semibold mb-2"
          style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
        >
          {service.name}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--sc-text-body)" }}>
          {service.description}
        </p>

        <div className="flex items-center justify-between text-xs mb-4" style={{ color: "var(--sc-text-body)" }}>
          <span>⏱ {service.duration}</span>
          <span className="font-semibold" style={{ color: catColor }}>{service.price}</span>
        </div>

        <button
          onClick={() => onBookService(service.id)}
          className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
          style={{ color: catColor }}
        >
          Book this service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Services({ onBookService }: ServicesProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="services"
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
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
          >
            Everything Your Smile Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--sc-text-body)" }}
          >
            From routine checkups to complete smile makeovers, we provide comprehensive dental care with cutting-edge technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onBookService={onBookService}
              large={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

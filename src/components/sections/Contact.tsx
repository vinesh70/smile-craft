"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { brand } from "@/data/brand";
import Toast from "@/components/ui/Toast";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [toastVisible, setToastVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
    setToastVisible(true);
  };

  return (
    <>
      <section
        ref={ref}
        id="contact"
        className="py-16 sm:py-24"
        style={{ backgroundColor: "var(--sc-bg-light)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#48CAE4" }}
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
              style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
            >
              Visit Us or Get in Touch
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left: Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                {[
                  { icon: MapPin, label: "Address", value: brand.address },
                  { icon: Phone, label: "Phone", value: brand.phone },
                  { icon: Mail, label: "Email", value: brand.email },
                  { icon: Clock, label: "Hours", value: "Mon–Fri: 9AM–8PM · Sat: 9AM–6PM" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: "var(--sc-card-bg)", border: "1px solid var(--sc-card-border)" }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl mb-2"
                      style={{ backgroundColor: "rgba(72,202,228,0.15)" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "#48CAE4" }} />
                    </div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--sc-text-body)" }}>{label}</p>
                    <p className="text-sm font-medium break-words" style={{ color: "var(--sc-text-heading)" }}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: "240px" }}>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.82,19.04,72.84,19.06&layer=mapnik"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="SmileCraft Dental Mumbai location"
                />
              </div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div
                className="rounded-3xl p-6 sm:p-8 h-full"
                style={{ backgroundColor: "var(--sc-card-bg)", border: "1px solid var(--sc-card-border)" }}
              >
                <h3
                  className="text-2xl font-semibold mb-6"
                  style={{ fontFamily: "var(--font-fraunces, serif)", color: "var(--sc-text-heading)" }}
                >
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                    { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--sc-text-body)" }}>
                        {label}
                      </label>
                      <input
                        required
                        type={type}
                        value={form[key as "name" | "email"]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors bg-transparent"
                        style={{
                          borderColor: "var(--sc-input-border)",
                          color: "var(--sc-text-heading)",
                        }}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--sc-text-body)" }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors resize-none bg-transparent"
                      style={{
                        borderColor: "var(--sc-input-border)",
                        color: "var(--sc-text-heading)",
                      }}
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-2xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.01]"
                    style={{ backgroundColor: "#0F4C5C" }}
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-center" style={{ color: "var(--sc-text-body)", opacity: 0.5 }}>
                    Demo: form submissions are not sent anywhere
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Toast
        message="Message sent! We'll get back to you within 24 hours."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}

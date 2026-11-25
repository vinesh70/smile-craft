"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { brand } from "@/data/brand";
import { services } from "@/data/services";
import Toast from "@/components/ui/Toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmail("");
      setToastVisible(true);
    }
  };

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0A1628" }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #48CAE4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0F4C5C 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Top section - large wordmark */}
          <div className="mb-12 pb-12 border-b border-white/10">
            <h2
              className="text-6xl sm:text-8xl font-semibold text-white/5 select-none"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              SmileCraft
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
                  <path
                    d="M40 8C28 8 18 16 18 28C18 32 19 36 20 40C22 50 24 64 30 68C32 70 34 70 36 68C37 66 38 62 40 62C42 62 43 66 44 68C46 70 48 70 50 68C56 64 58 50 60 40C61 36 62 32 62 28C62 16 52 8 40 8Z"
                    fill="#48CAE4"
                    fillOpacity="0.2"
                    stroke="#48CAE4"
                    strokeWidth="2.5"
                  />
                  <circle cx="34" cy="32" r="3" fill="#48CAE4" />
                  <circle cx="46" cy="32" r="3" fill="#48CAE4" />
                </svg>
                <span
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-fraunces, serif)" }}
                >
                  SmileCraft
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                {brand.tagline}. Premium dental care in Mumbai since 2006.
              </p>
              <div className="flex gap-3">
                {[
                  { label: "IG", href: brand.social.instagram },
                  { label: "FB", href: brand.social.facebook },
                  { label: "In", href: brand.social.linkedin },
                ].map(({ label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors text-xs font-semibold"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                Services
              </h3>
              <ul className="flex flex-col gap-2.5">
                {services.slice(0, 5).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo("#services")}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { href: "#about", label: "About Us" },
                  { href: "#doctors", label: "Our Doctors" },
                  { href: "#pricing", label: "Pricing" },
                  { href: "#testimonials", label: "Patient Reviews" },
                  { href: "#contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="flex flex-col gap-2 mb-6 text-sm text-white/50">
                <p>{brand.address}</p>
                <p>{brand.phone}</p>
                <p>{brand.email}</p>
              </div>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-mint/50"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#48CAE4" }}
                >
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} SmileCraft Dental. All rights
              reserved.
            </p>
            <p className="text-xs text-white/20">
              ⓘ Demo site — booking data stored in browser only, not sent anywhere
            </p>
          </div>
        </div>
      </footer>

      <Toast
        message="You're subscribed! Check your inbox for exclusive offers."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}

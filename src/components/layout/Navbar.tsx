"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, CalendarDays } from "lucide-react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import MyAppointments from "@/components/ui/MyAppointments";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#doctors", label: "Doctors" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  apptOpen?: boolean;
  onToggleAppt?: (open: boolean) => void;
}

export default function Navbar({ apptOpen: externalApptOpen, onToggleAppt }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalApptOpen, setInternalApptOpen] = useState(false);
  const apptOpen = externalApptOpen !== undefined ? externalApptOpen : internalApptOpen;
  const setApptOpen = (v: boolean) => {
    if (onToggleAppt) onToggleAppt(v);
    else setInternalApptOpen(v);
  };
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? isDark
              ? {
                  backgroundColor: "rgba(10, 22, 40, 0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderBottom: "1px solid rgba(72,202,228,0.12)",
                  boxShadow: "0 1px 20px rgba(0,0,0,0.3)",
                }
              : {
                  backgroundColor: "rgba(248, 245, 240, 0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderBottom: "1px solid rgba(15, 76, 92, 0.12)",
                  boxShadow: "0 1px 20px rgba(15,76,92,0.06)",
                }
            : {}
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* Logo — shrink-0 prevents compression on small screens */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex shrink-0 items-center gap-2 min-w-0"
              aria-label="SmileCraft home"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M40 8C28 8 18 16 18 28C18 32 19 36 20 40C22 50 24 64 30 68C32 70 34 70 36 68C37 66 38 62 40 62C42 62 43 66 44 68C46 70 48 70 50 68C56 64 58 50 60 40C61 36 62 32 62 28C62 16 52 8 40 8Z"
                  fill="#48CAE4"
                  fillOpacity="0.25"
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
              <span
                className="text-lg font-semibold tracking-tight transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-fraunces, serif)",
                  color: scrolled ? (isDark ? "#f8f5f0" : "#0F4C5C") : "#ffffff",
                }}
              >
                SmileCraft
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: scrolled ? (isDark ? "rgba(248,245,240,0.75)" : "rgba(15,76,92,0.75)") : "rgba(255,255,255,0.8)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#48CAE4")}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? (isDark ? "rgba(248,245,240,0.75)" : "rgba(15,76,92,0.75)") : "rgba(255,255,255,0.8)")}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex shrink-0 items-center gap-2">
              <DarkModeToggle />

              <button
                onClick={() => setApptOpen(true)}
                className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300"
                style={{ color: scrolled ? (isDark ? "#f8f5f0" : "#0F4C5C") : "rgba(255,255,255,0.85)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = scrolled ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(15,76,92,0.08)") : "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
              >
                <CalendarDays className="h-4 w-4" />
                <span className="hidden md:inline">My Visits</span>
              </button>

              <button
                onClick={() => scrollTo("#booking")}
                className="hidden sm:flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#FF6B6B" }}
              >
                Book Now
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex lg:hidden h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                style={{ backgroundColor: scrolled ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(15,76,92,0.08)") : "rgba(255,255,255,0.15)" }}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" style={{ color: scrolled ? (isDark ? "#f8f5f0" : "#0F4C5C") : "#ffffff" }} />
                ) : (
                  <Menu className="h-5 w-5" style={{ color: scrolled ? (isDark ? "#f8f5f0" : "#0F4C5C") : "#ffffff" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#0A1628" }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-white/10"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-fraunces, serif)" }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="flex flex-col gap-3 mt-4 w-full max-w-xs"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setApptOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 py-3 text-white font-medium"
                >
                  <CalendarDays className="h-4 w-4" />
                  My Appointments
                </button>
                <button
                  onClick={() => scrollTo("#booking")}
                  className="rounded-2xl py-3 text-white font-semibold"
                  style={{ backgroundColor: "#FF6B6B" }}
                >
                  Book Appointment
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <MyAppointments isOpen={apptOpen} onClose={() => setApptOpen(false)} />
    </>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Sparkles,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { bookingConfig } from "@/data/config";
import { createAppointment, isSlotBooked } from "@/lib/storage";
import { getTimeSlotsForDate, isDateAvailable } from "@/lib/calendar";
import { formatDate, formatTime, downloadICS } from "@/lib/utils";
import type { Appointment } from "@/types";

const patientSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  patientEmail: z.string().email("Please enter a valid email"),
  patientPhone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Invalid phone format"),
  patientNotes: z.string().optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to continue" }),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface BookingState {
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
}

const STEPS = [
  { label: "Service", icon: Sparkles },
  { label: "Doctor", icon: Stethoscope },
  { label: "Date", icon: Calendar },
  { label: "Time", icon: Clock },
  { label: "Details", icon: User },
  { label: "Confirm", icon: Check },
];

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 w-full px-2">
      {STEPS.map((step, i) => {
        const StepIcon = step.icon;
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={i} className="flex items-center min-w-0">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isComplete
                    ? "bg-teal text-white"
                    : isCurrent
                    ? "border-2 text-teal"
                    : "bg-black/5 dark:bg-white/5 text-black/30 dark:text-white/30"
                }`}
                style={
                  isComplete
                    ? { backgroundColor: "#0F4C5C" }
                    : isCurrent
                    ? {
                        borderColor: "#0F4C5C",
                        color: "#0F4C5C",
                        border: "2px solid #0F4C5C",
                      }
                    : {}
                }
              >
                {isComplete ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <StepIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </div>
              <span
                className={`text-xs mt-1 hidden sm:block ${
                  isCurrent
                    ? "font-semibold"
                    : isComplete
                    ? "text-black/60 dark:text-white/60"
                    : "text-black/30 dark:text-white/30"
                }`}
                style={isCurrent ? { color: "#0F4C5C" } : {}}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-3 sm:w-10 mx-0.5 sm:mx-2 mt-[-18px] sm:mt-[-20px] shrink-0 transition-all duration-500 ${
                  isComplete ? "" : "bg-black/10 dark:bg-white/10"
                }`}
                style={isComplete ? { backgroundColor: "#0F4C5C" } : {}}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CalendarPicker({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [hovered, setHovered] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days: Array<{ date: Date | null; available: boolean }> = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push({ date: null, available: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(viewYear, viewMonth, d);
    days.push({ date, available: isDateAvailable(date) });
  }

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "1rem",
        padding: "1rem",
        maxWidth: "360px",
        margin: "0 auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Month navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          style={{
            padding: "6px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronLeft style={{ width: 18, height: 18, color: "#555" }} />
        </button>
        <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1a1a1a" }}>{monthName}</span>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          style={{
            padding: "6px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.05)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronRight style={{ width: 18, height: 18, color: "#555" }} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px", marginBottom: "6px" }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "rgba(0,0,0,0.4)",
              padding: "4px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px" }}>
        {days.map((day, i) => {
          if (!day.date) return <div key={`empty-${i}`} />;

          const dateStr = day.date.toISOString().split("T")[0];
          const isSelected = dateStr === selectedDate;
          const isToday = day.date.toDateString() === new Date().toDateString();
          const isHov = hovered === dateStr && day.available && !isSelected;

          let bg = "transparent";
          let color = day.available ? "#1a1a1a" : "rgba(0,0,0,0.25)";
          let border = "none";
          let fontWeight: number | string = isToday ? 700 : 400;

          if (isSelected) {
            bg = "#0F4C5C";
            color = "#ffffff";
            fontWeight = 700;
          } else if (isHov) {
            bg = "rgba(72,202,228,0.15)";
            color = "#0F4C5C";
          } else if (isToday && !isSelected) {
            border = "2px solid #48CAE4";
          }

          return (
            <button
              key={dateStr}
              onClick={() => day.available && onSelectDate(dateStr)}
              onMouseEnter={() => setHovered(dateStr)}
              onMouseLeave={() => setHovered(null)}
              disabled={!day.available}
              aria-label={`${day.available ? "Select" : "Unavailable"} ${dateStr}`}
              aria-pressed={isSelected}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                fontSize: "0.8rem",
                fontWeight,
                backgroundColor: bg,
                color,
                border,
                cursor: day.available ? "pointer" : "not-allowed",
                transition: "all 0.15s ease",
                outline: "none",
                padding: 0,
                minWidth: 0,
              }}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuccessScreen({
  appointment,
  onViewAppointments,
}: {
  appointment: Appointment;
  onViewAppointments: () => void;
}) {
  useEffect(() => {
    const loadConfetti = async () => {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0F4C5C", "#48CAE4", "#FF6B6B", "#F8F5F0"],
      });
    };
    loadConfetti();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.2 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: "rgba(72, 202, 228, 0.1)" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#0F4C5C" }}
        >
          <Check className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3
          className="text-3xl font-semibold text-gray-900 dark:text-white mb-2"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Appointment Confirmed!
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Your booking reference is
        </p>

        <div
          className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 mb-8 font-mono text-lg font-bold"
          style={{
            backgroundColor: "rgba(15, 76, 92, 0.08)",
            color: "#0F4C5C",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#48CAE4" }}
          />
          {appointment.id}
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 mb-6 text-left max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-black/40 dark:text-white/40">Service</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {appointment.service}
              </p>
            </div>
            <div>
              <p className="text-black/40 dark:text-white/40">Doctor</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {appointment.doctorName}
              </p>
            </div>
            <div>
              <p className="text-black/40 dark:text-white/40">Date</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {formatDate(appointment.date)}
              </p>
            </div>
            <div>
              <p className="text-black/40 dark:text-white/40">Time</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {formatTime(appointment.time)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => downloadICS(appointment)}
            className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#0F4C5C" }}
          >
            <Download className="w-4 h-4" />
            Add to Calendar
          </button>
          <button
            onClick={onViewAppointments}
            className="flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-all hover:bg-black/5"
            style={{ borderColor: "#0F4C5C", color: "#0F4C5C" }}
          >
            View My Appointments
          </button>
        </div>

        <p className="text-xs text-black/30 dark:text-white/30 mt-6">
          A confirmation email would be sent in a real app. Demo only —
          data stored locally in your browser.
        </p>
      </motion.div>
    </motion.div>
  );
}

interface BookingProps {
  preselectedService?: string;
  onOpenMyAppointments?: () => void;
}

export default function Booking({
  preselectedService,
  onOpenMyAppointments,
}: BookingProps) {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingState>({
    serviceId: preselectedService || "",
    doctorId: "",
    date: "",
    time: "",
  });
  const [timeSlots, setTimeSlots] = useState<
    Array<{ time: string; available: boolean }>
  >([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] =
    useState<Appointment | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  useEffect(() => {
    if (preselectedService) {
      setBooking((b) => ({ ...b, serviceId: preselectedService }));
      if (step === 0) setStep(0);
    }
  }, [preselectedService, step]);

  const loadTimeSlots = useCallback(
    async (date: string, doctorId: string) => {
      setLoadingSlots(true);
      try {
        const { getAppointments } = await import("@/lib/storage");
        const appointments = await getAppointments();
        const booked = appointments
          .filter(
            (a) =>
              a.date === date &&
              a.status === "confirmed" &&
              (doctorId === "any" || a.doctorId === doctorId)
          )
          .map((a) => a.time);

        const dateObj = new Date(date + "T00:00:00");
        const slots = getTimeSlotsForDate(dateObj, booked);
        setTimeSlots(slots);
      } finally {
        setLoadingSlots(false);
      }
    },
    []
  );

  useEffect(() => {
    if (step === 3 && booking.date && booking.doctorId) {
      loadTimeSlots(booking.date, booking.doctorId);
    }
  }, [step, booking.date, booking.doctorId, loadTimeSlots]);

  const selectedService = services.find((s) => s.id === booking.serviceId);
  const selectedDoctor =
    booking.doctorId === "any"
      ? { id: "any", name: "Any Available Doctor" }
      : doctors.find((d) => d.id === booking.doctorId);

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const goNext = () => {
    setError(null);
    setStep((s) => s + 1);
  };

  const onSubmitDetails = async (formData: PatientFormData) => {
    if (!selectedService || !selectedDoctor || !booking.date || !booking.time)
      return;
    setStep(5);
    setBooking((b) => ({ ...b }));

    // Store form data for submission
    (window as unknown as Record<string, unknown>).__smilecraft_form__ =
      formData;
  };

  const onConfirm = async () => {
    const formData = (
      window as unknown as Record<string, unknown>
    ).__smilecraft_form__ as PatientFormData | undefined;
    if (!formData || !selectedService || !selectedDoctor) return;

    setSubmitting(true);
    setError(null);

    try {
      // Check slot still available
      const docId =
        booking.doctorId === "any" ? doctors[0].id : booking.doctorId;
      const taken = await isSlotBooked(docId, booking.date, booking.time);
      if (taken) {
        setError(
          "This slot was just booked by someone else. Please choose another time."
        );
        setStep(3);
        return;
      }

      const appt = await createAppointment({
        service: selectedService.name,
        serviceId: booking.serviceId,
        doctorId: docId,
        doctorName:
          booking.doctorId === "any"
            ? doctors[0].name
            : selectedDoctor.name || "",
        date: booking.date,
        time: booking.time,
        patient: {
          name: formData.patientName,
          email: formData.patientEmail,
          phone: formData.patientPhone,
          notes: formData.patientNotes || "",
          consent: formData.consent,
        },
      });

      setConfirmedAppointment(appt);
    } catch (err) {
      const e = err as Error;
      if (e.message === "SLOT_TAKEN") {
        setError(
          "This slot was just booked by someone else. Please choose another time."
        );
        setStep(3);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      id="booking"
      className="py-24 px-4"
      style={{ backgroundColor: "#F8F5F0" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#48CAE4" }}
          >
            Easy Booking
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            Book Your Appointment
          </motion.h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Schedule your visit in under 2 minutes. No phone calls needed.
          </p>
        </div>

        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: "white" }}
        >
          <div className="p-6 sm:p-8">
            {confirmedAppointment ? (
              <SuccessScreen
                appointment={confirmedAppointment}
                onViewAppointments={() => onOpenMyAppointments?.()}
              />
            ) : (
              <>
                <StepIndicator currentStep={step} totalSteps={STEPS.length} />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-xl border p-4 mb-6 text-sm"
                    style={{
                      borderColor: "#FF6B6B",
                      backgroundColor: "rgba(255, 107, 107, 0.05)",
                      color: "#c0392b",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <AnimatePresence mode="wait" custom={1}>
                  <motion.div
                    key={step}
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Step 0: Select Service */}
                    {step === 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          What service do you need?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => {
                                setBooking((b) => ({
                                  ...b,
                                  serviceId: service.id,
                                }));
                                goNext();
                              }}
                              className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                                booking.serviceId === service.id
                                  ? "border-teal bg-teal/5"
                                  : "border-black/10 hover:border-black/20"
                              }`}
                              style={
                                booking.serviceId === service.id
                                  ? {
                                      borderColor: "#0F4C5C",
                                      backgroundColor:
                                        "rgba(15, 76, 92, 0.05)",
                                    }
                                  : {}
                              }
                            >
                              <p className="font-semibold text-gray-800 text-sm mb-1">
                                {service.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {service.duration} · {service.price}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 1: Select Doctor */}
                    {step === 1 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Choose your doctor
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              setBooking((b) => ({ ...b, doctorId: "any" }));
                              goNext();
                            }}
                            className="text-left p-4 rounded-2xl border-2 border-dashed border-black/20 hover:border-teal/50 transition-all"
                          >
                            <p className="font-semibold text-gray-800 text-sm">
                              Any Available Doctor
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Best availability
                            </p>
                          </button>
                          {doctors.map((doctor) => (
                            <button
                              key={doctor.id}
                              onClick={() => {
                                setBooking((b) => ({
                                  ...b,
                                  doctorId: doctor.id,
                                }));
                                goNext();
                              }}
                              className="text-left p-4 rounded-2xl border-2 border-black/10 hover:border-teal/50 transition-all flex gap-3"
                            >
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-full object-cover shrink-0"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%2348CAE4' fill-opacity='0.3'/%3E%3C/svg%3E";
                                }}
                              />
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">
                                  {doctor.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {doctor.specialty}
                                </p>
                                <p className="text-xs text-yellow-500 mt-0.5">
                                  {"★".repeat(5)} {doctor.rating}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={goBack}
                          className="mt-4 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                      </div>
                    )}

                    {/* Step 2: Pick Date */}
                    {step === 2 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Select a date
                        </h3>
                        <CalendarPicker
                          selectedDate={booking.date}
                          onSelectDate={(date) => {
                            setBooking((b) => ({ ...b, date }));
                            goNext();
                          }}
                        />
                        <p className="text-xs text-center text-gray-400 mt-3">
                          Available Mon–Sat, next 60 days. Sundays closed.
                        </p>
                        <button
                          onClick={goBack}
                          className="mt-4 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                      </div>
                    )}

                    {/* Step 3: Pick Time */}
                    {step === 3 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          Pick a time slot
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          {booking.date
                            ? formatDate(booking.date)
                            : ""}
                        </p>
                        {loadingSlots ? (
                          <div className="flex justify-center py-8">
                            <span style={{ color: "#48CAE4" }}>
                              <Loader2 className="w-8 h-8 animate-spin" />
                            </span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {timeSlots.map(({ time, available }) => (
                              <button
                                key={time}
                                onClick={() => {
                                  if (!available) return;
                                  setBooking((b) => ({ ...b, time }));
                                  goNext();
                                }}
                                disabled={!available}
                                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  !available
                                    ? "bg-black/5 text-black/20 cursor-not-allowed line-through"
                                    : booking.time === time
                                    ? "text-white"
                                    : "bg-black/5 text-gray-700 hover:bg-teal/10 hover:text-teal"
                                }`}
                                style={
                                  booking.time === time && available
                                    ? { backgroundColor: "#0F4C5C" }
                                    : {}
                                }
                              >
                                {formatTime(time)}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-4 mt-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-sm bg-black/5 inline-block" />
                            Unavailable
                          </span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-3 h-3 rounded-sm inline-block"
                              style={{ backgroundColor: "#0F4C5C" }}
                            />
                            Selected
                          </span>
                        </div>
                        <button
                          onClick={goBack}
                          className="mt-4 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                      </div>
                    )}

                    {/* Step 4: Patient Details */}
                    {step === 4 && (
                      <form onSubmit={handleSubmit(onSubmitDetails)}>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Your details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              {...register("patientName")}
                              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 transition-all ${
                                errors.patientName
                                  ? "border-red-400 bg-red-50"
                                  : "border-black/10 focus:border-teal"
                              }`}
                              style={
                                !errors.patientName
                                  ? {
                                      outlineColor: "#48CAE4",
                                    }
                                  : {}
                              }
                              placeholder="Jane Smith"
                            />
                            {errors.patientName && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.patientName.message}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                              </label>
                              <input
                                {...register("patientEmail")}
                                type="email"
                                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
                                  errors.patientEmail
                                    ? "border-red-400 bg-red-50"
                                    : "border-black/10"
                                }`}
                                placeholder="jane@example.com"
                              />
                              {errors.patientEmail && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors.patientEmail.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone *
                              </label>
                              <input
                                {...register("patientPhone")}
                                type="tel"
                                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
                                  errors.patientPhone
                                    ? "border-red-400 bg-red-50"
                                    : "border-black/10"
                                }`}
                                placeholder="+1 (555) 000-0000"
                              />
                              {errors.patientPhone && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors.patientPhone.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Notes (optional)
                            </label>
                            <textarea
                              {...register("patientNotes")}
                              className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none resize-none"
                              rows={3}
                              placeholder="Any medical conditions, allergies, or special requests..."
                            />
                          </div>

                          <div className="flex gap-3 items-start">
                            <input
                              {...register("consent")}
                              type="checkbox"
                              id="consent"
                              className="mt-0.5 w-4 h-4 cursor-pointer"
                            />
                            <label
                              htmlFor="consent"
                              className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                            >
                              I agree to SmileCraft&apos;s{" "}
                              <span
                                className="underline"
                                style={{ color: "#0F4C5C" }}
                              >
                                Terms of Service
                              </span>{" "}
                              and{" "}
                              <span
                                className="underline"
                                style={{ color: "#0F4C5C" }}
                              >
                                Privacy Policy
                              </span>
                              . This is a demo — no real data is collected.
                            </label>
                          </div>
                          {errors.consent && (
                            <p className="text-xs text-red-500">
                              {errors.consent.message}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button
                            type="button"
                            onClick={goBack}
                            className="flex items-center gap-1 rounded-full border border-black/20 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-black/5 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
                            style={{ backgroundColor: "#0F4C5C" }}
                          >
                            Review Booking
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Step 5: Review */}
                    {step === 5 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Review your booking
                        </h3>

                        <div className="rounded-2xl border border-black/10 p-5 mb-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs text-black/40 uppercase tracking-wide font-semibold mb-1">
                                Service
                              </p>
                              <p className="font-semibold text-gray-800">
                                {selectedService?.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {selectedService?.duration} ·{" "}
                                {selectedService?.price}
                              </p>
                            </div>
                            <span
                              className="text-xs rounded-full px-3 py-1 font-medium"
                              style={{
                                backgroundColor: "rgba(72, 202, 228, 0.15)",
                                color: "#0F4C5C",
                              }}
                            >
                              {selectedService?.category}
                            </span>
                          </div>

                          <div className="border-t border-black/5 pt-4">
                            <p className="text-xs text-black/40 uppercase tracking-wide font-semibold mb-1">
                              Doctor
                            </p>
                            <p className="font-semibold text-gray-800">
                              {selectedDoctor?.name}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-4">
                            <div>
                              <p className="text-xs text-black/40 uppercase tracking-wide font-semibold mb-1">
                                Date
                              </p>
                              <p className="font-medium text-gray-700 text-sm">
                                {booking.date ? formatDate(booking.date) : ""}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-black/40 uppercase tracking-wide font-semibold mb-1">
                                Time
                              </p>
                              <p className="font-medium text-gray-700 text-sm">
                                {booking.time ? formatTime(booking.time) : ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-center text-gray-400 mb-6">
                          📍 42, Linking Road, Bandra West, Mumbai 400050
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={goBack}
                            className="flex items-center gap-1 rounded-full border border-black/20 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-black/5 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={onConfirm}
                            disabled={submitting}
                            className="flex-1 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "#FF6B6B" }}
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Confirming...
                              </>
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                Confirm Appointment
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Demo only — booking data is stored locally in your browser and
          never sent to a server.
        </p>
      </div>
    </section>
  );
}

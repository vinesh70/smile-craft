"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, AlertTriangle, Download } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { formatDate, formatTime, downloadICS } from "@/lib/utils";

interface MyAppointmentsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyAppointments({ isOpen, onClose }: MyAppointmentsProps) {
  const { upcoming, loading, cancel } = useAppointments();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    try {
      await cancel(id);
    } finally {
      setCancellingId(null);
      setConfirmId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[201] h-full w-full max-w-md overflow-y-auto bg-cream dark:bg-dark shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
              <div>
                <h2
                  className="text-2xl font-semibold text-teal dark:text-cream"
                  style={{ fontFamily: "var(--font-fraunces, serif)" }}
                >
                  My Appointments
                </h2>
                <p className="text-sm text-teal/60 dark:text-cream/60 mt-0.5">
                  {upcoming.length} upcoming visit{upcoming.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex flex-col gap-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-32 rounded-2xl animate-pulse"
                      style={{ backgroundColor: "rgba(72,202,228,0.1)" }}
                    />
                  ))}
                </div>
              ) : upcoming.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="mb-4 opacity-30"
                  >
                    <path
                      d="M40 8C28 8 18 16 18 28C18 32 19 36 20 40C22 50 24 64 30 68C32 70 34 70 36 68C37 66 38 62 40 62C42 62 43 66 44 68C46 70 48 70 50 68C56 64 58 50 60 40C61 36 62 32 62 28C62 16 52 8 40 8Z"
                      stroke="#0F4C5C"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </svg>
                  <p className="text-lg font-medium text-teal/60 dark:text-cream/60">
                    No upcoming appointments
                  </p>
                  <p className="text-sm text-teal/40 dark:text-cream/40 mt-1">
                    Book your first visit below
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#0F4C5C" }}
                  >
                    Book Appointment
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {upcoming.map((appt) => (
                    <motion.div
                      key={appt.id}
                      layout
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: "rgba(72,202,228,0.2)",
                        backgroundColor: "rgba(72,202,228,0.05)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p
                            className="font-semibold text-teal dark:text-cream"
                            style={{ fontFamily: "var(--font-fraunces, serif)" }}
                          >
                            {appt.service}
                          </p>
                          <p className="text-xs text-teal/60 dark:text-cream/60 mt-0.5">
                            Ref: {appt.id}
                          </p>
                        </div>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                          style={{ backgroundColor: "#48CAE4" }}
                        >
                          Confirmed
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-4">
                        <div className="flex items-center gap-2 text-sm text-teal/70 dark:text-cream/70">
                          <User className="h-3.5 w-3.5" />
                          <span>{appt.doctorName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-teal/70 dark:text-cream/70">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(appt.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-teal/70 dark:text-cream/70">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formatTime(appt.time)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadICS(appt)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium transition-colors"
                          style={{
                            border: "1px solid rgba(72,202,228,0.3)",
                            color: "#48CAE4",
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Add to Calendar
                        </button>
                        {confirmId === appt.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleCancel(appt.id)}
                              disabled={cancellingId === appt.id}
                              className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                              style={{ backgroundColor: "#FF6B6B" }}
                            >
                              <AlertTriangle className="h-3 w-3" />
                              {cancellingId === appt.id
                                ? "Cancelling..."
                                : "Confirm Cancel"}
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="rounded-xl px-3 py-2 text-xs font-medium text-teal/60 hover:text-teal"
                            >
                              Keep
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmId(appt.id)}
                            className="rounded-xl px-3 py-2 text-sm font-medium text-red-400 hover:text-red-600 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <p className="mt-6 text-center text-xs text-teal/40 dark:text-cream/40">
                ⓘ Demo: appointments are stored in your browser only
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

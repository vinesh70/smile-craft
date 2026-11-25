"use client";
import { useState, useEffect, useCallback } from "react";
import { Appointment } from "@/types";
import {
  getAppointments,
  cancelAppointment,
  seedDemoAppointments,
} from "@/lib/storage";
import { bookingConfig } from "@/data/config";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    seedDemoAppointments().then(refresh);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === bookingConfig.storageKey) {
        refresh();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refresh]);

  const cancel = useCallback(
    async (id: string) => {
      await cancelAppointment(id);
      await refresh();
    },
    [refresh]
  );

  const upcoming = appointments.filter(
    (a) =>
      a.status === "confirmed" &&
      new Date(a.date + "T" + a.time) >= new Date()
  );

  return { appointments, upcoming, loading, refresh, cancel };
}

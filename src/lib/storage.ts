import { Appointment } from "@/types";
import { bookingConfig } from "@/data/config";

const STORAGE_KEY = bookingConfig.storageKey;
const SEED_KEY = "smilecraft:seeded:v1";

function safeGetStorage(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

function safeSetStorage(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch {
    console.warn("SmileCraft: localStorage unavailable or full");
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  await new Promise((r) => setTimeout(r, 50));
  return safeGetStorage();
}

export async function createAppointment(
  data: Omit<Appointment, "id" | "createdAt" | "status">
): Promise<Appointment> {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));
  const appointments = safeGetStorage();
  const conflict = appointments.find(
    (a) =>
      a.doctorId === data.doctorId &&
      a.date === data.date &&
      a.time === data.time &&
      a.status === "confirmed"
  );
  if (conflict) {
    throw new Error("SLOT_TAKEN");
  }
  const appointment: Appointment = {
    ...data,
    id: `SMILE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  safeSetStorage([...appointments, appointment]);
  return appointment;
}

export async function cancelAppointment(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  const appointments = safeGetStorage();
  const updated = appointments.map((a) =>
    a.id === id ? { ...a, status: "cancelled" as const } : a
  );
  safeSetStorage(updated);
}

export async function isSlotBooked(
  doctorId: string,
  date: string,
  time: string
): Promise<boolean> {
  const appointments = safeGetStorage();
  return appointments.some(
    (a) =>
      a.doctorId === doctorId &&
      a.date === date &&
      a.time === time &&
      a.status === "confirmed"
  );
}

export async function seedDemoAppointments(): Promise<void> {
  try {
    if (localStorage.getItem(SEED_KEY)) return;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const demos: Appointment[] = [
      {
        id: "SMILE-DEMO01",
        service: "Teeth Whitening",
        serviceId: "teeth-whitening",
        doctorId: "dr-sarah-chen",
        doctorName: "Dr. Sarah Chen",
        date: tomorrow.toISOString().split("T")[0],
        time: "10:00",
        patient: {
          name: "Demo Patient",
          email: "demo@example.com",
          phone: "555-0100",
          consent: true,
        },
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
      {
        id: "SMILE-DEMO02",
        service: "General Checkup",
        serviceId: "checkup",
        doctorId: "dr-aisha-patel",
        doctorName: "Dr. Aisha Patel",
        date: dayAfter.toISOString().split("T")[0],
        time: "14:00",
        patient: {
          name: "Demo Patient 2",
          email: "demo2@example.com",
          phone: "555-0101",
          consent: true,
        },
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
    ];

    const existing = safeGetStorage();
    safeSetStorage([...existing, ...demos]);
    localStorage.setItem(SEED_KEY, "true");
  } catch {
    // ignore
  }
}

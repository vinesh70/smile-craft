import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Appointment } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateICSFile(appointment: Appointment): string {
  const startDate = new Date(`${appointment.date}T${appointment.time}:00`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SmileCraft Dental//EN",
    "BEGIN:VEVENT",
    `UID:${appointment.id}@smilecraft.dental`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(startDate)}`,
    `DTEND:${fmt(endDate)}`,
    `SUMMARY:SmileCraft Dental - ${appointment.service}`,
    `DESCRIPTION:Doctor: ${appointment.doctorName}\\nService: ${appointment.service}\\nRef: ${appointment.id}`,
    "LOCATION:123 Bright Smile Ave\\, San Francisco\\, CA",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return ics;
}

export function downloadICS(appointment: Appointment): void {
  const ics = generateICSFile(appointment);
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `smilecraft-${appointment.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

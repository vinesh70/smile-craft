import { bookingConfig } from "@/data/config";

export function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i <= bookingConfig.maxDaysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (!bookingConfig.closedDays.includes(date.getDay())) {
      dates.push(date);
    }
  }
  return dates;
}

export function isDateAvailable(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return false;
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + bookingConfig.maxDaysAhead);
  if (date > maxDate) return false;
  return !bookingConfig.closedDays.includes(date.getDay());
}

export function getTimeSlotsForDate(
  date: Date,
  bookedSlots: string[]
): Array<{ time: string; available: boolean }> {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  return bookingConfig.slotsPerDay.map((time) => {
    if (bookedSlots.includes(time)) {
      return { time, available: false };
    }
    if (isToday) {
      const [h, m] = time.split(":").map(Number);
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      if (slotDate <= now) {
        return { time, available: false };
      }
    }
    return { time, available: true };
  });
}

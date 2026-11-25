# SmileCraft Dental 🦷

**Premium, 2026-style dental clinic landing page with a fully functional frontend booking system.**

> Live data is stored only in the visitor's browser (`localStorage`). Nothing is sent to a server. This is a frontend demo.

---

## Quick Start

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # static export → ./out
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, dark mode init, JSON-LD schema
│   ├── page.tsx            # Main page: all sections composed here
│   ├── globals.css         # Tailwind v4 @theme config, custom animations, glass utilities
│   └── not-found.tsx       # Custom 404 page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with glass blur, mobile overlay, dark mode toggle
│   │   └── Footer.tsx      # Brand wordmark, links, newsletter input
│   ├── sections/
│   │   ├── Hero.tsx        # Full-height hero with text reveal, stats, floating cards
│   │   ├── TrustBar.tsx    # Infinite marquee of certifications & partners
│   │   ├── Services.tsx    # Bento grid of 7 service cards
│   │   ├── About.tsx       # Story + animated count-up numbers
│   │   ├── BeforeAfter.tsx # Interactive drag slider for before/after comparison
│   │   ├── Doctors.tsx     # Team cards with hover reveal
│   │   ├── Process.tsx     # Scroll-triggered 4-step timeline
│   │   ├── Testimonials.tsx# Auto-advancing carousel with star ratings
│   │   ├── Pricing.tsx     # 3 plan cards with featured highlight
│   │   ├── FAQ.tsx         # Animated accordion
│   │   ├── Booking.tsx     # ⭐ 7-step booking flow (the main feature)
│   │   └── Contact.tsx     # Address, hours, map embed
│   └── ui/
│       ├── Preloader.tsx   # Animated logo preloader (2.2s)
│       ├── CustomCursor.tsx# Custom cursor (desktop/fine-pointer only)
│       ├── ScrollProgress.tsx # Thin progress bar at top
│       ├── DarkModeToggle.tsx # Light/dark toggle with persistence
│       ├── MyAppointments.tsx # Slide-in drawer listing booked appointments
│       └── Toast.tsx       # Success notification
├── data/
│   ├── brand.ts            # Clinic name, tagline, contact, stats
│   ├── services.ts         # 7 dental services with icons, pricing, duration
│   ├── doctors.ts          # 4 doctors with photos, specialties, bios
│   └── config.ts           # Booking config, pricing plans, FAQs, testimonials
├── lib/
│   ├── storage.ts          # ⭐ localStorage data layer (async, drop-in replaceable)
│   ├── utils.ts            # cn(), formatDate(), formatTime(), downloadICS()
│   └── calendar.ts         # Date availability helpers, time slot generation
├── hooks/
│   ├── useAppointments.ts  # Appointments state + cross-tab sync
│   └── useMediaQuery.ts    # Responsive helper
└── types/
    └── index.ts            # Appointment, Service, Doctor, TimeSlot types
```

---

## Booking System

### How it works

The booking flow has 7 steps:

1. **Service** – choose from 7 dental services
2. **Doctor** – choose a specific doctor or "Any available"
3. **Date** – custom calendar (past dates, Sundays, and dates > 60 days disabled)
4. **Time** – grid of 21 slots; booked and past slots are disabled
5. **Details** – name, email, phone, notes, consent (validated with Zod)
6. **Review** – summary before confirming
7. **Success** – booking ID (`SMILE-XXXXXX`), confetti, "Add to Calendar" button

### localStorage Data Layer (`src/lib/storage.ts`)

All storage is wrapped in async functions that return Promises — designed to be swapped for real API calls without touching the UI:

```typescript
getAppointments(): Promise<Appointment[]>
createAppointment(data): Promise<Appointment>
cancelAppointment(id): Promise<void>
isSlotBooked(doctorId, date, time): Promise<boolean>
seedDemoAppointments(): Promise<void>
```

**Double-booking prevention:** `createAppointment` re-checks slot availability right before saving. If another tab grabbed the slot first, it throws `"SLOT_TAKEN"` and the UI sends the user back to step 3.

**Cross-tab sync:** `useAppointments` hook listens to the `storage` event so slot availability updates live in all open tabs.

**Demo data:** `seedDemoAppointments()` seeds 2 bookings on first load so the calendar visibly shows taken slots.

Storage key: `smilecraft:appointments:v1`

---

## Customization

### Brand (`src/data/brand.ts`)
Change clinic name, tagline, contact info, social links, and stats.

### Services (`src/data/services.ts`)
Add, remove, or edit services. Each service has: `id`, `name`, `description`, `icon` (Lucide icon name), `duration`, `price`, `category`.

### Doctors (`src/data/doctors.ts`)
Update doctor profiles: name, specialty, credentials, image URL, bio, rating, patient count.

### Time slots (`src/data/config.ts`)
- `slotsPerDay` – array of `"HH:MM"` strings for available times
- `closedDays` – array of day numbers (0 = Sunday, 6 = Saturday)
- `maxDaysAhead` – how many days forward bookings are accepted (default: 60)

### Colors (`src/app/globals.css`)
Brand colors are defined in the `@theme` block:
```css
@theme {
  --color-teal: #0F4C5C;
  --color-mint: #48CAE4;
  --color-coral: #FF6B6B;
  --color-cream: #F8F5F0;
  --color-dark: #0A1628;
}
```

---

## Swapping to a Real Backend

Replace the functions in `src/lib/storage.ts` with API calls. The UI layer (`Booking.tsx`, `MyAppointments.tsx`) calls these exact function signatures and handles both success and error — no UI changes needed:

```typescript
// Before (localStorage):
export async function createAppointment(data) {
  await delay(600);
  localStorage.setItem(KEY, JSON.stringify([...existing, appt]));
  return appt;
}

// After (real API):
export async function createAppointment(data) {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('SLOT_TAKEN');
  return res.json();
}
```

---

## Stack

| Layer | Library | Version |
|---|---|---|
| Framework | Next.js (App Router, static export) | 16.4.6 |
| Language | TypeScript | 5.x |
| Styles | Tailwind CSS v4 | 4.3.3 |
| Animation | Framer Motion | 14.x |
| Smooth scroll | Lenis | 1.3.x |
| Forms | React Hook Form + Zod | 7.x + 4.x |
| Icons | Lucide React | 1.80.x |
| Confetti | canvas-confetti | 1.9.x |

---

## Image Credits

Photos from [Unsplash](https://unsplash.com) (free to use under the Unsplash License):
- Dental clinic interior: `photo-1606811841689-23dfddce3e95`
- Doctor portraits: various Unsplash medical professional photos

---

## Demo Note

This is a frontend-only demo. All booking data is stored in `localStorage` in the visitor's browser. No data is transmitted to any server. Clearing browser data or opening in a private window resets all appointments.

---

*Built with [Claude Code](https://claude.com/claude-code)*

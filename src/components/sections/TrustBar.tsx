"use client";

const partners = [
  "IDA Member",
  "NABH Certified",
  "ISO 9001:2015",
  "Star Health Partner",
  "HDFC ERGO",
  "Bajaj Allianz",
  "Apollo Dental",
  "NMC Registered",
  "ISOI Certified",
  "MCI Approved",
];

export default function TrustBar() {
  const doubled = [...partners, ...partners];

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{
        backgroundColor: "var(--sc-trustbar-bg)",
        borderColor: "rgba(72, 202, 228, 0.15)",
      }}
    >
      <div
        className="flex items-center gap-12 whitespace-nowrap"
        style={{ animation: "marquee 25s linear infinite" }}
      >
        {doubled.map((partner, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#48CAE4" strokeWidth="1.5" />
              <path
                d="M5 8l2 2 4-4"
                stroke="#48CAE4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--sc-text-heading)" }}
            >
              {partner}
            </span>
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
        style={{
          background: "linear-gradient(to right, var(--sc-trustbar-fade), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
        style={{
          background: "linear-gradient(to left, var(--sc-trustbar-fade), transparent)",
        }}
      />
    </div>
  );
}

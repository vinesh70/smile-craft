import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    description:
      "Professional-grade whitening that brightens your smile by up to 8 shades in a single session.",
    icon: "Sparkles",
    duration: "60 min",
    price: "From ₹2,499",
    category: "Cosmetic",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    description:
      "Permanent, natural-looking tooth replacements that restore full function and confidence.",
    icon: "Shield",
    duration: "2-3 sessions",
    price: "From ₹24,999",
    category: "Restorative",
  },
  {
    id: "braces-aligners",
    name: "Braces & Aligners",
    description:
      "Straighten your teeth discreetly with our advanced clear aligner technology.",
    icon: "Zap",
    duration: "12-18 months",
    price: "From ₹34,999",
    category: "Orthodontics",
  },
  {
    id: "root-canal",
    name: "Root Canal",
    description:
      "Pain-free, precision root canal therapy using the latest rotary endodontic technology.",
    icon: "Heart",
    duration: "90 min",
    price: "From ₹3,999",
    category: "Restorative",
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry",
    description:
      "Gentle, fun dental care designed especially for children aged 1-16.",
    icon: "Star",
    duration: "45 min",
    price: "From ₹999",
    category: "General",
  },
  {
    id: "cosmetic",
    name: "Cosmetic Dentistry",
    description:
      "Veneers, bonding, and smile makeovers that transform your confidence.",
    icon: "Diamond",
    duration: "Varies",
    price: "From ₹8,999",
    category: "Cosmetic",
  },
  {
    id: "checkup",
    name: "General Checkup",
    description:
      "Comprehensive examination, X-rays, and professional cleaning to keep you healthy.",
    icon: "ClipboardCheck",
    duration: "60 min",
    price: "From ₹499",
    category: "General",
  },
];

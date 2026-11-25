export const bookingConfig = {
  slotDurationMinutes: 30,
  slotsPerDay: [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","13:00","13:30","14:00","14:30","15:00",
    "15:30","16:00","16:30","17:00","17:30","18:00",
    "18:30","19:00","19:30",
  ],
  closedDays: [0], // 0 = Sunday
  maxDaysAhead: 60,
  storageKey: "smilecraft:appointments:v1",
};

export const pricingPlans = [
  {
    name: "Essential",
    price: "₹999",
    period: "/month",
    description: "Perfect for maintaining your oral health",
    features: [
      "2 annual cleanings",
      "Annual X-rays",
      "Emergency consultations",
      "10% off treatments",
      "Online booking priority",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "₹1,999",
    period: "/month",
    description: "Complete care for the whole family",
    features: [
      "4 annual cleanings",
      "Full X-ray package",
      "Free whitening annually",
      "25% off treatments",
      "Priority scheduling",
      "Emergency same-day slots",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Elite",
    price: "₹3,999",
    period: "/month",
    description: "Concierge dental care at its finest",
    features: [
      "Unlimited cleanings",
      "Complete imaging suite",
      "Free whitening quarterly",
      "40% off all treatments",
      "Dedicated care coordinator",
      "Weekend & evening slots",
      "Complimentary cosmetic consult",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book instantly through our online booking system above, or call us at +91 98201 23456. We offer same-day appointments for emergencies.",
  },
  {
    question: "Do you accept health insurance?",
    answer:
      "Yes, we accept all major dental insurance plans including Star Health, HDFC ERGO, Bajaj Allianz, and Apollo Munich. Our team will verify your benefits before your visit.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid photo ID (Aadhaar / PAN / Passport), your insurance card, any recent X-rays, and a list of current medications. Arrive 10 minutes early to complete paperwork.",
  },
  {
    question: "Is teeth whitening safe?",
    answer:
      "Absolutely. Our professional whitening uses clinically proven, BIS-approved formulas that are gentler than over-the-counter products, with minimal sensitivity.",
  },
  {
    question: "How often should I get a dental checkup?",
    answer:
      "We recommend checkups every 6 months for most patients. Some conditions may require more frequent visits — your dentist will advise you personally.",
  },
  {
    question: "Do you offer emergency dental care?",
    answer:
      "Yes! We reserve emergency slots every day. Call our hotline and we'll see you within 2 hours for severe pain, broken teeth, or dental trauma.",
  },
];

export const testimonials = [
  {
    name: "Priya Kapoor",
    role: "Patient since 2021",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "SmileCraft completely transformed my confidence. Dr. Sharma's attention to detail is unmatched — my veneers look so natural that even my friends can't tell!",
  },
  {
    name: "Rohit Sharma",
    role: "Patient since 2020",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "After years of dental anxiety, I finally found a practice that makes me feel calm and cared for. The team is incredible and the results speak for themselves.",
  },
  {
    name: "Sneha Reddy",
    role: "Patient since 2022",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Best decision I ever made was switching to SmileCraft. Dr. Mehta's aligner treatment was flawless. I smile in every photo now — something I never did before.",
  },
  {
    name: "Amit Desai",
    role: "Patient since 2019",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The implant process with Dr. Nair was smooth from start to finish. The technology they use is state-of-the-art and my new tooth looks completely natural.",
  },
];

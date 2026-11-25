import { Doctor } from "@/types";

export const doctors: Doctor[] = [
  {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    specialty: "Cosmetic & General Dentistry",
    credentials: "MDS, IDA Member",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    bio: "Dr. Sharma brings 12 years of artistry and precision to every smile she creates, with a gentle and caring approach.",
    rating: 4.9,
    patients: 3200,
  },
  {
    id: "dr-rahul-mehta",
    name: "Dr. Rahul Mehta",
    specialty: "Orthodontics & Aligners",
    credentials: "MDS Ortho, AAO Diplomate",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    bio: "Board-certified orthodontist specialising in invisible aligners and advanced bite correction for all ages.",
    rating: 4.8,
    patients: 2800,
  },
  {
    id: "dr-ananya-patel",
    name: "Dr. Ananya Patel",
    specialty: "Paediatric Dentistry",
    credentials: "MDS Paedo, IAPD Fellow",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    bio: "Fellowship-trained paediatric specialist who turns every child's dental visit into a fun and fearless experience.",
    rating: 5.0,
    patients: 4100,
  },
  {
    id: "dr-vikram-nair",
    name: "Dr. Vikram Nair",
    specialty: "Implants & Oral Surgery",
    credentials: "MDS Oral Surgery, ICOI Fellow",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    bio: "Implant specialist with over 2,000 successful placements and 15 years of surgical expertise across India.",
    rating: 4.9,
    patients: 1900,
  },
];

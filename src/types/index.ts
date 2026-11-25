export interface Appointment {
  id: string;
  service: string;
  serviceId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  patient: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
    consent: boolean;
  };
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  price: string;
  category: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  image: string;
  bio: string;
  rating: number;
  patients: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientNotes: string;
  consent: boolean;
}

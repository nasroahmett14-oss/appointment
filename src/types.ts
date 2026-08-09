export type PageType = 'home' | 'doctors' | 'book' | 'my-appointments' | 'contact';

export type DepartmentId = 
  | 'cardiology'
  | 'pediatrics'
  | 'neurology'
  | 'orthopedics'
  | 'general'
  | 'dental'
  | 'dermatology'
  | 'ophthalmology';

export interface Department {
  id: DepartmentId;
  name: string;
  iconName: string;
  description: string;
  doctorCount: number;
  color: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: DepartmentId;
  departmentName: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  consultationFee: number;
  qualifications: string;
  languages: string[];
  bio: string;
  availableDays: string[];
  location: string;
  isAvailableToday?: boolean;
}

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
export type AppointmentType = 'in-person' | 'telehealth';

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  doctorAvatar: string;
  departmentName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  reason: string;
  status: AppointmentStatus;
  type: AppointmentType;
  createdAt: string;
  notes?: string;
  roomNumber?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface Review {
  id: string;
  patientName: string;
  date: string;
  rating: number;
  comment: string;
  doctorName: string;
  avatar?: string;
}

export interface BookingFormData {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  departmentId: DepartmentId | '';
  doctorId: string;
  date: string;
  time: string;
  type: AppointmentType;
  reason: string;
  notes?: string;
}

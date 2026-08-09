import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Appointment, Doctor, Department, Service, Review } from '../types';
import { DEPARTMENTS, DOCTORS, INITIAL_APPOINTMENTS, SERVICES, TESTIMONIALS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key-here'
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to convert snake_case doctor to Doctor interface
function mapDoctorFromDB(row: any): Doctor {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    departmentId: row.department_id,
    departmentName: row.department_name,
    avatar: row.avatar,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    experienceYears: row.experience_years,
    consultationFee: Number(row.consultation_fee),
    qualifications: row.qualifications,
    languages: Array.isArray(row.languages) ? row.languages : [],
    bio: row.bio,
    availableDays: Array.isArray(row.available_days) ? row.available_days : [],
    location: row.location,
    isAvailableToday: row.is_available_today ?? true
  };
}

// Helper to convert snake_case appointment to Appointment interface
function mapAppointmentFromDB(row: any): Appointment {
  return {
    id: row.id,
    referenceNumber: row.reference_number,
    patientName: row.patient_name,
    patientPhone: row.patient_phone,
    patientEmail: row.patient_email,
    doctorId: row.doctor_id,
    doctorName: row.doctor_name,
    doctorTitle: row.doctor_title,
    doctorAvatar: row.doctor_avatar,
    departmentName: row.department_name,
    date: row.date,
    time: row.time,
    reason: row.reason,
    status: row.status,
    type: row.type,
    createdAt: row.created_at,
    notes: row.notes,
    roomNumber: row.room_number
  };
}

// Helper to convert snake_case department to Department interface
function mapDepartmentFromDB(row: any): Department {
  return {
    id: row.id,
    name: row.name,
    iconName: row.icon_name,
    description: row.description,
    doctorCount: row.doctor_count,
    color: row.color
  };
}

// API Methods with automatic Fallback

export async function getDepartments(): Promise<Department[]> {
  if (!supabase) return DEPARTMENTS;
  try {
    const { data, error } = await supabase.from('departments').select('*');
    if (error || !data || data.length === 0) {
      console.warn('Supabase departments query fallback to mock:', error);
      return DEPARTMENTS;
    }
    return data.map(mapDepartmentFromDB);
  } catch (err) {
    console.error('Error fetching departments from Supabase:', err);
    return DEPARTMENTS;
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  if (!supabase) return DOCTORS;
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error || !data || data.length === 0) {
      console.warn('Supabase doctors query fallback to mock:', error);
      return DOCTORS;
    }
    return data.map(mapDoctorFromDB);
  } catch (err) {
    console.error('Error fetching doctors from Supabase:', err);
    return DOCTORS;
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  if (!supabase) {
    // Read from localStorage
    try {
      const saved = localStorage.getItem('apexcare_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_APPOINTMENTS;
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Supabase appointments query fallback:', error);
      const saved = localStorage.getItem('apexcare_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    }
    return data.map(mapAppointmentFromDB);
  } catch (err) {
    console.error('Error fetching appointments from Supabase:', err);
    const saved = localStorage.getItem('apexcare_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  }
}

export async function saveNewAppointment(apt: Appointment): Promise<Appointment> {
  // Sync to local storage first for resilience
  try {
    const saved = localStorage.getItem('apexcare_appointments');
    const existing: Appointment[] = saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    localStorage.setItem('apexcare_appointments', JSON.stringify([apt, ...existing]));
  } catch (e) {
    console.error(e);
  }

  if (!supabase) return apt;

  try {
    const dbPayload = {
      id: apt.id,
      reference_number: apt.referenceNumber,
      patient_name: apt.patientName,
      patient_phone: apt.patientPhone,
      patient_email: apt.patientEmail,
      doctor_id: apt.doctorId,
      doctor_name: apt.doctorName,
      doctor_title: apt.doctorTitle,
      doctor_avatar: apt.doctorAvatar,
      department_name: apt.departmentName,
      date: apt.date,
      time: apt.time,
      reason: apt.reason,
      status: apt.status,
      type: apt.type,
      notes: apt.notes,
      room_number: apt.roomNumber
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([dbPayload])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert appointment error:', error);
      return apt;
    }

    return mapAppointmentFromDB(data);
  } catch (err) {
    console.error('Failed to save appointment to Supabase:', err);
    return apt;
  }
}

export async function cancelAppointmentDB(id: string): Promise<boolean> {
  // Local storage update
  try {
    const saved = localStorage.getItem('apexcare_appointments');
    if (saved) {
      const list: Appointment[] = JSON.parse(saved);
      const updated = list.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a);
      localStorage.setItem('apexcare_appointments', JSON.stringify(updated));
    }
  } catch (e) {
    console.error(e);
  }

  if (!supabase) return true;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      console.error('Supabase cancel error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase cancel failed:', err);
    return false;
  }
}

export async function rescheduleAppointmentDB(id: string, newDate: string, newTime: string): Promise<boolean> {
  // Local storage update
  try {
    const saved = localStorage.getItem('apexcare_appointments');
    if (saved) {
      const list: Appointment[] = JSON.parse(saved);
      const updated = list.map(a => a.id === id ? { ...a, date: newDate, time: newTime, status: 'confirmed' as const } : a);
      localStorage.setItem('apexcare_appointments', JSON.stringify(updated));
    }
  } catch (e) {
    console.error(e);
  }

  if (!supabase) return true;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ date: newDate, time: newTime, status: 'confirmed' })
      .eq('id', id);

    if (error) {
      console.error('Supabase reschedule error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase reschedule failed:', err);
    return false;
  }
}

import { Department, Doctor, Appointment, Service, Review } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    iconName: 'HeartPulse',
    description: 'Comprehensive cardiovascular care including heart health assessments, ECG, and specialized treatment.',
    doctorCount: 6,
    color: 'emerald'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    iconName: 'Baby',
    description: 'Compassionate pediatric healthcare from infant vaccinations to adolescent wellness checks.',
    doctorCount: 8,
    color: 'blue'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    iconName: 'Brain',
    description: 'Advanced neurological diagnosis for brain, spine, migraine, and nervous system disorders.',
    doctorCount: 5,
    color: 'indigo'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    iconName: 'Activity',
    description: 'Joint replacement, sports injury rehabilitation, fracture care, and spine treatment.',
    doctorCount: 7,
    color: 'teal'
  },
  {
    id: 'general',
    name: 'General Medicine',
    iconName: 'Stethoscope',
    description: 'Primary medical care, routine physicals, chronic disease management, and preventive health.',
    doctorCount: 12,
    color: 'sky'
  },
  {
    id: 'dental',
    name: 'Dental Care',
    iconName: 'Smile',
    description: 'Cosmetic dentistry, teeth whitening, root canal treatment, and pediatric oral health.',
    doctorCount: 6,
    color: 'cyan'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    iconName: 'Sparkles',
    description: 'Skin health diagnostics, acne treatment, allergy testing, and cosmetic dermatology.',
    doctorCount: 5,
    color: 'emerald'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    iconName: 'Eye',
    description: 'Eye examinations, cataract procedures, vision therapy, and laser vision correction.',
    doctorCount: 4,
    color: 'blue'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Senior Cardiologist & Heart Specialist',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 142,
    experienceYears: 14,
    consultationFee: 120,
    qualifications: 'MD (Cardiology), FACC, Harvard Medical School',
    languages: ['English', 'Spanish'],
    bio: 'Dr. Sarah Jenkins specializes in preventive cardiology, coronary artery disease management, and echocardiography. She has over 14 years of clinical experience in top teaching hospitals.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    location: 'Main Pavilion - Suite 302',
    isAvailableToday: true
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Chen',
    title: 'Chief Pediatrician',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 188,
    experienceYears: 12,
    consultationFee: 95,
    qualifications: 'MD (Pediatrics), FAAP, Johns Hopkins University',
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Michael Chen is passionate about child growth monitoring, pediatric immunity, and allergy management. Known for his warm approach with young patients.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    location: 'Pediatrics Wing - Suite 104',
    isAvailableToday: true
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    title: 'Consultant Neurologist',
    departmentId: 'neurology',
    departmentName: 'Neurology',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a0d0d82992?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewCount: 96,
    experienceYears: 16,
    consultationFee: 150,
    qualifications: 'MD, PhD in Neurosciences, Stanford University',
    languages: ['English', 'Russian', 'German'],
    bio: 'Leading researcher in headache disorders and neuropathy. Dr. Rostova provides comprehensive neuro-diagnostic assessments and personalized therapeutic plans.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
    location: 'Neuroscience Center - Suite 401',
    isAvailableToday: false
  },
  {
    id: 'doc-4',
    name: 'Dr. James Wilson',
    title: 'Orthopedic Surgeon & Sports Specialist',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 215,
    experienceYears: 18,
    consultationFee: 135,
    qualifications: 'MS (Orthopedics), FRCS, Mayo Clinic',
    languages: ['English'],
    bio: 'Specialist in minimally invasive joint surgery and sports injury recovery. Former lead team physician for national sports athletics.',
    availableDays: ['Monday', 'Tuesday', 'Friday'],
    location: 'Orthopedic Building - Suite 205',
    isAvailableToday: true
  },
  {
    id: 'doc-5',
    name: 'Dr. Amara Patel',
    title: 'Primary Care & General Physician',
    departmentId: 'general',
    departmentName: 'General Medicine',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a0d0d82992?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewCount: 164,
    experienceYears: 10,
    consultationFee: 80,
    qualifications: 'MBBS, MD (Internal Medicine), Columbia University',
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Dedicated to preventative healthcare, lifestyle wellness, diabetes management, and chronic illness control for adult patients.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    location: 'Wellness Center - Suite 101',
    isAvailableToday: true
  },
  {
    id: 'doc-6',
    name: 'Dr. Robert Vance',
    title: 'Cosmetic & General Dentist',
    departmentId: 'dental',
    departmentName: 'Dental Care',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 112,
    experienceYears: 11,
    consultationFee: 90,
    qualifications: 'DDS, NYU College of Dentistry',
    languages: ['English', 'French'],
    bio: 'Painless dental procedures, teeth whitening, clear aligners, and dental implants with modern precision laser technology.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    location: 'Dental Suite - Floor 2',
    isAvailableToday: false
  },
  {
    id: 'doc-7',
    name: 'Dr. Sophia Martinez',
    title: 'Dermatologist & Skin Health Specialist',
    departmentId: 'dermatology',
    departmentName: 'Dermatology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewCount: 130,
    experienceYears: 9,
    consultationFee: 110,
    qualifications: 'MD (Dermatology), Board Certified Dermatologist',
    languages: ['English', 'Spanish'],
    bio: 'Expert in medical and aesthetic dermatology, psoriasis, eczema management, and customized skin rejuvenation routines.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    location: 'Dermatology Clinic - Suite 310',
    isAvailableToday: true
  },
  {
    id: 'doc-8',
    name: 'Dr. David O\'Connor',
    title: 'Ophthalmologist & Vision Surgeon',
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 89,
    experienceYears: 15,
    consultationFee: 125,
    qualifications: 'MD, ABO Certified Ophthalmologist, Oxford University',
    languages: ['English'],
    bio: 'Pioneer in laser eye surgery, corneal treatments, and glaucoma therapies with over 4,000 successful procedures.',
    availableDays: ['Monday', 'Thursday', 'Friday'],
    location: 'Vision Care Center - Suite 408',
    isAvailableToday: true
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    referenceNumber: 'MC-2026-8901',
    patientName: 'Alex Morgan',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'alex.morgan@example.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorTitle: 'Senior Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    departmentName: 'Cardiology',
    date: '2026-08-10',
    time: '10:30 AM',
    reason: 'Annual heart health checkup and stress test evaluation.',
    status: 'confirmed',
    type: 'in-person',
    createdAt: '2026-08-05',
    roomNumber: 'Suite 302 - Room B'
  },
  {
    id: 'apt-102',
    referenceNumber: 'MC-2026-8902',
    patientName: 'Emma Watson',
    patientPhone: '+1 (555) 876-5432',
    patientEmail: 'emma.watson@example.com',
    doctorId: 'doc-2',
    doctorName: 'Dr. Michael Chen',
    doctorTitle: 'Chief Pediatrician',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    departmentName: 'Pediatrics',
    date: '2026-08-12',
    time: '02:00 PM',
    reason: 'Child immunization booster & routine wellness growth check.',
    status: 'confirmed',
    type: 'in-person',
    createdAt: '2026-08-06',
    roomNumber: 'Suite 104 - Room 1'
  },
  {
    id: 'apt-103',
    referenceNumber: 'MC-2026-8840',
    patientName: 'David Miller',
    patientPhone: '+1 (555) 456-7890',
    patientEmail: 'david.miller@example.com',
    doctorId: 'doc-5',
    doctorName: 'Dr. Amara Patel',
    doctorTitle: 'General Physician',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813566-78a0d0d82992?auto=format&fit=crop&q=80&w=600',
    departmentName: 'General Medicine',
    date: '2026-08-02',
    time: '11:00 AM',
    reason: 'Follow-up consultation for blood pressure prescription review.',
    status: 'completed',
    type: 'telehealth',
    createdAt: '2026-07-28',
    notes: 'Prescription renewed for 90 days. Next review in 3 months.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's-1',
    title: '24/7 Emergency Care',
    description: 'Immediate trauma response, cardiac stabilization, and urgent medical intervention around the clock.',
    iconName: 'ShieldAlert',
    features: ['Zero wait trauma desk', 'Advanced ICU equipped ambulances', 'On-call emergency specialists']
  },
  {
    id: 's-2',
    title: 'Diagnostic Imaging & Lab',
    description: 'High-field MRI, 128-slice CT scans, digital X-rays, and comprehensive clinical pathology diagnostics.',
    iconName: 'Microscope',
    features: ['Same-day digital results', 'NABL accredited laboratory', 'AI-assisted image diagnostics']
  },
  {
    id: 's-3',
    title: 'Telehealth Consultations',
    description: 'Secure, HD video appointments with top doctors from the comfort and privacy of your home.',
    iconName: 'Video',
    features: ['Instant e-prescriptions', 'HIPAA compliant video', '24-hour medical chat assistance']
  },
  {
    id: 's-4',
    title: 'Preventive Executive Health',
    description: 'Tailored full-body screening packages designed to detect early risk factors before symptoms arise.',
    iconName: 'Activity',
    features: ['Comprehensive blood work', 'Cardiovascular risk profile', 'Personalized nutrition guide']
  },
  {
    id: 's-5',
    title: 'Specialized Surgical Center',
    description: 'State-of-the-art robotic and laparoscopic surgical suites for rapid recovery and minimal scarring.',
    iconName: 'Scissors',
    features: ['Day-care surgery options', 'Ultra-clean laminar flow ORs', 'Dedicated recovery suites']
  },
  {
    id: 's-6',
    title: 'Pharmacy & Drug Delivery',
    description: 'Fully stocked inpatient and outpatient pharmacy with doorstep prescription refills and medication tracking.',
    iconName: 'Pill',
    features: ['100% genuine medicines', 'Automatic refill reminders', 'Cold-chain storage care']
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 't-1',
    patientName: 'Eleanor Vance',
    date: 'August 2, 2026',
    rating: 5,
    comment: 'Dr. Sarah Jenkins took the time to listen to my concerns thoroughly. Booking online took less than 2 minutes and the clinic atmosphere is incredibly calming!',
    doctorName: 'Dr. Sarah Jenkins (Cardiology)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-2',
    patientName: 'Marcus Brody',
    date: 'July 28, 2026',
    rating: 5,
    comment: 'The pediatric team under Dr. Michael Chen is world class. My 4-year-old daughter was relaxed during her vaccination. Highly recommend MediCare Clinic.',
    doctorName: 'Dr. Michael Chen (Pediatrics)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-3',
    patientName: 'Sophia Loren',
    date: 'July 20, 2026',
    rating: 5,
    comment: 'Exceptional orthopedic treatment. Dr. Wilson guided my knee recovery and had me walking pain-free much faster than expected. Seamless appointment reminders!',
    doctorName: 'Dr. James Wilson (Orthopedics)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  }
];

export const TIME_SLOTS = [
  '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', 
  '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', 
  '02:30 PM', '03:00 PM', '03:30 PM', '04:30 PM'
];

export const CLINIC_INFO = {
  name: 'ApexCare Medical & Specialty Clinic',
  tagline: 'World-Class Healthcare, Compassionate Patient Excellence',
  phone: '+1 (800) 555-APEX',
  emergencyPhone: '+1 (800) 911-HELP',
  email: 'care@apexcareclinic.com',
  address: '742 Healthcare Boulevard, Medical District, Suite 100, San Francisco, CA 94107',
  hours: [
    { days: 'Monday - Friday', time: '08:00 AM - 08:00 PM' },
    { days: 'Saturday', time: '08:00 AM - 05:00 PM' },
    { days: 'Sunday', time: '09:00 AM - 02:00 PM (Urgent Care)' },
    { days: 'Emergency Desk', time: '24 Hours / 7 Days' }
  ]
};

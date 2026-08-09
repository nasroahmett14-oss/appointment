-- ====================================================================
-- ApexCare Clinic Database Schema & Seed Data for Supabase
-- ====================================================================

-- 1. Create Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  description TEXT NOT NULL,
  doctor_count INTEGER DEFAULT 0,
  color TEXT DEFAULT 'blue',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department_id TEXT REFERENCES public.departments(id) ON DELETE SET NULL,
  department_name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  experience_years INTEGER NOT NULL,
  consultation_fee NUMERIC(10, 2) NOT NULL,
  qualifications TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  available_days TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  is_available_today BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  reference_number TEXT NOT NULL UNIQUE,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  doctor_id TEXT REFERENCES public.doctors(id) ON DELETE SET NULL,
  doctor_name TEXT NOT NULL,
  doctor_title TEXT NOT NULL,
  doctor_avatar TEXT NOT NULL,
  department_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  type TEXT NOT NULL DEFAULT 'in-person' CHECK (type IN ('in-person', 'telehealth')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  room_number TEXT
);

-- 4. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Reviews/Testimonials Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  patient_name TEXT NOT NULL,
  date TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable read & write access for public/anon users
-- ====================================================================

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Departments Policies
CREATE POLICY "Allow public read access on departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Allow anon insert/update on departments" ON public.departments FOR ALL USING (true);

-- Doctors Policies
CREATE POLICY "Allow public read access on doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Allow anon insert/update on doctors" ON public.doctors FOR ALL USING (true);

-- Appointments Policies
CREATE POLICY "Allow public read access on appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Allow public insert on appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on appointments" ON public.appointments FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on appointments" ON public.appointments FOR DELETE USING (true);

-- Services Policies
CREATE POLICY "Allow public read access on services" ON public.services FOR SELECT USING (true);

-- Reviews Policies
CREATE POLICY "Allow public read access on reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert on reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- ====================================================================
-- SEED INITIAL DATA
-- ====================================================================

-- Seed Departments
INSERT INTO public.departments (id, name, icon_name, description, doctor_count, color) VALUES
('cardiology', 'Cardiology', 'HeartPulse', 'Comprehensive cardiovascular care including heart health assessments, ECG, and specialized treatment.', 6, 'emerald'),
('pediatrics', 'Pediatrics', 'Baby', 'Compassionate pediatric healthcare from infant vaccinations to adolescent wellness checks.', 8, 'blue'),
('neurology', 'Neurology', 'Brain', 'Advanced neurological diagnosis for brain, spine, migraine, and nervous system disorders.', 5, 'indigo'),
('orthopedics', 'Orthopedics', 'Activity', 'Joint replacement, sports injury rehabilitation, fracture care, and spine treatment.', 7, 'teal'),
('general', 'General Medicine', 'Stethoscope', 'Primary medical care, routine physicals, chronic disease management, and preventive health.', 12, 'sky'),
('dental', 'Dental Care', 'Smile', 'Cosmetic dentistry, teeth whitening, root canal treatment, and pediatric oral health.', 6, 'cyan'),
('dermatology', 'Dermatology', 'Sparkles', 'Skin health diagnostics, acne treatment, allergy testing, and cosmetic dermatology.', 5, 'emerald'),
('ophthalmology', 'Ophthalmology', 'Eye', 'Eye examinations, cataract procedures, vision therapy, and laser vision correction.', 4, 'blue')
ON CONFLICT (id) DO NOTHING;

-- Seed Doctors
INSERT INTO public.doctors (id, name, title, department_id, department_name, avatar, rating, review_count, experience_years, consultation_fee, qualifications, languages, bio, available_days, location, is_available_today) VALUES
('doc-1', 'Dr. Sarah Jenkins', 'Senior Cardiologist & Heart Specialist', 'cardiology', 'Cardiology', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', 4.9, 142, 14, 120.00, 'MD (Cardiology), FACC, Harvard Medical School', ARRAY['English', 'Spanish'], 'Dr. Sarah Jenkins specializes in preventive cardiology, coronary artery disease management, and echocardiography. She has over 14 years of clinical experience in top teaching hospitals.', ARRAY['Monday', 'Tuesday', 'Thursday', 'Friday'], 'Main Pavilion - Suite 302', true),
('doc-2', 'Dr. Michael Chen', 'Chief Pediatrician', 'pediatrics', 'Pediatrics', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', 4.9, 188, 12, 95.00, 'MD (Pediatrics), FAAP, Johns Hopkins University', ARRAY['English', 'Mandarin'], 'Dr. Michael Chen is passionate about child growth monitoring, pediatric immunity, and allergy management. Known for his warm approach with young patients.', ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday'], 'Pediatrics Wing - Suite 104', true),
('doc-3', 'Dr. Elena Rostova', 'Consultant Neurologist', 'neurology', 'Neurology', 'https://images.unsplash.com/photo-1594824813566-78a0d0d82992?auto=format&fit=crop&q=80&w=600', 4.8, 96, 16, 150.00, 'MD, PhD in Neurosciences, Stanford University', ARRAY['English', 'Russian', 'German'], 'Leading researcher in headache disorders and neuropathy. Dr. Rostova provides comprehensive neuro-diagnostic assessments and personalized therapeutic plans.', ARRAY['Tuesday', 'Wednesday', 'Thursday'], 'Neuroscience Center - Suite 401', false),
('doc-4', 'Dr. James Wilson', 'Orthopedic Surgeon & Sports Specialist', 'orthopedics', 'Orthopedics', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600', 4.9, 215, 18, 135.00, 'MS (Orthopedics), FRCS, Mayo Clinic', ARRAY['English'], 'Specialist in minimally invasive joint surgery and sports injury recovery. Former lead team physician for national sports athletics.', ARRAY['Monday', 'Tuesday', 'Friday'], 'Orthopedic Building - Suite 205', true),
('doc-5', 'Dr. Amara Patel', 'Primary Care & General Physician', 'general', 'General Medicine', 'https://images.unsplash.com/photo-1594824813566-78a0d0d82992?auto=format&fit=crop&q=80&w=600', 4.7, 164, 10, 80.00, 'MBBS, MD (Internal Medicine), Columbia University', ARRAY['English', 'Hindi', 'Gujarati'], 'Dedicated to preventative healthcare, lifestyle wellness, diabetes management, and chronic illness control for adult patients.', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 'Wellness Center - Suite 101', true),
('doc-6', 'Dr. Robert Vance', 'Cosmetic & General Dentist', 'dental', 'Dental Care', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', 4.9, 112, 11, 90.00, 'DDS, NYU College of Dentistry', ARRAY['English', 'French'], 'Painless dental procedures, teeth whitening, clear aligners, and dental implants with modern precision laser technology.', ARRAY['Monday', 'Wednesday', 'Thursday', 'Saturday'], 'Dental Suite - Floor 2', false),
('doc-7', 'Dr. Sophia Martinez', 'Dermatologist & Skin Health Specialist', 'dermatology', 'Dermatology', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', 4.8, 130, 9, 110.00, 'MD (Dermatology), Board Certified Dermatologist', ARRAY['English', 'Spanish'], 'Expert in medical and aesthetic dermatology, psoriasis, eczema management, and customized skin rejuvenation routines.', ARRAY['Tuesday', 'Wednesday', 'Friday'], 'Dermatology Clinic - Suite 310', true),
('doc-8', 'Dr. David O''Connor', 'Ophthalmologist & Vision Surgeon', 'ophthalmology', 'Ophthalmology', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', 4.9, 89, 15, 125.00, 'MD, ABO Certified Ophthalmologist, Oxford University', ARRAY['English'], 'Pioneer in laser eye surgery, corneal treatments, and glaucoma therapies with over 4,000 successful procedures.', ARRAY['Monday', 'Thursday', 'Friday'], 'Vision Care Center - Suite 408', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Appointments
INSERT INTO public.appointments (id, reference_number, patient_name, patient_phone, patient_email, doctor_id, doctor_name, doctor_title, doctor_avatar, department_name, date, time, reason, status, type, room_number) VALUES
('apt-101', 'MC-2026-8901', 'Alex Morgan', '+1 (555) 234-5678', 'alex.morgan@example.com', 'doc-1', 'Dr. Sarah Jenkins', 'Senior Cardiologist', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', 'Cardiology', '2026-08-10', '10:30 AM', 'Annual heart health checkup and stress test evaluation.', 'confirmed', 'in-person', 'Suite 302 - Room B'),
('apt-102', 'MC-2026-8902', 'Emma Watson', '+1 (555) 876-5432', 'emma.watson@example.com', 'doc-2', 'Dr. Michael Chen', 'Chief Pediatrician', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', 'Pediatrics', '2026-08-12', '02:00 PM', 'Child immunization booster & routine wellness growth check.', 'confirmed', 'in-person', 'Suite 104 - Room 1'),
('apt-103', 'MC-2026-8840', 'David Miller', '+1 (555) 456-7890', 'david.miller@example.com', 'doc-5', 'Dr. Amara Patel', 'General Physician', 'https://images.unsplash.com/photo-1594824813566-78a0d0d82992?auto=format&fit=crop&q=80&w=600', 'General Medicine', '2026-08-02', '11:00 AM', 'Follow-up consultation for blood pressure prescription review.', 'completed', 'telehealth', NULL)
ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO public.services (id, title, description, icon_name, features) VALUES
('s-1', '24/7 Emergency Care', 'Immediate trauma response, cardiac stabilization, and urgent medical intervention around the clock.', 'ShieldAlert', ARRAY['Zero wait trauma desk', 'Advanced ICU equipped ambulances', 'On-call emergency specialists']),
('s-2', 'Diagnostic Imaging & Lab', 'High-field MRI, 128-slice CT scans, digital X-rays, and comprehensive clinical pathology diagnostics.', 'Microscope', ARRAY['Same-day digital results', 'NABL accredited laboratory', 'AI-assisted image diagnostics']),
('s-3', 'Telehealth Consultations', 'Secure, HD video appointments with top doctors from the comfort and privacy of your home.', 'Video', ARRAY['Instant e-prescriptions', 'HIPAA compliant video', '24-hour medical chat assistance']),
('s-4', 'Preventive Executive Health', 'Tailored full-body screening packages designed to detect early risk factors before symptoms arise.', 'Activity', ARRAY['Comprehensive blood work', 'Cardiovascular risk profile', 'Personalized nutrition guide']),
('s-5', 'Specialized Surgical Center', 'State-of-the-art robotic and laparoscopic surgical suites for rapid recovery and minimal scarring.', 'Scissors', ARRAY['Day-care surgery options', 'Ultra-clean laminar flow ORs', 'Dedicated recovery suites']),
('s-6', 'Pharmacy & Drug Delivery', 'Fully stocked inpatient and outpatient pharmacy with doorstep prescription refills and medication tracking.', 'Pill', ARRAY['100% genuine medicines', 'Automatic refill reminders', 'Cold-chain storage care'])
ON CONFLICT (id) DO NOTHING;

-- Seed Testimonials / Reviews
INSERT INTO public.reviews (id, patient_name, date, rating, comment, doctor_name, avatar) VALUES
('t-1', 'Eleanor Vance', 'August 2, 2026', 5, 'Dr. Sarah Jenkins took the time to listen to my concerns thoroughly. Booking online took less than 2 minutes and the clinic atmosphere is incredibly calming!', 'Dr. Sarah Jenkins (Cardiology)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'),
('t-2', 'Marcus Brody', 'July 28, 2026', 5, 'The pediatric team under Dr. Michael Chen is world class. My 4-year-old daughter was relaxed during her vaccination. Highly recommend MediCare Clinic.', 'Dr. Michael Chen (Pediatrics)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'),
('t-3', 'Sophia Loren', 'July 20, 2026', 5, 'Exceptional orthopedic treatment. Dr. Wilson guided my knee recovery and had me walking pain-free much faster than expected. Seamless appointment reminders!', 'Dr. James Wilson (Orthopedics)', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200')
ON CONFLICT (id) DO NOTHING;

import React, { useState } from 'react';
import { PageType, DepartmentId } from '../types';
import { DOCTORS, DEPARTMENTS, SERVICES, TESTIMONIALS, CLINIC_INFO } from '../data/mockData';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorModal } from '../components/DoctorModal';
import { 
  Calendar, 
  Stethoscope, 
  ShieldCheck, 
  Clock, 
  Users, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HeartPulse, 
  Activity, 
  Video, 
  Microscope, 
  Pill, 
  PhoneCall, 
  ChevronRight, 
  Star,
  Baby,
  Brain,
  Smile,
  Eye
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType, selectedDoctorId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  
  // Quick Search state
  const [searchDept, setSearchDept] = useState<string>('');
  const [searchDate, setSearchDate] = useState<string>('');

  const featuredDoctors = DOCTORS.slice(0, 4);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('doctors');
  };

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-emerald-600" />;
      case 'Baby': return <Baby className="w-6 h-6 text-sky-600" />;
      case 'Brain': return <Brain className="w-6 h-6 text-indigo-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-teal-600" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-sky-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-cyan-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'Eye': return <Eye className="w-6 h-6 text-blue-600" />;
      default: return <Stethoscope className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-50 via-slate-50 to-white pt-8 pb-16 overflow-hidden">
        {/* Background Subtle Medical Glow Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Premier Healthcare & Online Booking Portal</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Health, Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">Highest Priority.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Connect with world-class specialist doctors, schedule effortless appointments in under 2 minutes, and experience compassionate medical care for you and your family.
              </p>

              {/* Primary Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-book-btn"
                  onClick={() => onNavigate('book')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-xl shadow-sky-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  id="hero-doctors-btn"
                  onClick={() => onNavigate('doctors')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-5 h-5 text-sky-600" />
                  <span>Our Doctors</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">45+</span>
                  <span className="text-xs text-slate-500 font-medium">Expert Specialists</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">15k+</span>
                  <span className="text-xs text-slate-500 font-medium">Satisfied Patients</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">4.9 ★</span>
                  <span className="text-xs text-slate-500 font-medium">Clinic Rating</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Hero Clinic Image Card */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white group">
                  <img 
                    src="/src/assets/images/clinic_hero_bg_1786255659267.jpg" 
                    alt="ApexCare Medical Clinic" 
                    referrerPolicy="no-referrer"
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block">
                      ✓ Open Today • Walk-ins Welcome
                    </span>
                    <h3 className="text-lg font-bold">ApexCare Medical Center</h3>
                    <p className="text-xs text-slate-200">State-of-the-Art Diagnostic & Care Facility</p>
                  </div>
                </div>

                {/* Floating Card - Emergency Service */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 animate-bounce-subtle">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Instant E-Pass Confirmation</span>
                    <span className="text-[11px] text-slate-500">Zero Wait Time Check-in</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Quick Doctor Search Widget Bar */}
          <div className="mt-12 bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" /> Quick Appointment Search
            </h3>
            
            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Specialty / Department</label>
                <select 
                  value={searchDept}
                  onChange={(e) => setSearchDept(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">All Departments</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Preferred Date</label>
                <input 
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Consultation Mode</label>
                <select className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                  <option value="in-person">In-Person Clinic Visit</option>
                  <option value="telehealth">Telehealth Video Call</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Find Doctors
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Specialty Departments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Medical Departments
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Specialized Care for Every Need
          </h2>
          <p className="text-sm text-slate-600">
            Our multi-disciplinary medical centers offer modern diagnostic technology and board-certified specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept) => (
            <div 
              key={dept.id}
              onClick={() => onNavigate('doctors')}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-sky-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center">
                  {getDepartmentIcon(dept.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:text-sky-700">
                <span>{dept.doctorCount} Doctors Available</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                Top Medical Specialists
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Meet Our Leading Doctors
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Board-certified physicians, surgeons, and specialists committed to delivering outstanding care.
              </p>
            </div>

            <button
              onClick={() => onNavigate('doctors')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>View All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <DoctorCard 
                key={doc.id}
                doctor={doc}
                onBookDoctor={(docId) => onNavigate('book', docId)}
                onSelectDoctor={(doc) => setSelectedDoctor(doc)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Our Clinic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-sky-50 via-white to-emerald-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-sky-100 shadow-2xs">
                Patient Excellence
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Choose ApexCare Clinic?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We combine human warmth with state-of-the-art medical science to ensure your diagnostic journey and treatments are as smooth and reassuring as possible.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Board-certified specialists across 12+ disciplines',
                  'Instant online booking & digital e-pass confirmation',
                  '24/7 ER Trauma unit & round-the-clock emergency support',
                  'Integrated pharmacy with home prescription delivery'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('book')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Your Appointment Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.slice(0, 4).map((srv) => (
                <div key={srv.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{srv.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{srv.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Patient Stories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">What Our Patients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img 
                  src={t.avatar} 
                  alt={t.patientName} 
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.patientName}</h4>
                  <p className="text-[11px] text-slate-400">{t.doctorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <DoctorModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)}
          onBookDoctor={(docId) => {
            setSelectedDoctor(null);
            onNavigate('book', docId);
          }}
        />
      )}

    </div>
  );
};

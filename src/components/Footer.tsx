import React from 'react';
import { PageType } from '../types';
import { CLINIC_INFO, DEPARTMENTS } from '../data/mockData';
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emergency Callout Box inside Footer */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-emerald-950 border border-sky-800/60 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Need Immediate Medical Attention?
                <span className="text-xs bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/30 font-medium">24/7 ER Desk</span>
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Our trauma unit and emergency ambulances are available 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>
          <a
            href={`tel:${CLINIC_INFO.emergencyPhone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            Call ER: {CLINIC_INFO.emergencyPhone}
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Clinic Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">ApexCare Plus</span>
                <span className="text-xs text-sky-400 font-medium">Medical & Specialty Clinic</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing patient-centered medical care, cutting-edge diagnostics, and world-class specialist treatments with compassion and integrity.
            </p>
            
            <div className="space-y-2 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{CLINIC_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo(0,0); }} 
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3" /> Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('doctors'); window.scrollTo(0,0); }} 
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3" /> Find a Doctor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('book'); window.scrollTo(0,0); }} 
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3" /> Book Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('my-appointments'); window.scrollTo(0,0); }} 
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3" /> My Appointments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('contact'); window.scrollTo(0,0); }} 
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3" /> Contact & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Specialty Centers</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {DEPARTMENTS.slice(0, 5).map(dep => (
                <li key={dep.id}>
                  <button
                    onClick={() => { onNavigate('doctors'); window.scrollTo(0,0); }}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-500" /> {dep.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Working Hours</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="border-b border-slate-800 pb-1.5">
                  <span className="text-slate-200 font-medium block">{h.days}</span>
                  <span className="text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-sky-400" /> {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ApexCare Plus Medical Clinic. All rights reserved.</p>
          <p className="text-center md:text-right text-slate-500">
            Designed for patient convenience. For life-threatening medical emergencies, dial 911 or visit your nearest emergency room immediately.
          </p>
        </div>

      </div>
    </footer>
  );
};

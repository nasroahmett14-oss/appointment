import React from 'react';
import { Doctor } from '../types';
import { 
  X, 
  Star, 
  Award, 
  MapPin, 
  Globe, 
  GraduationCap, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookDoctor: (doctorId: string) => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose, onBookDoctor }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Hero */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-emerald-800 p-6 sm:p-8 text-white relative overflow-hidden rounded-t-3xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              referrerPolicy="no-referrer"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white/20 shadow-lg shrink-0"
            />
            <div className="text-center sm:text-left space-y-2">
              <span className="inline-block bg-white/20 backdrop-blur-md text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                {doctor.departmentName} Department
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">{doctor.name}</h2>
              <p className="text-sky-100 text-sm font-medium">{doctor.title}</p>
              
              <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-200">
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong>{doctor.rating}</strong> ({doctor.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
                  <Award className="w-3.5 h-3.5 text-emerald-300" />
                  {doctor.experienceYears} Years Exp.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Biography */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> Professional Overview
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {doctor.bio}
            </p>
          </div>

          {/* Key Qualifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-1">
              <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600" /> Qualifications
              </span>
              <p className="text-sm font-medium text-slate-800">{doctor.qualifications}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600" /> Languages Spoken
              </span>
              <p className="text-sm font-medium text-slate-800">{doctor.languages.join(', ')}</p>
            </div>
          </div>

          {/* Schedule & Location */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Consultation Schedule & Room
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Clinic Location</span>
                  <span className="font-semibold text-slate-800">{doctor.location}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Available Days</span>
                  <span className="font-semibold text-slate-800">{doctor.availableDays.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer / Booking Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Consultation Fee</span>
              <span className="text-2xl font-extrabold text-slate-900">${doctor.consultationFee}</span>
              <span className="text-xs text-slate-400 font-normal ml-1">(In-person or Telehealth)</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookDoctor(doctor.id);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Appointment with {doctor.name.split(' ')[1]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

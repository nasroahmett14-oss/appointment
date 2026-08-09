import React from 'react';
import { Doctor } from '../types';
import { Star, Clock, MapPin, Calendar, Award, CheckCircle, ArrowRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onBookDoctor: (doctorId: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookDoctor, onSelectDoctor }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col overflow-hidden group relative">
      
      {/* Top Banner Image Container */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img 
          src={doctor.avatar} 
          alt={doctor.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

        {/* Department Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-sky-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-white/50 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          {doctor.departmentName}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {doctor.isAvailableToday ? (
            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Available Today
            </span>
          ) : (
            <span className="bg-slate-900/70 backdrop-blur-md text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-full">
              Next: Tomorrow
            </span>
          )}
        </div>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{doctor.rating}</span>
          <span className="text-slate-400 text-[11px]">({doctor.reviewCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {doctor.title}
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {doctor.bio}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Award className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span><strong>{doctor.experienceYears} Yrs</strong> Experience</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{doctor.location.split('-')[0]}</span>
            </div>
          </div>
        </div>

        {/* Footer & Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Consultation Fee</span>
            <span className="text-base font-bold text-slate-900">${doctor.consultationFee}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectDoctor(doctor)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => onBookDoctor(doctor.id)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-sm shadow-sky-600/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

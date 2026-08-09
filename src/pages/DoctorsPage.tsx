import React, { useState, useMemo } from 'react';
import { PageType, DepartmentId, Doctor } from '../types';
import { DOCTORS, DEPARTMENTS } from '../data/mockData';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorModal } from '../components/DoctorModal';
import { 
  Search, 
  Filter, 
  Stethoscope, 
  CheckCircle2, 
  SlidersHorizontal,
  Sparkles,
  UserX
} from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (page: PageType, doctorId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<Doctor | null>(null);

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search term
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.qualifications.toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;

      // Available Today filter
      const matchesAvailability = !availableTodayOnly || doc.isAvailableToday;

      return matchesSearch && matchesDept && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee') return a.consultationFee - b.consultationFee;
      return 0;
    });
  }, [searchTerm, selectedDept, availableTodayOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-emerald-800 rounded-3xl p-8 sm:p-10 text-white shadow-lg space-y-3 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-white/20">
            <Stethoscope className="w-3.5 h-3.5" /> Specialist Physician Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Meet Our Specialist Doctors
          </h1>
          <p className="text-sm text-sky-100 leading-relaxed">
            Browse through our board-certified medical faculty, explore doctor qualifications, check clinic availability, and schedule your appointment directly.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by doctor name, specialty, or qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Department Select */}
          <div className="md:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
            >
              <option value="all">All Medical Departments ({DOCTORS.length})</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="fee">Sort by Fee (Lowest)</option>
            </select>
          </div>

          {/* Available Today Toggle */}
          <div className="md:col-span-2 flex items-center justify-start md:justify-end">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input 
                type="checkbox"
                checked={availableTodayOnly}
                onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
              />
              <span>Available Today</span>
            </label>
          </div>

        </div>

        {/* Department Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDept === 'all'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Specialty Centers
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDept === dept.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

      </div>

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing <strong>{filteredDoctors.length}</strong> doctor{filteredDoctors.length !== 1 ? 's' : ''}</span>
        {(searchTerm || selectedDept !== 'all' || availableTodayOnly) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDept('all');
              setAvailableTodayOnly(false);
            }}
            className="text-sky-600 hover:text-sky-800 font-bold underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookDoctor={(docId) => onNavigate('book', docId)}
              onSelectDoctor={(doc) => setSelectedDoctorModal(doc)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <UserX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Doctors Found</h3>
          <p className="text-xs text-slate-500">
            We couldn't find any doctor matching your current search terms or active department filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDept('all');
              setAvailableTodayOnly(false);
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm"
          >
            Clear Search Filters
          </button>
        </div>
      )}

      {/* Doctor Modal */}
      {selectedDoctorModal && (
        <DoctorModal
          doctor={selectedDoctorModal}
          onClose={() => setSelectedDoctorModal(null)}
          onBookDoctor={(docId) => {
            setSelectedDoctorModal(null);
            onNavigate('book', docId);
          }}
        />
      )}

    </div>
  );
};

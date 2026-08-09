import React, { useState } from 'react';
import { PageType, Appointment } from '../types';
import { TIME_SLOTS } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Printer, 
  Trash2, 
  RefreshCw, 
  Download, 
  Video, 
  Building2, 
  PlusCircle, 
  FileText 
} from 'lucide-react';

interface MyAppointmentsPageProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
  onNavigate: (page: PageType) => void;
}

export const MyAppointmentsPage: React.FC<MyAppointmentsPageProps> = ({
  appointments,
  onCancelAppointment,
  onRescheduleAppointment,
  onNavigate
}) => {
  const [filterTab, setFilterTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reschedule Modal state
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');

  // Cancel Confirmation modal state
  const [cancelAptId, setCancelAptId] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    // Search
    const matchesSearch = 
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.departmentName.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab
    let matchesTab = true;
    if (filterTab === 'upcoming') {
      matchesTab = apt.status === 'confirmed' || apt.status === 'pending';
    } else if (filterTab === 'completed') {
      matchesTab = apt.status === 'completed';
    } else if (filterTab === 'cancelled') {
      matchesTab = apt.status === 'cancelled';
    }

    return matchesSearch && matchesTab;
  });

  const handleOpenReschedule = (apt: Appointment) => {
    setRescheduleApt(apt);
    setNewDate(apt.date);
    setNewTime(apt.time);
  };

  const handleConfirmReschedule = () => {
    if (rescheduleApt && newDate && newTime) {
      onRescheduleAppointment(rescheduleApt.id, newDate, newTime);
      setRescheduleApt(null);
    }
  };

  const handleConfirmCancel = () => {
    if (cancelAptId) {
      onCancelAppointment(cancelAptId);
      setCancelAptId(null);
    }
  };

  const downloadICS = (apt: Appointment) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ApexCare Medical Clinic//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:Appointment with ${apt.doctorName}
DESCRIPTION:${apt.reason} - Ref: ${apt.referenceNumber}
LOCATION:${apt.roomNumber || 'ApexCare Medical Clinic'}
DTSTART:${apt.date.replace(/-/g, '')}T090000Z
DTEND:${apt.date.replace(/-/g, '')}T100000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointment-${apt.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Patient Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            My Appointments
          </h1>
          <p className="text-xs text-slate-500">
            Manage your scheduled doctor consultations, view details, reschedule, or download digital passes.
          </p>
        </div>

        <button
          onClick={() => onNavigate('book')}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Book New Appointment
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
            { id: 'all', label: 'All History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filterTab === tab.id
                  ? 'bg-white text-sky-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search by doctor, patient, or ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
          />
        </div>

      </div>

      {/* Appointment Cards List */}
      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((apt) => (
            <div 
              key={apt.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Top Status & Ref */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    REF: {apt.referenceNumber}
                  </span>
                  
                  {apt.status === 'confirmed' && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Confirmed
                    </span>
                  )}

                  {apt.status === 'completed' && (
                    <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-sky-500" /> Completed
                    </span>
                  )}

                  {apt.status === 'cancelled' && (
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-rose-500" /> Cancelled
                    </span>
                  )}
                </div>

                {/* Doctor Info Header */}
                <div className="flex items-center gap-3">
                  <img 
                    src={apt.doctorAvatar} 
                    alt={apt.doctorName} 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{apt.doctorName}</h3>
                    <p className="text-xs text-sky-600 font-medium">{apt.doctorTitle}</p>
                    <span className="text-[11px] text-slate-400">{apt.departmentName} Dept</span>
                  </div>
                </div>

                {/* Patient & Date Details */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-400">Patient:</span>
                    <strong className="font-semibold text-slate-900">{apt.patientName}</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-400">Date & Time:</span>
                    <strong className="font-semibold text-sky-700">{apt.date} @ {apt.time}</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-400">Mode:</span>
                    <span className="font-semibold text-emerald-700 capitalize flex items-center gap-1">
                      {apt.type === 'in-person' ? <Building2 className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                      {apt.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium text-slate-800">{apt.roomNumber || 'Clinic Main Pavilion'}</span>
                  </div>
                </div>

                {/* Reason */}
                <p className="text-xs text-slate-500 italic line-clamp-2">
                  "{apt.reason}"
                </p>

              </div>

              {/* Card Actions */}
              {apt.status === 'confirmed' && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => downloadICS(apt)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold flex items-center gap-1"
                    title="Add to Calendar (.ics)"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-600" />
                    <span>Cal</span>
                  </button>

                  <button
                    onClick={() => handleOpenReschedule(apt)}
                    className="p-2 rounded-xl text-sky-700 hover:bg-sky-50 border border-sky-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reschedule</span>
                  </button>

                  <button
                    onClick={() => setCancelAptId(apt.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Appointments Found</h3>
          <p className="text-xs text-slate-500">
            You don't have any appointments matching the selected filter tab or search terms.
          </p>
          <button
            onClick={() => onNavigate('book')}
            className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md"
          >
            Book Your First Appointment
          </button>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scaleUp">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Reschedule Appointment
            </h3>
            
            <p className="text-xs text-slate-600">
              Pick a new date and time for your visit with <strong>{rescheduleApt.doctorName}</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">New Date</label>
                <input 
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">New Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.slice(0, 6).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewTime(slot)}
                      className={`py-1.5 text-xs font-semibold rounded-lg ${
                        newTime === slot ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRescheduleApt(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelAptId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cancel Appointment?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to cancel this appointment? This action will free up the time slot.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCancelAptId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm"
              >
                Yes, Cancel Visit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

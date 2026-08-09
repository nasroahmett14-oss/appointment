import React, { useState, useEffect } from 'react';
import { PageType, DepartmentId, Appointment, BookingFormData } from '../types';
import { DOCTORS, DEPARTMENTS, TIME_SLOTS, CLINIC_INFO } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  CheckCircle2, 
  FileText, 
  Video, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  X, 
  Printer, 
  Download, 
  ArrowRight 
} from 'lucide-react';

interface BookAppointmentPageProps {
  initialDoctorId?: string;
  onNavigate: (page: PageType) => void;
  onAppointmentCreated: (newApt: Appointment) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({ 
  initialDoctorId, 
  onNavigate,
  onAppointmentCreated
}) => {
  
  // Default date to tomorrow in YYYY-MM-DD
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    departmentId: 'general',
    doctorId: initialDoctorId || DOCTORS[0].id,
    date: tomorrowStr,
    time: '10:00 AM',
    type: 'in-person',
    reason: '',
    notes: ''
  });

  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When initialDoctorId changes, set doctor and department
  useEffect(() => {
    if (initialDoctorId) {
      const doc = DOCTORS.find(d => d.id === initialDoctorId);
      if (doc) {
        setFormData(prev => ({
          ...prev,
          doctorId: doc.id,
          departmentId: doc.departmentId
        }));
      }
    }
  }, [initialDoctorId]);

  // Available doctors for selected department
  const filteredDoctors = DOCTORS.filter(
    d => !formData.departmentId || d.departmentId === formData.departmentId
  );

  const selectedDoctorObj = DOCTORS.find(d => d.id === formData.doctorId) || DOCTORS[0];

  // Handle department change -> reset doctor if needed
  const handleDeptChange = (deptId: DepartmentId) => {
    const docs = DOCTORS.filter(d => d.departmentId === deptId);
    setFormData(prev => ({
      ...prev,
      departmentId: deptId,
      doctorId: docs.length > 0 ? docs[0].id : prev.doctorId
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.patientName.trim()) errs.patientName = 'Patient full name is required';
    if (!formData.patientPhone.trim()) errs.patientPhone = 'Phone number is required';
    if (!formData.patientEmail.trim() || !formData.patientEmail.includes('@')) {
      errs.patientEmail = 'Valid email address is required';
    }
    if (!formData.reason.trim()) errs.reason = 'Please state the primary reason for your visit';
    if (!formData.date) errs.date = 'Appointment date is required';
    if (!formData.time) errs.time = 'Time slot is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const refCode = `MC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        referenceNumber: refCode,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        patientEmail: formData.patientEmail,
        doctorId: selectedDoctorObj.id,
        doctorName: selectedDoctorObj.name,
        doctorTitle: selectedDoctorObj.title,
        doctorAvatar: selectedDoctorObj.avatar,
        departmentName: selectedDoctorObj.departmentName,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        status: 'confirmed',
        type: formData.type,
        createdAt: new Date().toISOString().split('T')[0],
        notes: formData.notes,
        roomNumber: selectedDoctorObj.location
      };

      onAppointmentCreated(newApt);
      setCreatedAppointment(newApt);
      setIsSubmitting(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 border border-sky-100 px-3.5 py-1 rounded-full text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-sky-600" /> Fast & Secure Online Scheduling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Book Your Medical Appointment
        </h1>
        <p className="text-sm text-slate-600">
          Select your doctor, pick your preferred date and time slot, and receive instant confirmation with your digital clinic e-pass.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Main Form */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Patient Details */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Patient Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                        errors.patientName ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400' : 'border-slate-200 bg-slate-50/50 focus:ring-sky-500'
                      }`}
                    />
                  </div>
                  {errors.patientName && <p className="text-[11px] text-rose-500 mt-1">{errors.patientName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel"
                      placeholder="e.g. +1 (555) 234-5678"
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                        errors.patientPhone ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400' : 'border-slate-200 bg-slate-50/50 focus:ring-sky-500'
                      }`}
                    />
                  </div>
                  {errors.patientPhone && <p className="text-[11px] text-rose-500 mt-1">{errors.patientPhone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email"
                      placeholder="e.g. eleanor.vance@example.com"
                      value={formData.patientEmail}
                      onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                        errors.patientEmail ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400' : 'border-slate-200 bg-slate-50/50 focus:ring-sky-500'
                      }`}
                    />
                  </div>
                  {errors.patientEmail && <p className="text-[11px] text-rose-500 mt-1">{errors.patientEmail}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Department & Doctor Selection */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                Department & Doctor
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Medical Department
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => handleDeptChange(e.target.value as DepartmentId)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Select Specialist Doctor
                  </label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {filteredDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — ({doc.title})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'in-person'})}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.type === 'in-person'
                        ? 'border-sky-600 bg-sky-50/80 text-sky-800 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-sky-600" />
                    In-Person Clinic Visit
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'telehealth'})}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.type === 'telehealth'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-800 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-emerald-600" />
                    Telehealth HD Video
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Schedule Date & Time */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                Select Date & Time Slot
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Appointment Date <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                  {errors.date && <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Available Time Slot <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = formData.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({...formData, time: slot})}
                          className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {errors.time && <p className="text-[11px] text-rose-500 mt-1">{errors.time}</p>}
                </div>
              </div>
            </div>

            {/* Step 4: Reason for Visit */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                Reason for Visit & Symptoms
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Primary Reason for Consultation <span className="text-rose-500">*</span>
                </label>
                <textarea 
                  rows={3}
                  placeholder="Describe your current symptoms, medical history, or checkup request..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                    errors.reason ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50 focus:ring-sky-500'
                  }`}
                />
                {errors.reason && <p className="text-[11px] text-rose-500 mt-1">{errors.reason}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Confirming Appointment...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Selected Doctor Summary Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
              Appointment Summary
            </span>

            <div className="flex items-center gap-4">
              <img 
                src={selectedDoctorObj.avatar} 
                alt={selectedDoctorObj.name} 
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700"
              />
              <div>
                <h4 className="text-base font-bold text-white">{selectedDoctorObj.name}</h4>
                <p className="text-xs text-sky-400">{selectedDoctorObj.title}</p>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {selectedDoctorObj.departmentName} Dept
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Date:</span>
                <span className="font-semibold text-white">{formData.date || 'Not selected'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Time:</span>
                <span className="font-semibold text-white">{formData.time}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Mode:</span>
                <span className="font-semibold text-emerald-400 capitalize">{formData.type}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-slate-200">{selectedDoctorObj.location}</span>
              </div>
              <div className="flex justify-between py-1 text-sm pt-2 border-t border-slate-800 font-bold">
                <span className="text-slate-300">Consultation Fee:</span>
                <span className="text-emerald-400">${selectedDoctorObj.consultationFee}</span>
              </div>
            </div>
          </div>

          {/* Need Help Assistance Card */}
          <div className="bg-sky-50 p-6 rounded-3xl border border-sky-100 space-y-3">
            <h4 className="text-sm font-bold text-sky-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> Need Help Booking?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you require emergency care or prefer assistance booking over the phone, our front desk desk is on call 24 hours.
            </p>
            <a 
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900"
            >
              <Phone className="w-3.5 h-3.5" /> Call Front Desk: {CLINIC_INFO.phone}
            </a>
          </div>

        </div>

      </div>

      {/* Confirmation E-Pass Modal */}
      {createdAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative animate-scaleUp">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Appointment Confirmed!</h2>
              <p className="text-xs text-slate-500">
                Your medical consultation is scheduled. Below is your official clinic digital e-pass.
              </p>
            </div>

            {/* E-Pass Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 border border-slate-800 shadow-md relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] text-sky-400 font-bold uppercase tracking-wider block">ApexCare Clinic Pass</span>
                  <span className="text-xs text-slate-400 font-mono">REF: {createdAppointment.referenceNumber}</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {createdAppointment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Patient Name</span>
                  <strong className="text-white text-sm">{createdAppointment.patientName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Specialist Doctor</span>
                  <strong className="text-white">{createdAppointment.doctorName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Date & Time</span>
                  <strong className="text-emerald-400">{createdAppointment.date} @ {createdAppointment.time}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Clinic Room</span>
                  <strong className="text-slate-200">{createdAppointment.roomNumber}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handlePrint}
                className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Print / Save E-Pass Receipt
              </button>

              <button
                onClick={() => {
                  setCreatedAppointment(null);
                  onNavigate('my-appointments');
                }}
                className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View All My Appointments</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

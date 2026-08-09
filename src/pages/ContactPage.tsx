import React, { useState } from 'react';
import { PageType } from '../types';
import { CLINIC_INFO } from '../data/mockData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  Car, 
  Navigation, 
  HelpCircle,
  Building2
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 border border-sky-100 px-3.5 py-1 rounded-full text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-sky-600" /> Clinic Location & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with ApexCare
        </h1>
        <p className="text-sm text-slate-600">
          Have questions regarding medical services, insurance coverage, or facility access? Send us a message or visit our clinic.
        </p>
      </div>

      {/* Emergency Hotline Alert Box */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-800/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">24/7 Emergency Medical Response</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              For urgent trauma cases or cardiac emergencies, call our dedicated line immediately.
            </p>
          </div>
        </div>

        <a 
          href={`tel:${CLINIC_INFO.emergencyPhone}`}
          className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-colors whitespace-nowrap"
        >
          Call ER: {CLINIC_INFO.emergencyPhone}
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Send an Online Inquiry</h2>
            <p className="text-xs text-slate-500 mt-1">
              Our patient relations team will respond within 24 business hours.
            </p>
          </div>

          {isSent && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been sent successfully. We will contact you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="email"
                  required
                  placeholder="e.g. david@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
              <input 
                type="text"
                placeholder="e.g. Insurance inquiry / Health checkup package query"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Your Message <span className="text-rose-500">*</span>
              </label>
              <textarea 
                rows={4}
                required
                placeholder="Write your message or inquiry details here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right Column: Info & Hours Table */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Clinic Contact Details */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-lg font-bold border-b border-slate-800 pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-400" /> ApexCare Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Main Campus Address</strong>
                  <p className="mt-0.5 text-slate-300 leading-relaxed">{CLINIC_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Phone Helpline</strong>
                  <p className="mt-0.5">{CLINIC_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">General Email</strong>
                  <p className="mt-0.5">{CLINIC_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Operating Hours
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                {CLINIC_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-slate-800/60 last:border-0">
                    <span className="text-slate-400">{h.days}:</span>
                    <strong className="text-white font-medium">{h.time}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Map Visual Mockup */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-sky-600" /> Interactive Map & Parking
              </h4>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                Free Valet Parking
              </span>
            </div>

            {/* Simulated Map Banner */}
            <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center text-center p-4">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-white font-bold text-xs block">Medical District, Suite 100</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3 py-1 rounded-full bg-white text-slate-900 text-[11px] font-bold shadow-sm hover:bg-slate-100"
                >
                  Get Directions on Google Maps ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Car className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Multi-story patient parking structure accessible via Gate B.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

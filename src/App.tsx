import React, { useState, useEffect } from 'react';
import { PageType, Appointment } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { ContactPage } from './pages/ContactPage';
import { 
  getAppointments, 
  saveNewAppointment, 
  cancelAppointmentDB, 
  rescheduleAppointmentDB, 
  isSupabaseConfigured 
} from './lib/supabase';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedDoctorIdForBooking, setSelectedDoctorIdForBooking] = useState<string | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load appointments from Supabase (or fallback) on initial mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getAppointments();
        if (isMounted) {
          setAppointments(data);
        }
      } catch (err) {
        console.error('Error loading appointments:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Navigate handler
  const handleNavigate = (page: PageType, doctorId?: string) => {
    if (doctorId) {
      setSelectedDoctorIdForBooking(doctorId);
    } else if (page !== 'book') {
      setSelectedDoctorIdForBooking(undefined);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Appointment created handler
  const handleAppointmentCreated = async (newApt: Appointment) => {
    setAppointments(prev => [newApt, ...prev]);
    await saveNewAppointment(newApt);
  };

  // Cancel appointment
  const handleCancelAppointment = async (id: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    ));
    await cancelAppointmentDB(id);
  };

  // Reschedule appointment
  const handleRescheduleAppointment = async (id: string, newDate: string, newTime: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, date: newDate, time: newTime, status: 'confirmed' as const } : apt
    ));
    await rescheduleAppointmentDB(id, newDate, newTime);
  };

  // Count active upcoming appointments
  const upcomingCount = appointments.filter(
    a => a.status === 'confirmed' || a.status === 'pending'
  ).length;

  const dbConfigured = isSupabaseConfigured();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        activePage={activePage}
        onNavigate={handleNavigate}
        upcomingCount={upcomingCount}
      />

      {/* Database Status Info Banner */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-slate-200">Database Engine:</span>
            {dbConfigured ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle className="w-3 h-3" /> Supabase Live Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
                <AlertCircle className="w-3 h-3" /> Supabase Schema Ready (Local Sync Active)
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            SQL script created in <code className="text-sky-300 bg-slate-800 px-1.5 py-0.5 rounded">/supabase_schema.sql</code> for Supabase deployment
          </p>
        </div>
      </div>

      {/* Main Page View Container */}
      <main className="flex-1 animate-fadeIn">
        {activePage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {activePage === 'doctors' && (
          <DoctorsPage onNavigate={handleNavigate} />
        )}

        {activePage === 'book' && (
          <BookAppointmentPage 
            initialDoctorId={selectedDoctorIdForBooking}
            onNavigate={handleNavigate}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}

        {activePage === 'my-appointments' && (
          <MyAppointmentsPage 
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}


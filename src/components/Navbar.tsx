import React, { useState } from 'react';
import { PageType } from '../types';
import { CLINIC_INFO } from '../data/mockData';
import { 
  HeartPulse, 
  PhoneCall, 
  Clock, 
  Calendar, 
  User, 
  Menu, 
  X, 
  MapPin, 
  ShieldAlert, 
  Stethoscope, 
  CheckCircle2 
} from 'lucide-react';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  upcomingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, upcomingCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'doctors', label: 'Our Doctors', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'book', label: 'Book Appointment', icon: <Calendar className="w-4 h-4" /> },
    { id: 'my-appointments', label: 'My Appointments', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              24/7 Emergency Services Ready
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" /> Mon - Fri: 8:00 AM - 8:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${CLINIC_INFO.emergencyPhone}`} 
              className="flex items-center gap-1.5 text-rose-300 hover:text-rose-200 font-semibold transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Emergency: {CLINIC_INFO.emergencyPhone}
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={`tel:${CLINIC_INFO.phone}`} 
              className="hidden sm:flex items-center gap-1.5 text-sky-300 hover:text-sky-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" /> {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="nav-logo-btn"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 p-0.5 shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-sky-600 group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
                Apex<span className="text-sky-600">Care</span>
                <span className="text-emerald-500 font-normal text-xs ml-1 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">PLUS</span>
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">Medical & Specialty Clinic</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200/80">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`desktop-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                  {item.id === 'my-appointments' && upcomingCount > 0 && (
                    <span className="ml-1 bg-emerald-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                      {upcomingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Callout */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-book-cta-btn"
              onClick={() => handleNavClick('book')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-sky-50 text-sky-800 font-semibold border border-sky-100' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                {item.id === 'my-appointments' && upcomingCount > 0 && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {upcomingCount} active
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <button
              id="mobile-drawer-book-btn"
              onClick={() => handleNavClick('book')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

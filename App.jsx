import React, { useState, useEffect, useRef } from 'react';
import {
  Plane, Globe, Award, Users, CheckCircle2, Phone, Mail, MapPin,
  Send, ArrowRight, ArrowUpRight, Star, Briefcase, GraduationCap, Building2,
  Shield, ShieldCheck, Calendar, Menu, X, MessageCircle,
  Facebook, Instagram, Linkedin, ChevronDown, ChevronRight,
  Compass, Sparkles, Target, TrendingUp, FileCheck, HeartHandshake,
  Quote, Search, BookOpen, Clock, Anchor, Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================================
   ACCURATE CONSULTANCY — Premium Immigration Website
   Main App component. Global styles live in src/index.css
   Routing is state-based for simplicity (no router dependency)
============================================================ */

const BRAND = {
  name: 'Accurate Consultancy',
  short: 'Accurate Consultancy',
  domain: 'accurate-consultancy.com',
  email: 'info@accurate-consultancy.com',
  phone1: '+92 316 0285386',
  phone2: '+92 303 0411114',
  whatsapp1: '923160285386',
  whatsapp2: '923030411114',
};

/* ---------- Reusable: Animated Counter ---------- */
const Counter = ({ end, suffix = '', duration = 2000, label }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(end / (duration / 16)));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold gradient-gold-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/70 mt-3 uppercase tracking-widest text-xs font-medium">{label}</div>
    </div>
  );
};

/* ---------- World Map SVG (simplified continent dots) ---------- */
const WorldMapBg = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-25"
    viewBox="0 0 1200 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#c9a55a" />
      </pattern>
      <mask id="continent-mask">
        {/* North America */}
        <path d="M 130 130 Q 200 100 280 120 Q 340 140 360 200 Q 350 260 280 280 Q 200 290 150 260 Q 100 220 130 130 Z" fill="white"/>
        {/* South America */}
        <path d="M 280 320 Q 320 300 350 330 Q 360 400 340 460 Q 310 500 290 470 Q 260 410 280 320 Z" fill="white"/>
        {/* Europe */}
        <path d="M 530 140 Q 600 130 650 150 Q 670 180 640 210 Q 580 220 540 200 Q 510 170 530 140 Z" fill="white"/>
        {/* Africa */}
        <path d="M 560 240 Q 630 230 680 270 Q 700 350 660 420 Q 610 450 580 410 Q 540 340 560 240 Z" fill="white"/>
        {/* Asia */}
        <path d="M 680 130 Q 800 110 920 150 Q 980 200 950 260 Q 870 280 770 260 Q 700 230 680 130 Z" fill="white"/>
        {/* Australia */}
        <path d="M 920 380 Q 990 370 1030 400 Q 1040 440 1000 450 Q 940 450 920 420 Z" fill="white"/>
      </mask>
    </defs>
    <rect width="1200" height="600" fill="url(#dots)" mask="url(#continent-mask)" />
  </svg>
);

/* ---------- Floating decorations ---------- */
const FloatingDecor = () => (
  <>
    {/* Floating flags */}
    <div className="absolute top-20 left-[8%] text-3xl animate-float-slow opacity-70" style={{ animationDelay: '0s' }}>🇺🇸</div>
    <div className="absolute top-32 right-[10%] text-3xl animate-float-medium opacity-70" style={{ animationDelay: '1.2s' }}>🇨🇦</div>
    <div className="absolute top-1/2 left-[5%] text-3xl animate-float-slow opacity-70" style={{ animationDelay: '2s' }}>🇬🇧</div>
    <div className="absolute bottom-40 right-[8%] text-3xl animate-float-medium opacity-70" style={{ animationDelay: '0.6s' }}>🇦🇺</div>
    <div className="absolute top-2/3 right-[20%] text-3xl animate-float-slow opacity-60" style={{ animationDelay: '1.8s' }}>🇩🇪</div>
    <div className="absolute bottom-1/3 left-[15%] text-3xl animate-float-medium opacity-60" style={{ animationDelay: '2.4s' }}>🇦🇪</div>

    {/* Airplanes */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute animate-plane">
        <Plane size={36} className="text-gold" style={{ filter: 'drop-shadow(0 0 12px rgba(201,165,90,0.6))' }} />
      </div>
      <div className="absolute animate-plane-2">
        <Plane size={28} className="text-gold-light" style={{ filter: 'drop-shadow(0 0 8px rgba(230,201,128,0.5))' }} />
      </div>
    </div>

    {/* Visa stamp decorations */}
    <div className="absolute top-1/4 right-[25%] hidden lg:block opacity-30 animate-stamp">
      <div className="visa-stamp text-gold text-xs font-bold">
        <div>★ APPROVED ★</div>
        <div className="text-center mt-1">2024</div>
      </div>
    </div>
  </>
);

/* ---------- Rotating Globe (CSS) ---------- */
const RotatingGlobe = ({ size = 280 }) => (
  <div
    className="relative animate-spin-very-slow"
    style={{ width: size, height: size }}
  >
    <div className="absolute inset-0 rounded-full globe-shadow"
         style={{ background: 'radial-gradient(circle at 30% 30%, #1a2f56 0%, #0a1628 70%)' }}>
      {/* meridians */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-gold-soft opacity-30"
          style={{ transform: `rotateY(${i * 30}deg)`, borderColor: 'rgba(201, 165, 90, 0.25)' }}
        />
      ))}
      {/* parallels */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t opacity-30"
          style={{
            top: `${(i + 1) * (100 / 6)}%`,
            borderColor: 'rgba(201, 165, 90, 0.25)',
          }}
        />
      ))}
      {/* dot markers — destinations */}
      {[
        { top: '30%', left: '25%' }, { top: '35%', left: '50%' }, { top: '40%', left: '75%' },
        { top: '60%', left: '30%' }, { top: '55%', left: '60%' }, { top: '50%', left: '15%' },
        { top: '65%', left: '80%' }, { top: '25%', left: '65%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold animate-pulse-gold"
          style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>
  </div>
);

/* ============================================================
   NAVIGATION
============================================================ */
const Navigation = ({ activePage, setActivePage, mobileOpen, setMobileOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'immigration', label: 'Immigration' },
    { id: 'study', label: 'Study Abroad' },
    { id: 'business', label: 'Business' },
    { id: 'tourist', label: 'Tourist Visas' },
    { id: 'countries', label: 'Countries' },
    { id: 'stories', label: 'Success' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy-deep shadow-2xl py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0 }); }}
            className="flex items-center gap-2 group"
          >
            <img 
              src="/logo.png" 
              alt="Accurate Consultancy" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); window.scrollTo({ top: 0 }); }}
                className={`px-3 py-2 text-sm tracking-wide transition-colors relative ${
                  activePage === item.id ? 'text-gold' : 'text-white/80 hover:text-gold'
                }`}
              >
                {item.label}
                {activePage === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0 }); }}
              className="hidden md:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm items-center gap-2"
            >
              Book Consultation <ArrowRight size={14} />
            </button>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy-deepest/98 lg:hidden pt-24 px-6 animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileOpen(false); window.scrollTo({ top: 0 }); }}
                className={`text-left py-4 border-b border-gold-soft text-lg font-display tracking-wide transition-colors animate-fade-up ${
                  activePage === item.id ? 'text-gold' : 'text-white/90'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
                <ArrowRight size={16} className="inline ml-2 opacity-50" />
              </button>
            ))}
            <button
              onClick={() => { setActivePage('contact'); setMobileOpen(false); window.scrollTo({ top: 0 }); }}
              className="btn-gold py-4 mt-6 rounded-full text-center font-semibold"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ============================================================
   HERO SECTION
============================================================ */
const Hero = ({ setActivePage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-navy">
    {/* World map dotted background */}
    <WorldMapBg />
    {/* Subtle dot grid layer */}
    <div className="absolute inset-0 world-dots opacity-40" />
    {/* Radial gold glow */}
    <div className="absolute inset-0 gradient-radial-gold" />
    {/* Floating decorations */}
    <FloatingDecor />

    <div className="relative z-10 max-w-7xl mx-auto px-5 py-32 grid lg:grid-cols-12 gap-12 items-center w-full">
      {/* Left: Headline */}
      <div className="lg:col-span-7 text-center lg:text-left">
        <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-7 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs tracking-[0.25em] uppercase">15+ Years of Trusted Experience</span>
        </div>

        <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-7 animate-fade-up delay-100">
          Your <span className="gradient-gold-text italic font-medium">Global Mobility</span><br />
          Partner.
        </h1>

        <p className="text-white/75 text-lg md:text-xl max-w-2xl lg:max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0 animate-fade-up delay-200">
          Strategic immigration, study abroad and global business solutions —
          turning visa goals into approved realities through bespoke advisory
          for discerning clients across the world.
        </p>

        <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up delay-300">
          <button
            onClick={() => setActivePage('contact')}
            className="btn-gold px-8 py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center gap-2"
          >
            <Calendar size={18} /> Book Consultation
          </button>
          <a
            href={`https://wa.me/${BRAND.whatsapp1}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center gap-2"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 animate-fade-up delay-500">
          {[
            { icon: ShieldCheck, label: 'Licensed' },
            { icon: Award, label: 'Award-winning' },
            { icon: Globe, label: '50+ Countries' },
          ].map((b, i) => (
            <div key={i} className="text-center">
              <b.icon size={22} className="text-gold mx-auto mb-2" />
              <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Globe + counters */}
      <div className="lg:col-span-5 flex flex-col items-center animate-scale-in delay-300">
        <RotatingGlobe size={320} />
        <div className="grid grid-cols-2 gap-5 mt-10 w-full max-w-sm">
          <Counter end={5000} suffix="+" label="Successful Visas" />
          <Counter end={50} suffix="+" label="Countries" />
        </div>
      </div>
    </div>

    {/* Scroll cue */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up delay-1000">
      <div className="flex flex-col items-center gap-2 text-gold/70">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </div>
  </section>
);

/* ============================================================
   WHY CHOOSE US
============================================================ */
const WhyChooseUs = () => {
  const features = [
    { icon: Award, title: 'Proven Track Record', text: 'Nearly two decades of successful visa approvals across complex immigration jurisdictions worldwide.' },
    { icon: Crown, title: 'Premium Advisory', text: 'White-glove service for high-net-worth individuals, executives, families and ambitious entrepreneurs.' },
    { icon: ShieldCheck, title: 'Regulated & Trusted', text: 'Compliant practices aligned with USCIS, IRCC, UKVI, ICA and Schengen consular requirements.' },
    { icon: Target, title: 'Bespoke Strategies', text: 'Every case is custom-architected — from EB-1A profile building to D2 business plan structuring.' },
    { icon: HeartHandshake, title: 'End-to-End Partnership', text: 'From initial assessment through landing services in your destination country.' },
    { icon: TrendingUp, title: 'Outcome-Focused', text: 'Industry-leading approval rates backed by transparent process and honest case evaluation.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 world-dots" />
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="max-w-3xl mb-16">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Why Choose Us</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent">
            The Quiet Confidence of <em className="gradient-gold-text not-italic">Authentic Expertise</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 bg-white rounded-sm hover-gold-border card-lift relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-sm flex items-center justify-center bg-navy-deep mb-6 group-hover:bg-gold transition-colors">
                  <f.icon size={26} className="text-gold group-hover:text-navy-deep transition-colors" />
                </div>
                <h3 className="font-display text-navy-deep text-2xl mb-3">{f.title}</h3>
                <p className="text-navy/70 leading-relaxed">{f.text}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FEATURED VISA PROGRAMS
============================================================ */
const FeaturedPrograms = ({ setActivePage }) => {
  const programs = [
    { code: '01', title: 'Canada Immigration', sub: 'Express Entry · PNP', desc: 'Permanent residency through Express Entry, Provincial Nominee Programs and category-based draws — Canada\'s flagship skilled migration pathway.', tag: 'Premier' },
    { code: '02', title: 'USA EB-2 NIW', sub: 'National Interest Waiver', desc: 'Self-petition green card for advanced-degree professionals whose work substantially benefits the United States.', tag: 'Top Tier' },
    { code: '03', title: 'E-2 Treaty Investor', sub: 'United States Investor Visa', desc: 'Live and operate a business in the United States through a substantial investment from a qualifying treaty country.', tag: 'Investment' },
    { code: '04', title: 'Australia Immigration', sub: 'Skilled Migration Program', desc: 'Skilled Independent (189), Skilled Nominated (190) and Employer-Sponsored streams to Australian permanent residency.', tag: 'Premier' },
    { code: '05', title: 'Job Seeker Visa', sub: 'Germany & Beyond', desc: 'Six-month residency to seek qualified employment in Germany and select EU jurisdictions — the gateway to the EU Blue Card.', tag: 'Career' },
    { code: '06', title: 'Start-up Visa', sub: 'Founder Pathway', desc: 'Permanent residency for innovative founders backed by designated organisations — Canada Start-up Visa and equivalent routes.', tag: 'Founder' },
  ];

  return (
    <section className="py-24 md:py-32 gradient-navy relative overflow-hidden">
      <WorldMapBg />
      <div className="absolute inset-0 gradient-radial-gold opacity-30" />

      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Featured Visa Programs</p>
            <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Premier Pathways to <em className="gradient-gold-text not-italic font-medium">Global Citizenship</em>.
            </h2>
          </div>
          <button
            onClick={() => setActivePage('immigration')}
            className="btn-outline-gold px-6 py-3 rounded-full text-sm inline-flex items-center gap-2"
          >
            All Programs <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <div
              key={i}
              className="glass p-8 rounded-sm hover-gold-border card-lift group cursor-pointer relative overflow-hidden"
              onClick={() => setActivePage('immigration')}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-gold/40 text-4xl">{p.code}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase border border-gold-soft text-gold px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-display text-white text-2xl mb-1">{p.title}</h3>
              <p className="text-gold text-sm font-italic-serif italic mb-4">{p.sub}</p>
              <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>
              <div className="flex items-center gap-2 text-gold text-sm group-hover:gap-4 transition-all">
                <span>Explore Pathway</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   COUNTRIES WE SERVE
============================================================ */
const COUNTRY_DATA = [
  { code: 'US', name: 'United States', flag: '🇺🇸', tag: 'Marquee Destination', desc: 'EB-1A, EB-2 NIW, O-1, E-2, L-1 and B1/B2 — comprehensive US immigration counsel.', highlights: ['Investor & Talent Visas', 'Green Card Strategy', 'Business Pathways'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', tag: 'Permanent Residency', desc: 'Express Entry, PNP, Start-Up Visa and Study Permits — premium Canadian advisory.', highlights: ['Express Entry', 'Start-Up Visa', 'Study Permits'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', tag: 'Innovator & Talent', desc: 'Innovator Founder, Global Talent, Skilled Worker, Student and Visit Visa pathways.', highlights: ['Innovator Founder', 'Global Talent', 'Visit Visa'] },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', tag: 'Skilled Migration', desc: 'Skilled Independent (189), Skilled Nominated (190) and Business Innovation streams.', highlights: ['Subclass 189/190', 'Business Innovation', 'Student Visas'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', tag: 'Engineering & Study', desc: 'EU Blue Card, Job Seeker, Opportunity Card and tuition-free university admissions.', highlights: ['EU Blue Card', 'Opportunity Card', 'Free Tuition'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', tag: 'Talent Passport', desc: 'Passeport Talent, business setup and prestigious grandes écoles admissions.', highlights: ['Talent Passport', 'Business Setup', 'Top Universities'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', tag: 'Entrepreneur & Study', desc: 'Entrepreneur Visa, Non-Lucrative Visa and study programmes across Spain.', highlights: ['Entrepreneur Visa', 'Non-Lucrative', 'University Admissions'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', tag: 'D2 & Golden Door', desc: 'D2 Entrepreneur, D7 Passive Income and pathways to EU permanent residency.', highlights: ['D2 Visa', 'D7 Visa', 'EU Residency'] },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', tag: 'Business Hub', desc: 'Mainland & Free Zone company formation, Golden Visa and family residency.', highlights: ['Free Zone Setup', 'Golden Visa', 'Investor Routes'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', tag: 'Visit & Study', desc: 'Tourist visa, business meetings, education and family visit visa support.', highlights: ['Tourist Visa', 'Business Meetings', 'Student Routes'] },
];

const CountriesGrid = ({ setActivePage }) => (
  <section className="py-24 md:py-32 bg-cream relative overflow-hidden">
    <div className="absolute inset-0 world-dots opacity-30" />
    <div className="max-w-7xl mx-auto px-5 relative">
      <div className="text-center mb-16">
        <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Countries We Serve</p>
        <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent-center">
          A World of <em className="gradient-gold-text not-italic font-medium">Opportunity</em>.
        </h2>
        <p className="text-navy/70 max-w-2xl mx-auto mt-6 text-lg">
          Curated pathways across ten flagship destinations — every case handled with regulatory precision and discretion.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {COUNTRY_DATA.map((c, i) => (
          <div
            key={i}
            onClick={() => setActivePage('countries')}
            className="bg-white p-6 rounded-sm border border-navy/5 hover-gold-border card-lift cursor-pointer group relative overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="absolute top-3 right-3 text-4xl opacity-90">{c.flag}</div>
            <div className="text-gold text-[10px] tracking-[0.2em] uppercase mb-3 mt-1">{c.tag}</div>
            <h3 className="font-display text-navy-deep text-xl leading-tight mb-3">{c.name}</h3>
            <p className="text-navy/65 text-xs leading-relaxed mb-4 line-clamp-3">{c.desc}</p>
            <div className="gold-line mb-3" />
            <div className="flex items-center gap-1 text-gold text-xs group-hover:gap-2 transition-all">
              Explore <ChevronRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   STUDY ABROAD STRIP
============================================================ */
const StudyAbroadStrip = ({ setActivePage }) => {
  const destinations = [
    { country: 'United Kingdom', flag: '🇬🇧', count: '160+', label: 'Russell Group & beyond' },
    { country: 'Canada', flag: '🇨🇦', count: '95+', label: 'Designated Learning Institutions' },
    { country: 'Australia', flag: '🇦🇺', count: '40+', label: 'Group of Eight & top tier' },
    { country: 'Germany', flag: '🇩🇪', count: '380+', label: 'Tuition-free public universities' },
    { country: 'France', flag: '🇫🇷', count: '70+', label: 'Grandes écoles partnerships' },
    { country: 'Spain', flag: '🇪🇸', count: '60+', label: 'Bilingual programmes' },
    { country: 'Portugal', flag: '🇵🇹', count: '30+', label: 'EU pathway via study' },
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-deepest relative overflow-hidden">
      <div className="absolute inset-0 world-dots opacity-15" />
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-12">
          <div className="lg:col-span-5">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Study Abroad</p>
            <h2 className="font-display text-white text-4xl md:text-5xl leading-[1.05] mb-6">
              An <em className="gradient-gold-text not-italic font-medium">Education</em> That Travels with You.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              From Oxbridge tutorials to Bavarian engineering schools and Iberian
              business academies — we orchestrate admissions, financial documentation,
              CAS, COE, GTE and visa lodgement with end-to-end care.
            </p>
            <button
              onClick={() => setActivePage('study')}
              className="btn-gold px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              Explore Study Pathways <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {destinations.map((d, i) => (
              <div
                key={i}
                className="glass p-5 rounded-sm flex items-center gap-4 hover-gold-border animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="text-3xl">{d.flag}</span>
                <div className="flex-1">
                  <div className="text-white font-display text-lg leading-tight">{d.country}</div>
                  <div className="text-white/55 text-xs">{d.label}</div>
                </div>
                <div className="text-gold font-display text-2xl">{d.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   BUSINESS IMMIGRATION SECTION
============================================================ */
const BusinessSection = ({ setActivePage }) => {
  const programs = [
    { country: 'UAE', flag: '🇦🇪', title: 'UAE Company Formation', desc: 'Mainland, Free Zone and Offshore structures with banking and Golden Visa support.' },
    { country: 'Portugal', flag: '🇵🇹', title: 'D2 Entrepreneur Visa', desc: 'Establish a business in Portugal with a clear pathway to EU permanent residency.' },
    { country: 'Spain', flag: '🇪🇸', title: 'Entrepreneur Visa', desc: 'Innovative business proposal endorsement leading to Spanish residency rights.' },
    { country: 'United Kingdom', flag: '🇬🇧', title: 'Innovator Founder', desc: 'Endorsement-backed UK route for genuine, viable, scalable business ventures.' },
    { country: 'Canada', flag: '🇨🇦', title: 'Start-Up Visa Programme', desc: 'Designated organisation backing for permanent residency through innovation.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Business Immigration</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent-center">
            Where <em className="gradient-gold-text not-italic font-medium">Capital</em> Meets Citizenship.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <div
              key={i}
              onClick={() => setActivePage('business')}
              className="bg-navy-deep p-8 rounded-sm group hover-gold-border card-lift cursor-pointer relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">{p.flag}</span>
                <Briefcase size={20} className="text-gold opacity-50" />
              </div>
              <div className="text-gold text-[10px] tracking-[0.2em] uppercase mb-2">{p.country}</div>
              <h3 className="font-display text-white text-2xl mb-3 leading-tight">{p.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>
              <div className="flex items-center gap-2 text-gold text-sm">
                Discuss Eligibility <ArrowRight size={14} />
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="gradient-gold p-8 rounded-sm flex flex-col justify-between min-h-[280px]">
            <div>
              <Sparkles size={26} className="text-navy-deep mb-4" />
              <h3 className="font-display text-navy-deep text-2xl mb-3 leading-tight">Bespoke Investor Strategy</h3>
              <p className="text-navy-deep/80 text-sm leading-relaxed">
                Confidential consultation for HNWI clients exploring multi-jurisdiction residency, citizenship and asset structuring.
              </p>
            </div>
            <button
              onClick={() => setActivePage('contact')}
              className="bg-navy-deep text-white px-5 py-3 rounded-full text-sm inline-flex items-center justify-center gap-2 mt-6 hover:bg-navy transition-colors"
            >
              Schedule Private Brief <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   AIRLINE & TOUR PACKAGES
============================================================ */
const AirlineTourPackages = ({ setActivePage }) => {
  const services = [
    {
      icon: Plane,
      title: 'Premium Airline Bookings',
      desc: 'Business and first-class fares with global carriers — Emirates, Qatar Airways, Turkish Airlines, British Airways and more.',
      tag: 'Worldwide',
    },
    {
      icon: Compass,
      title: 'Curated Tour Packages',
      desc: 'Bespoke itineraries across Europe, Türkiye, the Far East and the Americas — handcrafted by our travel desk for discerning travellers.',
      tag: 'Luxury',
    },
    {
      icon: Anchor,
      title: 'Umrah & Religious Travel',
      desc: 'End-to-end Umrah packages with premium hotels in Makkah and Madinah, ground transport and visa processing.',
      tag: 'Spiritual',
    },
    {
      icon: Sparkles,
      title: 'Honeymoon & Family',
      desc: 'Honeymoon escapes and family holidays — Maldives, Türkiye, Azerbaijan, Thailand, Malaysia and tailored European tours.',
      tag: 'Bespoke',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full opacity-5 world-dots" />
      {/* Decorative airplane */}
      <div className="absolute top-12 right-[8%] hidden lg:block opacity-10">
        <Plane size={140} className="text-gold" style={{ transform: 'rotate(-25deg)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Airline & Tour Packages</p>
            <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent">
              Beyond Visas — <em className="gradient-gold-text not-italic font-medium">Curated Journeys</em>.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-navy/70 text-lg leading-relaxed">
              Our in-house travel desk handles flights, hotels and complete itineraries — so the journey from visa
              issuance to landing is one seamless, beautifully orchestrated experience.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              onClick={() => setActivePage('contact')}
              className="bg-white p-7 rounded-sm hover-gold-border card-lift cursor-pointer group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-sm bg-navy-deep flex items-center justify-center mb-5 group-hover:bg-gold transition-colors">
                  <s.icon size={24} className="text-gold group-hover:text-navy-deep transition-colors" />
                </div>
                <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2">{s.tag}</div>
                <h3 className="font-display text-navy-deep text-xl mb-3 leading-tight">{s.title}</h3>
                <p className="text-navy/65 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center gap-2 text-gold text-xs group-hover:gap-3 transition-all">
                  Enquire <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strip of perks */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 p-8 bg-navy-deep rounded-sm">
          {[
            { label: 'IATA Affiliated Bookings' },
            { label: '24/7 Travel Support' },
            { label: 'Group & Corporate Rates' },
            { label: 'Visa-Linked Itineraries' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3 text-white/85">
              <CheckCircle2 size={18} className="text-gold flex-shrink-0" />
              <span className="text-sm">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   TESTIMONIALS
============================================================ */
const Testimonials = () => {
  const items = [
    { name: 'Dr. A. Khalid', role: 'EB-1A Approved · Researcher', flag: '🇺🇸', text: 'The strategic dossier they prepared for my EB-1A profile was extraordinary in its rigour. The team understood the science as well as the immigration law.' },
    { name: 'S. Rahman', role: 'UAE Golden Visa Holder', flag: '🇦🇪', text: 'They orchestrated my company formation, banking and Golden Visa in a single seamless engagement. Genuinely white-glove service from initial brief to issuance.' },
    { name: 'Mr. & Mrs. T. Akhtar', role: 'Canada PR — Express Entry', flag: '🇨🇦', text: 'After two failed attempts with another firm, the Accurate team rebuilt our profile from the ground up. ITA in eight weeks. Forever grateful for their precision.' },
    { name: 'F. Iqbal', role: 'UK Innovator Founder', flag: '🇬🇧', text: 'Their business plan structuring secured our endorsement on the first attempt. The depth of understanding around the Innovator Founder route was remarkable.' },
  ];

  return (
    <section className="py-24 md:py-32 gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 world-dots opacity-15" />
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Client Testimonials</p>
          <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent-center">
            Voices of <em className="gradient-gold-text not-italic font-medium">Clients We've Served</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <div
              key={i}
              className="glass p-8 md:p-10 rounded-sm hover-gold-border relative animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote size={36} className="text-gold/40 mb-4" />
              <p className="text-white/85 text-lg font-italic-serif italic leading-relaxed mb-8">
                "{t.text}"
              </p>
              <div className="gold-line mb-5" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-gold text-lg">{t.name}</div>
                  <div className="text-white/55 text-xs tracking-wide uppercase mt-1">{t.role}</div>
                </div>
                <div className="text-3xl">{t.flag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   STATS COUNTER
============================================================ */
const StatsBand = () => (
  <section className="py-20 bg-navy-deepest relative overflow-hidden">
    <div className="absolute inset-0 gradient-radial-gold opacity-30" />
    <div className="max-w-7xl mx-auto px-5 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Counter end={5000} suffix="+" label="Successful Visas" />
        <Counter end={50} suffix="+" label="Countries Served" />
        <Counter end={19} suffix=" Yrs" label="Industry Experience" />
        <Counter end={98} suffix="%" label="Approval Rate" />
      </div>
    </div>
  </section>
);

/* ============================================================
   FAQ SECTION
============================================================ */
const FAQItem = ({ q, a, open, onClick }) => (
  <div className="border-b border-navy/10">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-start justify-between gap-6 text-left group"
    >
      <span className="font-display text-navy-deep text-lg md:text-xl pr-4 group-hover:text-gold transition-colors">
        {q}
      </span>
      <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-gold flex items-center justify-center transition-all ${
        open ? 'bg-gold rotate-180' : ''
      }`}>
        <ChevronDown size={16} className={open ? 'text-navy-deep' : 'text-gold'} />
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-navy/70 leading-relaxed">{a}</p>
    </div>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const items = [
    { q: 'What makes Accurate Consultancy different from other firms?', a: 'Our differentiator is the combination of nearly two decades of regulatory experience with bespoke, case-by-case strategy. We do not run high-volume application factories — every client receives senior consultant attention.' },
    { q: 'Which immigration jurisdictions do you specialise in?', a: 'We advise across the United States, Canada, United Kingdom, Australia, Schengen Area (Germany, France, Spain, Portugal, etc.), United Arab Emirates, Singapore and Caribbean CBI programmes.' },
    { q: 'How long does the consultation and case strategy take?', a: 'An initial assessment is typically completed within 48 hours. Full case strategy documentation depends on programme — EB-1A profile dossiers, for example, run 3 to 6 weeks.' },
    { q: 'Do you handle complex cases with prior refusals?', a: 'Yes — refusal recovery is one of our specialisms. We conduct a forensic review of refusal grounds, restructure the case file and lodge re-applications or appeals (such as Article 32(3) appeals for Schengen) where warranted.' },
    { q: 'What documents do I need to begin a consultation?', a: 'For an initial brief: passport bio page, CV / resume, education credentials and any prior visa history. Programme-specific documentation will be requested after the strategy session.' },
    { q: 'Are your services confidential?', a: 'Absolutely. All client engagements are governed by professional confidentiality. We routinely advise high-net-worth and public-figure clients and treat every file with discretion.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Frequently Asked</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent-center">
            Questions, <em className="gradient-gold-text not-italic font-medium">Answered</em>.
          </h2>
        </div>
        <div>
          {items.map((it, i) => (
            <FAQItem
              key={i}
              q={it.q}
              a={it.a}
              open={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ELIGIBILITY CHECKER
============================================================ */
const EligibilityChecker = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'goal', q: 'What is your primary objective?', opts: ['Permanent Residency', 'Study Abroad', 'Business / Investment', 'Tourism / Visit'] },
    { id: 'destination', q: 'Preferred destination?', opts: ['United States', 'Canada', 'United Kingdom', 'Europe (Schengen)', 'Australia', 'UAE'] },
    { id: 'profile', q: 'Which best describes you?', opts: ['Highly skilled professional', 'Student', 'Entrepreneur / Investor', 'Family / Visitor'] },
  ];

  const reset = () => { setStep(0); setAnswers({}); };

  if (step >= questions.length) {
    return (
      <section className="py-24 md:py-32 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 world-dots opacity-15" />
        <div className="max-w-3xl mx-auto px-5 relative text-center">
          <div className="visa-stamp inline-block text-gold mx-auto mb-8 animate-stamp">
            <div className="text-xl font-bold">★ ELIGIBLE ★</div>
            <div className="text-center mt-1 text-sm">Initial Assessment</div>
          </div>
          <h2 className="font-display text-white text-4xl md:text-5xl mb-6">
            You may qualify for <em className="gradient-gold-text not-italic">premium pathways</em>.
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Based on your profile, our consultants have identified strong matches.
            Book a private consultation for a detailed strategy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${BRAND.whatsapp1}?text=Hi%20Accurate%20Consultancy%2C%20I%20completed%20your%20eligibility%20checker%20and%20would%20like%20to%20discuss%20my%20options.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-gold px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              <MessageCircle size={16} /> Continue on WhatsApp
            </a>
            <button onClick={reset} className="btn-outline-gold px-7 py-3.5 rounded-full text-sm font-semibold">
              Reset Checker
            </button>
          </div>
        </div>
      </section>
    );
  }

  const cur = questions[step];
  return (
    <section className="py-24 md:py-32 gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 world-dots opacity-15" />
      <div className="max-w-3xl mx-auto px-5 relative">
        <div className="text-center mb-12">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Eligibility Checker</p>
          <h2 className="font-display text-white text-3xl md:text-5xl leading-[1.05]">
            A <em className="gradient-gold-text not-italic font-medium">Three-Minute</em> Assessment.
          </h2>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-10 max-w-md mx-auto">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors ${i <= step ? 'bg-gold' : 'bg-white/15'}`}
            />
          ))}
        </div>

        <div className="glass p-8 md:p-12 rounded-sm">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Question {step + 1} / {questions.length}</div>
          <h3 className="font-display text-white text-2xl md:text-3xl mb-8">{cur.q}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {cur.opts.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setAnswers({ ...answers, [cur.id]: opt });
                  setStep(step + 1);
                }}
                className="text-left p-4 border border-gold-soft rounded-sm hover:border-gold hover:bg-gold/10 transition-all text-white/85 group"
              >
                <span className="flex items-center justify-between">
                  {opt}
                  <ArrowRight size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   BOOKING FORM
============================================================ */
const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '', service: '', message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', country: '', service: '', message: '' });
  };

  const upd = (k, v) => setForm({ ...form, [k]: v });

  return (
    <section className="py-24 md:py-32 bg-cream relative overflow-hidden" id="booking">
      <div className="absolute inset-0 world-dots opacity-25" />
      <div className="max-w-6xl mx-auto px-5 relative grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Book Consultation</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl leading-[1.05] heading-accent mb-6">
            Begin Your <em className="gradient-gold-text not-italic font-medium">Global</em> Story.
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-8">
            Share your goals — a senior consultant will respond within one business day with an initial assessment and proposed strategy.
          </p>

          <div className="space-y-5">
            {[
              { icon: Phone, label: 'Direct Line', val: BRAND.phone1 },
              { icon: MessageCircle, label: 'WhatsApp', val: BRAND.phone2 },
              { icon: Mail, label: 'Email', val: BRAND.email },
              { icon: MapPin, label: 'Office', val: 'Lahore, Pakistan' },
            ].map((it, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm border border-gold flex items-center justify-center flex-shrink-0">
                  <it.icon size={18} className="text-gold" />
                </div>
                <div>
                  <div className="text-navy/55 text-xs tracking-wider uppercase">{it.label}</div>
                  <div className="text-navy-deep">{it.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-sm shadow-2xl border border-gold-soft">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-5">
                <CheckCircle2 size={32} className="text-navy-deep" />
              </div>
              <h3 className="font-display text-navy-deep text-3xl mb-3">Request Received</h3>
              <p className="text-navy/70 max-w-md">
                A senior consultant will contact you within one business day. Thank you for your trust.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-navy/60 text-xs tracking-widest uppercase mb-2 block">Full Name *</label>
                  <input
                    required value={form.name} onChange={(e) => upd('name', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-navy-deep focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-navy/60 text-xs tracking-widest uppercase mb-2 block">Email *</label>
                  <input
                    required type="email" value={form.email} onChange={(e) => upd('email', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-navy-deep focus:border-gold focus:outline-none transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-navy/60 text-xs tracking-widest uppercase mb-2 block">Phone / WhatsApp *</label>
                  <input
                    required value={form.phone} onChange={(e) => upd('phone', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-navy-deep focus:border-gold focus:outline-none transition-colors"
                    placeholder="+92 ..."
                  />
                </div>
                <div>
                  <label className="text-navy/60 text-xs tracking-widest uppercase mb-2 block">Destination Country</label>
                  <select
                    value={form.country} onChange={(e) => upd('country', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-navy-deep focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select destination</option>
                    {COUNTRY_DATA.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-navy/60 text-xs tracking-widest uppercase mb-2 block">Service Interest</label>
                <select
                  value={form.service} onChange={(e) => upd('service', e.target.value)}
                  className="w-full border-b border-navy/20 bg-transparent py-3 text-navy-deep focus:border-gold focus:outline-none transition-colors"
                >
                  <option value="">Select service</option>
                  <option>USA Immigration (EB-1A / EB-2 NIW / O-1 / E-2 / L-1)</option>
                  <option>Study Abroad</option>
                  <option>Business Setup & Investor Residency</option>
                  <option>Tourist / Visit Visa</option>
                  <option>Other / Discuss</option>
                </select>
              </div>
              <div>
                <label className="text-navy/60 text-xs tracking-widest uppercase mb-2 block">Brief Description</label>
                <textarea
                  value={form.message} onChange={(e) => upd('message', e.target.value)}
                  rows={4}
                  className="w-full border-b border-navy/20 bg-transparent py-3 text-navy-deep focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your goals, profile and timeline..."
                />
              </div>
              <button type="submit" className="btn-gold w-full py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2">
                <Send size={16} /> Submit Request
              </button>
              <p className="text-navy/50 text-xs text-center">
                By submitting, you agree to be contacted regarding your enquiry. All information is kept strictly confidential.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FOOTER
============================================================ */
const Footer = ({ setActivePage }) => (
  <footer className="bg-navy-deepest text-white pt-20 pb-8 relative overflow-hidden">
    <div className="absolute inset-0 world-dots opacity-15" />
    <div className="max-w-7xl mx-auto px-5 relative">
      <div className="grid lg:grid-cols-12 gap-10 mb-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="mb-6">
            <img 
              src="/logo.png" 
              alt="Accurate Consultancy" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
            A premium global mobility consultancy — turning visa goals into approved realities through bespoke advisory for discerning clients across the world.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-gold-soft flex items-center justify-center hover:bg-gold hover:border-gold transition-colors group"
                aria-label="social"
              >
                <Icon size={16} className="text-gold group-hover:text-navy-deep" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-5">Navigate</div>
          <ul className="space-y-3 text-sm">
            {[['home','Home'],['about','About'],['immigration','Immigration'],['study','Study Abroad'],['business','Business']].map(([id,label]) => (
              <li key={id}>
                <button onClick={() => { setActivePage(id); window.scrollTo({ top: 0 }); }} className="text-white/70 hover:text-gold transition-colors">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-5">More</div>
          <ul className="space-y-3 text-sm">
            {[['tourist','Tourist Visas'],['countries','Countries'],['stories','Success Stories'],['blog','Blog'],['contact','Contact']].map(([id,label]) => (
              <li key={id}>
                <button onClick={() => { setActivePage(id); window.scrollTo({ top: 0 }); }} className="text-white/70 hover:text-gold transition-colors">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-4">
          <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-5">Contact</div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Globe size={16} className="text-gold mt-1 flex-shrink-0" />
              <a href={`https://${BRAND.domain}`} className="text-white/80 hover:text-gold transition-colors">{BRAND.domain}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-gold mt-1 flex-shrink-0" />
              <a href={`mailto:${BRAND.email}`} className="text-white/80 hover:text-gold transition-colors">{BRAND.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <a href={`tel:${BRAND.phone1.replace(/\s/g,'')}`} className="text-white/80 hover:text-gold transition-colors block">{BRAND.phone1}</a>
                <a href={`tel:${BRAND.phone2.replace(/\s/g,'')}`} className="text-white/80 hover:text-gold transition-colors block">{BRAND.phone2}</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={16} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <a href={`https://wa.me/${BRAND.whatsapp1}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gold transition-colors block">WhatsApp · {BRAND.phone1}</a>
                <a href={`https://wa.me/${BRAND.whatsapp2}`} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gold transition-colors block">WhatsApp · {BRAND.phone2}</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
              <span className="text-white/80">Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="gold-line mb-6" />
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-white/50">
        <div>© {new Date().getFullYear()} Accurate Consultancy. All rights reserved.</div>
        <div className="font-italic-serif italic text-gold/70">Turning Visa Goals into Approved Realities.</div>
      </div>
    </div>
  </footer>
);

/* ============================================================
   FLOATING WHATSAPP BUTTON
============================================================ */
const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${BRAND.whatsapp1}?text=Hi%20Accurate%20Consultancy%2C%20I%20would%20like%20to%20discuss%20my%20visa%20options.`}
    target="_blank" rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full gradient-gold flex items-center justify-center shadow-2xl animate-pulse-gold group"
    aria-label="WhatsApp"
  >
    <MessageCircle size={28} className="text-navy-deep group-hover:scale-110 transition-transform" />
    <span className="absolute right-full mr-3 bg-navy-deep text-white text-xs px-3 py-2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Chat with us
    </span>
  </a>
);

/* ============================================================
   PAGE: HOME
============================================================ */
const HomePage = ({ setActivePage }) => (
  <>
    <Hero setActivePage={setActivePage} />
    <WhyChooseUs />
    <FeaturedPrograms setActivePage={setActivePage} />
    <CountriesGrid setActivePage={setActivePage} />
    <StudyAbroadStrip setActivePage={setActivePage} />
    <BusinessSection setActivePage={setActivePage} />
    <AirlineTourPackages setActivePage={setActivePage} />
    <Testimonials />
    <StatsBand />
    <EligibilityChecker />
    <FAQ />
    <BookingForm />
  </>
);

/* ============================================================
   PAGE BANNER (reusable)
============================================================ */
const PageBanner = ({ eyebrow, title, subtitle, accent }) => (
  <section className="relative pt-40 pb-24 gradient-navy overflow-hidden">
    <WorldMapBg />
    <div className="absolute inset-0 gradient-radial-gold opacity-30" />
    <div className="max-w-7xl mx-auto px-5 relative text-center">
      <p className="text-gold tracking-[0.3em] uppercase text-xs mb-5 animate-fade-up">{eyebrow}</p>
      <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5 animate-fade-up delay-100">
        {title} {accent && <em className="gradient-gold-text not-italic font-medium">{accent}</em>}.
      </h1>
      {subtitle && (
        <p className="text-white/70 text-lg max-w-2xl mx-auto animate-fade-up delay-200">{subtitle}</p>
      )}
    </div>
  </section>
);

/* ============================================================
   PAGE: ABOUT
============================================================ */
const AboutPage = () => (
  <>
    <PageBanner
      eyebrow="About Us"
      title="A Consultancy of"
      accent="Quiet Excellence"
      subtitle="Nearly two decades of regulated immigration practice across the Gulf, South Asia and beyond — delivered with the precision of a top-tier law firm and the warmth of a private advisory."
    />
    <section className="py-24 bg-ivory">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Our Story</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl leading-[1.05] heading-accent mb-6">
            Built on Trust. <em className="gradient-gold-text not-italic">Refined</em> by Experience.
          </h2>
          <p className="text-navy/75 text-lg leading-relaxed mb-5">
            Accurate Consultancy was founded with a singular conviction:
            that immigration advisory should be intellectually rigorous,
            commercially astute, and uncompromisingly client-centric.
          </p>
          <p className="text-navy/75 leading-relaxed mb-5">
            From our origins serving discerning clients across the United Arab
            Emirates and Pakistan, we have grown into a global mobility partner
            for executives, founders, scholars, families and high-net-worth
            individuals seeking entry into the world's most coveted jurisdictions.
          </p>
          <p className="text-navy/75 leading-relaxed">
            We do not pursue volume. We pursue outcomes. Each case is designed
            from first principles, anchored in regulatory rigour, and delivered
            with the discretion our clients have come to expect.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square gradient-gold rounded-sm flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-4 border-2 border-navy-deep/20 rounded-sm" />
            <div className="text-center relative">
              <Globe size={120} className="text-navy-deep mx-auto mb-4" strokeWidth={1} />
              <div className="font-display text-navy-deep text-5xl mb-2">Est.</div>
              <div className="font-display text-navy-deep text-7xl font-bold">2007</div>
              <div className="text-navy-deep/70 text-xs tracking-[0.3em] uppercase mt-2">Lahore · Abu Dhabi</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-navy-deep p-6 rounded-sm w-48">
            <div className="font-display text-gold text-4xl">19+</div>
            <div className="text-white/70 text-xs tracking-widest uppercase mt-1">Years of Practice</div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Our Values</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl leading-[1.05] heading-accent-center">
            Principles That Guide Us.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: 'Integrity', text: 'We refuse cases we cannot ethically support — and tell our clients honestly when a pathway is unrealistic.' },
            { icon: Crown, title: 'Excellence', text: 'Every dossier is reviewed at senior consultant level. No shortcuts. No volume-driven compromises.' },
            { icon: HeartHandshake, title: 'Partnership', text: 'We walk the entire journey with our clients — from first consultation to landing in your destination country.' },
          ].map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-sm hover-gold-border text-center card-lift">
              <div className="w-16 h-16 mx-auto rounded-full bg-navy-deep flex items-center justify-center mb-6">
                <v.icon size={28} className="text-gold" />
              </div>
              <h3 className="font-display text-navy-deep text-2xl mb-3">{v.title}</h3>
              <p className="text-navy/65 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <StatsBand />
  </>
);

/* ============================================================
   PAGE: IMMIGRATION SERVICES
============================================================ */
const ImmigrationPage = ({ setActivePage }) => {
  const visas = [
    {
      code: 'CA',
      name: 'Canada Immigration Program',
      tag: 'Permanent Residency',
      desc: 'Comprehensive Canadian immigration counsel — Express Entry, Provincial Nominee Programs, category-based draws and family sponsorship.',
      criteria: ['Express Entry · CRS optimisation', 'Provincial Nominee Programs', 'Category-based draws', 'Direct path to citizenship']
    },
    {
      code: 'EB-2 NIW',
      name: 'National Interest Waiver',
      tag: 'United States · Green Card',
      desc: 'Self-petition green card for advanced-degree professionals whose work substantially benefits the United States — no labour certification required.',
      criteria: ['Advanced degree or equivalent', 'National importance of work', 'Well-positioned to advance', 'Waiver of job offer requirement']
    },
    {
      code: 'E-2',
      name: 'E-2 Treaty Investor Visa',
      tag: 'United States · Investor',
      desc: 'Live and operate a business in the United States through a substantial investment commitment from a qualifying treaty country.',
      criteria: ['Treaty country nationality', 'Substantial investment commitment', 'Active, real enterprise', 'Renewable indefinitely']
    },
    {
      code: 'AU',
      name: 'Australia Immigration Program',
      tag: 'Permanent Residency',
      desc: 'Skilled Independent (189), Skilled Nominated (190) and State-Sponsored streams — Australia\'s premium points-based migration system.',
      criteria: ['Subclass 189 · Independent', 'Subclass 190 · State Nomination', 'Skills assessment & EOI', 'Pathway to citizenship']
    },
    {
      code: 'JS',
      name: 'Job Seeker Visa',
      tag: 'Germany · Work Visa',
      desc: 'Six-month residency to seek qualified employment in Germany — the most direct gateway to an EU Blue Card and long-term EU residency.',
      criteria: ['Six-month residency permit', 'Qualified employment search', 'EU Blue Card pathway', 'Family reunification rights']
    },
    {
      code: 'SUV',
      name: 'Start-up Visa Programme',
      tag: 'Founder Pathway',
      desc: 'Permanent residency for innovative founders backed by designated organisations — covering Canada SUV, UK Innovator and equivalent founder routes.',
      criteria: ['Designated organisation backing', 'Innovative business proposal', 'Permanent residency route', 'Co-founder eligibility']
    },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Immigration Programs"
        title="Premier Pathways to"
        accent="Global Citizenship"
        subtitle="From Canadian Express Entry to United States investor visas, Australian skilled migration and EU founder routes — full-spectrum immigration counsel for serious profiles."
      />
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-6">
            {visas.map((v, i) => (
              <div
                key={i}
                className="bg-white p-8 md:p-10 rounded-sm hover-gold-border card-lift relative overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="font-display text-gold text-4xl mb-1">{v.code}</div>
                    <div className="text-navy-deep text-xs tracking-[0.3em] uppercase">{v.tag}</div>
                  </div>
                  <FileCheck size={28} className="text-gold opacity-40" />
                </div>
                <h3 className="font-display text-navy-deep text-2xl mb-3">{v.name}</h3>
                <p className="text-navy/70 leading-relaxed mb-6">{v.desc}</p>
                <div className="gold-line mb-5" />
                <ul className="space-y-2 mb-6">
                  {v.criteria.map((c, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-navy/70">
                      <CheckCircle2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActivePage('contact')}
                  className="text-gold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Discuss Eligibility <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 world-dots opacity-15" />
        <div className="max-w-4xl mx-auto px-5 relative text-center">
          <h2 className="font-display text-white text-4xl md:text-5xl mb-6">
            Not Sure Which <em className="gradient-gold-text not-italic">Pathway</em> Fits?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Our consultants conduct a complimentary initial assessment — no obligation, full confidentiality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setActivePage('contact')} className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <Calendar size={16} /> Book Assessment
            </button>
            <a href={`https://wa.me/${BRAND.whatsapp1}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

/* ============================================================
   PAGE: STUDY ABROAD
============================================================ */
const StudyPage = ({ setActivePage }) => {
  const programs = [
    { country: 'United Kingdom', flag: '🇬🇧', desc: 'Russell Group, Oxbridge and prestigious specialised institutions. CAS, financial documentation and visa lodgement.', tag: 'Premier' },
    { country: 'Canada', flag: '🇨🇦', desc: 'DLI admissions, Study Permit applications, GIC arrangements and post-graduation work strategy.', tag: 'PGWP Pathway' },
    { country: 'Australia', flag: '🇦🇺', desc: 'Group of Eight admissions, GTE statements, COE and Subclass 500 visa preparation.', tag: 'Top Tier' },
    { country: 'Germany', flag: '🇩🇪', desc: 'Tuition-free public universities, blocked account setup, language preparation and APS verification.', tag: 'Tuition-Free' },
    { country: 'France', flag: '🇫🇷', desc: 'Grandes écoles partnerships, Campus France procedures and student visa structuring.', tag: 'Grandes Écoles' },
    { country: 'Spain', flag: '🇪🇸', desc: 'Bilingual programmes, NIE applications and student residency permit pathways.', tag: 'Bilingual' },
    { country: 'Portugal', flag: '🇵🇹', desc: 'European study with the most affordable cost-of-living among Western EU nations.', tag: 'EU Affordable' },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Study Abroad"
        title="An Education That"
        accent="Travels with You"
        subtitle="From Oxbridge tutorials to Bavarian engineering schools — premium admissions counsel and visa lodgement support."
      />
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-sm hover-gold-border card-lift relative overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="absolute top-6 right-6 text-5xl opacity-90">{p.flag}</div>
                <GraduationCap size={28} className="text-gold mb-4" />
                <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2">{p.tag}</div>
                <h3 className="font-display text-navy-deep text-2xl mb-3">{p.country}</h3>
                <p className="text-navy/65 text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="gold-line mb-4" />
                <button
                  onClick={() => setActivePage('contact')}
                  className="text-gold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Begin Application <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">How It Works</p>
            <h2 className="font-display text-navy-deep text-4xl md:text-5xl leading-[1.05] heading-accent-center">
              From Application to <em className="gradient-gold-text not-italic font-medium">Arrival</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Profile Review', t: 'Academic & financial assessment, programme matching, and timeline planning.' },
              { n: '02', title: 'Admissions', t: 'University shortlisting, applications, SOPs, recommendations and interview prep.' },
              { n: '03', title: 'Documentation', t: 'Financial documents, language scores, CAS / COE / DLI, embassy file preparation.' },
              { n: '04', title: 'Departure', t: 'Visa lodgement, accommodation, travel logistics and destination orientation.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="font-display text-gold text-6xl font-bold mb-4 opacity-30">{s.n}</div>
                <h3 className="font-display text-navy-deep text-xl mb-3">{s.title}</h3>
                <p className="text-navy/65 text-sm leading-relaxed">{s.t}</p>
                {i < 3 && <ChevronRight size={20} className="hidden md:block absolute top-8 -right-3 text-gold/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ============================================================
   PAGE: BUSINESS SETUP
============================================================ */
const BusinessPage = ({ setActivePage }) => {
  const programs = [
    { country: 'UAE', flag: '🇦🇪', title: 'Company Formation & Golden Visa', invest: 'Mainland & Free Zone', desc: 'Structure your business across DIFC, ADGM, JAFZA, IFZA, RAKEZ and mainland — with banking introductions and Golden Visa pathways for qualifying investors.' },
    { country: 'Portugal', flag: '🇵🇹', title: 'D2 Entrepreneur Visa', invest: 'EU Residency Pathway', desc: 'Establish a substantive business in Portugal with a clear five-year route to EU permanent residency and citizenship by naturalisation.' },
    { country: 'Spain', flag: '🇪🇸', title: 'Entrepreneur Visa', invest: 'ENISA Endorsement', desc: 'Innovative business proposal endorsed by ENISA / DGCOMINVER, leading to Spanish residency and Schengen mobility.' },
    { country: 'United Kingdom', flag: '🇬🇧', title: 'Innovator Founder Visa', invest: 'Endorsement-Backed', desc: 'For genuine, innovative, viable and scalable business ventures backed by a UKVI-approved endorsing body.' },
    { country: 'Canada', flag: '🇨🇦', title: 'Start-Up Visa Programme', invest: 'Designated Organisation', desc: 'Permanent residency via a Letter of Support from a designated venture capital fund, angel investor group or business incubator.' },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Business & Investment"
        title="Where Capital Meets"
        accent="Citizenship"
        subtitle="Bespoke business immigration strategy for entrepreneurs, founders and high-net-worth individuals seeking global mobility."
      />
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-5 space-y-6">
          {programs.map((p, i) => (
            <div
              key={i}
              className="bg-white p-8 md:p-12 rounded-sm hover-gold-border grid lg:grid-cols-12 gap-8 items-center animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="lg:col-span-2 text-center">
                <div className="text-7xl mb-2">{p.flag}</div>
                <div className="text-navy/55 text-xs tracking-widest uppercase">{p.country}</div>
              </div>
              <div className="lg:col-span-7">
                <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2">{p.invest}</div>
                <h3 className="font-display text-navy-deep text-3xl mb-3">{p.title}</h3>
                <p className="text-navy/70 leading-relaxed">{p.desc}</p>
              </div>
              <div className="lg:col-span-3 text-right">
                <button
                  onClick={() => setActivePage('contact')}
                  className="btn-gold px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
                >
                  Private Brief <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-navy-deepest relative overflow-hidden">
        <div className="absolute inset-0 world-dots opacity-15" />
        <div className="max-w-4xl mx-auto px-5 relative text-center">
          <Crown size={40} className="text-gold mx-auto mb-6" />
          <h2 className="font-display text-white text-4xl md:text-5xl mb-6">
            Confidential <em className="gradient-gold-text not-italic">Investor Advisory</em>.
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            For HNWI clients exploring multi-jurisdiction residency, citizenship by investment and global asset structuring — schedule a private engagement.
          </p>
          <button onClick={() => setActivePage('contact')} className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Request Confidential Engagement <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
};

/* ============================================================
   PAGE: TOURIST VISAS
============================================================ */
const TouristPage = ({ setActivePage }) => {
  const visas = [
    { name: 'Schengen Visa', flag: '🇪🇺', desc: 'Single visa granting access to 27 European countries — for tourism, business, family visits and medical purposes.', detail: 'Up to 90 days within any 180-day period · Multi-entry available' },
    { name: 'United States B1/B2', flag: '🇺🇸', desc: 'Combined business and tourist visa for the United States with up to 10-year validity for Pakistani passport holders.', detail: 'B1 (business) · B2 (tourism) · 6-month stays' },
    { name: 'United Kingdom Visit Visa', flag: '🇬🇧', desc: 'Standard Visitor Visa for tourism, business, family visits, short courses and private medical treatment.', detail: '6-month single / 2-5-10 year multi-entry' },
    { name: 'Singapore Visa', flag: '🇸🇬', desc: 'Tourist and business visit visa for Pakistani passport holders — typically issued within 5 working days.', detail: '30-day single or 63-day multi-entry' },
    { name: 'Japan Visa', flag: '🇯🇵', desc: 'Single, multiple-entry tourist and business visa for Japan — perfect for cultural and corporate visits.', detail: '15-90 day stays · Single & multi-entry' },
    { name: 'Canada Visitor Visa', flag: '🇨🇦', desc: 'Temporary Resident Visa for tourism, family visits, business meetings — multi-entry up to 10 years.', detail: 'Up to 6 months per entry' },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Tourist & Visit Visas"
        title="The World, Within"
        accent="Reach"
        subtitle="From Schengen to Singapore — meticulous documentation, refusal-recovery expertise and embassy-grade application files."
      />
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visas.map((v, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-sm hover-gold-border card-lift relative overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="absolute top-4 right-4 text-5xl opacity-95">{v.flag}</div>
                <div className="visa-stamp text-gold text-[8px] inline-block mb-5">
                  <div className="font-bold">★ VISA ★</div>
                </div>
                <h3 className="font-display text-navy-deep text-2xl mb-3">{v.name}</h3>
                <p className="text-navy/65 text-sm leading-relaxed mb-4">{v.desc}</p>
                <div className="text-gold text-xs font-italic-serif italic mb-5">{v.detail}</div>
                <div className="gold-line mb-4" />
                <button
                  onClick={() => setActivePage('contact')}
                  className="text-gold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Begin Application <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Why Our Files Get Approved</p>
            <h2 className="font-display text-navy-deep text-4xl md:text-5xl leading-[1.05] heading-accent-center">
              Forensic Attention to <em className="gradient-gold-text not-italic font-medium">Detail</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Cover letters drafted with embassy-grade clarity',
              'Bank statement structuring for genuine fund proof',
              'Travel itinerary and accommodation documentation',
              'Sponsorship and invitation letter preparation',
              'Refusal recovery and appeal lodgement (Article 32(3))',
              'VFS / consular submission strategy and biometric guidance',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-sm border border-gold-soft">
                <CheckCircle2 size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-navy/75">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ============================================================
   PAGE: COUNTRIES
============================================================ */
const CountriesPage = ({ setActivePage }) => (
  <>
    <PageBanner
      eyebrow="Countries We Serve"
      title="A World of"
      accent="Curated Pathways"
      subtitle="Ten flagship destinations — every jurisdiction handled with regulatory precision and cultural fluency."
    />
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-5 space-y-6">
        {COUNTRY_DATA.map((c, i) => (
          <div
            key={i}
            className="bg-white p-8 md:p-10 rounded-sm hover-gold-border grid lg:grid-cols-12 gap-8 items-center animate-fade-up"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="lg:col-span-2 text-center">
              <div className="text-8xl mb-3">{c.flag}</div>
              <div className="text-navy/55 text-xs tracking-widest uppercase">{c.code}</div>
            </div>
            <div className="lg:col-span-6">
              <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2">{c.tag}</div>
              <h3 className="font-display text-navy-deep text-3xl mb-3">{c.name}</h3>
              <p className="text-navy/70 leading-relaxed">{c.desc}</p>
            </div>
            <div className="lg:col-span-4">
              <ul className="space-y-2 mb-5">
                {c.highlights.map((h, j) => (
                  <li key={j} className="flex items-center gap-3 text-navy/70 text-sm">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActivePage('contact')}
                className="btn-outline-gold px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2"
              >
                Discuss Pathway <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

/* ============================================================
   PAGE: SUCCESS STORIES
============================================================ */
const SuccessPage = () => {
  const stories = [
    { name: 'Dr. A. Khalid', case: 'EB-1A · United States', country: '🇺🇸', desc: 'Researcher in computational biology — petition approved in 4 months with strategic dossier covering original contributions, judging, citations and media.', tag: 'Approved 2024' },
    { name: 'M. Hassan & Family', case: 'Express Entry · Canada', country: '🇨🇦', desc: 'Software architect with prior refusal — full profile rebuild, IELTS strategy and ITA secured at 482 CRS.', tag: 'PR Granted 2024' },
    { name: 'F. Iqbal', case: 'Innovator Founder · UK', country: '🇬🇧', desc: 'FinTech founder secured first-attempt endorsement and 3-year visa with structured business plan and financial modelling.', tag: 'Approved 2024' },
    { name: 'S. Rahman', case: 'UAE Golden Visa', country: '🇦🇪', desc: 'Real estate investor — company formation, banking and Golden Visa orchestrated as a single confidential engagement.', tag: 'Issued 2024' },
    { name: 'A. Mahmood', case: 'Schengen Appeal', country: '🇪🇺', desc: 'Refusal overturned via Article 32(3) appeal — full visa issued within 6 weeks of appeal lodgement.', tag: 'Overturned 2024' },
    { name: 'Z. Akhtar', case: 'D2 Visa · Portugal', country: '🇵🇹', desc: 'E-commerce entrepreneur — D2 Visa approved with structured business plan and proof of funds.', tag: 'Approved 2024' },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Success Stories"
        title="Outcomes That Speak"
        accent="for Themselves"
        subtitle="A selection of recent client results — every story representing rigorous strategy and uncompromising execution."
      />
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-sm hover-gold-border card-lift relative overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl">{s.country}</div>
                  <div className="visa-stamp text-gold text-[8px]">
                    <div className="font-bold">★ APPROVED ★</div>
                  </div>
                </div>
                <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2">{s.tag}</div>
                <h3 className="font-display text-navy-deep text-xl mb-1">{s.name}</h3>
                <p className="text-gold text-sm font-italic-serif italic mb-4">{s.case}</p>
                <div className="gold-line mb-4" />
                <p className="text-navy/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <StatsBand />
    </>
  );
};

/* ============================================================
   PAGE: BLOG
============================================================ */
const BlogPage = () => {
  const posts = [
    { title: 'Decoding EB-1A: How to Build a Petition That Wins', cat: 'US Immigration', date: 'May 2026', read: '8 min read', desc: 'A senior consultant\'s breakdown of the EB-1A criteria — what USCIS officers actually look for, and how strategic profile building wins approvals.' },
    { title: 'Schengen Refusals: When Article 32(3) Appeals Make Sense', cat: 'Schengen', date: 'April 2026', read: '6 min read', desc: 'Not every refusal warrants an appeal. A practical framework for deciding whether to lodge an appeal or re-apply with a stronger file.' },
    { title: 'UAE Golden Visa: 2026 Eligibility Update', cat: 'UAE', date: 'April 2026', read: '5 min read', desc: 'Latest thresholds across investor, professional, talent and pensioner categories — including newly expanded sponsorship rules.' },
    { title: 'Portugal D2 vs Spain Entrepreneur: Choosing Your Iberian Pathway', cat: 'EU Residency', date: 'March 2026', read: '7 min read', desc: 'A side-by-side comparison of two of Europe\'s most accessible business immigration routes — with practical guidance on which to choose.' },
    { title: 'UK Innovator Founder: The Endorsement Game in 2026', cat: 'UK', date: 'March 2026', read: '6 min read', desc: 'How endorsing bodies evaluate business plans — and the structural elements that consistently secure first-attempt endorsement.' },
    { title: 'Canadian Express Entry: Profile Strategies for 2026', cat: 'Canada', date: 'February 2026', read: '8 min read', desc: 'CRS optimisation tactics, category-based draws, and how to position yourself for an ITA in the new programme cycle.' },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Insights & Briefings"
        title="Notes from"
        accent="The Practice"
        subtitle="Strategic immigration analysis from our senior consultants — what's changing, what's working, and what to watch."
      />
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <article
                key={i}
                className="bg-white rounded-sm hover-gold-border card-lift cursor-pointer overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="aspect-[16/9] gradient-navy relative overflow-hidden">
                  <div className="absolute inset-0 world-dots opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen size={48} className="text-gold opacity-50" />
                  </div>
                  <div className="absolute top-4 left-4 bg-gold text-navy-deep text-[10px] px-3 py-1 rounded-full tracking-widest uppercase font-semibold">
                    {p.cat}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-navy/50 text-xs mb-3">
                    <Clock size={12} /> {p.read}
                    <span>·</span>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="font-display text-navy-deep text-xl mb-3 leading-tight">{p.title}</h3>
                  <p className="text-navy/65 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <div className="text-gold text-sm inline-flex items-center gap-2">
                    Read Briefing <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ============================================================
   PAGE: CONTACT
============================================================ */
const ContactPage = () => (
  <>
    <PageBanner
      eyebrow="Contact"
      title="Begin Your"
      accent="Global Story"
      subtitle="Reach a senior consultant — confidential, complimentary initial assessment within one business day."
    />
    <BookingForm />
    <section className="py-20 bg-navy-deepest relative overflow-hidden">
      <div className="absolute inset-0 world-dots opacity-15" />
      <div className="max-w-5xl mx-auto px-5 relative">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Phone, title: 'Direct Line', primary: BRAND.phone1, secondary: BRAND.phone2, href: `tel:${BRAND.phone1.replace(/\s/g,'')}` },
            { icon: MessageCircle, title: 'WhatsApp', primary: BRAND.phone1, secondary: 'Reply within 30 minutes', href: `https://wa.me/${BRAND.whatsapp1}` },
            { icon: Mail, title: 'Email', primary: BRAND.email, secondary: BRAND.domain, href: `mailto:${BRAND.email}` },
          ].map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glass p-8 rounded-sm hover-gold-border text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <c.icon size={26} className="text-navy-deep" />
              </div>
              <div className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3">{c.title}</div>
              <div className="text-white text-lg font-display mb-1">{c.primary}</div>
              <div className="text-white/55 text-sm">{c.secondary}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </>
);

/* ============================================================
   ROOT APP
============================================================ */
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'about': return <AboutPage />;
      case 'immigration': return <ImmigrationPage setActivePage={setActivePage} />;
      case 'study': return <StudyPage setActivePage={setActivePage} />;
      case 'business': return <BusinessPage setActivePage={setActivePage} />;
      case 'tourist': return <TouristPage setActivePage={setActivePage} />;
      case 'countries': return <CountriesPage setActivePage={setActivePage} />;
      case 'stories': return <SuccessPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="bg-ivory min-h-screen font-body">
      <Navigation
        activePage={activePage} setActivePage={setActivePage}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setActivePage={setActivePage} />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;

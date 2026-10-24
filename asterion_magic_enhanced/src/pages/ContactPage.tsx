import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ASTERION_IMAGES, CONCEPT_STUDIOS } from '../data/asterionData';
import { usePrefersReducedMotion } from '../hooks/useMotionPreferences';
import { PageRoute } from '../components/Navbar';
import { ResilientImage } from '../components/ResilientImage';
import { Reveal } from '../components/Reveal';

interface ContactPageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

const INQUIRY_TOPICS = [
  'Private Concept Presentation',
  'Digital Monograph Request',
  'Design & Engineering Dialogue',
  'Press & Editorial Inquiry',
] as const;

const VEHICLE_FOCUS_OPTIONS = [
  'Asterion Apex — Hypercar Concept',
  'Asterion Solace — Grand Touring Concept',
  'Asterion Volt — Electric Performance Concept',
  'General Brand & Architecture Study',
] as const;

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [heroEntered, setHeroEntered] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<string>(INQUIRY_TOPICS[0]);
  const [vehicleFocus, setVehicleFocus] = useState<string>(VEHICLE_FOCUS_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    email: string;
    topic: string;
    vehicleFocus: string;
  } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setHeroEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (!trimmedName) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (trimmedMessage.length < 10) {
      nextErrors.message = 'Please share a brief note (at least 10 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setSubmittedRecord({
      name: trimmedName,
      email: trimmedEmail,
      topic,
      vehicleFocus,
    });
  };

  const handleResetForm = () => {
    setSubmittedRecord(null);
    setMessage('');
    setFieldErrors({});
  };

  return (
    <main className="bg-[#08090B]">
      {/* =====================================================================
          1. PRIVATE ATELIER CONTACT HERO
         ===================================================================== */}
      <section
        aria-labelledby="contact-hero-title"
        className="relative min-h-[68vh] w-full flex items-end overflow-hidden bg-[#08090B] pt-28 pb-16 md:pb-24 border-b border-white/[0.08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`w-full h-full transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
          >
            <ResilientImage
              src={ASTERION_IMAGES.contactSalon}
              alt="Minimalist blackened-steel and glass private automotive salon pavilion reflected in a tranquil courtyard pool at twilight"
              fallbackLabel="ASTERION PRIVATE SALON"
              priority
              className="w-full h-full"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/58 to-[#08090B]/38 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#08090B]/88 via-[#08090B]/42 to-transparent pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-5">
            <p
              className={`text-xs tracking-[0.26em] uppercase text-[#C7AD7A] transition-[opacity,transform] duration-700 delay-100 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Private Desk · Concept Inquiries
            </p>

            <h1
              id="contact-hero-title"
              className={`font-display text-[clamp(2.4rem,5.2vw,4.5rem)] font-medium tracking-[-0.025em] leading-[1.04] text-[#F4F0E8] transition-[opacity,transform] duration-700 delay-200 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              BEGIN THE DIALOGUE.
            </h1>

            <p
              className={`text-base sm:text-lg md:text-xl text-[#F4F0E8]/85 leading-relaxed max-w-xl transition-[opacity,transform] duration-700 delay-300 ease-out ${
                heroEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Connect with the Asterion concept desk regarding digital monographs, design studies,
              or private presentation inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CONSULTATION FORM & CONCEPT ATELIER DESKS
         ===================================================================== */}
      <section
        aria-labelledby="consultation-form-heading"
        className="py-20 md:py-32 bg-[#08090B] border-b border-white/[0.08]"
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Validated Consultation Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="border border-white/[0.09] bg-[#131519] p-7 sm:p-10 lg:p-12">
                  {submittedRecord ? (
                    <div className="space-y-8 py-4" aria-live="polite">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-[#C7AD7A]">
                          <CheckCircle2 className="w-5 h-5 shrink-0" />
                          <span className="text-xs font-medium tracking-[0.2em] uppercase">
                            Inquiry Registered
                          </span>
                        </div>

                        <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]">
                          Thank you, {submittedRecord.name}.
                        </h2>

                        <p className="text-sm sm:text-base text-[#9A9A96] leading-relaxed">
                          Your message regarding{' '}
                          <span className="text-[#F4F0E8]">{submittedRecord.vehicleFocus}</span> (
                          {submittedRecord.topic}) has been logged for this interactive concept
                          showcase under <span className="font-mono text-xs text-[#C7AD7A]">{submittedRecord.email}</span>.
                        </p>
                      </div>

                      <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                        >
                          Send Another Inquiry
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigate('vehicle')}
                          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#F4F0E8] border border-white/18 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                        >
                          <span>Return to The Machine</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-7">
                      <div className="space-y-2 pb-6 border-b border-white/[0.08]">
                        <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                          Direct Correspondence
                        </p>
                        <h2
                          id="consultation-form-heading"
                          className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]"
                        >
                          Request a Concept Consultation
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label
                            htmlFor="contact-full-name"
                            className="block text-xs tracking-[0.16em] uppercase text-[#9A9A96]"
                          >
                            Full Name
                          </label>
                          <input
                            id="contact-full-name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (fieldErrors.name) {
                                setFieldErrors((prev) => ({ ...prev, name: undefined }));
                              }
                            }}
                            aria-invalid={Boolean(fieldErrors.name)}
                            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                            className="w-full px-4 py-3 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] placeholder:text-[#9A9A96]/55 focus:outline-none focus:border-[#C7AD7A] transition-colors"
                          />
                          {fieldErrors.name && (
                            <p id="contact-name-error" role="alert" className="text-xs text-[#E57373]">
                              {fieldErrors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="contact-email"
                            className="block text-xs tracking-[0.16em] uppercase text-[#9A9A96]"
                          >
                            Email Address
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@domain.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (fieldErrors.email) {
                                setFieldErrors((prev) => ({ ...prev, email: undefined }));
                              }
                            }}
                            aria-invalid={Boolean(fieldErrors.email)}
                            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                            className="w-full px-4 py-3 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] placeholder:text-[#9A9A96]/55 focus:outline-none focus:border-[#C7AD7A] transition-colors"
                          />
                          {fieldErrors.email && (
                            <p id="contact-email-error" role="alert" className="text-xs text-[#E57373]">
                              {fieldErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label
                            htmlFor="contact-topic"
                            className="block text-xs tracking-[0.16em] uppercase text-[#9A9A96]"
                          >
                            Subject
                          </label>
                          <select
                            id="contact-topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] focus:outline-none focus:border-[#C7AD7A] transition-colors"
                          >
                            {INQUIRY_TOPICS.map((item) => (
                              <option key={item} value={item} className="bg-[#08090B] text-[#F4F0E8]">
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="contact-vehicle"
                            className="block text-xs tracking-[0.16em] uppercase text-[#9A9A96]"
                          >
                            Concept Focus
                          </label>
                          <select
                            id="contact-vehicle"
                            value={vehicleFocus}
                            onChange={(e) => setVehicleFocus(e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] focus:outline-none focus:border-[#C7AD7A] transition-colors"
                          >
                            {VEHICLE_FOCUS_OPTIONS.map((item) => (
                              <option key={item} value={item} className="bg-[#08090B] text-[#F4F0E8]">
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="contact-message"
                          className="block text-xs tracking-[0.16em] uppercase text-[#9A9A96]"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          placeholder="Share your questions regarding the Asterion concept lineup, design direction, or digital monograph..."
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (fieldErrors.message) {
                              setFieldErrors((prev) => ({ ...prev, message: undefined }));
                            }
                          }}
                          aria-invalid={Boolean(fieldErrors.message)}
                          aria-describedby={
                            fieldErrors.message ? 'contact-message-error' : undefined
                          }
                          className="w-full px-4 py-3 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] placeholder:text-[#9A9A96]/55 focus:outline-none focus:border-[#C7AD7A] transition-colors resize-y"
                        />
                        {fieldErrors.message && (
                          <p
                            id="contact-message-error"
                            role="alert"
                            className="text-xs text-[#E57373]"
                          >
                            {fieldErrors.message}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs text-[#9A9A96]">
                          Interactive concept inquiry — handled locally within this showcase.
                        </p>

                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] active:scale-[0.98] transition-[background-color,transform] duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                        >
                          <span>Submit Inquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right Column: Concept Atelier Desks & Navigation */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal delayMs={110}>
                <div className="border border-white/[0.09] bg-[#131519] p-7 sm:p-9 space-y-6">
                  <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                    Concept Study Desks
                  </p>

                  <div className="divide-y divide-white/[0.07]">
                    {CONCEPT_STUDIOS.map((studio) => (
                      <div key={studio.city} className="py-5 first:pt-1 last:pb-1 space-y-1.5">
                        <h3 className="font-display text-lg font-medium text-[#F4F0E8]">
                          {studio.city}
                        </h3>
                        <p className="text-xs tracking-[0.14em] uppercase text-[#C7AD7A]/90">
                          {studio.role}
                        </p>
                        <p className="text-sm text-[#9A9A96] leading-relaxed">{studio.detail}</p>
                        <p className="font-mono text-xs text-[#9A9A96]/80 pt-1">{studio.hours}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={180}>
                <div className="border border-white/[0.08] bg-[#0D0F13] p-7 sm:p-9 space-y-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#9A9A96]">
                    Explore Other Destinations
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('vehicle')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-[0.16em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>The Machine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('engineering')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-[0.16em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>Engineering</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('philosophy')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-[0.16em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <span>Philosophy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('home')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-[0.16em] uppercase text-[#9A9A96] hover:text-[#F4F0E8] border border-white/10 hover:border-white/25 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Home</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

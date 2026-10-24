import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { ConceptVehicle, VEHICLE_COLLECTION } from '../data/asterionData';
import { ResilientImage } from './ResilientImage';
import { PageRoute } from './Navbar';

interface VehicleDossierModalProps {
  vehicle: ConceptVehicle | null;
  onClose: () => void;
  onSelectVehicle: (vehicle: ConceptVehicle) => void;
  onNavigateEngineering: (page: PageRoute, sectionId?: string) => void;
}

export const VehicleDossierModal: React.FC<VehicleDossierModalProps> = ({
  vehicle,
  onClose,
  onSelectVehicle,
  onNavigateEngineering,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedFor, setSubmittedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicle) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [vehicle, onClose]);

  useEffect(() => {
    setErrorMessage('');
    setSubmittedFor(null);
  }, [vehicle?.id]);

  if (!vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      setErrorMessage('Please enter your name to receive the concept dossier.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setSubmittedFor(vehicle.name);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08090B]/88 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#131519] border border-white/[0.12] my-auto overflow-hidden">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.08] bg-[#0B0D11]">
          <div className="flex items-center gap-2 overflow-x-auto">
            {VEHICLE_COLLECTION.map((item) => {
              const active = item.id === vehicle.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectVehicle(item)}
                  className={`px-3 py-1.5 text-xs tracking-[0.14em] uppercase transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                    active
                      ? 'bg-[#1D2027] text-[#C7AD7A]'
                      : 'text-[#9A9A96] hover:text-[#F4F0E8]'
                  }`}
                >
                  {item.index} · {item.name.replace('ASTERION ', '')}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Close concept dossier"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-[#9A9A96] hover:text-[#F4F0E8] border border-white/10 transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <ResilientImage
              src={vehicle.image}
              alt={vehicle.alt}
              fallbackLabel={vehicle.name}
              className="aspect-[16/10] w-full"
            />
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs tracking-[0.2em] uppercase text-[#C7AD7A]">
                  {vehicle.index} — {vehicle.category}
                </p>
                <h3
                  id="dossier-modal-title"
                  className="font-display text-2xl sm:text-3xl font-medium text-[#F4F0E8]"
                >
                  {vehicle.name}
                </h3>
                <p className="text-sm leading-relaxed text-[#9A9A96]">
                  {vehicle.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                {vehicle.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[11px] tracking-[0.14em] uppercase text-[#9A9A96]">
                      {spec.label}
                    </p>
                    <p className="font-mono tabular-nums text-lg font-medium text-[#F4F0E8] mt-0.5">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9A9A96]">
                Concept Architecture Highlights
              </p>
              <ul className="space-y-3">
                {vehicle.architectureHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-sm text-[#F4F0E8]/90 pb-3 border-b border-white/[0.06] last:border-b-0"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateEngineering('engineering');
                }}
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#C7AD7A] hover:text-[#F4F0E8] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
              >
                <span>Open Full Engineering Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Validated Digital Briefing Request */}
            <div className="pt-6 border-t border-white/[0.08]">
              {submittedFor ? (
                <div className="p-4 bg-[#0D0F13] border border-[#C7AD7A]/40 space-y-2">
                  <div className="flex items-center gap-2 text-[#C7AD7A]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium tracking-[0.14em] uppercase">
                      Concept Briefing Reserved
                    </span>
                  </div>
                  <p className="text-xs text-[#9A9A96] leading-relaxed">
                    Thank you, {fullName.trim()}. Your interest in the fictional {submittedFor}{' '}
                    concept study has been recorded for this showcase session.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <p className="text-xs tracking-[0.16em] uppercase text-[#F4F0E8]">
                    Request Digital Concept Monograph
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="briefing-name" className="sr-only">
                        Your Name
                      </label>
                      <input
                        id="briefing-name"
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] placeholder:text-[#9A9A96]/60 focus:outline-none focus:border-[#C7AD7A]"
                      />
                    </div>
                    <div>
                      <label htmlFor="briefing-email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="briefing-email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#08090B] border border-white/15 text-[#F4F0E8] placeholder:text-[#9A9A96]/60 focus:outline-none focus:border-[#C7AD7A]"
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <p role="alert" className="text-xs text-[#E57373]">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-xs font-medium tracking-[0.18em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8]"
                  >
                    Reserve Concept Dossier
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

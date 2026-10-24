/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { FloatingAudioControl } from './components/FloatingAudioControl';
import { CinematicChrome } from './components/CinematicChrome';
import { Footer } from './components/Footer';
import { Navbar, PageRoute } from './components/Navbar';
import { VehicleDossierModal } from './components/VehicleDossierModal';
import { ConceptVehicle } from './data/asterionData';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { HomePage } from './pages/HomePage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { VehiclePage } from './pages/VehiclePage';

const ROUTE_PATHS: Record<PageRoute, string> = {
  home: '/',
  vehicle: '/vehicle',
  engineering: '/engineering',
  philosophy: '/philosophy',
  about: '/about',
  contact: '/contact',
};

const ROUTE_TITLES: Record<PageRoute, string> = {
  home: 'ASTERION — Engineered to Move You',
  vehicle: 'The Machine · Asterion Apex — ASTERION',
  engineering: 'Engineering the Extraordinary — ASTERION',
  philosophy: 'Our Philosophy · Precision Is Our Language — ASTERION',
  about: 'About ASTERION · Vision, Mission & Story — ASTERION',
  contact: 'Contact & Private Consultation — ASTERION',
};

function resolveRouteFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const normalized = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (normalized === '/vehicle' || normalized.startsWith('/vehicle/')) {
    return 'vehicle';
  }
  if (normalized === '/engineering' || normalized.startsWith('/engineering/')) {
    return 'engineering';
  }
  if (normalized === '/philosophy' || normalized.startsWith('/philosophy/')) {
    return 'philosophy';
  }
  if (normalized === '/about' || normalized.startsWith('/about/')) {
    return 'about';
  }
  if (normalized === '/contact' || normalized.startsWith('/contact/')) {
    return 'contact';
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(resolveRouteFromLocation);
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.location.hash ? window.location.hash.slice(1) : null;
  });
  const [dossierVehicle, setDossierVehicle] = useState<ConceptVehicle | null>(null);

  // Sync browser back/forward navigation and direct URL entry
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolveRouteFromLocation());
      const hashId = window.location.hash ? window.location.hash.slice(1) : null;
      if (hashId) {
        setPendingSectionId(hashId);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title per page
  useEffect(() => {
    document.title = ROUTE_TITLES[currentPage];
  }, [currentPage]);

  // Execute smooth scrolling to target section after route renders
  useEffect(() => {
    if (!pendingSectionId) return;

    const timer = window.setTimeout(() => {
      const targetEl = document.getElementById(pendingSectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPendingSectionId(null);
    }, 60);

    return () => window.clearTimeout(timer);
  }, [currentPage, pendingSectionId]);

  const handleNavigate = useCallback(
    (targetPage: PageRoute, sectionId?: string) => {
      const targetPath = ROUTE_PATHS[targetPage];
      const targetUrl = sectionId ? `${targetPath}#${sectionId}` : targetPath;

      if (window.location.pathname + window.location.hash !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }

      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
        if (sectionId) {
          setPendingSectionId(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      } else if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentPage]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#08090B] text-[#F4F0E8]">
      <CinematicChrome pageKey={currentPage} />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <div key={currentPage} className="flex-1 animate-page-enter">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenDossier={(vehicle) => setDossierVehicle(vehicle)}
          />
        )}
        {currentPage === 'vehicle' && (
          <VehiclePage
            onNavigate={handleNavigate}
            onOpenDossier={(vehicle) => setDossierVehicle(vehicle)}
          />
        )}
        {currentPage === 'engineering' && <EngineeringPage onNavigate={handleNavigate} />}
        {currentPage === 'philosophy' && <PhilosophyPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </div>

      <Footer onNavigate={handleNavigate} />

      <FloatingAudioControl />

      <VehicleDossierModal
        vehicle={dossierVehicle}
        onClose={() => setDossierVehicle(null)}
        onSelectVehicle={(vehicle) => setDossierVehicle(vehicle)}
        onNavigateEngineering={handleNavigate}
      />
    </div>
  );
}

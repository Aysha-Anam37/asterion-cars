import React from 'react';
import { PageRoute } from './Navbar';
import { Reveal } from './Reveal';

interface FooterProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: PageRoute,
    sectionId?: string
  ) => {
    event.preventDefault();
    onNavigate(page, sectionId);
  };

  return (
    <footer className="bg-[#08090B] border-t border-white/[0.08] pt-20 pb-14">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.07]">
            <div className="lg:col-span-5 space-y-5">
              <a
                href="/"
                onClick={(e) => handleLink(e, 'home')}
                className="inline-block font-display text-2xl font-medium tracking-[0.3em] text-[#F4F0E8] hover:text-[#C7AD7A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
              >
                ASTERION
              </a>
              <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                ENGINEERED TO MOVE YOU.
              </p>
              <p className="text-sm leading-relaxed text-[#9A9A96] max-w-md pt-1">
                ASTERION is a fictional luxury performance automotive house conceived as an
                interactive design and engineering study exploring sculptural form, aerodynamic
                clarity, and the emotion of motion.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-items-end">
              <div className="space-y-4">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9A9A96]">
                  Destinations
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="/"
                      onClick={(e) => handleLink(e, 'home')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vehicle"
                      onClick={(e) => handleLink(e, 'vehicle')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      The Machine
                    </a>
                  </li>
                  <li>
                    <a
                      href="/engineering"
                      onClick={(e) => handleLink(e, 'engineering')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Engineering
                    </a>
                  </li>
                  <li>
                    <a
                      href="/philosophy"
                      onClick={(e) => handleLink(e, 'philosophy')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Philosophy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      onClick={(e) => handleLink(e, 'about')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      onClick={(e) => handleLink(e, 'contact')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9A9A96]">
                  The Machine
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="/vehicle#showroom-3d"
                      onClick={(e) => handleLink(e, 'vehicle', 'showroom-3d')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      3D Interactive Showroom
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vehicle#studio-stage"
                      onClick={(e) => handleLink(e, 'vehicle', 'studio-stage')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Asterion Apex Studio
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vehicle#specifications"
                      onClick={(e) => handleLink(e, 'vehicle', 'specifications')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Concept Specifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vehicle#collection"
                      onClick={(e) => handleLink(e, 'vehicle', 'collection')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Concept Lineup
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#nocturne"
                      onClick={(e) => handleLink(e, 'home', 'nocturne')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Awaken the Silhouette
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 col-span-2 sm:col-span-1">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9A9A96]">
                  Technical Study
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="/engineering#pillars"
                      onClick={(e) => handleLink(e, 'engineering', 'pillars')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Three Pillars
                    </a>
                  </li>
                  <li>
                    <a
                      href="/engineering#dynamics-lab"
                      onClick={(e) => handleLink(e, 'engineering', 'dynamics-lab')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Aerodynamics Explorer
                    </a>
                  </li>
                  <li>
                    <a
                      href="/engineering#materials"
                      onClick={(e) => handleLink(e, 'engineering', 'materials')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Materials & Craft
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      onClick={(e) => handleLink(e, 'contact')}
                      className="text-[#F4F0E8]/85 hover:text-[#C7AD7A] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      Private Consultation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[#9A9A96]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p>© {currentYear} ASTERION. All rights reserved.</p>
              <span aria-hidden="true" className="hidden sm:inline text-white/20">
                ·
              </span>
              <p className="text-[#9A9A96]/85 tracking-[0.04em]">
                Website Concept & Digital Experience by Aysha Anam
              </p>
            </div>

            <p className="text-[#9A9A96]/75">
              All vehicles, architectures, and performance figures presented are fictional concept creations.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

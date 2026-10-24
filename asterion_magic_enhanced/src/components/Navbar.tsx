import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export type PageRoute = 'home' | 'vehicle' | 'engineering' | 'philosophy' | 'about' | 'contact';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  // Allow Escape key to dismiss mobile drawer & lock body scroll while open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    page: PageRoute,
    sectionId?: string
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#08090B]/92 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-gradient-to-b from-[#08090B]/85 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1380px] mx-auto h-16 md:h-20 px-6 lg:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single-Element Brand Wordmark -> Home (/) */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-display text-lg md:text-xl font-medium tracking-[0.28em] text-[#F4F0E8] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] py-1"
          >
            ASTERION
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-5 lg:gap-8 text-xs lg:text-[13px] font-medium tracking-[0.12em] uppercase"
          >
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              aria-current={currentPage === 'home' ? 'page' : undefined}
              className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                currentPage === 'home'
                  ? 'text-[#F4F0E8] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C7AD7A]'
                  : 'text-[#9A9A96] hover:text-[#F4F0E8]'
              }`}
            >
              Home
            </a>

            <a
              href="/vehicle"
              onClick={(e) => handleLinkClick(e, 'vehicle')}
              aria-current={currentPage === 'vehicle' ? 'page' : undefined}
              className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                currentPage === 'vehicle'
                  ? 'text-[#F4F0E8] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C7AD7A]'
                  : 'text-[#9A9A96] hover:text-[#F4F0E8]'
              }`}
            >
              The Machine
            </a>

            <a
              href="/engineering"
              onClick={(e) => handleLinkClick(e, 'engineering')}
              aria-current={currentPage === 'engineering' ? 'page' : undefined}
              className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                currentPage === 'engineering'
                  ? 'text-[#F4F0E8] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C7AD7A]'
                  : 'text-[#9A9A96] hover:text-[#F4F0E8]'
              }`}
            >
              Engineering
            </a>

            <a
              href="/philosophy"
              onClick={(e) => handleLinkClick(e, 'philosophy')}
              aria-current={currentPage === 'philosophy' ? 'page' : undefined}
              className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                currentPage === 'philosophy'
                  ? 'text-[#F4F0E8] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C7AD7A]'
                  : 'text-[#9A9A96] hover:text-[#F4F0E8]'
              }`}
            >
              Philosophy
            </a>

            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, 'about')}
              aria-current={currentPage === 'about' ? 'page' : undefined}
              className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                currentPage === 'about'
                  ? 'text-[#F4F0E8] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C7AD7A]'
                  : 'text-[#9A9A96] hover:text-[#F4F0E8]'
              }`}
            >
              About
            </a>
          </nav>

          {/* Zone 3: Rightmost Primary Action (CONTACT -> /contact) + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              className={`asterion-shine-button hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-[0.18em] uppercase transition-[background-color,color,transform,border-color] duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F0E8] ${
                currentPage === 'contact'
                  ? 'bg-[#D5BE90] text-[#08090B] ring-1 ring-[#F4F0E8]/60'
                  : 'bg-[#C7AD7A] text-[#08090B] hover:bg-[#D5BE90] active:scale-[0.98]'
              }`}
            >
              CONTACT
            </a>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="asterion-mobile-menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F4F0E8] hover:text-[#C7AD7A] border border-white/12 bg-[#131519]/85 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="asterion-mobile-menu"
            className="md:hidden bg-[#08090B]/98 backdrop-blur-xl border-b border-white/[0.1] px-6 pt-3 pb-7 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col divide-y divide-white/[0.07]"
            >
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, 'home')}
                aria-current={currentPage === 'home' ? 'page' : undefined}
                className={`py-4 text-sm tracking-[0.16em] uppercase font-medium transition-colors ${
                  currentPage === 'home' ? 'text-[#C7AD7A]' : 'text-[#F4F0E8] hover:text-[#C7AD7A]'
                }`}
              >
                Home
              </a>
              <a
                href="/vehicle"
                onClick={(e) => handleLinkClick(e, 'vehicle')}
                aria-current={currentPage === 'vehicle' ? 'page' : undefined}
                className={`py-4 text-sm tracking-[0.16em] uppercase font-medium transition-colors ${
                  currentPage === 'vehicle'
                    ? 'text-[#C7AD7A]'
                    : 'text-[#F4F0E8] hover:text-[#C7AD7A]'
                }`}
              >
                The Machine
              </a>
              <a
                href="/engineering"
                onClick={(e) => handleLinkClick(e, 'engineering')}
                aria-current={currentPage === 'engineering' ? 'page' : undefined}
                className={`py-4 text-sm tracking-[0.16em] uppercase font-medium transition-colors ${
                  currentPage === 'engineering'
                    ? 'text-[#C7AD7A]'
                    : 'text-[#F4F0E8] hover:text-[#C7AD7A]'
                }`}
              >
                Engineering
              </a>
              <a
                href="/philosophy"
                onClick={(e) => handleLinkClick(e, 'philosophy')}
                aria-current={currentPage === 'philosophy' ? 'page' : undefined}
                className={`py-4 text-sm tracking-[0.16em] uppercase font-medium transition-colors ${
                  currentPage === 'philosophy'
                    ? 'text-[#C7AD7A]'
                    : 'text-[#F4F0E8] hover:text-[#C7AD7A]'
                }`}
              >
                Philosophy
              </a>
              <a
                href="/about"
                onClick={(e) => handleLinkClick(e, 'about')}
                aria-current={currentPage === 'about' ? 'page' : undefined}
                className={`py-4 text-sm tracking-[0.16em] uppercase font-medium transition-colors ${
                  currentPage === 'about'
                    ? 'text-[#C7AD7A]'
                    : 'text-[#F4F0E8] hover:text-[#C7AD7A]'
                }`}
              >
                About
              </a>
            </nav>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/vehicle#showroom-3d"
                onClick={(e) => handleLinkClick(e, 'vehicle', 'showroom-3d')}
                className="w-full py-3.5 px-5 text-center text-xs font-medium tracking-[0.2em] uppercase text-[#F4F0E8] border border-white/18 bg-[#131519] hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors duration-150 whitespace-nowrap"
              >
                EXPLORE 3D
              </a>

              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                aria-current={currentPage === 'contact' ? 'page' : undefined}
                className="w-full py-3.5 px-5 text-center text-xs font-medium tracking-[0.2em] uppercase text-[#08090B] bg-[#C7AD7A] hover:bg-[#D5BE90] transition-colors duration-150 whitespace-nowrap"
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay when mobile menu is open to prevent accidental background interaction */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#08090B]/65 backdrop-blur-[2px] md:hidden"
        />
      )}
    </>
  );
};

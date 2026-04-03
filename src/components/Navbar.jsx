import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Collections', href: '#categories' },
  { label: 'About',       href: '#about'      },
  { label: 'Services',    href: '#services'   },
  { label: 'Process',     href: '#process'    },
  { label: 'Testimonials',href: '#testimonials'},
  { label: 'Contact',     href: '#contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img 
          src="/images/logo_processed.png" 
          alt="White Palace Decor" 
          style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
          onError={(e) => {
            e.target.src = '/images/logo.jpeg';
            e.target.style.filter = 'brightness(0) invert(1)';
            e.target.style.mixBlendMode = 'screen';
          }}
        />
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 24, height: 24, border: '1px solid #C9A96E', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#FAFAFA', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1 }}>
              White Palace
            </div>
            <div style={{ fontSize: '0.6rem', color: '#C9A96E', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Decor
            </div>
          </div>
        </div>
      </a>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav">
        {navLinks.map(l => (
          <a key={l.label} href={l.href} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.6)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#C9A96E'}
          onMouseLeave={e => e.target.style.color = 'rgba(250,250,250,0.6)'}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', color: '#FAFAFA', cursor: 'pointer', display: 'none' }}
        className="mobile-burger"
        aria-label="Menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(10,10,10,0.98)',
              padding: '1.5rem 2rem 2rem',
              borderTop: '1px solid rgba(201,169,110,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,250,0.7)',
                textDecoration: 'none',
              }}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

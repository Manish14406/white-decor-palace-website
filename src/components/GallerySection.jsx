import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Images — Interior1 is first as it's the hero image ──────────────────────
import interior1        from '../assets/services/Interior1.jpeg';
import interiorWin2     from '../assets/services/interior windows2.jpeg';
import livingroomWin1   from '../assets/services/livingroom window1.jpeg';
import whatsappImg      from '../assets/services/WhatsApp Image 2026-04-02 at 20.19.57.jpeg';
import exteriorCurtain2 from '../assets/services/exterior curtain 2 .jpeg';
import exteriorCurtan   from '../assets/services/exterior curtan .jpeg';
import kitchenWin1      from '../assets/services/kitchen window 1.jpeg';
import woodCurtain      from '../assets/services/woodtype curtain for sitout .jpeg';
import screenshotBlind  from '../assets/services/Screenshot 2026-04-03 205411.png';

const photos = [
  { src: interior1,        alt: 'Elegant Interior Curtains',          label: 'Curtains' },
  { src: interiorWin2,     alt: 'Interior Window Curtains',           label: 'Curtains' },
  { src: livingroomWin1,   alt: 'Living Room Window Dressing',        label: 'Curtains' },
  { src: whatsappImg,      alt: 'Staircase Curtain Installation',     label: 'Curtains' },
  { src: exteriorCurtan,   alt: 'Exterior Sitout Blind',              label: 'Blinds' },
  { src: exteriorCurtain2, alt: 'Exterior Roller Blind',              label: 'Blinds' },
  { src: kitchenWin1,      alt: 'Kitchen Window Blind',               label: 'Blinds' },
  { src: woodCurtain,      alt: 'Wood-Type Zebra Blind',              label: 'Blinds' },
  { src: screenshotBlind,  alt: 'Window Blind with Decor',            label: 'Blinds' },
];

// Masonry-style span map — first image gets a big tall spot
const spanMap = [
  { colSpan: 2, rowSpan: 2 }, // Interior1 — hero
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

export default function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setLightboxIdx(i => (i + 1) % photos.length);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <section id="gallery" className="section" style={{ background: '#0A0A0A' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>Gallery</h2>
          <span className="gold-divider" />
          <p style={{ color: 'rgba(250,250,250,0.45)', fontSize: '0.9rem', marginTop: '1.25rem', letterSpacing: '0.04em' }}>
            Click any photo to view in full screen
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '220px',
          gap: '10px',
        }}>
          {photos.map((photo, idx) => {
            const span = spanMap[idx] || { colSpan: 1, rowSpan: 1 };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.07 }}
                onClick={() => openLightbox(idx)}
                className="gallery-item"
                style={{
                  gridColumn: `span ${span.colSpan}`,
                  gridRow: `span ${span.rowSpan}`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#111',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                    willChange: 'transform',
                  }}
                  className="gallery-img"
                />
                {/* Hover overlay */}
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem',
                }}>
                  <span style={{
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    color: '#C9A96E',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>
                    {photo.label}
                  </span>
                </div>
                {/* Gold border on hover */}
                <div className="gallery-border" style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(201,169,110,0)',
                  transition: 'border-color 0.4s',
                  pointerEvents: 'none',
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            autoFocus
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
            }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: 44, height: 44, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FAFAFA', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              style={{
                position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: 48, height: 48, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FAFAFA', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIdx}
              src={photos[lightboxIdx].src}
              alt={photos[lightboxIdx].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '88vw',
                maxHeight: '88vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              }}
            />

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              style={{
                position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: 48, height: 48, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FAFAFA', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              fontSize: '0.8rem', color: 'rgba(250,250,250,0.5)', letterSpacing: '0.1em',
            }}>
              {lightboxIdx + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-item:hover .gallery-img     { transform: scale(1.07); }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-item:hover .gallery-border  { border-color: rgba(201,169,110,0.5); }

        @media (max-width: 768px) {
          #gallery .container > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 180px !important;
          }
          #gallery .container > div:last-of-type > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

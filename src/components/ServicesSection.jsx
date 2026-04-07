import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';

// ── Service images ─────────────────────────────────────────────────────────
import imgBlinds        from '../assets/services/Blinds.jpeg';
import imgCurtain       from '../assets/services/curtain.jpeg';
import imgWallpaper     from '../assets/services/Wallpaper.webp';
import imgFlooring      from '../assets/services/Wooden Flooring.jpg';
import imgCarpet        from '../assets/services/Carpet.avif';
import imgFurniture     from '../assets/services/Customized Furniture.webp';
import imgLouvers       from '../assets/services/Charcoal Louvers.webp';
import imgUPVC          from '../assets/services/UPVC  WPC.webp';
import imgGarden        from '../assets/services/Vertical Garden.webp';
import imgFluted        from '../assets/services/Fluted Panels.jpg';
import imgMoulding      from '../assets/services/French Moulding.jpg';
import imgAutomation    from '../assets/services/Home Automation.jpg';
import imgMosquito      from '../assets/services/Mosquito Mesh.webp';
import imgCeiling       from '../assets/services/Ceiling.jpg';
import imgAcrylic       from '../assets/services/Acrylic Sheets.jpg';
import imgDecor         from '../assets/services/Home Decor Items.webp';
import imgKitchenWin    from '../assets/services/kitchen window 1.jpeg';
import imgWoodCurtain   from '../assets/services/woodtype curtain for sitout .jpeg';
import imgWhatsApp      from '../assets/services/WhatsApp Image 2026-04-02 at 20.19.57.jpeg';

// ── Service Data ───────────────────────────────────────────────────────────
const services = [
  {
    img: imgBlinds,
    title: 'Blinds',
    label: 'Window Treatments',
    desc: 'Elevate every window with our curated collection of roller, venetian, and motorized blinds. Precision-engineered for light control, privacy, and lasting elegance.',
    features: ['Motorized & manual options', 'UV-resistant fabrics', 'Custom sizing to the mm', 'Wide texture & colour palette', 'Professional installation'],
    gallery: [imgBlinds, imgKitchenWin, imgWoodCurtain],
  },
  {
    img: imgCurtain,
    title: 'Curtains',
    label: 'Fabric Tailoring',
    desc: 'Hand-selected fabrics draped with precision. From sheer voiles to heavy blackout linens, our bespoke curtains transform any interior into a sanctuary.',
    features: ['Bespoke fabric selection', 'Eyelet, pinch & wave headings', 'Floor-to-ceiling drama', 'Thermal & blackout linings', 'In-home consultation'],
    gallery: [imgCurtain, imgWhatsApp, imgWoodCurtain],
  },
  {
    img: imgWallpaper,
    title: 'Wallpaper',
    label: 'Wall Coverings',
    desc: 'Artisan wallpapers that narrate a story. Geometric, botanical, or textural — each roll is a statement of your unique aesthetic sensibility.',
    features: ['Import & designer collections', 'Peel-and-stick & traditional paste', 'Seamless pattern matching', 'Moisture-resistant options', 'Expert hanging service'],
    gallery: [imgWallpaper],
  },
  {
    img: imgFlooring,
    title: 'Wooden Flooring',
    label: 'Floor Surfaces',
    desc: 'Solid hardwood, engineered oak, and luxury vinyl planks that breathe warmth and character into every room. Finished to perfection — every grain matters.',
    features: ['Solid & engineered hardwood', 'Herringbone & chevron layouts', 'Anti-scratch lacquer finish', 'Underfloor heating compatible', '15-year structural warranty'],
    gallery: [imgFlooring],
  },
  {
    img: imgCarpet,
    title: 'Carpet',
    label: 'Plush Floor Styling',
    desc: 'Sink into the luxury of premium carpet — from loop-pile minimalism to deep-pile opulence. We source the finest fibres for comfort that endures.',
    features: ['Wool, nylon & luxury blends', 'Stain-guard treatments', 'Custom room sizing', 'Underlay selection included', 'Acoustic insulation benefits'],
    gallery: [imgCarpet],
  },
  {
    img: imgFurniture,
    title: 'Customized Furniture',
    label: 'Bespoke Pieces',
    desc: 'Every home deserves furniture born from it — not for it. Our craftsmen work directly with you to design and build pieces that define your space.',
    features: ['CAD-designed blueprints', 'Choice of wood & finish', 'Built-in storage solutions', 'Studio-quality craftsmanship', 'Delivery & assembly included'],
    gallery: [imgFurniture],
  },
  {
    img: imgLouvers,
    title: 'Charcoal Louvers',
    label: 'Wall Accents',
    desc: 'Sophisticated charcoal louver panels that add depth, texture, and a contemporary edge to feature walls, ceilings, and partitions.',
    features: ['Pre-finished composite panels', 'Fire-retardant grade options', 'Horizontal & vertical layouts', 'Easy click-lock installation', 'Interior & semi-exterior use'],
    gallery: [imgLouvers],
  },
  {
    img: imgUPVC,
    title: 'UPVC / WPC',
    label: 'Doors & Windows',
    desc: 'High-performance UPVC and wood-polymer composite frames delivering superior insulation, weatherproofing, and a finish that stands the test of time.',
    features: ['Multi-chamber insulation', 'Impact & weather resistant', 'Tilt-and-turn mechanisms', 'Double or triple glazing', 'Low maintenance lifespan'],
    gallery: [imgUPVC],
  },
  {
    img: imgGarden,
    title: 'Vertical Garden',
    label: 'Living Walls',
    desc: 'Bring the outdoors in with living green walls that purify air, reduce noise, and serve as a breathtaking focal point for any interior or exterior space.',
    features: ['Real & preserved plant options', 'Built-in irrigation systems', 'Custom sizing & shapes', 'Air-purifying plant curation', 'Ongoing maintenance plans'],
    gallery: [imgGarden],
  },
  {
    img: imgFluted,
    title: 'Fluted Panels',
    label: 'Textured Designs',
    desc: 'Architectural fluted panels that create rhythm, shadow play, and a sense of considered luxury across walls, cabinetry facades, and partition screens.',
    features: ['MDF, PVC & solid wood variants', 'Paint-ready & pre-finished', 'Acoustic dampening properties', 'Seamless modular joining', 'Custom flute width & height'],
    gallery: [imgFluted],
  },
  {
    img: imgMoulding,
    title: 'French Moulding',
    label: 'Classical Accents',
    desc: 'Timeless French mouldings that frame rooms, define panelled walls, and add architectural gravitas — bridging classical elegance with modern interiors.',
    features: ['Plaster, MDF & polyurethane', 'Custom profile selection', 'Corner piece matching', 'Paint & gilt finish options', 'Ceiling rose & cornice work'],
    gallery: [imgMoulding],
  },
  {
    img: imgAutomation,
    title: 'Home Automation',
    label: 'Smart Living',
    desc: 'Intelligent systems that learn your lifestyle. Control lighting, climate, security, and entertainment from a single touch — or none at all.',
    features: ['Voice & app control', 'Automated lighting scenes', 'Smart climate management', 'Security & CCTV integration', 'Works with Alexa & Google'],
    gallery: [imgAutomation],
  },
  {
    img: imgMosquito,
    title: 'Mosquito Mesh',
    label: 'Insect Protection',
    desc: 'Invisible-frame insect screens engineered to keep pests out without compromising airflow, views, or the clean lines of your windows and doors.',
    features: ['Retractable & fixed types', 'Fiberglass & stainless mesh', 'Powder-coated aluminium frames', 'Child & pet safe materials', 'Custom colour matching'],
    gallery: [imgMosquito],
  },
  {
    img: imgCeiling,
    title: 'Ceiling',
    label: 'False Ceiling Designs',
    desc: 'Transform the fifth wall. Our false ceiling designs incorporate cove lighting, coffered details, and seamless plasterwork that anchor every room.',
    features: ['Gypsum & POP false ceilings', 'Integrated LED cove lighting', 'Acoustic ceiling tiles', 'Coffered & tray designs', 'Monsoon moisture-resistant'],
    gallery: [imgCeiling],
  },
  {
    img: imgAcrylic,
    title: 'Acrylic Sheets',
    label: 'High-Gloss Finishes',
    desc: 'Mirror-smooth acrylic surfaces for cabinet shutters, wall cladding, and furniture accents — delivering a high-gloss finish that never fades.',
    features: ['Scratch & UV resistant', 'Over 200 colour options', 'Easy clean surface', 'Kitchen & wardrobe grade', 'Custom cut-to-size service'],
    gallery: [imgAcrylic],
  },
  {
    img: imgDecor,
    title: 'Home Decor Items',
    label: 'Curated Accessories',
    desc: 'The finishing touches that complete an interior story — artfully curated vases, sculptures, mirrors, and accent pieces sourced from global ateliers.',
    features: ['Globally sourced collections', 'Seasonal style curation', 'Styled by in-house designers', 'Custom art commissioning', 'Gift & corporate packages'],
    gallery: [imgDecor],
  },
];

// ── Overlay Component ──────────────────────────────────────────────────────
function ServiceOverlay({ service, onClose }) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [imgParallax, setImgParallax] = useState(0);
  const overlayRef = useRef(null);
  const hasMultiple = service.gallery.length > 1;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple) setGalleryIdx(i => (i - 1 + service.gallery.length) % service.gallery.length);
      if (e.key === 'ArrowRight' && hasMultiple) setGalleryIdx(i => (i + 1) % service.gallery.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, hasMultiple, service.gallery.length]);

  // Subtle mouse parallax on hero image
  const handleMouseMove = useCallback((e) => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setImgParallax(y);
  }, []);

  const prev = () => setGalleryIdx(i => (i - 1 + service.gallery.length) % service.gallery.length);
  const next = () => setGalleryIdx(i => (i + 1) % service.gallery.length);

  return (
    <motion.div
      ref={overlayRef}
      key="overlay"
      className="svc-overlay-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'stretch',
        background: 'rgba(4,4,4,0.97)',
        overflow: 'hidden',
      }}
    >
      {/* ── Left: Hero Image Panel ── */}
      <motion.div
        className="svc-overlay-hero"
        initial={{ x: '-6%', opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        exit={{ x: '-4%', opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          flex: '0 0 52%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gallery images */}
        <AnimatePresence mode="wait">
          <motion.img
            key={galleryIdx}
            src={service.gallery[galleryIdx]}
            alt={service.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1, y: imgParallax }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.5 }, y: { duration: 0.15, ease: 'linear' } }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              willChange: 'transform',
            }}
          />
        </AnimatePresence>

        {/* Gradient vignette over image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, transparent 70%, rgba(4,4,4,0.95) 100%), linear-gradient(to top, rgba(4,4,4,0.55) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />

        {/* Gallery label pill */}
        {hasMultiple && (
          <div style={{
            position: 'absolute',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '2rem',
            padding: '0.45rem 1.1rem',
          }}>
            {service.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                style={{
                  width: i === galleryIdx ? '22px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === galleryIdx ? '#C9A96E' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Gallery nav arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                width: 40, height: 40, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAFAFA',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.2)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
                width: 40, height: 40, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAFAFA',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.2)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </motion.div>

      {/* ── Right: Content Panel ── */}
      <div className="svc-overlay-inner" style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 5rem) clamp(2rem, 4vw, 4.5rem)',
        position: 'relative',
      }}>

        {/* Subtle vertical gold line accent */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            left: 0,
            top: '10%',
            bottom: '10%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, #C9A96E 40%, #C9A96E 60%, transparent)',
            transformOrigin: 'top',
          }}
        />

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            marginBottom: '1.1rem',
          }}
        >
          {service.label}
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#FAFAFA',
            marginBottom: '0.6rem',
          }}
        >
          {service.title}
        </motion.h2>

        {/* Gold divider */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'block',
            width: '48px',
            height: '1px',
            background: '#C9A96E',
            marginBottom: '1.8rem',
            transformOrigin: 'left',
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(250,250,250,0.65)',
            marginBottom: '2.25rem',
            fontStyle: 'italic',
            maxWidth: '480px',
          }}
        >
          {service.desc}
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
          style={{ marginBottom: '2.8rem' }}
        >
          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.3)',
            marginBottom: '1.1rem',
            fontFamily: 'var(--font-sans)',
          }}>
            Key Highlights
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {service.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.48 + i * 0.07 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
              >
                <CheckCircle2 size={14} color="#C9A96E" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span style={{
                  fontSize: '0.82rem',
                  color: 'rgba(250,250,250,0.7)',
                  letterSpacing: '0.03em',
                  fontFamily: 'var(--font-sans)',
                }}>
                  {f}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.72 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a
            href="#contact"
            onClick={onClose}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.7rem' }}
            onMouseEnter={e => e.currentTarget.style.gap = '0.9rem'}
            onMouseLeave={e => e.currentTarget.style.gap = '0.6rem'}
          >
            Get a Free Quote <ArrowRight size={14} />
          </a>
          <button
            onClick={onClose}
            className="btn-outline"
            style={{ fontSize: '0.7rem' }}
          >
            Browse Services
          </button>
        </motion.div>
      </div>

      {/* ── Close Button ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAFAFA',
          transition: 'background 0.22s, border-color 0.22s, transform 0.22s',
          zIndex: 1,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(201,169,110,0.18)';
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
          e.currentTarget.style.transform = 'rotate(90deg)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.transform = 'rotate(0deg)';
        }}
        aria-label="Close"
      >
        <X size={17} />
      </motion.button>

      {/* Responsive mobile overrides */}
      <style>{`
        @media (max-width: 768px) {
          .svc-overlay-wrapper {
            flex-direction: column !important;
          }
          .svc-overlay-hero {
            flex: 0 0 35vh !important;
            width: 100% !important;
          }
          .svc-overlay-inner {
            padding: 2.5rem 1.5rem 4rem 1.5rem !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

// ── Services Grid ──────────────────────────────────────────────────────────
export default function ServicesSection() {
  const [active, setActive] = useState(null);

  return (
    <>
      <section id="services" className="section" style={{ background: '#0A0A0A', position: 'relative' }}>
        {/* Subtle background noise / glow */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(250,250,250,0.04) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <span className="section-label">Our Expertise</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Curated Services</h2>
            <span className="gold-divider" />
            <p style={{ color: 'rgba(250,250,250,0.35)', fontSize: '0.78rem', marginTop: '1.25rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Select a service below for details
            </p>
          </motion.div>

          {/* Grid */}
          <div className="magazine-grid">
            {services.map((item, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              const isLarge = [0, 6, 9].includes(idx); // Certain elements span more
              const isTall = [1, 10].includes(idx); 
              
              const colSpanClass = isLarge ? 'col-span-2' : 'col-span-1';
              const rowSpanClass = isTall ? 'row-span-2' : 'row-span-1';

              return (
                <motion.div
                  key={item.title}
                  className={`mag-card ${colSpanClass} ${rowSpanClass}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: (idx % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => setActive(item)}
                >
                  {/* Background Image */}
                  <div className="mag-img-wrapper">
                    <img src={item.img} alt={item.title} className="mag-img" loading="lazy" decoding="async" />
                  </div>
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="mag-overlay" />

                  {/* Top-Right Numbering */}
                  <div className="mag-num">{numStr}</div>

                  {/* Content Glass Panel */}
                  <div className="mag-content">
                    <div className="mag-line" />
                    <div>
                      <h3 className="mag-title">{item.title}</h3>
                      <p className="mag-desc">{item.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <style>{`
          .magazine-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            grid-auto-rows: 280px;
            gap: 1.5rem;
          }
          @media (min-width: 900px) {
            .magazine-grid { grid-template-columns: repeat(3, 1fr); }
            .col-span-2 { grid-column: span 2; }
            .row-span-2 { grid-row: span 2; }
          }
          @media (min-width: 1200px) {
            .magazine-grid { grid-template-columns: repeat(4, 1fr); grid-auto-rows: 320px; }
          }

          .mag-card {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.06);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
            transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          
          .mag-card:hover {
            border-color: rgba(201,169,110,0.4);
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -15px rgba(201,169,110,0.15);
          }

          .mag-img-wrapper {
            position: absolute; inset: 0;
            overflow: hidden;
          }
          .mag-img {
            width: 100%; height: 100%; object-fit: cover;
            transform: scale(1.02);
            transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
            will-change: transform;
          }
          .mag-card:hover .mag-img {
            transform: scale(1.08);
          }
          
          .mag-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.7) 100%);
            transition: opacity 0.5s;
          }
          
          .mag-card:hover .mag-overlay {
            opacity: 0.8;
          }
          
          .mag-num {
            position: absolute;
            top: 1.25rem; right: 1.25rem;
            font-family: var(--font-display);
            font-size: 1.2rem;
            color: rgba(255,255,255,0.25);
            font-style: italic;
            transition: color 0.5s;
            z-index: 2;
          }
          .mag-card:hover .mag-num { color: #C9A96E; }

          .mag-content {
            position: absolute;
            bottom: 1.5rem; left: 1.5rem; right: 1.5rem;
            padding: 1.25rem;
            background: rgba(20, 20, 20, 0.45);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 6px;
            display: flex; gap: 1.25rem; align-items: stretch;
            transition: background 0.5s, border-color 0.5s;
            z-index: 2;
          }
          .mag-card:hover .mag-content {
            background: rgba(30, 30, 30, 0.6);
            border-color: rgba(201,169,110,0.35);
          }

          .mag-line {
            width: 2px;
            background: #C9A96E;
            flex-shrink: 0;
            transform-origin: top;
            transform: scaleY(0.5);
            transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .mag-card:hover .mag-line { transform: scaleY(1); }

          .mag-title {
            font-family: var(--font-display);
            font-size: clamp(1.2rem, 2vw, 1.5rem);
            font-weight: 400;
            color: #FAFAFA;
            letter-spacing: 0.02em;
            margin-bottom: 0.25rem;
            line-height: 1.1;
          }
          .mag-desc {
            font-family: var(--font-sans);
            font-size: 0.68rem;
            color: rgba(250,250,250,0.55);
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
        `}</style>
      </section>

      {/* ── Full-Screen Overlay ── */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop blur on everything behind */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setActive(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                backdropFilter: 'blur(6px)',
                background: 'rgba(0,0,0,0.5)',
              }}
            />
            <ServiceOverlay service={active} onClose={() => setActive(null)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

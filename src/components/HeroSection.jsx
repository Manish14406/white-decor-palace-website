import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HEADLINE = ['One Stop', 'Destination', 'For', 'Dream Spaces'];

export default function HeroSection() {
  const [doorOpen, setDoorOpen] = useState(false);

  const openDoor = () => setDoorOpen(true);

  useEffect(() => {
    const handleTrigger = (e) => {
      if (doorOpen) return;
      if (e.type === 'scroll' && window.scrollY > 10) setDoorOpen(true);
      if (e.type === 'keydown' && e.key === 'Enter') setDoorOpen(true);
    };
    window.addEventListener('scroll', handleTrigger, { passive: true });
    window.addEventListener('keydown', handleTrigger);
    return () => {
      window.removeEventListener('scroll', handleTrigger);
      window.removeEventListener('keydown', handleTrigger);
    };
  }, [doorOpen]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 600,
        overflow: 'hidden',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background bedroom image — revealed behind door */}
      <motion.div
        initial={{ scale: 1.12, filter: 'brightness(0.25)' }}
        animate={doorOpen ? { scale: 1, filter: 'brightness(0.85)' } : {}}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <img
          src="/images/bedroom-interior.png"
          alt="Luxury bedroom"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)'
        }} />
      </motion.div>

      {/* ——— DOOR CONTAINER ——— */}
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          perspective: '1200px',
          pointerEvents: doorOpen ? 'none' : 'auto',
          zIndex: 5,
        }}
      >
        <div style={{ position: 'relative', width: 340, height: 520, transformStyle: 'preserve-3d' }}>
          {/* Door frame accent */}
          <motion.div 
            animate={{ opacity: doorOpen ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: -20,
              border: '1px solid rgba(201,169,110,0.25)',
              pointerEvents: 'none',
            }}
          />

          {/* LEFT leaf */}
          <motion.div
            animate={{ 
              rotateY: doorOpen ? -95 : 0, 
              filter: doorOpen ? 'brightness(0.2)' : 'brightness(1)'
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, right: '50%',
              transformOrigin: 'left',
              transformStyle: 'preserve-3d',
              overflow: 'hidden',
              boxShadow: doorOpen ? '20px 0px 40px rgba(0,0,0,0.95)' : '0px 0 0px rgba(0,0,0,0)',
              borderRight: doorOpen ? '1px solid rgba(0,0,0,0.8)' : 'none'
            }}
          >
            <img src="/images/door-closed.png" alt="" style={{
              position: 'absolute', top: 0, left: 0,
              width: '200%', height: '100%', objectFit: 'cover', objectPosition: 'left',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.1))' }} />
            <div style={{ position: 'absolute', inset: 12, border: '1px solid rgba(201,169,110,0.15)' }} />
            {/* Handle */}
            <div style={{
              position: 'absolute', top: '50%', right: 10,
              width: 10, height: 36, borderRadius: 8,
              background: '#C9A96E', boxShadow: '0 0 12px rgba(201,169,110,0.5)',
              transform: 'translateY(-50%)',
            }} />
          </motion.div>

          {/* RIGHT leaf */}
          <motion.div
            animate={{ 
              rotateY: doorOpen ? 95 : 0, 
              filter: doorOpen ? 'brightness(0.2)' : 'brightness(1)'
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{
              position: 'absolute', top: 0, left: '50%', bottom: 0, right: 0,
              transformOrigin: 'right',
              transformStyle: 'preserve-3d',
              overflow: 'hidden',
              boxShadow: doorOpen ? '-20px 0px 40px rgba(0,0,0,0.95)' : '0px 0 0px rgba(0,0,0,0)',
              borderLeft: doorOpen ? '1px solid rgba(0,0,0,0.8)' : 'none'
            }}
          >
            <img src="/images/door-closed.png" alt="" style={{
              position: 'absolute', top: 0, right: 0,
              width: '200%', height: '100%', objectFit: 'cover', objectPosition: 'right',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.45), rgba(0,0,0,0.1))' }} />
            <div style={{ position: 'absolute', inset: 12, border: '1px solid rgba(201,169,110,0.15)' }} />
            {/* Handle */}
            <div style={{
              position: 'absolute', top: '50%', left: 10,
              width: 10, height: 36, borderRadius: 8,
              background: '#C9A96E', boxShadow: '0 0 12px rgba(201,169,110,0.5)',
              transform: 'translateY(-50%)',
            }} />
          </motion.div>
        </div >
      </div>

      {/* ——— PRE-OPEN: Headline + CTA ——— */}
      <AnimatePresence>
        {!doorOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute', bottom: '10%', left: 0, right: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', gap: '1.5rem',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {HEADLINE.map((word, i) => (
                <div key={word} style={{ overflow: 'hidden' }}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                      fontWeight: 500,
                      color: '#FAFAFA',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ color: 'rgba(250,250,250,0.55)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', letterSpacing: '0.04em', textAlign: 'center' }}
            >
              Premium home decor crafted with experience and precision
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              onClick={openDoor}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(201,169,110,0.25)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.9rem 2.5rem',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #C9A96E',
                color: '#C9A96E',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Enter
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              style={{ 
                color: 'rgba(250,250,250,0.4)', 
                fontSize: '0.65rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                marginTop: '0.5rem' 
              }}
            >
              Press Enter or Click to Explore
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— POST-OPEN: Brand reveal + Scroll cue ——— */}
      <AnimatePresence>
        {doorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 20,
            }}
          >
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '1rem' }}>
              Welcome To
            </span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              fontWeight: 500,
              color: '#FAFAFA',
              textAlign: 'center',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
            }}>
              White Palace<br />
              <em style={{ color: '#C9A96E', fontStyle: 'italic', fontWeight: 400, fontSize: '0.72em' }}>Decor</em>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              style={{
                position: 'absolute', bottom: 48,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.35)' }}>
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <ChevronDown size={18} color="rgba(201,169,110,0.7)" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

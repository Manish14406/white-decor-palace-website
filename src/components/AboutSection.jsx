import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 2022, suffix: '',  label: 'Established' },
  { value: 15,   suffix: '+', label: 'Years Experience' },
  { value: 500,  suffix: '+', label: 'Projects Done' },
  { value: 100,  suffix: '%', label: 'Client Satisfaction' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section" style={{ background: '#0D0D0D' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ overflow: 'hidden', height: 560 }}>
              <img
                src="/images/showcase-2.png"
                alt="White Palace Decor interior"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Gold inset border */}
              <div style={{
                position: 'absolute', inset: 0,
                boxShadow: 'inset 0 0 0 1px rgba(201,169,110,0.3)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: 'absolute', bottom: 24, right: 24,
                background: '#C9A96E',
                padding: '1.25rem 1.5rem',
                display: 'none',
              }}
              className="about-badge"
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#000', lineHeight: 1, fontWeight: 600 }}>15+</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>Years</div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Crafting Spaces<br />
                <em style={{ color: '#C9A96E', fontWeight: 400 }}>Since 2022</em>
              </h2>
              <span className="gold-divider gold-divider-left" style={{ marginTop: '1.25rem' }} />
            </div>

            <p style={{ color: 'rgba(250,250,250,0.6)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '48ch' }}>
              White Palace Decor was founded in 2022 with a clear vision — to bring world-class interior design to every home. Our team carries over 15 years of combined expertise across residential and premium commercial projects.
            </p>

            <p style={{ color: 'rgba(250,250,250,0.6)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '48ch' }}>
              We are proud to have specialists trained internationally in the latest technologies and design methodologies, giving every project a global edge with a local touch.
            </p>

            {/* Kannada tagline */}
            <div style={{
              borderLeft: '2px solid #C9A96E',
              paddingLeft: '1.25rem',
              marginTop: '0.5rem',
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'rgba(250,250,250,0.75)', fontStyle: 'italic', lineHeight: 1.7 }}>
                "ಟೆಕ್ನಾಲಜಿ ವಿಷಯದಲ್ಲಿ ವಿದೇಶಗಳಲ್ಲಿ ಕಲಿತು ಬಂದ ತಜ್ಞರು ನಮ್ಮ ಸಂಸ್ಥೆಯಲ್ಲಿ ಇದ್ದಾರೆ"
              </p>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem', marginTop: '0.5rem',
            }}>
              {stats.map(s => (
                <div key={s.label} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 300, color: '#C9A96E', lineHeight: 1 }}>
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.35)', marginTop: '0.4rem' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .about-badge { display: block !important; } }
      `}</style>
    </section>
  );
}

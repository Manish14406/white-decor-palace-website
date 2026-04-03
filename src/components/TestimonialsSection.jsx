import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Bengaluru',
    quote: 'White Palace transformed our bedroom into something extraordinary. Every detail speaks of quality and refinement.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rajan & Divya Menon',
    location: 'Mysuru',
    quote: 'From consultation to installation – seamless. They understood our vision and delivered it beautifully.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aditya Nair',
    location: 'Mangaluru',
    quote: 'The wardrobe they designed is a masterpiece. Functional, elegant, and built to last. Highly recommended.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section" style={{ background: '#0D0D0D' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>What Our Clients Say</h2>
          <span className="gold-divider" />
        </motion.div>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '2rem',
                background: '#181818',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'border-color 0.3s',
              }}
              className="testi-card"
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} style={{ color: '#C9A96E', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(250,250,250,0.8)',
                lineHeight: 1.7,
                flex: 1,
              }}>
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#FAFAFA', marginBottom: '0.2rem' }}>
                  {t.name}
                </p>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.65)' }}>
                  {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testi-card:hover { border-color: rgba(201,169,110,0.3) !important; }
      `}</style>
    </section>
  );
}

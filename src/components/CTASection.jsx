import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section
      id="cta"
      style={{
        padding: '8rem 0',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.82)), url('/images/bedroom-interior.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0' }}>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-label"
        >
          Begin Your Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', maxWidth: '18ch', margin: '0.75rem auto 0' }}
        >
          Transform Your Space Today
        </motion.h2>

        <span className="gold-divider" style={{ marginTop: '1.5rem' }} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: 'rgba(250,250,250,0.55)',
            fontSize: '1rem',
            lineHeight: 1.8,
            maxWidth: '48ch',
            marginTop: '1.75rem',
          }}
        >
          Let us help you design the home you've always envisioned. Schedule your free, personalized consultation today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2.5rem',
          }}
        >
          <a href="tel:+919535038135" className="btn-primary">Call Us Now</a>
          <a href="mailto:hello@whitepalacedecor.com" className="btn-outline">Send a Message</a>
        </motion.div>

        {/* Contact strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            width: '100%',
            maxWidth: '56rem',
          }}
        >
          {[
            { label: 'Phone', value: '+91 95350 38135' },
            { label: 'Instagram', value: '@WHITEPALACEDECOR' },
            { label: 'Location', value: 'Puttur, Karnataka' },
          ].map(c => (
            <div key={c.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)' }}>
                {c.label}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(250,250,250,0.75)' }}>{c.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

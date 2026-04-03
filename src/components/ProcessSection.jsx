import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Home } from 'lucide-react';

const steps = [
  {
    num: '01',
    Icon: MessageSquare,
    title: 'Consultation',
    desc: 'We sit down with you to understand your vision, lifestyle, and preferences in depth.',
  },
  {
    num: '02',
    Icon: PenTool,
    title: 'Design',
    desc: 'Our designers craft detailed 3D plans and curate materials tailored to your space.',
  },
  {
    num: '03',
    Icon: Home,
    title: 'Installation',
    desc: 'Expert craftsmen deliver your vision with precision – on time, to the highest standard.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section" style={{ background: '#111111' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label">How We Work</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>Our Process</h2>
          <span className="gold-divider" />
        </motion.div>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem',
                gap: '1rem',
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'border-color 0.3s',
              }}
              className="process-card"
            >
              {/* Icon + Number row */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#111',
                flexShrink: 0,
              }}>
                <step.Icon size={22} color="#C9A96E" strokeWidth={1.5} />
              </div>

              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'rgba(201,169,110,0.25)', lineHeight: 1 }}>
                {step.num}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#FAFAFA' }}>
                {step.title}
              </h3>

              <p style={{ color: 'rgba(250,250,250,0.55)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '30ch' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .process-card:hover { border-color: rgba(201,169,110,0.35) !important; }
      `}</style>
    </section>
  );
}
